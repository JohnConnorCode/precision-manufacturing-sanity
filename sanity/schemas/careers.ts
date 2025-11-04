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
        { name: 'backgroundImage', type: 'image', title: 'Background Image', options: { hotspot: true } },
        { name: 'backgroundImageUrl', type: 'url', title: 'Background Image URL (optional)' },
        { name: 'badge', type: 'string', title: 'Badge' },
        { name: 'badgeIconName', type: 'string', title: 'Badge Icon Name' },
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'titleHighlight', type: 'string', title: 'Title Highlight' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'buttons', type: 'array', of: [{ type: 'object', fields: [
          { name: 'label', type: 'string' },
          { name: 'href', type: 'string' },
          { name: 'variant', type: 'string', options: { list: [
            { title: 'Primary', value: 'primary' },
            { title: 'Secondary', value: 'secondary' },
          ]}},
        ]}]}
      ],
    },
    {
      name: 'whyWorkHere',
      type: 'object',
      title: 'Why Work Here',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'paragraph1', type: 'text', rows: 3 },
        { name: 'paragraph2', type: 'text', rows: 3 },
        { name: 'paragraph3', type: 'text', rows: 3 },
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'imageUrl', type: 'url', title: 'Image URL (optional)' },
        { name: 'imageAlt', type: 'string' },
      ]
    },
    {
      name: 'benefits',
      type: 'object',
      title: 'Benefits',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'description', type: 'text', rows: 3 },
        { name: 'items', type: 'array', of: [{ type: 'object', fields: [
          { name: 'iconName', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'description', type: 'text', rows: 3 },
        ]}]}
      ]
    },
    {
      name: 'values',
      type: 'object',
      title: 'Company Values',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'description', type: 'text', rows: 3 },
        { name: 'items', type: 'array', of: [{ type: 'object', fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'text', rows: 3 },
        ]}]}
      ]
    },
    {
      name: 'opportunities',
      type: 'object',
      title: 'Job Opportunities',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'description', type: 'text', rows: 3 },
        { name: 'positions', type: 'array', of: [{ type: 'object', fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'text', rows: 4 },
          { name: 'type', type: 'string' },
          { name: 'location', type: 'string' },
          { name: 'link', type: 'string' },
        ]}]}
      ]
    },
    {
      name: 'cta',
      type: 'object',
      title: 'Call To Action',
      fields: [
        { name: 'heading', type: 'string' },
        { name: 'description', type: 'text', rows: 3 },
        { name: 'buttons', type: 'array', of: [{ type: 'object', fields: [
          { name: 'label', type: 'string' },
          { name: 'href', type: 'string' },
          { name: 'variant', type: 'string', options: { list: [
            { title: 'Primary', value: 'primary' },
            { title: 'Secondary', value: 'secondary' },
          ]}},
        ]}]}
      ]
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
