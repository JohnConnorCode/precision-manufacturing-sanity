# Claude Code Guidelines for Precision Manufacturing Site

## CRITICAL: NO SHORTCUTS - BEST PRACTICES ALWAYS

**This is a production marketing website for a precision manufacturing company. Every detail matters.**

---

## ⚠️ ABSOLUTE RULES - NO EXCEPTIONS

These rules are NON-NEGOTIABLE. Violations must be fixed immediately.

### Rule 0: ALWAYS VERIFY YOUR WORK - NO ASKING

**NEVER ask "should I check this?" - ALWAYS check your work automatically.**

- After ANY code change, take screenshots and visually verify
- After ANY fix, test that the fix actually works
- Check dark mode AND light mode
- Check desktop AND mobile viewports
- Check scroll behavior and animations
- Check multiple pages, not just one
- If you can't verify something visually, say so explicitly
- DO NOT mark tasks as "completed" until visually verified
- DO NOT ask the user if you should verify - just do it

**This is not optional. Failing to verify work wastes time and creates cycles of broken fixes.**

### Rule 1: ALL CONTENT MUST BE IN SANITY CMS

**Every single piece of user-visible content MUST be stored in and fetched from Sanity CMS:**

| Content Type | Must Be In Sanity? | Example |
|--------------|-------------------|---------|
| Page headings | ✅ YES | "About Our Company" |
| Body text | ✅ YES | Paragraphs, descriptions |
| Button labels | ✅ YES | "Get a Quote", "Learn More" |
| Image URLs | ✅ YES | All images from Sanity CDN |
| Image alt text | ✅ YES | Stored with each image |
| Link URLs | ✅ YES | CTAs, navigation links |
| Stats/numbers | ✅ YES | "50+ Years", "99.9%" |
| Icon names | ✅ YES | Stored as strings, rendered from Lucide |
| SEO metadata | ✅ YES | Title, description, OG images |
| Feature lists | ✅ YES | Bullet points, specs |

**❌ NEVER acceptable:**
```typescript
// WRONG - Hardcoded content
const defaultContent = {
  title: "Our Services",
  description: "We provide excellence..."
};

// WRONG - Inline strings
<h1>Welcome to Precision Manufacturing</h1>

// WRONG - Hardcoded arrays
const features = ["Feature 1", "Feature 2", "Feature 3"];
```

**✅ ONLY acceptable pattern:**
```typescript
// Content fetched from Sanity
const data = await getPageContent('about');

// Component uses Sanity data - fallbacks are EMERGENCY ONLY
<h1>{data?.title}</h1>
<p>{data?.description}</p>
```

### Rule 2: NO "DEFAULT CONTENT" OBJECTS

**Creating `defaultContent` or `fallbackData` objects is PROHIBITED.**

If a page/component has no CMS data:
1. Create the Sanity schema
2. Create the document in Sanity Studio
3. Fetch and display the CMS data

Do NOT create hardcoded fallback content as a "temporary solution."

### Rule 3: ALL IMAGES FROM SANITY CDN

**Every image URL must come from `cdn.sanity.io`:**

✅ `https://cdn.sanity.io/images/vgacjlhu/production/...`
❌ `https://images.unsplash.com/...`
❌ `/images/local-file.jpg`
❌ Any hardcoded image URL

### Rule 4: ACCESSIBILITY IS MANDATORY

**All animations must respect `prefersReducedMotion`:**

```typescript
import { usePrefersReducedMotion } from '@/lib/motion';

function AnimatedComponent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? {} : { scale: 1.05 }}
    >
      {/* content */}
    </motion.div>
  );
}
```

### Rule 5: B2B PROFESSIONAL ANIMATIONS ONLY

**This is a precision manufacturing site for aerospace/defense clients. Keep animations:**
- Subtle and professional (no flashy effects)
- Purposeful (guide attention, not distract)
- Performant (60fps, GPU-accelerated properties only)

