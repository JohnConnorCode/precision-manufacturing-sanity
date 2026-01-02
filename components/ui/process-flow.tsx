'use client';

import { Check } from 'lucide-react';

interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  duration?: string;
  tools?: string[];
  qualityCheck?: string;
}

interface ProcessFlowProps {
  title: string;
  description?: string;
  steps: ProcessStep[];
}

export function ProcessFlow({ title, description, steps }: ProcessFlowProps) {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold text-tone-inverse mb-2">{title}</h3>
      {description && (
        <p className="text-slate-600 dark:text-slate-400 mb-6">{description}</p>
      )}

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700"
          >
            {/* Step connector line */}
            {index < steps.length - 1 && (
              <div className="absolute left-8 top-full h-6 w-0.5 bg-gradient-to-b from-blue-500 to-transparent" />
            )}

            <div className="flex items-start gap-4">
              {/* Step number badge */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-tone-inverse font-bold text-xl">
                {step.stepNumber}
              </div>

              <div className="flex-1">
                <h4 className="text-xl font-bold text-tone-inverse mb-2">{step.title}</h4>
                <p className="text-slate-300 mb-3">{step.description}</p>

                {/* Duration */}
                {step.duration && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-blue-400">Duration:</span>
                    <span className="text-sm text-slate-400">{step.duration}</span>
                  </div>
                )}

                {/* Tools */}
                {step.tools && step.tools.length > 0 && (
                  <div className="mb-2">
                    <span className="text-sm font-medium text-blue-400 block mb-1">Tools/Equipment:</span>
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool, toolIndex) => (
                        <span
                          key={toolIndex}
                          className="inline-flex items-center px-2 py-1 bg-slate-800 rounded text-xs text-slate-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quality check */}
                {step.qualityCheck && (
                  <div className="flex items-start gap-2 mt-3 p-3 bg-green-900/20 border border-green-700/30 rounded">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-green-400 block">Quality Check:</span>
                      <span className="text-sm text-slate-300">{step.qualityCheck}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
