export default {
  icon: () => '📊',
  name: 'metbase',
  type: 'document',
  title: 'Metbase Page',
  preview: {
    prepare() {
      return {
        title: 'Metbase Page',
        subtitle: 'Proprietary database software',
      }
    },
  },
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'overview', title: 'Overview'},
    {name: 'features', title: 'Features'},
    {name: 'analysis', title: 'Analysis Tool'},
    {name: 'integration', title: 'System Integration'},
    {name: 'cta', title: 'CTA'},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    // Hero Section
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      group: 'hero',
      options: {
        collapsible: true,
        collapsed: false,
      },
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
              validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
            }
          ]
        },
        {
          name: 'badge',
          type: 'string',
          title: 'Badge',
        },
        {
          name: 'badgeIconName',
          type: 'string',
          title: 'Badge Icon Name',
          description: 'Lucide icon name (e.g., "Database", "BarChart3")',
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
          description: 'Part of title to highlight in gradient',
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Subtitle',
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
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  initialValue: true,
                },
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

    // Overview Section
    {
      name: 'overview',
      type: 'object',
      title: 'Overview Section',
      group: 'overview',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 4,
        },
        {
          name: 'highlights',
          type: 'array',
          title: 'Key Highlights',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'text',
                  enabled: 'enabled',
                },
                prepare({title, enabled}: any) {
                  return {
                    title: title || 'Highlight',
                    subtitle: enabled === false ? 'Hidden' : 'Visible',
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  initialValue: true,
                },
                {name: 'text', type: 'string', title: 'Text'},
                {name: 'iconName', type: 'string', title: 'Icon Name', description: 'Lucide icon name'},
              ],
            },
          ],
        },
      ],
    },

    // Features Section
    {
      name: 'features',
      type: 'object',
      title: 'Features Section',
      group: 'features',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
        },
        {
          name: 'items',
          type: 'array',
          title: 'Features',
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
                  const status = enabled === false ? ' (Hidden)' : '';
                  return {
                    title: `${title || 'Feature'}${status}`,
                    subtitle: subtitle || 'No description',
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  initialValue: true,
                },
                {name: 'title', type: 'string', title: 'Title'},
                {name: 'description', type: 'text', title: 'Description', rows: 2},
                {name: 'iconName', type: 'string', title: 'Icon Name', description: 'Lucide icon name'},
              ],
            },
          ],
        },
      ],
    },

    // Analysis Tool Section
    {
      name: 'analysisTool',
      type: 'object',
      title: 'Analysis Tool Section',
      group: 'analysis',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
        {
          name: 'image',
          type: 'image',
          title: 'Analysis Chart Image',
          description: 'Image showing analysis capabilities (e.g., bell curve, scatter plot)',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        },
        {
          name: 'capabilities',
          type: 'array',
          title: 'Capabilities',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  initialValue: true,
                },
                {name: 'text', type: 'string', title: 'Capability'},
              ],
            },
          ],
        },
      ],
    },

    // System Integration Section
    {
      name: 'systemIntegration',
      type: 'object',
      title: 'System Integration Section',
      group: 'integration',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
        {
          name: 'image',
          type: 'image',
          title: 'System Diagram Image',
          description: 'Image showing closed-loop system integration',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        },
        {
          name: 'benefits',
          type: 'array',
          title: 'Integration Benefits',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  initialValue: true,
                },
                {name: 'title', type: 'string', title: 'Benefit Title'},
                {name: 'description', type: 'text', title: 'Description', rows: 2},
                {name: 'iconName', type: 'string', title: 'Icon Name'},
              ],
            },
          ],
        },
      ],
    },

    // Closed Loop Section
    {
      name: 'closedLoop',
      type: 'object',
      title: 'Closed-Loop System Section',
      group: 'integration',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
        {
          name: 'image',
          type: 'image',
          title: 'Closed-Loop Diagram',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        },
      ],
    },

    // CTA Section
    {
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      group: 'cta',
      options: {
        collapsible: true,
        collapsed: false,
      },
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
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  initialValue: true,
                },
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

    // SEO Section
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
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
          validation: (Rule: any) =>
            Rule.max(60).warning('Meta title should be 60 characters or less'),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
          validation: (Rule: any) =>
            Rule.max(160).warning('Meta description should be 160 characters or less'),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        },
      ],
    },
  ],
}
