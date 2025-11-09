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
        },
        {
          name: 'buttons',
          type: 'array',
          title: 'Hero Buttons',
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
                      { title: 'Secondary', value: 'secondary' }
                    ]
                  }
                }
              ]
            }
          ],
          initialValue: [
            { label: 'Request Quote', href: '/contact', variant: 'primary' },
            { label: 'View Core Competencies', href: '#capabilities', variant: 'secondary' }
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
          name: 'capabilities',
          type: 'array',
          title: 'Capabilities Statistics',
          description: 'Key capability metrics displayed at the top of the page',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  type: 'string',
                  title: 'Label',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'value',
                  type: 'string',
                  title: 'Value',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 2,
                  validation: (Rule: any) => Rule.required()
                }
              ],
              preview: {
                select: { title: 'label', subtitle: 'value' },
                prepare({ title, subtitle }: any) {
                  return { title: `${subtitle} - ${title}` }
                }
              }
            }
          ],
          initialValue: [
            { label: 'Materials Certified', value: '150+', description: 'Aerospace & defense grade materials' },
            { label: 'Precision Tolerance', value: '±0.0001"', description: 'Guaranteed dimensional accuracy' },
            { label: 'Production Capacity', value: '24/7', description: 'Continuous manufacturing capability' },
            { label: 'Quality System', value: 'AS9100D', description: 'Full aerospace certification' }
          ]
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
        },
        {
          name: 'qualityAssurance',
          type: 'array',
          title: 'Quality Assurance Items',
          description: 'Certifications and quality standards',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                  validation: (Rule: any) => Rule.required()
                }
              ],
              preview: {
                select: { title: 'title' }
              }
            }
          ],
          initialValue: [
            { title: 'AS9100D aerospace quality management' },
            { title: 'ISO 9001:2015 certified processes' },
            { title: 'ITAR registered for defense contracts' },
            { title: 'CMMC compliant for cybersecurity' }
          ]
        }
      ]
    },

    // CTA Section
    {
      name: 'cta',
      type: 'object',
      title: 'Call to Action',
      group: 'content',
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'CTA Heading',
          initialValue: 'Ready to Start Your Project?',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'description',
          type: 'text',
          title: 'CTA Description',
          rows: 2,
          initialValue: 'Partner with us for precision manufacturing solutions that meet the highest industry standards.'
        },
        {
          name: 'buttons',
          type: 'array',
          title: 'CTA Buttons',
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
                      { title: 'Secondary', value: 'secondary' }
                    ]
                  }
                }
              ]
            }
          ],
          initialValue: [
            { label: 'Get Quote', href: '/contact?interest=quote', variant: 'primary' },
            { label: 'Contact Us', href: '/contact', variant: 'secondary' }
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
