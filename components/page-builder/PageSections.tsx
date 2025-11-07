"use client";

import HeroSection from '@/components/ui/hero-section'
import { createPortableTextComponents } from '@/components/portable-text-components'
import { PortableText } from '@portabletext/react'
import CTA from '@/components/sections/CTA'
import { getBackgroundColor, paddingToClass } from '@/lib/sanity-styles'

export default function PageSections({ sections }: { sections: any[] }) {
  if (!Array.isArray(sections) || sections.length === 0) return null

  return (
    <>
      {sections.map((section, idx) => {
        switch (section?._type) {
          case 'heroSection': {
            const _badgeIconName = section?.badgeIconName
            // Pass ALL data from Sanity including style fields
            return (
              <HeroSection
                key={idx}
                backgroundImage={section?.backgroundImageUrl || ''}
                imageAlt={section?.imageAlt || ''}
                badge={{ text: section?.badge || '', icon: undefined as any }}
                title={
                  <span style={{ color: section?.titleColor?.color?.hex || '#ffffff' }}>
                    {section?.title}{' '}
                    {section?.titleHighlight && (
                      <span style={{ color: section?.titleHighlightColor?.color?.hex || '#60a5fa' }}>
                        {section?.titleHighlight}
                      </span>
                    )}
                  </span>
                }
                description={section?.description}
                buttons={(section?.buttons || []).map((b: any) => ({
                  label: b?.label,
                  href: b?.href,
                  variant: b?.variant || 'primary',
                }))}
                height={section?.height || 'large'}
                alignment={section?.alignment || 'center'}
                // Pass style data
                titleColor={section?.titleColor}
                titleHighlightColor={section?.titleHighlightColor}
                descriptionColor={section?.descriptionColor}
                badgeStyle={section?.badgeStyle}
                overlay={section?.overlay}
                buttonStyles={section?.buttonStyles}
              />
            )
          }
          case 'richTextSection': {
            const container = section?.container || 'default'
            const containerClass = container === 'narrow' ? 'max-w-2xl' : container === 'wide' ? 'max-w-6xl' : container === 'full' ? 'max-w-full' : 'max-w-4xl'
            const paddingClass = paddingToClass(section?.padding)
            const backgroundStyle = getBackgroundColor(section?.theme)

            // Create custom components with section styles
            const customComponents = createPortableTextComponents({
              headingStyles: section?.headingStyles,
              bodyTextStyle: section?.bodyTextStyle,
              linkStyle: section?.linkStyle,
              blockquoteStyle: section?.blockquoteStyle,
              codeStyle: section?.codeStyle,
            })

            return (
              <section
                key={idx}
                className={`${paddingClass}`}
                style={backgroundStyle}
              >
                <div className={`container ${containerClass} mx-auto`}>
                  <PortableText value={section?.content || []} components={customComponents as any} />
                </div>
              </section>
            )
          }
          case 'ctaSection': {
            return (
              <CTA
                key={idx}
                data={{
                  title: section?.title,
                  subtitle: section?.subtitle,
                  buttons: section?.buttons,
                  // Pass ALL style fields
                  theme: section?.theme,
                  titleColor: section?.titleColor,
                  subtitleColor: section?.subtitleColor,
                  buttonStyles: section?.buttonStyles,
                  padding: section?.padding,
                }}
              />
            )
          }
          default:
            return null
        }
      })}
    </>
  )
}

