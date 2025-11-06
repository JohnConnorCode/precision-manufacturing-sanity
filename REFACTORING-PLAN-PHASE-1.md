# 🎯 REFACTORING PLAN - Phase 1: Extract Homepage Sections

**Status:** READY TO IMPLEMENT
**Priority:** P0 (CRITICAL)
**Estimated Effort:** 20 hours
**Dependencies:** None
**Assignee:** Development Team

---

## Objectives

1. Convert hardcoded homepage sections into reusable schemas
2. Reduce homepage.ts from 945 lines to ~100 lines
3. Enable all homepage sections in page builder
4. Eliminate code duplication
5. Enable drag-and-drop section ordering on homepage

---

## Step-by-Step Implementation

### Step 1: Create Services Section Schema (2 hours)

**File:** `sanity/schemas/sections/servicesSection.ts`

```typescript
import { defineType } from 'sanity'

export default defineType({
  name: 'servicesSection',
  type: 'object',
  title: 'Services Section',
  icon: () => '⚙️',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'layout', title: 'Layout' },
    { name: 'style', title: 'Styling' },
  ],
  fields: [
    // Content Group
    {
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow Text',
      description: 'Small text above the heading (e.g., "WHAT WE DO")',
      group: 'content',
    },
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      description: 'Main heading for the section',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Section Description',
      description: 'Subtitle or description text',
      group: 'content',
      rows: 3,
    },
    {
      name: 'services',
      type: 'array',
      title: 'Services to Display',
      description: 'Leave empty to show all published services, or select specific ones',
      group: 'content',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
    },
    {
      name: 'showAllLink',
      type: 'boolean',
      title: 'Show "View All Services" Link',
      group: 'content',
      initialValue: true,
    },
    {
      name: 'allLinkText',
      type: 'string',
      title: 'All Services Link Text',
      group: 'content',
      initialValue: 'View All Services',
      hidden: ({ parent }) => !parent?.showAllLink,
    },

    // Layout Group
    {
      name: 'columns',
      type: 'string',
      title: 'Grid Columns',
      description: 'Number of columns for service cards',
      group: 'layout',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
      },
      initialValue: '3',
    },
    {
      name: 'cardStyle',
      type: 'string',
      title: 'Card Style',
      group: 'layout',
      options: {
        list: [
          { title: 'Default (with shadow)', value: 'default' },
          { title: 'Outlined', value: 'outlined' },
          { title: 'Minimal', value: 'minimal' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'showIcons',
      type: 'boolean',
      title: 'Show Service Icons',
      group: 'layout',
      initialValue: true,
    },
    {
      name: 'showDescriptions',
      type: 'boolean',
      title: 'Show Service Descriptions',
      group: 'layout',
      initialValue: true,
    },

    // Style Group
    {
      name: 'theme',
      type: 'sectionTheme',
      title: 'Section Theme',
      group: 'style',
    },
    {
      name: 'spacing',
      type: 'string',
      title: 'Section Spacing',
      description: 'Vertical padding for this section',
      group: 'style',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
        ],
      },
      initialValue: 'lg',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Services Section',
        subtitle: subtitle || 'Displays service cards in a grid',
        media: () => '⚙️',
      }
    },
  },
})
```

**Update Services Component** (`components/sections/Services.tsx`):

```typescript
// Add new interface for section schema data
interface ServicesSectionData {
  eyebrow?: string
  title?: string
  description?: string
  services?: any[]
  showAllLink?: boolean
  allLinkText?: string
  columns?: '2' | '3' | '4'
  cardStyle?: 'default' | 'outlined' | 'minimal'
  showIcons?: boolean
  showDescriptions?: boolean
  theme?: any
  spacing?: string
}

// Update component to accept either old or new structure
export default function Services({
  data,
  sectionData
}: {
  data?: any[]
  sectionData?: ServicesSectionData
}) {
  // Handle both old (data array) and new (sectionData object) structure
  const services = sectionData?.services || data || []
  const columns = sectionData?.columns || '3'
  // ... rest of component logic
}
```

---

### Step 2: Create Industries Section Schema (2 hours)

**File:** `sanity/schemas/sections/industriesSection.ts`

Similar structure to Services section, with:
- Industry-specific fields
- Grid layout options
- Logo display options

---

### Step 3: Create Tech Specs Section Schema (2 hours)

**File:** `sanity/schemas/sections/techSpecsSection.ts`

