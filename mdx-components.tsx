import type { MDXComponents } from 'mdx/types';
import { PremiumButton } from '@/components/ui/premium-button';
import ToleranceCalculator from '@/components/ui/tolerance-calculator';
import ComplianceChecklist from '@/components/ui/compliance-checklist';
import MaterialSelector from '@/components/ui/material-selector';
import { SafeMotion } from '@/components/ui/safe-motion';
import { Check, AlertTriangle, Info, Lightbulb } from 'lucide-react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom heading components with scroll-triggered animations
    h1: ({ children, ...props }) => (
      <SafeMotion y={20} className="text-4xl font-bold text-white mb-6 mt-8">
        <h1 {...props}>{children}</h1>
      </SafeMotion>
    ),
    h2: ({ children, ...props }) => (
      <SafeMotion y={20} className="text-3xl font-bold text-white mb-4 mt-8">
        <h2 {...props}>{children}</h2>
      </SafeMotion>
    ),
    h3: ({ children, ...props }) => (
      <SafeMotion y={20} className="text-2xl font-bold text-white mb-3 mt-6">
        <h3 {...props}>{children}</h3>
      </SafeMotion>
    ),

    // Enhanced paragraph with better typography
    p: ({ children, ...props }) => (
      <p className="mb-4 text-slate-300 leading-relaxed" {...props}>
        {children}
      </p>
    ),

    // Enhanced lists
    ul: ({ children, ...props }) => (
      <ul className="mb-6 ml-6 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-6 ml-6 space-y-2 list-decimal" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-slate-300" {...props}>
        {children}
      </li>
    ),

    // Code blocks with syntax highlighting
    code: ({ children, ...props }) => (
      <code
        className="bg-slate-800 text-blue-400 px-2 py-1 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="bg-slate-900 p-4 rounded-lg overflow-x-auto mb-6 border border-slate-700"
        {...props}
      >
        {children}
      </pre>
    ),

    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <SafeMotion y={20}>
        <blockquote
          className="border-l-4 border-blue-600 pl-6 py-2 mb-6 bg-blue-600/5 text-slate-300 italic"
          {...props}
        >
          {children}
        </blockquote>
      </SafeMotion>
    ),

    // Tables
    table: ({ children, ...props }) => (
      <SafeMotion y={20}>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-slate-700" {...props}>
            {children}
          </table>
        </div>
      </SafeMotion>
    ),
    th: ({ children, ...props }) => (
      <th className="border border-slate-700 bg-slate-800 text-white px-4 py-2 text-left" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-slate-700 text-slate-300 px-4 py-2" {...props}>
        {children}
      </td>
    ),

    // Links
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-400 hover:text-blue-300 underline transition-colors"
        {...props}
      >
        {children}
      </a>
    ),

    // Custom components for interactive content
    CalloutBox: ({ type = 'info', title, children }: {
      type?: 'info' | 'warning' | 'success' | 'tip';
      title?: string;
      children: React.ReactNode;
    }) => {
      const getIcon = () => {
        switch (type) {
          case 'warning': return <AlertTriangle className="w-5 h-5" />;
          case 'success': return <Check className="w-5 h-5" />;
          case 'tip': return <Lightbulb className="w-5 h-5" />;
          default: return <Info className="w-5 h-5" />;
        }
      };

      const getColors = () => {
        switch (type) {
          case 'warning': return 'border-yellow-600/50 bg-yellow-600/10 text-yellow-400';
          case 'success': return 'border-green-600/50 bg-green-600/10 text-green-400';
          case 'tip': return 'border-purple-600/50 bg-purple-600/10 text-purple-400';
          default: return 'border-blue-600/50 bg-blue-600/10 text-blue-400';
        }
      };

      return (
        <SafeMotion y={20} className={`border rounded-lg p-6 mb-6 ${getColors()}`}>
          <div className="flex items-center gap-3 mb-3">
            {getIcon()}
            {title && <h4 className="font-semibold text-lg">{title}</h4>}
          </div>
          <div className="text-slate-300">
            {children}
          </div>
        </SafeMotion>
      );
    },

    InteractiveDemo: ({ title, children }: { title: string; children: React.ReactNode }) => (
      <SafeMotion y={20} scale={0.98} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
        <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
        {children}
      </SafeMotion>
    ),

    TechnicalSpecs: ({ specs }: { specs: Array<{ label: string; value: string; unit?: string }> }) => (
      <SafeMotion y={20} className="bg-slate-900/30 border border-slate-800 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-bold text-white mb-4">Technical Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-b-0">
              <span className="text-slate-400">{spec.label}</span>
              <span className="text-white font-medium">
                {spec.value} {spec.unit && <span className="text-slate-400">{spec.unit}</span>}
              </span>
            </div>
          ))}
        </div>
      </SafeMotion>
    ),

    CTAButton: ({ href, children, variant = 'default' }: {
      href: string;
      children: React.ReactNode;
      variant?: 'default' | 'secondary';
    }) => (
      <SafeMotion y={20} className="my-6">
        <a href={href}>
          <PremiumButton variant={variant as any} size="lg">
            {children}
          </PremiumButton>
        </a>
      </SafeMotion>
    ),

    ToleranceCalculator: () => (
      <SafeMotion y={20}>
        <ToleranceCalculator />
      </SafeMotion>
    ),

    ComplianceChecklist: () => (
      <SafeMotion y={20}>
        <ComplianceChecklist />
      </SafeMotion>
    ),

    MaterialSelector: () => (
      <SafeMotion y={20}>
        <MaterialSelector />
      </SafeMotion>
    ),

    ...components,
  };
}
