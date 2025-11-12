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
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'href', type: 'string', title: 'URL'},
          ],
        },
      ],
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
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'href', type: 'string', title: 'URL'},
          ],
        },
      ],
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
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'href', type: 'string', title: 'URL'},
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
  ],
}
