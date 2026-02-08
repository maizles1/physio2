import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPosts, type BlogPost } from '@/config/blog.config'
import { getRelatedPosts } from '@/lib/blog-utils'
import Breadcrumbs from '@/components/Breadcrumbs'
import SocialSharing from '@/components/SocialSharing'
import { sanitizeHtml } from '@/lib/security'

// פונקציה ליצירת map מהמערך
function getBlogPostsMap(): Record<string, BlogPost> {
  const posts = getAllPosts()
  const map: Record<string, BlogPost> = {}
  posts.forEach(post => {
    map[post.slug] = post
  })
  return map
}

export async function generateStaticParams() {
  const blogPosts = getBlogPostsMap()
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blogPosts = getBlogPostsMap()
  const post = blogPosts[slug]
  
  if (!post) {
    return {
      title: 'מאמר לא נמצא',
    }
  }

  return {
    title: `${post.title} | פיזיותרפיה.פלוס`,
    description: post.excerpt,
    authors: [{ name: 'אנדריי מייזלס' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://physio-plus.co.il/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['אנדריי מייזלס'],
      tags: post.keywords || [],
    },
    alternates: {
      canonical: `https://physio-plus.co.il/blog/${post.slug}`,
    },
    other: {
      'article:author': 'אנדריי מייזלס',
      'article:published_time': post.date,
      'article:modified_time': post.date,
      'article:section': post.category,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blogPosts = getBlogPostsMap()
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  // Check if post is a guide/tutorial (contains "מדריך", "איך", "guide", "how to")
  const isGuide = post.title.toLowerCase().includes('מדריך') || 
                  post.title.toLowerCase().includes('איך') ||
                  post.title.toLowerCase().includes('guide') ||
                  post.title.toLowerCase().includes('how to') ||
                  post.category.toLowerCase().includes('מדריך')

  // Article Schema for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `https://physio-plus.co.il${post.image}` : 'https://physio-plus.co.il/images/logo/clinic-logo.png',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'אנדריי מייזלס',
      url: 'https://physio-plus.co.il/about',
    },
    publisher: {
      '@type': 'MedicalBusiness',
      name: 'פיזיותרפיה.פלוס',
      url: 'https://physio-plus.co.il',
    },
    articleSection: post.category,
    keywords: post.keywords?.join(', ') || '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://physio-plus.co.il/blog/${post.slug}`,
    },
  }

  // HowTo Schema for guides
  const howToSchema = isGuide ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.excerpt,
    image: post.image ? `https://physio-plus.co.il${post.image}` : 'https://physio-plus.co.il/images/logo/clinic-logo.png',
    step: [
      {
        '@type': 'HowToStep',
        name: 'קרא את המאמר המלא',
        text: post.excerpt,
        url: `https://physio-plus.co.il/blog/${post.slug}`,
      },
    ],
    totalTime: 'PT30M', // Estimated reading time
    supply: [],
    tool: [],
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <article className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden py-12 sm:py-16" style={{ background: 'linear-gradient(to bottom right, #2A3080, #2080C0, #40C0F0)' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={[
              { label: 'דף בית', href: '/' },
              { label: 'בלוג', href: '/blog' },
              { label: post.title, href: `/blog/${post.slug}` }
            ]} />
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">{post.title}</h1>
            <p className="text-white text-base sm:text-lg">{post.date}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {post.image && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <div className="relative w-full h-64 sm:h-80 md:h-96">
                  <Image
                    src={post.image}
                    alt={`תמונה המלווה את המאמר "${post.title}" - מאמר על פיזיותרפיה מאת אנדריי מייזלס`}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 896px"
                    priority
                    quality={90}
                  />
                </div>
              </div>
            )}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <SocialSharing 
                title={post.title}
                description={post.excerpt}
                image={post.image}
                variant="horizontal"
              />
            </div>
            <div
              className="prose prose-lg max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-p:leading-relaxed prose-ul:space-y-2"
              style={{
                color: '#1f2937',
              }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
            />
            
            {/* Related Services Links */}
            <div className="mt-12 mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#2A3080' }}>
                שירותים רלוונטיים
              </h2>
              <p className="text-gray-700 mb-4">
                למדנו על הנושא? נשמח לעזור לך עם טיפול מקצועי. ראה את <Link href="/services" className="text-blue-600 hover:underline font-medium">השירותים שלנו</Link> או <Link href="/faq" className="text-blue-600 hover:underline font-medium">קרא שאלות נפוצות</Link>.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="inline-block bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
                >
                  כל השירותים
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-blue-600 text-white hover:bg-blue-700 font-medium py-2 px-6 rounded-lg transition-all duration-200"
                >
                  קבע תור
                </Link>
              </div>
            </div>

            <div className="mt-12 mb-8 text-center">
              <Link
                href="/contact"
                className="btn btn-primary btn-large inline-flex items-center gap-2"
                aria-label="קבע טיפול עכשיו - עמוד יצירת קשר"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                קבע טיפול עכשיו
              </Link>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <SocialSharing 
                title={post.title}
                description={post.excerpt}
                image={post.image}
                variant="horizontal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {(() => {
        const relatedPosts = getRelatedPosts(post, 3)
        if (relatedPosts.length === 0) return null
        
        return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#2A3080' }}>
                  מאמרים נוספים שעשויים לעניין אותך
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
                    >
                      <div className="h-32 bg-gradient-to-br from-[#2080C0] to-[#2A3080]"></div>
                      <div className="p-4">
                        <span className="text-xs text-gray-500 mb-2 block">{relatedPost.date}</span>
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#2A3080' }}>
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      {/* Back to Blog */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-medium transition-colors"
              style={{ color: '#2080C0' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              חזרה למאמרים נוספים
            </Link>
          </div>
        </div>
      </section>
    </article>
    </>
  )
}
