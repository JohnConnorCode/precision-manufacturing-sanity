"use client";

import { motion } from 'framer-motion';
import {
  Shield, FileCheck, AlertCircle, Award, BookOpen, Users, Package, Clock, FileText, Lock,
  Target, Globe, CheckCircle, Wrench, Scale, Info, Phone, Mail, MapPin, DollarSign,
  Zap, Circle
} from 'lucide-react';
import { Card } from '@/components/ui/card';

// Icon mapping for CMS data
const iconMap: Record<string, any> = {
  Shield,
  FileCheck,
  AlertCircle,
  Award,
  BookOpen,
  Users,
  Package,
  Clock,
  FileText,
  Lock,
  Target,
  Globe,
  CheckCircle,
  Wrench,
  Scale,
  Info,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Zap,
  Circle,
};

// Default fallback data
const defaultData = {
  hero: {
    badges: [
      { iconName: 'Shield', text: 'QUALITY STANDARD' },
      { iconName: 'FileCheck', text: 'ISO COMPLIANT' },
      { iconName: 'Lock', text: 'ITAR CONTROLLED' }
    ],
    title: 'SUPPLIER QUALITY',
    titleHighlight: 'REQUIREMENTS',
    description: 'Comprehensive standards ensuring excellence in aerospace and precision manufacturing supply chain',
    versionStatus: 'Version 3.0 Active',
    effectiveDate: 'Effective: January 2024',
    reviewPeriod: 'Review: Annual'
  },
  sections: [
    {
      id: 'purpose',
      number: '1',
      title: 'PURPOSE',
      iconName: 'BookOpen',
      content: 'The purpose of this document is to establish a uniform process for supplier quality requirements.',
      color: 'from-blue-500/10 to-blue-600/5'
    },
    {
      id: 'scope',
      number: '2',
      title: 'SCOPE',
      iconName: 'Shield',
      content: 'This Standard Operating Procedure applies to the process of supplier quality requirements.',
      color: 'from-blue-600/10 to-blue-600/5'
    }
  ],
  requirements: [
    {
      number: '3.1',
      title: 'Supplier Responsibility',
      iconName: 'AlertCircle',
      content: 'The supplier is fully responsible for adhering to the requirements stated in this document. Acceptance of product by Integrated Inspection Systems, Inc. does not relieve the supplier of any liability concerning non-conformities or malfunctions detected after delivery.'
    },
    {
      number: '3.2',
      title: 'Non-Conformity Reporting',
      iconName: 'FileCheck',
      content: 'The supplier is required to immediately inform Integrated Inspection Systems, Inc. of any non-conformity detected during assembly, test or use of the product, and immediately upon the discovery of any non-conformity that might affect the operational safety of any previously delivered product.',
      additional: 'The acceptance of non-conforming parts is the prerogative of Integrated Inspection Systems, Inc. Non-conforming parts that do not meet requirements must be presented in writing to Integrated Inspection Systems, Inc. as a supplier request for material review action. Unless otherwise instructed, all non-conforming parts may be held by the supplier until the request has been dispositioned by Integrated Inspection Systems, Inc.'
    },
    {
      number: '3.3',
      title: 'Right to Monitor',
      iconName: 'Users',
      content: 'Integrated Inspection Systems, Inc., its customers or regulatory authorities reserve the right to monitor the manufacturing and maintenance activities and the Quality Control activities on the premises of the supplier or to have the monitoring carried out by a third party.',
      list: [
        'Access to the supplier or subcontractor\'s premises and to any documents that contribute to the manufacture, maintenance, inspection, and definition of the product.',
        'Necessary facilities are provided in order to complete the mission.'
      ]
    },
    {
      number: '3.4',
      title: 'Personnel Qualifications',
      iconName: 'Award',
      content: 'The supplier has to manage the personal qualifications to ensure that the personnel have the proper competence to perform the task to ensure the quality of the product.',
      additional: 'The supplier manages a list of all training given to personnel and these records are subject to review by Integrated Inspection Systems, Inc. Individuals performing special processes, such as welders or NDI, are qualified according to current standards and regulations.'
    },
    {
      number: '3.5',
      title: 'Quality System Requirements',
      iconName: 'Shield',
      content: 'The supplier is authorized to implement a Quality System that:',
      list: [
        'Identifies the processes needed for the quality system and their application throughout the organization and document them.',
        'Determine criteria and methods needed to ensure that the operation and control of the processes are effective, and document them in the Quality Documentation.',
        'Ensures that the product or service being provided meets all of Integrated Inspection Systems, Inc. requirements.',
        'Ensures all equipment used in the production of Integrated Inspection Systems, Inc. parts has been verified, validated, and calibrated if necessary.'
      ]
    },
    {
      number: '3.6',
      title: 'Change Notification',
      content: 'The supplier shall notify Integrated Inspection Systems, Inc. of any changes in product and/or process, changes of suppliers, changes of manufacturing facility location, and where required, obtain organization approval when applicable.'
    },
    {
      number: '3.7',
      title: 'Supply Chain Requirements',
      content: 'The supplier shall flow down to the supply chain the applicable requirements including customer requirements when applicable.'
    },
    {
      number: '3.8',
      title: 'Record Retention',
      iconName: 'Clock',
      content: 'The supplier shall retain all Integrated Inspection Systems, Inc. records for a minimum of 10 years when applicable.'
    },
    {
      number: '3.9',
      title: 'Test Specimens',
      content: 'When applicable, the supplier may be asked to supply test specimens for design approval, inspection/verification, investigation, or auditing.'
    },
    {
      number: '3.10',
      title: 'Technical Documentation',
      iconName: 'FileText',
      content: 'When applicable, the supplier may be asked to supply design, test, inspection, verification, use of statistical techniques for product acceptance, and related instructions for acceptance by Integrated Inspection Systems, Inc., and as applicable critical items including key characteristics.'
    },
    {
      number: '3.11',
      title: 'Certificate of Compliance',
      content: 'With each shipment against this purchase order, the supplier may provide a Certificate of Compliance when applicable.'
    },
    {
      number: '3.12',
      title: 'Packaging Requirements',
      iconName: 'Package',
      content: 'Parts supplied on this order shall be protectively packaged to prevent damage. Each container shall be identified with the part number, and serial numbers, if applicable, of the item enclosed when applicable.'
    },
    {
      number: '3.13',
      title: 'First Article Evaluation',
      content: 'A first article evaluation is required if one of the following occurs:',
      list: [
        'A new item or process is being produced (first production run).',
        'Changes in design effecting form, fit, or function.',
        'Changes in manufacturing source(s) processes, inspection methods, location, tooling, or materials with the potential of effecting form, fit, or function.',
        'A lapse in production for two (2) years or as specified.',
        'When required as part of a corrective action for a part with repetitive rejection history.'
      ]
    },
    {
      number: '3.14',
      title: 'Calibration Requirements',
      content: 'All tools/equipment sent for calibration must have a report that includes the following upon return to Integrated Inspection Systems, Inc.:',
      list: [
        '"As Found" measurements noted upon receipt',
        'Any adjustments made.',
        '"As Left" measurements upon completion.',
        'Certificate of Calibration that is traceable to N.I.S.T.',
        'Supplier must maintain a calibration system in compliance with ANSI Z540 or equivalent when applicable.'
      ]
    },
    {
      number: '3.15',
      title: 'Test Data',
      content: 'Test data shall be supplied if noted on the purchase order.'
    },
    {
      number: '3.16',
      title: 'ITAR Compliance',
      iconName: 'Lock',
      content: 'When the Integrated Inspection Systems, Inc. purchase order identifies ITAR\'s compliance and that the information contained may be subject to International Traffic Arms Regulations (ITAR) or Export Administration Regulations (EAR) controls and may not be disclosed to any foreign person(s) or firm, including persons employed by or associated with your firm, without first complying with all requirements of the ITAR, 22 CFR 120-130 and the EAR, 15 CFR 730-774.',
      additional: 'By this notification, the supplier has been so advised of its compliance obligations under ITAR.'
    },
    {
      number: '3.17',
      title: 'Counterfeit Work/Parts',
      iconName: 'AlertCircle',
      content: '',
      list: [
        'Supplier agrees and shall ensure that Counterfeit Work and/or Parts are not delivered to Integrated Inspection Systems, Inc.',
        'Supplier shall only purchase products to be delivered or incorporated as work to Integrated Inspection Systems, Inc. directly from the Original Component Manufacturer (OCM)/Original Equipment Manufacturer (OEM) or through an OCM/OEM authorized distributor chain. Work shall not be acquired from independent distributors or brokers unless approved in advance in writing by Integrated Inspection Systems, Inc.',
        'Supplier shall immediately notify Integrated Inspection Systems, Inc. with the pertinent facts if the supplier becomes aware or suspects that it has furnished Counterfeit Work.',
        'When requested, the supplier shall provide OCM/OEM documentation that authenticates traceability of the affected items to the applicable OCM/OEM.'
      ]
    }
  ],
  additionalSections: [
    {
      number: '4',
      title: 'Record Retention',
      iconName: 'Clock',
      content: 'Suppliers with direct impact on product quality (i.e. calibration labs) must keep records on file for at least five (5) years for each product service when applicable.'
    },
    {
      number: '5',
      title: 'Supplier Contributions to Quality',
      iconName: 'Award',
      list: [
        'Supplier\'s Contribution to products or service conformity.',
        'Supplier\'s Contribution to Product Safety',
        'Supplier\'s Awareness of the importance of Ethical Behavior.'
      ]
    }
  ],
  footerNote: {
    iconName: 'Shield',
    heading: 'Compliance Commitment',
    content: 'By accepting purchase orders from Integrated Inspection Systems, Inc., suppliers acknowledge and agree to comply with all requirements stated in this document. Continuous improvement and commitment to quality excellence are fundamental expectations of our supply chain partners.'
  }
};

