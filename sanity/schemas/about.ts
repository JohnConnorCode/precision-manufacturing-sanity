export default {
  icon: () => 'ℹ️',
  name: 'about',
  type: 'document',
  title: 'About Page',
  preview: {
    prepare() {
      return {
        title: 'About Page',
        subtitle: 'Our story, values, and leadership team',
      }
    },
  },
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'statsStory', title: 'Story & Stats'},
    {name: 'timeline', title: 'Timeline'},
    {name: 'values', title: 'Values & Culture'},
    {name: 'capabilities', title: 'Capabilities'},
    {name: 'certifications', title: 'Certifications'},
    {name: 'leadership', title: 'Leadership Team'},
    {name: 'cta', title: 'CTA'},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
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
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
              enabled: 'enabled',
            },
            prepare({title, subtitle, enabled}: any) {
              const status = enabled === false ? ' (Hidden)' : '';
              return {
                title: `${title || 'Stat'}${status}`,
                subtitle: subtitle || 'No label',
              }
            },
          },
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Uncheck to hide this statistic without deleting it',
              initialValue: true,
            },
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
      group: 'statsStory',
      options: {
        collapsible: true,
        collapsed: false,
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
              preview: {
                select: {
                  title: 'year',
                  subtitle: 'title',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  const status = enabled === false ? ' (Hidden)' : '';
                  return {
                    title: `${title || 'Year'}${status}`,
                    subtitle: subtitle || 'No title',
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Uncheck to hide this milestone without deleting it',
                  initialValue: true,
                },
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
              preview: {
                select: {
                  title: 'title',
                  enabled: 'enabled',
                },
                prepare({title, enabled}: any) {
                  return {
                    title: title || 'Value',
                    subtitle: enabled === false ? 'Hidden' : 'Visible',
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Uncheck to hide this value without deleting it',
                  initialValue: true,
                },
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
          preview: {
            select: {
              title: 'title',
              enabled: 'enabled',
            },
            prepare({title, enabled}: any) {
              return {
                title: title || 'Capability',
                subtitle: enabled === false ? 'Hidden' : 'Visible',
              }
            },
          },
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Uncheck to hide this capability without deleting it',
              initialValue: true,
            },
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
          preview: {
            select: {
              title: 'certification',
              enabled: 'enabled',
            },
            prepare({title, enabled}: any) {
              const status = enabled === false ? ' (Hidden)' : '';
              return {
                title: `${title || 'Certification'}${status}`,
              }
            },
          },
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Uncheck to hide this certification without deleting it',
              initialValue: true,
            },
            {name: 'certification', type: 'string', title: 'Certification'}
          ],
        },
      ],
    },
    {
      name: 'leadership',
      type: 'object',
      title: 'Leadership Team',
      group: 'leadership',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'header', title: 'Section Header'},
        {name: 'team', title: 'Team Members'},
      ],
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          fieldset: 'header',
          initialValue: 'Leadership Team',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Section Description',
          rows: 2,
          fieldset: 'header',
        },
        {
          name: 'team',
          type: 'array',
          title: 'Team Members',
          fieldset: 'team',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'title',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  const status = enabled === false ? ' (Hidden)' : '';
                  return {
                    title: `${title || 'Team Member'}${status}`,
                    subtitle: subtitle || 'Position not set',
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Uncheck to hide this team member without deleting them',
                  initialValue: true,
                },
                {
                  name: 'name',
                  type: 'string',
                  title: 'Full Name',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'title',
                  type: 'string',
                  title: 'Job Title',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'experience',
                  type: 'string',
                  title: 'Experience Summary',
                  description: 'E.g., "30+ years in precision manufacturing"',
                },
                {
                  name: 'background',
                  type: 'text',
                  title: 'Background',
                  rows: 3,
                  description: 'Professional background and accomplishments',
                },
                {
                  name: 'focus',
                  type: 'string',
                  title: 'Area of Focus',
                  description: 'E.g., "Quality & Compliance"',
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
      title: 'Call to Action',
      group: 'cta',
      options: {
        collapsible: true,
        collapsed: false,
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
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Uncheck to hide this button without deleting it',
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
