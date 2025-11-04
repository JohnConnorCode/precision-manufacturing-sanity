export default {
  name: 'supplierRequirements',
  type: 'document',
  title: 'Supplier Requirements',
  __experimental_singleton: true,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Page Content'},
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
        {name: 'heroContent', title: 'Hero Content', options: {columns: 2}},
      ],
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          fieldset: 'heroContent',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          fieldset: 'heroContent',
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Content Sections',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Section Title'},
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [{type: 'block'}],
            },
          ],
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      title: 'Requirements',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Requirement Category'},
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
      name: 'additionalSections',
      type: 'array',
      title: 'Additional Sections',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Section Title'},
            {name: 'content', type: 'text', title: 'Content', rows: 4},
          ],
        },
      ],
    },
    {
      name: 'footerNote',
      type: 'string',
      title: 'Footer Note',
      group: 'content',
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
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
