import { defineType } from 'sanity';

export default defineType({
  name: 'colorStyle',
  title: 'Color Style',
  type: 'object',
  fields: [
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          // Neutrals
          { title: 'Black', value: '#000000' },
          { title: 'White', value: '#FFFFFF' },
          { title: 'Slate 50', value: '#F8FAFC' },
          { title: 'Slate 100', value: '#F1F5F9' },
          { title: 'Slate 200', value: '#E2E8F0' },
          { title: 'Slate 300', value: '#CBD5E1' },
          { title: 'Slate 400', value: '#94A3B8' },
          { title: 'Slate 500', value: '#64748B' },
          { title: 'Slate 600', value: '#475569' },
          { title: 'Slate 700', value: '#334155' },
          { title: 'Slate 800', value: '#1E293B' },
          { title: 'Slate 900', value: '#0F172A' },
          { title: 'Slate 950', value: '#020617' },
          // Blues
          { title: 'Blue 400', value: '#60A5FA' },
          { title: 'Blue 500', value: '#3B82F6' },
          { title: 'Blue 600', value: '#2563EB' },
          { title: 'Blue 700', value: '#1D4ED8' },
          { title: 'Blue 800', value: '#1E40AF' },
          // Indigos
          { title: 'Indigo 400', value: '#818CF8' },
          { title: 'Indigo 500', value: '#6366F1' },
          { title: 'Indigo 600', value: '#4F46E5' },
          { title: 'Indigo 700', value: '#4338CA' },
          // Purples
          { title: 'Purple 400', value: '#C084FC' },
          { title: 'Purple 500', value: '#A855F7' },
          { title: 'Purple 600', value: '#9333EA' },
          { title: 'Purple 700', value: '#7E22CE' },
          // Cyans
          { title: 'Cyan 400', value: '#22D3EE' },
          { title: 'Cyan 500', value: '#06B6D4' },
          { title: 'Cyan 600', value: '#0891B2' },
          { title: 'Cyan 700', value: '#0E7490' },
          // Teals
          { title: 'Teal 400', value: '#2DD4BF' },
          { title: 'Teal 500', value: '#14B8A6' },
          { title: 'Teal 600', value: '#0D9488' },
          { title: 'Teal 700', value: '#0F766E' },
          // Emeralds
          { title: 'Emerald 400', value: '#34D399' },
          { title: 'Emerald 500', value: '#10B981' },
          { title: 'Emerald 600', value: '#059669' },
          { title: 'Emerald 700', value: '#047857' },
          // Oranges
          { title: 'Orange 400', value: '#FB923C' },
          { title: 'Orange 500', value: '#F97316' },
          { title: 'Orange 600', value: '#EA580C' },
          { title: 'Orange 700', value: '#C2410C' },
          // Reds
          { title: 'Red 400', value: '#F87171' },
          { title: 'Red 500', value: '#EF4444' },
          { title: 'Red 600', value: '#DC2626' },
          { title: 'Red 700', value: '#B91C1C' },
        ],
      },
      description: 'Select a color from the list or enter a custom hex code (e.g., #2563EB)',
    },
    {
      name: 'opacity',
      title: 'Opacity',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 100,
      description: 'Opacity from 0 (transparent) to 100 (solid)',
    },
  ],
  preview: {
    select: {
      color: 'color',
      opacity: 'opacity',
    },
    prepare({ color, opacity }) {
      return {
        title: color || 'No color selected',
        subtitle: `Opacity: ${opacity || 100}%`,
      };
    },
  },
});
