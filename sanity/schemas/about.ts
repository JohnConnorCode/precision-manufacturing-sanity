export default {
  name: 'about',
  type: 'document',
  title: 'About Page',
  __experimental_singleton: true,
  fields: [
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
              description: 'Describe the image for accessibility',
              validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
            }
          ]
        },
        { name: 'backgroundImageUrl', type: 'url', title: 'Background Image URL (optional)' },
        {
          name: 'badge',
          type: 'string',
          title: 'Badge',
        },
        {
          name: 'badgeIconName',
          type: 'string',
          title: 'Badge Icon Name',
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
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'label', type: 'string', title: 'Label'},
                {name: 'href', type: 'string', title: 'URL'},
                {name: 'variant', type: 'string', title: 'Variant', options: { list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                ]}},
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'companyStats',
      type: 'array',
      title: 'Company Statistics',
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
      name: 'story',
      type: 'object',
      title: 'Company Story',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'paragraph1',
          type: 'text',
          title: 'Paragraph 1',
          rows: 4,
        },
        {
          name: 'paragraph2',
          type: 'text',
          title: 'Paragraph 2',
          rows: 4,
        },
        {
          name: 'paragraph3',
          type: 'text',
          title: 'Paragraph 3',
          rows: 4,
        },
        {
          name: 'image',
          type: 'image',
          title: 'Story Image',
          description: 'Image for company story section',
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
        { name: 'imageUrl', type: 'url', title: 'Story Image URL (optional)' },
      ],
    },
    {
      name: 'timeline',
      type: 'object',
      title: 'Company Timeline',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'description',
          type: 'string',
          title: 'Description',
        },
        {
          name: 'milestones',
          type: 'array',
          title: 'Milestones',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'year', type: 'string', title: 'Year'},
                {name: 'title', type: 'string', title: 'Title'},
                {name: 'description', type: 'text', title: 'Description', rows: 3},
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'values',
      type: 'object',
      title: 'Company Values',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'description',
          type: 'string',
          title: 'Description',
        },
        {
          name: 'items',
          type: 'array',
          title: 'Values',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'title', type: 'string', title: 'Title'},
                {name: 'description', type: 'text', title: 'Description', rows: 3},
                {name: 'iconName', type: 'string', title: 'Icon Name'},
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
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
            {
              name: 'items',
              type: 'array',
              title: 'Items',
              of: [
                {
                  type: 'object',
                  fields: [{name: 'item', type: 'string', title: 'Item'}],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      title: 'Certifications',
      of: [
        {
          type: 'object',
          fields: [{name: 'certification', type: 'string', title: 'Certification'}],
        },
      ],
    },
    {
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
        },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'label', type: 'string', title: 'Label'},
                {name: 'href', type: 'string', title: 'URL'},
                {name: 'variant', type: 'string', title: 'Variant', options: { list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                ]}},
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
      ],
    },
  ],
}
