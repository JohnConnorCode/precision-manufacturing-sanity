#!/usr/bin/env npx tsx

/**
 * Synchronise the Sanity homepage + industry documents with the reference site content.
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { randomUUID } from 'node:crypto';

dotenv.config({ path: '.env.local' });

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET,
  SANITY_API_WRITE_TOKEN,
} = process.env;

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_DATASET || !SANITY_API_WRITE_TOKEN) {
  throw new Error('Missing Sanity environment variables. Check .env.local for projectId/dataset/token.');
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_API_WRITE_TOKEN,
});

const block = (text: string) => [
  {
    _key: randomUUID(),
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', text, marks: [] }],
  },
];

async function updateHomepage() {
  const homepage = await client.fetch('*[_type == "homepage"][0]');
  if (!homepage?._id) {
    throw new Error('Homepage document not found in Sanity.');
  }

  const hero = {
    ...(homepage.hero ?? {}),
    word1: 'PRECISION',
    word2: 'MANUFACTURING',
    word3: 'SERVICES',
    tagline: 'Innovative Precision Machining & Manufacturing Excellence Since 1995',
    ctaPrimary: {
      text: 'View Capabilities',
      href: '/services',
    },
  };

  const servicesSection = {
    ...(homepage.servicesSection ?? {}),
    eyebrow: 'COMPREHENSIVE MANUFACTURING SOLUTIONS',
    headingWord1: 'PRECISION',
    headingWord2: 'SERVICES',
    description: 'Four core service pillars delivering unmatched precision and reliability',
    subdescription:
      'From complex 5-axis machining to advanced metrology, our integrated services ensure your most critical components meet the strictest aerospace and defense standards',
    cta: {
      enabled: true,
      text: 'Get Quote',
      href: '/contact',
      variant: 'primary',
    },
  };

  const specs = [
    { value: '±0.0001"', label: 'Precision', description: 'Ultra-tight tolerances', iconName: 'Target' },
    { value: '5-AXIS', label: 'CNC Capability', description: 'Simultaneous machining', iconName: 'Gauge' },
    { value: 'AS9100D', label: 'Certified', description: 'Aerospace quality', iconName: 'Award' },
    { value: '99.73%', label: 'First Pass Yield', description: 'Quality rate', iconName: 'CheckCircle2' },
    { value: '24/7', label: 'Production', description: 'Continuous operation', iconName: 'Clock' },
    { value: '99.8%', label: 'On-Time', description: 'Delivery performance', iconName: 'Activity' },
    { value: '30', label: 'Years', description: 'Manufacturing excellence', iconName: 'Calendar' },
    { value: 'ITAR', label: 'Registered', description: 'Defense compliant', iconName: 'Shield' },
  ].map((spec) => ({ _key: randomUUID(), enabled: true, ...spec }));

  const industriesSection = {
    ...(homepage.industriesSection ?? {}),
    eyebrow: 'SPECIALIZED SECTOR EXPERTISE',
    heading: 'INDUSTRY LEADERS',
    description: 'Three decades of trusted partnerships in mission-critical sectors',
    subdescription:
      'Our certifications and clearances enable us to serve the most demanding industries where component failure can mean mission failure',
  };

  const showcaseImages = [
    {
      title: 'Aerospace Components',
      category: 'Turbine Blades',
      href: '/services/5-axis-machining',
      src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=2000&q=90',
      alt: 'Close-up of aerospace turbine blades on a machining table',
    },
    {
      title: 'Defense Systems',
      category: 'ITAR Certified',
      href: '/services/adaptive-machining',
      src: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?auto=format&fit=crop&w=2000&q=90',
      alt: 'Technician working on defense system assembly',
    },
    {
      title: 'Precision Metrology',
      category: 'Quality Control',
      href: '/services/metrology',
      src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2000&q=90',
      alt: 'Metrology inspection of aerospace components',
    },
  ].map((image) => ({ _key: randomUUID(), enabled: true, ...image }));

  const showcaseStats = [
    { value: 'AS9100D', label: 'Certified Quality', iconName: 'Award' },
    { value: 'ITAR', label: 'Registered', iconName: 'Shield' },
    { value: '24/7', label: 'Production', iconName: 'Clock' },
    { value: '±0.0001"', label: 'Tolerance', iconName: 'Target' },
  ].map((stat) => ({ _key: randomUUID(), enabled: true, ...stat }));

  const showcaseCtaButtons = [
    { text: 'Request Quote', href: '/contact', variant: 'primary' },
    { text: 'Learn More', href: '/about', variant: 'secondary' },
  ].map((button) => ({ _key: randomUUID(), enabled: true, ...button }));

  const imageShowcase = {
    backgroundColor: 'bg-white',
    titleColor: 'text-zinc-900',
    highlightColor: 'text-blue-600',
    header: {
      eyebrow: 'Manufacturing Excellence',
      title: 'Precision',
      titleHighlight: 'Delivered',
      description: 'From concept to completion, we deliver aerospace-grade components with uncompromising precision',
    },
    showcaseImages,
    stats: showcaseStats,
    cta: {
      title: 'Get Started Today',
      description: 'Let’s discuss how we can deliver precision manufacturing solutions for your needs',
      buttons: showcaseCtaButtons,
    },
  };

  const featuredSeries = [
    {
      title: 'CMM Inspection Mastery',
      slug: 'cmm-inspection-mastery',
      description: 'Master coordinate measuring machine setup, programming, and measurement strategies for precision inspection.',
      articleCount: 4,
      readTime: '34 min',
      difficulty: 'Intermediate',
      icon: '📐',
    },
    {
      title: 'First Article Inspection Excellence',
      slug: 'first-article-inspection-fai-excellence',
      description: 'Complete AS9102 FAI requirements, documentation, and approval processes for aerospace manufacturing.',
      articleCount: 3,
      readTime: '26 min',
      difficulty: 'Advanced',
      icon: '✓',
    },
    {
      title: 'GD&T Fundamentals',
      slug: 'gdt-fundamentals-and-application',
      description: 'Comprehensive Geometric Dimensioning and Tolerancing training for precision manufacturing applications.',
      articleCount: 4,
      readTime: '35 min',
      difficulty: 'Beginner',
      icon: '⊕',
    },
  ].map((series) => ({ _key: randomUUID(), enabled: true, gradient: 'from-blue-500 to-indigo-500', ...series }));

  const resourceBenefits = [
    {
      title: 'Structured Learning',
      description: 'Progressive curriculum from fundamentals to advanced topics',
      iconName: 'GraduationCap',
    },
    {
      title: 'Industry Standards',
      description: 'Aligned with AS9100, ISO, and aerospace best practices',
      iconName: 'Award',
    },
    {
      title: 'Practical Application',
      description: 'Real-world examples and implementation strategies',
      iconName: 'TrendingUp',
    },
  ].map((benefit) => ({ _key: randomUUID(), enabled: true, ...benefit }));

  const resourcesSection = {
    backgroundColor: 'bg-slate-950',
    titleColor: 'text-zinc-900',
    badgeColor: 'text-blue-600',
    header: {
      badge: 'Technical Resources & Knowledge Base',
      title: 'Master Precision Manufacturing',
      description:
        'Comprehensive technical article series covering CMM inspection, FAI procedures, GD&T fundamentals, CNC manufacturing, AS9100 quality management, and MetBase quality systems.',
    },
    additionalSeriesText: '6 Complete Series • 21+ Technical Articles',
    featuredSeries,
    benefits: resourceBenefits,
    cta: {
      title: 'Explore Our Complete Knowledge Base',
      description: 'CNC Manufacturing Precision, AS9100 Quality Management, MetBase Quality Systems, and more.',
      buttons: [
        { _key: randomUUID(), enabled: true, text: 'View All Series', href: '/resources/series', variant: 'primary' },
        { _key: randomUUID(), enabled: true, text: 'Browse Resources', href: '/resources', variant: 'secondary' },
      ],
    },
  };

  const cta = {
    badge: 'THE NUMBERS SPEAK FOR THEMSELVES',
    title: 'Operational Excellence',
    subtitle:
      'Start Your Precision Manufacturing Project — From prototype to production, we deliver AS9100D-certified precision components with tolerances to ±0.0001" for aerospace, defense, and medical applications.',
    buttons: [
      { _key: randomUUID(), enabled: true, text: 'Get Quote', href: '/contact', variant: 'primary' },
      { _key: randomUUID(), enabled: true, text: 'Technical Specifications', href: '/compliance/supplier-requirements', variant: 'secondary' },
    ],
    certifications: [
      { _key: randomUUID(), enabled: true, icon: 'Clock', text: '24/7 Production' },
      { _key: randomUUID(), enabled: true, icon: 'Shield', text: 'ITAR Registered' },
      { _key: randomUUID(), enabled: true, icon: 'Award', text: 'AS9100D' },
    ],
    trustMessage: 'Trusted by leading aerospace & defense contractors worldwide',
  };

  await client
    .patch(homepage._id)
    .set({
      hero,
      servicesSection,
      technicalSpecs: specs,
      industriesSection,
      imageShowcase,
      resourcesSection,
      cta,
    })
    .commit();

  console.log('✅ Homepage content updated');
}

async function updateIndustries() {
  const updates: Record<
    string,
    {
      title: string;
      shortDescription: string;
      description: string;
      features: string[];
      imageUrl: string;
    }
  > = {
    '907034f3-2fbc-4ff5-b007-8092f4b4b1b6': {
      title: 'Defense & Government',
      shortDescription: 'ITAR-compliant manufacturing for defense contractors and government agencies. Secure, certified production.',
      description:
        'ITAR-compliant manufacturing for defense contractors and government agencies with secure, certified production capabilities.',
      features: ['ITAR registered', 'Secure facility', 'Rapid prototyping'],
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=90',
    },
    'dd2cb0ac-1b6c-4e73-bcb7-f0ba4477cac6': {
      title: 'Energy & Power',
      shortDescription: 'Critical components for power generation and renewable energy. High-temperature alloys and superalloy expertise.',
      description:
        'Critical components for power generation and renewable energy with high-temperature alloy experience and superalloy expertise.',
      features: ['Superalloy expertise', 'Large part capability', 'Field service support'],
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=90',
    },
    'industry-1': {
      title: 'Aerospace & Aviation',
      shortDescription: 'Precision components for commercial and military aircraft. AS9100D certified production.',
      description:
        'Precision components for commercial and military aircraft backed by AS9100D certified production and NADCAP-accredited processes.',
      features: ['AS9100D certified', 'NADCAP accredited', 'Zero defect delivery'],
      imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2000&q=90',
    },
  };

  await Promise.all(
    Object.entries(updates).map(([id, value]) =>
      client
        .patch(id)
        .set({
          title: value.title,
          shortDescription: value.shortDescription,
          description: block(value.description),
          features: value.features.map((feature) => ({
            _key: randomUUID(),
            feature,
          })),
          imageUrl: value.imageUrl,
          published: true,
        })
        .commit(),
    ),
  );

  console.log('✅ Industry cards updated');
}

async function run() {
  await updateHomepage();
  await updateIndustries();
  console.log('\n🎯 Homepage parity data synced with reference site');
}

run().catch((err) => {
  console.error('❌ Failed to update homepage parity data');
  console.error(err);
  process.exit(1);
});
