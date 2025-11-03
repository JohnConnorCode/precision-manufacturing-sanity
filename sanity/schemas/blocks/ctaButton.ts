export default {
  name: 'ctaButton',
  type: 'object',
  title: 'CTA Button',
  description: 'Call-to-action button for user engagement and conversions',
  fields: [
    {
      name: 'text',
      type: 'string',
      title: 'Button Text',
      description: 'Text displayed on the button',
      validation: (Rule: any) => Rule.required().max(50),
    },
    {
      name: 'href',
      type: 'string',
      title: 'Link URL',
      description: 'URL the button links to (e.g., "/contact", "https://example.com")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Button Style',
      description: 'Visual style of the button',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    },
    {
      name: 'trackingEvent',
      type: 'string',
      title: 'Tracking Event',
      description: 'Analytics event name for tracking button clicks',
    },
  ],
  preview: {
    select: {
      text: 'text',
      variant: 'variant',
      href: 'href',
    },
    prepare({ text, variant, href }: any) {
      return {
        title: text || 'CTA Button',
        subtitle: `${variant || 'primary'} → ${href || ''}`,
      };
    },
  },
};
