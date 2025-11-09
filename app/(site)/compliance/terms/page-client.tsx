"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  FileText, Shield, DollarSign, Package, AlertCircle,
  CheckCircle, Clock, Lock, Globe, Scale,
  Zap, Info, Phone, Mail, MapPin,
  Wrench, Award, BookOpen, Users
} from 'lucide-react';

// Icon mapping
const iconMap: Record<string, any> = {
  FileText,
  Shield,
  DollarSign,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  Lock,
  Globe,
  Scale,
  Zap,
  Info,
  Phone,
  Mail,
  MapPin,
  Wrench,
  Award,
  BookOpen,
  Users,
};

// Default fallback data
const defaultTermsData = {
  header: {
    title: 'TERMS & CONDITIONS',
    subtitle: 'Purchase Order Terms and Conditions',
    effectiveDate: 'January 2024',
    version: 'Version 3.0'
  },
  sections: [
    {
      icon: FileText,
      title: "ACCEPTANCE OF PURCHASE ORDER",
      content: "This document is an offer by the Buyer to the Seller for the purchase of goods and/or services herein and supersedes all negotiations, representations or proposals. These terms and conditions shall become a binding contract (the 'Purchase Order') upon the Seller's (1) written acknowledgement; (2) shipment of the products; or (3) performance of the services. Acceptance is limited to the terms and conditions herein. Any terms proposed in the Seller's acceptance of the purchase order that add to, vary from, or conflict with the terms herein are hereby objected to. Any such proposed terms shall not become a part of this Purchase Order. Seller's failure to object to any of Buyer's terms and conditions shall not constitute a waiver or modification of these terms and conditions."
    },
    {
      icon: DollarSign,
      title: "PRICE",
      content: "The pricing for the products are as noted in the Purchase Order. Unless otherwise specified in the Purchase Order, the price includes all packaging, shipping costs to the Buyer's place of destination, insurance, customs duties, fees and applicable taxes, including, but not limited to, all sales, use or excise taxes. No increase in the price may be made without the prior written consent of the Buyer."
    },
    {
      icon: Package,
      title: "SHIPPING / DELIVERY",
      content: "Time is of the essence for this Purchase Order. Any anticipated delays in shipment/delivery must be immediately communicated to the Buyer so as to avoid any damages associated with late delivery. All goods shall be received by the Buyer subject to the Buyer's right of inspection and rejection. Defective or non-conforming goods or goods not in accordance with the Buyer's specifications will be held for the Seller's instructions at the Seller's risk. Return to the Seller shall be made at the Seller's expense."
    },
    {
      icon: Clock,
      title: "PAYMENT TERMS",
      content: "Payment terms shall be defined as 'Net 30 days' (30 days after receipt of an undisputed invoice). No change to payment terms shall be made without prior written approval of the Buyer."
    },
    {
      icon: Shield,
      title: "WARRANTY",
      content: "Seller warrants that products manufactured pursuant to this Purchase Order: (1) Will be free from defects in material, workmanship and design for a period of at least one year from the date of delivery, (2) Will conform to applicable specifications, drawings, samples or other descriptions (3) Be fit for use for the particular purpose described in this Purchase Order. These warranties shall survive inspection, test and acceptance of the products."
    },
    {
      icon: AlertCircle,
      title: "BUYER'S PROPERTY",
      content: "Seller will not, without prior written consent, (i) disclose to any person outside its employ, or use, except for the Buyer's benefit, any data or technical information received from the Buyer under this Purchase Order, and (ii) will not disclose to any third person outside its employ (with exception of its subcontractors' use for fabrication and/or assembly to this Purchase Order provided the subcontractors agree to conditions consistent with this Purchase Order) any non-public information pertaining to the business of the Buyer except as required by law. Unless otherwise agreed, all information disclosed by the Buyer to the Seller in connection with this Purchase Order shall be deemed proprietary and confidential."
    },
    {
      icon: CheckCircle,
      title: "QUALITY",
      content: "Seller shall provide and maintain a quality system acceptable to the Buyer and compliant with (1) AS9100 latest revision, (2) ISO 9001 latest revision and (3) AS9102 latest revision (for first article requirements). Records of all inspection work by the Seller shall be kept complete and available to the Buyer for three (3) years after delivery of the product."
    },
    {
      icon: Globe,
      title: "SOURCE INSPECTION",
      content: "The Buyer's customer, regulatory authorities and the Buyer, reserve the right, upon reasonable notice, to inspect at the source, all products, materials, and pertinent quality records applicable to work performed under this Purchase Order."
    },
    {
      icon: Lock,
      title: "DPAS/DX RATING",
      content: "Any priority rating identified on this Purchase Order is certified for national defense use and the Seller is required to follow all the provisions of the Defense Priorities and Allocations System Regulation (15 CFR Part 700)."
    },
    {
      icon: Wrench,
      title: "TOOLING",
      content: "The Buyer agrees to pay the agreed upon charges for special tooling, gauges, dies, patterns, jigs and fixtures (collectively 'tooling') required to produce the items to be supplied under this order. All tooling shall be and remain the property of the Buyer."
    },
    {
      icon: Award,
      title: "CERTIFICATES",
      content: "For products manufactured and/or distributed by Seller (or its subsidiaries) the Certificate of Compliance shall be made on Seller's letterhead and state the Purchase Order number, item number, revision level, part description and quantity. For parts distributed by Seller which are manufactured by other than Seller (or its subsidiaries) the Certificate of Compliance shall state, in addition, the actual manufacturer's name and part number and lot or date code."
    },
    {
      icon: BookOpen,
      title: "TERMS FLOW DOWN",
      content: "Seller agrees to incorporate this Purchase Order, including these Terms and Conditions (and, in particular, all provisions related to export control restrictions), in all of its subcontracts or other agreements with its subcontractors and suppliers providing products or services for this Purchase Order."
    },
    {
      icon: Scale,
      title: "INDEMNITY",
      content: "Seller will indemnify, defend and hold harmless Buyer, its directors, officers, employees, agents, customers and users of its products ('Indemnitees') from all claims, loss, damage, fines, penalties, liability and expense incurred by Indemnitees arising out of any breach or alleged breach of any warranty of Seller and for any actual or alleged defect in any product supplied by Seller."
    },
    {
      icon: Users,
      title: "SOCIAL ACCOUNTABILITY REQUIREMENTS",
      content: "Seller shall abide by the following standards of conduct: Employment is freely chosen, freedom of association and the right to collective bargaining are respected, working conditions are safe and hygienic, child labor shall not be used, remuneration paid to workers meets at a minimum, national legal standards or industry benchmark standards, whichever is higher, working hours are not excessive, no discrimination is practiced, physical abuse or discipline the threat of physical abuse, sexual or other harassment and verbal abuse or other forms of intimidation shall be prohibited."
    },
    {
      icon: FileText,
      title: "COUNTERFEIT PARTS PREVENTION",
      content: "Seller shall only purchase authentic product directly from the Original Equipment Manufacturer (OEM) and Original Component Manufacturer (OCM) or their franchised distributor. Parts from any other source are strictly prohibited unless the Buyer has given prior written approval to use another source. The Seller is responsible for ensuring that fraudulent/counterfeit work and fraudulent/counterfeit parts (electronic, electrical and electromechanical parts that are unauthorized copies or imitations intentionally misrepresented as genuine OEM/OCM parts) are not delivered to the Buyer. If product delivered is subsequently found to be fraudulent/counterfeit, the Seller shall, at the Buyer's discretion, promptly replace the fraudulent/counterfeit product with authentic product conforming to the requirements of the Purchase Order or promptly refund the price of the fraudulent/counterfeit product."
    },
    {
      icon: Zap,
      title: "TERMINATION",
      content: "The Buyer may immediately terminate this Purchase Order without cause at any time upon written notice to the Seller. Upon receipt of such notice, the Seller shall immediately cease work. The Buyer will pay the Seller for satisfactory products delivered or services performed as of the termination date. Sellers failure to perform any of its obligations under this Purchase Order will be deemed a default. The Buyer may terminate this order for default without liability."
    },
    {
      icon: Info,
      title: "COMPLIANCE WITH LAWS",
      content: "Seller warrants that all products sold or services delivered to the Buyer will be produced, sold, delivered and furnished in strict compliance with all applicable laws, rules and regulations, including without limitation, fair labor standards, equal employment opportunity and the requirements of 41 CFR 60-1.4, 60-250.5 and 60-741.5. Seller will defend, indemnify and hold harmless Buyer against all claims, demands or liabilities arising out of the Seller's failure to comply with this warranty."
    },
    {
      icon: Globe,
      title: "EXPORT CONTROL",
      content: "Seller acknowledges that the products, materials, services, equipment and technology data obtained from Buyer may be controlled by U.S. export control laws and regulations, including the Export Administration Regulations (EAR) and the International Traffic in Arms Regulations (ITAR). Seller agrees to comply with all applicable U.S. export control laws and regulations."
    },
    {
      icon: Scale,
      title: "APPLICABLE LAW",
      content: "This Purchase Order shall be governed by the laws of the State of California, USA without reference to its conflicts of laws provisions. The U.N. Convention on Contracts for the International Sale of Goods (Vienna, 1980) shall not apply to this Purchase Order or to any dispute arising out of it."
    }
  ],
  contact: {
    heading: 'CONTACT INFORMATION',
    description: 'For questions regarding these terms and conditions, please contact:',
    email: 'legal@iismet.com',
    phone: '503-231-9093',
    department: 'Legal Department'
  }
};

