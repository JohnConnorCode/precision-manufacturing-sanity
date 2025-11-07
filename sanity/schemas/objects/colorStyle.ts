import { defineType } from 'sanity';

export default defineType({
  name: 'colorStyle',
  title: 'Color Style',
  type: 'object',
  fields: [
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Black', value: '#000000' },
          { title: 'White', value: '#FFFFFF' },
          { title: 'Blue', value: '#2563EB' },
          { title: 'Gray', value: '#71717A' },
        ],
      },
      description: 'Select a color from the list or enter a hex code (e.g., #2563EB)',
    },
    {
      name: 'opacity',
      title: 'Opacity',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 100,
      description: 'Opacity from 0 (transparent) to 100 (solid)',
    },
  ],
  preview: {
    select: {
      color: 'color',
      opacity: 'opacity',
    },
    prepare({ color, opacity }) {
      return {
        title: color || 'No color selected',
        subtitle: `Opacity: ${opacity || 100}%`,
      };
    },
  },
});
