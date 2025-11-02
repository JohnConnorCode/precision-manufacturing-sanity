export default {
  name: 'industry',
  type: 'document',
  title: 'Industries',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Industry title (e.g., "Aerospace", "Defense")',
      validation: (Rule: any) => Rule.required(),
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      description: 'Brief description for cards and previews (150-200 characters)',
      rows: 3,
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
          title: 'Hero Background Image',
          description: 'Hero background image',
          options: {
            hotspot: true,
          },
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
        {
          name: 'marketSize',
          type: 'string',
          title: 'Market Size',
        },
        {
          name: 'keyDrivers',
          type: 'array',
          title: 'Key Drivers',
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
              options: {hotspot: true},
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
          options: {hotspot: true},
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
      description: 'Controls the order in which industries appear (lower numbers first)',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Industry Card Image',
      description: 'Image displayed on industry cards',
      options: {
        hotspot: true,
      },
    },
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
}
