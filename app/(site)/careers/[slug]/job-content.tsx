'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { typography, spacing, styles, cn } from '@/lib/design-system';
import {
  Mail,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle,
  FileText,
  Calendar,
  Award,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

interface JobContentProps {
  job: any;
  siteSettings: any;
}

export default function JobContent({ job, siteSettings }: JobContentProps) {
  const formattedDate = job.datePosted
    ? new Date(job.datePosted).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-20">
        <div className={spacing.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                {job.department}
              </span>
              <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-medium">
                {job.employmentType}
              </span>
            </div>

            <h1 className={cn(typography.h1, 'text-white mb-6')}>{job.title}</h1>

            <div className="flex flex-wrap gap-6 text-slate-400">
              {job.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
              )}
              {job.salaryRange && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>{job.salaryRange}</span>
                </div>
              )}
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Posted {formattedDate}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.sectionLight}>
        <div className={spacing.container}>
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              {job.overview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className={cn(typography.h3, 'mb-4')}>Overview</h2>
                  <div className={cn(typography.body, 'text-slate-600 leading-relaxed prose prose-slate max-w-none')}>
                    <PortableText
                      value={job.overview}
                      components={{
                        block: {
                          normal: ({children}) => <p className="mb-4">{children}</p>,
                          h3: ({children}) => <h3 className="text-xl font-semibold mb-3 mt-6">{children}</h3>,
                        },
                        list: {
                          bullet: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                          number: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                        },
                        marks: {
                          strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                          em: ({children}) => <em className="italic">{children}</em>,
                          link: ({value, children}) => (
                            <a href={value?.href} className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">
                              {children}
                            </a>
                          ),
                        },
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className={cn(typography.h3, 'mb-6')}>Key Responsibilities</h2>
                  <div className="space-y-4">
                    {job.responsibilities.map((item: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className={cn(typography.body, 'text-slate-700')}>
                          {item.responsibility || item}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Required Qualifications */}
              {job.qualifications && job.qualifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'p-8 border-l-4 border-blue-600')}>
                    <h2 className={cn(typography.h3, 'mb-6')}>Required Qualifications</h2>
                    <div className="space-y-3">
                      {job.qualifications.map((item: any, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className={cn(typography.body, 'text-slate-700')}>
                            {item.qualification || item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Preferred Qualifications */}
              {job.preferredQualifications && job.preferredQualifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h2 className={cn(typography.h3, 'mb-6')}>Preferred Qualifications</h2>
                  <div className="space-y-3">
                    {job.preferredQualifications.map((item: any, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                        <p className={cn(typography.body, 'text-slate-600')}>
                          {item.qualification || item}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h2 className={cn(typography.h3, 'mb-6')}>Benefits & Perks</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {job.benefits.map((item: any, index: number) => (
                      <Card key={index} className={cn(styles.featureCard, 'p-6')}>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <p className={cn(typography.body, 'font-medium text-slate-800')}>
                            {item.benefit || item}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Apply Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'p-8 text-center')}>
                    <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className={cn(typography.h4, 'mb-4')}>Apply for this Position</h3>
                    <p className={cn(typography.small, 'text-slate-600 mb-6')}>
                      Send your resume and cover letter to:
                    </p>

                    <a
                      href={`mailto:${job.applicationEmail || siteSettings?.hrEmail}?subject=Application for ${job.title}`}
                      className="w-full"
                    >
                      <Button className={cn(styles.ctaPrimary, 'w-full group')}>
                        <Mail className="w-4 h-4 mr-2" />
                        Apply via Email
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </a>

                    <p className={cn(typography.small, 'text-slate-500 mt-4')}>
                      {job.applicationEmail || siteSettings?.hrEmail}
                    </p>

                    {job.applicationInstructions && (
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        <h4 className={cn(typography.label, 'mb-3 text-left')}>
                          Application Instructions
                        </h4>
                        <p className={cn(typography.small, 'text-slate-600 text-left')}>
                          {job.applicationInstructions}
                        </p>
                      </div>
                    )}
                  </Card>
                </motion.div>

                {/* Job Details */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'p-6')}>
                    <h3 className={cn(typography.h5, 'mb-4')}>Job Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className={cn(typography.small, 'text-slate-500 mb-1')}>
                            Department
                          </p>
                          <p className={cn(typography.body, 'font-medium')}>
                            {job.department}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className={cn(typography.small, 'text-slate-500 mb-1')}>
                            Employment Type
                          </p>
                          <p className={cn(typography.body, 'font-medium')}>
                            {job.employmentType}
                          </p>
                        </div>
                      </div>

                      {job.location && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className={cn(typography.small, 'text-slate-500 mb-1')}>
                              Location
                            </p>
                            <p className={cn(typography.body, 'font-medium')}>
                              {job.location}
                            </p>
                          </div>
                        </div>
                      )}

                      {job.salaryRange && (
                        <div className="flex items-start gap-3">
                          <DollarSign className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className={cn(typography.small, 'text-slate-500 mb-1')}>
                              Salary Range
                            </p>
                            <p className={cn(typography.body, 'font-medium')}>
                              {job.salaryRange}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>

                {/* More Opportunities */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className={cn(styles.featureCard, 'p-6 bg-slate-50')}>
                    <FileText className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className={cn(typography.h5, 'mb-3')}>Browse More Positions</h3>
                    <p className={cn(typography.small, 'text-slate-600 mb-4')}>
                      Explore other career opportunities at IIS
                    </p>
                    <Link href="/careers">
                      <Button variant="outline" className="w-full">
                        View All Openings
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
