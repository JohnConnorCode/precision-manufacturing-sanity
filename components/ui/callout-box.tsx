'use client';

import { ReactNode } from 'react';
import { AlertCircle, Info, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface CalloutBoxProps {
  type: 'info' | 'warning' | 'success' | 'error' | 'tip';
  title?: string;
  children: ReactNode;
}

const iconMap = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle,
  error: XCircle,
  tip: Lightbulb,
};

const colorMap = {
  info: 'border-blue-600/20 bg-blue-600/10 text-blue-400',
  warning: 'border-yellow-600/20 bg-yellow-600/10 text-yellow-400',
  success: 'border-green-600/20 bg-green-600/10 text-green-400',
  error: 'border-red-600/20 bg-red-600/10 text-red-400',
  tip: 'border-purple-600/20 bg-purple-600/10 text-purple-400',
};

export function CalloutBox({ type, title, children }: CalloutBoxProps) {
  const Icon = iconMap[type];
  const colorClass = colorMap[type];

  return (
    <div className={`rounded-lg border p-4 ${colorClass}`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-2 text-tone-inverse">{title}</h4>
          )}
          <div className="text-slate-300 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}