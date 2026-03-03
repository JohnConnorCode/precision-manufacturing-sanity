import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'certificationsPage',
  title: 'Certifications Page',
  type: 'document',
  icon: () => '🏆',
  preview: {
    prepare() {
      return {
        title: 'Certifications Page',
        subtitle: 'Hero, quality commitment, and CTA content',
      };
    },
  },
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'content', title: 'Page Content' },
    { name: 'cta', title: 'CTA Section' },
    { name: 'seo', title: 'SEO & Sharing' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true, metadata: ['blurhash', 'lqip', 'palette'] },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
        { name: 'badge', type: 'string', title: 'Badge Text', description: 'Small text above the heading (e.g., "QUALITY ASSURED")' },
        { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
        { name: 'titleHighlight', type: 'string', title: 'Title Highlight', description: 'Last word(s) shown with gradient styling' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
      ],
    }),
    defineField({
      name: 'qualityCommitment',
      title: 'Quality Commitment Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', type: 'string', title: 'Section Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 4 },
        {
          name: 'image',
          title: 'Section Image',
          type: 'image',
          options: { hotspot: true, metadata: ['blurhash', 'lqip', 'palette'] },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      group: 'cta',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        {
          name: 'buttons',
          type: 'array',
          title: 'Buttons',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'href', type: 'string', title: 'URL' },
                { name: 'variant', type: 'string', title: 'Variant', options: { list: ['primary', 'secondary'] } },
                { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title', validation: (Rule) => Rule.max(60).warning('Should be 60 chars or less') },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3, validation: (Rule) => Rule.max(160).warning('Should be 160 chars or less') },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Social Share Image',
          options: { hotspot: true, metadata: ['blurhash', 'lqip', 'palette'] },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        },
      ],
    }),
  ],
});
