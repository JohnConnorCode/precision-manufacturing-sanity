import { defineType, defineField } from 'sanity';
import { Shield } from 'lucide-react';

export default defineType({
  name: 'certification',
  title: 'Certifications',
  type: 'document',
  icon: Shield,
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
  fields: [
    defineField({
      name: 'name',
      title: 'Certification Name',
      type: 'string',
      description: 'e.g., "AS9100D", "ISO 9001:2015", "ITAR"',
      validation: (Rule) => Rule.required().error('Certification name is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Short Name',
      type: 'string',
      description: 'Abbreviated name for badges (e.g., "AS9100D")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief explanation of what this certification means',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "Shield", "Award", "FileCheck")',
      initialValue: 'Shield',
    }),
    defineField({
      name: 'scope',
      title: 'Scope at IIS',
      type: 'text',
      rows: 3,
      description: 'How this certification applies specifically to IIS operations',
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'text',
      rows: 3,
      description: 'Why this certification matters to the customer',
    }),
    defineField({
      name: 'certNumber',
      title: 'Certificate Number',
      type: 'string',
      description: 'Official certification number (if publicly sharable)',
    }),
    defineField({
      name: 'issuingBody',
      title: 'Issuing Body',
      type: 'string',
      description: 'Organization that issued the certification',
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid From',
      type: 'date',
    }),
    defineField({
      name: 'validUntil',
      title: 'Valid Until',
      type: 'date',
      description: 'Expiration date (leave empty if no expiration)',
    }),
    defineField({
      name: 'body',
      title: 'Detailed Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full detailed content about this certification',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the display order on the certifications page',
      initialValue: 0,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Controls whether this certification appears on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'issuingBody',
      published: 'published',
    },
    prepare({ title, subtitle, published }) {
      const status = published === false ? ' (HIDDEN)' : '';
      return {
        title: `${title}${status}`,
        subtitle: subtitle || 'No issuing body specified',
      };
    },
  },
});
