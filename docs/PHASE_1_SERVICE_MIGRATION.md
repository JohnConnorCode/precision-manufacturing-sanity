# Phase 1: Service Pages Migration Guide

## Overview
This guide documents the migration of hardcoded service pages to Sanity CMS-managed content. Phase 1 focuses on the 4 main service pages:
1. 5-Axis Machining
2. Adaptive Machining
3. Metrology
4. Engineering

## Infrastructure Status

### ✅ Completed

- **Sanity Client**: Updated with draft content support (`draftClient`)
- **Service Queries**: All helper functions created in `/lib/sanity-pages.ts`
  - `getService(slug, isDraft)` - Fetch single service with draft mode support
  - `getAllServiceSlugs()` - For static path generation
  - `getAllServices()` - For services listing
  - `getServicesByCategory(category)` - Filter by type
  - `getRelatedServices(currentSlug, limit)` - Cross-linking

- **Dynamic Service Page**: Created `/app/services/[slug]/page.tsx`
  - Fetches content from Sanity
  - Supports draft preview mode
  - Handles all service sections dynamically
  - Includes SEO metadata generation

- **Preview API Routes**: Already in place
  - `/api/preview` - Enable draft mode
  - `/api/exit-preview` - Disable draft mode

## Service Schema

The comprehensive service schema includes all necessary fields. See `/sanity/schemas/service.ts`.

### Key Schema Sections

```typescript
{
  name: 'service',
  fields: [
    title, slug, serviceCategory, hero,
    overview, technicalSpecs, capabilities,
    features, process, qualityAssurance,
    technologies, equipment, industries,
    relatedCaseStudies, pricing, faqs,
    relatedResources, cta, seo,
    lastUpdated, contentStatus
  ]
}
```

## Step 1: Create Service Documents in Sanity Studio

### Access Sanity Studio
1. Navigate to: `http://localhost:3000/studio` (local) or your production studio URL
2. Log in with your Sanity credentials
3. Go to **Service Pages** section

### Service 1: 5-Axis Machining

**Basic Info:**
- **Title**: 5-Axis Machining
- **Slug**: `5-axis-machining`
- **Service Category**: CNC Machining
- **Content Status**: Draft (for testing)

**Hero Section:**
- **Title**: 5-Axis Machining
- **Subtitle**: Precision Manufacturing Excellence
- **Background Image**: Upload or reference
- **Badge**: ADVANCED MACHINING SERVICES
- **Certifications**: AS9100, ISO 9001, ITAR

**Overview:**
- **Description**: "Advanced 5-axis simultaneous machining capabilities for the most complex aerospace and defense components. Uncompromising quality and precision for mission-critical applications."
- **Highlights**:
  - Complex simultaneous 5-axis contouring
  - ±0.0001" positioning accuracy
  - Automated tool changing and optimization
  - Real-time monitoring and quality control
- **Value Proposition**: "Our 5-axis capability enables us to machine the most complex geometries in a single setup, reducing setup time and improving accuracy while maintaining the highest quality standards."
- **Key Benefits**:
  - Benefit: Reduced Setup Time
  - Description: Simultaneous 5-axis operation eliminates repositioning
  - Icon: settings

  - Benefit: Superior Surface Finish
  - Description: Continuous tool engagement produces excellent finishes
  - Icon: zap

  - Benefit: Complex Geometry Capability
  - Description: Machine intricate shapes impossible with traditional methods
  - Icon: target

  - Benefit: Production Efficiency
  - Description: Automatic tool changing and optimized toolpaths
  - Icon: cog

**Technical Specifications:**

*Tolerances:*
- **Dimensional**: ±0.0001" (±0.0025mm)
- **Geometric**: 0.0002" (0.005mm)
- **Surface Finish**: Ra 8-125 µin
- **Repeatability**: ±0.000050" (±0.00127mm)

*Materials:* (Add 4 material types)
1. **Aluminum Alloys**
   - Grade: 6061-T6, 7075-T6, 2024-T3, Mic-6 tooling plate
   - Properties: Excellent machinability, lightweight, widely used
   - Applications: Aerospace structures, defense components, tooling

