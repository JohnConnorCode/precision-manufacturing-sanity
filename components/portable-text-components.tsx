'use client';

import React, { useMemo } from 'react';
import { PortableText } from '@portabletext/react'
import { CalloutBox } from '@/components/ui/callout-box'
import { TechnicalSpecs } from '@/components/ui/technical-specs'
import { CTAButton } from '@/components/ui/cta-button'
import { ToleranceTable } from '@/components/ui/tolerance-table'
import { ProcessFlow } from '@/components/ui/process-flow'
import { MaterialData } from '@/components/ui/material-data'
import { EquipmentSpec } from '@/components/ui/equipment-spec'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image'
import Link from 'next/link'
import { colorStyleToCSS, typographyStyleToClasses } from '@/lib/sanity-styles'

// Define style interface for rich text
export interface RichTextStyles {
  headingStyles?: {
    h1?: any;
    h2?: any;
    h3?: any;
    h4?: any;
  };
  bodyTextStyle?: any;
  linkStyle?: {
    color?: any;
    hoverColor?: any;
    underline?: boolean;
  };
  blockquoteStyle?: {
    textColor?: any;
    borderColor?: any;
    backgroundColor?: any;
  };
  codeStyle?: {
    textColor?: any;
    backgroundColor?: any;
  };
}

