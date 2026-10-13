# GMD / gmd.gdn ecosystem — v0.01

**Status:** portfolio and homepage direction, before implementation. This document separates inspected project facts, the user's stated direction, and new proposals. It does not claim that planned projects exist or that draft branding has been approved.

## Brand and organizing idea

The user's direction is to use **GMD / gmd.gdn as the umbrella brand** for an Egyptian content, knowledge, distribution, and AI-dataset company. Film and Kayffa sit beneath it as projects. The user also described possible future work in games, business tools, data portals, and an Egyptian Wikipedia or encyclopedia. These are plans and areas of interest, not claims that those products are already operating.

The existing GMD site materials explain `gmd.gdn` as “جامد جدًا” and frame it as a signature capable of holding consulting, ideas, archives, and experiments. They previously describe the root site as a lightweight universe index and `hire.gmd.gdn` as a personal consultancy. The user has now clarified that GMD / gmd.gdn is the umbrella brand for this broader company. Treat the existing copy as valuable source material, while updating its old “not a corporate holding-company identity” framing in future work so the company role is clear.

**Suggested concise positioning:** GMD turns Egyptian and regional content into useful media, knowledge products, data, and tools. Its projects collect, organize, enrich, and distribute material for audiences and institutions. AI and datasets are methods and infrastructure across the portfolio, with editorial judgment and source context attached.

**Suggested brand architecture:** one parent identity, with distinct project names and visual expressions. The parent explains the shared purpose and connects the projects. Each project page states its audience, material, and current status. Use a project subdomain only when the product has a clear public destination; keep internal capabilities such as dataset production under a “Capabilities” or “How we work” section until they warrant a public product.

## What is verified in the inspected folders

| Project | Evidence from the local project | Status supported by the evidence |
| --- | --- | --- |
| ElFilm / Film | The active public frontend README identifies `film.gmd.gdn`, `elfilm-web`, and a separate API worker. The frontend covers film discovery, search, “on this day,” and movie, people, company, genre, and watch pages. | Existing active project. The older Astro `site/` app is explicitly deprecated and frozen; it is not the current frontend. |
| Kayffa | Its README describes a Cloudflare-first cultural graph platform for Egyptian and related content. Its model includes assets, entities, categories, collections, relationships, provenance, and reviewed AI suggestions. The blueprint describes a multimodal archive that may expand across media and domains. | Existing scaffold and implementation foundation. Some capabilities and public surfaces remain planned; do not describe all blueprint features as live. |
| GMD web presence | The `gmdgdn` repository README identifies itself as the bilingual Astro site for `hire.gmd.gdn`, a personal consultancy site. `SITE_PLAN.md` includes an earlier GMD universe proposal and an idea for a separate `fkr.gmd.gdn` publication. | Existing GMD-related site materials; they currently represent the consultancy. Fikr is a prior proposal in those materials, not a verified active publication. |

The inspected repos do not establish that the planned games, business tools, Egyptian data portals, AI datasets offering, or Egyptian encyclopedia are launched products. Present them as future directions or proposals until there is a concrete project and evidence.

## Portfolio proposal

These are useful portfolio slots and roles, not a claim that each has been approved or built. Keep the active projects prominent and label future directions plainly.

| Slot | Role in the GMD portfolio | Relationship and guardrail |
| --- | --- | --- |
| **Film** | Public film discovery and distribution surface for Egyptian cinema and connected screen culture. | Existing active project at `film.gmd.gdn`; retain its own product identity and audience. |
| **Kayffa** | Cultural archive and connected knowledge graph for Egyptian and related material. | Existing scaffold; distinguish the working foundation from planned enrichment, search, and public experiences. |
| **GMD Data** *(working title)* | Curated, documented datasets and AI-ready source collections built from Egyptian and regional content. | Proposed capability/product. Show provenance, rights, coverage, and review status before presenting data as a product. |
| **Egyptian Encyclopedia** *(working title)* | A public reference layer for reliable, linked knowledge about Egypt. | Proposed destination. Define editorial policy and sourcing; it can draw on Kayffa's connected records without turning the archive into an encyclopedia by default. |
| **Egypt Data Portals** *(working title)* | Focused public portals for navigable Egyptian information and research collections. | Proposed family of portals. Launch per domain only when a real dataset, partner, or audience need exists. |
| **GMD Tools** *(working title)* | Business and editorial tools that help organizations organize content, knowledge, and workflows. | Proposed product line. Explain the user problem and standalone value; avoid generic “AI tools” positioning. |
| **GMD Play** *(working title)* | Games and interactive experiences that make Egyptian stories, places, and knowledge explorable. | Proposed creative line. Let each release have its own title and tone under the GMD endorsement. |
| **Fikr / فكر** *(prior proposal)* | Editorial publishing for essays and ideas across culture, history, technology, and the internet. | Existing site plan proposes `fkr.gmd.gdn`; retain only if it supports a distinct publication and publishing cadence. |