**❌ Banned effects:**
- Scan lines, glitch effects
- Excessive shimmer/sparkle
- Bouncing elements
- Multiple simultaneous animations on one element

---

## 0. SANITY API TOKEN MANAGEMENT

### Current API Token (Read/Write Access)

**Token Location:** `.env.local`
**Token Value:** `skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ`

**Environment Variables:**
```bash
SANITY_API_READ_TOKEN="skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ"
SANITY_API_WRITE_TOKEN="skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ"
```

**Usage in Scripts:**
```typescript
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skZkv9VgTIqtlGQmwfqYPaZPjJt5CVuoPcXRrCiU5iXm0w3kckT1qQ2fXS4vSqywgBeh6pHFG4zT3okJ2Y6sh7Ck7s4FEjOmX9Mi8K91sA9kgTTwbneRRKdQkIHc01f2uneC1qgRNVZ9SzY94o0d5IK4ZFP3Aqdz1YSPiNE8KcRm3f2pIRjZ'
});
```

**Token Permissions:**
- ✅ Read access to `production` dataset
- ✅ Write access to `production` dataset
- ✅ Can query documents
- ✅ Can create/update/patch documents
- ✅ Can delete documents

**Managing Tokens:**
- Tokens are managed at: https://www.sanity.io/manage/personal/tokens
- If you get 403 Forbidden errors, the token may have been revoked
- Create new tokens with Editor permissions for full read/write access
- Always update both READ and WRITE tokens in `.env.local`

**Token Security:**
- ⚠️ Keep tokens in `.env.local` (already in `.gitignore`)
- ⚠️ Never commit tokens to git
- ⚠️ Rotate tokens if exposed publicly
- ⚠️ Use separate tokens for production vs development when deploying

---

## 1. SANITY CMS - EVERYTHING MUST BE EDITABLE

### Golden Rule: NO HARDCODED CONTENT

**EVERY piece of visible content MUST be editable in Sanity Studio:**
- ✅ All text (headings, paragraphs, button labels, badges, stats)
- ✅ All images (with hotspot/crop controls)
- ✅ All icons (stored as icon names, rendered from library)
- ✅ All URLs (links, CTAs, navigation)
- ✅ All colors (when configurable)
- ✅ All metadata (SEO, OG images, alt text)

❌ **WRONG:**
```typescript
// Hardcoded text - NOT editable in CMS
<h1>Precision Manufacturing Services</h1>
<p>We deliver excellence since 1995</p>
<Button href="/contact">Contact Us</Button>
```

✅ **CORRECT:**
```typescript
// All content from Sanity with fallbacks
<h1>{data?.heading || 'Precision Manufacturing Services'}</h1>
<p>{data?.description || 'We deliver excellence since 1995'}</p>
<Button href={data?.ctaHref || '/contact'}>
  {data?.ctaText || 'Contact Us'}
</Button>
```

### Image Best Practices

**ALWAYS enable hotspot and metadata:**
```typescript
// In Sanity schema
{
  name: 'heroImage',
  type: 'image',
  title: 'Hero Image',
  options: {
    hotspot: true,  // REQUIRED - enables drag-to-reposition
    metadata: ['blurhash', 'lqip', 'palette'],  // REQUIRED
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      validation: (Rule) => Rule.required().error('Alt text is required')
    }
  ]
}
```

**In components:**
```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source)
}

// Use with automatic hotspot support
<Image
  src={urlFor(data.heroImage).width(1920).height(1080).url()}
  alt={data.heroImage?.alt || 'Hero image'}
  width={1920}
  height={1080}
/>
```

### Icon Best Practices

**Store icon names, not components:**
```typescript
// In Sanity schema
{
  name: 'iconName',
  type: 'string',
  title: 'Icon Name',
  description: 'Lucide icon name (e.g., "Check", "ArrowRight", "Cog")'
}

// In component - map string to icon component
import * as Icons from 'lucide-react'

function DynamicIcon({ name, ...props }: { name: string }) {
  const Icon = (Icons as any)[name] || Icons.Circle
  return <Icon {...props} />
}

// Usage
<DynamicIcon name={data.iconName || 'Circle'} className="w-6 h-6" />
```

