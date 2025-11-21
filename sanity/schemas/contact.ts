import { iconField } from './fields/iconField'

export default {
  icon: () => '✉️',
  name: 'contact',
  type: 'document',
  title: 'Contact Page',
  preview: {
    prepare() {
      return {
        title: 'Contact Page',
        subtitle: 'Get in touch - Contact information and form',
      }
    },
  },
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'contactDetails', title: 'Contact Details'},
    {name: 'additionalSections', title: 'Additional Sections'},
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
          name: 'buttonLabel',
          type: 'string',
          title: 'Button Label',
          fieldset: 'ctaButtons',
        },
        {
          name: 'buttonHref',
          type: 'string',
          title: 'Button URL',
          fieldset: 'ctaButtons',
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'object',
      title: 'Contact Information',
      group: 'contactDetails',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fieldsets: [
        {name: 'header', title: 'Header', options: {columns: 2}},
        {name: 'address', title: 'Address'},
        {name: 'phone', title: 'Phone'},
        {name: 'email', title: 'Email'},
        {name: 'hours', title: 'Hours'},
        {name: 'marketingCopy', title: 'Marketing Copy', options: {collapsible: true, collapsed: false}},
      ],
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
          fieldset: 'header',
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          fieldset: 'header',
        },
        {
          name: 'addressLine1',
          type: 'string',
          title: 'Address Line 1',
          fieldset: 'address',
        },
        {
          name: 'addressLine2',
          type: 'string',
          title: 'Address Line 2',
          fieldset: 'address',
        },
        {
          name: 'addressLine3',
          type: 'string',
          title: 'Address Line 3',
          fieldset: 'address',
        },
        {
          name: 'phone',
          type: 'string',
          title: 'Phone Number',
          fieldset: 'phone',
        },
        {
          name: 'phoneLink',
          type: 'string',
          title: 'Phone Link',
          description: 'tel: link for phone number',
          fieldset: 'phone',
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email Address',
          fieldset: 'email',
          validation: (Rule: any) =>
            Rule.regex(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              {name: 'email'}
            ).warning('Please enter a valid email address'),
        },
        {
          name: 'hoursLine1',
          type: 'string',
          title: 'Hours Line 1',
          fieldset: 'hours',
        },
        {
          name: 'hoursLine2',
          type: 'string',
          title: 'Hours Line 2',
          fieldset: 'hours',
        },
        {
          name: 'phoneDescription',
          type: 'string',
          title: 'Phone Description',
          description: 'Description text shown above phone number',
          fieldset: 'marketingCopy',
          initialValue: 'Direct line for quotes and inquiries',
        },
        {
          name: 'emailDescription',
          type: 'string',
          title: 'Email Description',
          description: 'Description text shown above email address',
          fieldset: 'marketingCopy',
          initialValue: 'Send us your project details',
        },
        {
          name: 'submitButtonText',
          type: 'string',
          title: 'Submit Button Text',
          description: 'Text for the contact form submit button',
          fieldset: 'marketingCopy',
          initialValue: 'Send Quote Request',
        },
        {
          name: 'consultationHeading',
          type: 'string',
          title: 'Consultation Section Heading',
          description: 'Heading for the technical consultation section',
          fieldset: 'marketingCopy',
          initialValue: 'Technical Consultation',
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      title: 'Certifications',
      group: 'additionalSections',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Toggle off to hide',
              initialValue: true,
            },
            {name: 'certification', type: 'string', title: 'Certification'},
          ],
        },
      ],
    },
    {
      name: 'bottomStats',
      type: 'array',
      title: 'Bottom Statistics',
      group: 'additionalSections',
      options: {
        collapsible: true,
        collapsed: true,
      },
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'enabled',
              type: 'boolean',
              title: 'Enabled',
              description: 'Toggle off to hide',
              initialValue: true,
            },
            iconField('iconName', 'Icon', 'Visual icon selector for feature'),
            {name: 'text', type: 'string', title: 'Text'},
            {
              name: 'animated',
              type: 'boolean',
              title: 'Animated',
              initialValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'object',
      title: 'SEO',
      description: 'Search engine metadata and social sharing defaults for the Contact page.',
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
