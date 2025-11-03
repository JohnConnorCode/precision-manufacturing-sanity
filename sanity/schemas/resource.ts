export default {
  name: 'resource',
  type: 'document',
  title: 'Resources',
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}]
    },
    {
      title: 'Title Z-A',
      name: 'titleDesc',
      by: [{field: 'title', direction: 'desc'}]
    },
    {
      title: 'Publish Date (Newest)',
      name: 'publishDateDesc',
      by: [{field: 'publishDate', direction: 'desc'}]
    },
    {
      title: 'Publish Date (Oldest)',
      name: 'publishDateAsc',
      by: [{field: 'publishDate', direction: 'asc'}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'featuredImage',
      category: 'category',
      publishDate: 'publishDate'
    },
    prepare(selection: any) {
      const {title, subtitle, media, category, publishDate} = selection
      return {
        title: title,
        subtitle: `${category || 'Uncategorized'} - ${publishDate || 'No date'}`,
        media: media
      }
    }
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Resource title (e.g., "Understanding 5-Axis CNC Machining")',
      validation: (Rule: any) => Rule.required().error('Title is required'),
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
      validation: (Rule: any) => Rule.required().error('Slug is required - click "Generate" to create from title'),
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description: 'Brief excerpt for cards and previews (150-200 characters)',
      rows: 3,
      validation: (Rule: any) => Rule.min(100).max(200).warning('Should be between 100-200 characters for optimal display'),
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
      validation: (Rule: any) => Rule.required().error('Category is required for organization'),
      options: {
        list: [
          {title: 'Manufacturing Processes', value: 'manufacturing-processes'},
          {title: 'Material Science', value: 'material-science'},
          {title: 'Quality & Compliance', value: 'quality-compliance'},
          {title: 'Industry Applications', value: 'industry-applications'},
        ]
      }
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
      validation: (Rule: any) => Rule.regex(/^\d+\s*min\s*read$/).warning('Should be in format "5 min read"'),
    },
    {
      name: 'publishDate',
      type: 'date',
      title: 'Publish Date',
      description: 'Date the resource was published',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule: any) => Rule.required().error('Publish date is required'),
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
      description: 'Author name',
      validation: (Rule: any) => Rule.required().error('Author name is required'),
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      description: 'Main image for the resource (recommended: 1200x800px)',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and SEO',
          validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution/Credit'
        }
      ]
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
      description: 'Tags for filtering and search',
      of: [
        {
          type: 'object',
          fields: [{
            name: 'tag',
            type: 'string',
            title: 'Tag',
            validation: (Rule: any) => Rule.required()
          }],
        },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      description: 'Search engine optimization settings for this resource',
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
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule: any) => Rule.required().error('Alt text is required for social sharing')
            }
          ]
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
          description: 'Keywords to target for SEO (3-5 recommended)',
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
