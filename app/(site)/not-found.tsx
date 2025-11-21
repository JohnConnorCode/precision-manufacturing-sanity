import { getSiteSettings, getErrorPages } from '@/sanity/lib/queries'
import NotFoundContent from './not-found-content'

export default async function NotFound() {
  const [siteSettings, errorPages] = await Promise.all([
    getSiteSettings(),
    getErrorPages()
  ])

  return <NotFoundContent siteSettings={siteSettings} errorPages={errorPages} />
}
