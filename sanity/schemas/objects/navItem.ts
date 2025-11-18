export default {
  name: 'navItem',
  type: 'object',
  title: 'Navigation Item',
  preview: {
    select: {
      title: 'name',
      subtitle: 'href',
      iconPreset: 'iconPreset',
      showInHeader: 'showInHeader',
      showInFooter: 'showInFooter',
    },
    prepare(selection: any) {
      const { title, subtitle, iconPreset, showInHeader, showInFooter } = selection
      const icon = iconPreset && iconPreset !== 'none' ? `📍 ` : ''
      const locations = []
      if (showInHeader === false) locations.push('Header Hidden')
      if (showInFooter === true) locations.push('Footer')
      const locationText = locations.length > 0 ? ` • ${locations.join(', ')}` : ''
      return {
        title: `${icon}${title || 'Untitled'}${locationText}`,
        subtitle: subtitle || 'No URL set',
      }
    }
  },
  fields: [
    { name: 'name', type: 'string', title: 'Label', validation: (Rule: any) => Rule.required() },
    { name: 'href', type: 'string', title: 'URL', description: 'Internal path (/about) or full external URL' },
    { name: 'description', type: 'string', title: 'Description', description: 'Optional helper text (used in mega menu tiles)' },
    {
      name: 'iconPreset',
      type: 'string',
      title: 'Icon',
      description: 'Choose a common icon or select Custom to type any Lucide name',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Home', value: 'home' },
          { title: 'Info', value: 'info' },
          { title: 'Services', value: 'services' },
          { title: 'Industries', value: 'industries' },
          { title: 'Resources', value: 'resources' },
          { title: 'Terms', value: 'terms' },
          { title: 'Supplier Requirements', value: 'supplier-requirements' },
          { title: 'Careers', value: 'careers' },
          { title: 'Jobs', value: 'jobs' },
          { title: 'Layers', value: 'layers' },
          { title: 'Contact', value: 'contact' },
          { title: 'Phone', value: 'phone' },
          { title: 'Mail', value: 'mail' },
          { title: 'Book', value: 'book' },
          { title: 'Wrench', value: 'wrench' },
          { title: 'Building', value: 'building2' },
          { title: 'Shield', value: 'shield' },
          { title: 'File', value: 'file-text' },
          { title: 'Custom…', value: 'custom' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'none',
    },
    {
      name: 'iconName',
      type: 'string',
      title: 'Custom Icon (Lucide name)',
      hidden: ({ parent }: any) => parent?.iconPreset !== 'custom',
    },
    { name: 'linkType', type: 'string', title: 'Link Type', options: { list: [
      { title: 'Internal', value: 'internal' },
      { title: 'External', value: 'external' },
      { title: 'Anchor', value: 'anchor' },
    ] }, initialValue: 'internal' },
    { name: 'openInNewTab', type: 'boolean', title: 'Open in new tab', initialValue: false },
    { name: 'showInHeader', type: 'boolean', title: 'Show in header', initialValue: true },
    { name: 'showInMobile', type: 'boolean', title: 'Show on mobile menu', initialValue: true },
    { name: 'showInFooter', type: 'boolean', title: 'Show in footer', initialValue: false },
    {
      name: 'style',
      type: 'object',
      title: 'Style',
      fields: [
        { name: 'variant', type: 'string', title: 'Variant', options: { list: [
          { title: 'Link', value: 'link' },
          { title: 'Button — Primary', value: 'button-primary' },
          { title: 'Button — Secondary', value: 'button-secondary' },
          { title: 'Badge', value: 'badge' },
        ] }, initialValue: 'link' },
        { name: 'badgeText', type: 'string', title: 'Badge Text' },
      ],
    },
    {
      name: 'children',
      type: 'array',
      title: 'Submenu Items',
      of: [
        { type: 'navItem' },
        { type: 'navGroup' },
      ],
      options: { sortable: true },
    },
  ],
}
