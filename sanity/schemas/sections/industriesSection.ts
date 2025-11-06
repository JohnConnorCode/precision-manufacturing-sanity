import { defineType } from 'sanity'

export default defineType({
  name: 'industriesSection',
  type: 'object',
  title: 'Industries Section',
  description: 'Content for the industries section on the homepage',
  icon: () => '🏭',
  fields: [
    {
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow',
      description: 'Small text above the heading (e.g., "Industries We Serve")',
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    },
    {
      name: 'subdescription',
      type: 'string',
      title: 'Subdescription',
    },
    {
      name: 'industries',
      type: 'array',
      title: 'Industries to Display',
      description: 'Leave empty to show all published industries, or select specific ones to display',
      of: [
        {
          type: 'reference',
          to: [{ type: 'industry' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Industries Section',
        subtitle: subtitle || 'Displays industry cards',
        media: () => '🏭',
      }
    },
  },
})
