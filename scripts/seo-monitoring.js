/**
 * Wrapper script להרצה אוטומטית של SEO monitoring
 * מיועד להרצה עם cron job
 */

const cron = require('node-cron')
const { seoMonitoringConfig } = require('../config/seo-monitoring.config.js')
const { main: runAudit } = require('./seo-audit')

const config = seoMonitoringConfig

/**
 * הרצת בדיקה מלאה ושילוח דוח
 */
async function runFullMonitoring() {
  console.log('🚀 Starting SEO Monitoring...')
  console.log(`Time: ${new Date().toISOString()}`)

  try {
    // Run audit
    const auditResult = await runAudit()
    const results = auditResult?.results || auditResult

    // Send email report
    if (config.email.enabled && results) {
      const { sendEmailReport } = require('./seo-email-report')
      await sendEmailReport(results)
    }

    console.log('✅ SEO Monitoring completed successfully!')
  } catch (error) {
    console.error('❌ SEO Monitoring failed:', error)
    // Don't throw - allow cron to continue
  }
}

/**
 * הגדרת Cron Job
 */
if (config.cron.enabled) {
  console.log(`⏰ Setting up cron job: ${config.cron.schedule}`)
  
  cron.schedule(config.cron.schedule, () => {
    console.log('⏰ Cron job triggered')
    runFullMonitoring()
  })

  console.log('✅ Cron job scheduled successfully!')
  console.log('Press Ctrl+C to stop...')
} else {
  console.log('⚠️ Cron is disabled in config')
  console.log('Running once now...')
  runFullMonitoring()
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down gracefully...')
  process.exit(0)
})

module.exports = { runFullMonitoring }










