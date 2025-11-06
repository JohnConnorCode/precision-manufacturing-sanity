export default {
  name: 'heroSection',
  type: 'object',
  title: 'Hero Section',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'layout', title: 'Layout' },
    { name: 'styling', title: 'Styling' },
  ],
  fields: [
    // Content Fields
    { name: 'backgroundImageUrl', type: 'url', title: 'Background Image URL', group: 'content' },
    { name: 'imageAlt', type: 'string', title: 'Image Alt', group: 'content' },
    { name: 'badge', type: 'string', title: 'Badge', group: 'content' },
    { name: 'badgeIconName', type: 'string', title: 'Badge Icon', group: 'content' },
    { name: 'title', type: 'string', title: 'Title', group: 'content' },
    { name: 'titleHighlight', type: 'string', title: 'Title Highlight', group: 'content' },
    { name: 'description', type: 'text', rows: 3, title: 'Description', group: 'content' },
    {
      name: 'buttons',
      type: 'array',
      title: 'Buttons',
      group: 'content',
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

    // Layout Fields
    {
      name: 'alignment',
      type: 'string',
      title: 'Content Alignment',
      group: 'layout',
      options: { list: [
        { title: 'Left', value: 'left' },
        { title: 'Center', value: 'center' },
        { title: 'Right', value: 'right' },
      ] },
      initialValue: 'center'
    },
    {
      name: 'height',
      type: 'string',
      title: 'Section Height',
      group: 'layout',
      options: { list: [
        { title: 'Large', value: 'large' },
        { title: 'Full', value: 'full' },
        { title: 'Medium', value: 'medium' },
      ] },
      initialValue: 'large'
    },

    // Styling Fields
    {
      name: 'titleColor',
      type: 'colorStyle',
      title: 'Title Color',
      group: 'styling',
      description: 'Color for the main title text',
    },
    {
      name: 'titleHighlightColor',
      type: 'colorStyle',
      title: 'Title Highlight Color',
      group: 'styling',
      description: 'Color for highlighted/accent text in title',
    },
    {
      name: 'descriptionColor',
      type: 'colorStyle',
      title: 'Description Color',
      group: 'styling',
      description: 'Color for the description text',
    },
    {
      name: 'badgeStyle',
      type: 'object',
      title: 'Badge Style',
      group: 'styling',
      fields: [
        {
          name: 'textColor',
          type: 'colorStyle',
          title: 'Badge Text Color',
        },
        {
          name: 'backgroundColor',
          type: 'colorStyle',
          title: 'Badge Background Color',
        },
        {
          name: 'borderColor',
          type: 'colorStyle',
          title: 'Badge Border Color',
        },
      ],
    },
    {
      name: 'overlay',
      type: 'object',
      title: 'Background Overlay',
      group: 'styling',
      description: 'Add a color overlay on top of the background image',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enable Overlay',
          initialValue: true,
        },
        {
          name: 'color',
          type: 'colorStyle',
          title: 'Overlay Color',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    },
    {
      name: 'buttonStyles',
      type: 'object',
      title: 'Button Styles',
      group: 'styling',
      fields: [
        {
          name: 'primaryButton',
          type: 'object',
          title: 'Primary Button',
          fields: [
            { name: 'textColor', type: 'colorStyle', title: 'Text Color' },
            { name: 'backgroundColor', type: 'colorStyle', title: 'Background Color' },
            { name: 'borderColor', type: 'colorStyle', title: 'Border Color' },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'object',
          title: 'Secondary Button',
          fields: [
            { name: 'textColor', type: 'colorStyle', title: 'Text Color' },
            { name: 'backgroundColor', type: 'colorStyle', title: 'Background Color' },
            { name: 'borderColor', type: 'colorStyle', title: 'Border Color' },
          ],
        },
      ],
    },
  ],
}

