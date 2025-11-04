export default {
  name: 'ctaSection',
  type: 'object',
  title: 'CTA Section',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'subtitle', type: 'string', title: 'Subtitle' },
    {
      name: 'buttons',
      type: 'array',
      title: 'Buttons',
      of: [{
        type: 'object',
        fields: [
          { name: 'text', type: 'string', title: 'Text' },
          { name: 'href', type: 'string', title: 'URL' },
          { name: 'variant', type: 'string', title: 'Variant', options: { list: [
            { title: 'Primary', value: 'default' },
            { title: 'Secondary', value: 'secondary' },
          ] }},
        ],
      }],
    },
  ],
}

