export default {
  name: 'industriesPage',
  type: 'document',
  title: 'Industries Page',
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
          initialValue: 'SPECIALIZED SECTOR EXPERTISE'
        },
        {
          name: 'heading',
          type: 'string',
          title: 'Main Heading',
          initialValue: 'Critical Industry Solutions',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'subheading',
          type: 'text',
          title: 'Subheading',
          rows: 2,
          initialValue: 'Trusted partner for aerospace, defense, and energy sectors, delivering mission-critical components with uncompromising quality and precision.',
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
          name: 'overviewTitle',
          type: 'string',
          title: 'Overview Title',
          initialValue: 'Industries Overview',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'overviewStats',
          type: 'array',
          title: 'Overview Statistics',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', type: 'string', title: 'Value' },
                { name: 'label', type: 'string', title: 'Label' }
              ],
              preview: {
                select: { title: 'value', subtitle: 'label' },
                prepare({ title, subtitle }: any) {
                  return { title, subtitle }
                }
              }
            }
          ],
          initialValue: [
            { value: '30+', label: 'Years of Experience' },
            { value: '200+', label: 'Active Programs' },
            { value: '99.8%', label: 'Quality Rating' },
            { value: '12+', label: 'Certifications' }
          ]
        },
        {
          name: 'industries',
          type: 'array',
          title: 'Industries',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  type: 'string',
                  title: 'Industry Name',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 2
                },
                {
                  name: 'applications',
                  type: 'array',
                  title: 'Applications',
                  of: [{ type: 'string' }]
                },
                {
                  name: 'stats',
                  type: 'array',
                  title: 'Statistics',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'value', type: 'string', title: 'Value' }
                      ]
                    }
                  ]
                },
                {
                  name: 'certifications',
                  type: 'array',
                  title: 'Certifications',
                  of: [{ type: 'string' }]
                },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name (e.g., "Plane", "Shield", "Zap")'
                }
              ],
              preview: {
                select: { title: 'name', subtitle: 'description' },
                prepare({ title, subtitle }: any) {
                  return { title, subtitle: subtitle?.substring(0, 50) + '...' }
                }
              }
            }
          ],
          initialValue: [
            {
              name: 'Aerospace',
              description: 'Engine components, landing gear, structural parts, avionics housings',
              applications: [
                'Engine components',
                'Landing gear',
                'Structural parts',
                'Avionics housings'
              ],
              stats: [
                { label: 'Production', value: '85%' },
                { label: 'Active Clients', value: '50+' },
                { label: 'Experience', value: '30+ years' }
              ],
              certifications: ['AS9100D', 'NADCAP', 'ITAR'],
              icon: 'Plane'
            },
            {
              name: 'Defense',
              description: 'Weapon systems, radar components, vehicle parts, electronics',
              applications: [
                'Weapon systems',
                'Radar components',
                'Vehicle parts',
                'Electronics'
              ],
              stats: [
                { label: 'Production', value: '15%' },
                { label: 'Active Clients', value: '25+' },
                { label: 'Experience', value: '25+ years' }
              ],
              certifications: ['ITAR', 'DFARS', 'Security Clearance'],
              icon: 'Shield'
            },
            {
              name: 'Energy',
              description: 'Turbine parts, valve components, pump housings, generator parts',
              applications: [
                'Turbine parts',
                'Valve components',
                'Pump housings',
                'Generator parts'
              ],
              stats: [
                { label: 'Production', value: '25%' },
                { label: 'Active Clients', value: '15+' },
                { label: 'Experience', value: '20+ years' }
              ],
              certifications: ['API', 'ASME', 'ISO 9001'],
              icon: 'Zap'
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
          initialValue: 'IIS Industries | Aerospace, Defense & Energy | Precision Manufacturing',
          validation: (Rule: any) => Rule.required().max(60).warning('Keep under 60 characters')
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
          initialValue: 'Specialized precision manufacturing for aerospace, defense & energy sectors. 30+ years serving critical industries with AS9100D, ITAR & NADCAP certifications.',
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
            'aerospace manufacturing',
            'defense manufacturing',
            'energy sector',
            'precision machining',
            'AS9100 certified',
            'ITAR registered'
          ]
        }
      ]
    }
  ]
}