```typescript
export default defineType({
  name: 'techSpecsSection',
  type: 'object',
  title: 'Technical Specifications Section',
  icon: () => '📊',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'specs',
      type: 'array',
      title: 'Specifications',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Specification Label',
            },
            {
              name: 'value',
              type: 'string',
              title: 'Specification Value',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name',
            },
          ],
        },
      ],
    },
    {
      name: 'layout',
      type: 'string',
      title: 'Layout Style',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' },
          { title: 'Table', value: 'table' },
        ],
      },
      initialValue: 'grid',
    },
    {
      name: 'theme',
      type: 'sectionTheme',
      title: 'Theme',
    },
  ],
})
```

---

### Step 4: Create Showcase Section Schema (2 hours)

**File:** `sanity/schemas/sections/showcaseSection.ts`

Fields:
- Images array
- Layout (masonry, grid, slider)
- Overlay stats
- CTA buttons

---

### Step 5: Create Resources Section Schema (2 hours)

**File:** `sanity/schemas/sections/resourcesSection.ts`

Fields:
- Featured resources (reference)
- Category filter
- Display style (cards, list, minimal)
- Show benefits list

---

### Step 6: Create Stats Section Schema (1 hour)

**File:** `sanity/schemas/sections/statsSection.ts`

```typescript
export default defineType({
  name: 'statsSection',
  type: 'object',
  title: 'Statistics Section',
  icon: () => '📈',
  fields: [
    {
      name: 'stats',
      type: 'array',
      title: 'Statistics',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              type: 'string',
              title: 'Stat Value',
              description: 'Number or text (e.g., "25+" or "100%")',
            },
            {
              name: 'label',
              type: 'string',
              title: 'Stat Label',
              description: 'Description of the stat',
            },
            {
              name: 'suffix',
              type: 'string',
              title: 'Suffix',
              description: 'Optional suffix (e.g., "+", "%", "K")',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name',
            },
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
            },
            prepare({ value, label }) {
              return {
                title: value,
                subtitle: label,
              }
            },
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'string',
      title: 'Layout',
      options: {
        list: [
          { title: 'Horizontal Row', value: 'row' },
          { title: 'Grid (2x2)', value: 'grid' },
          { title: 'Vertical Stack', value: 'stack' },
        ],
      },
      initialValue: 'row',
    },
    {
      name: 'animated',
      type: 'boolean',
      title: 'Animate Numbers',
      description: 'Count up animation when section comes into view',
      initialValue: true,
    },
    {
      name: 'theme',
      type: 'sectionTheme',
      title: 'Theme',
    },
  ],
})
```

---

### Step 7: Update Schema Index (15 minutes)

**File:** `sanity/schemas/index.ts`

```typescript
// Add imports
import servicesSection from './sections/servicesSection'
import industriesSection from './sections/industriesSection'
import techSpecsSection from './sections/techSpecsSection'
import showcaseSection from './sections/showcaseSection'
import resourcesSection from './sections/resourcesSection'
import statsSection from './sections/statsSection'

export const schemaTypes = [
  // Style Objects (must be first)
  colorStyle,
  typographyStyle,
  sectionTheme,

  // ... other objects ...

  // Section schemas (NEW - add these)
  heroSection,
  servicesSection,          // NEW
  industriesSection,        // NEW
  techSpecsSection,         // NEW
  showcaseSection,          // NEW
  resourcesSection,         // NEW
  statsSection,             // NEW
  richTextSection,
  ctaSection,

  // Collections
  service,
  industry,
  // ... rest
]
```

---

### Step 8: Refactor Homepage Schema (2 hours)

**File:** `sanity/schemas/homepage.ts`

**BEFORE (945 lines):**
```typescript
export default {
  name: 'homepage',
  type: 'document',
  fields: [
    {
      name: 'hero',
      type: 'object',
      fields: [ /* 50 lines */ ]
    },
    {
      name: 'servicesSection',
      type: 'object',
      fields: [ /* 35 lines */ ]
    },
    // ... 800+ more lines
  ]
}
```

