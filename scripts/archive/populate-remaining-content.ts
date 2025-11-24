#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function populateRemainingContent() {
  console.log('🚀 Populating Remaining Content Gaps\n');

  // 1. UPDATE SERVICE EQUIPMENT WITH SPECIFIC DETAILS
  console.log('1️⃣  Updating service equipment specifications...');

  // 5-Axis Machining - Hermle C42U details
  await client
    .patch('35a2dd2b-ea03-4c3d-94ac-783c58abf56e')
    .set({
      equipment: [
        {
          _key: 'hermle-c42u',
          name: 'Hermle C42U 5-Axis Machining Center',
          details: 'Work envelope: 48" x 26" x 20" (1220mm x 660mm x 500mm), Spindle speed: 12,000 RPM, Equipped with Heidenhain TNC 640 control'
        },
        {
          _key: 'dmg-dmu50',
          name: 'DMG DMU 50 5-Axis',
          details: 'Vertical machining center with integrated rotary/tilt table, High-speed spindle for aluminum and exotic alloys'
        },
        {
          _key: 'makino-a51nx',
          name: 'Makino A51NX',
          details: 'High-precision 5-axis horizontal machining, Ideal for complex aerospace components'
        }
      ]
    })
    .commit();

  // Precision Metrology - CMM specs
  await client
    .patch('38627f97-5bcd-4c27-a570-dfbd0b6df7e3')
    .set({
      equipment: [
        {
          _key: 'zeiss-contura',
          name: 'Zeiss Contura G2 CMM',
          details: 'Accuracy: ±0.00005" (±1.3 µm), Measuring volume: 39" x 31" x 27", Climate-controlled room: ±0.5°F (±0.3°C)'
        },
        {
          _key: 'mitutoyo-cmm',
          name: 'Mitutoyo Crysta-Apex S',
          details: 'High-precision coordinate measuring machine, PC-DMIS software for advanced inspection'
        },
        {
          _key: 'faro-arm',
          name: 'FARO Edge Arm',
          details: 'Portable CMM for large part inspection, Laser scanning capability for complex surfaces'
        }
      ]
    })
    .commit();

  // Adaptive Machining - Force control systems
  await client
    .patch('6bf1b3c8-9166-4119-89e2-dd6efcd5fd33')
    .set({
      equipment: [
        {
          _key: 'marposs-system',
          name: 'Marposs Adaptive Control System',
          details: 'Real-time force monitoring and adjustment, Tool life extension: 40%+, Surface finish improvement: Ra 16 to Ra 8 µin'
        },
        {
          _key: 'renishaw-probes',
          name: 'Renishaw Tool Setting & Probing',
          details: 'In-process verification and adaptive offset correction'
        },
        {
          _key: 'sensor-suite',
          name: 'Advanced Sensor Suite',
          details: 'Vibration, temperature, and spindle load monitoring for real-time optimization'
        }
      ]
    })
    .commit();

  // Engineering Services - CAD/CAM systems
  await client
    .patch('90cd7631-50b6-4966-b583-609f3180dab5')
    .set({
      equipment: [
        {
          _key: 'solidworks-cad',
          name: 'SolidWorks CAD',
          details: 'Full 3D modeling and design for manufacturability (DFM) analysis'
        },
        {
          _key: 'mastercam-cam',
          name: 'Mastercam CAM',
          details: 'Advanced toolpath generation and simulation for 5-axis machining'
        },
        {
          _key: 'gd-powerinspect',
          name: 'GD&T PowerInspect',
          details: 'First article inspection and geometric dimensioning & tolerancing validation'
        }
      ]
    })
    .commit();

  console.log('   ✅ Service equipment updated\n');

  // 2. POPULATE HOMEPAGE HERO BADGE
  console.log('2️⃣  Fixing homepage hero badge...');

  const homepage = await client.fetch(`*[_id == "drafts.homepage"][0]`);
  const updatedBadges = [...(homepage.hero?.badges || [])];

  if (updatedBadges[0] && !updatedBadges[0].text) {
    updatedBadges[0] = {
      ...updatedBadges[0],
      text: 'AS9100D Certified',
      iconName: 'Award'
    };
  }

  await client
    .patch('drafts.homepage')
    .set({ 'hero.badges': updatedBadges })
    .commit();

  console.log('   ✅ Homepage hero badge fixed\n');

  // 3. POPULATE FOOTER DATA
  console.log('3️⃣  Populating footer certifications and links...');

  await client
    .patch('drafts.footer')
    .set({
      'company.foundedYear': '1995',
      'company.certifications': 'AS9100D | ISO 9001:2015 | ITAR | CMMC',
      links: [
        {
          _key: 'services',
          _type: 'object',
          title: 'Services',
          links: [
            { _key: 's1', text: '5-Axis Machining', href: '/services/5-axis-machining' },
            { _key: 's2', text: 'Precision Metrology', href: '/services/precision-metrology' },
            { _key: 's3', text: 'Adaptive Machining', href: '/services/adaptive-machining-technology' },
            { _key: 's4', text: 'Engineering Services', href: '/services/comprehensive-engineering-services' }
          ]
        },
        {
          _key: 'industries',
          _type: 'object',
          title: 'Industries',
          links: [
            { _key: 'i1', text: 'Aerospace & Aviation', href: '/industries/aerospace' },
            { _key: 'i2', text: 'Defense & Government', href: '/industries/defense' },
            { _key: 'i3', text: 'Energy & Power', href: '/industries/energy' }
          ]
        },
        {
          _key: 'company',
          _type: 'object',
          title: 'Company',
          links: [
            { _key: 'c1', text: 'About Us', href: '/about' },
            { _key: 'c2', text: 'Careers', href: '/careers' },
            { _key: 'c3', text: 'Contact', href: '/contact' }
          ]
        },
        {
          _key: 'resources',
          _type: 'object',
          title: 'Resources',
          links: [
            { _key: 'r1', text: 'Manufacturing Processes', href: '/resources/manufacturing-processes' },
            { _key: 'r2', text: 'Quality & Compliance', href: '/resources/quality-compliance' },
            { _key: 'r3', text: 'Calculators & Tools', href: '/resources/calculators-tools' }
          ]
        }
      ]
    })
    .commit();

  console.log('   ✅ Footer populated\n');

  // 4. PUBLISH UPDATES
  console.log('4️⃣  Publishing updated documents...');

  // Publish homepage
  const draftHomepage = await client.fetch(`*[_id == "drafts.homepage"][0]`);
  await client.createOrReplace({ ...draftHomepage, _id: 'homepage', _type: 'homepage' });

  // Publish footer
  const draftFooter = await client.fetch(`*[_id == "drafts.footer"][0]`);
  await client.createOrReplace({ ...draftFooter, _id: 'footer', _type: 'footer' });

  console.log('   ✅ Documents published\n');

  console.log('✨ ALL REMAINING CONTENT POPULATED!\n');
  console.log('Summary:');
  console.log('  ✅ Service equipment specs updated with specific details');
  console.log('  ✅ Homepage hero badge fixed');
  console.log('  ✅ Footer certifications and links populated');
  console.log('  ✅ All changes published');
  console.log('\n🎉 Ready for final verification!\n');
}

populateRemainingContent().catch(console.error);
