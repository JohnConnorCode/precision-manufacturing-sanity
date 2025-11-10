# Sanity CMS Handoff Guide

## 🚨 CRITICAL: Missing Data

The frontend currently displays **hardcoded fallback data**, not Sanity CMS data. You must populate the following in Sanity Studio before the marketing team can edit content.

---

## ✅ Quick Verification

**Test if content is editable:**
1. Open Sanity Studio: http://localhost:3000/studio
2. Try editing the Homepage hero heading
3. Wait 60 seconds (ISR revalidation)
4. Refresh the homepage
5. **If the heading didn't change** → You're seeing fallback data

---

## 📋 Step-by-Step Data Population

### 1. Homepage Hero (CRITICAL)

**Status:** `hero` field is currently `null` in Sanity

**Steps:**
1. Open Sanity Studio → Homepage
2. Scroll to "Hero Section"
3. Fill in:
   - **Word 1:** `PRECISION`
   - **Word 2:** `MANUFACTURING`
   - **Word 3:** `SERVICES`
   - **Tagline:** `Innovative Precision Machining & Manufacturing Excellence Since 1995`
   - **Badges:** Add 4 badge objects:
     - `Advanced CNC Machining`
     - `Precision Metrology`
     - `Engineering Excellence`
     - `3 Sigma Yield`
   - **Background Slides:** Upload at least 1 hero image
4. Click "Publish"

**Verification:** Homepage hero should now show your custom text instead of hardcoded fallbacks.

---

### 2. Footer Navigation (CRITICAL)

**Status:** `columns` and `links` are currently `null` in Sanity

**Steps:**
1. Open Sanity Studio → Footer
2. Scroll to "Navigation Columns"
3. Add 4 columns:

#### Column 1: Services
- Title: `Services`
- Links:
  - `5-Axis Machining` → `/services/5-axis-machining`
  - `Adaptive Machining` → `/services/adaptive-machining`
  - `Metrology` → `/services/metrology`
  - `Engineering` → `/services/engineering`

#### Column 2: Industries
- Title: `Industries`
- Links:
  - `Aerospace` → `/industries/aerospace`
  - `Defense` → `/industries/defense`
  - `Energy` → `/industries/energy`

#### Column 3: Company
- Title: `Company`
- Links:
  - `About Us` → `/about`
  - `Careers` → `/careers`
  - `Contact` → `/contact`

#### Column 4: Resources
- Title: `Resources`
- Links:
  - `Case Studies` → `/resources`
  - `Technical Docs` → `/resources`
  - `Compliance` → `/compliance/terms`

4. Add "Footer Links" (legal links):
   - `Terms & Conditions` → `/compliance/terms`
   - `Privacy Policy` → `/compliance/privacy`
   - `Supplier Requirements` → `/compliance/supplier-requirements`

5. Click "Publish"

**Verification:** Footer should show custom navigation instead of fallback links.

---

### 3. Services Page (MISSING)

**Status:** Document doesn't exist

**Steps:**
1. Open Sanity Studio
2. Click "Create" → "Services Page"
3. Fill in:
   - **Hero Background Image:** Upload image
   - **Badge:** `🏭 COMPREHENSIVE SOLUTIONS`
   - **Heading:** `Manufacturing`
   - **Heading Highlight:** `Services`
   - **Subheading:** `From prototyping to production, we deliver precision manufacturing solutions with unmatched quality and reliability.`
   - **Buttons:**
     - `Explore Services` → `#services` → `primary`
     - `Request Quote` → `/contact` → `secondary`

4. Add **Capabilities** (in Content tab):
   - Tolerance: `±0.0001"` - `Precision machining tolerance`
   - Materials: `50+` - `Certified material types`
   - Machines: `25+` - `State-of-the-art equipment`

5. Add **Quality Assurance** items:
   - `AS9100D Certified`
   - `ISO 9001:2015`
   - `ITAR Registered`
   - `First Article Inspection`

6. Fill in **CTA Section**:
   - Heading: `Ready to Start Your Project?`
   - Description: `Contact our engineering team to discuss your precision manufacturing needs.`
   - Buttons:
     - `Get Quote` → `/contact` → `default`
     - `Technical Specs` → `/compliance/supplier-requirements` → `outline`

