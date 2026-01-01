import { iconField } from './fields/iconField';

export default {
  name: 'industry',
  type: 'document',
  title: 'Industries',
  icon: () => '✈️',
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}]
    },
    {
      title: 'Title Z-A',
      name: 'titleDesc',
      by: [{field: 'title', direction: 'desc'}]
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'image',
      published: 'published'
    },
    prepare(selection: any) {
      const {title, subtitle, media, published} = selection
      const status = published === false ? ' (HIDDEN)' : ''
      return {
        title: `${title}${status}`,
        subtitle: subtitle,
        media: media
      }
    }
  },
  groups: [
    {name: 'general', title: 'General Info', default: true},
    {name: 'hero', title: 'Hero Section'},
    {name: 'overview', title: 'Overview'},
    {name: 'details', title: 'Industry Details'},
    {name: 'seo', title: 'SEO & Sharing'},
    {name: 'display', title: 'Display Options'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Industry title (e.g., "Aerospace", "Defense")',
      group: 'general',
      validation: (Rule: any) => Rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly identifier (auto-generated from title)',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('Slug is required - click "Generate" to create from title'),
    },
    {
      name: 'published',
      type: 'boolean',
      title: 'Published',
      description: 'Controls whether this industry appears on the website. Toggle off to hide without deleting.',
      group: 'general',
      initialValue: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      description: 'Brief description for cards and previews (150-200 characters)',
      group: 'general',
      rows: 3,
      validation: (Rule: any) => Rule.min(100).max(200).warning('Should be between 100-200 characters for optimal display'),
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      description: 'Full rich text description',
      group: 'general',
      of: [{type: 'block'}],
    },
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      group: 'hero',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'background', title: 'Background Image', options: {collapsible: true, collapsed: false}},
        {name: 'titles', title: 'Titles', options: {columns: 2}},
        {name: 'description', title: 'Description'},
        {name: 'sizing', title: 'Text Sizing', options: {columns: 2}},
      ],
      fields: [
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Hero Background Image',
          description: 'Hero background image (recommended: 1920x1080px)',
          fieldset: 'background',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Describe the image for accessibility and SEO',
              validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }
          ]
        },
        { name: 'backgroundImageUrl', type: 'url', title: 'Background Image URL (optional)', fieldset: 'background' },
        {
          name: 'badge',
          type: 'string',
          title: 'Badge',
          fieldset: 'titles',
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Subtitle',
          fieldset: 'titles',
        },
        { name: 'descriptionRich', type: 'array', title: 'Description (Rich Text)', fieldset: 'description', of: [{ type: 'block' }] },
        { name: 'titleSize', type: 'string', title: 'Title Size', fieldset: 'sizing', options: { list: [
          { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' },
          { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }, { title: '2XL', value: '2xl' }, { title: '3XL', value: '3xl' }
        ] } },
        { name: 'descriptionSize', type: 'string', title: 'Description Size', fieldset: 'sizing', options: { list: [
          { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' }, { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }
        ] } },
      ],
    },
    {
      name: 'statistics',
      type: 'array',
      title: 'Key Statistics',
      description: 'Important metrics displayed prominently below the hero (e.g., "85% Aerospace Volume", "150+ Active Programs")',
      group: 'overview',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'The statistic value (e.g., "85%", "150+", "±0.0001")',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'The statistic label (e.g., "Aerospace Volume", "Active Programs")',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              description: 'Optional longer description of this statistic',
              rows: 2
            }
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label'
            },
            prepare(selection: any) {
              return {
                title: `${selection.value} - ${selection.label}`
              }
            }
          }
        }
      ]
    },
    {
      name: 'stats',
      type: 'array',
      title: 'Stats (Metrics Banner)',
      description: 'Key metrics displayed in banner below hero',
      group: 'overview',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value', validation: (Rule: any) => Rule.required() },
            { name: 'label', type: 'string', title: 'Label', validation: (Rule: any) => Rule.required() },
            { name: 'description', type: 'text', title: 'Description', rows: 2 }
          ],
          preview: {
            select: { value: 'value', label: 'label' },
            prepare(selection: any) {
              return { title: `${selection.value} - ${selection.label}` }
            }
          }
        }
      ]
    },
    {
      name: 'expertiseSectionHeading',
      type: 'string',
      title: 'Expertise Section Heading',
      description: 'Main heading for the expertise section (e.g., "Aerospace Component Expertise", "Energy Sector Expertise")',
      group: 'details',
    },
    {
      name: 'expertiseSectionDescription',
      type: 'text',
      title: 'Expertise Section Description',
      description: 'Description text below the expertise section heading',
      group: 'details',
      rows: 3,
    },
    {
      name: 'expertise',
      type: 'array',
      title: 'Component Expertise',
      description: 'Detailed component expertise sections (Engine Components, Structural, etc.)',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title', validation: (Rule: any) => Rule.required() },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            iconField('iconName', 'Icon', 'Visual icon selector for expertise section'),
            {
              name: 'image',
              type: 'image',
              title: 'Background Image',
              description: 'Background image for expertise card (REQUIRED)',
              validation: (Rule: any) => Rule.required().error('Image is required for expertise cards'),
              options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette']
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Alternative text for accessibility',
                  validation: (Rule: any) => Rule.required().error('Alt text is required')
                }
              ]
            },
            {
              name: 'imageUrl',
              type: 'url',
              title: 'External Image URL',
              description: 'Optional external image URL (if Sanity image not used)',
              validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] }).warning('Must be a valid URL starting with http:// or https://')
            },
            {
              name: 'componentsLabel',
              type: 'string',
              title: 'Components Section Label',
              description: 'Custom label for components section (defaults to "Typical Components", can override with "Applications", etc.)',
              initialValue: 'Typical Components'
            },
            {
              name: 'components',
              type: 'array',
              title: 'Typical Components',
              of: [{ type: 'string' }]
            },
            {
              name: 'materials',
              type: 'array',
              title: 'Materials',
              of: [{ type: 'string' }]
            },
            {
              name: 'requirementsLabel',
              type: 'string',
              title: 'Requirements Section Label',
              description: 'Custom label for requirements section (defaults to "Key Requirements", can override with "Key Challenges", etc.)',
              initialValue: 'Key Requirements'
            },
            {
              name: 'requirements',
              type: 'array',
              title: 'Key Requirements',
              of: [{ type: 'string' }]
            }
          ],
          preview: {
            select: { title: 'title' },
            prepare(selection: any) {
              return { title: selection.title }
            }
          }
        }
      ]
    },
    {
      name: 'certificationsSectionHeading',
      type: 'string',
      title: 'Certifications Section Heading',
      description: 'Main heading for the certifications section (e.g., "Aerospace Certifications", "Industry Standards & Compliance")',
      group: 'details',
    },
    {
      name: 'certificationsSectionDescription',
      type: 'text',
      title: 'Certifications Section Description',
      description: 'Description text below the certifications section heading',
      group: 'details',
      rows: 3,
    },
    {
      name: 'certifications',
      type: 'array',
      title: 'Certifications',
      description: 'Industry certifications (AS9100D, NADCAP, ITAR, etc.)',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title', validation: (Rule: any) => Rule.required() },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            iconField('iconName', 'Icon', 'Visual icon selector for certification')
          ],
          preview: {
            select: { title: 'title' },
            prepare(selection: any) {
              return { title: selection.title }
            }
          }
        }
      ]
    },
    {
      name: 'marketOverview',
      type: 'object',
      title: 'Market Overview',
      description: 'Market size and drivers information',
      group: 'overview',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 4 },
        {
          name: 'marketSize',
          type: 'object',
          title: 'Market Size',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'string', title: 'Description' }
          ]
        },
        {
          name: 'marketDrivers',
          type: 'object',
          title: 'Market Drivers',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            {
              name: 'drivers',
              type: 'array',
              title: 'Drivers',
              of: [{ type: 'string' }]
            }
          ]
        }
      ]
    },
    {
      name: 'overview',
      type: 'object',
      title: 'Overview',
      group: 'overview',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'descriptionContent', title: 'Description'},
        {name: 'marketInfo', title: 'Market Information'},
        {name: 'drivers', title: 'Key Drivers'},
        {name: 'challenges', title: 'Challenges'},
      ],
      fields: [
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 4,
          fieldset: 'descriptionContent',
        },
        { name: 'descriptionRich', type: 'array', title: 'Description (Rich Text)', fieldset: 'descriptionContent', of: [{ type: 'block' }] },
        {
          name: 'marketSize',
          type: 'string',
          title: 'Market Size',
          fieldset: 'marketInfo',
        },
        {
          name: 'keyDrivers',
          type: 'array',
          title: 'Key Drivers',
          fieldset: 'drivers',
          of: [
            {
              type: 'object',
              fields: [{name: 'driver', type: 'string', title: 'Driver'}],
            },
          ],
        },
        {
          name: 'challenges',
          type: 'array',
          title: 'Challenges',
          fieldset: 'challenges',
          of: [
            {
              type: 'object',
              fields: [{name: 'challenge', type: 'string', title: 'Challenge'}],
            },
          ],
        },
      ],
    },
    {
      name: 'capabilities',
      type: 'array',
      title: 'Capabilities',
      group: 'details',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'description', type: 'string', title: 'Description'},
            {
              name: 'technicalDetails',
              type: 'array',
              title: 'Technical Details',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'detail', type: 'string', title: 'Detail'}],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'regulatory',
      type: 'object',
      title: 'Regulatory & Compliance',
      group: 'details',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'certifications',
          type: 'array',
          title: 'Certifications',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', type: 'string', title: 'Name' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
                { name: 'scope', type: 'string', title: 'Scope / Coverage' },
              ],
            },
          ],
        },
        {
          name: 'standards',
          type: 'array',
          title: 'Standards & Documentation',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', type: 'string', title: 'Standard' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
                {
                  name: 'details',
                  type: 'array',
                  title: 'Details',
                  of: [
                    {
                      type: 'object',
                      fields: [{ name: 'detail', type: 'string', title: 'Detail' }],
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
      name: 'applications',
      type: 'array',
      title: 'Applications',
      group: 'details',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
            {
              name: 'features',
              type: 'array',
              title: 'Features',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'feature', type: 'string', title: 'Feature'}],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'components',
      type: 'array',
      title: 'Components',
      group: 'details',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {name: 'category', type: 'string', title: 'Category'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
            {
              name: 'image',
              type: 'image',
              title: 'Component Image',
              description: 'Image for this component category (REQUIRED)',
              validation: (Rule: any) => Rule.required().error('Image is required for component cards'),
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
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption'
                }
              ]
            },
            {
              name: 'imageUrl',
              type: 'url',
              title: 'External Image URL',
              description: 'Optional remote image source when an upload is not available',
              validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] }).warning('Must be a valid URL starting with http:// or https://')
            },
            {
              name: 'parts',
              type: 'array',
              title: 'Parts',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'part', type: 'string', title: 'Part'}],
                },
              ],
            },
            {
              name: 'materials',
              type: 'array',
              title: 'Materials',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'material', type: 'string', title: 'Material'}],
                },
              ],
            },
            {
              name: 'requirements',
              type: 'array',
              title: 'Requirements',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'requirement', type: 'string', title: 'Requirement'}],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'qualityStandards',
      type: 'array',
      title: 'Quality Standards',
      group: 'details',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
            {
              name: 'details',
              type: 'array',
              title: 'Details',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'detail', type: 'string', title: 'Detail'}],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'processBenefitsSectionHeading',
      type: 'string',
      title: 'Process Benefits Section Heading',
      description: 'Main heading for the process benefits section (e.g., "Aerospace Manufacturing Advantages", "Specialized Capabilities")',
      group: 'details',
    },
    {
      name: 'processBenefitsSectionDescription',
      type: 'text',
      title: 'Process Benefits Section Description',
      description: 'Description text below the process benefits section heading',
      group: 'details',
      rows: 3,
    },
    {
      name: 'processBenefits',
      type: 'array',
      title: 'Process Benefits / Manufacturing Advantages',
      group: 'details',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
            {
              name: 'features',
              type: 'array',
              title: 'Features',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'feature', type: 'string', title: 'Feature'}],
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
      title: 'Call-To-Action',
      group: 'details',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'text', type: 'string', title: 'Text', validation: (Rule: any) => Rule.required() },
                { name: 'href', type: 'string', title: 'URL', validation: (Rule: any) => Rule.required() },
                {
                  name: 'variant',
                  type: 'string',
                  title: 'Variant',
                  options: {
                    list: [
                      { title: 'Primary', value: 'primary' },
                      { title: 'Secondary', value: 'secondary' }
                    ]
                  }
                },
                { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      description: 'Search engine optimization settings for this industry page',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'meta', title: 'Meta Tags', options: {collapsible: true, collapsed: false}},
        {name: 'social', title: 'Social Sharing', options: {collapsible: true, collapsed: false}},
        {name: 'indexing', title: 'Indexing', options: {columns: 2}},
        {name: 'keywords', title: 'Keywords'},
      ],
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Title shown in search results (50-60 characters recommended)',
          fieldset: 'meta',
          validation: (Rule: any) =>
            Rule.max(60).warning('Meta title should be 60 characters or less'),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description shown in search results (150-160 characters recommended)',
          rows: 3,
          fieldset: 'meta',
          validation: (Rule: any) =>
            Rule.max(160).warning('Meta description should be 160 characters or less'),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Image shown when shared on social media (1200x630px recommended)',
          fieldset: 'social',
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
        {
          name: 'noindex',
          type: 'boolean',
          title: 'Prevent Indexing',
          description: 'Prevent search engines from indexing this page',
          fieldset: 'indexing',
          initialValue: false,
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Focus Keywords',
          description: 'Keywords to target for SEO (3-5 recommended)',
          fieldset: 'keywords',
          of: [
            {
              type: 'object',
              fields: [{name: 'keyword', type: 'string', title: 'Keyword'}],
            },
          ],
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Controls the order in which industries appear (lower numbers first)',
      group: 'display',
      initialValue: 0,
      validation: (Rule: any) => Rule.required().min(0).error('Order is required and must be 0 or greater'),
    },
    {
      ...iconField('iconName', 'Card Icon', 'Lucide icon name for the industry card (e.g., "Plane", "Shield", "Factory")'),
      group: 'display',
      validation: (Rule: any) => Rule.required().error('Icon name is required for card display')
    },
    {
      name: 'image',
      type: 'image',
      title: 'Industry Card Image',
      description: 'Image displayed on industry cards (recommended: 800x600px)',
      group: 'display',
      validation: (Rule: any) => Rule.required().error('Image is required for industry cards'),
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and SEO',
          validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution/Credit'
        }
      ]
    },
    {
      name: 'imageUrl',
      type: 'url',
      title: 'Industry Card Image URL',
      description: 'Optional remote image source for card display',
      group: 'display',
      validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https'] }).warning('Must be a valid URL starting with http:// or https://'),
    },
    {
      name: 'features',
      type: 'array',
      title: 'Features',
      group: 'display',
      of: [
        {
          type: 'object',
          fields: [{name: 'feature', type: 'string', title: 'Feature'}],
        },
      ],
    },
    {
      name: 'cardCtaText',
      type: 'string',
      title: 'Card CTA Button Text',
      description: 'Text for the call-to-action button on industry cards (e.g., "Learn More", "View Details", "Explore Industry")',
      group: 'display',
      initialValue: 'Learn More',
      validation: (Rule: any) => Rule.required().error('CTA button text is required for industry cards'),
    },
  ],
}