2. **Titanium Alloys**
   - Grade: Ti-6Al-4V, Ti-6Al-2Sn-4Zr-2Mo, Commercial pure titanium
   - Properties: High strength-to-weight, excellent biocompatibility
   - Applications: Aerospace engines, medical implants, defense

3. **Stainless Steel**
   - Grade: 316L, 17-4 PH, 15-5 PH, 304/304L
   - Properties: Corrosion resistant, versatile
   - Applications: Food processing, medical, marine

4. **Superalloys**
   - Grade: Inconel 718, Inconel 625, Hastelloy X, Waspaloy
   - Properties: High-temperature strength
   - Applications: Aerospace engines, power generation

*Size Range:*
- **Min Size**: 0.125" (0.3cm)
- **Max Size**: 48" x 26" x 20"
- **Weight**: Up to 500 lbs
- **Complexity**: High complexity geometries supported

*Standards:*
- Standard: AS9100D - Aerospace Quality Management
- Standard: ISO 9001:2015 - Quality Management
- Standard: ITAR - International Traffic in Arms (as applicable)

**Capabilities:** (Add 4 capabilities)
1. Label: Simultaneous Axes, Value: 5-Axis
   Description: Full simultaneous multi-axis control
   Technical Details: Continuous contouring with automatic axis coordination
   Certification Level: AS9100

2. Label: Machining Accuracy, Value: ±0.0001"
   Description: Precision tolerance capability
   Technical Details: Tight tolerance through advanced fixturing and measurement
   Certification Level: ISO 9001

3. Label: Work Envelope, Value: 48" x 26" x 20"
   Description: Maximum capacity
   Technical Details: Full capacity supports large complex assemblies
   Certification Level: AS9100

4. Label: Spindle Speed, Value: 12,000 RPM
   Description: High-speed capability
   Technical Details: Enables fine details and surface finish optimization
   Certification Level: ISO 9001

**Features:** (Add 4 features)
1. **Complex Aerospace Components**
   - Description: Advanced 5-axis machining for turbine blades, impellers, and complex geometries
   - Details:
     - Turbine blade manufacturing
     - Impeller machining
     - Complex curve generation
     - Simultaneous 5-axis contouring
   - Technical Benefit: Simultaneous 5-axis operation eliminates multiple setups, ensuring part accuracy and surface quality
   - MetBase® Integration: Yes

2. **Precision Defense Parts**
   - Description: High-precision machining of defense components with complex angles
   - Details:
     - Defense component machining
     - Complex angle programming
     - Tight tolerance manufacturing
     - ITAR compliance
   - Technical Benefit: Full traceability and compliance verification for defense contracts
   - MetBase® Integration: Yes

3. **Prototype Development**
   - Description: Rapid prototyping and low-volume production
   - Details:
     - Rapid prototyping
     - Complex geometry machining
     - Material optimization
     - Design validation
   - Technical Benefit: Quick turnaround on prototype validation without expensive tooling
   - MetBase® Integration: No

4. **Production Machining**
   - Description: High-volume production with consistent quality
   - Details:
     - High-volume production
     - Process optimization
     - Quality consistency
     - Automated workflows
   - Technical Benefit: 3-sigma manufacturing system ensures consistent quality across production runs
   - MetBase® Integration: Yes

**Process Steps:** (Add 4 steps)
1. Step: 1, Title: Programming & Setup
   Description: Advanced CAD/CAM programming with collision detection
   Duration: 2-4 hours
   Quality Check Points: Program verification, toolpath simulation
   Tools Required: Mastercam CAM, Collision detection software
   Deliverables: Verified NC program, setup sheet
   MetBase Data: Program parameters, tooling information

2. Step: 2, Title: Fixturing & Workholding
   Description: Custom fixture design and precision workholding
   Duration: 1-3 hours
   Quality Check Points: Fixture inspection, runout verification
   Tools Required: Custom fixtures, precision measuring tools
   Deliverables: Installed fixture, workholding verification
   MetBase Data: Fixture setup parameters

3. Step: 3, Title: Machining Execution
   Description: Controlled machining with real-time monitoring
   Duration: 2-8 hours (varies by complexity)
   Quality Check Points: Tool wear monitoring, dimensional sampling
   Tools Required: 5-axis CNC, tool monitoring system
   Deliverables: Machined part, in-process inspection data
   MetBase Data: Machining parameters, tool life, dimensional measurements

