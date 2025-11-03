/**
 * Content Templates
 * Pre-configured templates for common content types
 */

export const contentTemplates = {
  // Service Page Template
  service: {
    title: '[Service Name]',
    shortDescription: 'Brief description of the service (150-200 characters)',
    order: 99,
    highlight: false,
    hero: {
      title: '[Service Name]',
      subtitle: 'Professional [service type] for [industry]',
      description: 'Detailed description of what makes this service unique',
      backgroundImage: null,
    },
    overview: {
      title: 'Overview',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Add comprehensive overview of the service here...',
            },
          ],
        },
      ],
    },
    capabilities: {
      title: 'Our Capabilities',
      items: [],
    },
    technicalSpecs: {
      title: 'Technical Specifications',
      items: [],
    },
  },

  // Industry Page Template
  industry: {
    title: '[Industry Name]',
    shortDescription: 'Brief description of industry focus (150-200 characters)',
    order: 99,
    highlight: false,
    hero: {
      title: '[Industry Name]',
      subtitle: 'Precision manufacturing solutions for [industry]',
      backgroundImage: null,
    },
    overview: {
      title: 'Industry Overview',
      content: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Add industry overview here...',
            },
          ],
        },
      ],
    },
    applications: {
      title: 'Applications',
      items: [],
    },
    compliance: {
      title: 'Compliance & Standards',
      items: [],
    },
  },

  // Resource/Blog Post Template
  resource: {
    title: '[Resource Title]',
    category: 'manufacturing-processes',
    excerpt: 'Brief excerpt describing what this resource covers (200-300 characters)',
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Introduction',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Add introduction here...',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Main Content',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Add main content here...',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Conclusion',
          },
        ],
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Add conclusion here...',
          },
        ],
      },
    ],
    tags: [],
    relatedServices: [],
  },

  // Team Member Template
  teamMember: {
    name: '[Full Name]',
    role: '[Job Title]',
    order: 99,
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Add professional bio here...',
          },
        ],
      },
    ],
    expertise: [],
    certifications: [],
    linkedin: '',
    email: '',
  },
};

// Function to apply template to new document
export function applyTemplate(documentType: string, customData?: any) {
  const template = contentTemplates[documentType as keyof typeof contentTemplates];
  if (!template) {
    return customData || {};
  }

  return {
    ...template,
    ...customData,
    _type: documentType,
  };
}
