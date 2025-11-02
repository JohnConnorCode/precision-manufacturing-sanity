export default {
  name: 'footer',
  type: 'document',
  title: 'Footer',
  __experimental_singleton: true,
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
      ],
    },
    {
      name: 'servicesLinks',
      type: 'array',
      title: 'Services Links',
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
      fields: [
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
          name: 'address',
          type: 'text',
          title: 'Address',
          rows: 3,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'string',
      title: 'Copyright Text',
    },
  ],
}
