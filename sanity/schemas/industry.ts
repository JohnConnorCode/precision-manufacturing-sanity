export default {
  name: 'industry',
  type: 'document',
  title: 'Industries',
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
    {name: 'builder', title: '🎨 Page Builder'},
    {name: 'legacy', title: '📦 Legacy Sections'},
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
      description: 'Controls whether this industry appears on the website. Uncheck to hide without deleting.',
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
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      description: 'Build your industry page by adding and arranging sections. Drag to reorder. Leave empty to use legacy layout.',
      group: 'builder',
      of: [
        { type: 'heroSection' },
        { type: 'statsSection' },
        { type: 'servicesSection' },
        { type: 'industriesSection' },
        { type: 'techSpecsSection' },
        { type: 'showcaseSection' },
        { type: 'resourcesSection' },
        { type: 'ctaSection' },
        { type: 'richTextSection' },
      ],
    },
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section (Legacy)',
      description: 'Legacy: Use Page Builder for new layouts.',
      group: 'legacy',
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
      name: 'overview',
      type: 'object',
      title: 'Overview (Legacy)',
      description: 'Legacy: Use Page Builder for new layouts.',
      group: 'legacy',
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
      group: 'legacy',
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
      name: 'regulatory',
      type: 'array',
      title: 'Regulatory Standards',
      group: 'legacy',
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
      name: 'applications',
      type: 'array',
      title: 'Applications',
      group: 'legacy',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
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
      group: 'legacy',
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
              description: 'Image for this component category',
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
      group: 'legacy',
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
      name: 'processBenefits',
      type: 'array',
      title: 'Process Benefits',
      group: 'legacy',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
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
    },
    {
      name: 'image',
      type: 'image',
      title: 'Industry Card Image',
      description: 'Image displayed on industry cards (recommended: 800x600px)',
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
  ],
}
