import { defineType, defineField } from 'sanity';
import { Quote } from 'lucide-react';

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: Quote,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'relationships', title: 'Relationships' },
    { name: 'settings', title: 'Settings' },
  ],
  orderings: [
    {
      title: 'Company A-Z',
      name: 'companyAsc',
      by: [{ field: 'company', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [{ field: 'featured', direction: 'desc' }],
    },
  ],
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      group: 'general',
      validation: (Rule) => Rule.required().error('Quote is required'),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().error('Author name is required'),
    }),
    defineField({
      name: 'role',
      title: 'Author Role',
      type: 'string',
      group: 'general',
      description: 'e.g., "VP of Engineering", "Quality Director"',
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      group: 'general',
      description: 'Can be anonymous like "Major Defense Contractor"',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true, metadata: ['blurhash', 'lqip', 'palette'] },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule: any) => Rule.required().error('Alt text is required for accessibility'),
        },
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      group: 'general',
      description: 'Star rating (1-5)',
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      group: 'relationships',
      description: 'Link to the relevant service',
    }),
    defineField({
      name: 'relatedIndustry',
      title: 'Related Industry',
      type: 'reference',
      to: [{ type: 'industry' }],
      group: 'relationships',
      description: 'Link to the relevant industry',
    }),
    defineField({
      name: 'relatedCaseStudy',
      title: 'Related Case Study',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
      group: 'relationships',
      description: 'Link to the associated case study (if any)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'settings',
      description: 'Featured testimonials appear on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      group: 'settings',
      description: 'Controls whether this testimonial appears on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'company',
      published: 'published',
      featured: 'featured',
    },
    prepare({ title, subtitle, published, featured }) {
      const status = published === false ? ' (HIDDEN)' : '';
      const star = featured ? ' ⭐' : '';
      return {
        title: `${title}${status}${star}`,
        subtitle: subtitle || 'No company specified',
      };
    },
  },
});
