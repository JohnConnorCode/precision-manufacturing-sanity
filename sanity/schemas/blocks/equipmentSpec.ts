export default {
  name: 'equipmentSpec',
  type: 'object',
  title: 'Equipment Specification',
  description: 'Detailed equipment specifications, capabilities, and technical parameters',
  fields: [
    {
      name: 'equipmentName',
      type: 'string',
      title: 'Equipment Name',
      description: 'Name or type of equipment (e.g., "5-Axis CNC Machining Center")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'manufacturer',
      type: 'string',
      title: 'Manufacturer',
      description: 'Equipment manufacturer (e.g., "DMG Mori / Mazak")',
    },
    {
      name: 'model',
      type: 'string',
      title: 'Model',
      description: 'Specific model or series (e.g., "DMU 50 / Integrex Series")',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Equipment Image',
      description: 'Photo or diagram of the equipment',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    },
    {
      name: 'specifications',
      type: 'array',
      title: 'Specifications',
      description: 'Technical specifications and capabilities',
      of: [
        {
          type: 'object',
          title: 'Specification',
          fields: [
            {
              name: 'parameter',
              type: 'string',
              title: 'Parameter',
              description: 'Name of the specification (e.g., "Positioning Accuracy")',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'Value of the specification',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'unit',
              type: 'string',
              title: 'Unit',
              description: 'Unit of measurement',
            },
            {
              name: 'tolerance',
              type: 'string',
              title: 'Tolerance/Notes',
              description: 'Tolerance range or additional notes',
            },
          ],
          preview: {
            select: {
              parameter: 'parameter',
              value: 'value',
              unit: 'unit',
            },
            prepare({ parameter, value, unit }: any) {
              return {
                title: parameter || 'Parameter',
                subtitle: `${value || ''} ${unit || ''}`.trim(),
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.min(1),
    },
    {
      name: 'applications',
      type: 'text',
      title: 'Applications',
      description: 'Typical applications and use cases for this equipment',
      rows: 2,
    },
    {
      name: 'advantages',
      type: 'text',
      title: 'Advantages',
      description: 'Key advantages and benefits of this equipment',
      rows: 2,
    },
  ],
  preview: {
    select: {
      name: 'equipmentName',
      manufacturer: 'manufacturer',
      model: 'model',
      image: 'image',
    },
    prepare({ name, manufacturer, model, image }: any) {
      return {
        title: name || 'Equipment Specification',
        subtitle: [manufacturer, model].filter(Boolean).join(' - '),
        media: image,
      };
    },
  },
};