// Factory function to create Portable Text components with custom styles
// NOTE: Default colors must work in BOTH light and dark mode via CSS classes, NOT inline styles
export function createPortableTextComponents(styles?: RichTextStyles) {
  const blue600 = '#2563eb';

  // Only use inline colors if explicitly set via CMS styles
  // Otherwise, use null and let CSS classes handle light/dark mode
  const h1Color = colorStyleToCSS(styles?.headingStyles?.h1?.textColor) || null;
  const h2Color = colorStyleToCSS(styles?.headingStyles?.h2?.textColor) || null;
  const h3Color = colorStyleToCSS(styles?.headingStyles?.h3?.textColor) || null;
  const h4Color = colorStyleToCSS(styles?.headingStyles?.h4?.textColor) || null;
  const bodyColor = colorStyleToCSS(styles?.bodyTextStyle?.textColor) || null;
  const linkColor = colorStyleToCSS(styles?.linkStyle?.color) || null;
  const blockquoteTextColor = colorStyleToCSS(styles?.blockquoteStyle?.textColor) || null;
  const blockquoteBorderColor = colorStyleToCSS(styles?.blockquoteStyle?.borderColor) || blue600;
  const codeTextColor = colorStyleToCSS(styles?.codeStyle?.textColor) || null;
  const codeBgColor = colorStyleToCSS(styles?.codeStyle?.backgroundColor) || null;

  // Get typography classes
  const h1Classes = styles?.headingStyles?.h1 ? typographyStyleToClasses(styles.headingStyles.h1) : '';
  const h2Classes = styles?.headingStyles?.h2 ? typographyStyleToClasses(styles.headingStyles.h2) : '';
  const h3Classes = styles?.headingStyles?.h3 ? typographyStyleToClasses(styles.headingStyles.h3) : '';
  const h4Classes = styles?.headingStyles?.h4 ? typographyStyleToClasses(styles.headingStyles.h4) : '';
  const bodyClasses = styles?.bodyTextStyle ? typographyStyleToClasses(styles.bodyTextStyle) : '';

  return {
  types: {
    // Image component
    image: ({ value }: any) => {
      if (!value?.asset) return null

      // Don't render if URL is empty
      const imageUrl = value.url || value.asset?.url;
      if (!imageUrl) return null;

      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Resource image'}
            width={1200}
            height={800}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <p className="text-sm text-slate-500 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      )
    },

    // Technical Specifications component
    technicalSpecs: ({ value }: any) => {
      if (!value?.specs) return null

      return (
        <div className="my-8">
          <TechnicalSpecs specs={value.specs} />
        </div>
      )
    },

    // Callout Box component
    calloutBox: ({ value }: any) => {
      return (
        <div className="my-6">
          <CalloutBox
            type={value.type || 'info'}
            title={value.title || ''}
          >
            {value.content}
          </CalloutBox>
        </div>
      )
    },

    // Code Block component
    codeBlock: ({ value }: any) => {
      if (!value?.code) return null

      return (
        <div className="my-6">
          <SyntaxHighlighter
            language={value.language || 'text'}
            style={vscDarkPlus}
            customStyle={{
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              padding: '1rem',
            }}
            showLineNumbers={value.language !== 'text'}
          >
            {value.code}
          </SyntaxHighlighter>
        </div>
      )
    },

    // CTA Button component
    ctaButton: ({ value }: any) => {
      if (!value?.href || !value?.text) return null

      return (
        <div className="my-8 flex justify-center">
          <CTAButton
            href={value.href}
            variant={value.variant || 'primary'}
          >
            {value.text}
          </CTAButton>
        </div>
      )
    },

    // Tolerance Table component
    toleranceTable: ({ value }: any) => {
      if (!value?.title || !value?.headers || !value?.rows) return null

      return (
        <ToleranceTable
          title={value.title}
          description={value.description}
          headers={value.headers}
          rows={value.rows}
        />
      )
    },

    // Process Flow component
    processFlow: ({ value }: any) => {
      if (!value?.title || !value?.steps) return null

      return (
        <ProcessFlow
          title={value.title}
          description={value.description}
          steps={value.steps}
        />
      )
    },

    // Material Data component
    materialData: ({ value }: any) => {
      if (!value?.materialName || !value?.description || !value?.properties) return null

      return (
        <MaterialData
          materialName={value.materialName}
          grade={value.grade}
          description={value.description}
          properties={value.properties}
          applications={value.applications}
          machiningConsiderations={value.machiningConsiderations}
        />
      )
    },

    // Equipment Spec component
    equipmentSpec: ({ value }: any) => {
      if (!value?.equipmentName || !value?.specifications) return null

      return (
        <EquipmentSpec
          equipmentName={value.equipmentName}
          manufacturer={value.manufacturer}
          model={value.model}
          image={value.image}
          specifications={value.specifications}
          applications={value.applications}
          advantages={value.advantages}
        />
      )
    },
  },

  block: {
    // Custom styles for block elements
    // Use CSS classes for light/dark mode, only use inline style if CMS override exists
    h1: ({ children }: any) => (
      <h1
        className={`text-4xl font-bold mt-8 mb-4 text-slate-900 dark:text-white ${h1Classes}`}
        style={h1Color ? { color: h1Color } : undefined}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        className={`text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-white ${h2Classes}`}
        style={h2Color ? { color: h2Color } : undefined}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        className={`text-2xl font-bold mt-6 mb-3 text-slate-900 dark:text-white ${h3Classes}`}
        style={h3Color ? { color: h3Color } : undefined}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4
        className={`text-xl font-bold mt-6 mb-3 text-slate-900 dark:text-white ${h4Classes}`}
        style={h4Color ? { color: h4Color } : undefined}
      >
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p
        className={`leading-relaxed mb-4 text-slate-700 dark:text-slate-300 ${bodyClasses}`}
        style={bodyColor ? { color: bodyColor } : undefined}
        suppressHydrationWarning
      >
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        className="border-l-4 pl-4 my-4 italic text-slate-600 dark:text-slate-400"
        style={{
          borderColor: blockquoteBorderColor,
          ...(blockquoteTextColor ? { color: blockquoteTextColor } : {}),
        }}
      >
        {children}
      </blockquote>
    ),
  },

  marks: {
    // Custom styles for inline elements
    strong: ({ children }: any) => (
      <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code
        className="px-1 py-0.5 rounded text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
        style={codeBgColor || codeTextColor ? {
          ...(codeBgColor ? { backgroundColor: codeBgColor } : {}),
          ...(codeTextColor ? { color: codeTextColor } : {}),
        } : undefined}
      >
        {children}
      </code>
    ),
    link: ({ value, children }: any) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      const underlineClass = styles?.linkStyle?.underline !== false ? 'underline' : '';

      return (
        <Link
          href={value?.href || '#'}
          target={target}
          rel={rel}
          className={`transition-colors text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ${underlineClass}`}
          style={linkColor ? { color: linkColor } : undefined}
        >
          {children}
        </Link>
      )
    },
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300" style={bodyColor ? { color: bodyColor } : undefined}>
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700 dark:text-slate-300" style={bodyColor ? { color: bodyColor } : undefined}>
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),
  },
  };
}

// Default components (backward compatibility)
export const portableTextComponents = createPortableTextComponents();

// Component to render Portable Text content (optimized with React.memo)
export const PortableTextContent = React.memo(function PortableTextContent({
  value,
  styles
}: {
  value: any;
  styles?: RichTextStyles
}) {
  // Memoize components to avoid recreating them on every render
  const components = useMemo(
    () => styles ? createPortableTextComponents(styles) : portableTextComponents,
    [styles]
  );

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none" suppressHydrationWarning>
      <PortableText
        value={value}
        components={components}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for better memoization
  return (
    prevProps.value === nextProps.value &&
    JSON.stringify(prevProps.styles) === JSON.stringify(nextProps.styles)
  );
});
