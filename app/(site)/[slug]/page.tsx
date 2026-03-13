import { getSiteUrl } from '@/lib/site-url';
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { Metadata } from 'next'
import { getPageBySlug } from '@/sanity/lib/queries'
import PageSections from '@/components/page-builder/PageSections'

// ISR for automatic updates when Sanity content changes (supports draft mode preview)
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const page = await getPageBySlug(slug, isEnabled)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  const baseUrl = getSiteUrl()
  const title = page.seo?.metaTitle || page.title
  const description = page.seo?.metaDescription || ''
  const ogImage = page.seo?.ogImage?.asset?.url

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${slug}`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${baseUrl}/${slug}`,
      siteName: 'IIS - Integrated Inspection Systems',
      title,
      description,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const page = await getPageBySlug(slug, isEnabled)
  if (!page) return notFound()
  return <PageSections sections={page.sections || []} />
}
