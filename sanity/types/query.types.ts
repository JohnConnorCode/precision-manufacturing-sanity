/**
 * Query Result Types
 *
 * These types represent the shape of data returned by GROQ queries.
 * They complement the auto-generated Sanity types by providing
 * specific interfaces for projected query results.
 *
 * @see sanity.types.ts for auto-generated schema types
 */

// ============================================================================
// COMMON TYPES
// ============================================================================

export interface SanityImage {
  asset?: {
    url: string
    _id: string
    metadata?: {
      lqip?: string
      blurhash?: string
      dimensions?: {
        width: number
        height: number
        aspectRatio: number
      }
    }
  }
  alt?: string
  caption?: string
  attribution?: string
  hotspot?: {
    x: number
    y: number
    width: number
    height: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanitySlug {
  current: string
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string | string[]
  keywords?: string[]
  ogImage?: SanityImage
}

export interface CTAButton {
  enabled?: boolean
  label?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  text?: string
}

export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    href?: string
  }>
}

// ============================================================================
// SERVICES
// ============================================================================

export interface ServiceCard {
  _id: string
  title: string
  slug: SanitySlug
  shortDescription?: string
  iconName?: string
  image?: SanityImage
  imageUrl?: string
  highlight?: string
  order?: number
  published?: boolean
  cardCtaText?: string
}

export interface ServiceDetail extends ServiceCard {
  description?: string
  specs?: string[]
  hero?: {
    backgroundImage?: SanityImage
    badge?: string
    title?: string
    subtitle?: string
    descriptionRich?: PortableTextBlock[]
    buttons?: CTAButton[]
  }
  overview?: {
    description?: string
    descriptionRich?: PortableTextBlock[]
  }
  capabilities?: Array<{
    _key: string
    enabled?: boolean
    title?: string
    description?: string
    iconName?: string
    image?: SanityImage
    features?: string[]
  }>
  services?: Array<{
    title?: string
    description?: string
    iconName?: string
    image?: SanityImage
    bullets?: string[]
    features?: string[]
  }>
  applications?: Array<{
    title?: string
    description?: string
    timeline?: string
    challenges?: string[]
    image?: SanityImage
  }>
  cta?: {
    heading?: string
    description?: string
    buttons?: CTAButton[]
  }
  seo?: SEO
}

// ============================================================================
// INDUSTRIES
// ============================================================================

export interface IndustryCard {
  _id: string
  title: string
  slug: SanitySlug
  shortDescription?: string
  iconName?: string
  image?: SanityImage
  imageUrl?: string
  highlight?: string
  order?: number
  published?: boolean
}

export interface IndustryDetail extends IndustryCard {
  description?: string
  hero?: {
    backgroundImage?: SanityImage
    badge?: string
    title?: string
    subtitle?: string
    descriptionRich?: PortableTextBlock[]
    buttons?: CTAButton[]
  }
  capabilities?: Array<{
    _key: string
    enabled?: boolean
    title?: string
    description?: string
    iconName?: string
    image?: SanityImage
    specs?: string[]
  }>
  certifications?: Array<{
    _key: string
    name?: string
    description?: string
    iconName?: string
  }>
  cta?: {
    heading?: string
    description?: string
    buttons?: CTAButton[]
  }
  seo?: SEO
}

// ============================================================================
// RESOURCES
// ============================================================================

export interface ResourceCard {
  _id: string
  title: string
  slug: SanitySlug
  excerpt?: string
  category?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | string
  readTime?: string
  publishDate?: string
  featuredImage?: SanityImage
  featured?: boolean
  published?: boolean
  author?: string
}

export interface ResourceDetail extends ResourceCard {
  content?: PortableTextBlock[]
  tags?: string[]
  relatedResources?: ResourceCard[]
  seo?: SEO
  caption?: string
  attribution?: string
}

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export interface TeamMemberQueryResult {
  _id: string
  name: string
  title: string
  bio?: string
  photo?: SanityImage
  linkedin?: string
  email?: string
  order?: number
  published?: boolean
}

// ============================================================================
// JOB POSTINGS
// ============================================================================

export interface JobPostingQueryResult {
  _id: string
  title: string
  slug: SanitySlug
  department?: string
  location?: string
  employmentType?: string
  salaryRange?: string
  shortDescription?: string
  description?: PortableTextBlock[]
  requirements?: string[]
  benefits?: string[]
  featured?: boolean
  published?: boolean
  order?: number
}