4. Step: 4, Title: Final Inspection & Finishing
   Description: CMM inspection and secondary operations
   Duration: 2-4 hours
   Quality Check Points: Full CMM verification, surface finish check
   Tools Required: CMM, surface finish gauge
   Deliverables: Inspection report, finished part
   MetBase Data: Final dimensions, surface finish, acceptance documentation

**Quality Assurance:**
- Quality Plan Overview: "IIS maintains a comprehensive quality plan for all 5-axis machining work, including statistical process control, in-process monitoring, and final CMM inspection to ensure all parts meet specification."

Inspection Protocol (Add 3 protocols):
1. Stage: In-Process, Method: Dimensional sampling
   Criteria: ±0.0001" for critical dimensions
   Documentation: First article inspection report

2. Stage: Mid-Process, Method: Tool wear monitoring
   Criteria: Tool life maximization while maintaining quality
   Documentation: Tool change log, wear analysis

3. Stage: Final Inspection, Method: CMM full inspection
   Criteria: 100% verification of all functional dimensions
   Documentation: Full CMM report, traceability documentation

Traceability Requirements:
- Serial number assignment and tracking
- Material certification documentation
- Process parameter recording
- Inspection record retention

Certification Process: "All 5-axis machining services are delivered with full AS9100 aerospace quality documentation, including first article inspection, material traceability, and process verification."

**Equipment:** (Add 2 equipment entries)
1. Name: Hermle C42U 5-Axis Machining Center
   Manufacturer: Hermle
   Model: C42U
   Specs: Advanced 5-axis simultaneous control, work envelope 48"x26"x20"
   Capabilities: Complex aerospace components, tight tolerance work
   Accuracy: ±0.0001"
   MetBase® Compatible: Yes
   Certifications: AS9100 approved, ITAR registered

2. Name: Heidenhain iTNC 530 Control System
   Manufacturer: Heidenhain
   Model: iTNC 530
   Specs: Advanced control with collision detection and optimization
   Capabilities: Complex toolpath programming, real-time monitoring
   Accuracy: ±0.00005" (in certain modes)
   MetBase® Compatible: Yes
   Certifications: Industry standard aerospace control

**CTA Section:**
- Title: Ready for Your Next Complex Project?
- Subtitle: Contact our team to discuss your 5-axis machining requirements
- Button 1: Text: "Get Quote", Link: "/contact", Variant: primary
- Button 2: Text: "View All Services", Link: "/services", Variant: secondary

**SEO Settings:**
- Meta Title: "5-Axis CNC Machining | Advanced Precision Manufacturing"
- Meta Description: "Expert 5-axis simultaneous machining for aerospace, defense, and complex components. AS9100 certified precision manufacturing."
- Focus Keywords: 5-axis machining, 5-axis CNC, precision machining
- Secondary Keywords: aerospace machining, defense manufacturing, complex geometry
- Service Type: CNC Machining
- Area Served: United States, International

---

### Service 2: Adaptive Machining

Follow the same structure as above but with content specific to adaptive machining:

**Key Points:**
- Focus on tool path optimization
- Highlight real-time adjustment capabilities
- Emphasize efficiency and tool life
- Feature MetBase integration for adaptive control
- Include AI-driven optimization techniques

**Technical Specs:**
- Tolerances: ±0.0005" - ±0.0001" (varies by material)
- Feed Rates: Adaptive (150-800 IPM depending on conditions)
- Tool Life Improvement: 40-60% improvement vs traditional methods
- Surface Finish: Ra 16-63 µin

---

### Service 3: Metrology

**Key Focus:**
- Precision measurement capabilities
- CMM equipment specifications
- Quality assurance role in manufacturing
- First article inspection procedures
- SPC and statistical analysis
- MetBase integration for data collection

**Technical Specs:**
- Measurement Accuracy: ±0.000050" (±0.00127mm)
- CMM Type: Zeiss Coordinate Measuring Machines
- Part Size Range: Micro components to large assemblies
- Tolerance Verification: GD&T, statistical process control

---

### Service 4: Engineering

