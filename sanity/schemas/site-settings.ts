export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_singleton: true,
  fields: [
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
            ),
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
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter URL',
        },
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook URL',
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
          options: {hotspot: true},
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
