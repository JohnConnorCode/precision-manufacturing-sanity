export default {
  icon: () => '📍',
  name: 'footer',
  type: 'document',
  title: 'Footer',
  preview: {
    select: {
      company: 'company.description'
    },
    prepare(selection: any) {
      return {
        title: 'Site Footer',
        subtitle: selection.company ? selection.company.substring(0, 50) + '...' : 'Not set'
      }
    }
  },
  groups: [
    {name: 'company', title: 'Company Info', default: true},
    {name: 'links', title: 'Navigation Links'},
    {name: 'contact', title: 'Contact Info'},
    {name: 'legal', title: 'Legal & Copyright'},
  ],
  fields: [
    {
      name: 'company',
      type: 'object',
      title: 'Company Information',
      fields: [
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
        {
          name: 'foundedYear',
          type: 'string',
          title: 'Founded Year',
        },
        {
          name: 'certifications',
          type: 'string',
          title: 'Certifications',
        },
      ],
    },
    {
      name: 'social',
      type: 'object',
      title: 'Social Media Links',
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
      ],
    },
    {
      name: 'servicesHeading',
      type: 'string',
      title: 'Services Section Heading',
      description: 'Heading text for the services links section in the footer',
      group: 'links',
      initialValue: 'Services',
      validation: (Rule: any) => Rule.required().error('Services heading is required'),
    },
    {
      name: 'servicesLinks',
      type: 'array',
      title: 'Services Links',
      group: 'links',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          name: 'footerLink',
          title: 'Footer Link',
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              enabled: 'enabled',
            },
            prepare(selection: any) {
              const { title, subtitle, enabled } = selection
              const status = enabled === false ? ' (Hidden)' : ''
              return {
                title: `${title || 'Untitled Link'}${status}`,
                subtitle: subtitle || 'No URL set',
              }
            }
          },
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Toggle off to hide',
              initialValue: true,
            },
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'href', type: 'string', title: 'URL'},
          ],
        },
      ],
    },
    {
      name: 'resourcesHeading',
      type: 'string',
      title: 'Resources Section Heading',
      description: 'Heading text for the resources links section in the footer',
      group: 'links',
      initialValue: 'Resources',
      validation: (Rule: any) => Rule.required().error('Resources heading is required'),
    },
    {
      name: 'resourcesLinks',
      type: 'array',
      title: 'Resources Links',
      group: 'links',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          name: 'footerLink',
          title: 'Footer Link',
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              enabled: 'enabled',
            },
            prepare(selection: any) {
              const { title, subtitle, enabled } = selection
              const status = enabled === false ? ' (Hidden)' : ''
              return {
                title: `${title || 'Untitled Link'}${status}`,
                subtitle: subtitle || 'No URL set',
              }
            }
          },
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Toggle off to hide',
              initialValue: true,
            },
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'href', type: 'string', title: 'URL'},
          ],
        },
      ],
    },
    {
      name: 'quickLinksHeading',
      type: 'string',
      title: 'Quick Links Section Heading',
      description: 'Heading text for the quick links section in the footer',
      group: 'links',
      initialValue: 'Quick Links',
      validation: (Rule: any) => Rule.required().error('Quick Links heading is required'),
    },
    {
      name: 'quickLinks',
      type: 'array',
      title: 'Quick Links',
      group: 'links',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          name: 'footerLink',
          title: 'Footer Link',
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              enabled: 'enabled',
            },
            prepare(selection: any) {
              const { title, subtitle, enabled } = selection
              const status = enabled === false ? ' (Hidden)' : ''
              return {
                title: `${title || 'Untitled Link'}${status}`,
                subtitle: subtitle || 'No URL set',
              }
            }
          },
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Toggle off to hide',
              initialValue: true,
            },
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'href', type: 'string', title: 'URL'},
          ],
        },
      ],
    },
    {
      name: 'contactHeading',
      type: 'string',
      title: 'Contact Section Heading',
      description: 'Heading text for the contact section in the footer',
      group: 'contact',
      initialValue: 'Contact',
      validation: (Rule: any) => Rule.required().error('Contact heading is required'),
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
        {name: 'emailInfo', title: 'Email'},
        {name: 'phoneInfo', title: 'Phone'},
        {name: 'addressInfo', title: 'Address'},
      ],
      fields: [
        {
          name: 'email',
          type: 'string',
          title: 'Email Address',
          fieldset: 'emailInfo',
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
          fieldset: 'phoneInfo',
        },
        {
          name: 'phoneLink',
          type: 'string',
          title: 'Phone Link',
          description: 'tel: link for phone number',
          fieldset: 'phoneInfo',
        },
        {
          name: 'address',
          type: 'text',
          title: 'Address',
          rows: 3,
          fieldset: 'addressInfo',
        },
      ],
    },
    {
      name: 'copyright',
      type: 'string',
      title: 'Copyright Text',
      group: 'legal',
    },
    {
      name: 'certificationBadges',
      type: 'array',
      title: 'Certification Badges',
      description: 'Certification badges displayed in the footer (AS9100D, ISO 9001, ITAR, etc.)',
      group: 'company',
      of: [
        {
          type: 'object',
          name: 'certificationBadge',
          title: 'Certification Badge',
          preview: {
            select: {
              title: 'label',
              enabled: 'enabled',
            },
            prepare(selection: any) {
              const { title, enabled } = selection
              const status = enabled === false ? ' (Hidden)' : ''
              return {
                title: `${title || 'Certification'}${status}`,
              }
            }
          },
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Toggle off to hide this badge without deleting it',
              initialValue: true,
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'Certification name (e.g., "AS9100D", "ISO 9001:2015")',
              validation: (Rule: any) => Rule.required().error('Label is required'),
            },
            {
              name: 'iconName',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name (e.g., "Shield", "Award", "CheckCircle")',
              initialValue: 'Shield',
            },
            {
              name: 'iconColor',
              type: 'string',
              title: 'Icon Color',
              description: 'Tailwind color class for the icon (e.g., "text-blue-400", "text-green-400")',
              initialValue: 'text-blue-400',
            },
          ],
        },
      ],
    },
  ],
}
