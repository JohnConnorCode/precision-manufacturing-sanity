/**
 * Utility functions to convert Sanity style objects to CSS styles
 */

export interface ColorStyle {
  color?: {
    hex?: string;
    rgb?: { r: number; g: number; b: number };
  };
  opacity?: number;
}

export interface TypographyStyle {
  textColor?: ColorStyle;
  fontSize?: string;
  fontWeight?: string;
}

/**
 * Convert a Sanity colorStyle object to a CSS color string
 */
export function colorStyleToCSS(colorStyle?: ColorStyle): string | undefined {
  if (!colorStyle?.color) return undefined;

  const hex = colorStyle.color.hex;
  const opacity = colorStyle.opacity ?? 100;

  if (!hex) return undefined;

  // If opacity is 100, return the hex color as-is
  if (opacity === 100) {
    return hex;
  }

  // Convert hex to rgba with opacity
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = opacity / 100;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Convert Sanity fontSize to Tailwind class
 */
export function fontSizeToClass(fontSize?: string): string {
  const sizeMap: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };

  return fontSize ? sizeMap[fontSize] || 'text-base' : 'text-base';
}

/**
 * Convert Sanity fontWeight to Tailwind class
 */
export function fontWeightToClass(fontWeight?: string): string {
  const weightMap: Record<string, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  return fontWeight ? weightMap[fontWeight] || 'font-normal' : 'font-normal';
}

/**
 * Convert typography style to CSS style object
 */
export function typographyStyleToCSS(typoStyle?: TypographyStyle): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (typoStyle?.textColor) {
    const color = colorStyleToCSS(typoStyle.textColor);
    if (color) style.color = color;
  }

  return style;
}

/**
 * Convert typography style to Tailwind classes
 */
export function typographyStyleToClasses(typoStyle?: TypographyStyle): string {
  const classes: string[] = [];

  if (typoStyle?.fontSize) {
    classes.push(fontSizeToClass(typoStyle.fontSize));
  }

  if (typoStyle?.fontWeight) {
    classes.push(fontWeightToClass(typoStyle.fontWeight));
  }

  return classes.join(' ');
}

/**
 * Merge default styles with Sanity-provided styles
 * Sanity styles take precedence
 */
export function mergeStyles(
  defaultStyle: React.CSSProperties,
  sanityStyle?: React.CSSProperties
): React.CSSProperties {
  return {
    ...defaultStyle,
    ...sanityStyle,
  };
}

/**
 * Get background color CSS from theme
 */
export function getBackgroundColor(theme?: {
  backgroundColor?: ColorStyle;
  backgroundGradient?: {
    enabled?: boolean;
    fromColor?: ColorStyle;
    toColor?: ColorStyle;
    direction?: string;
  };
}): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (theme?.backgroundGradient?.enabled && theme.backgroundGradient.fromColor && theme.backgroundGradient.toColor) {
    const fromColor = colorStyleToCSS(theme.backgroundGradient.fromColor);
    const toColor = colorStyleToCSS(theme.backgroundGradient.toColor);
    const direction = theme.backgroundGradient.direction || 'to-b';

    // Convert Tailwind direction to CSS gradient direction
    const directionMap: Record<string, string> = {
      'to-b': 'to bottom',
      'to-t': 'to top',
      'to-r': 'to right',
      'to-l': 'to left',
      'to-tr': 'to top right',
      'to-tl': 'to top left',
      'to-br': 'to bottom right',
      'to-bl': 'to bottom left',
    };

    const cssDirection = directionMap[direction] || 'to bottom';

    if (fromColor && toColor) {
      style.backgroundImage = `linear-gradient(${cssDirection}, ${fromColor}, ${toColor})`;
    }
  } else if (theme?.backgroundColor) {
    const bgColor = colorStyleToCSS(theme.backgroundColor);
    if (bgColor) style.backgroundColor = bgColor;
  }

  return style;
}

/**
 * Get button styles from Sanity button style object
 */
export function getButtonStyles(buttonStyle?: {
  textColor?: ColorStyle;
  backgroundColor?: ColorStyle;
  borderColor?: ColorStyle;
  hoverTextColor?: ColorStyle;
  hoverBackgroundColor?: ColorStyle;
  hoverBorderColor?: ColorStyle;
}): {
  style: React.CSSProperties;
  hoverStyle: React.CSSProperties;
} {
  const style: React.CSSProperties = {};
  const hoverStyle: React.CSSProperties = {};

  if (buttonStyle?.textColor) {
    const color = colorStyleToCSS(buttonStyle.textColor);
    if (color) style.color = color;
  }

  if (buttonStyle?.backgroundColor) {
    const bgColor = colorStyleToCSS(buttonStyle.backgroundColor);
    if (bgColor) style.backgroundColor = bgColor;
  }

  if (buttonStyle?.borderColor) {
    const borderColor = colorStyleToCSS(buttonStyle.borderColor);
    if (borderColor) {
      style.borderWidth = '1px';
      style.borderStyle = 'solid';
      style.borderColor = borderColor;
    }
  }

  if (buttonStyle?.hoverTextColor) {
    const color = colorStyleToCSS(buttonStyle.hoverTextColor);
    if (color) hoverStyle.color = color;
  }

  if (buttonStyle?.hoverBackgroundColor) {
    const bgColor = colorStyleToCSS(buttonStyle.hoverBackgroundColor);
    if (bgColor) hoverStyle.backgroundColor = bgColor;
  }

  if (buttonStyle?.hoverBorderColor) {
    const borderColor = colorStyleToCSS(buttonStyle.hoverBorderColor);
    if (borderColor) hoverStyle.borderColor = borderColor;
  }

  return { style, hoverStyle };
}

/**
 * Convert section padding option to Tailwind class
 */
export function paddingToClass(padding?: string): string {
  const paddingMap: Record<string, string> = {
    none: 'py-0',
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-16',
    large: 'py-16 md:py-24',
    xlarge: 'py-24 md:py-32',
  };

  return padding ? paddingMap[padding] || paddingMap.medium : paddingMap.medium;
}

/**
 * Get overlay styles from hero overlay config
 */
export function getOverlayStyles(overlay?: {
  enabled?: boolean;
  color?: ColorStyle;
}): React.CSSProperties | undefined {
  if (!overlay?.enabled || !overlay.color) return undefined;

  const color = colorStyleToCSS(overlay.color);
  if (!color) return undefined;

  return {
    backgroundColor: color,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  };
}
