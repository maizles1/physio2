/**
 * סקריפט לשליחת דוח SEO באימייל
 * יוצר דוח HTML מפורט ושולח אותו באימייל
 */

const nodemailer = require('nodemailer')
const { seoMonitoringConfig, formatScore, getScoreColor, shouldSendAlert } = require('../config/seo-monitoring.config.js')
const fs = require('fs').promises
const path = require('path')

const config = seoMonitoringConfig

/**
 * יצירת דוח HTML
 */
function generateHTMLReport(results) {
  const date = new Date().toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  let html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>דוח SEO שבועי - פיזיותרפיה.פלוס</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background-color: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2080C0;
      border-bottom: 3px solid #2080C0;
      padding-bottom: 10px;
    }
    h2 {
      color: #2A3080;
      margin-top: 30px;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 5px;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    .summary-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    .summary-card h3 {
      margin: 0 0 10px 0;
      font-size: 14px;
      opacity: 0.9;
    }
    .summary-card .score {
      font-size: 36px;
      font-weight: bold;
      margin: 10px 0;
    }
    .page-result {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .page-result h3 {
      color: #2080C0;
      margin-top: 0;
    }
    .scores {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 15px 0;
    }
    .score-item {
      background-color: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #2080C0;
    }
    .score-item.good {
      border-left-color: #10b981;
    }
    .score-item.warning {
      border-left-color: #f59e0b;
    }
    .score-item.bad {
      border-left-color: #ef4444;
    }
    .score-item .label {
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
    }
    .score-item .value {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
    .issues {
      background-color: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 6px;
      padding: 15px;
      margin: 15px 0;
    }
    .issues h4 {
      margin-top: 0;
      color: #856404;
    }
    .issues ul {
      margin: 10px 0;
      padding-right: 20px;
    }
    .issues li {
      margin: 5px 0;
    }
    .good-news {
      background-color: #d4edda;
      border: 1px solid #28a745;
      border-radius: 6px;
      padding: 15px;
      margin: 15px 0;
    }
    .good-news h4 {
      margin-top: 0;
      color: #155724;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    .alert {
      background-color: #f8d7da;
      border: 1px solid #dc3545;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
    }
    .alert h4 {
      margin-top: 0;
      color: #721c24;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 דוח SEO שבועי - פיזיותרפיה.פלוס</h1>
    <p><strong>תאריך:</strong> ${date}</p>
    <p><strong>מספר עמודים שנבדקו:</strong> ${results.length}</p>
  `

  // Calculate averages
  const lighthouseScores = results
    .map(r => r.lighthouse?.scores)
    .filter(Boolean)
  
  const averages = {
    performance: lighthouseScores.reduce((sum, s) => sum + (s.performance || 0), 0) / lighthouseScores.length || 0,
    accessibility: lighthouseScores.reduce((sum, s) => sum + (s.accessibility || 0), 0) / lighthouseScores.length || 0,
    bestPractices: lighthouseScores.reduce((sum, s) => sum + (s.bestPractices || 0), 0) / lighthouseScores.length || 0,
    seo: lighthouseScores.reduce((sum, s) => sum + (s.seo || 0), 0) / lighthouseScores.length || 0,
  }

  // Summary section
  html += `
    <div class="summary">
      <div class="summary-card">
        <h3>ביצועים ממוצעים</h3>
        <div class="score">${formatScore(averages.performance)}</div>
      </div>
      <div class="summary-card">
        <h3>נגישות ממוצעת</h3>
        <div class="score">${formatScore(averages.accessibility)}</div>
      </div>
      <div class="summary-card">
        <h3>Best Practices ממוצע</h3>
        <div class="score">${formatScore(averages.bestPractices)}</div>
      </div>
      <div class="summary-card">
        <h3>SEO ממוצע</h3>
        <div class="score">${formatScore(averages.seo)}</div>
      </div>
    </div>
  `

  // Alerts
  const alerts = []
  if (shouldSendAlert(averages.performance, config.thresholds.performance)) {
    alerts.push(`ביצועים נמוכים מהסף (${formatScore(averages.performance)} < ${config.thresholds.performance})`)
  }
  if (shouldSendAlert(averages.seo, config.thresholds.seo)) {
    alerts.push(`SEO נמוך מהסף (${formatScore(averages.seo)} < ${config.thresholds.seo})`)
  }

  if (alerts.length > 0) {
    html += `
      <div class="alert">
        <h4>⚠️ התראות</h4>
        <ul>
          ${alerts.map(alert => `<li>${alert}</li>`).join('')}
        </ul>
      </div>
    `
  }

  // Page results
  html += '<h2>📄 תוצאות לפי עמוד</h2>'
  
  results.forEach(result => {
    const lighthouse = result.lighthouse
    const metaTags = result.metaTags
    const structuredData = result.structuredData
    const brokenLinks = result.brokenLinks

    html += `
      <div class="page-result">
        <h3>${result.url}</h3>
    `

    // Lighthouse scores
    if (lighthouse) {
      html += '<div class="scores">'
      Object.entries(lighthouse.scores).forEach(([key, score]) => {
        const threshold = config.thresholds[key] || 90
        const colorClass = score >= threshold ? 'good' : score >= threshold * 0.8 ? 'warning' : 'bad'
        html += `
          <div class="score-item ${colorClass}">
            <div class="label">${key}</div>
            <div class="value">${formatScore(score)}</div>
          </div>
        `
      })
      html += '</div>'
    }

    // Meta tags issues
    if (metaTags && metaTags.hasIssues) {
      html += `
        <div class="issues">
          <h4>⚠️ בעיות ב-Meta Tags:</h4>
          <ul>
            ${metaTags.issues.map(issue => `<li>${issue}</li>`).join('')}
          </ul>
        </div>
      `
    } else if (metaTags && !metaTags.hasIssues) {
      html += `
        <div class="good-news">
          <h4>✅ Meta Tags תקינים</h4>
        </div>
      `
    }

    // Structured data
    if (structuredData) {
      if (structuredData.hasIssues) {
        html += `
          <div class="issues">
            <h4>⚠️ בעיות ב-Structured Data:</h4>
            <p>נמצאו ${structuredData.count} schemas, חלקם לא תקינים</p>
          </div>
        `
      } else {
        html += `
          <div class="good-news">
            <h4>✅ Structured Data תקין</h4>
            <p>נמצאו ${structuredData.count} schemas תקינים</p>
          </div>
        `
      }
    }

    // Broken links
    if (brokenLinks && brokenLinks.hasIssues) {
      html += `
        <div class="issues">
          <h4>⚠️ קישורים שבורים:</h4>
          <ul>
            ${brokenLinks.brokenLinks.map(link => `<li>${link.url} (${link.status})</li>`).join('')}
          </ul>
        </div>
      `
    } else if (brokenLinks && !brokenLinks.hasIssues) {
      html += `
        <div class="good-news">
          <h4>✅ לא נמצאו קישורים שבורים</h4>
        </div>
      `
    }

    html += '</div>'
  })

  html += `
    <div class="footer">
      <p>דוח זה נוצר אוטומטית על ידי מערכת ניטור SEO</p>
      <p>פיזיותרפיה.פלוס - ${new Date().getFullYear()}</p>
    </div>
  </div>
</body>
</html>
  `

  return html
}

/**
 * שליחת דוח באימייל
 */
async function sendEmailReport(results) {
  if (!config.email.enabled) {
    console.log('Email is disabled in config')
    return
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.email.smtp.host,
      port: config.email.smtp.port,
      secure: config.email.smtp.secure,
      auth: config.email.smtp.auth,
    })

    const htmlReport = generateHTMLReport(results)

    const mailOptions = {
      from: config.email.from,
      to: config.email.to.join(', '),
      subject: `דוח SEO שבועי - פיזיותרפיה.פלוס - ${new Date().toLocaleDateString('he-IL')}`,
      html: htmlReport,
      text: 'דוח SEO זמין בפורמט HTML בלבד. אנא פתח את האימייל בדפדפן.',
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully:', info.messageId)
    return info
  } catch (error) {
    console.error('❌ Error sending email:', error)
    throw error
  }
}

/**
 * Main function
 */
async function main(results = null) {
  try {
    // If results not provided, try to load from audit script or run audit
    if (!results) {
      try {
        // Try to load from saved file (most recent)
        const fs = require('fs').promises
        const path = require('path')
        const reportsDir = path.join(__dirname, '../reports')
        
        try {
          const files = await fs.readdir(reportsDir)
          const jsonFiles = files.filter(f => f.startsWith('seo-audit-') && f.endsWith('.json'))
          if (jsonFiles.length > 0) {
            // Get most recent file
            jsonFiles.sort().reverse()
            const mostRecent = jsonFiles[0]
            const filepath = path.join(reportsDir, mostRecent)
            const data = await fs.readFile(filepath, 'utf8')
            results = JSON.parse(data)
            console.log(`📂 Loaded results from: ${mostRecent}`)
          }
        } catch (err) {
          // No saved results, run audit
          console.log('Running SEO audit...')
          const { auditAllPages } = require('./seo-audit')
          results = await auditAllPages()
        }
      } catch (error) {
        console.error('Error loading audit results:', error)
        throw new Error('No audit results available. Run seo-audit.js first.')
      }
    }

    await sendEmailReport(results)
    console.log('✅ Email report sent successfully!')
  } catch (error) {
    console.error('❌ Email report failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { generateHTMLReport, sendEmailReport, main }