### Validation Rules

**ALL schemas MUST have:**
```typescript
{
  name: 'title',
  type: 'string',
  validation: (Rule) => Rule.required().error('Title is required')
}

{
  name: 'metaDescription',
  type: 'text',
  validation: (Rule) => Rule.max(160).warning('Should be 160 chars or less')
}

{
  name: 'slug',
  type: 'slug',
  options: { source: 'title' },
  validation: (Rule) => Rule.required().error('Click Generate to create slug')
}
```

---

## 2. ANIMATIONS - THE SINGLE CORRECT PATTERN

### ⚠️ CRITICAL: Why Animations Break

**The Problem:**
1. `whileInView` only triggers when element ENTERS viewport
2. On page refresh, elements already visible don't "enter" - they're already there
3. So animations don't play on refresh - content just appears

### THE SOLUTION: useAnimateInView Hook

We have ONE hook that solves all animation problems. Use it everywhere.

**Location:** `@/lib/use-animate-in-view`

```typescript
import { useAnimateInView, ANIM_STATES, ANIM_TRANSITION } from '@/lib/use-animate-in-view';

function MyComponent() {
  const { ref, shouldAnimate } = useAnimateInView();

  return (
    <motion.div
      ref={ref}
      initial={ANIM_STATES.fadeUp.initial}
      animate={shouldAnimate ? ANIM_STATES.fadeUp.animate : ANIM_STATES.fadeUp.initial}
      transition={ANIM_TRANSITION}
    >
      {children}
    </motion.div>
  );
}
```

### OR: Use AnimatedSection Component

Even simpler - use the pre-built component:

```typescript
import AnimatedSection from '@/components/ui/animated-section';

<AnimatedSection delay={0.2}>
  <YourContent />
</AnimatedSection>
```

### For Hero Sections: isMounted Pattern

Hero sections use `animate` directly (not scroll-triggered), so they need `isMounted`:

```typescript
const [isMounted, setIsMounted] = useState(false);
useEffect(() => { setIsMounted(true); }, []);

<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
  transition={{ delay: 0.4, duration: 0.8 }}
>
```

### Animation States (ANIM_STATES)

```typescript
fadeUp:   { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }
fadeIn:   { initial: { opacity: 0 }, animate: { opacity: 1 } }
scaleIn:  { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } }
```

### Standard Transition

```typescript
{ duration: 0.5, ease: "easeOut" }
```

### Hover Effects (Still use motion props directly)

```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.3 }}
>
```

### Animation Rules

1. **Use `useAnimateInView` or `AnimatedSection`** for scroll-triggered content
2. **Use `isMounted` pattern** for hero sections with `animate` prop
3. **Never use bare `whileInView`** - it breaks on page refresh
4. **Duration:** 0.5s standard, 0.3s for hover
5. **Easing:** `"easeOut"` for all entry animations

### Animation Performance

**ONLY animate GPU-accelerated properties:**
- ✅ opacity, transform (scale, translateX, translateY, rotate)
- ❌ width, height, top, left, margin, padding

---

## 3. STYLING - CONSISTENCY GUIDELINES

### Color System (Tailwind)

**Use ONLY these colors from the design system:**
```typescript
// Primary (Blue)
'bg-blue-600'     // Primary buttons, accents
'bg-blue-700'     // Hover states
'text-blue-600'   // Links, highlights

// Neutral (Gray)
'bg-zinc-900'     // Dark backgrounds
'bg-zinc-800'     // Cards on dark
'bg-zinc-50'      // Light backgrounds
'text-zinc-400'   // Muted text
'text-zinc-900'   // Headings

// Borders
'border-zinc-200' // Light mode
'border-zinc-800' // Dark mode
```

