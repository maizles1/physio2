import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseHebrewDate, tryParseHebrewDate, isValidDate } from './date-utils.ts'
import { blogPosts } from '../config/blog.config.ts'

test('tryParseHebrewDate parses known clinic blog dates', () => {
  const parsed = tryParseHebrewDate('3 במאי 2026')
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

test('every published blog post has a parseable Hebrew date', () => {
  for (const post of blogPosts) {
    const parsed = tryParseHebrewDate(post.date)
    assert.ok(parsed, `unparseable date for slug=${post.slug} date=${String(post.date)}`)
  }
})
