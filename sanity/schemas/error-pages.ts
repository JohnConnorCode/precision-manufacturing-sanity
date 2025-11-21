export default {
  name: 'errorPages',
  type: 'document',
  title: 'Error Pages',
  groups: [
    {name: 'notFound', title: '404 - Not Found'},
    {name: 'globalError', title: 'Global Error'},
  ],
  fields: [
    // 404 Page Content
    {
      name: 'notFound',
      type: 'object',
      title: '404 Page Content',
      group: 'notFound',
      options: {
        collapsible: false,
      },
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
          initialValue: 'Page Not Found',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          initialValue: "The precision you're looking for seems to be off by a few thousandths. This page doesn't exist, but our manufacturing excellence does.",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'popularLinksHeading',
          type: 'string',
          title: 'Popular Links Section Heading',
          initialValue: 'Popular Pages',
        },
        {
          name: 'popularLinks',
          type: 'array',
          title: 'Popular Links',
          description: 'Quick navigation links for users who land on 404 page',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  type: 'string',
                  title: 'Link Label',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'href',
                  type: 'string',
                  title: 'Link URL',
                  description: 'Relative URL (e.g., /services/5-axis-machining)',
                  validation: (Rule: any) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'href',
                },
              },
            },
          ],
          initialValue: [
            {label: '5-Axis CNC Machining', href: '/services/5-axis-machining'},
            {label: 'Aerospace Solutions', href: '/industries/aerospace'},
            {label: 'Precision Metrology', href: '/services/metrology'},
            {label: 'Request Quote', href: '/contact'},
            {label: 'About IIS', href: '/about'},
            {label: 'Defense Manufacturing', href: '/industries/defense'},
          ],
        },
        {
          name: 'errorCode',
          type: 'string',
          title: 'Technical Error Code',
          description: 'Display message shown at bottom (fun easter egg)',
          initialValue: 'ERROR: TOLERANCE_EXCEEDED | ROUTE_NOT_FOUND | PRECISION_MISMATCH',
        },
      ],
    },

    // Global Error Page Content
    {
      name: 'globalError',
      type: 'object',
      title: 'Global Error Page Content',
      group: 'globalError',
      options: {
        collapsible: false,
      },
      fields: [
        {
          name: 'heading',
          type: 'string',
          title: 'Heading',
          initialValue: 'Something went wrong',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          initialValue: 'A critical error occurred. Please try refreshing the page.',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'tryAgainButtonText',
          type: 'string',
          title: 'Try Again Button Text',
          initialValue: 'Try again',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'supportMessagePrefix',
          type: 'string',
          title: 'Support Message Prefix',
          initialValue: 'Need help?',
        },
        {
          name: 'supportLinkText',
          type: 'string',
          title: 'Support Link Text',
          initialValue: 'Contact support',
        },
      ],
    },
  ],

  preview: {
    prepare() {
      return {
        title: 'Error Pages Configuration',
        subtitle: '404 Not Found & Global Error',
      }
    }
  }
}
