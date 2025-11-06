import { defineType } from 'sanity'

export default defineType({
  name: 'statsSection',
  type: 'object',
  title: 'Statistics Section',
  description: 'Headline metrics that reinforce credibility',
  icon: () => '📈',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      initialValue: 'Manufacturing Excellence',
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Section Subtitle',
      initialValue: 'Performance Metrics',
    },
    {
      name: 'items',
      type: 'array',
      title: 'Statistics',
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
              const label = title;
              const description = subtitle;
              const details = [value, description].filter(Boolean).join(' • ');
              return {
                title: label || value || 'Statistic',
                subtitle: details || undefined,
              }
            },
          },
          fields: [
            {
              name: 'value',
              type: 'string',
              title: 'Stat Value',
            },
            {
              name: 'label',
              type: 'string',
              title: 'Stat Label',
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      stats: 'items',
    },
    prepare({ title, stats }) {
      const statCount = stats?.length || 0
      return {
        title: title || 'Statistics Section',
        subtitle: `${statCount} stat${statCount !== 1 ? 's' : ''}`,
        media: () => '📈',
      }
    },
  },
})
