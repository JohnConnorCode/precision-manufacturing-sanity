export default {
  name: 'homepage',
  type: 'document',
  title: 'Homepage',
  __experimental_singleton: true,
  fields: [
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      fields: [
        {
          name: 'headline',
          type: 'string',
          title: 'Headline',
        },
        {
          name: 'subheadline',
          type: 'text',
          title: 'Subheadline',
          rows: 3,
        },
        {
          name: 'badges',
          type: 'array',
          title: 'Badges',
          of: [
            {
              type: 'object',
              fields: [{name: 'badge', type: 'string', title: 'Badge'}],
            },
          ],
        },
      ],
    },
    {
      name: 'heroEnhanced',
      type: 'object',
      title: 'Enhanced Hero Section',
      fields: [
        {
          name: 'mainTitle',
          type: 'string',
          title: 'Main Title',
          initialValue: 'PRECISION MANUFACTURING',
        },
        {
          name: 'subtitle',
          type: 'string',
          title: 'Subtitle',
          initialValue: 'SERVICES',
        },
        {
          name: 'tagline',
          type: 'text',
          title: 'Tagline',
          rows: 2,
        },
        {
          name: 'slides',
          type: 'array',
          title: 'Hero Slides',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  type: 'image',
                  title: 'Slide Image',
                  description: 'Hero carousel slide image (recommended: 1920x1080px)',
                  options: {
                    hotspot: true,
                    metadata: ['blurhash', 'lqip', 'palette'],
                  },
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                      description: 'Describe the image for accessibility',
                      validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption'
                    }
                  ]
                },
              ],
            },
          ],
        },
        {
          name: 'badges',
          type: 'array',
          title: 'Badges',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  type: 'string',
                  title: 'Text',
                  validation: (Rule: any) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      title: 'Statistics',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'number', type: 'string', title: 'Number'},
            {name: 'label', type: 'string', title: 'Label'},
          ],
        },
      ],
    },
    {
      name: 'servicesSection',
      type: 'object',
      title: 'Services Section',
      description: 'Content for the services section on the homepage',
      fields: [
        {
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: 'Small text above the heading (e.g., "Our Services")',
        },
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
          description: 'Main section heading',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
        {
          name: 'subdescription',
          type: 'string',
          title: 'Subdescription',
        },
      ],
    },
    {
      name: 'industriesSection',
      type: 'object',
      title: 'Industries Section',
      description: 'Content for the industries section on the homepage',
      fields: [
        {
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow',
          description: 'Small text above the heading (e.g., "Industries We Serve")',
        },
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
        },
        {
          name: 'subdescription',
          type: 'string',
          title: 'Subdescription',
        },
      ],
    },
    {
      name: 'technicalSpecs',
      type: 'array',
      title: 'Technical Specifications',
      of: [
        {
          type: 'object',
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
    {
      name: 'imageShowcase',
      type: 'object',
      title: 'Image Showcase Section',
      description: 'Complete image showcase section with header, images, stats, and CTA',
      fields: [
        {
          name: 'header',
          type: 'object',
          title: 'Header',
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
          of: [
            {
              type: 'object',
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
          of: [
            {
              type: 'object',
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
                  fields: [
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
    },
    {
      name: 'resourcesSection',
      type: 'object',
      title: 'Resources Section',
      description: 'Complete resources section with header, featured series, benefits, and CTA',
      fields: [
        {
          name: 'header',
          type: 'object',
          title: 'Header',
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
          of: [
            {
              type: 'object',
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
          of: [
            {
              type: 'object',
              fields: [
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
                  fields: [
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
    },
    {
      name: 'cta',
      type: 'object',
      title: 'Final Call to Action',
      fields: [
        {name: 'title', type: 'string', title: 'Title'},
        {name: 'subtitle', type: 'text', title: 'Subtitle', rows: 2},
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
      ],
    },
  ],
}