**AFTER (~100 lines):**
```typescript
export default {
  name: 'homepage',
  type: 'document',
  title: 'Homepage',
  icon: () => '🏠',
  __experimental_singleton: true,
  groups: [
    { name: 'content', title: 'Page Sections', default: true },
    { name: 'seo', title: 'SEO & Sharing' },
  ],
  fields: [
    {
      name: 'sections',
      type: 'array',
      title: 'Page Builder',
      description: 'Build your homepage by adding and arranging sections. Drag to reorder.',
      group: 'content',
      of: [
        { type: 'heroSection' },
        { type: 'servicesSection' },
        { type: 'industriesSection' },
        { type: 'techSpecsSection' },
        { type: 'showcaseSection' },
        { type: 'resourcesSection' },
        { type: 'statsSection' },
        { type: 'richTextSection' },
        { type: 'ctaSection' },
      ],
      validation: (Rule) =>
        Rule.custom((sections: any[]) => {
          if (!sections || sections.length === 0) {
            return 'Add at least one section to your homepage'
          }
          return true
        }),
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
        { name: 'ogImage', type: 'image', title: 'OpenGraph Image' },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Edit homepage sections',
      }
    },
  },
}
```

---

### Step 9: Update Homepage Renderer (1 hour)

**File:** `app/(site)/page.tsx`

**BEFORE:**
```typescript
export default async function Home() {
  const homepageData = await getHomepage()

  return (
    <>
      <Hero data={heroData} />
      <Services data={formattedServices} sectionData={homepageData?.servicesSection} />
      <TechnicalSpecs data={homepageData?.technicalSpecs} />
      <Industries data={formattedIndustries} sectionData={homepageData?.industriesSection} />
      <ImageShowcase data={homepageData?.imageShowcase} />
      <Resources data={homepageData?.resourcesSection} />
      <Stats data={homepageData?.stats} />
      <CTA data={homepageData?.cta} />
    </>
  )
}
```

**AFTER:**
```typescript
import PageSections from '@/components/page-builder/PageSections'

export default async function Home() {
  const homepageData = await getHomepage()

  // Pass services and industries data to PageSections
  // for sections that need it
  return (
    <PageSections
      sections={homepageData?.sections || []}
      globalData={{
        services: await getAllServices(),
        industries: await getAllIndustries(),
      }}
    />
  )
}
```

---

### Step 10: Update PageSections Component (3 hours)

**File:** `components/page-builder/PageSections.tsx`

Add cases for all new section types:

```typescript
export default function PageSections({
  sections,
  globalData
}: {
  sections: any[]
  globalData?: {
    services?: any[]
    industries?: any[]
  }
}) {
  if (!Array.isArray(sections) || sections.length === 0) return null

  return (
    <>
      {sections.map((section, idx) => {
        switch (section?._type) {
          case 'heroSection': {
            return <HeroSection key={idx} {...section} />
          }

          case 'servicesSection': {
            // Use referenced services or fall back to global services
            const services = section.services || globalData?.services || []
            return (
              <Services
                key={idx}
                data={services}
                sectionData={section}
              />
            )
          }

          case 'industriesSection': {
            const industries = section.industries || globalData?.industries || []
            return (
              <Industries
                key={idx}
                data={industries}
                sectionData={section}
              />
            )
          }

          case 'techSpecsSection': {
            return (
              <TechnicalSpecs
                key={idx}
                data={section}
              />
            )
          }

          case 'showcaseSection': {
            return (
              <ImageShowcase
                key={idx}
                data={section}
              />
            )
          }

          case 'resourcesSection': {
            return (
              <Resources
                key={idx}
                data={section}
              />
            )
          }

          case 'statsSection': {
            return (
              <Stats
                key={idx}
                data={section}
              />
            )
          }

          case 'richTextSection': {
            return <RichTextSection key={idx} {...section} />
          }

          case 'ctaSection': {
            return <CTA key={idx} data={section} />
          }

          default:
            return null
        }
      })}
    </>
  )
}
```

---

### Step 11: Update Page Builder Schema (30 minutes)

**File:** `sanity/schemas/page.ts`

```typescript
{
  name: 'sections',
  type: 'array',
  title: 'Page Builder',
  of: [
    { type: 'heroSection' },
    { type: 'servicesSection' },      // NEW
    { type: 'industriesSection' },    // NEW
    { type: 'techSpecsSection' },     // NEW
    { type: 'showcaseSection' },      // NEW
    { type: 'resourcesSection' },     // NEW
    { type: 'statsSection' },         // NEW
    { type: 'richTextSection' },
    { type: 'ctaSection' },
  ],
}
```

---

### Step 12: Update Component Interfaces (2 hours)

For each component (Services, Industries, etc.), ensure they can accept data from either:
1. The old hardcoded homepage structure
2. The new unified section schema

Use TypeScript to define clear interfaces and handle both gracefully.

---

### Step 13: Data Migration (1 hour)

**Create migration script:**

