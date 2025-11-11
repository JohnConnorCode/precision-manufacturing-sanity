export default {
  icon: () => '📋',
  name: 'terms',
  type: 'document',
  title: 'Terms & Conditions',
  __experimental_singleton: true,
  preview: {
    prepare() {
      return {
        title: 'Terms & Conditions',
        subtitle: 'Legal terms, policies, and user agreements',
      }
    },
  },
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    {
      name: 'header',
      type: 'object',
      title: 'Page Header',
      group: 'content',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Terms & Conditions',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'subtitle',
          type: 'text',
          title: 'Subtitle',
          rows: 2,
          initialValue: 'Please read these terms carefully before using our services',
        },
        {
          name: 'effectiveDate',
          type: 'string',
          title: 'Effective Date',
          initialValue: 'January 1, 2024',
        },
        {
          name: 'version',
          type: 'string',
          title: 'Version',
          initialValue: 'v2.1',
        },
      ],
    },
    {
      name: 'title',
      type: 'string',
      title: 'Page Title (Legacy)',
      group: 'content',
      initialValue: 'Terms & Conditions',
      hidden: true,
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
              name: 'icon',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name (e.g., "FileText", "Shield", "Users")',
              initialValue: 'FileText',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Section Title',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'heading',
              type: 'string',
              title: 'Section Heading (Legacy)',
              hidden: true,
            },
            {
              name: 'content',
              type: 'text',
              title: 'Content',
              rows: 5,
              validation: (Rule: any) => Rule.required(),
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
      name: 'contact',
      type: 'object',
      title: 'Contact Information',
      group: 'content',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
          initialValue: 'Contact Information',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
          initialValue: 'If you have any questions about these Terms & Conditions, please contact us:',
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email Address',
          initialValue: 'legal@iismet.com',
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
          initialValue: '(555) 123-4567',
        },
        {
          name: 'department',
          type: 'string',
          title: 'Department',
          initialValue: 'Legal Department',
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
