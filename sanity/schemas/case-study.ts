import { defineType, defineField } from 'sanity';
import { FileText } from 'lucide-react';

export default defineType({
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  icon: FileText,
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
    {
      title: 'Title Z-A',
      name: 'titleDesc',
      by: [{field: 'title', direction: 'desc'}],
    },
    {
      title: 'Client A-Z',
      name: 'clientAsc',
      by: [{field: 'client', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Related Industry',
      type: 'reference',
      to: [{ type: 'industry' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true, metadata: ['blurhash', 'lqip', 'palette'] },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
        },
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short tagline under the title',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Can be anonymous like "Major Defense Contractor"',
    }),
    defineField({
      name: 'duration',
      title: 'Project Duration',
      type: 'string',
      description: 'e.g., "6 months", "Ongoing partnership since 2018"',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
      description: 'What problem did the client face?',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'text',
      rows: 4,
      description: 'How did we solve it?',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', type: 'string', title: 'Metric' },
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'description', type: 'string', title: 'Description' },
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote' },
        { name: 'author', type: 'string', title: 'Author Name' },
        { name: 'role', type: 'string', title: 'Author Role' },
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true, metadata: ['blurhash', 'lqip', 'palette'] },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility') },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'certifications',
      title: 'Relevant Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Title shown in search results (50-60 characters recommended)',
          validation: (Rule) => Rule.max(60).warning('Meta title should be 60 characters or less'),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description shown in search results (150-160 characters recommended)',
          rows: 3,
          validation: (Rule) => Rule.max(160).warning('Meta description should be 160 characters or less'),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          description: 'Image shown when shared on social media (1200x630px recommended)',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette'],
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
        {
          name: 'noindex',
          type: 'boolean',
          title: 'Prevent Indexing',
          description: 'Prevent search engines from indexing this case study',
          initialValue: false,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'heroImage',
      published: 'published',
    },
    prepare({ title, subtitle, media, published }) {
      return {
        title: `${title}${published === false ? ' (HIDDEN)' : ''}`,
        subtitle: subtitle || 'No client specified',
        media,
      };
    },
  },
});