// ============================================================================
// HOMEPAGE
// ============================================================================

export interface HomepageHero {
  enabled?: boolean
  backgroundGradient?: string
  headingTextColor?: string
  taglineTextColor?: string
  heading1?: string
  heading2?: string
  heading3?: string
  tagline?: string
  slides?: Array<{
    _key: string
    enabled?: boolean
    title?: string
    image?: SanityImage
  }>
  badges?: Array<{
    _key: string
    enabled?: boolean
    text?: string
    iconName?: string
  }>
  primaryCta?: CTAButton
  secondaryCta?: CTAButton
}

export interface HomepageLogos {
  enabled?: boolean
  heading?: string
  logos?: Array<{
    _key: string
    enabled?: boolean
    name?: string
    logo?: SanityImage
  }>
}

export interface HomepageStats {
  enabled?: boolean
  heading?: string
  title?: string
  subtitle?: string
  description?: string
  backgroundColor?: string
  titleTextColor?: string
  subtitleTextColor?: string
  stats?: Array<{
    _key: string
    enabled?: boolean
    value?: string
    label?: string
    description?: string
    iconName?: string
  }>
  items?: Array<{
    _key: string
    enabled?: boolean
    value?: string
    label?: string
    description?: string
  }>
}

export interface HomepageQueryResult {
  hero?: HomepageHero
  clientLogos?: HomepageLogos
  logos?: HomepageLogos
  stats?: HomepageStats
  servicesSection?: {
    enabled?: boolean
    eyebrow?: string
    heading?: string
    headingWord1?: string
    headingWord2?: string
    description?: string
    subdescription?: string
    header?: {
      eyebrow?: string
      heading?: string
      headingWord1?: string
      headingWord2?: string
      description?: string
    }
    cta?: CTAButton
  }
  industriesSection?: {
    enabled?: boolean
    eyebrow?: string
    heading?: string
    description?: string
    subdescription?: string
    header?: {
      eyebrow?: string
      title?: string
      titleHighlight?: string
      description?: string
    }
  }
  technicalSpecs?: {
    enabled?: boolean
    title?: string
    subtitle?: string
    specs?: Array<{
      _key: string
      enabled?: boolean
      label?: string
      value?: string
      description?: string
      iconName?: string
      gradient?: string
    }>
  }
  metricsSection?: HomepageStats
  imageShowcase?: {
    enabled?: boolean
    header?: {
      eyebrow?: string
      title?: string
      titleHighlight?: string
      description?: string
    }
    backgroundColor?: string
    titleColor?: string
    highlightColor?: string
    showcaseImages?: Array<{
      _key: string
      enabled?: boolean
      title?: string
      category?: string
      href?: string
      src?: string
      alt?: string
      image?: SanityImage
    }>
    stats?: Array<{
      _key: string
      enabled?: boolean
      iconName?: string
      value?: string
      label?: string
    }>
    cta?: {
      title?: string
      description?: string
      buttons?: CTAButton[]
    }
  }
  operationalExcellence?: {
    enabled?: boolean
    heading?: string
    description?: string
    benefits?: Array<{
      _key: string
      enabled?: boolean
      iconName?: string
      title?: string
      description?: string
    }>
  }
  resourcesSection?: {
    enabled?: boolean
    header?: {
      badge?: string
      title?: string
      description?: string
    }
    backgroundColor?: string
    titleColor?: string
    badgeColor?: string
    additionalSeriesText?: string
    featuredSeries?: Array<{
      _key: string
      enabled?: boolean
      title?: string
      slug?: string
      description?: string
      articleCount?: number
      readTime?: string
      difficulty?: string
      level?: string
      icon?: string
      gradient?: string
    }>
    benefits?: Array<{
      _key: string
      enabled?: boolean
      iconName?: string
      title?: string
      description?: string
    }>
    cta?: {
      title?: string
      description?: string
      buttons?: CTAButton[]
    }
  }
  cta?: {
    enabled?: boolean
    title?: string
    subtitle?: string
    badge?: string
    certifications?: Array<{
      _key: string
      enabled?: boolean
      icon?: string
      text?: string
    }>
    trustMessage?: string
    buttons?: CTAButton[]
  }
  seo?: SEO
}

// ============================================================================
// SITE SETTINGS
// ============================================================================

export interface SiteContact {
  address?: string
  addressLine2?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  email?: string
}

export interface SiteSocial {
  linkedin?: string
  twitter?: string
  facebook?: string
}