interface SupplierRequirementsPageClientProps {
  data?: typeof defaultData | null;
}

export default function SupplierRequirementsPageClient({ data }: SupplierRequirementsPageClientProps) {
  // Merge CMS data with defaults to ensure all required fields exist
  const pageData = data ? {
    hero: {
      badges: data.hero?.badges || defaultData.hero.badges,
      title: data.hero?.title || defaultData.hero.title,
      titleHighlight: data.hero?.titleHighlight || defaultData.hero.titleHighlight,
      description: data.hero?.description || defaultData.hero.description,
      versionStatus: data.hero?.versionStatus || defaultData.hero.versionStatus,
      effectiveDate: data.hero?.effectiveDate || defaultData.hero.effectiveDate,
      reviewPeriod: data.hero?.reviewPeriod || defaultData.hero.reviewPeriod,
    },
    sections: data.sections || defaultData.sections,
    requirements: data.requirements || defaultData.requirements,
    additionalSections: data.additionalSections || defaultData.additionalSections,
    footerNote: data.footerNote || defaultData.footerNote,
  } : defaultData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent-cyan/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-accent-cyan/20">
        <div className="absolute inset-0 bg-grid opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="container relative py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {pageData.hero.badges.map((badge, idx) => {
                const BadgeIcon = iconMap[badge.iconName];
                return (
                  <span key={idx} className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-accent-cyan/20 to-accent-electric/20 text-accent-cyan border border-accent-cyan/30">
                    {BadgeIcon && <BadgeIcon className="w-3 h-3 mr-2" />}
                    {badge.text}
                  </span>
                );
              })}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.9]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                {pageData.hero.title}
              </span>
              <span className="block text-accent-cyan mt-2">
                {pageData.hero.titleHighlight}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-8"
            >
              {pageData.hero.description}
            </motion.p>

            {/* Version Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {pageData.hero.versionStatus}
              </span>
              <span>{pageData.hero.effectiveDate}</span>
              <span>{pageData.hero.reviewPeriod}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto space-y-12"
        >
          {/* Purpose and Scope */}
          <div className="grid md:grid-cols-2 gap-6">
            {pageData.sections.map((section) => {
              const SectionIcon = iconMap[section.iconName];
              return (
                <motion.div key={section.id} variants={itemVariants}>
                  <Card className={`p-8 h-full border-2 border-accent-cyan/10 bg-gradient-to-br ${section.color} hover:border-accent-cyan/30 transition-all duration-300`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                        {SectionIcon && <SectionIcon className="w-6 h-6 text-accent-cyan" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl font-black text-accent-cyan">{section.number}</span>
                          <h2 className="text-2xl font-bold">{section.title}</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Requirements Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-electric/10 flex items-center justify-center">
                <FileText className="w-8 h-8 text-accent-cyan" />
              </div>
              <div>
                <h2 className="text-3xl font-black">SUPPLIER QUALITY REQUIREMENTS</h2>
                <p className="text-muted-foreground">Section 3 - Detailed Requirements</p>
              </div>
            </div>
          </motion.div>

          {/* Requirements Cards */}
          <div className="space-y-6">
            {pageData.requirements.map((req, index) => {
              const ReqIcon = req.iconName ? iconMap[req.iconName] : null;
              return (
                <motion.div
                  key={req.number}
                  variants={itemVariants}
                  custom={index}
                >
                  <Card className="p-6 border-l-4 border-l-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/10 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {ReqIcon && (
                        <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <ReqIcon className="w-5 h-5 text-accent-cyan" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl font-bold text-accent-cyan">{req.number}</span>
                          {req.title && <h3 className="text-xl font-bold">{req.title}</h3>}
                        </div>
                        {req.content && (
                          <p className="text-muted-foreground mb-4 leading-relaxed">{req.content}</p>
                        )}
                        {req.additional && (
                          <p className="text-muted-foreground mb-4 leading-relaxed bg-muted/50 p-4 rounded-lg">
                            {req.additional}
                          </p>
                        )}
                        {req.list && (
                          <ul className="space-y-2">
                            {req.list.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground">{typeof item === 'string' ? item : (item as any).item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Sections */}
          <div className="space-y-6">
            {pageData.additionalSections.map((section, index) => {
              const AddSectionIcon = iconMap[section.iconName];
              return (
                <motion.div
                  key={section.number}
                  variants={itemVariants}
                  custom={pageData.requirements.length + index}
                >
                  <Card className="p-8 bg-gradient-to-br from-accent-cyan/5 to-accent-electric/5 border-2 border-accent-cyan/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center flex-shrink-0">
                        {AddSectionIcon && <AddSectionIcon className="w-6 h-6 text-accent-cyan" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-black text-accent-cyan">{section.number}</span>
                          <h2 className="text-2xl font-bold">{section.title}</h2>
                        </div>
                        {section.content && (
                          <p className="text-muted-foreground mb-4 leading-relaxed">{section.content}</p>
                        )}
                        {section.list && (
                          <ul className="space-y-2">
                            {section.list.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground">{typeof item === 'string' ? item : (item as any).item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Note */}
          <motion.div
            variants={itemVariants}
            className="mt-16 p-8 bg-gradient-to-r from-accent-cyan/10 to-accent-electric/10 rounded-xl border border-accent-cyan/20"
          >
            <div className="flex items-center gap-4 mb-4">
              {(() => {
                const FooterIcon = iconMap[pageData.footerNote.iconName];
                return FooterIcon ? <FooterIcon className="w-8 h-8 text-accent-cyan" /> : null;
              })()}
              <h3 className="text-2xl font-bold">{pageData.footerNote.heading}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {pageData.footerNote.content}
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}