### ⚠️ CRITICAL: Gradient Text (WebKit Compatibility)

**Tailwind's `bg-clip-text text-transparent` DOES NOT work in Safari/WebKit.**

❌ **BROKEN in Safari:**
```typescript
<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
  Gradient Text
</span>
```

✅ **CORRECT - Use inline styles:**
```typescript
<span
  style={{
    background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }}
>
  Gradient Text
</span>
```

**THE STANDARD GRADIENT (use this everywhere):**
```
#3b82f6 → #4f46e5  (blue-600 to indigo-600)
```

**Pattern for splitting heading with gradient on last word(s):**
```typescript
const title = "Start Your Manufacturing Project";
const words = title.split(' ');
const firstPart = words.slice(0, -2).join(' ');  // "Start Your"
const lastPart = words.slice(-2).join('\u00A0'); // "Manufacturing Project" (non-breaking space)

return (
  <h2 className="text-4xl font-bold text-white">
    {firstPart && <span>{firstPart} </span>}
    <span
      style={{
        background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {lastPart}
    </span>
  </h2>
);
```

**Files using this pattern:**
- `components/sections/CTA.tsx` - CTA section headings
- `components/sections/OperationalExcellence.tsx` - Section headers
- `components/sections/Hero.tsx` - Hero titles
- `components/ui/section-header.tsx` - All section headers (uses `getGradientTextStyle`)
- `components/ui/premium-button.tsx` - Ghost variant buttons
- All hero sections in page files (services, industries, resources, etc.)

### Typography Scale

**Use ONLY these text sizes:**
```typescript
// Headings
'text-5xl md:text-6xl'  // H1 - Page hero
'text-4xl md:text-5xl'  // H2 - Section headers
'text-3xl md:text-4xl'  // H3 - Subsections
'text-2xl md:text-3xl'  // H4 - Card titles

// Body
'text-lg'               // Large body (intros)
'text-base'             // Standard body
'text-sm'               // Small text (captions)
'text-xs'               // Tiny text (labels)
```

### Spacing System

**Use ONLY these spacing values:**
```typescript
// Section padding
'py-24 md:py-32'        // Standard section spacing

// Container
'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'  // Standard container

// Grid gaps
'gap-8'                 // Card grids
'gap-4'                 // Compact grids
'gap-2'                 // Dense layouts
```

### Component Consistency

**Section Header Pattern (STANDARD):**
```typescript
<div className="text-center mb-16">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <p className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-2">
      {data?.eyebrow || 'SECTION EYEBROW'}
    </p>
    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
      {data?.heading || 'Section Heading'}
    </h2>
    <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
      {data?.description || 'Section description'}
    </p>
  </motion.div>
</div>
```

**Card Pattern (STANDARD):**
```typescript
<motion.div
  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
  transition={{ duration: 0.3 }}
  className="bg-white rounded-xl shadow-lg overflow-hidden"
>
  <div className="relative h-48">
    <Image src={image} alt={alt} fill className="object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-2xl font-bold text-zinc-900 mb-2">{title}</h3>
    <p className="text-zinc-600 mb-4">{description}</p>
    <Link
      href={href}
      className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2"
    >
      {label} <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
</motion.div>
```

---

## 4. TYPESCRIPT & TYPE SAFETY

### Rules

- **NEVER use `any` types** - define proper interfaces
- **NEVER skip type checking** - run `npx tsc --noEmit` before commits
- **ALWAYS define component props interfaces**

```typescript
// ✅ CORRECT
interface ServiceCardProps {
  title: string
  description: string
  image?: {
    asset: { url: string }
    alt: string
  }
  href: string
}

export default function ServiceCard({ title, description, image, href }: ServiceCardProps) {
  return (...)
}
```

---

## 5. TESTING REQUIREMENTS

### NEVER Test Status Codes Alone

