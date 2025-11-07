"use client";

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/animated-counter';

interface StatsData {
  title?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
    description?: string;
    icon?: string;
  }>;
}

interface StatsProps {
  data?: StatsData;
}

const defaultStats = [
  { value: 30, suffix: '+', label: 'Years Experience', decimals: 0 },
  { value: 99.97, suffix: '%', label: 'On-Time Delivery', decimals: 2 },
  { value: 0.0001, suffix: '"', label: 'Min Tolerance', prefix: '±', decimals: 4 },
  { value: 500, suffix: '+', label: 'Active Clients', decimals: 0 },
];

export default function Stats({ data }: StatsProps) {
  // Use CMS data or fallback to defaults
  // Handle both old format (data.stats as array) and new format (data.items as array)
  const statsArray = (data as any)?.items || data?.stats;
  const stats = statsArray ? statsArray.map((stat: any) => {
    // Parse numeric value from string for animation
    const numValue = parseFloat(stat.value.replace(/[^0-9.-]/g, ''));
    const suffix = stat.value.replace(/[0-9.-]/g, '');
    return {
      value: numValue,
      suffix: suffix || '',
      label: stat.label,
      decimals: numValue < 1 ? 4 : numValue < 100 ? 2 : 0,
      prefix: undefined
    };
  }) : defaultStats;

  const title = data?.title || 'Operational Excellence';
  const subtitle = data?.subtitle || 'THE NUMBERS SPEAK FOR THEMSELVES';

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-slate-100 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(15 23 42) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 uppercase tracking-[0.2em] mb-2">
            {subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
            {title}
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-20" />
                <div className="relative bg-white rounded-2xl p-6 shadow-lg">
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
                  />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}