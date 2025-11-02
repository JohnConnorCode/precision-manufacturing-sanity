export default {
  name: 'resource',
  type: 'document',
  title: 'Resources',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Resource title (e.g., "Understanding 5-Axis CNC Machining")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly identifier (auto-generated from title)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description: 'Brief excerpt for cards and previews (150-200 characters)',
      rows: 3,
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Main article content in rich text format',
      of: [{type: 'block'}],
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Resource category for organization (e.g., "manufacturing-processes", "material-science")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'difficulty',
      type: 'string',
      title: 'Difficulty Level',
      description: 'Technical difficulty level of the content',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'readTime',
      type: 'string',
      title: 'Read Time',
      description: 'Estimated reading time (e.g., "5 min read")',
    },
    {
      name: 'publishDate',
      type: 'date',
      title: 'Publish Date',
      description: 'Date the resource was published',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
      description: 'Author name',
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Mark as featured to highlight on resource pages',
      initialValue: false,
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [
        {
          type: 'object',
          fields: [{name: 'tag', type: 'string', title: 'Tag'}],
        },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Title shown in search results (50-60 characters recommended)',
          validation: (Rule: any) =>
            Rule.max(60).warning('Meta title should be 60 characters or less'),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description shown in search results (150-160 characters recommended)',
          rows: 3,
          validation: (Rule: any) =>
            Rule.max(160).warning('Meta description should be 160 characters or less'),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Image shown when shared on social media (1200x630px recommended)',
          options: {hotspot: true},
        },
        {
          name: 'noindex',
          type: 'boolean',
          title: 'Prevent Indexing',
          description: 'Prevent search engines from indexing this page',
          initialValue: false,
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Focus Keywords',
          of: [
            {
              type: 'object',
              fields: [{name: 'keyword', type: 'string', title: 'Keyword'}],
            },
          ],
        },
      ],
    },
  ],
}
