export default {
  name: 'service',
  type: 'document',
  title: 'Services',
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
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Service title (e.g., "5-Axis Machining")',
      validation: (Rule: any) => Rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly identifier (auto-generated from title)',
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
      description: 'Controls whether this service appears on the website. Uncheck to hide without deleting.',
      initialValue: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      description: 'Brief description for cards and previews (150-200 characters)',
      rows: 3,
      validation: (Rule: any) => Rule.min(100).max(200).warning('Should be between 100-200 characters for optimal display'),
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      description: 'Full rich text description',
      of: [{type: 'block'}],
    },
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      fields: [
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Background Image',
          description: 'Hero background image (recommended: 1920x1080px)',
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
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Subtitle',
        },
      ],
    },
    {
      name: 'overview',
      type: 'object',
      title: 'Overview',
      fields: [
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 4,
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
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
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
          ],
        },
      ],
    },
    {
      name: 'technicalSpecs',
      type: 'array',
      title: 'Technical Specifications',
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
      name: 'equipment',
      type: 'array',
      title: 'Equipment',
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
      name: 'materials',
      type: 'array',
      title: 'Materials',
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
      name: 'processes',
      type: 'array',
      title: 'Processes',
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
        {
          name: 'noindex',
          type: 'boolean',
          title: 'Prevent Indexing',
          description: 'Prevent search engines from indexing this page',
          initialValue: false,
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Focus Keywords',
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
    },
    {
      name: 'image',
      type: 'image',
      title: 'Service Card Image',
      description: 'Image displayed on service cards (recommended: 800x600px)',
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
      initialValue: false,
    },
    {
      name: 'specs',
      type: 'array',
      title: 'Specifications',
      of: [
        {
          type: 'object',
          fields: [{name: 'spec', type: 'string', title: 'Specification'}],
        },
      ],
    },
  ],
}
