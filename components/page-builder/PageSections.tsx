"use client";

import HeroSection from '@/components/ui/hero-section'
import { portableTextComponents } from '@/components/portable-text-components'
import { PortableText } from '@portabletext/react'
import CTA from '@/components/sections/CTA'

export default function PageSections({ sections }: { sections: any[] }) {
  if (!Array.isArray(sections) || sections.length === 0) return null

  return (
    <>
      {sections.map((section, idx) => {
        switch (section?._type) {
          case 'heroSection': {
            const badgeIconName = section?.badgeIconName
            // HeroSection already styles match current design
            return (
              <HeroSection
                key={idx}
                backgroundImage={section?.backgroundImageUrl || ''}
                imageAlt={section?.imageAlt || ''}
                badge={{ text: section?.badge || '', icon: undefined as any }}
                title={
                  <span className="text-white">
                    {section?.title}{' '}
                    {section?.titleHighlight && (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">{section?.titleHighlight}</span>
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
              />
            )
          }
          case 'richTextSection': {
            const container = section?.container || 'default'
            const containerClass = container === 'narrow' ? 'max-w-2xl' : container === 'wide' ? 'max-w-6xl' : 'max-w-4xl'
            return (
              <section key={idx} className="py-12">
                <div className={`container ${containerClass} mx-auto`}> 
                  <PortableText value={section?.content || []} components={portableTextComponents as any} />
                </div>
              </section>
            )
          }
          case 'ctaSection': {
            return (
              <CTA
                key={idx}
                data={{ title: section?.title, subtitle: section?.subtitle, buttons: section?.buttons }}
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

