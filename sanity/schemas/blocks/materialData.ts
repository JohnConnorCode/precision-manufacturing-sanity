export default {
  name: 'materialData',
  type: 'object',
  title: 'Material Data',
  description: 'Detailed material specifications, properties, and machining considerations',
  fields: [
    {
      name: 'materialName',
      type: 'string',
      title: 'Material Name',
      description: 'Name of the material (e.g., "Aluminum Alloys (6061, 7075)")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'grade',
      type: 'string',
      title: 'Grade/Temper',
      description: 'Material grade or temper (e.g., "T6 Temper", "Grade 5")',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Brief description of the material and its characteristics',
      rows: 2,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'properties',
      type: 'array',
      title: 'Material Properties',
      description: 'Key properties and specifications',
      of: [
        {
          type: 'object',
          title: 'Property',
          fields: [
            {
              name: 'property',
              type: 'string',
              title: 'Property Name',
              description: 'Name of the property (e.g., "Typical Tolerance", "Surface Finish")',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'Value of the property',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'unit',
              type: 'string',
              title: 'Unit',
              description: 'Unit of measurement (e.g., "inches", "mm", "Ra µin")',
            },
            {
              name: 'testMethod',
              type: 'string',
              title: 'Test Method',
              description: 'Testing or measurement method used',
            },
          ],
          preview: {
            select: {
              property: 'property',
              value: 'value',
              unit: 'unit',
            },
            prepare({ property, value, unit }: any) {
              return {
                title: property || 'Property',
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
      description: 'Typical applications and use cases for this material',
      rows: 2,
    },
    {
      name: 'machiningConsiderations',
      type: 'text',
      title: 'Machining Considerations',
      description: 'Important considerations and best practices for machining this material',
      rows: 3,
    },
  ],
  preview: {
    select: {
      name: 'materialName',
      grade: 'grade',
      properties: 'properties',
    },
    prepare({ name, grade, properties }: any) {
      return {
        title: name || 'Material Data',
        subtitle: `${grade || ''} - ${properties?.length || 0} properties`.trim(),
      };
    },
  },
};
