"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Cog, Cpu, Gauge, Users, ArrowRight, CheckCircle, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/animated-section';
import { typography, spacing, colors, borderRadius } from '@/lib/design-system';

// Icon mapping for CMS data
const iconMap: Record<string, LucideIcon> = {
  'Cog': Cog,
  'Cpu': Cpu,
  'Gauge': Gauge,
  'Users': Users,
};

const services = [
  {
    title: '5-Axis CNC Machining',
    description: 'Complex geometries with unmatched precision for aerospace components',
    icon: Cog,
    href: '/services/5-axis-machining',
    specs: ['±0.0001" tolerance', 'Titanium & super alloys', 'Up to 60" parts'],
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=90',
    highlight: true
  },
  {
    title: 'Adaptive Machining',
    description: 'Real-time adjustments based on in-process measurements',
    icon: Cpu,
    href: '/services/adaptive-machining',
    specs: ['In-process verification', 'Automated compensation', 'Zero defect goal'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90'
  },
  {
    title: 'Metrology & Inspection',
    description: 'Complete dimensional verification with CMM and laser scanning',
    icon: Gauge,
    href: '/services/metrology',
    specs: ['0.00005" accuracy', 'GD&T analysis', 'AS9102 certified'],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=90'
  },
  {
    title: 'Engineering Support',
    description: 'Design optimization and manufacturing consultation',
    icon: Users,
    href: '/services/engineering',
    specs: ['DFM analysis', 'Process planning', 'Cost optimization'],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=90'
  },
];

interface ServicesProps {
  data?: any;
  sectionData?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    subdescription?: string;
  };
}

export default function Services({ data, sectionData }: ServicesProps) {
  // Use CMS data if available, otherwise use hardcoded data
  const servicesData = Array.isArray(data) ? data : (data ? [data] : services);

  // Use section data from CMS or fallback to hardcoded
  const eyebrow = sectionData?.eyebrow || 'COMPREHENSIVE MANUFACTURING SOLUTIONS';
  const heading = sectionData?.heading || 'PRECISION SERVICES';
  const description = sectionData?.description || 'Four core service pillars delivering unmatched precision and reliability for aerospace and defense applications';

  return (
    <section className={`relative ${spacing.section} overflow-hidden ${colors.bgLight}`}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className={`${spacing.containerWide} relative z-10`}>
        <AnimatedSection className={`text-center ${spacing.headingBottom}`}>
          {/* Section Context */}
          <p className={`${typography.eyebrow} ${colors.textMedium} mb-4`}>
            {eyebrow}
          </p>

          <h2 className={`${typography.sectionHeading} mb-6`}>
            {heading}
          </h2>

          <p className={`${typography.descriptionMuted} max-w-3xl mx-auto`}>
            {description}
          </p>
        </AnimatedSection>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${spacing.grid}`}>
          {servicesData.map((service: any, index: number) => {
            // Handle both CMS data (iconName) and hardcoded data (icon)
            const Icon = service.iconName ? (iconMap[service.iconName] || Cog) : (service.icon || Cog);
            return (
              <AnimatedSection
                key={service.title}
                delay={index * 0.1}
                className="group perspective-1000"
              >
                <Link href={service.href} className="block h-full">
                  <motion.div
                    whileHover={{
                      y: -8,
                      rotateX: 5,
                      rotateY: 5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-slate-200 bg-white relative ${
                      service.highlight ? 'ring-2 ring-blue-600/20' : ''
                    }`}>
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Floating Icon with Premium Effect */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-600/50 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>

                      {service.highlight && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-800 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2 mb-5">
                        {(service.specs || []).map((spec: any, index: number) => {
                          // Handle both string and object formats
                          const specText = typeof spec === 'string' ? spec : spec.spec;
                          return (
                            <li key={index} className="flex items-start text-xs text-slate-800">
                              <CheckCircle className="h-3 w-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{specText}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-indigo-600 transition-colors duration-300">
                        <span>Learn More</span>
                        <div className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Card>
                  </motion.div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Call to Action */}
        <AnimatedSection className="text-center mt-16 md:mt-20" delay={0.5}>
          <Link
            href="/contact"
            className={`inline-flex items-center h-12 px-8 bg-gradient-to-r ${colors.primaryGradient} hover:${colors.primaryGradientHover} text-white font-semibold ${borderRadius.button} transition-all duration-300 shadow-lg hover:shadow-xl`}
          >
            Get Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}