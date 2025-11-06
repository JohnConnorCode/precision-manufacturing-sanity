import { defineType } from 'sanity';

export default defineType({
  name: 'sectionTheme',
  title: 'Section Theme',
  type: 'object',
  fields: [
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'colorStyle',
      description: 'Background color for the entire section',
    },
    {
      name: 'backgroundGradient',
      title: 'Background Gradient',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Gradient',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'fromColor',
          title: 'From Color',
          type: 'colorStyle',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'toColor',
          title: 'To Color',
          type: 'colorStyle',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'direction',
          title: 'Direction',
          type: 'string',
          options: {
            list: [
              { title: 'Top to Bottom', value: 'to-b' },
              { title: 'Bottom to Top', value: 'to-t' },
              { title: 'Left to Right', value: 'to-r' },
              { title: 'Right to Left', value: 'to-l' },
              { title: 'Top Right', value: 'to-tr' },
              { title: 'Top Left', value: 'to-tl' },
              { title: 'Bottom Right', value: 'to-br' },
              { title: 'Bottom Left', value: 'to-bl' },
            ],
          },
          initialValue: 'to-b',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    },
    {
      name: 'textColor',
      title: 'Default Text Color',
      type: 'colorStyle',
      description: 'Default text color for this section',
    },
    {
      name: 'accentColor',
      title: 'Accent Color',
      type: 'colorStyle',
      description: 'Accent color for highlights, borders, etc.',
    },
  ],
});
