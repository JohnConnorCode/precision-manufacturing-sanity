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
export function createPortableTextComponents(styles?: RichTextStyles) {
  // Extract colors from styles or use defaults
  const h1Color = colorStyleToCSS(styles?.headingStyles?.h1?.textColor) || '#ffffff';
  const h2Color = colorStyleToCSS(styles?.headingStyles?.h2?.textColor) || '#ffffff';
  const h3Color = colorStyleToCSS(styles?.headingStyles?.h3?.textColor) || '#ffffff';
  const h4Color = colorStyleToCSS(styles?.headingStyles?.h4?.textColor) || '#ffffff';
  const bodyColor = colorStyleToCSS(styles?.bodyTextStyle?.textColor) || '#cbd5e1'; // slate-300
  const linkColor = colorStyleToCSS(styles?.linkStyle?.color) || '#60a5fa'; // blue-400
  const linkHoverColor = colorStyleToCSS(styles?.linkStyle?.hoverColor) || '#93c5fd'; // blue-300
  const blockquoteTextColor = colorStyleToCSS(styles?.blockquoteStyle?.textColor) || '#94a3b8'; // slate-400
  const blockquoteBorderColor = colorStyleToCSS(styles?.blockquoteStyle?.borderColor) || '#2563eb'; // blue-600
  const codeTextColor = colorStyleToCSS(styles?.codeStyle?.textColor) || '#60a5fa'; // blue-400
  const codeBgColor = colorStyleToCSS(styles?.codeStyle?.backgroundColor) || '#1e293b'; // slate-800

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
    h1: ({ children }: any) => (
      <h1
        className={`text-4xl font-bold mt-8 mb-4 ${h1Classes}`}
        style={{ color: h1Color }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2
        className={`text-3xl font-bold mt-8 mb-4 ${h2Classes}`}
        style={{ color: h2Color }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3
        className={`text-2xl font-bold mt-6 mb-3 ${h3Classes}`}
        style={{ color: h3Color }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4
        className={`text-xl font-bold mt-6 mb-3 ${h4Classes}`}
        style={{ color: h4Color }}
      >
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p
        className={`leading-relaxed mb-4 ${bodyClasses}`}
        style={{ color: bodyColor }}
        suppressHydrationWarning
      >
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote
        className="border-l-4 pl-4 my-4 italic"
        style={{
          borderColor: blockquoteBorderColor,
          color: blockquoteTextColor,
        }}
      >
        {children}
      </blockquote>
    ),
  },

  marks: {
    // Custom styles for inline elements
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code
        className="px-1 py-0.5 rounded text-sm"
        style={{
          backgroundColor: codeBgColor,
          color: codeTextColor,
        }}
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
          className={`transition-colors ${underlineClass}`}
          style={{ color: linkColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = linkHoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = linkColor;
          }}
        >
          {children}
        </Link>
      )
    },
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-4" style={{ color: bodyColor }}>
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-4" style={{ color: bodyColor }}>
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
    <div className="prose prose-lg prose-invert max-w-none" suppressHydrationWarning>
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