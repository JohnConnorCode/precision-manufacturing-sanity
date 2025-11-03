export default {
  name: 'toleranceTable',
  type: 'object',
  title: 'Tolerance Table',
  description: 'Data table for displaying manufacturing tolerances, specifications, and technical data',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Table Title',
      description: 'Title displayed above the table',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Brief description of what the table shows',
      rows: 2,
    },
    {
      name: 'headers',
      type: 'array',
      title: 'Table Headers',
      description: 'Column headers for the table',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(2).max(10),
    },
    {
      name: 'rows',
      type: 'array',
      title: 'Table Rows',
      description: 'Data rows for the table. Each row should have the same number of cells as there are headers.',
      of: [
        {
          type: 'object',
          title: 'Row',
          fields: [
            {
              name: 'cells',
              type: 'array',
              title: 'Row Cells',
              of: [{ type: 'string' }],
            },
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({ cells }: any) {
              return {
                title: cells?.[0] || 'Row',
                subtitle: cells?.slice(1).join(' | ') || '',
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      rows: 'rows',
    },
    prepare({ title, description, rows }: any) {
      return {
        title: title || 'Tolerance Table',
        subtitle: `${rows?.length || 0} rows - ${description || ''}`,
      };
    },
  },
};
