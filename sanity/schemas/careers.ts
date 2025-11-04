export default {
  name: 'careers',
  type: 'document',
  title: 'Careers Page',
  __experimental_singleton: true,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'content', title: 'Page Content'},
    {name: 'cta', title: 'Call to Action'},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      group: 'hero',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'background', title: 'Background Image', options: {collapsible: true, collapsed: false}},
        {name: 'badgeInfo', title: 'Badge Information', options: {columns: 2}},
        {name: 'titles', title: 'Titles', options: {columns: 2}},
        {name: 'description', title: 'Description'},
        {name: 'ctaButtons', title: 'Call to Action Buttons'},
      ],
      fields: [
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Background Image',
          description: 'Hero background image (recommended: 1920x1080px)',
          fieldset: 'background',
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
            }
          ]
        },
        { name: 'backgroundImageUrl', type: 'url', title: 'Background Image URL (optional)', fieldset: 'background' },
        {
          name: 'badge',
          type: 'string',
          title: 'Badge',
          fieldset: 'badgeInfo',
        },
        {
          name: 'badgeIconName',
          type: 'string',
          title: 'Badge Icon Name',
          fieldset: 'badgeInfo',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          fieldset: 'titles',
        },
        {
          name: 'titleHighlight',
          type: 'string',
          title: 'Title Highlight',
          fieldset: 'titles',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          fieldset: 'description',
        },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          fieldset: 'ctaButtons',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'label', type: 'string', title: 'Label'},
                {name: 'href', type: 'string', title: 'URL'},
                {name: 'variant', type: 'string', title: 'Variant', options: { list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                ]}},
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'whyWorkHere',
      type: 'object',
      title: 'Why Work Here',
      group: 'content',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'text', title: 'Text Content'},
        {name: 'image', title: 'Image'},
      ],
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'paragraph1', type: 'text', title: 'Paragraph 1', rows: 3, fieldset: 'text' },
        { name: 'paragraph2', type: 'text', title: 'Paragraph 2', rows: 3, fieldset: 'text' },
        { name: 'paragraph3', type: 'text', title: 'Paragraph 3', rows: 3, fieldset: 'text' },
        { name: 'image', type: 'image', title: 'Image', fieldset: 'image', options: { hotspot: true } },
        { name: 'imageUrl', type: 'url', title: 'Image URL (optional)', fieldset: 'image' },
        { name: 'imageAlt', type: 'string', title: 'Image Alt Text', fieldset: 'image' },
      ]
    },
    {
      name: 'benefits',
      type: 'object',
      title: 'Benefits',
      group: 'content',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'items', type: 'array', title: 'Benefit Items', of: [{ type: 'object', fields: [
          { name: 'iconName', type: 'string', title: 'Icon Name' },
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 3 },
        ]}]}
      ]
    },
    {
      name: 'values',
      type: 'object',
      title: 'Company Values',
      group: 'content',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'items', type: 'array', title: 'Value Items', of: [{ type: 'object', fields: [
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 3 },
        ]}]}
      ]
    },
    {
      name: 'opportunities',
      type: 'object',
      title: 'Job Opportunities',
      group: 'content',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'positions', type: 'array', title: 'Job Positions', of: [{ type: 'object', fields: [
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 4 },
          { name: 'type', type: 'string', title: 'Type' },
          { name: 'location', type: 'string', title: 'Location' },
          { name: 'link', type: 'string', title: 'Application Link' },
        ]}]}
      ]
    },
    {
      name: 'cta',
      type: 'object',
      title: 'Call To Action',
      group: 'cta',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'content', title: 'Content', options: {columns: 2}},
        {name: 'buttons', title: 'Buttons'},
      ],
      fields: [
        { name: 'heading', type: 'string', title: 'Heading', fieldset: 'content' },
        { name: 'description', type: 'text', title: 'Description', rows: 3, fieldset: 'content' },
        { name: 'buttons', type: 'array', title: 'Buttons', fieldset: 'buttons', of: [{ type: 'object', fields: [
          { name: 'label', type: 'string', title: 'Label' },
          { name: 'href', type: 'string', title: 'URL' },
          { name: 'variant', type: 'string', title: 'Variant', options: { list: [
            { title: 'Primary', value: 'primary' },
            { title: 'Secondary', value: 'secondary' },
          ]}},
        ]}]}
      ]
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      description: 'Search engine metadata and social sharing defaults for the Careers page.',
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
      ],
    },
  ],
}