❌ **WRONG:**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/resources
# Returns 200 - but might show "0 articles"!
```

✅ **CORRECT:**
```bash
# Verify actual content exists
curl -s http://localhost:3000/resources | grep -o "article" | wc -l
# Should return > 0
```

### Before Claiming Something Works

1. ✅ Check actual page content (text, images, data)
2. ✅ Verify no JavaScript errors in console
3. ✅ Confirm data loads from Sanity
4. ✅ Test user-facing functionality

**Status 200 ≠ Working. Test actual content!**

---

## 6. DEVELOPMENT WORKFLOW

### Starting Development
```bash
pkill -f "next dev"
rm -rf .next
npm run dev
```

### Before Committing
```bash
# 1. Type check
npx tsc --noEmit

# 2. Build
npm run build

# 3. Test
npm test

# 4. Verify no errors
```

---

## 7. PROJECT ARCHITECTURE

### Tech Stack
- **Next.js 15.5.3** with App Router
- **Sanity CMS v3** for all content
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Webpack** (Turbopack disabled - has CSS bugs)

### Important Constraints

**Async Client Components Are Invalid:**
```typescript
// ❌ WRONG
'use client'
export default async function Page() { ... }

// ✅ CORRECT - Pick one:
// Option 1: Server component (async allowed)
export default async function Page() { ... }

// Option 2: Client component (no async)
'use client'
export default function Page() { ... }
```

**Framer Motion Requires 'use client':**
```typescript
'use client'
import { motion } from 'framer-motion'

export default function AnimatedSection() {
  return <motion.div>...</motion.div>
}
```

---

## 8. SANITY SCHEMA BEST PRACTICES

### Every Schema Must Have:

```typescript
export default {
  name: 'example',
  type: 'document',
  title: 'Example',

  // 1. Ordering options
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}]
    }
  ],

  // 2. Preview configuration
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image'
    }
  },

  fields: [
    // 3. Required validation
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Required')
    },

    // 4. Slug with source
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required()
    },

    // 5. Images with hotspot
    {
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette']
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          validation: (Rule) => Rule.required()
        }
      ]
    },

    // 6. SEO fields
    {
      name: 'seo',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string' },
        { name: 'metaDescription', type: 'text' },
        {
          name: 'ogImage',
          type: 'image',
          options: { hotspot: true }
        }
      ]
    }
  ]
}
```

---

## 9. CONTENT VISIBILITY TOGGLES

### Hiding Content Without Deletion

**Use Case:** Allow content editors to temporarily hide content (services, industries, resources, buttons, benefits) without deleting it from Sanity.

### Pattern: `published` Field for Collections

**For Service, Industry, and Resource schemas:**

```typescript
{
  name: 'published',
  type: 'boolean',
  title: 'Published',
  description: 'Controls whether this item appears on the website. Uncheck to hide without deleting.',
  initialValue: true,
}
```

**Add visual indicator in preview:**

```typescript
preview: {
  select: {
    title: 'title',
    subtitle: 'shortDescription',
    media: 'image',
    published: 'published'
  },
  prepare(selection: any) {
    const {title, subtitle, media, published} = selection
    const status = published === false ? ' (HIDDEN)' : ''
    return {
      title: `${title}${status}`,
      subtitle: subtitle,
      media: media
    }
  }
}
```

**Filter in GROQ queries:**

```typescript
// Always filter collections by published status
export async function getAllServices() {
  const query = `*[_type == "service" && published == true] | order(order asc) {
    // ... fields
  }`
  return await client.fetch(query)
}

