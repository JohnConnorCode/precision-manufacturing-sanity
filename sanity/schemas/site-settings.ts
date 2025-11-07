export default {
  icon: () => '⚙️',
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_singleton: true,
  groups: [
    {name: 'announcement', title: 'Announcement Bar', default: true},
    {name: 'company', title: 'Company Information'},
    {name: 'contact', title: 'Contact Information'},
    {name: 'social', title: 'Social Media'},
    {name: 'seo', title: 'Default SEO Settings'},
  ],
  fields: [
    {
      name: 'announcement',
      type: 'object',
      title: 'Announcement Bar',
      group: 'announcement',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'messageDetails', title: 'Message & Link', options: {columns: 2}},
        {name: 'timing', title: 'Timing', options: {columns: 2}},
      ],
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: false },
        { name: 'message', type: 'string', title: 'Message', fieldset: 'messageDetails' },
        { name: 'href', type: 'string', title: 'Link URL', description: 'Optional link for the announcement', fieldset: 'messageDetails' },
        { name: 'linkText', type: 'string', title: 'Link Text', description: 'Text for the link button', fieldset: 'messageDetails' },
        { name: 'variant', type: 'string', title: 'Style', fieldset: 'messageDetails', options: { list: [
          { title: 'Info (Blue)', value: 'info' },
          { title: 'Success (Green)', value: 'success' },
          { title: 'Warning (Amber)', value: 'warning' },
          { title: 'Alert (Red)', value: 'alert' },
        ] }, initialValue: 'info' },
        { name: 'startAt', type: 'datetime', title: 'Start At', fieldset: 'timing' },
        { name: 'endAt', type: 'datetime', title: 'End At', fieldset: 'timing' },
      ],
    },
    {
      name: 'company',
      type: 'object',
      title: 'Company Information',
      group: 'company',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'identity', title: 'Identity', options: {columns: 2}},
        {name: 'description', title: 'Description'},
      ],
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Company Name',
          fieldset: 'identity',
          initialValue: 'IIS - Integrated Inspection Systems',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'legalName',
          type: 'string',
          title: 'Legal Name',
          fieldset: 'identity',
          initialValue: 'IIS Precision Manufacturing',
        },
        {
          name: 'tagline',
          type: 'string',
          title: 'Tagline',
          fieldset: 'identity',
          initialValue: 'Precision Machining & CMM Inspection Services',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Company Description',
          rows: 4,
          fieldset: 'description',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'foundingYear',
          type: 'string',
          title: 'Founding Year',
          fieldset: 'description',
          initialValue: '1993',
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
        collapsed: false,
      },
      fieldsets: [
        {name: 'primary', title: 'Primary Contact', options: {columns: 2}},
        {name: 'address', title: 'Address'},
      ],
      fields: [
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
          fieldset: 'primary',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email Address',
          fieldset: 'primary',
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
          fieldset: 'address',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'city',
          type: 'string',
          title: 'City',
          fieldset: 'address',
        },
        {
          name: 'state',
          type: 'string',
          title: 'State',
          fieldset: 'address',
        },
        {
          name: 'zip',
          type: 'string',
          title: 'ZIP Code',
          fieldset: 'address',
        },
        {
          name: 'country',
          type: 'string',
          title: 'Country',
          fieldset: 'address',
          initialValue: 'United States',
        },
      ],
    },
    {
      name: 'social',
      type: 'object',
      title: 'Social Media',
      group: 'social',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'links', title: 'Social Links'},
        {name: 'handles', title: 'Social Handles'},
      ],
      fields: [
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn URL',
          description: 'Company LinkedIn page URL',
          fieldset: 'links',
          validation: (Rule: any) => Rule.uri({
            scheme: ['http', 'https']
          }).warning('Must be a valid URL starting with http:// or https://'),
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter URL',
          description: 'Company Twitter/X profile URL',
          fieldset: 'links',
          validation: (Rule: any) => Rule.uri({
            scheme: ['http', 'https']
          }).warning('Must be a valid URL starting with http:// or https://'),
        },
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook URL',
          description: 'Company Facebook page URL',
          fieldset: 'links',
          validation: (Rule: any) => Rule.uri({
            scheme: ['http', 'https']
          }).warning('Must be a valid URL starting with http:// or https://'),
        },
        {
          name: 'twitterHandle',
          type: 'string',
          title: 'Twitter Handle',
          fieldset: 'handles',
          initialValue: '@iisprecision',
        },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'Default SEO Settings',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'meta', title: 'Meta Tags', options: {collapsible: true, collapsed: false}},
        {name: 'social', title: 'Social Sharing', options: {collapsible: true, collapsed: false}},
        {name: 'analytics', title: 'Analytics & Verification', options: {columns: 2}},
      ],
      fields: [
        {
          name: 'defaultTitle',
          type: 'string',
          title: 'Default Title',
          fieldset: 'meta',
        },
        {
          name: 'defaultDescription',
          type: 'text',
          title: 'Default Description',
          rows: 3,
          fieldset: 'meta',
        },
        {
          name: 'defaultKeywords',
          type: 'text',
          title: 'Default Keywords',
          rows: 2,
          fieldset: 'meta',
        },
        {
          name: 'defaultOgImage',
          type: 'image',
          title: 'Default Social Share Image',
          description: 'Default image for social sharing (1200x630px recommended)',
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
              description: 'Describe the image for social sharing',
              validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
            }
          ]
        },
        {
          name: 'googleAnalyticsId',
          type: 'string',
          title: 'Google Analytics ID',
          fieldset: 'analytics',
        },
        {
          name: 'googleVerificationCode',
          type: 'string',
          title: 'Google Verification Code',
          fieldset: 'analytics',
        },
      ],
    },
  ],
}
