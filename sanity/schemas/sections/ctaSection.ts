export default {
  name: 'ctaSection',
  type: 'object',
  title: 'CTA Section',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'styling', title: 'Styling' },
  ],
  fields: [
    // Content Fields
    { name: 'title', type: 'string', title: 'Title', group: 'content' },
    { name: 'subtitle', type: 'string', title: 'Subtitle', group: 'content' },
    {
      name: 'buttons',
      type: 'array',
      title: 'Buttons',
      group: 'content',
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

    // Styling Fields
    {
      name: 'theme',
      type: 'sectionTheme',
      title: 'Section Theme',
      group: 'styling',
      description: 'Overall section styling including background and default text colors',
    },
    {
      name: 'titleColor',
      type: 'colorStyle',
      title: 'Title Color',
      group: 'styling',
      description: 'Color for the title text (overrides section theme)',
    },
    {
      name: 'subtitleColor',
      type: 'colorStyle',
      title: 'Subtitle Color',
      group: 'styling',
      description: 'Color for the subtitle text (overrides section theme)',
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
            { name: 'hoverBackgroundColor', type: 'colorStyle', title: 'Hover Background Color' },
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
            { name: 'hoverBackgroundColor', type: 'colorStyle', title: 'Hover Background Color' },
          ],
        },
      ],
    },
    {
      name: 'padding',
      type: 'string',
      title: 'Section Padding',
      group: 'styling',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Extra Large', value: 'xlarge' },
        ],
      },
      initialValue: 'large',
    },
  ],
}

