/**
 * חילוץ מקורות מדעיים ממקטע "מקורות מדעיים" בתוכן מאמר, לסכמת JSON-LD.
 */

export interface ArticleCitation {
  authors: string
  year: string
  title: string
  url: string
  doi: string
  journal?: string
}

function decodeHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * תווית ציטוט בגוף הטקסט לפי APA 7:
 * מחבר אחד (Speed, 2014), שניים (Dubois & Esculier, 2020), שלושה ויותר (Foster et al., 2018).
 */
export function inTextLabel(authors: string, year: string): string {
  const decoded = authors.replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
  const surname = decoded.split(',')[0]?.trim() ?? decoded
  if (/et al\.?$/i.test(decoded)) return `${surname} et al., ${year}`

  const people = [...decoded.matchAll(/([^,&]+),\s*(?:[A-Z]\.\s*)+/g)].map((match) => match[1].trim())

  if (people.length >= 3) return `${people[0]} et al., ${year}`
  if (people.length === 2) return `${people[0]} & ${people[1]}, ${year}`
  return `${surname}, ${year}`
}

/** מקורות עם קישור DOI מתוך רשימת המקורות של המאמר */
export function extractCitations(html: string): ArticleCitation[] {
  const marker = html.split(/<h2[^>]*>[\s\S]*?מקורות מדעיים[\s\S]*?<\/h2>/i)[1]
  if (!marker) return []
  const list = marker.match(/<(?:ol|ul)[\s\S]*?<\/(?:ol|ul)>/i)?.[0]
  if (!list) return []

  const citations: ArticleCitation[] = []
  for (const item of list.matchAll(/<li>([\s\S]*?)<\/li>/gi)) {
    const raw = item[1]
    const link = raw.match(/<a[^>]*href="(https:\/\/doi\.org\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/i)
    if (!link) continue

    const url = link[1]
    const doi = decodeURIComponent(url.replace(/^https:\/\/doi\.org\//i, ''))
    const beforeLink = decodeHtml(raw.slice(0, raw.indexOf('<a')))
    const authorYear = beforeLink.match(/^(.*)\((\d{4})\)\.\s*$/)
    const journal = decodeHtml(raw.match(/<em>([\s\S]*?)<\/em>/i)?.[1] ?? '').split(',')[0]?.trim()

    citations.push({
      authors: (authorYear?.[1] ?? beforeLink).replace(/\s+/g, ' ').trim(),
      year: authorYear?.[2] ?? '',
      title: decodeHtml(link[2]),
      url,
      doi,
      ...(journal ? { journal } : {}),
    })
  }
  return citations
}
