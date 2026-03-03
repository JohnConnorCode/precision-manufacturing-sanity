import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
  type: 'document',
  icon: () => '📋',
  preview: {
    prepare() {
      return {
        title: 'Case Studies Page',
        subtitle: 'Hero, filters, and CTA content for the case studies index',
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
        { name: 'badge', type: 'string', title: 'Badge Text', description: 'Small text above the heading (e.g., "PROVEN RESULTS")' },
        { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
        { name: 'titleHighlight', type: 'string', title: 'Title Highlight', description: 'Last word(s) shown with gradient styling' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
      ],
    }),
    defineField({
      name: 'featuredLabel',
      title: 'Featured Label',
      type: 'string',
      description: 'Label shown on the featured case study card (e.g., "Featured Case Study")',
      group: 'content',
      initialValue: 'Featured Case Study',
    }),
    defineField({
      name: 'filterLabel',
      title: 'Filter Label',
      type: 'string',
      description: 'Label for the industry filter (e.g., "Filter by Industry")',
      group: 'content',
      initialValue: 'Filter by Industry',
    }),
    defineField({
      name: 'noResultsMessage',
      title: 'No Results Message',
      type: 'string',
      description: 'Message shown when no case studies match the filter',
      group: 'content',
      initialValue: 'No case studies found for this industry.',
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