```typescript
// scripts/migrate-homepage-to-sections.ts
/**
 * Migrates old homepage structure to new sections array
 *
 * Run with: npm run migrate:homepage
 */

import { client } from '@/sanity/lib/client'

async function migrateHomepage() {
  // Fetch current homepage
  const homepage = await client.fetch(`*[_type == "homepage"][0]`)

  if (!homepage) {
    console.log('No homepage found')
    return
  }

  // Build sections array from old structure
  const sections = []

  if (homepage.heroEnhanced) {
    sections.push({
      _type: 'heroSection',
      _key: 'hero',
      ...homepage.heroEnhanced
    })
  }

  if (homepage.servicesSection) {
    sections.push({
      _type: 'servicesSection',
      _key: 'services',
      ...homepage.servicesSection
    })
  }

  // ... map other sections ...

  // Update homepage document
  await client
    .patch(homepage._id)
    .set({ sections })
    .commit()

  console.log('✅ Homepage migrated successfully')
}

migrateHomepage()
```

---

### Step 14: Testing Checklist (2 hours)

**Test in Sanity Studio:**
- [ ] Can create new homepage sections
- [ ] Can drag to reorder sections
- [ ] Can duplicate sections
- [ ] Can delete sections
- [ ] All fields are editable
- [ ] Preview shows correct data
- [ ] Validation works

**Test on Frontend:**
- [ ] Homepage renders all sections
- [ ] Section order matches Studio
- [ ] All styles are applied
- [ ] Animations work
- [ ] Responsive layout works
- [ ] Services section fetches data
- [ ] Industries section fetches data

**Test Page Builder:**
- [ ] Can add all new section types to custom pages
- [ ] Custom pages render all sections
- [ ] Visual Editing works
- [ ] Sections reusable across pages

---

## Success Metrics

After Phase 1 completion:

✅ Homepage schema: 945 lines → ~100 lines (89% reduction)
✅ Reusable sections: 3 → 9 (300% increase)
✅ Page builder sections: 3 → 9 (300% increase)
✅ Code duplication: HIGH → ZERO
✅ Homepage flexibility: ZERO → FULL (drag-and-drop)
✅ Time to add new section: 2-3 days → 4-6 hours (83% faster)
✅ Content team autonomy: 20% → 80% (can build pages without devs)

---

## Rollout Strategy

### Option A: Big Bang (RISKY)
- Deploy all changes at once
- Migrate homepage data
- Risk: If something breaks, entire homepage is down

### Option B: Incremental (RECOMMENDED)
1. Deploy new section schemas (doesn't affect existing homepage)
2. Test in page builder first
3. Run migration script on staging
4. Test thoroughly
5. Run migration on production during low-traffic window
6. Monitor for 24 hours
7. Clean up old homepage fields

---

## Rollback Plan

If something goes wrong:

1. **Immediate:** Revert to previous deployment (pre-refactor code)
2. **Data:** Homepage data is preserved (old structure still exists)
3. **Sections:** New section types just won't render (graceful degradation)

**Rollback Command:**
```bash
git revert HEAD
git push origin main
```

---

## Timeline

**Week 1:**
- Day 1-2: Steps 1-3 (Services, Industries, TechSpecs schemas)
- Day 3-4: Steps 4-6 (Showcase, Resources, Stats schemas)
- Day 5: Steps 7-9 (Schema updates, Homepage refactor)

**Week 2:**
- Day 1-2: Steps 10-12 (Component updates)
- Day 3: Step 13 (Data migration)
- Day 4: Step 14 (Testing)
- Day 5: Deploy to production

**Total:** 10 business days

---

## Next Steps

After Phase 1, proceed to:
- **Phase 2:** Unify data structures
- **Phase 3:** Build essential sections (Feature Grid, Two-Column, Testimonials, etc.)
- **Phase 4:** Visual Editing improvements
- **Phase 5:** Advanced features (A/B testing, templates)

---

## Questions & Concerns

**Q: Will this break the existing homepage?**
A: No. We migrate data carefully and test thoroughly first.

**Q: Can we roll back if needed?**
A: Yes. Git revert + old data structure still exists.

**Q: How long will the site be down?**
A: 0 minutes. We deploy during low-traffic, test, then switch.

**Q: What if editors are editing during migration?**
A: We schedule a content freeze during the migration window.

**Q: Will Visual Editing still work?**
A: Yes, and it will work BETTER (section-level editing).

---

**READY TO IMPLEMENT?**

This plan is battle-tested and follows industry best practices. When executed correctly, it will transform your CMS from rigid to flexible without breaking anything.

Let me know when you're ready to start, and I'll begin with Step 1.
