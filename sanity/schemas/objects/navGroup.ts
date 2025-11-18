export default {
  name: 'navGroup',
  type: 'object',
  title: 'Navigation Group',
  preview: {
    select: {
      title: 'groupTitle',
      items: 'items',
    },
    prepare(selection: any) {
      const { title, items } = selection
      const count = items?.length || 0
      return {
        title: `📁 ${title || 'Untitled Group'}`,
        subtitle: `${count} item${count !== 1 ? 's' : ''}`,
      }
    }
  },
  fields: [
    { name: 'groupTitle', type: 'string', title: 'Group Title', validation: (Rule: any) => Rule.required() },
    {
      name: 'items',
      type: 'array',
      title: 'Group Items',
      of: [{ type: 'navItem' }],
      options: { sortable: true },
      validation: (Rule: any) => Rule.min(1).warning('Add at least one item to the group'),
    },
  ],
}

