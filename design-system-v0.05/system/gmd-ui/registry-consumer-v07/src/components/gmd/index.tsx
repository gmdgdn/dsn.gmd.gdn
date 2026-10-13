import type { CSSProperties, ReactNode } from "react"

type RegisterDividerProps = {
  label?: string
  ornamentSrc?: string
  tone?: "ink" | "nile" | "paper"
  className?: string
}

/** A quiet editorial rule with an optional existing GMD register SVG. */
export function RegisterDivider({
  label,
  ornamentSrc = "/assets/egyptian-pendant-register.svg",
  tone = "ink",
  className = "",
}: RegisterDividerProps) {
  return (
    <div className={`gmd-register-divider gmd-register-divider--${tone} ${className}`.trim()}>
      <span className="gmd-register-divider__rule" aria-hidden="true" />
      {label ? <span className="gmd-register-divider__label">{label}</span> : null}
      {ornamentSrc ? (
        <img className="gmd-register-divider__ornament" src={ornamentSrc} alt="" aria-hidden="true" />
      ) : null}
      <span className="gmd-register-divider__rule" aria-hidden="true" />
    </div>
  )
}

type CulturalMediaFrameProps = {
  src: string
  alt: string
  caption?: ReactNode
  index?: string
  ornamentSrc?: string
  className?: string
  imageClassName?: string
  fit?: "cover" | "contain"
}

/** Reusable image frame. Source/rights language belongs in the supplied caption. */
export function CulturalMediaFrame({
  src,
  alt,
  caption,
  index,
  ornamentSrc,
  className = "",
  imageClassName = "",
  fit = "cover",
}: CulturalMediaFrameProps) {
  return (
    <figure className={`gmd-media-frame gmd-media-frame--${fit} ${className}`.trim()}>
      <div className="gmd-media-frame__bar">
        <span>{index ?? "GMD / MEDIA"}</span>
        <span className="gmd-media-frame__bar-rule" aria-hidden="true" />
      </div>
      <div className="gmd-media-frame__viewport">
        <img className={`gmd-media-frame__image ${imageClassName}`.trim()} src={src} alt={alt} />
        {ornamentSrc ? <img className="gmd-media-frame__ornament" src={ornamentSrc} alt="" aria-hidden="true" /> : null}
      </div>
      {caption ? <figcaption className="gmd-media-frame__caption">{caption}</figcaption> : null}
    </figure>
  )
}

type ProjectFeatureProps = {
  eyebrow?: string
  title: string
  description: ReactNode
  href?: string
  linkLabel?: string
  media: ReactNode
  layout?: "media-first" | "copy-first"
  className?: string
}

/** An editorial collection/project feature with media and a clear information hierarchy. */
export function ProjectFeature({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  media,
  layout = "media-first",
  className = "",
}: ProjectFeatureProps) {
  return (
    <article className={`gmd-project-feature gmd-project-feature--${layout} ${className}`.trim()}>
      <div className="gmd-project-feature__media">{media}</div>
      <div className="gmd-project-feature__copy">
        {eyebrow ? <p className="gmd-project-feature__eyebrow">{eyebrow}</p> : null}
        <h2 className="gmd-project-feature__title">{title}</h2>
        <div className="gmd-project-feature__description">{description}</div>
        {href && linkLabel ? <a className="gmd-project-feature__link" href={href}>{linkLabel}<span aria-hidden="true"> ↗</span></a> : null}
      </div>
    </article>
  )
}

type ProvenanceItem = { label: string; value: ReactNode }
type ProvenancePanelProps = {
  title?: string
  items: ProvenanceItem[]
  note?: ReactNode
  className?: string
}

/** Displays provenance and rights metadata exactly as provided; it makes no clearance claim. */
export function ProvenancePanel({ title = "Source & use", items, note, className = "" }: ProvenancePanelProps) {
  return (
    <section className={`gmd-provenance-panel ${className}`.trim()} aria-label={title}>
      <header className="gmd-provenance-panel__header">
        <span className="gmd-provenance-panel__mark" aria-hidden="true">i</span>
        <h3>{title}</h3>
      </header>
      <dl className="gmd-provenance-panel__list">
        {items.map((item, index) => (
          <div className="gmd-provenance-panel__item" key={`${item.label}-${index}`}>
            <dt>{item.label}</dt><dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="gmd-provenance-panel__note">{note}</p> : null}
    </section>
  )
}

type PatternedCoverProps = {
  title: string
  subtitle?: string
  index?: string
  patternSrc?: string
  background?: string
  foreground?: string
  accent?: string
  size?: "compact" | "standard" | "feature"
  className?: string
}

/** An editable, parameterized cover. Pass existing SVG art and tune its palette/size with props. */
export function PatternedCover({
  title,
  subtitle,
  index,
  patternSrc,
  background = "var(--gmd-project-canvas, var(--background, #F7F4EF))",
  foreground = "var(--gmd-project-ink, var(--gmd-ink, #140206))",
  accent = "var(--gmd-project-action, var(--gmd-action, #FF6183))",
  size = "standard",
  className = "",
}: PatternedCoverProps) {
  const style = {
    "--gmd-cover-background": background,
    "--gmd-cover-foreground": foreground,
    "--gmd-cover-accent": accent,
    "--gmd-cover-pattern": patternSrc
      ? "none"
      : "var(--gmd-project-pattern, url('/assets/true-interlace-panel.svg'))",
  } as CSSProperties
  return (
    <article className={`gmd-pattern-cover gmd-pattern-cover--${size} ${className}`.trim()} style={style}>
      <div className="gmd-pattern-cover__art" aria-hidden="true">
        {patternSrc ? <img className="gmd-pattern-cover__asset" src={patternSrc} alt="" /> : null}
      </div>
      <div className="gmd-pattern-cover__content">
        {index ? <span className="gmd-pattern-cover__index">{index}</span> : null}
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </article>
  )
}

type EmptyStateProps = {
  title: string
  description: ReactNode
  action?: ReactNode
  ornamentSrc?: string
  className?: string
}

/** Helpful, non-blocking empty state for a collection or search result. */
export function EmptyState({ title, description, action, ornamentSrc, className = "" }: EmptyStateProps) {
  return (
    <section className={`gmd-empty-state ${className}`.trim()}>
      {ornamentSrc ? <img className="gmd-empty-state__ornament" src={ornamentSrc} alt="" aria-hidden="true" /> : null}
      <div className="gmd-empty-state__body">
        <h2>{title}</h2>
        <div className="gmd-empty-state__description">{description}</div>
        {action ? <div className="gmd-empty-state__action">{action}</div> : null}
      </div>
    </section>
  )
}

