import * as Icons from 'lucide-react';
import { clean } from '@/lib/stega-clean';

interface DynamicIconProps {
  name: string;
  className?: string;
  fallback?: string;
}

/**
 * Renders a Lucide icon by name from CMS data.
 *
 * Centralised here so the full icon namespace is imported once
 * (in one shared chunk) instead of duplicated across every file
 * that needs CMS-driven icons.
 *
 * Uses stegaClean to strip invisible preview encoding from icon names.
 */
export function DynamicIcon({ name, className, fallback = 'Circle' }: DynamicIconProps) {
  const cleanName = clean(name);
  const iconExport = cleanName ? (Icons as Record<string, unknown>)[cleanName] : null;
  const fallbackExport = (Icons as Record<string, unknown>)[clean(fallback)];
  const Icon = (typeof iconExport === 'function' ? iconExport : fallbackExport || Icons.Circle) as React.ComponentType<{ className?: string }>;
  return <Icon className={className} />;
}
