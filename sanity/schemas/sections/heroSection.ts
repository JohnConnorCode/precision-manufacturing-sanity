export default {
  name: 'heroSection',
  type: 'object',
  title: 'Hero Section',
  fields: [
    { name: 'backgroundImageUrl', type: 'url', title: 'Background Image URL' },
    { name: 'imageAlt', type: 'string', title: 'Image Alt' },
    { name: 'badge', type: 'string', title: 'Badge' },
    { name: 'badgeIconName', type: 'string', title: 'Badge Icon' },
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'titleHighlight', type: 'string', title: 'Title Highlight' },
    { name: 'description', type: 'text', rows: 3, title: 'Description' },
    {
      name: 'buttons',
      type: 'array',
      title: 'Buttons',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Label' },
          { name: 'href', type: 'string', title: 'URL' },
          { name: 'variant', type: 'string', title: 'Variant', options: { list: [
            { title: 'Primary', value: 'primary' },
            { title: 'Secondary', value: 'secondary' },
          ]}},
        ],
      }],
    },
    { name: 'alignment', type: 'string', title: 'Alignment', options: { list: [
      { title: 'Left', value: 'left' },
      { title: 'Center', value: 'center' },
      { title: 'Right', value: 'right' },
    ] }, initialValue: 'center' },
    { name: 'height', type: 'string', title: 'Height', options: { list: [
      { title: 'Large', value: 'large' },
      { title: 'Full', value: 'full' },
      { title: 'Medium', value: 'medium' },
    ] }, initialValue: 'large' },
  ],
}

