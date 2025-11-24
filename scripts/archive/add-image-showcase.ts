import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function addImageShowcase() {
  console.log('📸 Adding Image Showcase section to homepage...\n');

  // Get existing homepage document
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);

  if (!homepage) {
    console.error('❌ No homepage document found');
    return;
  }

  // Image Showcase data matching reference site
  const imageShowcase = {
    header: {
      eyebrow: 'Manufacturing Excellence',
      title: 'Precision',
      titleHighlight: 'Delivered',
      description: 'From concept to completion, we deliver aerospace-grade components with unmatched precision and reliability'
    },
    images: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=800&q=80',
        alt: 'Aerospace turbine blade component',
        title: 'Aerospace Components',
        category: 'Turbine Blades',
        link: '/industries/aerospace'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
        alt: 'Defense system component',
        title: 'Defense Systems',
        category: 'ITAR Certified',
        link: '/industries/defense'
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
        alt: 'CMM inspection process',
        title: 'Precision Metrology',
        category: 'Quality Control',
        link: '/services/metrology'
      }
    ],
    stats: [
      {
        icon: 'Shield',
        value: 'AS9100D',
        label: 'Certified Quality'
      },
      {
        icon: 'Lock',
        value: 'ITAR',
        label: 'Registered'
      },
      {
        icon: 'Clock',
        value: '24/7',
        label: 'Production'
      },
      {
        icon: 'Gauge',
        value: '±0.0001"',
        label: 'Tolerance'
      }
    ],
    cta: {
      title: 'Ready to Start Your Project?',
      description: 'Contact our engineering team to discuss your precision manufacturing needs',
      buttons: [
        {
          text: 'Get Quote',
          href: '/contact',
          variant: 'primary',
          enabled: true
        },
        {
          text: 'View Capabilities',
          href: '/services',
          variant: 'secondary',
          enabled: true
        }
      ]
    }
  };

  try {
    // Update homepage with Image Showcase
    const result = await client
      .patch(homepage._id)
      .set({ imageShowcase })
      .commit();

    console.log('✅ Successfully added Image Showcase section:');
    console.log('   - Header with eyebrow, title, and description');
    console.log('   - 3 showcase images with titles and categories');
    console.log('   - 4 certification stats');
    console.log('   - CTA with 2 buttons');
    console.log('\n✨ Image Showcase is now complete!');
    console.log('   Homepage ID:', result._id);

  } catch (error: any) {
    console.error('❌ Error adding Image Showcase:', error.message);
  }
}

addImageShowcase().catch(console.error);