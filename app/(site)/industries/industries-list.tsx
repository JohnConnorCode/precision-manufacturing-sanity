'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Shield, Factory, Award, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ParallaxImage from '@/components/ui/parallax-image';
import React from 'react';

interface IndustriesListProps {
  industries: any[];
}

export function IndustriesList({ industries }: IndustriesListProps) {
  const capabilities = [
    { label: 'Industry Experience', value: '30+', description: 'Years serving critical industries' },
    { label: 'Active Programs', value: '200+', description: 'Ongoing manufacturing programs' },
    { label: 'Quality Rating', value: '99.8%', description: 'On-time delivery performance' },
    { label: 'Certifications', value: '12+', description: 'Industry-specific certifications' }
  ];

  const iconMap: Record<string, React.ReactNode> = {
    Award: <Award className="w-6 h-6 text-slate-700" />,
    Shield: <Shield className="w-6 h-6 text-slate-700" />,
    Factory: <Factory className="w-6 h-6 text-slate-700" />,
    Users: <Users className="w-6 h-6 text-slate-700" />,
  };

  const keyStrengths = [
    {
      title: 'Regulatory Compliance',
      description: 'Full compliance with industry-specific regulations and quality standards',
      icon: 'Award',
      features: [
        'AS9100D aerospace quality system',
        'ITAR registration and compliance',
        'NADCAP accredited processes',
        'ISO 9001:2015 certification'
      ]
    },
    {
      title: 'Security & Traceability',
      description: 'Comprehensive security protocols and complete material traceability',
      icon: 'Shield',
      features: [
        'Secure facility access controls',
        'Material traceability systems',
        'Document control procedures',
        'Supply chain verification'
      ]
    },
    {
      title: 'Technical Expertise',
      description: 'Deep industry knowledge and advanced manufacturing capabilities',
      icon: 'Factory',
      features: [
        'Specialized material processing',
        'Complex geometry machining',
        'Precision measurement systems',
        'Advanced quality control'
      ]
    },
    {
      title: 'Program Management',
      description: 'Dedicated support for long-term manufacturing programs',
      icon: 'Users',
      features: [
        'Dedicated program managers',
        'Capacity planning',
        'Inventory management',
        'Continuous improvement'
      ]
    }
  ];

  const successMetrics = [
    {
      metric: 'First-Pass Yield',
      value: '99.8%',
      description: 'Parts meeting specifications without rework'
    },
    {
      metric: 'On-Time Delivery',
      value: '99.5%',
      description: 'Deliveries meeting committed schedules'
    },
    {
      metric: 'Cost Reduction',
      value: '15-30%',
      description: 'Average cost savings through optimization'
    },
    {
      metric: 'Lead Time Reduction',
      value: '40%',
      description: 'Typical improvement in manufacturing cycle time'
    }
  ];

  return (
    <>
      {/* Industry Capabilities */}
      <section id="capabilities" className="py-20 bg-slate-900/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {capability.value}
                </div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  {capability.label}
                </div>
                <div className="text-sm text-slate-600">
                  {capability.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="industries" className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Core Industries</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Specialized manufacturing solutions for the most demanding industries, backed by decades of experience and industry-leading certifications.
            </p>
          </motion.div>

          <div className="space-y-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="group overflow-hidden border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl bg-white/50 backdrop-blur-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Image Section */}
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <ParallaxImage
                        src={industry.image}
                        alt={industry.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        speed={0.2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Factory className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-2 p-8">
                      <div className="flex flex-col h-full">
                        <div className="flex-grow">
                          <h3 className="text-3xl font-bold mb-4 group-hover:text-slate-700 transition-colors">
                            {industry.title}
                          </h3>
                          <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                            {industry.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-3">Applications</h4>
                              <div className="space-y-2">
                                {industry.applications.map((application: string) => (
                                  <div key={application} className="flex items-center text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                                    {application}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-slate-800 mb-3">Certifications</h4>
                              <div className="space-y-2">
                                {industry.certifications.map((cert: string) => (
                                  <div key={cert} className="flex items-center text-sm text-slate-600">
                                    <Award className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                    {cert}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-slate-800 mb-3">Proven Track Record</h4>
                              <div className="space-y-2">
                                <div className="text-sm text-slate-600">
                                  <span className="font-medium">30+ Years</span> of industry expertise
                                </div>
                                <div className="text-sm text-slate-600">
                                  <span className="font-medium">200+</span> active manufacturing programs
                                </div>
                                <div className="text-sm text-slate-600">
                                  <span className="font-medium">99.8%</span> on-time delivery
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button
                            asChild
                            variant="outline"
                            className="group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all"
                          >
                            <Link href={industry.href}>
                              Learn More About {industry.title}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Strengths */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Why Industry Leaders Choose Us</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Proven capabilities and unwavering commitment to quality make us the preferred manufacturing partner for critical applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyStrengths.map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                      {iconMap[strength.icon as keyof typeof iconMap]}
                    </div>
                    <h3 className="text-2xl font-bold">{strength.title}</h3>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {strength.description}
                  </p>

                  <div className="space-y-3">
                    {strength.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Proven Results</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Measurable performance metrics that demonstrate our commitment to excellence and continuous improvement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={metric.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="p-6 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
                  <TrendingUp className="w-8 h-8 text-slate-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {metric.value}
                  </div>
                  <div className="text-lg font-semibold text-slate-700 mb-2">
                    {metric.metric}
                  </div>
                  <div className="text-sm text-slate-600">
                    {metric.description}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
