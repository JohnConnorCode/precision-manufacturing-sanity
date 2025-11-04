import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function seedAbout() {
  const existing = await client.fetch("*[_type=='about'][0]{_id}")
  const _id = existing?._id || 'about'
  const doc = {
    _id,
    _type: 'about',
    hero: {
      badge: 'PRECISION MANUFACTURING SINCE 1995',
      badgeIconName: 'Factory',
      title: 'About',
      titleHighlight: 'Our Company',
      description:
        'From basement startup to industry leader. Three decades of precision manufacturing excellence serving aerospace, defense, and advanced industries with ISO 9001, AS9100, and ITAR certification.',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80',
      buttons: [
        { label: 'Our Capabilities', href: '#capabilities', variant: 'primary' },
        { label: 'Contact Our Team', href: '/contact', variant: 'secondary' },
      ],
    },
    companyStats: [
      { label: 'Years in Business', value: '30+', description: 'Decades of experience' },
      { label: 'Team Members', value: '150+', description: 'Skilled professionals' },
      { label: 'Annual Revenue', value: '$25M+', description: 'Consistent growth' },
      { label: 'Facility Size', value: '45,000', description: 'Square feet' },
    ],
    story: {
      title: 'Our Story',
      paragraph1:
        'Integrated Inspection Systems was founded in 1995, starting in a residential basement with a desk, computer, and a pair of calipers. Our founders came from Precision Castparts Inc, bringing aerospace expertise and a commitment to quality. From 1995-1996, we established cash flow through small business networking while developing a comprehensive quality manual. We then leased our first Zeiss CMM from Hanard Machine in Salem, Oregon, and began serving the plastics industry with a focus on precision metrology.',
      paragraph2:
        'Our breakthrough came when we applied aerospace GD&T principles to high-volume metrology, a capability few suppliers could match. This led us to purchase our own Zeiss CMM in late 1998 and move to Beaverton, Oregon. We developed proprietary software, MetBase, which revolutionized our ability to integrate CMM data, CNC machines, and vision systems into a closed-loop manufacturing system. By 2001, we had developed a 3-sigma machining system and relocated to our current 20,000 square foot facility in Clackamas, Oregon.',
      paragraph3:
        "Today, we're an ISO 9001 and AS9100 certified, ITAR-registered provider of engineering, metrology, machining, and database services. Our 3-sigma manufacturing system and proprietary MetBase software enable us to deliver industry-leading precision components for aerospace, defense, and advanced industries.",
      imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80',
      imageAlt:
        'IIS manufacturing facility in Clackamas, Oregon - 20,000 square feet with advanced machining and metrology equipment',
    },
    timeline: {
      title: 'Our Journey',
      description: 'Three decades of growth, innovation, and excellence in precision manufacturing.',
      milestones: [
        { year: '1995', title: 'IIS Founded', description: 'Started in a residential basement with founders from Precision Castparts Inc. Initial focus on small business networking and quality manual development.' },
        { year: '1998', title: 'First CMM Purchased', description: 'Purchased our own Zeiss CMM and established facility in Beaverton, Oregon. Began high-volume metrology for Hewlett Packard and plastics industry.' },
        { year: '1999-2001', title: 'MetBase Software Development', description: 'Developed proprietary MetBase software to integrate CMM data, CNC machines, and vision systems. Established 3-sigma closed-loop manufacturing system.' },
        { year: '2001', title: 'Aerospace Transition', description: 'Pivoted to aerospace inspection and machining after dot-com bubble. Relocated to SE Portland 5,000 sq ft facility. Added second Sheffield CMM.' },
        { year: '2001-2008', title: '4-Sigma System Development', description: 'Invented 4-sigma targeting system using MetBase on GE, Siemens, and Alstom IGT castings. Expanded to current 20,000 sq ft facility in Clackamas, Oregon.' },
        { year: 'Present', title: 'Industry Leader', description: 'ISO 9001 and AS9100 certified, ITAR registered provider of engineering, metrology, machining, and database services for aerospace and defense.' },
      ],
    },
    values: {
      title: 'Our Values',
      description:
        'The principles that guide our decisions, shape our culture, and drive our commitment to excellence.',
      items: [
        { title: 'Quality Excellence', description: 'Unwavering commitment to delivering components that exceed specifications and customer expectations.', iconName: 'Award' },
        { title: 'Innovation', description: 'We invest in cutting-edge technology and encourage our team to think creatively.', iconName: 'Zap' },
        { title: 'Integrity', description: 'We operate with transparency and honesty in all our business relationships.', iconName: 'Target' },
        { title: 'Teamwork', description: 'Success comes from collaboration and mutual respect across all departments.', iconName: 'Users' },
      ],
    },
    capabilities: [
      { title: 'Manufacturing Capabilities', description: 'Advanced equipment and processes', items: [ { item: '5-Axis CNC Machining' }, { item: 'Adaptive Machining' }, { item: 'Precision Metrology' } ] },
    ],
    certifications: [
      { certification: 'AS9100D Aerospace Quality Management' },
      { certification: 'ISO 9001:2015 Quality Management' },
      { certification: 'ITAR International Traffic in Arms' },
      { certification: 'CMMC Cybersecurity Maturity Model Certification' },
      { certification: 'OSHA Safety Management System' },
    ],
    cta: {
      title: 'Partner with Us',
      description:
        'Experience the difference that three decades of precision manufacturing excellence can make for your critical components.',
      buttons: [
        { label: 'Start Your Project', href: '/contact', variant: 'primary' },
        { label: 'Explore Our Services', href: '/services', variant: 'secondary' },
      ],
    },
  }
  await client.createOrReplace(doc)
  console.log('✓ Seeded: about')
}

