export default {
  name: 'service',
  type: 'document',
  title: 'Services',
  icon: () => '⚙️',
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}]
    },
    {
      name: 'cta',
      type: 'object',
      title: 'Call To Action',
      group: 'display',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {name: 'badge', type: 'string', title: 'Badge'},
        {name: 'title', type: 'string', title: 'Heading'},
        {name: 'description', type: 'text', title: 'Description', rows: 3},
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'text', type: 'string', title: 'Text'},
                {name: 'href', type: 'string', title: 'URL'},
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
                {name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true}
              ]
            }
          ]
        }
      ]
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
    {name: 'details', title: 'Service Details'},
    {name: 'seo', title: 'SEO & Sharing'},
    {name: 'display', title: 'Display Options'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Service title (e.g., "5-Axis Machining")',
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
      description: 'Controls whether this service appears on the website. Toggle off to hide without deleting.',
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
      name: 'icon',
      type: 'string',
      title: 'Icon Name',
      description: 'Lucide icon name (e.g., "Cog", "Cpu", "Ruler", "Wrench")',
      group: 'general',
    },
    {
      name: 'fullDescription',
      type: 'text',
      title: 'Full Description',
      description: 'Detailed description of the service',
      group: 'general',
      rows: 5,
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
          title: 'Background Image',
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
        {
          name: 'title',
          type: 'string',
          title: 'Hero Heading Override',
          fieldset: 'titles',
        },
        {
          name: 'descriptionRich',
          type: 'array',
          title: 'Description (Rich Text)',
          fieldset: 'description',
          of: [{ type: 'block' }],
        },
        {
          name: 'titleSize',
          type: 'string',
          title: 'Title Size',
          fieldset: 'sizing',
          options: { list: [
            { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' },
            { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }, { title: '2XL', value: '2xl' }, { title: '3XL', value: '3xl' }
          ] },
        },
        {
          name: 'descriptionSize',
          type: 'string',
          title: 'Description Size',
          fieldset: 'sizing',
          options: { list: [
            { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' }, { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }
          ] },
        },
        {
          name: 'buttons',
          type: 'array',
          title: 'Hero Buttons',
          description: 'Primary CTAs displayed in the hero section',
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
                { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true }
              ]
            }
          ]
        }
      ],
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
      ],
      fields: [
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 4,
          fieldset: 'descriptionContent',
        },
        {
          name: 'descriptionRich',
          type: 'array',
          title: 'Description (Rich Text)',
          fieldset: 'descriptionContent',
          of: [{ type: 'block' }],
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
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'description', type: 'string', title: 'Description'},
          ],
        },
      ],
    },
    {
      name: 'services',
      type: 'array',
      title: 'Service Offerings',
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
            {name: 'descriptionRich', type: 'array', title: 'Description (Rich Text)', of: [{ type: 'block' }]},
            {name: 'featuresLabel', type: 'string', title: 'Features Label', description: 'Defaults to \"Key Features\"'},
            {name: 'capabilitiesLabel', type: 'string', title: 'Capabilities Label', description: 'Defaults to \"Capabilities\"'},
            {name: 'iconName', type: 'string', title: 'Icon Name'},
            {
              name: 'image',
              type: 'image',
              title: 'Service Image',
              description: 'Image for this service offering',
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
              description: 'Optional external image source (e.g., Unsplash)'
            },
            {
              name: 'bullets',
              type: 'array',
              title: 'Bullet Points',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'text', type: 'string', title: 'Text'}],
                },
              ],
            },
            {
              name: 'features',
              type: 'array',
              title: 'Key Features',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'feature', type: 'string', title: 'Feature'}],
                },
              ],
            },
            {
              name: 'capabilities',
              type: 'array',
              title: 'Capabilities',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'capability', type: 'string', title: 'Capability'}],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'servicesHeading',
      type: 'string',
      title: 'Services Section Heading',
      group: 'details',
    },
    {
      name: 'servicesDescription',
      type: 'text',
      title: 'Services Section Description',
      rows: 3,
      group: 'details',
    },
    {
      name: 'servicesDescriptionRich',
      type: 'array',
      title: 'Services Description (Rich Text)',
      of: [{ type: 'block' }],
      group: 'details',
    },
    {
      name: 'applicationsHeading',
      type: 'string',
      title: 'Industry Applications Heading',
      group: 'details',
    },
    {
      name: 'applicationsDescription',
      type: 'text',
      title: 'Industry Applications Description',
      rows: 3,
      group: 'details',
    },
    {
      name: 'applicationsListLabel',
      type: 'string',
      title: 'Applications List Label',
      description: 'Defaults to \"Key Highlights\"',
      group: 'details',
    },
    {
      name: 'applications',
      type: 'array',
      title: 'Industry Applications',
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
            {name: 'timeline', type: 'string', title: 'Timeline'},
            {name: 'listLabel', type: 'string', title: 'List Label', description: 'Overrides the default label for the bullet list'},
            {
              name: 'challenges',
              type: 'array',
              title: 'Key Challenges',
              of: [
                { type: 'object', fields: [{ name: 'challenge', type: 'string', title: 'Challenge' }] }
              ]
            },
            {
              name: 'image',
              type: 'image',
              title: 'Application Image',
              options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette']
              },
              fields: [
                { name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule: any) => Rule.required() }
              ]
            },
            { name: 'imageUrl', type: 'url', title: 'External Image URL' }
          ]
        }
      ]
    },
    {
      name: 'technicalSpecs',
      type: 'array',
      title: 'Technical Specifications',
      group: 'details',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {name: 'spec', type: 'string', title: 'Specification'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'note', type: 'string', title: 'Note'},
          ],
        },
      ],
    },
    {
      name: 'process',
      type: 'array',
      title: 'Process',
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
            {name: 'descriptionRich', type: 'array', title: 'Description (Rich Text)', of: [{ type: 'block' }]},
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
      name: 'equipment',
      type: 'array',
      title: 'Equipment',
      group: 'details',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'details', type: 'string', title: 'Details'},
          ],
        },
      ],
    },
    {
      name: 'materialsHeading',
      type: 'string',
      title: 'Materials Section Heading',
      group: 'details',
    },
    {
      name: 'materialsDescription',
      type: 'text',
      title: 'Materials Section Description',
      rows: 3,
      group: 'details',
    },
    {
      name: 'materials',
      type: 'array',
      title: 'Materials',
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
            {
              name: 'types',
              type: 'array',
              title: 'Types',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'type', type: 'string', title: 'Type'}],
                },
              ],
            },
            {name: 'applications', type: 'string', title: 'Applications'},
          ],
        },
      ],
    },
    {
      name: 'qualityStandardsHeading',
      type: 'string',
      title: 'Quality Standards Heading',
      group: 'details',
    },
    {
      name: 'qualityStandardsDescription',
      type: 'text',
      title: 'Quality Standards Description',
      rows: 3,
      group: 'details',
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
            {name: 'iconName', type: 'string', title: 'Icon Name'},
          ],
        },
      ],
    },
    {
      name: 'qualityImage',
      type: 'object',
      title: 'Quality Section Image',
      description: 'Optional supporting imagery displayed beside the quality standards list.',
      group: 'details',
      fields: [
        {
          name: 'image',
          type: 'image',
          title: 'Image Asset',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility.'
            }
          ]
        },
        {
          name: 'imageUrl',
          type: 'url',
          title: 'External Image URL'
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text Override',
          description: 'Used when providing an external URL instead of uploading an asset.'
        }
      ]
    },
    {
      name: 'processHeading',
      type: 'string',
      title: 'Process Section Heading',
      group: 'details',
    },
    {
      name: 'processDescription',
      type: 'text',
      title: 'Process Section Description',
      rows: 3,
      group: 'details',
    },
    {
      name: 'processes',
      type: 'array',
      title: 'Processes',
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
      name: 'seo',
      type: 'object',
      title: 'SEO',
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
      description: 'Controls the order in which services appear (lower numbers first)',
      group: 'display',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Service Card Image',
      description: 'Image displayed on service cards (recommended: 800x600px)',
      group: 'display',
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
      name: 'highlight',
      type: 'boolean',
      title: 'Highlight',
      description: 'Highlight this service on listing pages',
      group: 'display',
      initialValue: false,
    },
    {
      name: 'specs',
      type: 'array',
      title: 'Specifications',
      group: 'display',
      of: [
        {
          type: 'object',
          fields: [{name: 'spec', type: 'string', title: 'Specification'}],
        },
      ],
    },
  ],
}
