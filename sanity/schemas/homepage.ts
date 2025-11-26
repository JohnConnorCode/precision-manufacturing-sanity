export default {
  icon: () => '🏠',
  name: 'homepage',
  type: 'document',
  title: 'Homepage',
  preview: {
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Hero, stats, showcase, resources, and CTA sections',
      }
    },
  },
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'services', title: 'Services & Industries'},
    {name: 'metrics', title: 'Stats & Specs'},
    {name: 'showcase', title: 'Image Showcase'},
    {name: 'resources', title: 'Resources'},
    {name: 'cta', title: 'Final CTA'},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      description: 'Primary hero experience with carousel, badges, and call-to-actions.',
      group: 'hero',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'visibility', title: '👁️ Section Visibility', options: {collapsible: false}},
        {name: 'copy', title: 'Primary Copy', options: {columns: 2}},
        {name: 'styling', title: 'Styling & Colors'},
        {name: 'slides', title: 'Hero Slides', options: {collapsible: true, collapsed: false}},
        {name: 'badges', title: 'Badges Strip', options: {collapsible: true, collapsed: true}},
        {name: 'primaryCta', title: 'Primary CTA Button', options: {columns: 2}},
        {name: 'secondaryCta', title: 'Secondary CTA (Hidden by default)', options: {columns: 2, collapsible: true, collapsed: true}},
        {name: 'tertiaryCta', title: 'Tertiary CTA (Hidden by default)', options: {columns: 2, collapsible: true, collapsed: true}},
      ],
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Hero Section',
          description: 'Toggle to show/hide the entire Hero section from the website',
          fieldset: 'visibility',
          initialValue: true,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'backgroundGradient',
          type: 'string',
          title: 'Background Style',
          description: 'Hero section background color or gradient',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Blue Gradient ⭐ (Default)', value: 'from-blue-600 to-indigo-600' },
              { title: 'Dark Blue Gradient', value: 'from-blue-800 to-indigo-800' },
              { title: 'Dark Gradient', value: 'from-zinc-800 to-zinc-900' },
              { title: 'Indigo Gradient', value: 'from-indigo-600 to-purple-600' },
              { title: 'Solid Blue', value: 'bg-blue-600' },
              { title: 'Solid Dark', value: 'bg-zinc-900' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'from-blue-600 to-indigo-600',
        },
        {
          name: 'headingTextColor',
          type: 'string',
          title: 'Heading Text Color',
          description: 'Color of the three hero heading words',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'White ⭐ (Default)', value: 'text-white' },
              { title: 'Off-White', value: 'text-white/90' },
              { title: 'Dark Gray', value: 'text-zinc-900' },
              { title: 'Medium Gray', value: 'text-zinc-600' },
              { title: 'Blue Accent', value: 'text-blue-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-white',
        },
        {
          name: 'taglineTextColor',
          type: 'string',
          title: 'Tagline Text Color',
          description: 'Color of the tagline/subtitle text',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Off-White ⭐ (Default)', value: 'text-white/80' },
              { title: 'White', value: 'text-white' },
              { title: 'Light Gray', value: 'text-zinc-300' },
              { title: 'Medium Gray', value: 'text-zinc-400' },
              { title: 'Dark Gray', value: 'text-zinc-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-white/80',
        },
        {
          name: 'heroVerticalPadding',
          type: 'string',
          title: 'Hero Section Spacing',
          description: 'Vertical padding/spacing around hero content',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Compact', value: 'py-16 md:py-20' },
              { title: 'Standard', value: 'py-20 md:py-24' },
              { title: 'Spacious ⭐ (Default)', value: 'py-24 md:py-32' },
              { title: 'Extra Spacious', value: 'py-32 md:py-40' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'py-24 md:py-32',
        },
        {
          name: 'word1',
          type: 'string',
          title: 'Word 1',
          initialValue: 'PRECISION',
          description: 'First word of hero heading (e.g., "PRECISION")',
          fieldset: 'copy',
        },
        {
          name: 'word2',
          type: 'string',
          title: 'Word 2',
          initialValue: 'MANUFACTURING',
          description: 'Second word of hero heading (e.g., "MANUFACTURING")',
          fieldset: 'copy',
        },
        {
          name: 'word3',
          type: 'string',
          title: 'Word 3',
          initialValue: 'SERVICES',
          description: 'Third word of hero heading (e.g., "SERVICES")',
          fieldset: 'copy',
        },
        {
          name: 'heroFontSize',
          type: 'string',
          title: 'Hero Text Size',
          description: 'Size of the three hero heading words',
          fieldset: 'copy',
          options: {
            list: [
              { title: 'Small (40px → 64px)', value: 'text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem]' },
              { title: 'Medium (44px → 72px)', value: 'text-[2.75rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.5rem]' },
              { title: 'Large ⭐ (48px → 80px)', value: 'text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]' },
              { title: 'Extra Large (56px → 96px)', value: 'text-[3.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] xl:text-[6rem]' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]',
        },
        {
          name: 'tagline',
          type: 'text',
          title: 'Tagline',
          rows: 2,
          initialValue: 'Innovative Precision Machining & Manufacturing Excellence Since 1995',
          fieldset: 'copy',
        },
        {
          name: 'slides',
          type: 'array',
          title: 'Hero Slides',
          fieldset: 'slides',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'caption',
                  subtitle: 'image.alt',
                  media: 'image',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, media, enabled}: any) {
                  const status = enabled === false ? ' (HIDDEN)' : '';
                  return {
                    title: `${title || subtitle || 'Hero Slide'}${status}`,
                    subtitle: subtitle ? `Alt: ${subtitle}` : undefined,
                    media,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this slide without deleting it',
                  initialValue: true,
                },
                {
                  name: 'image',
                  type: 'image',
                  title: 'Slide Image',
                  description: 'Hero carousel slide image (recommended: 1920x1080px)',
                  options: {
                    hotspot: true,
                    metadata: ['blurhash', 'lqip', 'palette'],
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                      description: 'Describe the image for accessibility',
                      validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption'
                    }
                  ]
                },
              ],
            },
          ],
        },
        {
          name: 'badges',
          type: 'array',
          title: 'Badges',
          fieldset: 'badges',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'text',
                  enabled: 'enabled',
                },
                prepare({title, enabled}: any) {
                  const status = enabled === false ? ' (HIDDEN)' : '';
                  return {
                    title: `${title || 'Badge'}${status}`,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this badge without deleting it',
                  initialValue: true,
                },
                {
                  name: 'text',
                  type: 'string',
                  title: 'Text',
                  validation: (Rule: any) => Rule.required(),
                },
              ],
            },
          ],
          initialValue: [
            { text: 'Advanced CNC Machining' },
            { text: 'Precision Metrology' },
            { text: 'Engineering Excellence' },
            { text: '3 Sigma Yield' },
          ],
          description: 'Capability badges shown below tagline (reference site shows 4 badges)',
        },
        {
          name: 'ctaPrimary',
          type: 'object',
          title: 'Primary CTA Button',
          fieldset: 'primaryCta',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              initialValue: 'View Capabilities',
            },
            {
              name: 'href',
              type: 'string',
              title: 'Button Link',
              initialValue: '/services',
            },
          ],
        },
        {
          name: 'ctaSecondary',
          type: 'object',
          title: 'Secondary CTA Button',
          description: 'Optional second button (hidden by default to match reference site)',
          fieldset: 'secondaryCta',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
            },
            {
              name: 'href',
              type: 'string',
              title: 'Button Link',
            },
          ],
        },
        {
          name: 'ctaTertiary',
          type: 'object',
          title: 'Tertiary CTA Button',
          description: 'Optional third button (hidden by default to match reference site)',
          fieldset: 'tertiaryCta',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
            },
            {
              name: 'href',
              type: 'string',
              title: 'Button Link',
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'object',
      title: 'Statistics Section',
      description: 'Headline metrics that reinforce credibility.',
      group: 'metrics',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'visibility', title: '👁️ Section Visibility', options: {collapsible: false}},
        {name: 'content', title: 'Section Content', options: {columns: 2}},
        {name: 'styling', title: 'Styling & Colors'},
      ],
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Statistics Section',
          description: 'Toggle to show/hide the entire Statistics section from the website',
          fieldset: 'visibility',
          initialValue: true,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Precision By The Numbers',
          fieldset: 'content',
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Section Subtitle',
          initialValue: 'Performance Metrics',
          fieldset: 'content',
        },
        {
          name: 'backgroundColor',
          type: 'string',
          title: 'Background Color',
          description: 'Section background color',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Light Gray ⭐ (Default)', value: 'bg-zinc-50' },
              { title: 'White', value: 'bg-white' },
              { title: 'Light Blue', value: 'bg-blue-50' },
              { title: 'Very Light Gray', value: 'bg-gray-100' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'bg-zinc-50',
        },
        {
          name: 'titleTextColor',
          type: 'string',
          title: 'Title Text Color',
          description: 'Section heading color',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Dark Gray ⭐ (Default)', value: 'text-zinc-900' },
              { title: 'Black', value: 'text-black' },
              { title: 'Medium Gray', value: 'text-zinc-700' },
              { title: 'Blue', value: 'text-blue-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-zinc-900',
        },
        {
          name: 'subtitleTextColor',
          type: 'string',
          title: 'Subtitle Text Color',
          description: 'Section subtitle color',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Medium Gray ⭐ (Default)', value: 'text-zinc-600' },
              { title: 'Dark Gray', value: 'text-zinc-700' },
              { title: 'Light Gray', value: 'text-zinc-500' },
              { title: 'Blue', value: 'text-blue-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-zinc-600',
        },
        {
          name: 'items',
          type: 'array',
          title: 'Statistics',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'description',
                  value: 'value',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, value, enabled}: any) {
                  const label = title;
                  const description = subtitle;
                  const details = [value, description].filter(Boolean).join(' • ');
                  const status = enabled === false ? ' (HIDDEN)' : '';
                  return {
                    title: `${label || value || 'Statistic'}${status}`,
                    subtitle: details || undefined,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this statistic without deleting it',
                  initialValue: true,
                },
                {
                  name: 'value',
                  type: 'string',
                  title: 'Stat Value',
                  description: 'The numeric value or measurement (e.g., "99.8%", "24/7", "30+")',
                },
                {
                  name: 'label',
                  type: 'string',
                  title: 'Stat Label',
                  description: 'Label describing what the stat represents (e.g., "Quality Rate", "Uptime", "Years Experience")',
                },
                {
                  name: 'description',
                  type: 'string',
                  title: 'Description',
                  description: 'Optional additional context or details about this statistic',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'servicesSection',
      type: 'object',
      title: 'Services Section',
      description: 'Content for the services section on the homepage',
      group: 'services',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'visibility', title: '👁️ Section Visibility', options: {collapsible: false}},
        {name: 'content', title: 'Section Content'},
        {name: 'styling', title: 'Styling & Colors'},
      ],
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Services Section',
          description: 'Toggle to show/hide the entire Services section from the website',
          fieldset: 'visibility',
          initialValue: true,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: 'Small text above the heading (e.g., "Our Services")',
          fieldset: 'content',
          initialValue: 'COMPREHENSIVE MANUFACTURING SOLUTIONS',
        },
        {
          name: 'headingWord1',
          type: 'string',
          title: 'Heading Word 1',
          description: 'First word of section heading (e.g., "PRECISION")',
          fieldset: 'content',
          initialValue: 'PRECISION',
        },
        {
          name: 'headingWord2',
          type: 'string',
          title: 'Heading Word 2 (Gradient)',
          description: 'Second word with gradient styling (e.g., "SERVICES")',
          fieldset: 'content',
          initialValue: 'SERVICES',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          fieldset: 'content',
          initialValue: 'Four core service pillars delivering unmatched precision and reliability',
        },
        {
          name: 'subdescription',
          type: 'string',
          title: 'Subdescription',
          fieldset: 'content',
          initialValue: 'From complex 5-axis machining to advanced metrology, our integrated services ensure your most critical components meet the strictest aerospace and defense standards',
        },
        {
          name: 'headingColor',
          type: 'string',
          title: 'Heading Color',
          description: 'Section heading text color',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Dark Gray ⭐ (Default)', value: 'text-zinc-900' },
              { title: 'Black', value: 'text-black' },
              { title: 'Medium Gray', value: 'text-zinc-700' },
              { title: 'Blue', value: 'text-blue-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-zinc-900',
        },
        {
          name: 'eyebrowColor',
          type: 'string',
          title: 'Eyebrow Color',
          description: 'Small text above heading',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Blue ⭐ (Default)', value: 'text-blue-600' },
              { title: 'Dark Blue', value: 'text-blue-700' },
              { title: 'Indigo', value: 'text-indigo-600' },
              { title: 'Dark Gray', value: 'text-zinc-700' },
              { title: 'Medium Gray', value: 'text-zinc-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-blue-600',
        },
        {
          name: 'cta',
          type: 'object',
          title: 'Call to Action Button',
          description: 'CTA button displayed below the services grid',
          fieldset: 'content',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Show CTA Button',
              description: 'Toggle to show/hide the CTA button below services',
              initialValue: true,
            },
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              initialValue: 'Get Quote',
            },
            {
              name: 'href',
              type: 'string',
              title: 'Button URL',
              initialValue: '/contact',
            },
            {
              name: 'variant',
              type: 'string',
              title: 'Button Style',
              options: {
                list: [
                  { title: 'Primary (Blue Gradient)', value: 'primary' },
                  { title: 'Secondary (Outline)', value: 'secondary' },
                ],
              },
              initialValue: 'primary',
            },
          ],
        },
      ],
    },
    {
      name: 'industriesSection',
      type: 'object',
      title: 'Industries Section',
      description: 'Content for the industries section on the homepage',
      group: 'services',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'visibility', title: '👁️ Section Visibility', options: {collapsible: false}},
        {name: 'content', title: 'Section Content'},
        {name: 'styling', title: 'Styling & Colors'},
      ],
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Industries Section',
          description: 'Toggle to show/hide the entire Industries section from the website',
          fieldset: 'visibility',
          initialValue: true,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: 'Small text above the heading (e.g., "Industries We Serve")',
          fieldset: 'content',
        },
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
          fieldset: 'content',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          fieldset: 'content',
        },
        {
          name: 'subdescription',
          type: 'string',
          title: 'Subdescription',
          fieldset: 'content',
        },
        {
          name: 'header',
          type: 'object',
          title: 'Section Header (Advanced)',
          description: 'Advanced header configuration with gradient title support',
          fieldset: 'content',
          options: {
            collapsible: true,
            collapsed: false,
          },
          fields: [
            {
              name: 'eyebrow',
              type: 'string',
              title: 'Eyebrow',
              description: 'Small text above the main heading (e.g., "SPECIALIZED SECTOR EXPERTISE")',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title (First Part)',
              description: 'First part of the heading (e.g., "INDUSTRY")',
            },
            {
              name: 'titleHighlight',
              type: 'string',
              title: 'Title Highlight (Gradient)',
              description: 'Second part of heading with gradient styling (e.g., "LEADERS")',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              description: 'Description text below the heading',
              rows: 3,
            },
          ],
        },
        {
          name: 'headingColor',
          type: 'string',
          title: 'Heading Color',
          description: 'Section heading text color',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Dark Gray ⭐ (Default)', value: 'text-zinc-900' },
              { title: 'Black', value: 'text-black' },
              { title: 'Medium Gray', value: 'text-zinc-700' },
              { title: 'Blue', value: 'text-blue-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-zinc-900',
        },
        {
          name: 'eyebrowColor',
          type: 'string',
          title: 'Eyebrow Color',
          description: 'Small text above heading',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Blue ⭐ (Default)', value: 'text-blue-600' },
              { title: 'Dark Blue', value: 'text-blue-700' },
              { title: 'Indigo', value: 'text-indigo-600' },
              { title: 'Dark Gray', value: 'text-zinc-700' },
              { title: 'Medium Gray', value: 'text-zinc-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-blue-600',
        },
      ],
    },
    {
      name: 'technicalSpecs',
      type: 'object',
      title: 'Technical Specifications Section',
      description: 'Tile-based overview of capabilities, certifications, and differentiators.',
      group: 'metrics',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'visibility', title: '👁️ Section Visibility', options: {collapsible: false}},
        {name: 'content', title: 'Section Content'},
      ],
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Technical Specifications Section',
          description: 'Toggle to show/hide the entire Technical Specifications section from the website',
          fieldset: 'visibility',
          initialValue: true,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          description: 'Main heading for the technical specifications section',
          fieldset: 'content',
          initialValue: 'Precision By The Numbers',
        },
        {
          name: 'subtitle',
          type: 'text',
          rows: 2,
          title: 'Section Subtitle',
          description: 'Description text below the heading',
          fieldset: 'content',
          initialValue: 'Industry-leading capabilities backed by decades of aerospace and defense manufacturing expertise',
        },
        {
          name: 'specs',
          type: 'array',
          title: 'Specification Cards',
          description: 'Individual specification tiles',
          options: {
            layout: 'grid',
          },
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'description',
                  value: 'value',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, value, enabled}: any) {
                  const details = [value, subtitle].filter(Boolean).join(' • ');
                  const status = enabled === false ? ' (HIDDEN)' : '';
                  return {
                    title: `${title || value || 'Technical specification'}${status}`,
                    subtitle: details || undefined,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this specification card without deleting it',
                  initialValue: true,
                },
                {
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                  description: 'Main label for the spec (e.g., "Precision", "Capacity", "Standards")',
                },
                {
                  name: 'value',
                  type: 'string',
                  title: 'Value',
                  description: 'The specification value (e.g., "±0.0001\"", "24/7", "AS9100D")',
                },
                {
                  name: 'description',
                  type: 'string',
                  title: 'Description',
                  description: 'Additional context or details about this specification',
                },
                {
                  name: 'iconName',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name (e.g., "Gauge", "Zap", "Shield")',
                },
                {
                  name: 'gradient',
                  type: 'string',
                  title: 'Gradient Classes',
                  description: 'Tailwind gradient classes (e.g., "from-blue-600 to-indigo-600")',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'imageShowcase',
      type: 'object',
      title: 'Image Showcase Section',
      description: 'Complete image showcase section with header, images, stats, and CTA',
      group: 'showcase',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'visibility', title: '👁️ Section Visibility', options: {collapsible: false}},
        {name: 'header', title: 'Section Header', options: {columns: 2}},
        {name: 'styling', title: 'Styling & Colors'},
        {name: 'gallery', title: 'Showcase Gallery', options: {collapsible: true, collapsed: false}},
        {name: 'statTiles', title: 'Stat Tiles', options: {collapsible: true, collapsed: true}},
        {name: 'cta', title: 'Inline CTA', options: {columns: 2}},
      ],
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Image Showcase Section',
          description: 'Toggle to show/hide the entire Image Showcase section from the website',
          fieldset: 'visibility',
          initialValue: true,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'header',
          type: 'object',
          title: 'Header',
          fieldset: 'header',
          fields: [
            {
              name: 'eyebrow',
              type: 'string',
              title: 'Eyebrow',
              description: 'Small text above title (e.g., "Manufacturing Excellence")',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'titleHighlight',
              type: 'string',
              title: 'Title Highlight',
              description: 'Highlighted part of title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3,
            },
          ],
        },
        {
          name: 'backgroundColor',
          type: 'string',
          title: 'Background Color',
          description: 'Section background color',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'White ⭐ (Default)', value: 'bg-white' },
              { title: 'Light Gray', value: 'bg-zinc-50' },
              { title: 'Light Blue', value: 'bg-blue-50' },
              { title: 'Very Light Gray', value: 'bg-gray-100' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'bg-white',
        },
        {
          name: 'titleColor',
          type: 'string',
          title: 'Title Color',
          description: 'Section title text color',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Dark Gray ⭐ (Default)', value: 'text-zinc-900' },
              { title: 'Black', value: 'text-black' },
              { title: 'Medium Gray', value: 'text-zinc-700' },
              { title: 'Blue', value: 'text-blue-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-zinc-900',
        },
        {
          name: 'highlightColor',
          type: 'string',
          title: 'Title Highlight Color',
          description: 'Highlighted portion of title',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Blue ⭐ (Default)', value: 'text-blue-600' },
              { title: 'Dark Blue', value: 'text-blue-700' },
              { title: 'Indigo', value: 'text-indigo-600' },
              { title: 'Dark Gray', value: 'text-zinc-700' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-blue-600',
        },
        {
          name: 'showcaseImages',
          type: 'array',
          title: 'Showcase Images',
          fieldset: 'gallery',
          options: {
            layout: 'grid',
          },
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'category',
                  media: 'image',
                  enabled: 'enabled',
                  src: 'src',
                },
                prepare({title, subtitle, media, enabled, src}: any) {
                  const status = enabled === false ? ' (HIDDEN)' : '';
                  return {
                    title: `${title || 'Showcase image'}${status}`,
                    subtitle: subtitle || src || 'No category',
                    media,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this image from the showcase without deleting it',
                  initialValue: true,
                },
                {
                  name: 'image',
                  type: 'image',
                  title: 'Showcase Image (Sanity Asset)',
                  description: 'Upload an optimized image or provide an external URL below.',
                  options: {
                    hotspot: true,
                    metadata: ['blurhash', 'lqip', 'palette'],
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                      description: 'Used when no Alt Text is provided below.'
                    }
                  ]
                },
                {
                  name: 'src',
                  type: 'url',
                  title: 'External Image URL',
                  description: 'Optional remote image source (Unsplash, CDN, etc.)'
                },
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Short, descriptive caption for accessibility',
                  validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
                },
                {
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                  description: 'Image overlay title',
                },
                {
                  name: 'category',
                  type: 'string',
                  title: 'Category',
                  description: 'Image category/subtitle',
                },
                {
                  name: 'href',
                  type: 'string',
                  title: 'Link URL',
                  description: 'Link URL when image is clicked',
                },
              ],
            },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          title: 'Stats',
          fieldset: 'statTiles',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'value',
                  subtitle: 'label',
                  media: 'iconName',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  const status = enabled === false ? ' (HIDDEN)' : '';
                  return {
                    title: `${title || 'Stat'}${status}`,
                    subtitle,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this stat without deleting it',
                  initialValue: true,
                },
                {
                  name: 'iconName',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name (e.g., "Award", "CheckCircle", "Shield")',
                },
                {
                  name: 'value',
                  type: 'string',
                  title: 'Value',
                  description: 'Stat value (e.g., "AS9100D", "99.9%", "ITAR")',
                },
                {
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                  description: 'Label describing this stat (e.g., "Certified", "Quality", "Registered")',
                },
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'object',
          title: 'Call to Action',
          fieldset: 'cta',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 2},
            {
              name: 'buttons',
              type: 'array',
              title: 'Buttons',
              of: [
                {
                  type: 'object',
                  preview: {
                    select: {
                      title: 'text',
                      subtitle: 'href',
                      enabled: 'enabled',
                    },
                    prepare({title, subtitle, enabled}: any) {
                      return {
                        title: title || 'CTA Button',
                        subtitle: `${enabled === false ? 'Disabled • ' : ''}${subtitle || 'No link'}`,
                      }
                    },
                  },
                  fields: [
                    {
                      name: 'enabled',
                      type: 'boolean',
                      title: 'Enabled',
                      description: 'Toggle off to hide this button without deleting it',
                      initialValue: true,
                    },
                    {name: 'text', type: 'string', title: 'Text'},
                    {name: 'href', type: 'string', title: 'URL'},
                    {
                      name: 'variant',
                      type: 'string',
                      title: 'Variant',
                      options: {
                        list: [
                          {title: 'Primary', value: 'primary'},
                          {title: 'Secondary', value: 'secondary'},
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'operationalExcellence',
      type: 'object',
      title: 'Operational Excellence Section',
      description: 'Operational Excellence section highlighting quality, processes, and team',
      group: 'showcase',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'visibility', title: '👁️ Section Visibility', options: {collapsible: false}},
      ],
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Operational Excellence Section',
          description: 'Toggle to show/hide the entire Operational Excellence section from the website',
          fieldset: 'visibility',
          initialValue: true,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
          initialValue: 'OPERATIONAL EXCELLENCE',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
          initialValue: 'Proven systems and expert teams delivering consistent, superior results',
        },
        {
          name: 'benefits',
          type: 'array',
          title: 'Benefits',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  icon: 'iconName',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  const status = enabled === false ? ' (HIDDEN)' : '';
                  return {
                    title: `${title || 'Benefit'}${status}`,
                    subtitle,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this benefit without deleting it',
                  initialValue: true,
                },
                {
                  name: 'iconName',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name (e.g., "Gauge", "Workflow", "Users")',
                },
                {
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 3,
                },
              ],
            },
          ],
          initialValue: [
            {
              iconName: 'Gauge',
              title: 'Quality Control',
              description: 'Comprehensive inspection protocols and real-time process monitoring ensure every component meets exact specifications.'
            },
            {
              iconName: 'Workflow',
              title: 'Process Optimization',
              description: 'Lean manufacturing principles and continuous improvement initiatives maximize efficiency without compromising quality.'
            },
            {
              iconName: 'Users',
              title: 'Expert Team',
              description: 'Highly trained machinists, engineers, and quality professionals with decades of precision manufacturing experience.'
            }
          ],
        },
      ],
    },
    {
      name: 'resourcesSection',
      type: 'object',
      title: 'Resources Section',
      description: 'Complete resources section with header, featured series, benefits, and CTA',
      group: 'resources',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'visibility', title: '👁️ Section Visibility', options: {collapsible: false}},
        {name: 'header', title: 'Section Header', options: {columns: 2}},
        {name: 'styling', title: 'Styling & Colors'},
        {name: 'featured', title: 'Featured Series', options: {collapsible: true, collapsed: false}},
        {name: 'benefits', title: 'Benefits Grid', options: {collapsible: true, collapsed: true}},
        {name: 'cta', title: 'Resources CTA', options: {columns: 2}},
      ],
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Resources Section',
          description: 'Toggle to show/hide the entire Resources section from the website',
          fieldset: 'visibility',
          initialValue: true,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'header',
          type: 'object',
          title: 'Header',
          fieldset: 'header',
          fields: [
            {
              name: 'badge',
              type: 'string',
              title: 'Badge',
              description: 'Badge text (e.g., "Technical Resources & Knowledge Base")',
            },
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
          ],
        },
        {
          name: 'backgroundColor',
          type: 'string',
          title: 'Background Color',
          description: 'Background color for the resources section',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'White ⭐ (Default)', value: 'bg-white' },
              { title: 'Light Gray', value: 'bg-zinc-50' },
              { title: 'Very Light Gray', value: 'bg-zinc-100' },
              { title: 'Light Blue', value: 'bg-blue-50' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'bg-white',
        },
        {
          name: 'titleColor',
          type: 'string',
          title: 'Title Color',
          description: 'Color for the section title text',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Dark Gray ⭐ (Default)', value: 'text-zinc-900' },
              { title: 'Black', value: 'text-black' },
              { title: 'Medium Gray', value: 'text-zinc-700' },
              { title: 'Blue Accent', value: 'text-blue-600' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-zinc-900',
        },
        {
          name: 'badgeColor',
          type: 'string',
          title: 'Badge Color',
          description: 'Color for resource category badges',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Blue ⭐ (Default)', value: 'text-blue-600' },
              { title: 'Dark Blue', value: 'text-blue-700' },
              { title: 'Indigo', value: 'text-indigo-600' },
              { title: 'Dark Gray', value: 'text-zinc-700' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-blue-600',
        },
        {
          name: 'featuredSeries',
          type: 'array',
          title: 'Featured Series',
          fieldset: 'featured',
          options: {
            layout: 'grid',
          },
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'difficulty',
                  media: 'icon',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  const status = enabled === false ? ' (HIDDEN)' : '';
                  return {
                    title: `${title || 'Series'}${status}`,
                    subtitle: subtitle || 'Difficulty not set',
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this featured series without deleting it',
                  initialValue: true,
                },
                {
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                  description: 'Series title (e.g., "CNC Machining Fundamentals")',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'slug',
                  type: 'string',
                  title: 'Slug',
                  description: 'URL slug for the series',
                  validation: (Rule: any) => Rule.required(),
                },
                {name: 'description', type: 'text', title: 'Description', rows: 2},
                {
                  name: 'articleCount',
                  type: 'number',
                  title: 'Article Count',
                  description: 'Number of articles in the series',
                },
                {
                  name: 'readTime',
                  type: 'string',
                  title: 'Read Time',
                  description: 'Total reading time (e.g., "34 min")',
                },
                {
                  name: 'difficulty',
                  type: 'string',
                  title: 'Difficulty',
                  options: {
                    list: [
                      {title: 'Beginner', value: 'Beginner'},
                      {title: 'Intermediate', value: 'Intermediate'},
                      {title: 'Advanced', value: 'Advanced'},
                    ],
                  },
                },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icon',
                  description: 'Emoji or icon character',
                },
                {
                  name: 'gradient',
                  type: 'string',
                  title: 'Gradient',
                  description: 'Tailwind gradient classes',
                },
              ],
            },
          ],
        },
        {
          name: 'benefits',
          type: 'array',
          title: 'Benefits Grid',
          fieldset: 'benefits',
          options: {
            layout: 'grid',
          },
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  return {
                    title: title || 'Benefit',
                    subtitle: `${enabled === false ? 'Disabled • ' : ''}${subtitle || 'No description'}`,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this benefit without deleting it',
                  initialValue: true,
                },
                {
                  name: 'iconName',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name',
                },
                {name: 'title', type: 'string', title: 'Title'},
                {name: 'description', type: 'string', title: 'Description'},
              ],
            },
          ],
        },
        {
          name: 'cta',
          type: 'object',
          title: 'Call to Action',
          fieldset: 'cta',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'string', title: 'Description'},
            {
              name: 'buttons',
              type: 'array',
              title: 'Buttons',
              of: [
                {
                  type: 'object',
                  preview: {
                    select: {
                      title: 'text',
                      subtitle: 'href',
                      enabled: 'enabled',
                    },
                    prepare({title, subtitle, enabled}: any) {
                      return {
                        title: title || 'CTA Button',
                        subtitle: `${enabled === false ? 'Disabled • ' : ''}${subtitle || 'No link'}`,
                      }
                    },
                  },
                  fields: [
                    {
                      name: 'enabled',
                      type: 'boolean',
                      title: 'Enabled',
                      description: 'Toggle off to hide this button without deleting it',
                      initialValue: true,
                    },
                    {name: 'text', type: 'string', title: 'Text'},
                    {name: 'href', type: 'string', title: 'URL'},
                    {
                      name: 'variant',
                      type: 'string',
                      title: 'Variant',
                      options: {
                        list: [
                          {title: 'Primary', value: 'primary'},
                          {title: 'Secondary', value: 'secondary'},
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'additionalSeriesText',
          type: 'string',
          title: 'Additional Series Stats Text',
          description: 'Text showing total series and article count (e.g., "6 Complete Series • 21+ Technical Articles")',
          fieldset: 'featured',
          initialValue: '6 Complete Series • 21+ Technical Articles',
        },
      ],
    },
    {
      name: 'cta',
      type: 'object',
      title: 'Final Call to Action',
      description: 'Closing call-to-action band at the bottom of the page.',
      group: 'cta',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'visibility', title: '👁️ Section Visibility', options: {collapsible: false}},
        {name: 'content', title: 'Content'},
        {name: 'styling', title: 'Styling & Colors'},
        {name: 'buttons', title: 'Buttons'},
        {name: 'badges', title: 'Badges & Trust Indicators'},
      ],
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Show Final CTA Section',
          description: 'Toggle to show/hide the entire Final CTA section from the website',
          fieldset: 'visibility',
          initialValue: true,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          description: 'Main CTA heading (e.g., "Ready to Get Started?", "Let\'s Work Together")',
          fieldset: 'content',
        },
        {
          name: 'subtitle',
          type: 'text',
          title: 'Subtitle',
          description: 'Supporting text below the title explaining the value proposition or call to action',
          rows: 2,
          fieldset: 'content',
        },
        {
          name: 'backgroundColor',
          type: 'string',
          title: 'Background Style',
          description: 'Background gradient or solid color for the CTA section',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Blue Gradient ⭐ (Default)', value: 'from-blue-600 to-indigo-600' },
              { title: 'Dark Blue Gradient', value: 'from-blue-800 to-indigo-800' },
              { title: 'Dark Gradient', value: 'from-zinc-800 to-zinc-900' },
              { title: 'Indigo Gradient', value: 'from-indigo-600 to-purple-600' },
              { title: 'Solid Blue', value: 'bg-blue-600' },
              { title: 'Solid Dark', value: 'bg-zinc-900' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'from-blue-600 to-indigo-600',
        },
        {
          name: 'titleColor',
          type: 'string',
          title: 'Title Color',
          description: 'Color for the CTA title text',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'White ⭐ (Default)', value: 'text-white' },
              { title: 'Off-White', value: 'text-white/90' },
              { title: 'Light Gray', value: 'text-zinc-100' },
              { title: 'Blue Accent', value: 'text-blue-100' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-white',
        },
        {
          name: 'subtitleColor',
          type: 'string',
          title: 'Subtitle Color',
          description: 'Color for the CTA subtitle text',
          fieldset: 'styling',
          options: {
            list: [
              { title: 'Off-White ⭐ (Default)', value: 'text-white/90' },
              { title: 'White', value: 'text-white' },
              { title: 'Light Gray', value: 'text-zinc-200' },
              { title: 'Very Light', value: 'text-white/80' },
              { title: 'Custom (Advanced)', value: 'custom' }
            ]
          },
          initialValue: 'text-white/90',
        },
        {
          name: 'buttons',
          type: 'array',
          title: 'CTA Buttons',
          fieldset: 'buttons',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'href',
                  enabled: 'enabled',
                  variant: 'variant',
                },
                prepare({title, subtitle, enabled, variant}: any) {
                  const variantLabel = variant === 'secondary' ? 'Secondary' : 'Primary';
                  const status = enabled === false ? 'Disabled • ' : '';
                  return {
                    title: title || `${variantLabel} CTA`,
                    subtitle: `${status}${subtitle || 'No link'}`,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this button without deleting it',
                  initialValue: true,
                },
                {
                  name: 'text',
                  type: 'string',
                  title: 'Button Text',
                  description: 'Text displayed on the button (e.g., "Get Quote", "Contact Us", "Learn More")',
                },
                {
                  name: 'href',
                  type: 'string',
                  title: 'Button Link',
                  description: 'URL where the button links (e.g., "/contact", "/services", "https://example.com")',
                },
                {
                  name: 'variant',
                  type: 'string',
                  title: 'Button Variant',
                  options: {
                    list: [
                      {title: 'Primary', value: 'default'},
                      {title: 'Secondary', value: 'secondary'},
                    ],
                  },
                  initialValue: 'default',
                },
              ],
            },
          ],
          initialValue: [
            { text: 'Get Quote', href: '/contact', variant: 'default' },
            { text: 'Technical Specifications', href: '/compliance/supplier-requirements', variant: 'secondary' },
          ],
        },
        {
          name: 'badge',
          type: 'string',
          title: 'Top Badge Text',
          description: 'Badge shown above the CTA title',
          fieldset: 'badges',
          initialValue: '30 Years of Aerospace Excellence',
        },
        {
          name: 'certifications',
          type: 'array',
          title: 'Certification Badges',
          description: 'Small certification/quality badges shown below the buttons',
          fieldset: 'badges',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'icon',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  const status = enabled === false ? ' (HIDDEN)' : '';
                  return {
                    title: `${title || 'Certification Badge'}${status}`,
                    subtitle: `Icon: ${subtitle || 'Not set'}`,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Toggle off to hide this certification badge without deleting it',
                  initialValue: true,
                },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name (e.g., "Clock", "Shield", "Award")',
                },
                {
                  name: 'text',
                  type: 'string',
                  title: 'Badge Text',
                  description: 'Text displayed on the badge (e.g., "24/7 Production", "AS9100D")',
                },
              ],
            },
          ],
          initialValue: [
            { icon: 'Clock', text: '24/7 Production' },
            { icon: 'Shield', text: 'ITAR Registered' },
            { icon: 'Award', text: 'AS9100D' },
          ],
        },
        {
          name: 'trustMessage',
          type: 'string',
          title: 'Trust Indicator Message',
          description: 'Small text shown at the bottom indicating client trust',
          fieldset: 'badges',
          initialValue: 'Trusted by leading aerospace & defense contractors worldwide',
        },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      description: 'Search engine metadata and social sharing defaults for the homepage.',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Title shown in search results (50-60 characters recommended)',
          validation: (Rule: any) =>
            Rule.max(60).warning('Meta title should be 60 characters or less'),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description shown in search results (150-160 characters recommended)',
          rows: 3,
          validation: (Rule: any) =>
            Rule.max(160).warning('Meta description should be 160 characters or less'),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Image shown when shared on social media (1200x630px recommended)',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule: any) => Rule.required().error('Alt text is required for social sharing')
            }
          ]
        },
      ],
    },
  ],
}
