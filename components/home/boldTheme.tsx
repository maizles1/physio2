// Shared look for the homepage "bold" design: colours, display font and section heading.
// Note: globals.css styles h1-h6 and p without a layer, which beats Tailwind utilities,
// so sizes and colours on those elements are set inline.
import { Karantina } from 'next/font/google'

export const display = Karantina({ subsets: ['hebrew'], weight: ['700'], display: 'swap' })

export const INK = '#14161F'
export const PAPER = '#F3EEE5'
export const YELLOW = '#FFD23F'
export const BLUE = '#1E78B8'

export const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")"

export type Surface = 'paper' | 'ink' | 'yellow'

export const SURFACES: Record<Surface, { bg: string; fg: string; sub: string; accent: string; rule: string }> = {
  paper: { bg: PAPER, fg: INK, sub: '#3b3f4c', accent: BLUE, rule: 'rgba(20,22,31,0.2)' },
  ink: { bg: INK, fg: PAPER, sub: 'rgba(243,238,229,0.78)', accent: YELLOW, rule: 'rgba(243,238,229,0.22)' },
  yellow: { bg: YELLOW, fg: INK, sub: '#2b2d36', accent: INK, rule: 'rgba(20,22,31,0.25)' },
}

/** Section wrapper with the paper grain on light surfaces. */
export function BoldSection({
  surface,
  id,
  children,
  className = '',
}: {
  surface: Surface
  id?: string
  children: React.ReactNode
  className?: string
}) {
  const s = SURFACES[surface]
  return (
    <section id={id} className={`relative overflow-hidden py-14 sm:py-20 ${className}`} style={{ background: s.bg }}>
      {surface !== 'ink' && (
        <div
          className="pointer-events-none absolute inset-0 hidden sm:block opacity-[0.16] mix-blend-multiply"
          style={{ backgroundImage: PAPER_GRAIN }}
          aria-hidden="true"
        />
      )}
      <div className="container mx-auto px-5 relative">{children}</div>
    </section>
  )
}

/** Numbered eyebrow + giant condensed heading. */
export function BoldHeading({
  surface,
  index,
  label,
  title,
  center = false,
}: {
  surface: Surface
  index: string
  label: string
  title: React.ReactNode
  center?: boolean
}) {
  const s = SURFACES[surface]
  return (
    <div className={`mb-8 sm:mb-10 ${center ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-3 mb-2 ${center ? 'justify-center' : ''}`}>
        <div className={`${display.className} text-2xl leading-none`} style={{ color: s.accent }}>
          {index}
        </div>
        <div className="h-[2px] w-8" style={{ background: s.fg }} />
        <div className="text-sm font-bold tracking-wide" style={{ color: s.fg }}>
          {label}
        </div>
      </div>
      <h2
        className={`${display.className} m-0!`}
        style={{ color: s.fg, fontSize: 'clamp(3.2rem, 11vw, 6rem)', lineHeight: 0.88, fontWeight: 700, letterSpacing: 0 }}
      >
        {title}
      </h2>
    </div>
  )
}
