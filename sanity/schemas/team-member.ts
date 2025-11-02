export default {
  name: 'teamMember',
  type: 'document',
  title: 'Team Members',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Full name of the team member',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Job title or position',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Biography',
      description: 'Short biography or description',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      description: 'Team member photo',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Controls the order in which team members appear (lower numbers first)',
      validation: (Rule: any) => Rule.required(),
      initialValue: 0,
    },
    {
      name: 'linkedin',
      type: 'url',
      title: 'LinkedIn URL',
      description: 'LinkedIn profile URL',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      description: 'Email address',
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
