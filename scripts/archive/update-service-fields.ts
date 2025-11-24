import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE',
});

const serviceData = [
  {
    id: '35a2dd2b-ea03-4c3d-94ac-783c58abf56e',
    title: '5-Axis Machining',
    icon: 'Cog',
    fullDescription: 'Our state-of-the-art 5-axis CNC machining centers deliver unparalleled precision for the most complex aerospace and defense components. With simultaneous multi-axis control, we achieve intricate geometries and superior surface finishes in a single setup, reducing lead times and ensuring exceptional accuracy. Our advanced capabilities include high-speed machining, hard milling up to 65 HRC, and specialized tooling for exotic materials.'
  },
  {
    id: '38627f97-5bcd-4c27-a570-dfbd0b6df7e3',
    title: 'Precision Metrology',
    icon: 'Ruler',
    fullDescription: 'Advanced CMM technology combined with laser scanning systems ensures dimensional accuracy down to micron levels. Our climate-controlled inspection facility features state-of-the-art coordinate measuring machines, optical comparators, and surface finish analyzers. We provide comprehensive measurement reports, GD&T analysis, and real-time quality data integration with our proprietary MetBase® software for complete traceability.'
  },
  {
    id: '6bf1b3c8-9166-4119-89e2-dd6efcd5fd33',
    title: 'Adaptive Machining Technology',
    icon: 'Cpu',
    fullDescription: 'Cutting-edge adaptive machining technology with real-time monitoring and predictive maintenance capabilities. Our smart manufacturing systems utilize AI-driven process optimization, in-process gauging, and automated tool wear compensation. This Industry 4.0 approach ensures consistent quality, minimizes scrap, and maximizes machine uptime through predictive analytics and digital twin simulation.'
  },
  {
    id: '90cd7631-50b6-4966-b583-609f3180dab5',
    title: 'Comprehensive Engineering Services',
    icon: 'Wrench',
    fullDescription: 'Our engineering services span from concept to production optimization. We provide Design for Manufacturability (DFM) analysis, process planning, rapid prototyping, and value engineering solutions. Our team of experienced engineers works collaboratively with clients to optimize designs, reduce costs, and accelerate time-to-market while maintaining the highest quality standards for mission-critical applications.'
  }
];

async function updateServices() {
  console.log('🔧 Updating service documents with icon and fullDescription fields...\n');

  for (const service of serviceData) {
    try {
      // Update the published document
      await client
        .patch(service.id)
        .set({
          icon: service.icon,
          fullDescription: service.fullDescription
        })
        .commit();

      console.log(`✅ Updated ${service.title}`);
      console.log(`   - Icon: ${service.icon}`);
      console.log(`   - Description: ${service.fullDescription.substring(0, 60)}...`);

      // Also update the draft if it exists
      const draftId = `drafts.${service.id}`;
      try {
        await client
          .patch(draftId)
          .set({
            icon: service.icon,
            fullDescription: service.fullDescription
          })
          .commit();
        console.log(`   - Also updated draft version`);
      } catch (draftError) {
        // Draft might not exist, that's okay
      }

    } catch (error: any) {
      console.error(`❌ Failed to update ${service.title}:`, error.message);
    }
  }

  console.log('\n✨ Done updating services!');

  // Verify the updates
  console.log('\n🔍 Verifying updates...');
  const updatedServices = await client.fetch(`*[_type == "service"]{_id, title, icon, fullDescription}`);

  updatedServices.forEach((service: any) => {
    console.log(`\n${service.title}:`);
    console.log(`  Icon: ${service.icon || '❌ Missing'}`);
    console.log(`  Full Description: ${service.fullDescription ? '✅ Set' : '❌ Missing'}`);
  });
}

updateServices().catch(console.error);