import { defineType, defineField } from 'sanity'
import { Users } from 'lucide-react'
import { publishedField, orderField } from './fields'

/**
 * Team Member Schema
 *
 * Represents individual team members displayed on the About page.
 * Includes photo, bio, contact info, and display options.
 */
export default defineType({
  name: 'teamMember',
  type: 'document',
  title: 'Team Members',
  icon: Users,
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
      published: 'published',
    },
    prepare({ title, subtitle, media, published }) {
      const status = published === false ? ' (HIDDEN)' : ''
      return {
        title: `${title || 'Untitled'}${status}`,
        subtitle: subtitle || 'No title',
        media,
      }
    },
  },
  groups: [
    { name: 'general', title: 'General Info', default: true },
    { name: 'contact', title: 'Contact Info' },
    { name: 'display', title: 'Display Options' },
  ],
  fieldsets: [
    { name: 'nameInfo', title: 'Name & Title' },
  ],
  fields: [
    // General Info
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Full name of the team member',
      group: 'general',
      fieldset: 'nameInfo',
      validation: (rule) => rule.required().error('Name is required'),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Job title or position',
      group: 'general',
      fieldset: 'nameInfo',
      validation: (rule) => rule.required().error('Job title is required'),
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Biography',
      description: 'Short biography or description (200-300 characters recommended)',
      group: 'general',
      rows: 4,
      validation: (rule) =>
        rule
          .required()
          .min(50)
          .max(500)
          .error('Bio is required and should be 50-500 characters'),
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      description: 'Team member photo (recommended: 400x400px, square aspect ratio)',
      group: 'general',
      validation: (rule) => rule.required().error('Photo is required for team member profile'),
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the photo for accessibility (e.g., "Photo of John Smith")',
          validation: (rule) => rule.required().error('Alt text is required for accessibility'),
        }),
      ],
    }),

    // Display Options
    publishedField({ group: 'display' }),
    orderField({ group: 'display' }),

    // Contact Info
    defineField({
      name: 'linkedin',
      type: 'url',
      title: 'LinkedIn URL',
      description: 'LinkedIn profile URL',
      group: 'contact',
      validation: (rule) =>
        rule
          .uri({ scheme: ['http', 'https'] })
          .warning('Must be a valid URL starting with http:// or https://'),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      description: 'Email address',
      group: 'contact',
      validation: (rule) =>
        rule
          .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
            name: 'email',
            invert: false,
          })
          .warning('Please enter a valid email address'),
    }),
  ],
})
