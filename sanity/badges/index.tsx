import { DocumentBadgeComponent } from 'sanity';
import { CheckmarkCircleIcon, ClockIcon, WarningOutlineIcon } from '@sanity/icons';

export const PublishedBadge: DocumentBadgeComponent = (props) => {
  const { published, draft } = props;

  if (!published && draft) {
    return {
      label: 'Draft',
      title: 'This document is not published yet',
      color: 'warning',
      icon: WarningOutlineIcon,
    };
  }

  if (published && draft) {
    return {
      label: 'Edited',
      title: 'Published with unpublished edits',
      color: 'warning',
      icon: ClockIcon,
    };
  }

  if (published && !draft) {
    return {
      label: 'Published',
      title: 'This document is published',
      color: 'success',
      icon: CheckmarkCircleIcon,
    };
  }

  return null;
};

export const FeaturedBadge: DocumentBadgeComponent = (props) => {
  const doc = props.published || props.draft;
  const isFeatured = (doc as any)?.highlight || (doc as any)?.featured;

  if (isFeatured) {
    return {
      label: 'Featured',
      title: 'This document is featured on the homepage',
      color: 'primary',
    };
  }

  return null;
};

export const resolveBadges = (prev: DocumentBadgeComponent[], context: any) => {
  const { schemaType } = context;

  // Add published badge to all document types
  const badges = [PublishedBadge, ...prev];

  // Add featured badge to services and industries
  if (['service', 'industry'].includes(schemaType)) {
    badges.push(FeaturedBadge);
  }

  return badges;
};
