import { defineType } from 'sanity';

export default defineType({
  name: 'colorStyle',
  title: 'Color Style',
  type: 'object',
  fields: [
    {
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: false,
      },
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
      color: 'color.hex',
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
