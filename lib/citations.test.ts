import { test } from 'node:test'
import assert from 'node:assert/strict'
import { blogPosts } from '../config/blog.config'
import { extractCitations, inTextLabel } from './citations'

test('extractCitations reads a DOI reference list item', () => {
  const html = `
    <h2 id="references">מקורות מדעיים (References)</h2>
    <ol dir="ltr">
      <li>Foster, N. E., et al. (2018). <a href="https://doi.org/10.1016/S0140-6736(18)30489-6">Prevention and treatment of low back pain</a>. <em>The Lancet, 391</em>(10137), 2368-2383.</li>
      <li>Davis, I. S., Rice, H. M., &amp; Wearing, S. C. (2017). <a href="https://doi.org/10.1016/j.jshs.2017.03.013">Why forefoot striking</a>. <em>Journal of Sport and Health Science, 6</em>(2), 154-161.</li>
    </ol>
  `
  const citations = extractCitations(html)
  assert.equal(citations.length, 2)
  assert.equal(citations[0].authors, 'Foster, N. E., et al.')
  assert.equal(citations[0].year, '2018')
  assert.equal(citations[0].journal, 'The Lancet')
  assert.equal(citations[0].doi, '10.1016/S0140-6736(18)30489-6')
  assert.equal(citations[1].authors, 'Davis, I. S., Rice, H. M., & Wearing, S. C.')
})

test('inTextLabel follows author-date rules', () => {
  assert.equal(inTextLabel('Speed, C.', '2014'), 'Speed, 2014')
  assert.equal(inTextLabel('Warne, J. P., & Gruber, A. H.', '2017'), 'Warne & Gruber, 2017')
  assert.equal(inTextLabel('Davis, I. S., Rice, H. M., & Wearing, S. C.', '2017'), 'Davis et al., 2017')
  assert.equal(inTextLabel('Foster, N. E., et al.', '2018'), 'Foster et al., 2018')
  assert.equal(inTextLabel('van Gent, R. N., et al.', '2007'), 'van Gent et al., 2007')
  assert.equal(inTextLabel('Côté, P., et al.', '2016'), 'Côté et al., 2016')
})

test('every blog post exposes at least five DOI citations after the article body', () => {
  assert.equal(blogPosts.length, 18)
  for (const post of blogPosts) {
    const refAt = post.content.indexOf('id="references"')
    const ctaAt = post.content.indexOf('צור קשר לקביעת תור')
    assert.ok(refAt > 0, post.slug)
    if (ctaAt >= 0) assert.ok(refAt < ctaAt, post.slug)
    const citations = extractCitations(post.content)
    assert.ok(citations.length >= 5, `${post.slug} has ${citations.length}`)
    const dois = citations.map((item) => item.doi)
    assert.equal(new Set(dois).size, dois.length, post.slug)
    const body = post.content.slice(0, refAt)
    for (const item of citations) {
      assert.match(item.url, /^https:\/\/doi\.org\//)
      assert.ok(item.title.length > 8, post.slug)
      assert.match(item.year, /^\d{4}$/)
      assert.ok(item.authors.length > 2, post.slug)
      assert.ok(item.journal && item.journal.length > 2, post.slug)
      assert.ok(post.content.includes(item.url), `${post.slug} hides ${item.url}`)
      const label = inTextLabel(item.authors, item.year).replace(/&/g, '&amp;')
      assert.ok(body.includes(label), `${post.slug} missing in-text (${label})`)
    }
  }
})
