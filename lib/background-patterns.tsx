/**
 * Background Pattern Utilities
 * Reusable functions for generating consistent background patterns
 */

import { colors } from '@/lib/design-system';

export interface GridPatternOptions {
  /** Grid color (defaults to slate-900) */
  color?: string;
  /** Grid spacing in pixels (defaults to 32) */
  spacing?: number;
  /** Dot size in pixels (defaults to 1) */
  dotSize?: number;
  /** Dot position offset in pixels (defaults to 2) */
  dotPosition?: number;
  /** Pattern opacity (defaults to 0.03) */
  opacity?: number;
  /** Pattern type */
  type?: 'radial' | 'linear';
}

/**
 * Generate a dot grid background pattern
 * Returns React CSSProperties for inline styles
 */
export function getDotGridPattern(options: GridPatternOptions = {}): {
  containerStyle: React.CSSProperties;
  patternStyle: React.CSSProperties;
} {
  const {
    color = colors.raw.slate900,
    spacing = 32,
    dotSize = 1,
    dotPosition = 2,
    opacity = 0.03,
    type = 'radial',
  } = options;

  return {
    containerStyle: {
      position: 'absolute',
      inset: 0,
      opacity,
    } as React.CSSProperties,
    patternStyle: {
      position: 'absolute',
      inset: 0,
      backgroundImage: `radial-gradient(circle at ${dotPosition}px ${dotPosition}px, ${color} ${dotSize}px, transparent 0)`,
      backgroundSize: `${spacing}px ${spacing}px`,
    } as React.CSSProperties,
  };
}

/**
 * Generate a linear grid background pattern (like CTA.tsx)
 * Returns React CSSProperties for inline styles
 */
export function getLinearGridPattern(options: Partial<{
  color: string;
  spacing: number;
  opacity: number;
}> = {}): React.CSSProperties {
  const {
    color = 'rgba(59, 130, 246, 0.5)',
    spacing = 50,
    opacity = 0.03,
  } = options;

  return {
    position: 'absolute',
    inset: 0,
    opacity,
    backgroundImage: `linear-gradient(0deg, transparent 49%, ${color} 50%, transparent 51%), linear-gradient(90deg, transparent 49%, ${color} 50%, transparent 51%)`,
    backgroundSize: `${spacing}px ${spacing}px`,
  } as React.CSSProperties;
}

/**
 * Render a dot grid pattern as JSX
 * Use this for cleaner component code
 */
export function DotGridBackground(props: GridPatternOptions = {}) {
  const { containerStyle, patternStyle } = getDotGridPattern(props);

  return (
    <div style={containerStyle}>
      <div style={patternStyle} />
    </div>
  );
}

/**
 * Render a linear grid pattern as JSX
 * Use this for cleaner component code
 */
export function LinearGridBackground(props: Partial<{
  color: string;
  spacing: number;
  opacity: number;
}> = {}) {
  const style = getLinearGridPattern(props);

  return <div style={style} />;
}
