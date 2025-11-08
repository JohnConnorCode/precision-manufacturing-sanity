"use client";

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (Icons as any)[name] || Icons.Circle;
  return <Icon className={className} />;
}

interface Benefit {
  iconName?: string;
  title: string;
  description: string;
}

interface OperationalExcellenceData {
  heading?: string;
  description?: string;
  benefits?: Benefit[];
}

interface OperationalExcellenceProps {
  data?: OperationalExcellenceData;
}

// Default benefits matching reference site
const defaultBenefits: Benefit[] = [
  {
    iconName: 'Gauge',
    title: 'Quality Control',
    description: 'Comprehensive inspection protocols and real-time process monitoring ensure every component meets exact specifications.'
  },
  {
    iconName: 'Workflow',
    title: 'Process Optimization',
    description: 'Lean manufacturing principles and continuous improvement initiatives maximize efficiency without compromising quality.'
  },
  {
    iconName: 'Users',
    title: 'Expert Team',
    description: 'Highly trained machinists, engineers, and quality professionals with decades of precision manufacturing experience.'
  }
];

export default function OperationalExcellence({ data }: OperationalExcellenceProps) {
  const heading = data?.heading || 'OPERATIONAL EXCELLENCE';
  const description = data?.description || 'Proven systems and expert teams delivering consistent, superior results';
  const benefits = data?.benefits && data.benefits.length > 0 ? data.benefits : defaultBenefits;

  return (
    <section className="py-20 md:py-24 bg-slate-900 text-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-6">
                <DynamicIcon name={benefit.iconName || 'Circle'} className="w-8 h-8" />
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
