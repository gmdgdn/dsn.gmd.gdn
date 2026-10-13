import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { filterAndSort, paginateRecords, serializeRecords, createExportBlob, validateRequest } from './components.js';

const records = [
  { id: 'film-002', title: 'Zebra, "quoted"', family: 'film', status: 'draft' },
  { id: 'read-001', title: 'Arabic العربية', family: 'reading', status: 'study' },
  { id: 'film-001', title: 'Alpha', family: 'film', status: 'tested' }
];

test('collection search, family and sort operate on the same visible set', () => {
  assert.deepEqual(filterAndSort(records, { family: 'film', sort: 'title' }).map(row => row.id), ['film-001', 'film-002']);
  assert.deepEqual(filterAndSort(records, { query: 'FILM-002', family: 'film' }).map(row => row.id), ['film-002']);
  assert.deepEqual(filterAndSort(records, { query: 'missing' }), []);
  assert.deepEqual(filterAndSort(records, { sort: 'title-desc' }).map(row => row.id), ['film-002', 'read-001', 'film-001']);
});

test('CSV and JSON export only supplied visible records with safe bytes', () => {
  const visible = filterAndSort(records, { family: 'film', query: 'zebra' });
  assert.equal(visible.length, 1);
  const csv = serializeRecords(visible, 'csv');
  assert.equal(csv, 'id,title,family,status\r\n"film-002","Zebra, ""quoted""","film","draft"\r\n');
  assert.deepEqual(JSON.parse(serializeRecords(visible, 'json')), [visible[0]]);
  assert.throws(() => serializeRecords(visible, 'xml'), RangeError);
});

test('download blobs use a BOM only for CSV and retain parseable JSON bytes', async () => {
  const csv = new Uint8Array(await createExportBlob(records.slice(0, 1), 'csv').arrayBuffer());
  assert.deepEqual([...csv.slice(0, 3)], [0xef, 0xbb, 0xbf]);
  const json = new Uint8Array(await createExportBlob(records.slice(0, 1), 'json').arrayBuffer());
  assert.equal(json[0], 0x5b);
  assert.deepEqual(JSON.parse(new TextDecoder().decode(json)), [records[0]]);
});

test('form validation names the failing fields and accepts complete input', () => {
  assert.deepEqual(Object.keys(validateRequest({ project: '  ', email: 'wrong', acknowledgement: false })), ['project', 'email', 'acknowledgement']);
  assert.deepEqual(validateRequest({ project: 'Archive', email: 'reader@example.org', acknowledgement: true }), {});
});

test('collection pagination clamps page after filtering and exposes the last partial page', () => {
  assert.deepEqual(paginateRecords(records, 2, 2), { page: 1, pages: 2, visible: [records[2]] });
  assert.deepEqual(paginateRecords([], 5, 2), { page: 0, pages: 1, visible: [] });
  assert.throws(() => paginateRecords(records, 0, 0), RangeError);
});

test('all local media and module references exist across the coded review pages', () => {
  const dir = dirname(fileURLToPath(import.meta.url));
  for (const page of ['index.html', 'component-lab.html', 'geometry.html']) {
    const html = readFileSync(resolve(dir, page), 'utf8');
    if (page === 'index.html') assert.equal((html.match(/<section\b/g) || []).length, 8);
    const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]).filter(ref => !ref.startsWith('#') && !/^(?:https?:|data:)/.test(ref)).map(ref => ref.split('#')[0]);
    assert.ok(refs.length >= 3, `${page} has local references`);
    for (const ref of refs) assert.ok(existsSync(resolve(dir, ref)), `${page} missing ${ref}`);
  }
  const manifest = JSON.parse(readFileSync(resolve(dir, 'geometry/manifest.json'), 'utf8'));
  assert.equal(Object.keys(manifest.specimens).length, 10);
  assert.equal(manifest.assets.length, 32);
  assert.equal(manifest.assets.filter(asset => asset.variant === 'aperture').length, 2);
  for (const asset of manifest.assets) assert.ok(existsSync(resolve(dir, 'geometry', asset.file)), `missing ${asset.file}`);
});
