'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import HeroSection from '@/components/ui/hero-section';
import { ArrowRight, Users, Factory, Award, CheckCircle, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import { theme, styles } from '@/lib/theme';

// Icon mapping for values section
const iconMap: Record<string, any> = {
  Award,
  Zap,
  Target,
  Users,
  Factory,
};

// Default fallback data
const defaultData = {
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80',
    imageAlt: 'Precision manufacturing facility - 30 years of excellence',
    badge: 'PRECISION MANUFACTURING SINCE 1995',
    badgeIconName: 'Factory',
    title: 'About',
    titleHighlight: 'Our Company',
    description: 'From basement startup to industry leader. Three decades of precision manufacturing excellence serving aerospace, defense, and advanced industries with ISO 9001, AS9100, and ITAR certification.',
    buttons: [
      { label: 'Our Capabilities', href: '#capabilities', variant: 'primary' },
      { label: 'Contact Our Team', href: '/contact', variant: 'secondary' }
    ]
  },
  companyStats: [
    { label: 'Years in Business', value: '30+', description: 'Decades of experience' },
    { label: 'Team Members', value: '150+', description: 'Skilled professionals' },
    { label: 'Annual Revenue', value: '$25M+', description: 'Consistent growth' },
    { label: 'Facility Size', value: '45,000', description: 'Square feet' }
  ],
  story: {
    title: 'Our Story',
    paragraph1: 'Integrated Inspection Systems was founded in 1995, starting in a residential basement with a desk, computer, and a pair of calipers. Our founders came from Precision Castparts Inc, bringing aerospace expertise and a commitment to quality. From 1995-1996, we established cash flow through small business networking while developing a comprehensive quality manual. We then leased our first Zeiss CMM from Hanard Machine in Salem, Oregon, and began serving the plastics industry with a focus on precision metrology.',
    paragraph2: 'Our breakthrough came when we applied aerospace GD&T principles to high-volume metrology, a capability few suppliers could match. This led us to purchase our own Zeiss CMM in late 1998 and move to Beaverton, Oregon. We developed proprietary software, MetBase, which revolutionized our ability to integrate CMM data, CNC machines, and vision systems into a closed-loop manufacturing system. By 2001, we had developed a 3-sigma machining system and relocated to our current 20,000 square foot facility in Clackamas, Oregon.',
    paragraph3: 'Today, we\'re an ISO 9001 and AS9100 certified, ITAR-registered provider of engineering, metrology, machining, and database services. Our 3-sigma manufacturing system and proprietary MetBase software enable us to deliver industry-leading precision components for aerospace, defense, and advanced industries.',
    image: '/about IIS.jpg',
    imageAlt: 'IIS manufacturing facility in Clackamas, Oregon - 20,000 square feet with advanced machining and metrology equipment'
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
      { year: 'Present', title: 'Industry Leader', description: 'ISO 9001 and AS9100 certified, ITAR registered provider of engineering, metrology, machining, and database services for aerospace and defense.' }
    ]
  },
  values: {
    title: 'Our Values',
    description: 'The principles that guide our decisions, shape our culture, and drive our commitment to excellence.',
    items: [
      {
        title: 'Quality Excellence',
        description: 'Unwavering commitment to delivering components that exceed specifications and customer expectations.',
        iconName: 'Award',
        principles: [
          { principle: 'Zero-defect manufacturing mindset' },
          { principle: 'Continual improvement culture' },
          { principle: 'Customer satisfaction focus' },
          { principle: 'Industry-leading standards' }
        ]
      },
      {
        title: 'Innovation Leadership',
        description: 'Pioneering advanced manufacturing technologies and processes to stay ahead of industry demands.',
        iconName: 'Zap',
        principles: [
          { principle: 'Technology investment' },
          { principle: 'Process optimization' },
          { principle: 'Research & development' },
          { principle: 'Future-ready solutions' }
        ]
      },
      {
        title: 'Reliability & Trust',
        description: 'Building long-term partnerships through consistent performance and transparent communication.',
        iconName: 'Target',
        principles: [
          { principle: 'On-time delivery commitment' },
          { principle: 'Transparent communication' },
          { principle: 'Long-term partnerships' },
          { principle: 'Dependable performance' }
        ]
      },
      {
        title: 'Team Excellence',
        description: 'Investing in our people through training, development, and creating a culture of excellence.',
        iconName: 'Users',
        principles: [
          { principle: 'Skilled workforce development' },
          { principle: 'Safety-first culture' },
          { principle: 'Continual training' },
          { principle: 'Team collaboration' }
        ]
      }
    ]
  },
  leadership: {
    title: 'Leadership Team',
    description: 'Experienced leaders driving innovation, quality, and growth across all aspects of our business.',
    team: [
      { name: 'John Anderson', title: 'Chief Executive Officer', experience: '25+ years', background: 'Former aerospace engineer with extensive manufacturing leadership experience', focus: 'Strategic vision and operational excellence' },
      { name: 'Sarah Mitchell', title: 'Chief Operating Officer', experience: '20+ years', background: 'Manufacturing operations expert with lean manufacturing expertise', focus: 'Production efficiency and quality systems' },
      { name: 'David Chen', title: 'Chief Technology Officer', experience: '18+ years', background: 'Advanced manufacturing technology and automation specialist', focus: 'Technology innovation and process optimization' },
      { name: 'Maria Rodriguez', title: 'Quality Director', experience: '22+ years', background: 'Quality management systems and aerospace certification expert', focus: 'Quality assurance and regulatory compliance' }
    ]
  },
  capabilities: {
    title: 'Core Capabilities',
    categories: [
      { category: 'Manufacturing', items: [{ item: '5-axis CNC machining' }, { item: 'Adaptive manufacturing' }, { item: 'Precision metrology' }, { item: 'Surface treatments' }] },
      { category: 'Engineering', items: [{ item: 'First article inspection' }, { item: 'Process planning' }, { item: 'CAD/CAM programming' }, { item: 'Process development' }] },
      { category: 'Quality', items: [{ item: 'First article inspection' }, { item: 'Statistical process control' }, { item: 'Material traceability' }, { item: 'Certification support' }] },
      { category: 'Industries', items: [{ item: 'Aerospace systems' }, { item: 'Defense platforms' }, { item: 'Energy infrastructure' }, { item: 'Medical devices' }] }
    ]
  },
  certifications: {
    title: 'Certifications & Standards',
    items: [
      { certification: 'AS9100D Aerospace Quality Management' },
      { certification: 'ISO 9001:2015 Quality Management' },
      { certification: 'ITAR International Traffic in Arms' },
      { certification: 'CMMC Cybersecurity Maturity Model Certification' },
      { certification: 'OSHA Safety Management System' }
    ],
    commitmentTitle: 'Commitment to Excellence',
    commitmentDescription: 'Our certifications represent more than compliance—they reflect our unwavering commitment to quality, safety, and continual improvement in everything we do.'
  },
  cta: {
    title: 'Partner with Us',
    description: 'Experience the difference that three decades of precision manufacturing excellence can make for your critical components.',
    buttons: [
      { label: 'Start Your Project', href: '/contact', variant: 'primary' },
      { label: 'Explore Our Services', href: '/services', variant: 'secondary' }
    ]
  }
};

