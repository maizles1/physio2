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

/**
 * Web3Forms public access key. Web3Forms only accepts submissions sent from
 * the visitor's browser on the free plan, and the key is designed to be
 * public (it can only send to the inbox it was registered with).
 */
export const WEB3FORMS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '508775fc-382e-4616-97d8-c21fa7e907ea'
