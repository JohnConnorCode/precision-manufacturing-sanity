export default {
  name: 'contact',
  type: 'document',
  title: 'Contact Page',
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
          description: 'Hero background image (recommended: 1920x1080px)',
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
        {
          name: 'badge',
          type: 'string',
          title: 'Badge',
        },
        {
          name: 'badgeIconName',
          type: 'string',
          title: 'Badge Icon Name',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'titleHighlight',
          type: 'string',
          title: 'Title Highlight',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
        {
          name: 'buttonLabel',
          type: 'string',
          title: 'Button Label',
        },
        {
          name: 'buttonHref',
          type: 'string',
          title: 'Button URL',
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'object',
      title: 'Contact Information',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
        {
          name: 'addressLine1',
          type: 'string',
          title: 'Address Line 1',
        },
        {
          name: 'addressLine2',
          type: 'string',
          title: 'Address Line 2',
        },
        {
          name: 'addressLine3',
          type: 'string',
          title: 'Address Line 3',
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
        },
        {
          name: 'phoneLink',
          type: 'string',
          title: 'Phone Link',
          description: 'tel: link for phone number',
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email Address',
          validation: (Rule: any) =>
            Rule.regex(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              {name: 'email'}
            ).warning('Please enter a valid email address'),
        },
        {
          name: 'hoursLine1',
          type: 'string',
          title: 'Hours Line 1',
        },
        {
          name: 'hoursLine2',
          type: 'string',
          title: 'Hours Line 2',
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      title: 'Certifications',
      of: [
        {
          type: 'object',
          fields: [{name: 'certification', type: 'string', title: 'Certification'}],
        },
      ],
    },
    {
      name: 'bottomStats',
      type: 'array',
      title: 'Bottom Statistics',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'iconName', type: 'string', title: 'Icon Name'},
            {name: 'text', type: 'string', title: 'Text'},
            {
              name: 'animated',
              type: 'boolean',
              title: 'Animated',
              initialValue: false,
            },
          ],
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
