/**
 * Theme Utility Functions
 * Helper functions to apply theme colors dynamically to components
 */

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent?: string;
  gradientFrom: string;
  gradientTo: string;
}

/**
 * Get CSS styles for gradient background
 */
export function getGradientStyle(colors: ThemeColors): React.CSSProperties {
  return {
    backgroundImage: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
  };
}

/**
 * Get CSS styles for gradient text
 */
export function getGradientTextStyle(colors: ThemeColors): React.CSSProperties {
  return {
    backgroundImage: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
}

/**
 * Get CSS styles for primary color
 */
export function getPrimaryColorStyle(colors: ThemeColors): React.CSSProperties {
  return {
    color: colors.primary,
  };
}

/**
 * Get CSS styles for primary background
 */
export function getPrimaryBgStyle(colors: ThemeColors): React.CSSProperties {
  return {
    backgroundColor: colors.primary,
  };
}

/**
 * Get CSS styles for border with primary color
 */
export function getPrimaryBorderStyle(colors: ThemeColors, opacity: number = 0.5): React.CSSProperties {
  // Parse the hex color and add opacity
  const hex = colors.primary.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return {
    borderColor: `rgba(${r}, ${g}, ${b}, ${opacity})`,
  };
}

/**
 * Get CSS styles for shadow with primary color
 */
export function getPrimaryShadowStyle(colors: ThemeColors, opacity: number = 0.5): React.CSSProperties {
  // Parse the hex color and add opacity
  const hex = colors.primary.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return {
    boxShadow: `0 0 20px rgba(${r}, ${g}, ${b}, ${opacity}), 0 8px 16px rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`,
  };
}

/**
 * Get CSS styles for hover effect with gradient
 */
export function getGradientHoverStyle(colors: ThemeColors): React.CSSProperties {
  // Lighten the gradient slightly for hover
  return {
    backgroundImage: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
    opacity: 0.9,
  };
}

/**
 * Convert hex color to rgba
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Get inline styles for theme-aware components
 * This allows components to use theme colors without needing Tailwind's JIT compiler
 */
export function getThemedStyles(colors: ThemeColors) {
  return {
    gradient: getGradientStyle(colors),
    gradientText: getGradientTextStyle(colors),
    primaryColor: getPrimaryColorStyle(colors),
    primaryBg: getPrimaryBgStyle(colors),
    primaryBorder: getPrimaryBorderStyle(colors),
    primaryShadow: getPrimaryShadowStyle(colors),
  };
}
