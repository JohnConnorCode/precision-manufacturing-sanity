import { DocumentBadgeComponent } from 'sanity'

export function resolveBadges(prev: DocumentBadgeComponent[], context: any): DocumentBadgeComponent[] {
  const badges: DocumentBadgeComponent[] = []

  // Published/Draft badge
  if (context.document?.published === false) {
    badges.push(() => ({
      label: 'Draft',
      color: 'warning',
    }))
  } else if (context.document?.published === true) {
    badges.push(() => ({
      label: 'Published',
      color: 'success',
    }))
  }

  // Featured badge (for documents that support it)
  if (context.document?.featured === true) {
    badges.push(() => ({
      label: 'Featured',
      color: 'primary',
      icon: () => '⭐',
    }))
  }

  // Scheduled badge (for future publish dates)
  if (context.document?.datePosted || context.document?.postedDate) {
    const postDate = new Date(context.document.datePosted || context.document.postedDate)
    const now = new Date()

    if (postDate > now) {
      badges.push(() => ({
        label: 'Scheduled',
        color: 'primary',
        icon: () => '📅',
      }))
    }
  }

  // Archived/Expired badge (for documents with closing dates)
  if (context.document?.closingDate) {
    const closeDate = new Date(context.document.closingDate)
    const now = new Date()

    if (closeDate < now) {
      badges.push(() => ({
        label: 'Expired',
        color: 'danger',
      }))
    }
  }

  return [...badges, ...prev]
}
