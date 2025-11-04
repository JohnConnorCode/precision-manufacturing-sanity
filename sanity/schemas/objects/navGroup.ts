export default {
  name: 'navGroup',
  type: 'object',
  title: 'Navigation Group',
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

