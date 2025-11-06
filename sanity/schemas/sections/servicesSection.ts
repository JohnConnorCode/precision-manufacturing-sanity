import { defineType } from 'sanity'

export default defineType({
  name: 'servicesSection',
  type: 'object',
  title: 'Services Section',
  description: 'Content for the services section on the homepage',
  icon: () => '⚙️',
  fields: [
    {
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow',
      description: 'Small text above the heading (e.g., "Our Services")',
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
      description: 'Main section heading',
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
      name: 'services',
      type: 'array',
      title: 'Services to Display',
      description: 'Leave empty to show all published services, or select specific ones to display',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
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
        title: title || 'Services Section',
        subtitle: subtitle || 'Displays service cards',
        media: () => '⚙️',
      }
    },
  },
})
