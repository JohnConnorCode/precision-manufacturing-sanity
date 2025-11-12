export default {
  name: 'uiText',
  type: 'document',
  title: 'UI Text',
  icon: () => '💬',
  preview: {
    prepare() {
      return {
        title: 'UI Text',
        subtitle: 'Global button labels and section text',
      }
    },
  },
  groups: [
    {name: 'buttons', title: 'Button Text', default: true},
    {name: 'sections', title: 'Section Text'},
  ],
  fields: [
    {
      name: 'buttons',
      type: 'object',
      title: 'Button Text',
      group: 'buttons',
      fields: [
        {
          name: 'getQuote',
          type: 'string',
          title: 'Get Quote',
          initialValue: 'Get Quote',
        },
        {
          name: 'contactUs',
          type: 'string',
          title: 'Contact Us',
          initialValue: 'Contact Us Today',
        },
        {
          name: 'viewServices',
          type: 'string',
          title: 'View Services',
          initialValue: 'View Services',
        },
        {
          name: 'viewIndustries',
          type: 'string',
          title: 'View Industries',
          initialValue: 'View Industries',
        },
        {
          name: 'learnMore',
          type: 'string',
          title: 'Learn More',
          initialValue: 'Learn More',
        },
      ],
    },
    {
      name: 'sections',
      type: 'object',
      title: 'Section Text',
      group: 'sections',
      fields: [
        {
          name: 'ctaHeading',
          type: 'string',
          title: 'CTA Heading',
          initialValue: 'Ready to Get Started?',
        },
        {
          name: 'ctaDescription',
          type: 'text',
          title: 'CTA Description',
          rows: 2,
        },
        {
          name: 'serviceOfferings',
          type: 'string',
          title: 'Service Offerings',
          initialValue: 'Service Offerings',
        },
        {
          name: 'ourCapabilities',
          type: 'string',
          title: 'Our Capabilities',
          initialValue: 'Our Capabilities',
        },
      ],
    },
  ],
}
