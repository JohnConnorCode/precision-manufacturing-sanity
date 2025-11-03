export default {
  name: 'processFlow',
  type: 'object',
  title: 'Process Flow',
  description: 'Step-by-step process flowchart or workflow diagram',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Process Title',
      description: 'Title of the process or workflow',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Brief description of the overall process',
      rows: 2,
    },
    {
      name: 'steps',
      type: 'array',
      title: 'Process Steps',
      description: 'Sequential steps in the process',
      of: [
        {
          type: 'object',
          title: 'Step',
          fields: [
            {
              name: 'stepNumber',
              type: 'number',
              title: 'Step Number',
              description: 'Sequential number of this step',
              validation: (Rule: any) => Rule.required().positive().integer(),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Step Title',
              description: 'Title of this step',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              description: 'Detailed description of this step',
              rows: 3,
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'duration',
              type: 'string',
              title: 'Duration',
              description: 'Time required for this step (e.g., "2-4 hours", "Ongoing")',
            },
            {
              name: 'tools',
              type: 'array',
              title: 'Tools/Equipment',
              description: 'Tools or equipment used in this step',
              of: [{ type: 'string' }],
            },
            {
              name: 'qualityCheck',
              type: 'string',
              title: 'Quality Check',
              description: 'Quality control checkpoint or validation criteria',
            },
          ],
          preview: {
            select: {
              stepNumber: 'stepNumber',
              title: 'title',
              description: 'description',
            },
            prepare({ stepNumber, title, description }: any) {
              return {
                title: `Step ${stepNumber}: ${title}`,
                subtitle: description?.substring(0, 60) || '',
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
      steps: 'steps',
    },
    prepare({ title, steps }: any) {
      return {
        title: title || 'Process Flow',
        subtitle: `${steps?.length || 0} steps`,
      };
    },
  },
};
