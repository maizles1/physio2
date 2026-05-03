#!/usr/bin/env node
/**
 * Send CI alert email via Resend API (GitHub Actions).
 * Env: RESEND_API_KEY, CI_ALERT_KIND (failure | lint-autofix), CI_ALERT_TO, CI_ALERT_EMAIL_FROM,
 *      GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_WORKFLOW, GITHUB_REF_NAME
 */

const kind = process.env.CI_ALERT_KIND || 'failure'
const apiKey = process.env.RESEND_API_KEY?.trim()
const to = (process.env.CI_ALERT_TO || 'maizles1@gmail.com').trim()
const from =
  process.env.CI_ALERT_EMAIL_FROM?.trim() ||
  'Physio Plus CI <onboarding@resend.dev>'
const server = process.env.GITHUB_SERVER_URL || 'https://github.com'
const repo = process.env.GITHUB_REPOSITORY || ''
const runId = process.env.GITHUB_RUN_ID || ''
const workflow = process.env.GITHUB_WORKFLOW || 'daily-site-health'
const ref = process.env.GITHUB_REF_NAME || ''

const runUrl = repo ? `${server}/${repo}/actions/runs/${runId}` : ''

const subjects = {
  failure: `[physio2 CI] כשל בבדיקת בריאות יומית — ${workflow}`,
  'lint-autofix': `[physio2 CI] תוקנו בעיות לינט אוטומטית ונדחף ל-main`,
}

const subject = subjects[kind] || subjects.failure

const bodyFailure = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
  <p>הרצת הבדיקות היומית ב-GitHub Actions נכשלה.</p>
  <p><strong>Workflow:</strong> ${escapeHtml(workflow)}<br>
  <strong>Branch:</strong> ${escapeHtml(ref)}<br>
  <strong>Run:</strong> <a href="${escapeHtml(runUrl)}">${escapeHtml(runUrl)}</a></p>
  <p>פתח את הקישור לעיל כדי לראות לוגים מלאים.</p>
</body>
</html>`

const bodyAutofix = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6;">
  <p>בוצע <code>eslint --fix</code> אוטומטית, נוצר commit, והשינויים נדחפו ל־<strong>main</strong>.</p>
  <p><strong>Workflow:</strong> ${escapeHtml(workflow)}<br>
  <strong>Run:</strong> <a href="${escapeHtml(runUrl)}">${escapeHtml(runUrl)}</a></p>
  <p>מומלץ לעבור על ה-diff ב-GitHub כדי לוודא שהכל צפוי.</p>
</body>
</html>`

const html = kind === 'lint-autofix' ? bodyAutofix : bodyFailure

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function main() {
  if (!apiKey) {
    console.warn('ci-send-alert: RESEND_API_KEY missing; skip email.')
    process.exit(0)
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  })

  const text = await res.text()
  if (!res.ok) {
    console.error('Resend error:', res.status, text)
    process.exit(1)
  }
  console.log('ci-send-alert: sent', kind, text)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
