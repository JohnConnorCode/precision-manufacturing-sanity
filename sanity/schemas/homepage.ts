export default {
  icon: () => '🏠',
  name: 'homepage',
  type: 'document',
  title: 'Homepage',
  __experimental_singleton: true,
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
          name: 'mainTitle',
          type: 'string',
          title: 'Main Title (Legacy)',
          description: 'Legacy field - use word1/word2/word3 instead',
          initialValue: 'PRECISION MANUFACTURING',
          fieldset: 'copy',
          hidden: true,
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Subtitle (Legacy)',
          description: 'Legacy field - use word3 instead',
          initialValue: 'SERVICES',
          fieldset: 'copy',
          hidden: true,
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
                },
                prepare({title, subtitle, media}: any) {
                  return {
                    title: title || subtitle || 'Hero Slide',
                    subtitle: subtitle ? `Alt: ${subtitle}` : undefined,
                    media,
                  }
                },
              },
              fields: [
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
                },
                prepare({title}: any) {
                  return {
                    title: title || 'Badge',
                  }
                },
              },
              fields: [
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
        {name: 'content', title: 'Section Content', options: {columns: 2}},
        {name: 'styling', title: 'Styling & Colors'},
      ],
      fields: [
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
                },
                prepare({title, subtitle, value}: any) {
                  const label = title;
                  const description = subtitle;
                  const details = [value, description].filter(Boolean).join(' • ');
                  return {
                    title: label || value || 'Statistic',
                    subtitle: details || undefined,
                  }
                },
              },
              fields: [
                {
                  name: 'value',
                  type: 'string',
                  title: 'Stat Value',
                },
                {
                  name: 'label',
                  type: 'string',
                  title: 'Stat Label',
                },
                {
                  name: 'description',
                  type: 'string',
                  title: 'Description',
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
        {name: 'content', title: 'Section Content'},
        {name: 'styling', title: 'Styling & Colors'},
      ],
      fields: [
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
        {name: 'content', title: 'Section Content'},
        {name: 'styling', title: 'Styling & Colors'},
      ],
      fields: [
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
      type: 'array',
      title: 'Technical Specifications',
      description: 'Tile-based overview of capabilities, certifications, and differentiators.',
      group: 'metrics',
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
            },
            prepare({title, subtitle, value}: any) {
              const details = [value, subtitle].filter(Boolean).join(' • ');
              return {
                title: title || value || 'Technical specification',
                subtitle: details || undefined,
              }
            },
          },
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'description', type: 'string', title: 'Description'},
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
        {name: 'header', title: 'Section Header', options: {columns: 2}},
        {name: 'styling', title: 'Styling & Colors'},
        {name: 'gallery', title: 'Showcase Gallery', options: {collapsible: true, collapsed: false}},
        {name: 'statTiles', title: 'Stat Tiles', options: {collapsible: true, collapsed: true}},
        {name: 'cta', title: 'Inline CTA', options: {columns: 2}},
      ],
      fields: [
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
          name: 'images',
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
                },
                prepare({title, subtitle, media}: any) {
                  return {
                    title: title || 'Showcase image',
                    subtitle,
                    media,
                  }
                },
              },
              fields: [
                {
                  name: 'image',
                  type: 'image',
                  title: 'Showcase Image',
                  description: 'Image for showcase grid (recommended: 800x600px)',
                  options: {
                    hotspot: true,
                    metadata: ['blurhash', 'lqip', 'palette'],
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                      validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
                    }
                  ]
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
                  media: 'icon',
                },
                prepare({title, subtitle}: any) {
                  return {
                    title: title || 'Stat',
                    subtitle,
                  }
                },
              },
              fields: [
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name',
                },
                {
                  name: 'value',
                  type: 'string',
                  title: 'Value',
                  description: 'Stat value (e.g., "AS9100D", "99.9%")',
                },
                {name: 'label', type: 'string', title: 'Label'},
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
                      description: 'Uncheck to hide this button without deleting it',
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
      fields: [
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
                },
                prepare({title, subtitle}: any) {
                  return {
                    title: title || 'Benefit',
                    subtitle,
                  }
                },
              },
              fields: [
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
        {name: 'header', title: 'Section Header', options: {columns: 2}},
        {name: 'styling', title: 'Styling & Colors'},
        {name: 'featured', title: 'Featured Series', options: {collapsible: true, collapsed: false}},
        {name: 'benefits', title: 'Benefits Grid', options: {collapsible: true, collapsed: true}},
        {name: 'cta', title: 'Resources CTA', options: {columns: 2}},
      ],
      fields: [
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
                },
                prepare({title, subtitle}: any) {
                  return {
                    title: title || 'Series',
                    subtitle: subtitle || 'Difficulty not set',
                  }
                },
              },
              fields: [
                {
                  name: 'title',
                  type: 'string',
                  title: 'Title',
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
                  description: 'Uncheck to hide this benefit without deleting it',
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
                      description: 'Uncheck to hide this button without deleting it',
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
        {name: 'content', title: 'Content'},
        {name: 'styling', title: 'Styling & Colors'},
        {name: 'buttons', title: 'Buttons'},
      ],
      fields: [
        {name: 'title', type: 'string', title: 'Title', fieldset: 'content'},
        {name: 'subtitle', type: 'text', title: 'Subtitle', rows: 2, fieldset: 'content'},
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
                  description: 'Uncheck to hide this button without deleting it',
                  initialValue: true,
                },
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
