/** Pain areas offered in the lead form. The API accepts only these values. */
export const LEAD_AREAS = [
  'כאבי גב',
  'כאבי צוואר',
  'כאבי כתף',
  'כאבי ברך',
  'שיקום אחרי ניתוח',
  'פציעת ספורט',
  'סחרחורות / ורטיגו',
  'כאבי לסת',
  'ביקור בית',
  'אחר',
] as const

export const LEAD_SOURCES = ['home', 'contact', 'service', 'meuhedet'] as const

export const LEAD_SOURCE_LABELS: Record<(typeof LEAD_SOURCES)[number], string> = {
  home: 'דף הבית',
  contact: 'צור קשר',
  service: 'עמוד שירות',
  meuhedet: 'מאוחדת',
}
