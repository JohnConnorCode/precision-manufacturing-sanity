export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'title', type: 'string', title: 'Title', validation: (Rule: any) => Rule.required() },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'published', type: 'boolean', title: 'Published', initialValue: true },
    {
      name: 'sections',
      type: 'array',
      title: 'Sections',
      group: 'content',
      of: [
        { type: 'heroSection' },
        { type: 'richTextSection' },
        { type: 'ctaSection' },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      group: 'seo',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', rows: 3, title: 'Meta Description' },
        { name: 'ogImage', type: 'image', title: 'OpenGraph Image', options: { hotspot: true } },
      ]
    }
  ],
}

