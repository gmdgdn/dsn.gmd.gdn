import type { LucideIcon, LucideProps } from 'lucide-react'
import { cn } from 'cn'

export type GMDIconProps = Omit<LucideProps, 'size' | 'strokeWidth'> & {
  icon: LucideIcon
  scale?: 'compact' | 'default' | 'large'
  directional?: boolean
  label?: string
}

/** Functional line icon. Labels are for standalone informational icons;
 * icon-only actions must also name their button. Mirror navigation arrows only. */
export function GMDIcon({ icon: Icon, scale = 'default', directional = false, label, className, ...props }: GMDIconProps) {
  return <Icon {...props} className={cn('gmd-icon', className)} data-scale={scale} data-directional={directional || undefined}
    strokeWidth={2} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false" />
}
