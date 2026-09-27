import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    '/api/',
    '/admin-login',
    '/admin-exercises-builder',
    '/private/',
  ]

  const aiCrawlers = [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'ClaudeBot',
    'anthropic-ai',
    'PerplexityBot',
    'Google-Extended',
    'GoogleOther',
    'Applebot-Extended',
    'CCBot',
    'Bytespider',
    'cohere-ai',
    'meta-externalagent',
    'FacebookBot',
    'Amazonbot',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      ...['Googlebot', 'Bingbot', 'Slurp', ...aiCrawlers].map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow,
      })),
    ],
    sitemap: 'https://physio-plus.co.il/sitemap.xml',
    host: 'https://physio-plus.co.il',
  }
}
