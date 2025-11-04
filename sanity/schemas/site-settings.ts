export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_singleton: true,
  fields: [
    {
      name: 'announcement',
      type: 'object',
      title: 'Announcement Bar',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: false },
        { name: 'message', type: 'string', title: 'Message' },
        { name: 'href', type: 'string', title: 'Link URL', description: 'Optional link for the announcement' },
        { name: 'linkText', type: 'string', title: 'Link Text', description: 'Text for the link button' },
        { name: 'variant', type: 'string', title: 'Style', options: { list: [
          { title: 'Info (Blue)', value: 'info' },
          { title: 'Success (Green)', value: 'success' },
          { title: 'Warning (Amber)', value: 'warning' },
          { title: 'Alert (Red)', value: 'alert' },
        ] }, initialValue: 'info' },
        { name: 'startAt', type: 'datetime', title: 'Start At' },
        { name: 'endAt', type: 'datetime', title: 'End At' },
      ],
    },
    {
      name: 'company',
      type: 'object',
      title: 'Company Information',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Company Name',
          initialValue: 'IIS - Integrated Inspection Systems',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'legalName',
          type: 'string',
          title: 'Legal Name',
          initialValue: 'IIS Precision Manufacturing',
        },
        {
          name: 'tagline',
          type: 'string',
          title: 'Tagline',
          initialValue: 'Precision Machining & CMM Inspection Services',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Company Description',
          rows: 4,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'foundingYear',
          type: 'string',
          title: 'Founding Year',
          initialValue: '1993',
        },
      ],
    },
    {
      name: 'contact',
      type: 'object',
      title: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email Address',
          validation: (Rule: any) =>
            Rule.required().regex(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              {name: 'email'}
            ).error('A valid email address is required'),
        },
        {
          name: 'address',
          type: 'text',
          title: 'Address',
          rows: 3,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'city',
          type: 'string',
          title: 'City',
        },
        {
          name: 'state',
          type: 'string',
          title: 'State',
        },
        {
          name: 'zip',
          type: 'string',
          title: 'ZIP Code',
        },
        {
          name: 'country',
          type: 'string',
          title: 'Country',
          initialValue: 'United States',
        },
      ],
    },
    {
      name: 'social',
      type: 'object',
      title: 'Social Media',
      fields: [
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn URL',
          description: 'Company LinkedIn page URL',
          validation: (Rule: any) => Rule.uri({
            scheme: ['http', 'https']
          }).warning('Must be a valid URL starting with http:// or https://'),
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter URL',
          description: 'Company Twitter/X profile URL',
          validation: (Rule: any) => Rule.uri({
            scheme: ['http', 'https']
          }).warning('Must be a valid URL starting with http:// or https://'),
        },
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook URL',
          description: 'Company Facebook page URL',
          validation: (Rule: any) => Rule.uri({
            scheme: ['http', 'https']
          }).warning('Must be a valid URL starting with http:// or https://'),
        },
        {
          name: 'twitterHandle',
          type: 'string',
          title: 'Twitter Handle',
          initialValue: '@iisprecision',
        },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'Default SEO Settings',
      fields: [
        {
          name: 'defaultTitle',
          type: 'string',
          title: 'Default Title',
        },
        {
          name: 'defaultDescription',
          type: 'text',
          title: 'Default Description',
          rows: 3,
        },
        {
          name: 'defaultKeywords',
          type: 'text',
          title: 'Default Keywords',
          rows: 2,
        },
        {
          name: 'defaultOgImage',
          type: 'image',
          title: 'Default Social Share Image',
          description: 'Default image for social sharing (1200x630px recommended)',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Describe the image for social sharing',
              validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
            }
          ]
        },
        {
          name: 'googleAnalyticsId',
          type: 'string',
          title: 'Google Analytics ID',
        },
        {
          name: 'googleVerificationCode',
          type: 'string',
          title: 'Google Verification Code',
        },
      ],
    },
  ],
}