7. Fill in **SEO** (SEO & Sharing tab):
   - Meta Title: `Precision Manufacturing Services | CNC Machining & Metrology | IIS`
   - Meta Description: `AS9100D certified precision machining, 5-axis CNC, adaptive manufacturing, and CMM inspection services. Tolerances to ±0.0001" for aerospace and defense.`

8. Click "Publish"

---

### 4. About Page (MISSING)

**Status:** Document doesn't exist

**Steps:**
1. Click "Create" → "About Page"
2. Fill in hero section with company story
3. Add timeline milestones
4. Add company values
5. Add team members (link to existing team member documents)
6. Fill in SEO metadata
7. Click "Publish"

---

### 5. Careers Page (MISSING)

**Status:** Document doesn't exist

**Steps:**
1. Click "Create" → "Careers Page"
2. Fill in hero section
3. Add culture values
4. Add benefits/perks
5. Jobs will automatically pull from Job Posting documents
6. Fill in SEO metadata
7. Click "Publish"

---

### 6. Supplier Requirements (MISSING)

**Status:** Document doesn't exist

**Steps:**
1. Click "Create" → "Supplier Requirements"
2. Fill in hero section with badges:
   - `AS9100D Certified`
   - `ISO 9001:2015`
   - `ITAR Registered`
3. Add introduction sections (Purpose, Scope)
4. Add requirements (3.1, 3.2, 3.3, etc.)
5. Add footer compliance note
6. Fill in SEO metadata
7. Click "Publish"

---

## ✅ Final Verification

Run this verification script:

```bash
npx tsx scripts/verify-sanity-handoff.ts
```

**Expected Output:**
```
✅ Homepage                  exists
✅ Services Page             exists
✅ Industries Page           exists
✅ About Page                exists
✅ Careers Page              exists
✅ Footer                    exists
✅ Site Settings             exists
✅ Terms & Conditions        exists
✅ Supplier Requirements     exists

✅ SANITY CMS IS READY FOR HANDOFF
```

---

## 🎯 Handoff Checklist

Before handing off to marketing team:

- [ ] Homepage hero populated (word1, word2, word3, tagline, badges)
- [ ] Footer navigation columns populated (4 columns with links)
- [ ] Footer legal links populated
- [ ] Services Page created and published
- [ ] About Page created and published
- [ ] Careers Page created and published
- [ ] Supplier Requirements created and published
- [ ] All SEO metadata filled in
- [ ] Test: Edit content in Studio → Verify it appears on frontend
- [ ] Verification script shows all green ✅

---

## 📚 Marketing Team Training

Once all data is populated, train the marketing team on:

1. **Accessing Studio:** http://localhost:3000/studio
2. **Editing existing pages:** Click document → Edit → Publish
3. **Creating new content:**
   - Services: Create new "Service" document
   - Industries: Create new "Industry" document
   - Resources: Create new "Resource" document
   - Jobs: Create new "Job Posting" document
4. **Publishing content:** Green "Publish" button
5. **Hiding content:** Uncheck "Published" checkbox (for collections)
6. **Image uploads:** Drag & drop images, set hotspot/focal point
7. **SEO:** Every page has SEO & Sharing tab

---

## ⚠️ Common Issues

### "Content not showing on frontend"
- Wait 60 seconds for ISR revalidation
- Hard refresh browser (Cmd+Shift+R)
- Check "Published" status in Studio

### "Changes not appearing"
- Verify you clicked "Publish" (not just "Save")
- Check ISR revalidation time (60 seconds)
- Verify the page is using Sanity data, not fallbacks

### "Can't edit document"
- Check permissions in Sanity project settings
- Verify user has Editor or Admin role

---

## 🚀 Ready for Handoff When...

The site is ready for marketing team handoff when:

1. ✅ All singleton documents exist in Sanity
2. ✅ No `null` fields in critical sections (hero, footer)
3. ✅ Editing in Studio updates the frontend (no fallbacks showing)
4. ✅ Verification script shows all green
5. ✅ Marketing team trained on Studio basics

**Current Status:** ⚠️ NOT READY - Need to populate 6 critical items above
