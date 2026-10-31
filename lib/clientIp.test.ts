import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getClientIdentifier } from './clientIp'

test('ignores a client-supplied cf-connecting-ip header', () => {
  const headers = new Headers({
    'cf-connecting-ip': '203.0.113.7',
    'x-real-ip': '198.51.100.1',
  })
  assert.equal(getClientIdentifier(headers), '198.51.100.1')
})

test('uses the platform x-real-ip when present', () => {
  const headers = new Headers({ 'x-real-ip': '198.51.100.2' })
  assert.equal(getClientIdentifier(headers), '198.51.100.2')
})

test('falls back to the first x-forwarded-for address', () => {
  const headers = new Headers({ 'x-forwarded-for': '198.51.100.3, 10.0.0.1' })
  assert.equal(getClientIdentifier(headers), '198.51.100.3')
})

test('returns "unknown" when only cf-connecting-ip is sent', () => {
  const headers = new Headers({ 'cf-connecting-ip': '203.0.113.9' })
  assert.equal(getClientIdentifier(headers), 'unknown')
})
