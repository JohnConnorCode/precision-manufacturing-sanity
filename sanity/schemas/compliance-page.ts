export default {
  icon: () => '📋',
  name: 'compliancePage',
  type: 'document',
  title: 'Compliance Page',
  preview: {
    prepare() {
      return {
        title: 'Compliance Page',
        subtitle: 'Compliance & Documentation',
      }
    },
  },
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'cards', title: 'Document Cards'},
    {name: 'seo', title: 'SEO & Sharing'},
  ],
  fields: [
    {
      name: 'hero',
      type: 'object',
      title: 'Hero Section',
      group: 'hero',
      options: {collapsible: true, collapsed: false},
      fields: [
        {
          name: 'eyebrow',
          type: 'string',
          title: 'Eyebrow Text',
          initialValue: 'Compliance',
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Compliance &',
        },
        {
          name: 'titleHighlight',
          type: 'string',
          title: 'Title Highlight (gradient text)',
          initialValue: 'Documentation',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          initialValue:
            'Review our compliance documents, quality standards, and supplier requirements.',
        },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      title: 'Document Cards',
      group: 'cards',
      description: 'Cards linking to compliance documents',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              initialValue: true,
            },
            {
              name: 'title',
              type: 'string',
              title: 'Card Title',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Card Description',
              rows: 3,
            },
            {
              name: 'href',
              type: 'string',
              title: 'Link URL',
              description: 'Relative URL (e.g., /compliance/terms)',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'iconName',
              type: 'string',
              title: 'Icon Name',
              description: 'Lucide icon name (e.g., FileText, Shield)',
            },
            {
              name: 'iconGradient',
              type: 'string',
              title: 'Icon Gradient',
              description: 'Tailwind gradient classes (e.g., from-blue-500 to-indigo-600)',
              initialValue: 'from-blue-500 to-indigo-600',
            },
            {
              name: 'ctaText',
              type: 'string',
              title: 'CTA Text',
              initialValue: 'View Document',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'href',
              enabled: 'enabled',
            },
            prepare(selection: any) {
              const {title, subtitle, enabled} = selection
              return {
                title: `${title}${enabled === false ? ' (HIDDEN)' : ''}`,
                subtitle,
              }
            },
          },
        },
      ],
      initialValue: [
        {
          enabled: true,
          title: 'Terms & Conditions',
          description:
            'Purchase order terms covering quality, warranty, delivery, compliance, and export control requirements.',
          href: '/compliance/terms',
          iconName: 'FileText',
          iconGradient: 'from-blue-500 to-indigo-600',
          ctaText: 'View Document',
        },
        {
          enabled: true,
          title: 'Supplier Quality Requirements',
          description:
            'AS9100D, ISO 9001:2015, and ITAR compliance standards for supply chain excellence.',
          href: '/compliance/supplier-requirements',
          iconName: 'Shield',
          iconGradient: 'from-indigo-500 to-purple-600',
          ctaText: 'View Document',
        },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      group: 'seo',
      options: {collapsible: true, collapsed: true},
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          validation: (Rule: any) =>
            Rule.max(60).warning('Meta title should be 60 characters or less'),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          rows: 3,
          validation: (Rule: any) =>
            Rule.max(160).warning('Meta description should be 160 characters or less'),
        },
      ],
    },
  ],
}
