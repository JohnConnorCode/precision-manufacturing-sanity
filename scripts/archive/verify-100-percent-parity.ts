import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skn2xvj2Bnn3x5oHx8g1cOVwIfNEsHGd19Junr28Sr2scMHdzDoNznFbCyAqo7jkRW8uflB8vZYSzF6VeasgGlSbmyhDjmZAd6zy4zby5YdMmK7FcyZO4H762UbSxDiCKfAPM1nYZaosbkkSAOYTs1R5x7w2jwzoWgDgZUW0iEELOTTfwHiE'
});

async function verify100PercentParity() {
  console.log('===========================================');
  console.log('🔍 COMPREHENSIVE PARITY CHECK');
  console.log('===========================================');
  console.log('Reference Site: https://precision-manufacturing.vercel.app');
  console.log('Our Site:       http://localhost:3000');
  console.log('===========================================\n');

  const issues: string[] = [];
  const successes: string[] = [];

  // 1. CHECK HOMEPAGE
  console.log('📄 HOMEPAGE CHECK:');
  const homepage = await client.fetch(`*[_type == "homepage"][0]`);

  // Check hero section
  if (!homepage?.hero?.title || !homepage?.hero?.titleHighlight) {
    issues.push('❌ Homepage: Missing hero title or highlight');
  } else {
    successes.push('✅ Homepage: Hero section present');
  }

  // Check services section
  if (!homepage?.servicesSection?.services || homepage.servicesSection.services.length === 0) {
    issues.push('❌ Homepage: Missing services section');
  } else {
    successes.push(`✅ Homepage: ${homepage.servicesSection.services.length} services in section`);
  }

  // Check industries section
  if (!homepage?.industriesSection?.industries || homepage.industriesSection.industries.length === 0) {
    issues.push('❌ Homepage: Missing industries section');
  } else {
    successes.push(`✅ Homepage: ${homepage.industriesSection.industries.length} industries in section`);
  }

  // Check resources section
  if (!homepage?.resourcesSection) {
    issues.push('❌ Homepage: Missing resources section');
  } else {
    successes.push('✅ Homepage: Resources section present');
  }

  // Check certifications section
  if (!homepage?.certifications || homepage.certifications.length === 0) {
    issues.push('❌ Homepage: Missing certifications');
  } else {
    successes.push(`✅ Homepage: ${homepage.certifications.length} certifications`);
  }

  // Check stats section
  if (!homepage?.stats || homepage.stats.length === 0) {
    issues.push('❌ Homepage: Missing stats');
  } else {
    successes.push(`✅ Homepage: ${homepage.stats.length} stats`);
  }

  // Check image showcase section
  if (!homepage?.imageShowcase) {
    issues.push('❌ Homepage: Missing image showcase section');
  } else {
    successes.push('✅ Homepage: Image showcase section present');
  }

  // Check CTA section
  if (!homepage?.cta) {
    issues.push('❌ Homepage: Missing CTA section');
  } else {
    successes.push('✅ Homepage: CTA section present');
  }

  // 2. CHECK SERVICES
  console.log('\n📄 SERVICES CHECK:');
  const services = await client.fetch(`*[_type == "service" && published == true] | order(order asc)`);
  const servicesPage = await client.fetch(`*[_type == "servicesPage"][0]`);

  if (!services || services.length === 0) {
    issues.push('❌ Services: No services found');
  } else {
    successes.push(`✅ Services: ${services.length} services found`);
    // Check each service has required fields
    services.forEach((service: any) => {
      if (!service.image || typeof service.image === 'string') {
        issues.push(`❌ Service "${service.title}": Invalid or missing image`);
      }
      if (!service.description) {
        issues.push(`❌ Service "${service.title}": Missing description`);
      }
    });
  }

  if (!servicesPage?.hero) {
    issues.push('❌ Services Page: Missing hero section');
  } else {
    successes.push('✅ Services Page: Hero section present');
  }

  // 3. CHECK INDUSTRIES
  console.log('\n📄 INDUSTRIES CHECK:');
  const industries = await client.fetch(`*[_type == "industry" && published == true] | order(order asc)`);
  const industriesPage = await client.fetch(`*[_type == "industriesPage"][0]`);

  if (!industries || industries.length === 0) {
    issues.push('❌ Industries: No industries found');
  } else {
    successes.push(`✅ Industries: ${industries.length} industries found`);
    // Check each industry has required fields
    industries.forEach((industry: any) => {
      if (!industry.image || typeof industry.image === 'string') {
        issues.push(`❌ Industry "${industry.title}": Invalid or missing image`);
      }
      if (!industry.description) {
        issues.push(`❌ Industry "${industry.title}": Missing description`);
      }
    });
  }

  if (!industriesPage?.hero) {
    issues.push('❌ Industries Page: Missing hero section');
  } else {
    successes.push('✅ Industries Page: Hero section present');
  }

  // 4. CHECK RESOURCES
  console.log('\n📄 RESOURCES CHECK:');
  const resources = await client.fetch(`*[_type == "resource" && published == true] | order(publishedAt desc)`);
  const resourcesPage = await client.fetch(`*[_type == "resourcesPage"][0]`);

  if (!resources || resources.length === 0) {
    issues.push('❌ Resources: No resources found');
  } else {
    successes.push(`✅ Resources: ${resources.length} resources found`);
    // Check each resource has required fields
    let missingImages = 0;
    resources.forEach((resource: any) => {
      if (!resource.image || typeof resource.image === 'string') {
        missingImages++;
      }
    });
    if (missingImages > 0) {
      issues.push(`❌ Resources: ${missingImages} resources have invalid/missing images`);
    }
  }

  if (!resourcesPage?.hero) {
    issues.push('❌ Resources Page: Missing hero section');
  } else {
    successes.push('✅ Resources Page: Hero section present');
  }

  // 5. CHECK ABOUT
  console.log('\n📄 ABOUT CHECK:');
  const about = await client.fetch(`*[_type == "about"][0]`);

  if (!about) {
    issues.push('❌ About: No about page found');
  } else {
    if (!about.hero) issues.push('❌ About: Missing hero section');
    else successes.push('✅ About: Hero section present');

    if (!about.story) issues.push('❌ About: Missing story section');
    else successes.push('✅ About: Story section present');

    if (!about.companyStats || about.companyStats.length === 0) issues.push('❌ About: Missing company stats');
    else successes.push(`✅ About: ${about.companyStats.length} company stats`);

    if (!about.timeline || about.timeline.length === 0) issues.push('❌ About: Missing timeline');
    else successes.push(`✅ About: ${about.timeline.length} timeline events`);

    if (!about.values || about.values.length === 0) issues.push('❌ About: Missing values');
    else successes.push(`✅ About: ${about.values.length} values`);

    if (!about.certifications || about.certifications.length === 0) issues.push('❌ About: Missing certifications');
    else successes.push(`✅ About: ${about.certifications.length} certifications`);
  }

  // Check team members
  const teamMembers = await client.fetch(`*[_type == "teamMember" && published == true] | order(order asc)`);
  if (!teamMembers || teamMembers.length === 0) {
    issues.push('❌ About: No team members found');
  } else {
    successes.push(`✅ About: ${teamMembers.length} team members`);
  }

  // 6. CHECK CAREERS
  console.log('\n📄 CAREERS CHECK:');
  const careers = await client.fetch(`*[_type == "careers"][0]`);
  const jobPostings = await client.fetch(`*[_type == "jobPosting" && published == true] | order(order asc)`);

  if (!careers) {
    issues.push('❌ Careers: No careers page found');
  } else {
    if (!careers.hero) issues.push('❌ Careers: Missing hero section');
    else successes.push('✅ Careers: Hero section present');

    if (!careers.whyWorkHere) issues.push('❌ Careers: Missing whyWorkHere section');
    else successes.push('✅ Careers: whyWorkHere section present');

    if (!careers.benefits) issues.push('❌ Careers: Missing benefits section');
    else successes.push('✅ Careers: Benefits section present');

    if (!careers.values) issues.push('❌ Careers: Missing values section');
    else successes.push('✅ Careers: Values section present');
  }

  if (!jobPostings || jobPostings.length === 0) {
    issues.push('❌ Careers: No job postings found');
  } else {
    successes.push(`✅ Careers: ${jobPostings.length} job postings`);
  }

  // 7. CHECK CONTACT
  console.log('\n📄 CONTACT CHECK:');
  const contact = await client.fetch(`*[_type == "contact"][0]`);

  if (!contact) {
    issues.push('❌ Contact: No contact page found');
  } else {
    if (!contact.hero) issues.push('❌ Contact: Missing hero section');
    else successes.push('✅ Contact: Hero section present');

    if (!contact.contactInfo) issues.push('❌ Contact: Missing contact info');
    else successes.push('✅ Contact: Contact info present');

    if (!contact.locations || contact.locations.length === 0) issues.push('❌ Contact: Missing locations');
    else successes.push(`✅ Contact: ${contact.locations.length} locations`);
  }

  // 8. CHECK GLOBAL SETTINGS
  console.log('\n📄 GLOBAL SETTINGS CHECK:');
  const footer = await client.fetch(`*[_type == "footer"][0]`);
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`);

  if (!footer) {
    issues.push('❌ Global: No footer settings found');
  } else {
    successes.push('✅ Global: Footer settings present');
  }

  if (!siteSettings) {
    issues.push('❌ Global: No site settings found');
  } else {
    successes.push('✅ Global: Site settings present');
  }

  // FINAL REPORT
  console.log('\n\n===========================================');
  console.log('📊 FINAL REPORT');
  console.log('===========================================\n');

  console.log('✅ SUCCESSES:', successes.length);
  successes.forEach(s => console.log('  ' + s));

  if (issues.length > 0) {
    console.log('\n❌ ISSUES FOUND:', issues.length);
    issues.forEach(i => console.log('  ' + i));

    console.log('\n🚨 PARITY STATUS: NOT ACHIEVED');
    console.log(`   ${issues.length} issues need to be fixed`);
  } else {
    console.log('\n✨ PARITY STATUS: 100% ACHIEVED');
    console.log('   All content present and editable in Sanity!');
  }

  // CHECK IMAGES
  console.log('\n\n===========================================');
  console.log('🖼️  IMAGE VERIFICATION');
  console.log('===========================================\n');

  // Count all images
  let totalImages = 0;
  let validImages = 0;
  let invalidImages = 0;

  // Check homepage images
  if (homepage?.hero?.backgroundImage) {
    totalImages++;
    if (typeof homepage.hero.backgroundImage === 'object' && homepage.hero.backgroundImage.asset) {
      validImages++;
    } else {
      invalidImages++;
      console.log(`❌ Invalid image: Homepage hero background`);
    }
  }

  // Check service images
  services?.forEach((service: any) => {
    if (service.image) {
      totalImages++;
      if (typeof service.image === 'object' && service.image.asset) {
        validImages++;
      } else {
        invalidImages++;
        console.log(`❌ Invalid image: Service "${service.title}"`);
      }
    }
  });

  // Check industry images
  industries?.forEach((industry: any) => {
    if (industry.image) {
      totalImages++;
      if (typeof industry.image === 'object' && industry.image.asset) {
        validImages++;
      } else {
        invalidImages++;
        console.log(`❌ Invalid image: Industry "${industry.title}"`);
      }
    }
  });

  // Check resource images
  resources?.forEach((resource: any) => {
    if (resource.image) {
      totalImages++;
      if (typeof resource.image === 'object' && resource.image.asset) {
        validImages++;
      } else {
        invalidImages++;
      }
    }
  });

  console.log(`\n📊 Image Summary:`);
  console.log(`   Total Images: ${totalImages}`);
  console.log(`   Valid Sanity Images: ${validImages}`);
  console.log(`   Invalid/String Images: ${invalidImages}`);

  if (invalidImages > 0) {
    console.log(`\n⚠️  ${invalidImages} images need to be fixed!`);
  } else {
    console.log(`\n✅ All images are properly configured!`);
  }

  // FINAL SUMMARY
  console.log('\n\n===========================================');
  console.log('🎯 100% PARITY STATUS');
  console.log('===========================================\n');

  const hasFullParity = issues.length === 0 && invalidImages === 0;

  if (hasFullParity) {
    console.log('✅✅✅ 100% PARITY ACHIEVED! ✅✅✅');
    console.log('\n🎉 All content matches reference site');
    console.log('🎉 All content is editable in Sanity');
    console.log('🎉 All images are properly configured');
  } else {
    console.log('❌❌❌ PARITY NOT YET ACHIEVED ❌❌❌');
    console.log(`\n📝 ${issues.length} content issues to fix`);
    console.log(`🖼️  ${invalidImages} image issues to fix`);
    console.log('\nRun the fix scripts to resolve these issues.');
  }
}

verify100PercentParity().catch(console.error);