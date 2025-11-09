export default {
  icon: () => '✓',
  name: 'supplierRequirements',
  type: 'document',
  title: 'Supplier Requirements',
  __experimental_singleton: true,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Content'},
    {name: 'requirements', title: 'Requirements'},
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
        {name: 'background', title: 'Background Image'},
        {name: 'content', title: 'Content', options: {columns: 2}},
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
              validation: (Rule: any) => Rule.required().error('Alt text is required')
            }
          ]
        },
        {
          name: 'badges',
          type: 'array',
          title: 'Badges',
          fieldset: 'content',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'iconName', type: 'string', title: 'Icon Name', description: 'Lucide icon name'},
                {name: 'text', type: 'string', title: 'Text'},
              ],
            },
          ],
          initialValue: [
            {iconName: 'Shield', text: 'AS9100D Certified'},
            {iconName: 'Award', text: 'ISO 9001:2015'},
            {iconName: 'Lock', text: 'ITAR Registered'}
          ]
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          fieldset: 'content',
          initialValue: 'Supplier Quality',
        },
        {
          name: 'titleHighlight',
          type: 'string',
          title: 'Title Highlight',
          fieldset: 'content',
          description: 'Text shown in blue gradient',
          initialValue: 'Requirements',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
          fieldset: 'content',
          initialValue: 'Comprehensive requirements for suppliers partnering with IIS',
        },
        {
          name: 'subtitle',
          type: 'text',
          title: 'Subtitle (Legacy)',
          rows: 2,
          fieldset: 'content',
          hidden: true,
        },
        {
          name: 'versionStatus',
          type: 'string',
          title: 'Version Status',
          fieldset: 'content',
          initialValue: 'Current Version',
        },
        {
          name: 'effectiveDate',
          type: 'string',
          title: 'Effective Date',
          fieldset: 'content',
          initialValue: 'January 2024',
        },
        {
          name: 'reviewPeriod',
          type: 'string',
          title: 'Review Period',
          fieldset: 'content',
          initialValue: 'Reviewed Annually',
        },
      ],
    },
    {
      name: 'introSection',
      type: 'object',
      title: 'Introduction Section (Legacy)',
      group: 'content',
      hidden: true,
      options: {
        collapsible: true,
        collapsed: true,
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
      ],
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Introduction Sections',
      group: 'content',
      of: [
        {
          type: 'object',
          preview: {
            select: {title: 'title', subtitle: 'number'},
            prepare({title, subtitle}: any) {
              return {title: `${subtitle}. ${title}`}
            },
          },
          fields: [
            {name: 'id', type: 'string', title: 'ID', initialValue: 'purpose'},
            {name: 'number', type: 'string', title: 'Section Number', initialValue: '1'},
            {name: 'title', type: 'string', title: 'Title', validation: (Rule: any) => Rule.required()},
            {name: 'iconName', type: 'string', title: 'Icon Name', description: 'Lucide icon name'},
            {name: 'content', type: 'text', title: 'Content', rows: 3},
            {name: 'color', type: 'string', title: 'Gradient Color', initialValue: 'blue'},
          ],
        },
      ],
      initialValue: [
        {
          id: 'purpose',
          number: '1',
          title: 'Purpose',
          iconName: 'Target',
          content: 'These requirements establish quality, delivery, and compliance standards for all suppliers.',
          color: 'blue'
        },
        {
          id: 'scope',
          number: '2',
          title: 'Scope',
          iconName: 'Globe',
          content: 'Applies to all suppliers providing materials, components, or services to IIS.',
          color: 'indigo'
        }
      ]
    },
    {
      name: 'requirements',
      type: 'array',
      title: 'Requirements',
      group: 'requirements',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
            prepare({title, subtitle}: any) {
              return {
                title: title || 'Requirement',
                subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No description',
              }
            },
          },
          fields: [
            {
              name: 'number',
              type: 'string',
              title: 'Requirement Number',
              initialValue: '1',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Requirement Title',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'iconName',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name (e.g., "Shield", "FileCheck", "Award")',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Name (Legacy)',
              hidden: true,
            },
            {
              name: 'content',
              type: 'text',
              title: 'Main Content',
              rows: 3,
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description (Legacy)',
              rows: 2,
              hidden: true,
            },
            {
              name: 'additional',
              type: 'text',
              title: 'Additional Information',
              rows: 2,
            },
            {
              name: 'list',
              type: 'array',
              title: 'List Items',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'item', type: 'text', title: 'Item', rows: 2},
                  ],
                },
              ],
            },
            {
              name: 'details',
              type: 'array',
              title: 'Details (Legacy)',
              hidden: true,
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'detail', type: 'string', title: 'Detail'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'additionalSections',
      type: 'array',
      title: 'Additional Sections',
      group: 'content',
      of: [
        {
          type: 'object',
          preview: {
            select: {title: 'title', subtitle: 'number'},
            prepare({title, subtitle}: any) {
              return {title: `${subtitle}. ${title}`}
            },
          },
          fields: [
            {name: 'number', type: 'string', title: 'Section Number'},
            {name: 'title', type: 'string', title: 'Title', validation: (Rule: any) => Rule.required()},
            {name: 'iconName', type: 'string', title: 'Icon Name', description: 'Lucide icon name'},
            {name: 'content', type: 'text', title: 'Content', rows: 3},
            {
              name: 'list',
              type: 'array',
              title: 'List Items',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'item', type: 'string', title: 'Item'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'footerNote',
      type: 'object',
      title: 'Footer Note',
      group: 'content',
      fields: [
        {name: 'iconName', type: 'string', title: 'Icon Name', description: 'Lucide icon name'},
        {name: 'heading', type: 'string', title: 'Heading'},
        {name: 'content', type: 'text', title: 'Content', rows: 3},
      ],
    },
    {
      name: 'compliance',
      type: 'object',
      title: 'Compliance Section (Legacy)',
      group: 'content',
      hidden: true,
      options: {
        collapsible: true,
        collapsed: true,
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
          name: 'certifications',
          type: 'array',
          title: 'Required Certifications',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'certification', type: 'string', title: 'Certification'},
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
      description: 'Search engine metadata and social sharing defaults.',
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
