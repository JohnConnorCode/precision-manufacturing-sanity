import { defineType } from 'sanity'

export default defineType({
  name: 'resourcesSection',
  type: 'object',
  title: 'Resources Section',
  description: 'Complete resources section with header, featured series, benefits, and CTA',
  icon: () => '📚',
  fieldsets: [
    {name: 'header', title: 'Section Header', options: {columns: 2}},
    {name: 'featured', title: 'Featured Series', options: {collapsible: true, collapsed: false}},
    {name: 'benefits', title: 'Benefits Grid', options: {collapsible: true, collapsed: true}},
    {name: 'cta', title: 'Resources CTA', options: {columns: 2}},
  ],
  fields: [
    {
      name: 'header',
      type: 'object',
      title: 'Header',
      fieldset: 'header',
      fields: [
        {
          name: 'badge',
          type: 'string',
          title: 'Badge',
          description: 'Badge text (e.g., "Technical Resources & Knowledge Base")',
        },
        {name: 'title', type: 'string', title: 'Title'},
        {name: 'description', type: 'text', title: 'Description', rows: 3},
      ],
    },
    {
      name: 'featuredSeries',
      type: 'array',
      title: 'Featured Series',
      fieldset: 'featured',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              subtitle: 'difficulty',
              media: 'icon',
            },
            prepare({title, subtitle}: any) {
              return {
                title: title || 'Series',
                subtitle: subtitle || 'Difficulty not set',
              }
            },
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'slug',
              type: 'string',
              title: 'Slug',
              description: 'URL slug for the series',
              validation: (Rule: any) => Rule.required(),
            },
            {name: 'description', type: 'text', title: 'Description', rows: 2},
            {
              name: 'articleCount',
              type: 'number',
              title: 'Article Count',
              description: 'Number of articles in the series',
            },
            {
              name: 'readTime',
              type: 'string',
              title: 'Read Time',
              description: 'Total reading time (e.g., "34 min")',
            },
            {
              name: 'difficulty',
              type: 'string',
              title: 'Difficulty',
              options: {
                list: [
                  {title: 'Beginner', value: 'Beginner'},
                  {title: 'Intermediate', value: 'Intermediate'},
                  {title: 'Advanced', value: 'Advanced'},
                ],
              },
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              description: 'Emoji or icon character',
            },
            {
              name: 'gradient',
              type: 'string',
              title: 'Gradient',
              description: 'Tailwind gradient classes',
            },
          ],
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      title: 'Benefits Grid',
      fieldset: 'benefits',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              enabled: 'enabled',
            },
            prepare({title, subtitle, enabled}: any) {
              return {
                title: title || 'Benefit',
                subtitle: `${enabled === false ? 'Disabled • ' : ''}${subtitle || 'No description'}`,
              }
            },
          },
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Uncheck to hide this benefit without deleting it',
              initialValue: true,
            },
            {
              name: 'iconName',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name',
            },
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'string', title: 'Description'},
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      fieldset: 'cta',
      fields: [
        {name: 'title', type: 'string', title: 'Title'},
        {name: 'description', type: 'string', title: 'Description'},
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          of: [
            {
              type: 'object',
              preview: {
                select: {
                  title: 'text',
                  subtitle: 'href',
                  enabled: 'enabled',
                },
                prepare({title, subtitle, enabled}: any) {
                  return {
                    title: title || 'CTA Button',
                    subtitle: `${enabled === false ? 'Disabled • ' : ''}${subtitle || 'No link'}`,
                  }
                },
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'boolean',
                  title: 'Enabled',
                  description: 'Uncheck to hide this button without deleting it',
                  initialValue: true,
                },
                {name: 'text', type: 'string', title: 'Text'},
                {name: 'href', type: 'string', title: 'URL'},
                {
                  name: 'variant',
                  type: 'string',
                  title: 'Variant',
                  options: {
                    list: [
                      {title: 'Primary', value: 'primary'},
                      {title: 'Secondary', value: 'secondary'},
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'header.title',
      series: 'featuredSeries',
    },
    prepare({ title, series }) {
      const seriesCount = series?.length || 0
      return {
        title: title || 'Resources Section',
        subtitle: `${seriesCount} featured series`,
        media: () => '📚',
      }
    },
  },
})
