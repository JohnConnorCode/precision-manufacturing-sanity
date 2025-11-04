export default {
  name: 'richTextSection',
  type: 'object',
  title: 'Rich Text Section',
  fields: [
    { name: 'content', type: 'array', of: [{ type: 'block' }], title: 'Content' },
    { name: 'container', type: 'string', title: 'Container Width', options: { list: [
      { title: 'Default', value: 'default' },
      { title: 'Narrow', value: 'narrow' },
      { title: 'Wide', value: 'wide' },
    ] }, initialValue: 'default' },
  ],
}

