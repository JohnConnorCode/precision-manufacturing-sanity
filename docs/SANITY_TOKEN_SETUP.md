# Sanity API Token Configuration - Phase 1 Blocker Resolution

## Current Status
**Blocker**: The `SANITY_WRITE_TOKEN` in `.env.local` lacks "create" permission for Sanity API operations.

**Error**:
```
Insufficient permissions; permission "create" required
```

---

## Why This Happens

The Sanity API token is configured to be readable/writeable but doesn't have the specific "create" permission scopes enabled. This is a security configuration in the Sanity project settings.

---

## How to Fix (2 Options)

### Option 1: Generate New Token with Full Permissions ⭐ RECOMMENDED

1. Go to **https://manage.sanity.io**
2. Select your project (likely "Precision Manufacturing" with ID `ept6x5im`)
3. Go to **Settings** → **API & Webhooks** → **Tokens**
4. Click **New Token** or edit existing `SANITY_WRITE_TOKEN`
5. Set permissions to:
   - `documents: Create`
   - `documents: Read`
   - `documents: Update`
   - `documents: Delete`
   - `assets: Create`
   - `assets: Read`
6. Copy the new token
7. Update `.env.local`:
   ```
   SANITY_WRITE_TOKEN=<your-new-token-with-create-permission>
   ```
8. Save and restart dev server

### Option 2: Use Existing Token with Enhanced Scope

If you have an admin token or CLI session:

1. Open **https://manage.sanity.io**
2. Go to **Settings** → **API & Webhooks** → **Tokens**
3. Find `SANITY_WRITE_TOKEN`
4. Edit it and add these scopes:
   - Check: **"Create"**
   - Check: **"Documents"**
5. Save changes
6. Copy the updated token value to `.env.local`
7. Restart dev server

---

## Verification

Once you've updated the token, verify it works:

```bash
# Test the token with our migration script
node scripts/create-services-with-ids.mjs
```

You should see:
```
✅ Created: 5-Axis Machining (service-5-axis-machining)
✅ Created: Adaptive Machining (service-adaptive-machining)
✅ Created: Metrology Services (service-metrology)
✅ Created: Engineering Services (service-engineering)
```

---

## Scripts Ready to Use

Once the token is fixed, these scripts are ready to run:

### 1. **Create Services with Explicit IDs** (Recommended)
```bash
node scripts/create-services-with-ids.mjs
```

This script:
- Uses explicit document IDs (e.g., `service-5-axis-machining`)
- Creates or updates 4 service documents
- Includes all technical specifications, capabilities, and metadata
- Handles errors gracefully

### 2. **Create Services from JSON File**
```bash
node scripts/migrate-services.mjs
```

Alternative script that:
- Reads from `scripts/services-to-create.json`
- Creates or updates documents
- Useful for batch operations

### 3. **Sanity CLI Method** (Alternative)
```bash
npx sanity documents create scripts/services-to-create.json --replace
```

Uses:
- Sanity's authenticated CLI session
- Full permissions from logged-in user
- Requires `sanity login` first

---

## Service Data Structure

All 4 services are pre-configured with:

✅ **5-Axis Machining**
- Hero section with certifications
- Complete technical specifications
- 4 key benefits with icons
- Material specifications (aluminum, titanium, stainless steel, superalloys)
- Process steps with quality checkpoints
- Equipment details (Hermle C42U, Heidenhain iTNC 530)
- Pricing and CTA

✅ **Adaptive Machining**
- Real-time tool optimization features
- Tool life improvement metrics
- Material compatibility

✅ **Metrology Services**
- CMM measurement capabilities
- GD&T analysis expertise
- Equipment (Zeiss PRISMO, SCANMAX)
- Pricing from $200/part

✅ **Engineering Services**
- CAD/CAM programming
- Process planning
- Design for manufacturability
- Equipment (SolidWorks, Mastercam)

---

## Testing After Token Update

Once services are created in Sanity:

```bash
# 1. Verify dev server is running
npm run dev

# 2. Test service pages
curl -s http://localhost:3000/services/5-axis-machining | grep "5-Axis Machining"
curl -s http://localhost:3000/services/adaptive-machining | grep "Adaptive"
curl -s http://localhost:3000/services/metrology | grep "Metrology"
curl -s http://localhost:3000/services/engineering | grep "Engineering"

# 3. Or visit in browser
# http://localhost:3000/services/5-axis-machining
# http://localhost:3000/services/adaptive-machining
# http://localhost:3000/services/metrology
# http://localhost:3000/services/engineering
```

---

## Testing Infrastructure

The dynamic service page template (`/app/services/[slug]/page.tsx`) is complete and ready:

✅ Fetches from Sanity CMS
✅ Supports draft preview mode
✅ Dynamic metadata generation
✅ Graceful error handling
✅ All responsive design
✅ ISR revalidation (60s for published, real-time for drafts)

---

## Next Steps After Token Fix

1. **Run the migration script:**
   ```bash
   node scripts/create-services-with-ids.mjs
   ```

2. **Run test suite:**
   ```bash
   npm run test
   ```

3. **Verify pages render:**
   ```bash
   npm run dev
   # Visit http://localhost:3000/services/[slug]
   ```

4. **Commit Phase 1:**
   ```bash
   git add .
   git commit -m "Phase 1: Complete - Service pages CMS-managed"
   ```

5. **Begin Phase 2:** Industry Pages (same pattern)

---

## Document IDs

Once created, services will use these IDs for easy reference:

- `service-5-axis-machining` → `/services/5-axis-machining`
- `service-adaptive-machining` → `/services/adaptive-machining`
- `service-metrology` → `/services/metrology`
- `service-engineering` → `/services/engineering`

---

## Troubleshooting

### "Permission create required" after token update
- Sanity tokens can take 30-60 seconds to propagate
- Try again after 1 minute
- Clear dev server cache: `rm -rf .next && npm run dev`

### Services created but not showing
- Verify `contentStatus` is set to `published`
- Check ISR revalidation is working (60s cache for published)
- Try preview mode with `NEXT_PUBLIC_PREVIEW_SECRET_TOKEN`

### GraphQL mutation failed
- Standard REST API is more reliable
- Stick with `create-services-with-ids.mjs` script

---

## Environment Setup Checklist

- [ ] Update `SANITY_WRITE_TOKEN` in `.env.local` with "create" permission
- [ ] Restart dev server: `npm run dev`
- [ ] Run migration: `node scripts/create-services-with-ids.mjs`
- [ ] Verify pages: `http://localhost:3000/services/5-axis-machining`
- [ ] All 4 service pages render correctly
- [ ] Related services appear
- [ ] SEO metadata is present
- [ ] Images load properly
- [ ] Commit changes

---

## Support Resources

- **Sanity API Docs**: https://www.sanity.io/docs/http-api
- **Token Scopes**: https://www.sanity.io/docs/authentication
- **Migration Script**: `/scripts/create-services-with-ids.mjs`
- **Dynamic Page**: `/app/services/[slug]/page.tsx`
- **Phase 1 Status**: `/docs/PHASE_1_STATUS.md`

---

## Questions?

Refer to:
1. This document (token configuration)
2. `/docs/PHASE_1_STATUS.md` (overall progress)
3. `/docs/PHASE_1_SERVICE_MIGRATION.md` (content templates)
4. `/scripts/services-to-create.json` (all service data)
