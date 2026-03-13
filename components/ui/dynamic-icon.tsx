import * as Icons from 'lucide-react';

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
 */
export function DynamicIcon({ name, className, fallback = 'Circle' }: DynamicIconProps) {
  const iconExport = name ? (Icons as Record<string, unknown>)[name] : null;
  const fallbackExport = (Icons as Record<string, unknown>)[fallback];
  const Icon = (typeof iconExport === 'function' ? iconExport : fallbackExport || Icons.Circle) as React.ComponentType<{ className?: string }>;
  return <Icon className={className} />;
}
