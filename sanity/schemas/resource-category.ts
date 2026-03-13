export default {
  icon: () => '📁',
  name: 'resourceCategory',
  type: 'document',
  title: 'Resource Categories',
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
      published: 'published',
    },
    prepare(selection: any) {
      const {title, subtitle, media, published} = selection
      const status = published === false ? ' (HIDDEN)' : ''
      return {
        title: `${title}${status}`,
        subtitle: subtitle,
        media: media,
      }
    },
  },
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Category display name (e.g., "Machining Processes")',
      group: 'general',
      validation: (Rule: any) => Rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly identifier (must match the category value used in resources)',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) =>
        Rule.required().error('Slug is required - click "Generate" to create from title'),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Category description shown on the category landing page and in metadata',
      group: 'general',
      rows: 3,
      validation: (Rule: any) => Rule.required().error('Description is required'),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Hero Image',
      description: 'Background image for the category landing page hero section',
      group: 'general',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility'),
        },
      ],
    },
    {
      name: 'published',
      type: 'boolean',
      title: 'Published',
      description: 'Controls whether this category appears on the website. Toggle off to hide without deleting.',
      group: 'settings',
      initialValue: true,
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Order in which categories appear (lower numbers first)',
      group: 'settings',
      initialValue: 0,
    },
  ],
}
