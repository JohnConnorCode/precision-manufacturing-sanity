export default {
  name: 'careers',
  type: 'document',
  title: 'Careers Page',
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
          options: {hotspot: true},
        },
        {
          name: 'badge',
          type: 'string',
          title: 'Badge',
        },
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
      name: 'whyWorkHere',
      type: 'array',
      title: 'Why Work Here',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
          ],
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      title: 'Benefits',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
          ],
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      title: 'Company Values',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
          ],
        },
      ],
    },
    {
      name: 'opportunities',
      type: 'array',
      title: 'Job Opportunities',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Job Title'},
            {name: 'location', type: 'string', title: 'Location'},
            {name: 'type', type: 'string', title: 'Job Type'},
            {name: 'description', type: 'text', title: 'Description', rows: 4},
          ],
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
          name: 'primaryText',
          type: 'string',
          title: 'Primary Button Text',
        },
        {
          name: 'primaryHref',
          type: 'string',
          title: 'Primary Button URL',
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
      ],
    },
  ],
}
