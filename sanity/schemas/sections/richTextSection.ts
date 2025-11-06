export default {
  name: 'richTextSection',
  type: 'object',
  title: 'Rich Text Section',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'layout', title: 'Layout' },
    { name: 'styling', title: 'Styling' },
  ],
  fields: [
    // Content Fields
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
      title: 'Content',
      group: 'content',
    },

    // Layout Fields
    {
      name: 'container',
      type: 'string',
      title: 'Container Width',
      group: 'layout',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Narrow', value: 'narrow' },
          { title: 'Wide', value: 'wide' },
          { title: 'Full Width', value: 'full' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'padding',
      type: 'string',
      title: 'Section Padding',
      group: 'layout',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    },

    // Styling Fields
    {
      name: 'theme',
      type: 'sectionTheme',
      title: 'Section Theme',
      group: 'styling',
      description: 'Overall section styling including background',
    },
    {
      name: 'headingStyles',
      type: 'object',
      title: 'Heading Styles',
      group: 'styling',
      fields: [
        {
          name: 'h1',
          type: 'typographyStyle',
          title: 'H1 Style',
        },
        {
          name: 'h2',
          type: 'typographyStyle',
          title: 'H2 Style',
        },
        {
          name: 'h3',
          type: 'typographyStyle',
          title: 'H3 Style',
        },
        {
          name: 'h4',
          type: 'typographyStyle',
          title: 'H4 Style',
        },
      ],
    },
    {
      name: 'bodyTextStyle',
      type: 'typographyStyle',
      title: 'Body Text Style',
      group: 'styling',
      description: 'Style for paragraph text',
    },
    {
      name: 'linkStyle',
      type: 'object',
      title: 'Link Style',
      group: 'styling',
      fields: [
        {
          name: 'color',
          type: 'colorStyle',
          title: 'Link Color',
        },
        {
          name: 'hoverColor',
          type: 'colorStyle',
          title: 'Link Hover Color',
        },
        {
          name: 'underline',
          type: 'boolean',
          title: 'Underline Links',
          initialValue: true,
        },
      ],
    },
    {
      name: 'blockquoteStyle',
      type: 'object',
      title: 'Blockquote Style',
      group: 'styling',
      fields: [
        {
          name: 'textColor',
          type: 'colorStyle',
          title: 'Text Color',
        },
        {
          name: 'borderColor',
          type: 'colorStyle',
          title: 'Border Color',
        },
        {
          name: 'backgroundColor',
          type: 'colorStyle',
          title: 'Background Color',
        },
      ],
    },
    {
      name: 'codeStyle',
      type: 'object',
      title: 'Code Style',
      group: 'styling',
      fields: [
        {
          name: 'textColor',
          type: 'colorStyle',
          title: 'Text Color',
        },
        {
          name: 'backgroundColor',
          type: 'colorStyle',
          title: 'Background Color',
        },
      ],
    },
  ],
}