async function seedCareers() {
  const existing = await client.fetch("*[_type=='careers'][0]{_id}")
  const _id = existing?._id || 'careers'
  const doc = {
    _id,
    _type: 'careers',
    hero: {
      badge: 'CAREERS',
      badgeIconName: 'Users',
      title: 'Join Our',
      titleHighlight: 'Team',
      description:
        "Build your career with a leader in precision manufacturing. We're looking for talented individuals who share our commitment to excellence, innovation, and quality.",
      backgroundImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=90',
      buttons: [
        { label: 'Explore Opportunities', href: '#opportunities', variant: 'primary' },
        { label: 'Contact HR', href: '/contact?interest=career', variant: 'secondary' },
      ],
    },
    whyWorkHere: {
      heading: 'Why Work at IIS?',
      paragraph1:
        "Since 1995, Integrated Inspection Systems has been a trusted leader in precision manufacturing for aerospace, defense, and advanced industries. We're proud of our 30-year legacy of quality, innovation, and team excellence.",
      paragraph2:
        'Our team of 150+ skilled professionals works in a state-of-the-art facility using cutting-edge technology including 5-axis CNC machining, adaptive manufacturing, and advanced metrology. We maintain AS9100D, ISO 9001:2015, ITAR registration, and CMMC compliance—standards that reflect our commitment to excellence.',
      paragraph3:
        "We're looking for engineers, technicians, machinists, and quality professionals who want to make a real impact in precision manufacturing.",
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=90',
      imageAlt: 'Manufacturing facility and team',
    },
    benefits: {
      heading: 'Benefits & Opportunities',
      description: 'We invest in our team because our people are our greatest asset',
      items: [
        { iconName: 'Users', title: 'Collaborative Culture', description: 'Work with talented engineers and technicians who share your passion for precision manufacturing excellence' },
        { iconName: 'Award', title: 'Professional Development', description: 'Access to continuous training, certifications, and opportunities to advance your career in precision manufacturing' },
        { iconName: 'Heart', title: 'Comprehensive Benefits', description: 'Competitive health insurance, 401(k) matching, paid time off, and a commitment to work-life balance' },
        { iconName: 'Briefcase', title: 'Industry Leadership', description: 'Be part of a company at the forefront of aerospace and defense precision manufacturing technology' },
      ],
    },
    values: {
      heading: 'Our Core Values',
      description: 'These principles guide how we work, innovate, and collaborate',
      items: [
        { title: 'Excellence', description: 'We demand the highest standards in everything we do—from components to customer service' },
        { title: 'Innovation', description: 'We invest in cutting-edge technology and encourage our team to think creatively' },
        { title: 'Integrity', description: 'We operate with transparency and honesty in all our business relationships' },
        { title: 'Teamwork', description: 'Success comes from collaboration and mutual respect across all departments' },
      ],
    },
    opportunities: {
      heading: 'Current Opportunities',
      description:
        "We're growing and actively hiring talented professionals. Don't see your ideal position? Let us know—we're always interested in exceptional talent.",
      positions: [
        { title: 'Manufacturing Engineering', description: 'Work on advanced manufacturing processes, 5-axis CNC programming, and process optimization for aerospace components', type: 'Full-time', location: 'Clackamas, OR', link: '/contact?interest=career' },
        { title: 'Quality Engineer', description: 'Ensure quality excellence through CMM inspection, GD&T analysis, and first article inspection on aerospace projects', type: 'Full-time', location: 'Clackamas, OR', link: '/contact?interest=career' },
        { title: 'CNC Machinist', description: 'Operate and optimize 5-axis CNC machines producing precision aerospace components. Requires AS9100 experience.', type: 'Full-time', location: 'Clackamas, OR', link: '/contact?interest=career' },
      ],
    },
    cta: {
      heading: 'Ready to Join IIS?',
      description: 'Take the next step in your career with a team that values excellence and innovation.',
      buttons: [
        { label: 'Apply Now', href: '/contact?interest=career', variant: 'primary' },
        { label: 'Learn About IIS', href: '/about', variant: 'outline' },
      ],
    },
  }
  await client.createOrReplace(doc)
  console.log('✓ Seeded: careers')
}

