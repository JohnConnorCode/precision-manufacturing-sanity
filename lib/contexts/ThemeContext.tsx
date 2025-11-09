"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { colorStyleToCSS } from '@/lib/sanity-styles';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent?: string;
  gradientFrom: string;
  gradientTo: string;
}

interface ThemeContextValue {
  colors: ThemeColors;
  // CSS helper functions
  getPrimaryColor: () => string;
  getSecondaryColor: () => string;
  getGradient: () => string;
  getGradientClasses: () => string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Default theme colors (Blue/Indigo)
const defaultColors: ThemeColors = {
  primary: '#2563EB', // Blue 600
  secondary: '#4F46E5', // Indigo 600
  gradientFrom: '#2563EB',
  gradientTo: '#4F46E5',
};

interface ThemeProviderProps {
  children: React.ReactNode;
  themeData?: {
    primaryColor?: any;
    secondaryColor?: any;
    accentColor?: any;
    gradientFrom?: any;
    gradientTo?: any;
  };
}

export function ThemeProvider({ children, themeData }: ThemeProviderProps) {
  const colors = useMemo<ThemeColors>(() => {
    if (!themeData) return defaultColors;

    return {
      primary: colorStyleToCSS(themeData.primaryColor) || defaultColors.primary,
      secondary: colorStyleToCSS(themeData.secondaryColor) || defaultColors.secondary,
      accent: colorStyleToCSS(themeData.accentColor) || undefined,
      gradientFrom: colorStyleToCSS(themeData.gradientFrom) || colorStyleToCSS(themeData.primaryColor) || defaultColors.gradientFrom,
      gradientTo: colorStyleToCSS(themeData.gradientTo) || colorStyleToCSS(themeData.secondaryColor) || defaultColors.gradientTo,
    };
  }, [themeData]);

  const value = useMemo<ThemeContextValue>(() => ({
    colors,
    getPrimaryColor: () => colors.primary,
    getSecondaryColor: () => colors.secondary,
    getGradient: () => `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
    getGradientClasses: () => `from-[${colors.gradientFrom}] to-[${colors.gradientTo}]`,
  }), [colors]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default theme if provider is not found
    return {
      colors: defaultColors,
      getPrimaryColor: () => defaultColors.primary,
      getSecondaryColor: () => defaultColors.secondary,
      getGradient: () => `linear-gradient(to right, ${defaultColors.gradientFrom}, ${defaultColors.gradientTo})`,
      getGradientClasses: () => 'from-blue-600 to-indigo-600',
    };
  }
  return context;
}
