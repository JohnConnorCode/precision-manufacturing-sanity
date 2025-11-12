export default {
  icon: () => '💼',
  name: 'careers',
  type: 'document',
  title: 'Careers Page',
  preview: {
    prepare() {
      return {
        title: 'Careers Page',
        subtitle: 'Join our team - Benefits, values, and opportunities',
      }
    },
  },
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'benefits', title: 'Benefits'},
    {name: 'values', title: 'Company Values'},
    {name: 'opportunities', title: 'Job Opportunities'},
    {name: 'why', title: 'Why Work Here'},
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
      name: 'benefits',
      type: 'object',
      title: 'Benefits Section',
      group: 'benefits',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Comprehensive Benefits Package',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Section Description',
          rows: 2,
        },
        {
          name: 'items',
          type: 'array',
          title: 'Benefits',
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
                    title: `${title || 'Benefit'}${status}`,
                    subtitle: subtitle || 'No description',
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
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 2,
                },
                {
                  name: 'iconName',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name (e.g., "Heart", "Users", "Zap")',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'values',
      type: 'object',
      title: 'Company Values Section',
      group: 'values',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Our Values',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Section Description',
          rows: 2,
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
                  subtitle: 'description',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  const status = enabled === false ? ' (Hidden)' : '';
                  return {
                    title: `${title || 'Value'}${status}`,
                    subtitle: subtitle || 'No description',
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
                  rows: 2,
                },
                {
                  name: 'iconName',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name',
                },
              ],
            },
          ],
        },
      ],
    },
    // Legacy fields (deprecated but kept for backward compatibility)
    {
      name: 'heading',
      type: 'string',
      title: 'Heading (Legacy)',
      description: '⚠️ Deprecated: Use opportunities.title instead',
      group: 'opportunities',
      hidden: true,
    },
    {
      name: 'positions',
      type: 'array',
      title: 'Positions (Legacy)',
      description: '⚠️ Deprecated: Use opportunities.jobs instead',
      group: 'opportunities',
      hidden: true,
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Job Title'},
            {name: 'description', type: 'text', title: 'Description'},
            {name: 'location', type: 'string', title: 'Location'},
            {name: 'type', type: 'string', title: 'Employment Type'},
            {name: 'link', type: 'string', title: 'Application Link'},
          ],
        },
      ],
    },
    {
      name: 'opportunities',
      type: 'object',
      title: 'Job Opportunities',
      group: 'opportunities',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Current Opportunities',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Section Description',
          rows: 2,
        },
        {
          name: 'jobs',
          type: 'array',
          title: 'Job Listings',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'department',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  const status = enabled === false ? ' (Hidden)' : '';
                  return {
                    title: `${title || 'Job Opening'}${status}`,
                    subtitle: subtitle || 'No department',
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Uncheck to hide this job posting without deleting it',
                  initialValue: true,
                },
                {
                  name: 'title',
                  type: 'string',
                  title: 'Job Title',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'department',
                  type: 'string',
                  title: 'Department',
                },
                {
                  name: 'type',
                  type: 'string',
                  title: 'Employment Type',
                  description: 'e.g., Full-time, Part-time, Contract',
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Job Description',
                  rows: 3,
                },
                {
                  name: 'qualifications',
                  type: 'array',
                  title: 'Qualifications',
                  of: [
                    {
                      type: 'object',
                      fields: [{name: 'qualification', type: 'string', title: 'Qualification'}],
                    },
                  ],
                },
                {
                  name: 'link',
                  type: 'string',
                  title: 'Application Link or Email',
                  description: 'Where to apply (URL or email)',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'whyWorkHere',
      type: 'object',
      title: 'Why Work Here',
      group: 'why',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Section Heading',
          initialValue: 'Why Work at IIS?',
        },
        {
          name: 'paragraph1',
          type: 'text',
          title: 'Paragraph 1',
          rows: 3,
        },
        {
          name: 'paragraph2',
          type: 'text',
          title: 'Paragraph 2',
          rows: 3,
        },
        {
          name: 'paragraph3',
          type: 'text',
          title: 'Paragraph 3',
          rows: 3,
        },
        {
          name: 'image',
          type: 'image',
          title: 'Section Image',
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
          name: 'imageUrl',
          type: 'url',
          title: 'Image URL (alternative)',
          description: 'Use if you prefer to provide an external image URL'
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
      description: 'Search engine metadata and social sharing defaults for the Careers page.',
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