async function seedContact() {
  const existing = await client.fetch("*[_type=='contact'][0]{_id}")
  const _id = existing?._id || 'contact'
  const doc = {
    _id,
    _type: 'contact',
    hero: {
      badge: 'GET STARTED',
      badgeIconName: 'Activity',
      title: 'Contact',
      titleHighlight: 'Our Team',
      description:
        'Connect with Integrated Inspection Systems for precision manufacturing solutions, technical consultations, and project quotes.',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=2400&q=80',
      buttonLabel: 'Start Your Project',
      buttonHref: '#contact-form',
    },
    contactInfo: {
      heading: 'Get in Touch',
      description: 'Our engineering team is ready to discuss your precision manufacturing needs.',
      addressLine1: 'Integrated Inspection Systems, Inc.',
      addressLine2: '12345 Precision Way',
      addressLine3: 'Torrance, CA 90501',
      phone: '(503) 231-9093',
      phoneLink: 'tel:+15032319093',
      email: 'officemgr@iismet.com',
      hoursLine1: 'Monday - Friday: 7:00 AM - 5:00 PM PST',
      hoursLine2: '24/7 Production Facility',
    },
    certifications: [
      { certification: 'AS9100D' },
      { certification: 'ISO 9001:2015' },
      { certification: 'ITAR Registered' },
      { certification: 'CMMC Compliant' },
    ],
    bottomStats: [
      { iconName: 'pulse', text: 'Quote Response in 24 Hours', animated: true },
      { iconName: 'Award', text: '30+ Years | 1000+ Projects', animated: false },
      { iconName: 'Shield', text: '99.8% First-Pass Yield', animated: false },
      { iconName: 'CheckCircle', text: 'AS9100D | ITAR Certified', animated: false },
    ],
  }
  await client.createOrReplace(doc)
  console.log('✓ Seeded: contact')
}

async function main() {
  if (!client.config().projectId || !client.config().token) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN')
    process.exit(1)
  }
  await seedAbout()
  await seedCareers()
  await seedContact()
  console.log('✅ Seeding complete.')
}

main().catch((e) => {
  console.error('Seeding failed:', e?.message || e)
  process.exit(1)
})
