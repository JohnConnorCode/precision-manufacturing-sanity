import { defineType } from 'sanity';

export default defineType({
  name: 'typographyStyle',
  title: 'Typography Style',
  type: 'object',
  fields: [
    {
      name: 'textColor',
      title: 'Text Color',
      type: 'colorStyle',
      description: 'Color and opacity for text',
    },
    {
      name: 'fontSize',
      title: 'Font Size',
      type: 'string',
      options: {
        list: [
          { title: 'Extra Small (xs)', value: 'xs' },
          { title: 'Small (sm)', value: 'sm' },
          { title: 'Base', value: 'base' },
          { title: 'Large (lg)', value: 'lg' },
          { title: 'Extra Large (xl)', value: 'xl' },
          { title: '2XL', value: '2xl' },
          { title: '3XL', value: '3xl' },
          { title: '4XL', value: '4xl' },
          { title: '5XL', value: '5xl' },
          { title: '6XL', value: '6xl' },
        ],
      },
      initialValue: 'base',
    },
    {
      name: 'fontWeight',
      title: 'Font Weight',
      type: 'string',
      options: {
        list: [
          { title: 'Normal', value: 'normal' },
          { title: 'Medium', value: 'medium' },
          { title: 'Semibold', value: 'semibold' },
          { title: 'Bold', value: 'bold' },
          { title: 'Extra Bold', value: 'extrabold' },
        ],
      },
      initialValue: 'normal',
    },
  ],
});