interface AboutPageClientProps {
  data?: typeof defaultData | null;
}

export default function AboutPageClient({ data }: AboutPageClientProps) {
  // Use CMS data if available, otherwise fall back to defaults
  const aboutData = data || defaultData;

  // Get the badge icon
  const BadgeIcon = iconMap[aboutData?.hero?.badgeIconName || ''] || Factory;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        backgroundImage={aboutData?.hero?.backgroundImage}
        imageAlt={aboutData?.hero?.imageAlt}
        badge={{
          text: aboutData?.hero?.badge || '',
          icon: BadgeIcon
        }}
        title={
          <span className="text-white">
            {aboutData?.hero?.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">{aboutData?.hero?.titleHighlight}</span>
          </span>
        }
        description={aboutData?.hero?.description}
        buttons={(aboutData?.hero?.buttons || []).map(btn => ({
          label: btn?.label || '',
          href: btn?.href || '#',
          variant: (btn?.variant as 'primary' | 'secondary') || 'primary'
        }))}
        height="large"
        alignment="center"
      />

      {/* Company Stats */}
      <section id="stats" className={`${styles.sectionLight} bg-slate-900/5`}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {(aboutData?.companyStats || []).map((stat, index) => (
              <motion.div
                key={stat?.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {stat?.value}
                </div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  {stat?.label}
                </div>
                <div className="text-sm text-slate-600">
                  {stat?.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">{aboutData?.story?.title}</h2>
              <div className="space-y-4 text-lg text-slate-600">
                <p>{aboutData?.story?.paragraph1}</p>
                <p>{aboutData?.story?.paragraph2}</p>
                <p>{aboutData?.story?.paragraph3}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ParallaxImage
                src={aboutData?.story?.image || ''}
                alt={aboutData?.story?.imageAlt || ''}
                className="w-full h-96 rounded-lg"
                speed={0.2}
              />
            </motion.div>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">{aboutData?.timeline?.title}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {aboutData?.timeline?.description}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-300 h-full"></div>
            <div className="space-y-12">
              {(aboutData?.timeline?.milestones || []).map((item, index) => (
                <motion.div
                  key={item?.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="p-6 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                      <div className="text-2xl font-bold text-slate-900 mb-2">{item?.year}</div>
                      <h3 className="text-xl font-semibold mb-3">{item?.title}</h3>
                      <p className="text-slate-600">{item?.description}</p>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-slate-900 rounded-full border-4 border-white shadow-lg relative z-10"></div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">{aboutData?.values?.title}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {aboutData?.values?.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(aboutData?.values?.items || []).map((value, index) => {
              const Icon = iconMap[value?.iconName || ''] || Award;
              return (
                <motion.div
                  key={value?.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-slate-700" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{value?.title}</h3>
                    <p className="text-slate-600 mb-6">{value?.description}</p>

                    <div className="space-y-3">
                      {(value?.principles || []).map((p) => (
                        <div key={p?.principle} className="flex items-center text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {p?.principle}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">{aboutData?.leadership?.title}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {aboutData?.leadership?.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(aboutData?.leadership?.team || []).map((leader, index) => (
              <motion.div
                key={leader?.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{leader?.name}</h3>
                    <div className="text-lg font-semibold text-slate-700 mb-1">{leader?.title}</div>
                    <div className="text-sm text-slate-500">{leader?.experience}</div>
                  </div>

                  <p className="text-slate-600 mb-4">{leader?.background}</p>

                  <div className="border-l-4 border-slate-300 pl-4">
                    <div className="text-sm font-semibold text-slate-800 mb-1">Focus Area</div>
                    <div className="text-sm text-slate-600">{leader?.focus}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities & Certifications */}
      <section id="capabilities" className={styles.sectionLight}>
        <div className={theme.spacing.container}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">{aboutData?.capabilities?.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(aboutData?.capabilities?.categories || []).map((capability, index) => (
                  <motion.div
                    key={capability?.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                      <h3 className="text-lg font-bold mb-4">{capability?.category}</h3>
                      <div className="space-y-2">
                        {(capability?.items || []).map((i) => (
                          <div key={i?.item} className="flex items-center text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                            {i?.item}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">{aboutData?.certifications?.title}</h2>
              <div className="space-y-4">
                {(aboutData?.certifications?.items || []).map((cert, index) => (
                  <motion.div
                    key={cert?.certification}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <Award className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                    <span className="font-medium text-slate-700">{cert?.certification}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg border border-slate-200">
                <h3 className="text-xl font-bold mb-4">{aboutData?.certifications?.commitmentTitle}</h3>
                <p className="text-slate-600">
                  {aboutData?.certifications?.commitmentDescription}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={theme.spacing.section}>
        <div className={theme.spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{aboutData?.cta?.title}</h2>
            <p className="text-xl text-slate-600 mb-8">
              {aboutData?.cta?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(aboutData?.cta?.buttons || []).map((button, index) => {
                if (index === 0 && button?.variant === 'primary') {
                  return (
                    <Button key={button?.label} size="lg" className="px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold">
                      {button?.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  );
                }
                return (
                  <Button key={button?.label} size="lg" variant="outline" asChild className="px-8 py-6 font-semibold">
                    <Link href={button?.href || '#'}>{button?.label}</Link>
                  </Button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
