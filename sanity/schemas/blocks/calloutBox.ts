export default {
  name: 'calloutBox',
  type: 'object',
  title: 'Callout Box',
  description: 'Highlighted callout box for important information, warnings, tips, etc.',
  fields: [
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      description: 'Style of the callout box',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Success', value: 'success' },
          { title: 'Error', value: 'error' },
          { title: 'Tip', value: 'tip' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Heading for the callout box',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      type: 'text',
      title: 'Content',
      description: 'Main content of the callout box',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      content: 'content',
    },
    prepare({ title, type, content }: any) {
      return {
        title: title || 'Callout Box',
        subtitle: `${type || 'info'} - ${content?.substring(0, 60) || ''}...`,
      };
    },
  },
};
