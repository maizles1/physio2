import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  parseHebrewDate,
  tryParseHebrewDate,
  isValidDate,
  toSitemapLastmod,
} from './date-utils'
import { blogPosts } from '../config/blog.config'

test('tryParseHebrewDate parses known clinic blog dates', () => {
  const parsed = tryParseHebrewDate('3 במאי 2026')
  assert.ok(parsed)
  assert.equal(parsed.getFullYear(), 2026)
  assert.equal(parsed.getMonth(), 4)
  assert.equal(parsed.getDate(), 3)
})

test('tryParseHebrewDate accepts ISO calendar dates', () => {
  const parsed = tryParseHebrewDate('2026-05-03')
  assert.ok(parsed)
  assert.equal(parsed.getFullYear(), 2026)
  assert.equal(parsed.getMonth(), 4)
  assert.equal(parsed.getDate(), 3)
})

test('tryParseHebrewDate returns undefined for missing or garbage metadata', () => {
  assert.equal(tryParseHebrewDate(undefined), undefined)
  assert.equal(tryParseHebrewDate(null), undefined)
  assert.equal(tryParseHebrewDate(''), undefined)
  assert.equal(tryParseHebrewDate('   '), undefined)
  assert.equal(tryParseHebrewDate('not a date'), undefined)
  assert.equal(tryParseHebrewDate('31 בפברואר 2025'), undefined)
  assert.equal(tryParseHebrewDate({ date: '3 במאי 2026' }), undefined)
})

test('parseHebrewDate never throws and never returns Invalid Date', () => {
  const inputs: unknown[] = [
    undefined,
    null,
    '',
    'bad',
    '31 בפברואר 2025',
    '3 במאי 2026',
    2026,
  ]
  for (const input of inputs) {
    const date = parseHebrewDate(input as string)
    assert.ok(isValidDate(date), `expected valid Date for ${String(input)}`)
  }
})

test('toSitemapLastmod omits invalid values instead of throwing', () => {
  assert.equal(toSitemapLastmod('3 במאי 2026'), '2026-05-03')
  assert.equal(toSitemapLastmod('2025-01-01'), '2025-01-01')
  assert.equal(toSitemapLastmod(undefined), undefined)
  assert.equal(toSitemapLastmod('Invalid Date'), undefined)
  assert.equal(toSitemapLastmod(new Date('not-a-date')), undefined)
  assert.doesNotThrow(() => toSitemapLastmod({}))
})

test('every published blog post has a parseable Hebrew date', () => {
  for (const post of blogPosts) {
    const parsed = tryParseHebrewDate(post.date)
    assert.ok(parsed, `unparseable date for slug=${post.slug} date=${String(post.date)}`)
  }
})