The portfolio has three clear jobs: **media and discovery** (Film, interactive work), **archive and reference** (Kayffa, encyclopedia, portals), and **products and infrastructure** (datasets, tools). GMD is the shared curator and maker across them. This makes the parent coherent without making every project sound like the same product.

## Homepage information architecture — plan only

1. **Opening:** GMD name, a plain-language statement of what the company makes, and two paths: “Explore projects” and “Work with us.” Avoid abstract AI-first language.
2. **Project index:** Film and Kayffa as current projects, each with a one-sentence role, status, and direct link. Do not imply the future slots are available products.
3. **Shared method:** collect → organize → enrich → publish. Briefly connect editorial research, structured data, responsible AI, and distribution.
4. **Capabilities:** content and archive systems, datasets and AI readiness, digital products and tools, distribution and audience experiences. Mark whether each is active, available for collaboration, or exploratory.
5. **Future directions:** a restrained “in development / exploring” area for the encyclopedia, portals, games, and other ideas. Add only directions the user wants public.
6. **About GMD:** explain the Egyptian origin and the meaning of the name, then describe the company and its people/partners once those details are confirmed in project materials.
7. **Contact:** one clear route for partnerships, data/content licensing, and project enquiries, with enough context to help visitors choose.

Use project cards as editorial summaries, not generic software feature grids. Arabic and English should have equal priority, with RTL layouts designed intentionally. Keep the homepage light enough to make the active work legible while allowing future products to join without a full redesign.

## Original suggestions for the design-system work

- Use a **parent + project endorsement** pattern: `GMD` establishes origin and trust; Film and Kayffa remain recognizable project brands. A small “A GMD project” marker can connect them where useful.
- Give each project a concise **status label** in the portfolio: `Active`, `Building`, or `Exploring`. Only use `Active` when an existing public destination or clearly operating project supports it.
- Establish shared Arabic/English rules, spacing, navigation behavior, accessibility, and a small set of brand tokens. Allow projects to use distinct accent colors or imagery so Film, an archive, a data product, and a game do not collapse into one visual voice.
- Create a content model for portfolio entries with: name, purpose, audience, status, current URL, language support, evidence/source, and next action. This keeps a future homepage from presenting plans as shipped work.
- Keep datasets visibly tied to source and rights context. “AI-ready” should describe documented structure and permitted use, not imply unrestricted access or training permission.
- Keep proposed names such as “GMD Data,” “GMD Tools,” and “Egyptian Encyclopedia” as working titles until naming and domain choices are made.

## Local sources reviewed

- `E:\Eslam Builds\elfilm\web\README.md` — current frontend ownership and public domain.
- `E:\Eslam Builds\elfilm\ARCHITECTURE.md` — active/deprecated worker roles and ElFilm surfaces.
- `E:\Eslam Builds\elfilm\site\AGENTS.md` — deprecated frontend guidance; read-only inspection only.
- `E:\Eslam Builds\kayffa\AGENTS.md` and `E:\Eslam Builds\kayffa\README.md` — canonical project model and current scaffold scope.
- `E:\Eslam Builds\kayffa\docs\system-blueprint.md` and `E:\Eslam Builds\kayffa\docs\implementation-plan-v1.md` — archive, data, AI, and expansion concepts with planned versus implemented details.
- `E:\Eslam Builds\gmdgdn\README.md`, `E:\Eslam Builds\gmdgdn\SITE_PLAN.md`, `E:\Eslam Builds\gmdgdn\BRANDING_PROMPT.md`, and `E:\Eslam Builds\gmdgdn\WEBSITE_COPY_NEW_IDENTITY.md` — existing consultancy-site identity and earlier universe/domain proposals.

No files in the inspected project folders were edited.
