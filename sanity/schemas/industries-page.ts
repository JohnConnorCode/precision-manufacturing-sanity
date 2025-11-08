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
          initialValue: '🏭 CRITICAL INDUSTRY SOLUTIONS'
        },
        {
          name: 'heading',
          type: 'string',
          title: 'Main Heading',
          initialValue: 'Industries We Serve',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'headingHighlight',
          type: 'string',
          title: 'Heading Highlight (shown in blue gradient)',
          initialValue: 'We Serve',
          description: 'This text will be highlighted in blue gradient within the heading'
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
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'value', type: 'string', title: 'Value' },
                { name: 'description', type: 'string', title: 'Description' }
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
            { label: 'Industry Experience', value: '30+', description: 'Years serving critical industries' },
            { label: 'Active Programs', value: '200+', description: 'Ongoing manufacturing programs' },
            { label: 'Quality Rating', value: '99.8%', description: 'On-time delivery performance' },
            { label: 'Certifications', value: '12+', description: 'Industry-specific certifications' }
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
                  name: 'image',
                  type: 'image',
                  title: 'Industry Image',
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
                  name: 'expertise',
                  type: 'array',
                  title: 'Expertise',
                  of: [{ type: 'string' }],
                  description: 'List of expertise areas for this industry'
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
        },
        {
          name: 'whyChooseUs',
          type: 'array',
          title: 'Why Choose IIS',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  type: 'string',
                  title: 'Title',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'description',
                  type: 'text',
                  title: 'Description',
                  rows: 3
                },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icon Name',
                  description: 'Lucide icon name (e.g., "Award", "Shield", "Factory", "Users")'
                },
                {
                  name: 'features',
                  type: 'array',
                  title: 'Features',
                  of: [{ type: 'string' }],
                  description: 'List of key features or capabilities'
                }
              ],
              preview: {
                select: { title: 'title', subtitle: 'description' },
                prepare({ title, subtitle }: any) {
                  return { title, subtitle: subtitle?.substring(0, 50) + '...' }
                }
              }
            }
          ],
          initialValue: [
            {
              title: 'Regulatory Compliance',
              description: 'Full compliance with industry-specific regulations and quality standards',
              icon: 'Award',
              features: [
                'AS9100D aerospace quality system',
                'ITAR registration and compliance',
                'NADCAP accredited processes',
                'ISO 9001:2015 certification'
              ]
            },
            {
              title: 'Security & Traceability',
              description: 'Comprehensive security protocols and complete material traceability',
              icon: 'Shield',
              features: [
                'Secure facility access controls',
                'Material traceability systems',
                'Document control procedures',
                'Supply chain verification'
              ]
            },
            {
              title: 'Technical Expertise',
              description: 'Deep industry knowledge and advanced manufacturing capabilities',
              icon: 'Factory',
              features: [
                'Specialized material processing',
                'Complex geometry machining',
                'Precision measurement systems',
                'Advanced quality control'
              ]
            },
            {
              title: 'Program Management',
              description: 'Dedicated support for long-term manufacturing programs',
              icon: 'Users',
              features: [
                'Dedicated program managers',
                'Capacity planning',
                'Inventory management',
                'Continuous improvement'
              ]
            }
          ]
        },
        {
          name: 'provenResults',
          type: 'array',
          title: 'Proven Results',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'metric', type: 'string', title: 'Metric Name' },
                { name: 'value', type: 'string', title: 'Value' },
                { name: 'description', type: 'text', title: 'Description', rows: 2 }
              ],
              preview: {
                select: { title: 'value', subtitle: 'metric' },
                prepare({ title, subtitle }: any) {
                  return { title, subtitle }
                }
              }
            }
          ],
          initialValue: [
            {
              metric: 'First-Pass Yield',
              value: '99.8%',
              description: 'Parts meeting specifications without rework'
            },
            {
              metric: 'On-Time Delivery',
              value: '99.5%',
              description: 'Deliveries meeting committed schedules'
            },
            {
              metric: 'Cost Reduction',
              value: '15-30%',
              description: 'Average cost savings through optimization'
            },
            {
              metric: 'Lead Time Reduction',
              value: '40%',
              description: 'Typical improvement in manufacturing cycle time'
            }
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
          title: 'Heading',
          initialValue: 'Partner with Industry Experts'
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
          initialValue: "Join the industry leaders who trust us with their most critical manufacturing requirements. Let's discuss your specific needs."
        },
        {
          name: 'primaryButton',
          type: 'object',
          title: 'Primary Button',
          fields: [
            { name: 'label', type: 'string', title: 'Label', initialValue: 'Schedule Consultation' },
            { name: 'href', type: 'string', title: 'URL', initialValue: '/contact' }
          ]
        },
        {
          name: 'secondaryButton',
          type: 'object',
          title: 'Secondary Button',
          fields: [
            { name: 'label', type: 'string', title: 'Label', initialValue: 'View Our Services' },
            { name: 'href', type: 'string', title: 'URL', initialValue: '/services' }
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
