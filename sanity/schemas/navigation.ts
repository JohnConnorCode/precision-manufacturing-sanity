export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  __experimental_singleton: true,
  fields: [
    {
      name: 'topBar',
      type: 'object',
      title: 'Top Bar',
      fields: [
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
          description: 'Phone number displayed in top bar',
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
          description: 'Email address displayed in top bar',
          validation: (Rule: any) =>
            Rule.regex(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              {name: 'email'}
            ).warning('Please enter a valid email address'),
        },
        {
          name: 'emailLink',
          type: 'string',
          title: 'Email Link',
          description: 'mailto: link for email',
        },
        {
          name: 'certifications',
          type: 'string',
          title: 'Certifications',
          description: 'Certifications text to display',
        },
      ],
    },
    {
      name: 'menuItems',
      type: 'array',
      title: 'Menu Items',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'href',
              type: 'string',
              title: 'URL',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'children',
              type: 'array',
              title: 'Dropdown Items',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'name', type: 'string', title: 'Name'},
                    {name: 'href', type: 'string', title: 'URL'},
                    {name: 'description', type: 'string', title: 'Description'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'object',
      title: 'Call to Action Button',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Button Text',
        },
        {
          name: 'href',
          type: 'string',
          title: 'Button URL',
        },
      ],
    },
  ],
}
