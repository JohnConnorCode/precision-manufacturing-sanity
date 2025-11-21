export default {
  icon: () => '⚙️',
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  preview: {
    select: {
      companyName: 'company.name',
      phone: 'contact.phone',
      email: 'contact.email',
      announcementEnabled: 'announcement.enabled',
    },
    prepare(selection: any) {
      const {companyName, phone, email, announcementEnabled} = selection
      const subtitle = phone && email ? `${phone} • ${email}` : 'Global settings'
      const announcement = announcementEnabled ? ' 📢 Announcement Active' : ''
      return {
        title: `${companyName || 'Site Settings'}${announcement}`,
        subtitle: subtitle,
      }
    },
  },
  groups: [
    {name: 'announcement', title: 'Announcement Bar', default: true},
    {name: 'theme', title: 'Theme & Colors'},
    {name: 'branding', title: 'Branding & Logo'},
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
      name: 'theme',
      type: 'object',
      title: 'Brand Theme & Colors',
      group: 'theme',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'brandColors', title: 'Brand Colors', options: {columns: 2}},
        {name: 'gradients', title: 'Gradient Colors', options: {columns: 2}},
      ],
      fields: [
        {
          name: 'primaryColor',
          type: 'colorStyle',
          title: 'Primary Brand Color',
          description: 'Main brand color used for buttons, links, and accents (Default: Blue 600)',
          fieldset: 'brandColors',
        },
        {
          name: 'secondaryColor',
          type: 'colorStyle',
          title: 'Secondary Brand Color',
          description: 'Secondary color for gradients and highlights (Default: Indigo 600)',
          fieldset: 'brandColors',
        },
        {
          name: 'accentColor',
          type: 'colorStyle',
          title: 'Accent Color',
          description: 'Optional accent color for special highlights',
          fieldset: 'brandColors',
        },
        {
          name: 'gradientFrom',
          type: 'colorStyle',
          title: 'Gradient Start Color',
          description: 'Starting color for gradient backgrounds (Default: Primary Color)',
          fieldset: 'gradients',
        },
        {
          name: 'gradientTo',
          type: 'colorStyle',
          title: 'Gradient End Color',
          description: 'Ending color for gradient backgrounds (Default: Secondary Color)',
          fieldset: 'gradients',
        },
      ],
    },
    {
      name: 'logo',
      type: 'object',
      title: 'Logo Settings',
      group: 'branding',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'logoType',
          type: 'string',
          title: 'Logo Type',
          description: 'Choose which logo to display across the site',
          options: {
            list: [
              {title: 'SVG (Default - Animated, Best Performance)', value: 'svg'},
              {title: 'Custom Image Upload', value: 'custom'},
              {title: 'Original PNG (Legacy)', value: 'original'}
            ],
            layout: 'radio'
          },
          initialValue: 'svg',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'customLogo',
          type: 'image',
          title: 'Custom Logo Upload',
          description: 'Upload your own logo (PNG, SVG, JPEG). Note: Custom uploads are static (no animation).',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette']
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Describe the logo for screen readers',
              initialValue: 'IIS Logo',
              validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
            }
          ],
          hidden: ({parent}: any) => parent?.logoType !== 'custom'
        },
        {
          name: 'svgColor',
          type: 'string',
          title: 'SVG Logo Color Mode',
          description: 'Control the color of the SVG logo',
          options: {
            list: [
              {title: 'Auto (Dark in header, White in footer)', value: 'auto'},
              {title: 'Always Dark/Black', value: 'dark'},
              {title: 'Always Light/White', value: 'light'}
            ]
          },
          initialValue: 'auto',
          hidden: ({parent}: any) => parent?.logoType !== 'svg'
        },
        {
          name: 'showCompanyText',
          type: 'boolean',
          title: 'Show Company Name',
          description: 'Display "INTEGRATED INSPECTION SYSTEMS" text next to logo',
          initialValue: true
        },
        {
          name: 'enableAnimation',
          type: 'boolean',
          title: 'Enable Logo Animation',
          description: 'Animate the logo on page load (SVG only)',
          initialValue: true,
          hidden: ({parent}: any) => parent?.logoType !== 'svg'
        }
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
          name: 'alternateName',
          type: 'string',
          title: 'Alternate/Short Name',
          description: 'Short version of company name (e.g., "IIS")',
          fieldset: 'identity',
          initialValue: 'IIS',
        },
        {
          name: 'websiteUrl',
          type: 'url',
          title: 'Website URL',
          description: 'Company website URL',
          fieldset: 'identity',
          initialValue: 'https://iismet.com',
          validation: (Rule: any) => Rule.uri({
            scheme: ['http', 'https']
          }),
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
        {
          name: 'logoUrl',
          type: 'url',
          title: 'Logo URL',
          description: 'Public URL to company logo for structured data (Schema.org)',
          fieldset: 'identity',
          initialValue: 'https://iismet.com/logo.png',
          validation: (Rule: any) => Rule.uri({
            scheme: ['http', 'https']
          }),
        },
        {
          name: 'coordinates',
          type: 'object',
          title: 'Geographic Coordinates',
          description: 'Company location coordinates for structured data and maps',
          fieldset: 'description',
          fields: [
            {
              name: 'latitude',
              type: 'string',
              title: 'Latitude',
              initialValue: '45.4215',
            },
            {
              name: 'longitude',
              type: 'string',
              title: 'Longitude',
              initialValue: '-122.5701',
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
          title: 'Primary Email Address',
          description: 'General inquiries email',
          fieldset: 'primary',
          validation: (Rule: any) =>
            Rule.required().regex(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              {name: 'email'}
            ).error('A valid email address is required'),
        },
        {
          name: 'hrEmail',
          type: 'string',
          title: 'HR/Careers Email',
          description: 'Email for job applications and career inquiries',
          fieldset: 'primary',
          validation: (Rule: any) =>
            Rule.regex(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              {name: 'email'}
            ).warning('Should be a valid email address'),
        },
        {
          name: 'legalEmail',
          type: 'string',
          title: 'Legal/Compliance Email',
          description: 'Email for legal and compliance matters',
          fieldset: 'primary',
          validation: (Rule: any) =>
            Rule.regex(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              {name: 'email'}
            ).warning('Should be a valid email address'),
        },
        {
          name: 'supportEmail',
          type: 'string',
          title: 'Support Email',
          description: 'Email for customer support and technical assistance',
          fieldset: 'primary',
          initialValue: 'officemgr@iismet.com',
          validation: (Rule: any) =>
            Rule.regex(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              {name: 'email'}
            ).warning('Should be a valid email address'),
        },
        {
          name: 'address',
          type: 'text',
          title: 'Address',
          rows: 3,
          fieldset: 'address',
          initialValue: '14310 SE Industrial Way',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'city',
          type: 'string',
          title: 'City',
          fieldset: 'address',
          initialValue: 'Clackamas',
        },
        {
          name: 'state',
          type: 'string',
          title: 'State',
          fieldset: 'address',
          initialValue: 'Oregon',
        },
        {
          name: 'zip',
          type: 'string',
          title: 'ZIP Code',
          fieldset: 'address',
          initialValue: '97015',
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
          initialValue: 'https://www.linkedin.com/company/integrated-inspection-systems',
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
          initialValue: 'https://twitter.com/iismet',
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
