export default {
  name: 'servicesPage',
  type: 'document',
  title: 'Services Page',
  __experimental_singleton: true,
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'content', title: 'Main Content' },
    { name: 'seo', title: 'SEO & Sharing' }
  ],
  fields: [
    // Hero Section
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      group: 'hero',
      fields: [
        {
          name: 'badge',
          type: 'string',
          title: 'Badge Text',
          initialValue: 'PRECISION MANUFACTURING SERVICES'
        },
        {
          name: 'heading',
          type: 'string',
          title: 'Main Heading',
          initialValue: 'Our Services',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          initialValue: 'Advanced manufacturing capabilities delivering precision components for aerospace, defense, and energy sectors with industry-leading quality standards.',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'backgroundImage',
          type: 'image',
          title: 'Background Image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette']
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule: any) => Rule.required()
            }
          ]
        }
      ]
    },

    // Main Content Section
    {
      name: 'content',
      type: 'object',
      title: 'Main Content',
      group: 'content',
      fields: [
        {
          name: 'sectionTitle',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Manufacturing Core Competencies',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'sectionDescription',
          type: 'text',
          title: 'Section Description',
          rows: 2,
          initialValue: 'Four core service pillars delivering unmatched precision and reliability for aerospace and defense applications'
        },
        {
          name: 'services',
          type: 'array',
          title: 'Services List',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  type: 'string',
                  title: 'Service Title',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Service Description',
                  rows: 2,
                  validation: (Rule: any) => Rule.required()
                }
              ],
              preview: {
                select: { title: 'title', subtitle: 'description' },
                prepare({ title, subtitle }: any) {
                  return { title, subtitle: subtitle?.substring(0, 60) + '...' }
                }
              }
            }
          ],
          initialValue: [
            {
              title: '5-Axis CNC Machining',
              description: 'Complex geometries with unmatched precision for aerospace components'
            },
            {
              title: 'Adaptive Machining',
              description: 'Real-time adjustments based on in-process measurements'
            },
            {
              title: 'Metrology & Inspection',
              description: 'Comprehensive measurement and inspection services'
            },
            {
              title: 'Engineering Support',
              description: 'Design, analysis, and optimization expertise'
            }
          ]
        }
      ]
    },

    // SEO Section
    {
      name: 'seo',
      type: 'object',
      title: 'SEO & Metadata',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          initialValue: 'IIS - Precision Machining & CMM Inspection Services | AS9100 Certified | Oregon',
          validation: (Rule: any) => Rule.required().max(60).warning('Keep under 60 characters')
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
          initialValue: 'AS9100 & ISO 9001 certified precision machining and CMM inspection services. First article inspection, dimensional measurement, and proprietary MetBase® software for aerospace, defense & manufacturing industries.',
          validation: (Rule: any) => Rule.required().max(160).warning('Keep under 160 characters')
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette']
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule: any) => Rule.required()
            }
          ]
        },
        {
          name: 'keywords',
          type: 'array',
          title: 'Keywords',
          of: [{ type: 'string' }],
          initialValue: [
            'precision manufacturing',
            'CNC machining',
            'CMM inspection',
            'AS9100',
            'aerospace manufacturing',
            'defense manufacturing'
          ]
        }
      ]
    }
  ]
}
