export default {
  name: 'page',
  type: 'document',
  title: 'Custom Pages',
  icon: () => '📄',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & Sharing' },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      published: 'published',
    },
    prepare({ title, slug, published }: any) {
      const status = published === false ? ' (UNPUBLISHED)' : ''
      return {
        title: `${title}${status}`,
        subtitle: slug ? `/${slug}` : 'No slug set',
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
      description: 'Internal title for this page (shown in browser tab and SEO)',
      group: 'content',
      validation: (Rule: any) => Rule.required().error('Page title is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'URL path for this page (e.g., "about-us" becomes /about-us)',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, ''),
      },
      validation: (Rule: any) =>
        Rule.required().error('Slug is required - click "Generate" to create from title'),
    },
    {
      name: 'published',
      type: 'boolean',
      title: 'Published',
      description: 'Uncheck to hide this page without deleting it',
      group: 'content',
      initialValue: true,
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Page Builder',
      description: 'Build your page by adding and arranging sections. Drag to reorder.',
      group: 'content',
      of: [
        { type: 'heroSection' },
        { type: 'richTextSection' },
        { type: 'ctaSection' },
      ],
      validation: (Rule: any) =>
        Rule.custom((sections: any[]) => {
          if (!sections || sections.length === 0) {
            return 'Add at least one section to your page'
          }
          return true
        }),
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'meta', title: 'Meta Tags', options: {collapsible: true, collapsed: false}},
        {name: 'social', title: 'Social Sharing', options: {collapsible: true, collapsed: false}},
      ],
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title', fieldset: 'meta' },
        { name: 'metaDescription', type: 'text', rows: 3, title: 'Meta Description', fieldset: 'meta' },
        {
          name: 'ogImage',
          type: 'image',
          title: 'OpenGraph Image',
          fieldset: 'social',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility'),
            },
          ],
        },
      ]
    }
  ],
}

