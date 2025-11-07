export default {
  icon: () => '📋',
  name: 'terms',
  type: 'document',
  title: 'Terms & Conditions',
  __experimental_singleton: true,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      group: 'content',
      initialValue: 'Terms & Conditions',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'lastUpdated',
      type: 'datetime',
      title: 'Last Updated',
      group: 'content',
      description: 'Date when T&Cs were last updated',
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Terms & Conditions Sections',
      group: 'content',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'heading',
            },
            prepare({title}: any) {
              return {
                title: title || 'Section',
              }
            },
          },
          fields: [
            {
              name: 'heading',
              type: 'string',
              title: 'Section Heading',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [
                {
                  type: 'block',
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                      {title: 'Code', value: 'code'},
                      {title: 'Underline', value: 'underline'},
                    ],
                    annotations: [
                      {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                          {
                            title: 'URL',
                            name: 'href',
                            type: 'url',
                          }
                        ]
                      }
                    ]
                  }
                },
              ],
            },
            {
              name: 'subsections',
              type: 'array',
              title: 'Subsections',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'subheading', type: 'string', title: 'Subheading'},
                    {
                      name: 'text',
                      type: 'text',
                      title: 'Text',
                      rows: 3,
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