// Also filter by-slug queries for security
export async function getServiceBySlug(slug: string) {
  const query = `*[_type == "service" && slug.current == $slug && published == true][0] {
    // ... fields
  }`
  return await client.fetch(query, { slug })
}
```

### Pattern: `enabled` Field for Array Items

**For homepage sections with arrays (buttons, benefits):**

```typescript
{
  name: 'buttons',
  type: 'array',
  title: 'Buttons',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enabled',
          description: 'Uncheck to hide this button without deleting it',
          initialValue: true,
        },
        {name: 'text', type: 'string', title: 'Text'},
        {name: 'href', type: 'string', title: 'URL'},
        {name: 'variant', type: 'string', title: 'Variant'},
      ],
    },
  ],
}
```

**Filter in components:**

```typescript
// CTA Component
export default function CTA({ data }: CTAProps) {
  const buttons = (data?.buttons || defaultButtons)
    .filter(button => button.enabled !== false)

  return (
    <div>
      {buttons.map((button) => (
        <Button key={button.text} href={button.href}>
          {button.text}
        </Button>
      ))}
    </div>
  )
}

// Resources Component - Benefits
{resourcesData.benefits
  .filter((benefit: any) => benefit.enabled !== false)
  .map((benefit: any, index: number) => (
    <BenefitCard key={index} {...benefit} />
  ))}
```

### Where to Apply Visibility Toggles

**Collections (use `published` field):**
- ✅ Services
- ✅ Industries
- ✅ Resources
- ✅ Team Members
- ❌ Global singletons (use different pattern)

**Array Items (use `enabled` field):**
- ✅ Homepage CTA buttons (`homepage.cta.buttons`)
- ✅ Resources section benefits (`homepage.resourcesSection.benefits`)
- ✅ Resources section CTA buttons (`homepage.resourcesSection.cta.buttons`)
- ✅ Image Showcase CTA buttons (`homepage.imageShowcase.cta.buttons`)

### Complete Implementation Checklist

When adding visibility toggles:
- [ ] Add `published` or `enabled` field to schema with `initialValue: true`
- [ ] Add visual indicator in preview (for collections)
- [ ] Update all GROQ queries to filter by status
- [ ] Update all components to filter arrays
- [ ] Test hiding content in Sanity Studio
- [ ] Verify hidden content doesn't appear on frontend
- [ ] Verify hidden content still appears in Studio

### Why This Pattern?

✅ **Non-destructive** - Content preserved, easy to re-enable
✅ **Clear intent** - `published`/`enabled` names are self-documenting
✅ **Secure** - Filters at query level prevent URL access
✅ **Flexible** - Can schedule content by combining with date fields

---

## 10. SUCCESS CRITERIA

When making ANY change, verify:
- [ ] All content is editable in Sanity (NO hardcoded text/images)
- [ ] All images have hotspot enabled
- [ ] All animations use standard patterns
- [ ] TypeScript has no errors (`npx tsc --noEmit`)
- [ ] Build completes (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] Dev server runs without errors
- [ ] No JavaScript console errors
- [ ] Actual content displays (not just 200 status)

---

## 11. COMMON PITFALLS TO AVOID

1. ❌ **ANIMATION HYDRATION BUG** - Using `motion.div animate={{...}}` without `mounted` check in stateful components (Header, etc.) - causes elements to stay invisible! Use `SafeMotion` or `useMounted()` hook.
2. ❌ **GRADIENT TEXT WEBKIT BUG** - Using Tailwind's `bg-clip-text text-transparent` - DOES NOT WORK in Safari! Use inline styles with `WebkitBackgroundClip` and `WebkitTextFillColor` instead.
3. ❌ Hardcoding content instead of using Sanity
4. ❌ Forgetting `hotspot: true` on images
5. ❌ Using `animate` instead of `whileInView` for scroll animations
6. ❌ Mixing `'use client'` with `async` functions
7. ❌ Testing only HTTP status codes
8. ❌ Using inconsistent spacing/colors/typography
9. ❌ Skipping alt text validation
10. ❌ Not validating required fields in schemas

---

## REMEMBER

**This is a production marketing site. Quality matters.**
- Every text string → Sanity
- Every image → Sanity with hotspot
- Every icon → Sanity as icon name
- Every animation → Standard pattern
- Every style → Design system
- Every change → Tested thoroughly

**No shortcuts. No exceptions. Ever.**
