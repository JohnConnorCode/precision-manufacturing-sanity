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
          name: 'title',
          type: 'string',
          title: 'Title',
          fieldset: 'content',
          initialValue: 'Supplier Requirements',
        },
        {
          name: 'subtitle',
          type: 'text',
          title: 'Subtitle',
          rows: 2,
          fieldset: 'content',
        },
      ],
    },
    {
      name: 'introSection',
      type: 'object',
      title: 'Introduction Section',
      group: 'content',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Our Supplier Requirements',
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
              name: 'title',
              type: 'string',
              title: 'Requirement Title',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 2,
            },
            {
              name: 'details',
              type: 'array',
              title: 'Details',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'detail', type: 'string', title: 'Detail'},
                  ],
                },
              ],
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name',
            },
          ],
        },
      ],
    },
    {
      name: 'compliance',
      type: 'object',
      title: 'Compliance Section',
      group: 'content',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Compliance & Certifications',
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
