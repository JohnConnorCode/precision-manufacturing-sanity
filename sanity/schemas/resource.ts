export default {
  icon: () => '📚',
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
      publishDate: 'publishDate',
      published: 'published'
    },
    prepare(selection: any) {
      const {title, subtitle, media, category, publishDate, published} = selection
      const status = published === false ? ' (HIDDEN)' : ''
      return {
        title: `${title}${status}`,
        subtitle: `${category || 'Uncategorized'} - ${publishDate || 'No date'}`,
        media: media
      }
    }
  },
  groups: [
    {name: 'general', title: 'General Info', default: true},
    {name: 'metadata', title: 'Resource Metadata'},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Resource title (e.g., "Understanding 5-Axis CNC Machining")',
      group: 'general',
      validation: (Rule: any) => Rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly identifier (auto-generated from title)',
      group: 'general',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('Slug is required - click "Generate" to create from title'),
    },
    {
      name: 'published',
      type: 'boolean',
      title: 'Published',
      description: 'Controls whether this resource appears on the website. Uncheck to hide without deleting.',
      group: 'general',
      initialValue: true,
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description: 'Brief excerpt for cards and previews (150-200 characters)',
      group: 'general',
      rows: 3,
      validation: (Rule: any) => Rule.min(100).max(200).warning('Should be between 100-200 characters for optimal display'),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Main article content in rich text format with custom blocks',
      group: 'general',
      of: [
        {type: 'block'},
        {type: 'calloutBox'},
        {type: 'toleranceTable'},
        {type: 'processFlow'},
        {type: 'materialData'},
        {type: 'equipmentSpec'},
        {type: 'ctaButton'},
      ],
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Resource category for organization (e.g., "manufacturing-processes", "material-science")',
      group: 'metadata',
      fieldset: 'categoryInfo',
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
      group: 'metadata',
      fieldset: 'categoryInfo',
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
      group: 'metadata',
      fieldset: 'publishInfo',
      validation: (Rule: any) => Rule.regex(/^\d+\s*min\s*read$/).warning('Should be in format "5 min read"'),
    },
    {
      name: 'publishDate',
      type: 'date',
      title: 'Publish Date',
      description: 'Date the resource was published',
      group: 'metadata',
      fieldset: 'publishInfo',
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
      group: 'metadata',
      fieldset: 'publishInfo',
      validation: (Rule: any) => Rule.required().error('Author name is required'),
    },
    {
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      description: 'Main image for the resource (recommended: 1200x800px)',
      group: 'metadata',
      fieldset: 'featuredImageInfo',
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
      group: 'metadata',
      fieldset: 'featuredImageInfo',
      initialValue: false,
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Tags for filtering and search',
      group: 'metadata',
      fieldset: 'tagsInfo',
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
      group: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fieldsets: [
        {name: 'meta', title: 'Meta Tags', options: {collapsible: true, collapsed: false}},
        {name: 'social', title: 'Social Sharing', options: {collapsible: true, collapsed: false}},
        {name: 'indexing', title: 'Indexing', options: {columns: 2}},
        {name: 'keywords', title: 'Keywords'},
      ],
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Title shown in search results (50-60 characters recommended)',
          fieldset: 'meta',
          validation: (Rule: any) =>
            Rule.max(60).warning('Meta title should be 60 characters or less'),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description shown in search results (150-160 characters recommended)',
          rows: 3,
          fieldset: 'meta',
          validation: (Rule: any) =>
            Rule.max(160).warning('Meta description should be 160 characters or less'),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Image shown when shared on social media (1200x630px recommended)',
          fieldset: 'social',
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
          fieldset: 'indexing',
          initialValue: false,
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Focus Keywords',
          description: 'Keywords to target for SEO (3-5 recommended)',
          fieldset: 'keywords',
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
