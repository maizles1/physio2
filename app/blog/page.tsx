import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/config/blog.config'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'בלוג פיזיותרפיה - מאמרים מקצועיים וטיפים | פיזיותרפיה.פלוס',
  description: 'מאמרים מקצועיים על פיזיותרפיה, טיפים לבריאות ושיקום, תרגילי פיזיותרפיה ומידע מקצועי על טיפולים. פיזיותרפיה.פלוס - מכון פיזיותרפיה פרטי באשדוד.',
  keywords: [
    'מאמרים פיזיותרפיה',
    'טיפים פיזיותרפיה',
    'תרגילי פיזיותרפיה',
    'בלוג פיזיותרפיה',
    'מידע על פיזיותרפיה',
  ],
  authors: [{ name: 'אנדריי מייזלס' }],
  openGraph: {
    title: 'בלוג פיזיותרפיה - מאמרים מקצועיים',
    description: 'מאמרים מקצועיים על פיזיותרפיה, טיפים לבריאות ושיקום',
    url: 'https://physio-plus.co.il/blog',
  },
  alternates: {
    canonical: 'https://physio-plus.co.il/blog',
  },
  other: {
    'geo.region': 'IL',
    'geo.placename': 'אשדוד',
  },
}

export default function BlogPage() {
  const blogPosts = getAllPosts()
  
  return (
    <div className="bg-white">
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
          <Breadcrumbs items={[{ label: 'דף בית', href: '/' }, { label: 'בלוג', href: '/blog' }]} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">בלוג ומאמרים</h1>
          <p className="text-lg sm:text-xl text-white">מאמרים מקצועיים, טיפים ומידע שימושי על פיזיותרפיה ובריאות</p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {blogPosts && blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              >
                {post.image ? (
                  <Link href={`/blog/${post.slug}`} className="block relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>
                ) : (
                <div className="h-48 bg-gradient-to-br from-[#2080C0] to-[#2A3080]"></div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-sm font-medium rounded-full" style={{ background: '#E3F2FD', color: '#2080C0' }}>
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 hover:opacity-80 transition-opacity" style={{ color: '#2A3080' }}>
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-medium transition-colors"
                    style={{ color: '#2080C0' }}
                  >
                    קרא עוד
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </div>
              </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">אין מאמרים זמינים כרגע</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
