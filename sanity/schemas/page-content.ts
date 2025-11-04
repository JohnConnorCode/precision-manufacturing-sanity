export default {
  name: 'pageContent',
  type: 'document',
  title: 'Page Content',
  __experimental_singleton: true,
  fields: [
    {
      name: 'pageName',
      type: 'string',
      title: 'Page Name',
      description: 'Unique identifier for the page (e.g., "services", "industries", "about")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'industriesPage',
      type: 'object',
      title: 'Industries Page Content',
      fields: [
        {
          name: 'hero',
          type: 'object',
          title: 'Hero',
          fields: [
            { name: 'badge', type: 'string', title: 'Badge' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'subtitle', type: 'string', title: 'Subtitle' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            { name: 'descriptionRich', type: 'array', of: [{ type: 'block' }], title: 'Description (Rich Text)' },
            { name: 'titleSize', type: 'string', title: 'Title Size', options: { list: [
              { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' },
              { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }, { title: '2XL', value: '2xl' }, { title: '3XL', value: '3xl' }
            ] } },
            { name: 'descriptionSize', type: 'string', title: 'Description Size', options: { list: [
              { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' }, { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }
            ] } },
            { name: 'backgroundImage', type: 'image', title: 'Background Image', options: { hotspot: true } },
            { name: 'backgroundImageUrl', type: 'url', title: 'Background Image URL (optional)' },
            { name: 'buttons', type: 'array', title: 'Buttons', of: [{ type: 'object', fields: [
              { name: 'label', type: 'string' },
              { name: 'href', type: 'string' },
              { name: 'variant', type: 'string' },
            ]}] },
          ],
        },
        {
          name: 'header',
          type: 'object',
          title: 'Header Section',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
          ],
        },
        { name: 'cta', type: 'object', title: 'Call To Action', fields: [
          { name: 'heading', type: 'string' },
          { name: 'description', type: 'text', rows: 3 },
          { name: 'primaryButton', type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] },
          { name: 'secondaryButton', type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] }
        ]}
      ],
    },
    {
      name: 'resourcesPage',
      type: 'object',
      title: 'Resources Page Content',
      fields: [
        { name: 'hero', type: 'object', title: 'Hero', fields: [
          { name: 'badge', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'subtitle', type: 'string' },
          { name: 'description', type: 'text', rows: 3 },
          { name: 'descriptionRich', type: 'array', of: [{ type: 'block' }], title: 'Description (Rich Text)' },
          { name: 'titleSize', type: 'string', title: 'Title Size', options: { list: [
            { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' },
            { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }, { title: '2XL', value: '2xl' }, { title: '3XL', value: '3xl' }
          ] } },
          { name: 'descriptionSize', type: 'string', title: 'Description Size', options: { list: [
            { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' }, { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }
          ] } },
          { name: 'backgroundImage', type: 'image', options: { hotspot: true } },
          { name: 'backgroundImageUrl', type: 'url', title: 'Background Image URL (optional)' },
          { name: 'buttons', type: 'array', of: [{ type: 'object', fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'string' },
            { name: 'variant', type: 'string' }
          ]}] }
        ]},
        { name: 'header', type: 'object', title: 'Header Section', fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'text', rows: 3 },
          { name: 'eyebrow', type: 'string' }
        ]}
      ]
    },
    {
      name: 'capabilities',
      type: 'array',
      title: 'Capabilities/Stats',
      description: 'Company-wide capabilities or statistics (e.g., "150+ Materials", "24/7 Production")',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
            },
          ],
        },
      ],
    },
    {
      name: 'qualityAssurance',
      type: 'array',
      title: 'Quality Assurance/Certifications',
      description: 'Quality certifications and standards',
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
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 3,
            },
          ],
        },
      ],
    },
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      description: 'Hero section content',
      fields: [
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Background Image',
          options: {hotspot: true},
        },
        {
          name: 'backgroundImageUrl',
          type: 'url',
          title: 'Background Image URL (optional)'
        },
        {
          name: 'badge',
          type: 'string',
          title: 'Badge',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        { name: 'subtitle', type: 'string', title: 'Subtitle' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'descriptionRich', type: 'array', of: [{ type: 'block' }], title: 'Description (Rich Text)' },
        { name: 'titleSize', type: 'string', title: 'Title Size', options: { list: [
          { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' },
          { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }, { title: '2XL', value: '2xl' }, { title: '3XL', value: '3xl' }
        ] } },
        { name: 'descriptionSize', type: 'string', title: 'Description Size', options: { list: [
          { title: 'XS', value: 'xs' }, { title: 'SM', value: 'sm' }, { title: 'Base', value: 'base' }, { title: 'LG', value: 'lg' }, { title: 'XL', value: 'xl' }
        ] } },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'label', type: 'string', title: 'Label'},
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
    {
      name: 'servicesPage',
      type: 'object',
      title: 'Services Page Content',
      fields: [
        {
          name: 'hero',
          type: 'object',
          title: 'Hero',
          fields: [
            { name: 'badge', type: 'string', title: 'Badge' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'subtitle', type: 'string', title: 'Subtitle' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            {
              name: 'backgroundImage',
              type: 'image',
              title: 'Background Image',
              options: { hotspot: true },
            },
            {
              name: 'backgroundImageUrl',
              type: 'url',
              title: 'Background Image URL (optional)'
            },
            {
              name: 'buttons',
              type: 'array',
              title: 'Buttons',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'href', type: 'string', title: 'URL' },
                    {
                      name: 'variant',
                      type: 'string',
                      title: 'Variant',
                      options: {
                        list: [
                          { title: 'Primary', value: 'primary' },
                          { title: 'Secondary', value: 'secondary' },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        { name: 'qualityIntro', type: 'text', title: 'Quality Intro', rows: 3 },
        { name: 'qualityImage', type: 'image', title: 'Quality Image', options: { hotspot: true } },
        { name: 'qualityImageUrl', type: 'url', title: 'Quality Image URL (optional)' },
        {
          name: 'cta',
          type: 'object',
          title: 'Call To Action',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            {
              name: 'primaryButton',
              type: 'object',
              title: 'Primary Button',
              fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'href', type: 'string', title: 'URL' },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'object',
              title: 'Secondary Button',
              fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'href', type: 'string', title: 'URL' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Additional Page Sections',
      description: 'Additional page sections',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 3},
            {
              name: 'content',
              type: 'array',
              title: 'Content',
              of: [{type: 'block'}],
            },
          ],
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
      ],
    },
  ],
}
