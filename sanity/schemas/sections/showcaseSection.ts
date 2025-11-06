import { defineType } from 'sanity'

export default defineType({
  name: 'showcaseSection',
  type: 'object',
  title: 'Image Showcase Section',
  description: 'Complete image showcase section with header, images, stats, and CTA',
  icon: () => '🖼️',
  fieldsets: [
    {name: 'header', title: 'Section Header', options: {columns: 2}},
    {name: 'gallery', title: 'Showcase Gallery', options: {collapsible: true, collapsed: false}},
    {name: 'statTiles', title: 'Stat Tiles', options: {collapsible: true, collapsed: true}},
    {name: 'cta', title: 'Inline CTA', options: {columns: 2}},
  ],
  fields: [
    {
      name: 'header',
      type: 'object',
      title: 'Header',
      fieldset: 'header',
      fields: [
        {
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: 'Small text above title (e.g., "Manufacturing Excellence")',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'titleHighlight',
          type: 'string',
          title: 'Title Highlight',
          description: 'Highlighted part of title',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
      ],
    },
    {
      name: 'showcaseImages',
      type: 'array',
      title: 'Showcase Images',
      fieldset: 'gallery',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'title',
              subtitle: 'category',
              media: 'image',
            },
            prepare({title, subtitle, media}: any) {
              return {
                title: title || 'Showcase image',
                subtitle,
                media,
              }
            },
          },
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Showcase Image',
              description: 'Image for showcase grid (recommended: 800x600px)',
              options: {
                hotspot: true,
                metadata: ['blurhash', 'lqip', 'palette'],
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                  validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
                }
              ]
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              description: 'Image overlay title',
            },
            {
              name: 'category',
              type: 'string',
              title: 'Category',
              description: 'Image category/subtitle',
            },
            {
              name: 'href',
              type: 'string',
              title: 'Link URL',
              description: 'Link URL when image is clicked',
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      title: 'Stats',
      fieldset: 'statTiles',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
              media: 'iconName',
            },
            prepare({title, subtitle}: any) {
              return {
                title: title || 'Stat',
                subtitle,
              }
            },
          },
          fields: [
            {
              name: 'iconName',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name',
            },
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'Stat value (e.g., "AS9100D", "99.9%")',
            },
            {name: 'label', type: 'string', title: 'Label'},
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
        {name: 'description', type: 'text', title: 'Description', rows: 2},
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
      images: 'showcaseImages',
    },
    prepare({ title, images }) {
      const imageCount = images?.length || 0
      return {
        title: title || 'Image Showcase',
        subtitle: `${imageCount} image${imageCount !== 1 ? 's' : ''}`,
        media: () => '🖼️',
      }
    },
  },
})
