export default {
  icon: () => '🧭',
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  __experimental_singleton: true,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'styles', title: 'Styles' },
  ],
  preview: {
    select: {
      title: 'topBar.phone'
    },
    prepare(selection: any) {
      return {
        title: 'Site Navigation',
        subtitle: `Contact: ${selection.title || 'Not set'}`
      }
    }
  },
  fields: [
    {
      name: 'topBar',
      type: 'object',
      title: 'Top Bar',
      group: 'content',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'phoneInfo', title: 'Phone Information', options: {columns: 2}},
        {name: 'emailInfo', title: 'Email Information', options: {columns: 2}},
        {name: 'certifications', title: 'Certifications'},
      ],
      fields: [
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
          description: 'Phone number displayed in top bar',
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
          name: 'email',
          type: 'string',
          title: 'Email Address',
          description: 'Email address displayed in top bar',
          fieldset: 'emailInfo',
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
          fieldset: 'emailInfo',
        },
        {
          name: 'certifications',
          type: 'string',
          title: 'Certifications',
          description: 'Certifications text to display',
          fieldset: 'certifications',
        },
      ],
    },
    {
      name: 'menuItems',
      type: 'array',
      title: 'Menu Items',
      group: 'content',
      of: [
        { type: 'navItem' },
        {
          // Backward-compatible fallback for existing plain objects
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'URL' },
            {
              name: 'children',
              type: 'array',
              title: 'Submenu Items',
              of: [{ type: 'navItem' }],
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'object',
      title: 'Call to Action Button',
      group: 'content',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'buttonDetails', title: 'Button Details', options: {columns: 2}},
      ],
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Button Text',
          fieldset: 'buttonDetails',
        },
        {
          name: 'href',
          type: 'string',
          title: 'Button URL',
          fieldset: 'buttonDetails',
        },
      ],
    },
    {
      name: 'styles',
      type: 'object',
      title: 'Navigation Styles',
      group: 'styles',
      fields: [
        { name: 'theme', type: 'string', title: 'Theme', options: { list: [
          { title: 'Auto', value: 'auto' },
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ] }, initialValue: 'auto' },
        { name: 'alignment', type: 'string', title: 'Alignment', options: { list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ] }, initialValue: 'left' },
        { name: 'dropdownStyle', type: 'string', title: 'Dropdown Style', options: { list: [
          { title: 'Card', value: 'card' },
          { title: 'Columns', value: 'columns' },
        ] }, initialValue: 'card' },
        { name: 'density', type: 'string', title: 'Item Density', options: { list: [
          { title: 'Comfortable', value: 'comfortable' },
          { title: 'Compact', value: 'compact' },
        ] }, initialValue: 'comfortable' },
      ],
    },
  ],
}
