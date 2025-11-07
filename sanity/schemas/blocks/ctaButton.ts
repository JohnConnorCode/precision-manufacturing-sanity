export default {
  name: 'ctaButton',
  type: 'object',
  title: 'CTA Button',
  description: 'Call-to-action button for user engagement and conversions',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'styling', title: 'Styling' },
    { name: 'tracking', title: 'Tracking' },
  ],
  fields: [
    {
      name: 'text',
      type: 'string',
      title: 'Button Text',
      description: 'Text displayed on the button',
      group: 'content',
      validation: (Rule: any) => Rule.required().max(50),
    },
    {
      name: 'href',
      type: 'string',
      title: 'Link URL',
      description: 'URL the button links to (e.g., "/contact", "https://example.com")',
      group: 'content',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Button Variant (Preset)',
      description: 'Preset style - can be overridden by custom styling below',
      group: 'styling',
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
      name: 'customStyle',
      type: 'object',
      title: 'Custom Button Style',
      group: 'styling',
      description: 'Override preset styling with custom colors',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enable Custom Styling',
          description: 'Turn on to override the preset variant style',
          initialValue: false,
        },
        {
          name: 'textColor',
          type: 'colorStyle',
          title: 'Text Color',
          hidden: ({ parent }: any) => !parent?.enabled,
        },
        {
          name: 'backgroundColor',
          type: 'colorStyle',
          title: 'Background Color',
          hidden: ({ parent }: any) => !parent?.enabled,
        },
        {
          name: 'borderColor',
          type: 'colorStyle',
          title: 'Border Color',
          hidden: ({ parent }: any) => !parent?.enabled,
        },
        {
          name: 'hoverTextColor',
          type: 'colorStyle',
          title: 'Hover Text Color',
          hidden: ({ parent }: any) => !parent?.enabled,
        },
        {
          name: 'hoverBackgroundColor',
          type: 'colorStyle',
          title: 'Hover Background Color',
          hidden: ({ parent }: any) => !parent?.enabled,
        },
        {
          name: 'hoverBorderColor',
          type: 'colorStyle',
          title: 'Hover Border Color',
          hidden: ({ parent }: any) => !parent?.enabled,
        },
      ],
    },
    {
      name: 'size',
      type: 'string',
      title: 'Button Size',
      group: 'styling',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      title: 'Full Width',
      group: 'styling',
      description: 'Make button span full width of container',
      initialValue: false,
    },
    {
      name: 'trackingEvent',
      type: 'string',
      title: 'Tracking Event',
      description: 'Analytics event name for tracking button clicks',
      group: 'tracking',
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
