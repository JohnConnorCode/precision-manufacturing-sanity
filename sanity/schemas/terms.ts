export default {
  name: 'terms',
  type: 'document',
  title: 'Terms & Conditions',
  icon: () => '📜',
  __experimental_singleton: true,
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'content', title: 'Page Content'},
    {name: 'contact', title: 'Contact Information'},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    {
      name: 'header',
      type: 'object',
      title: 'Header',
      group: 'header',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'headerContent', title: 'Header Content', options: {columns: 2}},
      ],
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          fieldset: 'headerContent',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          fieldset: 'headerContent',
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
      name: 'contact',
      type: 'object',
      title: 'Contact Information',
      group: 'contact',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'contactDetails', title: 'Contact Details', options: {columns: 2}},
      ],
      fields: [
        {
          name: 'email',
          type: 'string',
          title: 'Email Address',
          fieldset: 'contactDetails',
          validation: (Rule: any) =>
            Rule.regex(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              {name: 'email'}
            ).warning('Please enter a valid email address'),
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
          fieldset: 'contactDetails',
        },
      ],
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
