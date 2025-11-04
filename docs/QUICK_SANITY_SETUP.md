# Quick Sanity Studio Setup - Phase 1 Services

## TL;DR: Create 4 Service Documents in Sanity Studio

### Step 1: Open Sanity Studio
```
http://localhost:3000/studio
```
Or your production URL

### Step 2: Create Service Documents

Simply create 4 new "Service Pages" documents with these basic fields:

#### Service 1: 5-Axis Machining
- **Title**: 5-Axis Machining
- **Slug**: 5-axis-machining
- **Service Category**: CNC Machining
- **Content Status**: Published

#### Service 2: Adaptive Machining
- **Title**: Adaptive Machining
- **Slug**: adaptive-machining
- **Service Category**: CNC Machining
- **Content Status**: Published

#### Service 3: Metrology Services
- **Title**: Metrology Services
- **Slug**: metrology
- **Service Category**: Metrology
- **Content Status**: Published

#### Service 4: Engineering Services
- **Title**: Engineering Services
- **Slug**: engineering
- **Service Category**: Engineering
- **Content Status**: Published

## Why Minimal Setup?

The dynamic `/app/services/[slug]/page.tsx` template already handles graceful fallbacks. Even with just these 4 documents, the pages will:

✅ Be accessible at `/services/5-axis-machining`, etc.
✅ Display dynamic content from Sanity
✅ Support preview mode
✅ Have working SEO metadata
✅ Show related services

## Quick Testing After Creating Docs

```bash
# Start dev server
npm run dev

# Visit a service page
http://localhost:3000/services/5-axis-machining

# Test preview mode (you'll need to set NEXT_PUBLIC_PREVIEW_SECRET_TOKEN in .env.local)
http://localhost:3000/api/preview?secret=YOUR_SECRET&slug=5-axis-machining&type=service
```

## Later: Add Full Content

Once the basic docs are created and tested, you can:
1. Add overview descriptions
2. Add technical specifications
3. Add capabilities and features
4. Add process steps
5. Add equipment information
6. Add CTAs and SEO metadata

All in the Sanity Studio UI without code changes.

## Phase 1 Summary

✅ **Infrastructure Complete**:
- Dynamic service page component created
- Sanity query functions created
- Draft preview mode ready
- ISR revalidation configured

⏳ **Data Entry Required**:
- Create 4 service documents in Sanity Studio
- Each can start minimal and be enhanced later

🎯 **Result**: Fully CMS-managed service pages with no code deployment needed for content updates

---

## File References

- **Dynamic Page**: `/app/services/[slug]/page.tsx`
- **Query Functions**: `/lib/sanity-pages.ts`
- **Migration Script**: `/scripts/migrate-services.mjs` (reference for field structure)
- **Full Guide**: `/docs/PHASE_1_SERVICE_MIGRATION.md` (detailed content templates)

## Next Phases

- **Phase 2**: Industry pages migration (same pattern)
- **Phase 3**: About page migration
- **Phase 4**: Image migration to Sanity CDN
- **Phase 5**: Careers & Contact pages
- **Phase 6**: Testing, preview mode, documentation

All infrastructure will follow the same pattern established in Phase 1.
