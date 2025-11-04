import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPageBySlug } from '@/sanity/lib/queries'
import PageSections from '@/components/page-builder/PageSections'

export const dynamic = 'force-dynamic'

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { isEnabled } = await draftMode()
  const page = await getPageBySlug(params.slug, isEnabled)
  if (!page) return notFound()
  return <PageSections sections={page.sections || []} />
}

