import Link from 'next/link';
import { FileText, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance | IIS - Integrated Inspection Systems',
  description: 'Compliance documents including purchase order terms and supplier quality requirements. AS9100D, ISO 9001, and ITAR compliance standards.',
};

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mb-2">
              Compliance
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Compliance &{' '}
              <span
                style={{
                  background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Documentation
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Review our compliance documents, quality standards, and supplier requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/compliance/terms"
              className="group block p-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all"
            >
              <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Terms &amp; Conditions
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Purchase order terms covering quality, warranty, delivery, compliance, and export control requirements.
              </p>
            </Link>

            <Link
              href="/compliance/supplier-requirements"
              className="group block p-8 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all"
            >
              <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Supplier Quality Requirements
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                AS9100D, ISO 9001:2015, and ITAR compliance standards for supply chain excellence.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