export interface SiteSettingsQueryResult {
  siteName?: string
  tagline?: string
  contact?: SiteContact
  social?: SiteSocial
  defaultSeo?: SEO
  topBar?: {
    enabled?: boolean
    message?: string
    phone?: string
  }
}

// ============================================================================
// NAVIGATION
// ============================================================================

export interface NavItem {
  _key: string
  label?: string
  href?: string
  enabled?: boolean
  highlight?: boolean
}

export interface NavGroup {
  _key: string
  label?: string
  enabled?: boolean
  items?: NavItem[]
}

export interface NavigationQueryResult {
  mainNav?: NavGroup[]
  mobileNav?: NavItem[]
}

// ============================================================================
// FOOTER
// ============================================================================

export interface FooterColumn {
  title?: string
  links?: Array<{
    label?: string
    href?: string
    enabled?: boolean
  }>
}

export interface FooterQueryResult {
  columns?: FooterColumn[]
  bottomLinks?: Array<{
    label?: string
    href?: string
    enabled?: boolean
  }>
  copyright?: string
  certifications?: Array<{
    name?: string
    enabled?: boolean
  }>
}

// ============================================================================
// CONTACT PAGE
// ============================================================================

export interface ContactPage {
  hero?: {
    backgroundImage?: SanityImage
    backgroundImageUrl?: string
    badge?: string
    badgeIconName?: string
    title?: string
    titleHighlight?: string
    description?: string
    buttonLabel?: string
    buttonHref?: string
  }
  contactInfo?: {
    heading?: string
    description?: string
    addressLine1?: string
    addressLine2?: string
    addressLine3?: string
    phone?: string
    phoneLink?: string
    phoneDescription?: string
    email?: string
    emailDescription?: string
    hoursLine1?: string
    hoursLine2?: string
    submitButtonText?: string
    consultationHeading?: string
  }
  locationImage?: SanityImage
  locationDescription?: string
  certifications?: Array<{
    enabled?: boolean
    certification?: string
  }>
  bottomStats?: Array<{
    enabled?: boolean
    iconName?: string
    text?: string
    animated?: boolean
  }>
  seo?: SEO
}

// ============================================================================
// CAREERS PAGE
// ============================================================================

export interface CareersPage {
  hero?: {
    backgroundImage?: SanityImage
    backgroundImageUrl?: string
    badge?: string
    badgeIconName?: string
    title?: string
    titleHighlight?: string
    description?: string
    buttons?: CTAButton[]
  }
  whyWorkHere?: {
    heading?: string
    paragraph1?: string
    paragraph2?: string
    paragraph3?: string
    image?: SanityImage
    imageUrl?: string
    imageAlt?: string
  }
  benefits?: {
    title?: string
    description?: string
    items?: Array<{
      enabled?: boolean
      title?: string
      description?: string
      iconName?: string
    }>
  }
  values?: {
    title?: string
    description?: string
    items?: Array<{
      enabled?: boolean
      title?: string
      description?: string
    }>
  }
  opportunities?: {
    title?: string
    description?: string
  }
  cta?: {
    title?: string
    description?: string
    buttons?: CTAButton[]
  }
  seo?: SEO
}

// ============================================================================
// ABOUT PAGE
// ============================================================================

export interface AboutPage {
  hero?: {
    backgroundImage?: SanityImage
    badge?: string
    badgeIconName?: string
    title?: string
    titleHighlight?: string
    description?: string
    buttons?: CTAButton[]
  }
  story?: {
    heading?: string
    paragraphs?: string[]
    image?: SanityImage
    stats?: Array<{
      value?: string
      label?: string
    }>
  }
  mission?: {
    heading?: string
    description?: string
    values?: Array<{
      title?: string
      description?: string
      iconName?: string
    }>
  }
  team?: {
    heading?: string
    description?: string
  }
  certifications?: {
    heading?: string
    description?: string
    items?: Array<{
      name?: string
      description?: string
      iconName?: string
    }>
  }
  cta?: {
    heading?: string
    description?: string
    buttons?: CTAButton[]
  }
  seo?: SEO
}

// ============================================================================
// PAGE CONTENT (Generic)
// ============================================================================

export interface PageSection {
  _type: 'heroSection' | 'richTextSection' | 'ctaSection'
  _key: string
  enabled?: boolean
  [key: string]: unknown
}

export interface GenericPage {
  _id: string
  title: string
  slug: SanitySlug
  published?: boolean
  sections?: PageSection[]
  seo?: SEO
}
