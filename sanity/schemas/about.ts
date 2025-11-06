export default {
  name: 'about',
  type: 'document',
  title: 'About Page',
  __experimental_singleton: true,
  groups: [
    {name: 'builder', title: '🎨 Page Builder', default: true},
    {name: 'legacy', title: '📦 Legacy Fields'},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    {
      name: 'sections',
      type: 'array',
      title: 'Page Sections',
      description: 'Build your about page using the page builder. Drag to reorder sections. Leave empty to use legacy layout.',
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
      title: 'Hero Section',
      group: 'legacy',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'background', title: 'Background Image', options: {collapsible: true, collapsed: false}},
        {name: 'badgeInfo', title: 'Badge Information', options: {columns: 2}},
        {name: 'titles', title: 'Titles', options: {columns: 2}},
        {name: 'description', title: 'Description'},
        {name: 'ctaButtons', title: 'Call to Action Buttons'},
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
              description: 'Describe the image for accessibility',
              validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
            }
          ]
        },
        { name: 'backgroundImageUrl', type: 'url', title: 'Background Image URL (optional)', fieldset: 'background' },
        {
          name: 'badge',
          type: 'string',
          title: 'Badge',
          fieldset: 'badgeInfo',
        },
        {
          name: 'badgeIconName',
          type: 'string',
          title: 'Badge Icon Name',
          fieldset: 'badgeInfo',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          fieldset: 'titles',
        },
        {
          name: 'titleHighlight',
          type: 'string',
          title: 'Title Highlight',
          fieldset: 'titles',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          fieldset: 'description',
        },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          fieldset: 'ctaButtons',
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
      name: 'story',
      type: 'object',
      title: 'Company Story',
      group: 'legacy',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'text', title: 'Story Text'},
        {name: 'image', title: 'Story Image'},
      ],
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
          fieldset: 'text',
        },
        {
          name: 'paragraph2',
          type: 'text',
          title: 'Paragraph 2',
          rows: 4,
          fieldset: 'text',
        },
        {
          name: 'paragraph3',
          type: 'text',
          title: 'Paragraph 3',
          rows: 4,
          fieldset: 'text',
        },
        {
          name: 'image',
          type: 'image',
          title: 'Story Image',
          description: 'Image for company story section',
          fieldset: 'image',
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
        { name: 'imageUrl', type: 'url', title: 'Story Image URL (optional)', fieldset: 'image' },
      ],
    },
    {
      name: 'timeline',
      type: 'object',
      title: 'Company Timeline',
      group: 'legacy',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
      group: 'legacy',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
      group: 'legacy',
      options: {
        collapsible: true,
        collapsed: true,
      },
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
      group: 'legacy',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'content', title: 'Content', options: {columns: 2}},
        {name: 'buttons', title: 'Buttons'},
      ],
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          fieldset: 'content',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
          fieldset: 'content',
        },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          fieldset: 'buttons',
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
      description: 'Search engine metadata and social sharing defaults for the About page.',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'meta', title: 'Meta Tags', options: {collapsible: true, collapsed: false}},
        {name: 'social', title: 'Social Sharing', options: {collapsible: true, collapsed: false}},
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
      ],
    },
  ],
}
