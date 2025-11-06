import { defineType } from 'sanity'

export default defineType({
  name: 'techSpecsSection',
  type: 'object',
  title: 'Technical Specifications Section',
  description: 'Tile-based overview of capabilities, certifications, and differentiators',
  icon: () => '📊',
  fields: [
    {
      name: 'specs',
      type: 'array',
      title: 'Technical Specifications',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'label',
              subtitle: 'description',
              value: 'value',
            },
            prepare({title, subtitle, value}: any) {
              const details = [value, subtitle].filter(Boolean).join(' • ');
              return {
                title: title || value || 'Technical specification',
                subtitle: details || undefined,
              }
            },
          },
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'description', type: 'string', title: 'Description'},
            {
              name: 'iconName',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name (e.g., "Gauge", "Zap", "Shield")',
            },
            {
              name: 'gradient',
              type: 'string',
              title: 'Gradient Classes',
              description: 'Tailwind gradient classes (e.g., "from-blue-600 to-indigo-600")',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      specs: 'specs',
    },
    prepare({ specs }) {
      const count = specs?.length || 0
      return {
        title: 'Technical Specifications',
        subtitle: `${count} spec${count !== 1 ? 's' : ''}`,
        media: () => '📊',
      }
    },
  },
})
