import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { getNavigation } from '@/sanity/lib/queries'

function normalizeHref(name: string, href?: string | null) {
  const n = (name || '').toLowerCase()
  const h = (href || '').trim()
  if (h && h !== '#') return h
  if (n.includes('about')) return '/about'
  if (n.includes('contact')) return '/contact'
  if (n.includes('service')) return '/services'
  if (n.includes('industr')) return '/industries'
  if (n.includes('resource')) return '/resources'
  if (n.includes('career') || n.includes('job')) return '/careers'
  return '/'
}

function mapItem(item: any) {
  if (!item) return null
  // Handle explicit group objects
  if (item?._type === 'navGroup') {
    const title = item?.groupTitle || 'Group'
    const items = Array.isArray(item?.items) ? item.items.map(mapItem).filter(Boolean) : []
    return { name: title, href: '', description: '', linkType: 'internal', openInNewTab: false, iconName: null, showInHeader: true, showInMobile: true, style: { variant: 'link', badgeText: null }, children: items }
  }
  const name = item?.name ?? ''
  const href = normalizeHref(name, item?.href ?? '')
  const children = Array.isArray(item?.children) ? item.children.map(mapItem).filter(Boolean) : []
  return {
    name,
    href,
    description: item?.description || '',
    linkType: item?.linkType || 'internal',
    openInNewTab: Boolean(item?.openInNewTab),
    iconName: (item?.iconPreset && item.iconPreset !== 'custom' && item.iconPreset !== 'none') ? item.iconPreset : (item?.iconName || null),
    showInHeader: item?.showInHeader !== false,
    showInMobile: item?.showInMobile !== false,
    style: {
      variant: item?.style?.variant || 'link',
      badgeText: item?.style?.badgeText || null,
    },
    children,
  }
}

export async function GET() {
  try {
    const { isEnabled } = await draftMode()
    const nav = await getNavigation(isEnabled)

    const safe = {
      topBar: nav?.topBar ?? null,
      cta: nav?.cta ?? null,
      styles: nav?.styles ?? null,
      menuItems: Array.isArray(nav?.menuItems) ? nav.menuItems.map(mapItem).filter(Boolean) : [],
    }

    return NextResponse.json(safe, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to load navigation' }, { status: 500 })
  }
}
