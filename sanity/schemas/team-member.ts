export default {
  icon: () => '👤',
  name: 'teamMember',
  type: 'document',
  title: 'Team Members',
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}]
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
      published: 'published'
    },
    prepare(selection: any) {
      const {title, subtitle, media, published} = selection
      const status = published === false ? ' (HIDDEN)' : ''
      return {
        title: `${title}${status}`,
        subtitle: subtitle,
        media: media
      }
    }
  },
  groups: [
    {name: 'general', title: 'General Info', default: true},
    {name: 'contact', title: 'Contact Info'},
    {name: 'display', title: 'Display Options'},
  ],
  fieldsets: [
    {name: 'nameInfo', title: 'Name & Title'},
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Full name of the team member',
      group: 'general',
      fieldset: 'nameInfo',
      validation: (Rule: any) => Rule.required().error('Name is required'),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Job title or position',
      group: 'general',
      fieldset: 'nameInfo',
      validation: (Rule: any) => Rule.required().error('Job title is required'),
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Biography',
      description: 'Short biography or description (200-300 characters recommended)',
      group: 'general',
      rows: 4,
      validation: (Rule: any) => Rule.required().min(50).max(500).error('Bio is required and should be 50-500 characters'),
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      description: 'Team member photo (recommended: 400x400px, square aspect ratio)',
      group: 'general',
      validation: (Rule: any) => Rule.required().error('Photo is required for team member profile'),
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the photo for accessibility (e.g., "Photo of John Smith")',
          validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility')
        }
      ]
    },
    {
      name: 'published',
      type: 'boolean',
      title: 'Published',
      description: 'Controls whether this team member appears on the website. Toggle off to hide without deleting.',
      group: 'display',
      initialValue: true,
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Controls the order in which team members appear (lower numbers first)',
      group: 'display',
      validation: (Rule: any) => Rule.required().min(0).error('Display order is required'),
      initialValue: 0,
    },
    {
      name: 'linkedin',
      type: 'url',
      title: 'LinkedIn URL',
      description: 'LinkedIn profile URL',
      group: 'contact',
      validation: (Rule: any) => Rule.uri({
        scheme: ['http', 'https']
      }).warning('Must be a valid URL starting with http:// or https://'),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      description: 'Email address',
      group: 'contact',
      validation: (Rule: any) =>
        Rule.regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          {
            name: 'email',
            invert: false,
          }
        ).warning('Please enter a valid email address'),
    },
  ],
}