interface TermsPageClientProps {
  data?: typeof defaultTermsData | null;
}

export default function TermsPageClient({ data }: TermsPageClientProps) {
  // Convert CMS data (with icon strings) to component format (with icon components)
  const termsData = data ? {
    header: data.header || defaultTermsData.header,
    sections: data.sections?.map((section: any) => ({
      icon: iconMap[section.icon] || FileText,
      title: section.title,
      content: section.content
    })) || defaultTermsData.sections,
    contact: data.contact || defaultTermsData.contact
  } : defaultTermsData;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-slate-50">
      {/* Subtle Parallax Background */}
      <motion.div
        style={{ y: parallaxY }}
        className="fixed inset-0 pointer-events-none opacity-50"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-white" />
      </motion.div>

      <div className="container relative z-10 py-24 max-w-6xl">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-slate-900">
            {termsData.header.title}
          </h1>
          <p className="text-lg text-slate-600">
            {termsData.header.subtitle}
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <span className="text-sm font-medium text-slate-500">
              Effective: {termsData.header.effectiveDate}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-sm font-medium text-slate-500">
              {termsData.header.version}
            </span>
          </div>
        </motion.div>

        {/* Terms Grid - Professional Monochrome */}
        <div className="space-y-4">
          {termsData.sections.map((section, index) => {
            const Icon = iconMap[(section as any).iconName] || FileText;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.02 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-3 text-slate-900">
                        {section.title}
                      </h2>
                      <p className="text-slate-600 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section - Professional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-slate-900 rounded-2xl p-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">
            {termsData.contact.heading}
          </h3>
          <p className="text-slate-300 mb-8">
            {termsData.contact.description}
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a href={`mailto:${termsData.contact.email}`} className="flex items-center gap-3 text-white hover:text-slate-300 transition-colors">
              <Mail className="w-5 h-5" />
              <span>{termsData.contact.email}</span>
            </a>
            <span className="hidden md:block text-slate-600">•</span>
            <a href={`tel:+1${termsData.contact.phone.replace(/\D/g, '')}`} className="flex items-center gap-3 text-white hover:text-slate-300 transition-colors">
              <Phone className="w-5 h-5" />
              <span>{termsData.contact.phone}</span>
            </a>
            <span className="hidden md:block text-slate-600">•</span>
            <div className="flex items-center gap-3 text-white">
              <MapPin className="w-5 h-5" />
              <span>{termsData.contact.department}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}