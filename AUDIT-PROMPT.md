# IIS Precision Manufacturing — Full Audit Loop Prompt

> Copy everything below the line into Claude Code.

---

You are performing a comprehensive audit and optimization pass on the IIS Precision Manufacturing website (iismet.com). This is a Next.js 15 application with Tailwind CSS, Framer Motion, Sanity CMS v3, Nodemailer, and MDX. The site is a B2B marketing website for a precision manufacturing company serving aerospace, defense, and medical industries. It uses a professional dark/light theme with a blue-to-indigo gradient accent palette (#3b82f6 to #4f46e5).

Run every check described below. Fix everything you can fix directly. For things that require a judgment call or content decision, flag them in the final report. Do not ask questions during the audit. Make your best judgment and document what you did.

At the end of the entire audit, generate `AUDIT-REPORT-[today's date].md` in the project root with a structured summary of everything checked, everything fixed, everything flagged, and recommended next actions.

---

## Section 1: Code Quality and Consistency

### TypeScript Strictness

Run `npx tsc --noEmit`. Fix all type errors. Ensure:

- No `any` types anywhere in the codebase (replace with proper interfaces)
- All function parameters and return types are explicitly typed
- All component props interfaces are defined and exported
- All Sanity query return types match the actual data shapes

Check that `tsconfig.json` has `strict: true`. If `noUncheckedIndexedAccess` is not enabled, flag it but do not enable (may cause widespread breakage).

### Component Consistency

Audit every component for consistency with the design system in `lib/design-system.ts`:

- Every section uses `AnimatedSection` or `useAnimateInView` for scroll animations — never bare `whileInView`
- Every section header uses the shared `SectionHeader` component with proper gradient text
- Every hero section uses the shared `HeroSection` component from `components/ui/hero-section.tsx`
- Every button uses `Button` or `PremiumButton`, not raw `<button>` or `<a>` tags
- Every card uses the `Card` component from `components/ui/card.tsx`
- Every icon is from Lucide React with consistent sizing (20px inline, 24px standalone, 32-40px feature cards)
- No hardcoded colors anywhere in components — all colors reference Tailwind config or CSS custom properties
- No inline styles except for WebKit gradient text (the Safari `bg-clip-text` workaround using `WebkitBackgroundClip` and `WebkitTextFillColor`)
- No duplicate component implementations — if two components do the same thing, consolidate
- Gradient text always uses inline styles with `getGradientTextStyle()` or the explicit `WebkitBackgroundClip`/`WebkitTextFillColor` pattern — never Tailwind's `bg-clip-text text-transparent`

### File and Folder Organization

Verify the project structure matches the established architecture:

- Page components in `app/(site)/`
- Reusable UI in `components/ui/`
- Section components in `components/sections/`
- Layout components in `components/layout/`
- Page-specific client components alongside their `page.tsx`
- Sanity schemas in `sanity/schemas/`
- Sanity queries in `sanity/lib/queries.ts`
- Shared utilities in `lib/`
- No orphan files, no unused imports, no components in the wrong directory

### Error Handling

Check every API route in `app/api/` for proper error handling:

- `try/catch` blocks around all external calls (Sanity queries, Nodemailer, fetch)
- Meaningful error responses with appropriate HTTP status codes (not just 500 with no body)
- Graceful degradation on the frontend — error.tsx and not-found.tsx pages exist for key routes
- No unhandled promise rejections
- All Sanity query functions in `sanity/lib/queries.ts` have try/catch with fallback returns (empty arrays for collections, null for single documents)
- Contact form has explicit fallback behavior when SMTP is unconfigured

### Environment Variables

Verify all environment variables are:

- Listed in `.env.local.example` with descriptive comments (no actual values)
- Never hardcoded in source files (check all files in `scripts/` especially)
- Never exposed to the client unless prefixed with `NEXT_PUBLIC_`
- `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`, `SMTP_PASS`, and `PREVIEW_SECRET_TOKEN` must never appear in client-side code or committed source files

---

## Section 2: Sanity CMS Audit

### Content Completeness (Rule #1)

This is the most critical rule for this project. **Every single piece of user-visible content must be stored in and fetched from Sanity CMS.** Audit every page and component for:

- No hardcoded headings, paragraphs, button labels, stats, or descriptions
- No `defaultContent` or `fallbackData` objects with hardcoded strings
- No hardcoded image URLs — all images from `cdn.sanity.io`
- No hardcoded arrays of features, benefits, or capabilities
- Icons stored as string names in Sanity, rendered via Lucide React dynamically
- All navigation links from Sanity (header menu items, footer links)
- All SEO metadata fetchable from Sanity (metaTitle, metaDescription, ogImage per page)

If any hardcoded content is found, flag it with the file path and line number.

### Schema Consistency

For every document schema in `sanity/schemas/`:

- Has a `published` boolean field with `initialValue: true` (for collections: services, industries, resources, team members, job postings, case studies)
- Has a preview configuration showing "(HIDDEN)" when `published === false`
- Has properly configured image fields with `hotspot: true` and `metadata: ['blurhash', 'lqip', 'palette']`
- Has alt text validation on all image fields (`Rule.required()`)
- Has SEO fields (metaTitle, metaDescription, ogImage) where applicable
- Has slug field with `source: 'title'` and required validation
- Has orderings configured for Studio list views

### GROQ Query Consistency

For every query function in `sanity/lib/queries.ts`:

- Filters by `published == true` in non-preview mode
- Passes `preview` flag through to `getClient()` for draft mode
- Projects all fields that components actually read (no missing fields causing undefined access)
- Resolves image asset URLs with `asset-> { url }`
- Resolves references where needed
- Has try/catch with appropriate fallback (empty array or null)

### Singleton Safety

Verify all singleton schemas (homepage, about, contact, careers, navigation, footer, siteSettings, servicesPage, industriesPage, supplierRequirements, terms, uiText, pageContent) are:

- Protected via `documentId()` in `sanity/structure/index.ts` (prevents duplicate creation)
- Filtered out of the default document list in Studio
- Queried by `_id` not by `_type` filter

### Visibility Toggles

Verify the `published`/`enabled` toggle system works end-to-end:

- Collection documents (services, industries, resources) filter by `published == true` in all GROQ queries
- Array items (CTA buttons, benefits) filter by `enabled !== false` in components
- Hidden content still appears in Sanity Studio but not on the frontend
- By-slug queries also filter by `published == true` (prevents URL access to hidden content)

---

## Section 3: Design System Consistency

### Color Audit

Search the entire codebase for hardcoded color values. Every color should come from Tailwind config or the design system. Specifically check for:

- Any hex codes not in the design system
- Any `rgba()` values not matching the established glassmorphism specs
- Gradient text always using the standard gradient: `#3b82f6 → #4f46e5` (blue-600 to indigo-600)
- No use of Tailwind's `bg-clip-text text-transparent` (broken in Safari — must use inline `WebkitBackgroundClip` styles)

### Typography Audit

Check every page for proper typographic hierarchy using tokens from `lib/design-system.ts`:

- Exactly one H1 per page
- H2s and H3s in proper nesting order (no skipped heading levels)
- Heading sizes match the typography scale in the design system
- Body text uses the `typography.body` or `typography.bodyLight` tokens
- Section eyebrows use `typography.eyebrow`

### Spacing and Layout

Check for consistent spacing using tokens from `lib/design-system.ts`:

- Section padding uses `spacing.section` (py-24 md:py-32) or `spacing.sectionCompact`
- Content uses `spacing.container` (container mx-auto px-6 md:px-8)
- Card grids use `spacing.grid` (gap-6 md:gap-8)
- Max-widths are consistent (max-w-7xl for full sections, max-w-4xl for content)

### Animation Audit

Check all animations against the established patterns in `lib/use-animate-in-view.ts`:

- Every scroll-triggered animation uses `useAnimateInView` hook or `AnimatedSection` component — **never bare `whileInView`** (it breaks on page refresh)
- Hero sections use the `isMounted` pattern for `animate` prop animations
- Stagger timing is consistent (100-150ms between children)
- All animations respect `prefersReducedMotion` (wrap in conditional or use the `usePrefersReducedMotion` hook)
- Standard duration: 0.5s for entries, 0.3s for hovers
- Standard easing: `"easeOut"` for all entry animations
- Only GPU-accelerated properties animated (opacity, transform) — never width, height, margin, padding
- No flashy/distracting effects (scan lines, glitch, excessive shimmer, bouncing) — this is a B2B aerospace/defense site
- Hover effects use `whileHover`/`whileTap` directly on motion elements (these are fine without the hook)

### Dark Mode Consistency

The site supports both dark and light mode. Verify:

- All components handle both modes properly (dark: and light variants)
- No white backgrounds in dark mode, no dark backgrounds in light mode
- Glass cards, modals, and overlays adapt to the current theme
- Form inputs render correctly in both modes
- The scroll-to-top button and any floating elements adapt to the theme

---

## Section 4: SEO Audit

### Metadata

Check every page in `app/(site)/` for:

- `generateMetadata` export (not static `metadata` where dynamic data is available)
- Unique title tag following the pattern: `"Page Name | IIS Precision Manufacturing"` or fetched from Sanity `seo.metaTitle`
- Meta description (150-160 characters) from Sanity `seo.metaDescription`
- Canonical URL set correctly via `alternates.canonical`
- OpenGraph tags: og:title, og:description, og:image (resolved from Sanity asset URL), og:type, og:url
- Twitter card tags: twitter:card (summary_large_image when OG image exists), twitter:title, twitter:description
- No page with missing or placeholder metadata

### Structured Data (JSON-LD)

Verify JSON-LD is present and valid:

- **Root layout** (`app/(site)/layout.tsx`): Organization, WebSite, LocalBusiness (Portland, OR)
- **Homepage**: Organization, ProductCatalog with actual services from Sanity (not hardcoded)
- **Service detail pages** (`/services/[slug]`): Service schema with proper descriptions
- **Industry detail pages** (`/industries/[slug]`): WebPage with industry-specific context
- **Resource articles** (`/resources/[category]/[slug]`): TechnicalArticle or HowTo where applicable
- **Case studies** (`/case-studies/[slug]`): Article schema
- **All pages**: BreadcrumbList where navigation depth > 1

Validate that `lib/structured-data.ts` generates correct schemas. Check that no coordinates, addresses, or business details are hardcoded incorrectly.

### Heading Hierarchy

Audit every page:

- Exactly one H1
- H2s under H1, H3s under H2s — no skipped levels
- The H1 should clearly describe the page topic
- Check that section headers rendered by `SectionHeader` component use the correct heading level

### Internal Linking

Check:

- Every resource article links to at least 1 service page or related articles
- Every industry page links to relevant services and resources
- Every service page links to relevant industries and resources
- The homepage links to all major sections
- No orphan pages (pages with zero internal links pointing to them)
- All Link components use `next/link`, not raw `<a>` tags for internal navigation

### Sitemap and Robots

Verify `app/sitemap.ts` generates:

- All static pages (homepage, about, contact, careers, services, industries, resources, compliance)
- All published services with `_updatedAt` as `lastModified`
- All published industries with `_updatedAt`
- All published resources with correct nested URL: `/resources/{category}/{slug}`
- All published job postings
- All published case studies
- Resource category landing pages

Verify `app/robots.ts`:

- Allows major crawlers (Googlebot, Bingbot)
- Blocks AI crawlers if configured (GPTBot, Claude-Web, etc.)
- Blocks `/studio/`, `/api/`, `/_next/` from crawling
- References the sitemap URL
- Blocks admin/utility pages (`/status`, `/troubleshooting`, `/styleguide`, `/logos`)

### Image SEO

Check all images:

- Every `<Image>` has descriptive alt text (from Sanity, not hardcoded "image" or empty)
- All images use `next/image` for optimization
- Images with `fill` prop have `sizes` attribute
- Hero/above-fold images have `priority` prop
- Below-fold images lazy load by default
- All image sources are from `cdn.sanity.io` (no external placeholder images in production)

---

## Section 5: Accessibility (WCAG 2.1 AA)

### Color Contrast

Verify:

- Body text meets 4.5:1 contrast ratio against backgrounds in both light and dark mode
- Heading text meets 4.5:1 ratio
- Blue gradient text on dark backgrounds meets ratio
- Text on glass card backgrounds meets ratio
- Form placeholder text meets ratio
- Error and success message text meets ratio

### Keyboard Navigation

Tab through every page without a mouse. Verify:

- Focus indicators are visible on every interactive element
- Tab order follows visual order
- All modals/overlays trap focus (mobile nav, any dialogs)
- Escape closes all overlays
- All form inputs are reachable by tab
- All buttons are activatable by Enter/Space
- Skip-to-content link exists and works

### Screen Reader

Check for:

- All images have descriptive alt text
- All form inputs have associated `<label>` elements (not just placeholder text)
- All icon-only buttons have `aria-label`
- ARIA landmarks present (banner, navigation, main, contentinfo)
- Error messages use `aria-live` or `role="alert"`
- Loading states are announced to screen readers

### Motion and Reduced Motion

Verify:

- `prefers-reduced-motion` is respected by ALL Framer Motion animations, CSS transitions, and background effects
- The `usePrefersReducedMotion()` hook is used in every component with animations
- No content is only accessible via hover (touch users cannot hover)
- No important information conveyed only through animation

---

## Section 6: Security Audit

### API Security

Check:

- No API keys or secrets in client-side code or committed source files (grep for token patterns)
- All API routes validate input
- CORS headers properly configured in `middleware.ts` (whitelist specific origins, not echo-back)
- Open redirect prevention on all redirect endpoints (validate paths start with `/` and not `//`)
- HTML escaping on all user input rendered in emails (`lib/email.ts`)
- Slug/parameter validation on preview and draft-mode routes (regex validation)
- No sensitive data in URL parameters

### Security Headers

Check `next.config.ts` and `middleware.ts` for:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (or `SAMEORIGIN` if Sanity Studio iframe needs it)
- `Referrer-Policy: strict-origin-when-cross-origin`
- Content-Security-Policy (if applicable)

### Token Management

- All Sanity tokens read from environment variables, never hardcoded
- Script files in `scripts/` use `process.env.SANITY_API_WRITE_TOKEN`, not inline tokens
- `.env.local.example` has no actual token values
- `.gitignore` includes `.env.local`

---

## Section 7: Functionality Audit

### Contact Form

Test the contact form flow:

- All form validation works (required fields, email format via Zod)
- The `escapeHtml()` function sanitizes all user input before email HTML templates
- Submission triggers confirmation email to the submitter
- Admin notification email sends to `COMPANY_EMAIL`
- The form handles SMTP misconfiguration gracefully (warns, doesn't crash)
- Success/error states display correctly

### Draft Mode / Preview

Test the preview system:

- `/api/draft-mode/enable` validates the secret token
- `/api/draft-mode/disable` properly clears the cookie and redirects safely
- `/api/preview` validates slugs and redirects to the correct page
- Every page checks `draftMode()` and passes `isEnabled` to Sanity queries
- Unpublished content is visible in preview mode, hidden in production
- The Sanity Presentation Tool integration works (locate.ts, visual editing)

### Health Checks

Verify:

- `/api/health` returns basic status
- `/api/health/cms` returns 503 (not 200) when Sanity is unreachable
- `/api/health/integrations` returns overall health with appropriate status codes
- `/status` page displays system health correctly
- `/troubleshooting` page provides useful diagnostic information

### Navigation

Verify:

- Header navigation renders all menu items from Sanity
- Mobile hamburger menu opens/closes correctly
- Dropdown menus work on desktop
- Footer renders all link sections from Sanity
- All navigation links point to existing routes (no 404s)
- Active page highlighting works in navigation

---

## Section 8: Performance Audit

### Bundle Analysis

Run the Next.js build and check:

- Total bundle size and largest chunks
- Whether Framer Motion is tree-shaken properly
- No `import * as Icons from 'lucide-react'` in client components (server components are fine)
- Sanity client only loaded where needed
- No duplicate dependencies

### Server vs Client Components

Verify:

- Pages that don't need interactivity are Server Components
- `'use client'` only on components that genuinely need it (forms, animations, interactive elements)
- No Server Component unnecessarily wrapped in a Client Component
- Data fetching happens in Server Components (not in `useEffect` on the client)
- Heavy components are code-split where possible (e.g., Sanity Studio)

### ISR and Caching

Check every page for appropriate `revalidate` values:

- Homepage and listing pages: `revalidate = 60` (1 minute)
- Detail pages (services, industries, resources): `revalidate = 3600` (1 hour) is acceptable
- Pages using `draftMode()` are automatically dynamic — `revalidate` is ignored when draft mode is active
- Sitemap regenerates with fresh data
- No page is accidentally set to `revalidate = 0` unless it genuinely needs real-time data

### Image Optimization

Check:

- All images use `next/image` with Sanity CDN
- `sizes` prop set on all `fill` images to prevent full-width downloads
- Hero images have `priority` for LCP optimization
- Image domains configured in `next.config.ts` (`cdn.sanity.io`, etc.)

---

## Section 9: Responsive Audit

### Breakpoints

Test every page type at these widths: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1024px (iPad landscape), 1280px (desktop), 1536px (large desktop). Check for:

- No horizontal scrolling at any breakpoint
- No overlapping elements
- All text readable without zooming
- All buttons/links tappable (44x44px minimum touch target)
- Navigation works (hamburger on mobile, full nav on desktop)
- Cards stack properly on mobile
- Tables scroll horizontally or reflow on mobile
- Hero sections render correctly at all sizes

---

## Section 10: Content Quality Audit

### Voice and Tone

This is a precision manufacturing website for aerospace, defense, and medical clients. Read through all CMS-managed copy visible on the site. Flag any instances of:

- Hype words: revolutionary, game-changing, cutting-edge, leverage, synergy, transform, unlock, supercharge, disrupt
- Filler phrases: "in today's fast-paced landscape," "as we all know," "needless to say"
- Excessive use of em dashes
- Vague claims without specifics (e.g., "increase quality" without measurable context)
- Casual or overly promotional tone (should be professional, confident, precise)
- Content that feels AI-generated (check against the humanizer guidelines)

Note: Content is in Sanity CMS — flag issues with the specific document/field path so they can be fixed in Studio.

### CTA Completeness

Every page must have a clear next action. Check:

- Every page has at least one CTA
- Every resource article ends with a CTA section
- No page ends with just a paragraph and nothing to click
- CTAs vary based on context (not all identical)
- The primary CTA is visually prominent (PremiumButton in a well-styled section)

### Broken Links

Check all internal and external links:

- No links pointing to non-existent routes (especially `/resources/series/` which was a known bug)
- No links to placeholder URLs
- External links (if any) are still valid
- All `Link` components use correct paths matching the routing structure

---

## Section 11: Build Verification

After completing all fixes:

1. Run `npx tsc --noEmit` — must pass with zero errors
2. Run `npm run build` — must complete successfully
3. Verify no new warnings introduced
4. Check that all pages render in the build output (SSG, SSR, dynamic as expected)

---

## Section 12: Generate the Audit Report

After completing all sections, generate a Markdown file at the project root:

**`AUDIT-REPORT-[YYYY-MM-DD].md`**

The report must include:

### Summary
- Overall health rating (Excellent / Good / Needs Work / Critical Issues)
- Number of issues found
- Number of issues fixed
- Number of issues flagged for manual attention

### Section-by-section breakdown
For each of the 11 sections, list:
- What was checked (brief)
- What was fixed (with file paths and description of changes)
- What was flagged for manual attention (with explanation)
- Current status (Pass / Mostly Passing / Needs Attention)

### Priority fixes remaining
Ordered list of most impactful remaining issues, ranked by:
1. Broken functionality (conversion paths, forms, preview)
2. Security vulnerabilities
3. SEO impact (missing metadata, broken links, invalid structured data)
4. Accessibility failures (contrast, missing labels, keyboard traps)
5. Performance issues (slow pages, large bundles)
6. Content issues (hardcoded strings, CMS gaps)
7. Design inconsistencies (cosmetic) last

### Metrics snapshot
- TypeScript: pass/fail and error count
- Build: pass/fail
- Pages with complete metadata: count
- Pages with valid JSON-LD: count
- Image fields with hotspot + metadata: count
- Schemas with published toggle: count
- GROQ queries with published filter: count

### Recommended next actions
Top 5 things to do before the next audit, in order of impact.
