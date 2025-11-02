export default {
  name: 'supplierRequirements',
  type: 'document',
  title: 'Supplier Requirements',
  __experimental_singleton: true,
  fields: [
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
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
          rows: 3,
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Content Sections',
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
      ],
    },
  ],
}