**Key Focus:**
- First article inspection (as per your requirements)
- Process planning and optimization
- CAD/CAM programming
- Design for manufacturability (DFM) support
- Engineering consulting services
- Feasibility analysis

**Technical Specs:**
- CAD Systems: SolidWorks, CATIA support
- Analysis Tools: FEA, CAM optimization
- Documentation: Full engineering reports
- Compliance: AS9100, ISO standards

---

## Step 2: Create in Sanity Studio

1. Open Sanity Studio
2. Click "Service Pages"
3. Click "Create" button
4. Fill in all fields according to the templates above
5. Save as Draft first
6. Test the preview using `/api/preview?secret=YOUR_SECRET&slug=5-axis-machining&type=service`
7. When satisfied, publish the document

## Step 3: Testing

### Local Testing
```bash
# Start dev server
npm run dev

# Visit service page
http://localhost:3000/services/5-axis-machining

# Test preview mode
http://localhost:3000/api/preview?secret=YOUR_SECRET&slug=5-axis-machining&type=service
```

### Preview Secret
Set `NEXT_PUBLIC_PREVIEW_SECRET_TOKEN` environment variable in `.env.local`:
```
NEXT_PUBLIC_PREVIEW_SECRET_TOKEN=your-secure-random-token
```

### URL Structure
Once published, services will be accessible at:
- `/services/5-axis-machining`
- `/services/adaptive-machining`
- `/services/metrology`
- `/services/engineering`

## Checklist

### Service 1: 5-Axis Machining
- [ ] Create document in Sanity
- [ ] Fill in all required fields
- [ ] Upload hero image
- [ ] Add 4 capabilities
- [ ] Add 4 features with images
- [ ] Add 4 process steps
- [ ] Add 2 equipment entries
- [ ] Save as Draft
- [ ] Test preview mode
- [ ] Verify page renders correctly
- [ ] Publish document

### Service 2: Adaptive Machining
- [ ] Create document in Sanity
- [ ] Fill in all required fields
- [ ] Add all sections
- [ ] Test preview
- [ ] Publish

### Service 3: Metrology
- [ ] Create document in Sanity
- [ ] Fill in all required fields
- [ ] Add all sections
- [ ] Test preview
- [ ] Publish

### Service 4: Engineering
- [ ] Create document in Sanity
- [ ] Fill in all required fields
- [ ] Add all sections
- [ ] Test preview
- [ ] Publish

## Fallback: Keeping Hardcoded Pages

The existing hardcoded service pages will continue to work:
- `/services/5-axis-machining/page.tsx` (hardcoded)
- `/services/adaptive-machining/page.tsx` (hardcoded)
- `/services/engineering/page.tsx` (hardcoded)
- `/services/metrology/page.tsx` (hardcoded)

Once Sanity documents are published, you can either:
1. Delete the hardcoded pages (Sanity will take over)
2. Keep them as fallbacks (NextJS will route to most specific match)

## Performance Notes

**ISR Revalidation:**
- Published services: Revalidate every 60 seconds
- Draft services: No caching (real-time updates in preview mode)
- Slug list: Revalidate every hour (for static generation)

**Caching:**
- Images: Optimized via Sanity CDN
- Content: ISR ensures fresh data within 60s of changes
- Preview: Real-time (no caching) for editor feedback

## Troubleshooting

**Service page shows "Service Not Found"**
- Verify Sanity document is published (not draft)
- Check slug matches exactly (case-sensitive)
- Clear browser cache
- Revalidate ISR: Request page after 60 seconds

**Images not loading**
- Verify image is uploaded to Sanity
- Check image field is filled in service document
- Verify image format is supported

**Preview mode not working**
- Verify NEXT_PUBLIC_PREVIEW_SECRET_TOKEN is set correctly
- Check SANITY_READ_TOKEN is configured
- Verify draftClient has perspective: 'previewDrafts'

**Build errors**
- Run `npm run build` to verify
- Check TypeScript: `npx tsc --noEmit`
- Clear `.next` folder and rebuild

## Next Steps

Once all 4 services are in Sanity and tested:
1. Delete hardcoded service page components (optional)
2. Verify static generation works: `npm run build`
3. Test all 4 services on production
4. Proceed to Phase 2: Industry Pages Migration
