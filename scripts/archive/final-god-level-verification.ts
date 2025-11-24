#!/usr/bin/env npx tsx
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vgacjlhu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skoDqXfFqDrVj735nbtXKTBby81kkVTphHF94Vz2qDZZFwoMMwoh3FRWBmmIctzalhAFPGvACjjpQTWh0I3sUmKMUJ0dZ0Ds2znOcCuwbOZpqvxzI6CrtkwEvcIrxcAOfoJUWvzfaVWv3qD1eBaVLwFl1VoKY7OKCNqmUas0JTiCmizvnkTr'
});

async function godLevelAudit() {
  console.log('🔍 FINAL GOD-LEVEL VERIFICATION\n');

  // Services
  const services = await client.fetch(`*[_type == 'service' && published == true] | order(title asc) {
    title,
    'slug': slug.current,
    'statsCount': count(statistics),
    'capCount': count(capabilities),
    'processCount': count(process.steps),
    'buttonsCount': count(hero.buttons),
    'ctaCount': count(cta.buttons),
    'hasSEO': defined(seo.metaTitle)
  }`);

  console.log('✅ SERVICES (' + services.length + '/4):');
  services.forEach((s: any) => {
    const perfect = s.statsCount >= 4 && s.capCount >= 4 && s.processCount >= 4 && s.buttonsCount >= 2 && s.ctaCount >= 2 && s.hasSEO;
    console.log(`   ${perfect ? '✅' : '❌'} ${s.title}`);
    if (!perfect) {
      console.log(`      Stats: ${s.statsCount}/4 | Caps: ${s.capCount}/4 | Process: ${s.processCount}/4 | SEO: ${s.hasSEO}`);
    }
  });

  // Industries
  const industries = await client.fetch(`*[_type == 'industry' && published == true] | order(title asc) {
    title,
    'slug': slug.current,
    'expertiseCount': count(expertise),
    'certCount': count(certifications),
    'capCount': count(capabilities),
    'buttonsCount': count(hero.buttons),
    'hasCTA': defined(cta),
    'hasSEO': defined(seo.metaTitle)
  }`);

  console.log('\n✅ INDUSTRIES (' + industries.length + '/3):');
  industries.forEach((i: any) => {
    const perfect = i.expertiseCount >= 3 && i.certCount >= 3 && i.capCount >= 4 && i.buttonsCount >= 2 && i.hasCTA && i.hasSEO;
    console.log(`   ${perfect ? '✅' : '❌'} ${i.title}`);
    if (!perfect) {
      console.log(`      Expertise: ${i.expertiseCount}/3 | Certs: ${i.certCount}/3 | Caps: ${i.capCount}/4 | CTA: ${i.hasCTA} | SEO: ${i.hasSEO}`);
    }
  });

  // Pages
  const homepage = await client.fetch(`*[_type == 'homepage'][0] {
    'heroTitle': hero.title,
    'heroButtons': count(hero.buttons),
    'servicesTitle': servicesSection.title,
    'industriesTitle': industriesSection.title,
    'hasSEO': defined(seo.metaTitle)
  }`);

  const about = await client.fetch(`*[_type == 'about'][0] {
    'statsCount': count(companyStats),
    'milestonesCount': count(timeline.milestones),
    'valuesCount': count(values.items),
    'leadershipCount': count(leadership.team),
    'capsCount': count(capabilities),
    'certsCount': count(certifications),
    'hasSEO': defined(seo.metaTitle)
  }`);

  const careers = await client.fetch(`*[_type == 'careers'][0] {
    'benefitsCount': count(benefits.items),
    'valuesCount': count(values.items),
    'jobsCount': count(opportunities.jobs),
    'hasSEO': defined(seo.metaTitle)
  }`);

  const industriesPage = await client.fetch(`*[_type == 'industriesPage'][0] {
    'statsCount': count(content.overviewStats),
    'industriesCount': count(content.industries),
    'whyChooseCount': count(content.whyChooseUs),
    'resultsCount': count(content.provenResults),
    'hasSEO': defined(seo.metaTitle)
  }`);

  console.log('\n✅ PAGES:');

  const homePerfect = homepage?.heroTitle && homepage.heroButtons >= 2 && homepage.servicesTitle && homepage.industriesTitle && homepage.hasSEO;
  console.log(`   ${homePerfect ? '✅' : '❌'} Homepage`);
  if (!homePerfect) {
    console.log(`      Hero: ${homepage?.heroTitle ? 'YES' : 'NO'} | Buttons: ${homepage?.heroButtons || 0}/2 | Sections: ${homepage?.servicesTitle ? 'YES' : 'NO'} | SEO: ${homepage?.hasSEO}`);
  }

  const aboutPerfect = about?.statsCount >= 4 && about.milestonesCount >= 6 && about.valuesCount >= 4 && about.leadershipCount >= 4 && about.capsCount >= 4 && about.certsCount >= 6 && about.hasSEO;
  console.log(`   ${aboutPerfect ? '✅' : '❌'} About`);
  if (!aboutPerfect) {
    console.log(`      Stats: ${about?.statsCount || 0}/4 | Milestones: ${about?.milestonesCount || 0}/6 | Values: ${about?.valuesCount || 0}/4 | Leadership: ${about?.leadershipCount || 0}/4 | SEO: ${about?.hasSEO}`);
  }

  const careersPerfect = careers?.benefitsCount >= 4 && careers.valuesCount >= 4 && careers.jobsCount >= 3 && careers.hasSEO;
  console.log(`   ${careersPerfect ? '✅' : '❌'} Careers`);
  if (!careersPerfect) {
    console.log(`      Benefits: ${careers?.benefitsCount || 0}/4 | Values: ${careers?.valuesCount || 0}/4 | Jobs: ${careers?.jobsCount || 0}/3 | SEO: ${careers?.hasSEO}`);
  }

  const indPagePerfect = industriesPage?.statsCount >= 4 && industriesPage.industriesCount >= 3 && industriesPage.whyChooseCount >= 4 && industriesPage.resultsCount >= 4 && industriesPage.hasSEO;
  console.log(`   ${indPagePerfect ? '✅' : '❌'} Industries Page`);
  if (!indPagePerfect) {
    console.log(`      Stats: ${industriesPage?.statsCount || 0}/4 | Industries: ${industriesPage?.industriesCount || 0}/3 | Why Choose: ${industriesPage?.whyChooseCount || 0}/4 | Results: ${industriesPage?.resultsCount || 0}/4 | SEO: ${industriesPage?.hasSEO}`);
  }

  // Final verdict
  const allServicesPerfect = services.every((s: any) => s.statsCount >= 4 && s.capCount >= 4 && s.processCount >= 4 && s.buttonsCount >= 2 && s.ctaCount >= 2 && s.hasSEO);
  const allIndustriesPerfect = industries.every((i: any) => i.expertiseCount >= 3 && i.certCount >= 3 && i.capCount >= 4 && i.buttonsCount >= 2 && i.hasCTA && i.hasSEO);
  const allPagesPerfect = homePerfect && aboutPerfect && careersPerfect && indPagePerfect;

  if (allServicesPerfect && allIndustriesPerfect && allPagesPerfect) {
    console.log('\n🏆 GOD-LIKE STATUS ACHIEVED! ABSOLUTELY PERFECT! 🏆');
  } else {
    console.log('\n⚠️  SOME ISSUES REMAINING - NOT YET PERFECT');
  }
}

godLevelAudit().catch(console.error);
