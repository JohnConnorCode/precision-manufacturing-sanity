export default {
  name: 'jobPosting',
  type: 'document',
  title: 'Job Postings',
  icon: () => '💼',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Job Title',
      description: 'e.g., "Senior CNC Machinist", "Quality Inspector"',
      validation: (Rule: any) => Rule.required().error('Job title is required')
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly version of the job title',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required().error('Click Generate to create slug')
    },
    {
      name: 'department',
      type: 'string',
      title: 'Department',
      description: 'e.g., "Manufacturing", "Quality Assurance", "Engineering"',
      options: {
        list: [
          { title: 'Manufacturing', value: 'Manufacturing' },
          { title: 'Quality Assurance', value: 'Quality Assurance' },
          { title: 'Engineering', value: 'Engineering' },
          { title: 'Operations', value: 'Operations' },
          { title: 'Sales & Marketing', value: 'Sales & Marketing' },
          { title: 'Administration', value: 'Administration' }
        ]
      }
    },
    {
      name: 'type',
      type: 'string',
      title: 'Employment Type',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Temporary', value: 'Temporary' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
      description: 'e.g., "Clackamas, OR", "Remote", "Hybrid"',
      initialValue: 'Clackamas, OR'
    },
    {
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      description: 'Brief summary shown in job listings (1-2 sentences)',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300).warning('Keep under 300 characters')
    },
    {
      name: 'description',
      type: 'array',
      title: 'Full Job Description',
      description: 'Detailed description of the role, responsibilities, and requirements',
      of: [{ type: 'block' }]
    },
    {
      name: 'responsibilities',
      type: 'array',
      title: 'Key Responsibilities',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.min(3).warning('Add at least 3 responsibilities')
    },
    {
      name: 'qualifications',
      type: 'array',
      title: 'Required Qualifications',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.min(3).warning('Add at least 3 qualifications')
    },
    {
      name: 'preferredQualifications',
      type: 'array',
      title: 'Preferred Qualifications',
      description: 'Nice-to-have skills and experience',
      of: [{ type: 'string' }]
    },
    {
      name: 'benefits',
      type: 'array',
      title: 'Benefits Highlights',
      description: 'Key benefits specific to this role (or leave empty to use company-wide benefits)',
      of: [{ type: 'string' }]
    },
    {
      name: 'salaryRange',
      type: 'object',
      title: 'Salary Range',
      description: 'Optional - display salary information',
      fields: [
        {
          name: 'min',
          type: 'number',
          title: 'Minimum ($)',
          validation: (Rule: any) => Rule.positive()
        },
        {
          name: 'max',
          type: 'number',
          title: 'Maximum ($)',
          validation: (Rule: any) => Rule.positive()
        },
        {
          name: 'period',
          type: 'string',
          title: 'Period',
          options: {
            list: [
              { title: 'Per Hour', value: 'hour' },
              { title: 'Per Year', value: 'year' }
            ]
          }
        }
      ]
    },
    {
      name: 'applicationLink',
      type: 'string',
      title: 'Application Link',
      description: 'External application URL (e.g., ADP, Indeed) or email address',
      placeholder: 'https://... or email@iismet.com'
    },
    {
      name: 'applicationInstructions',
      type: 'text',
      title: 'Application Instructions',
      description: 'How to apply (shown if no external link)',
      rows: 3,
      placeholder: 'Send resume to careers@iismet.com with subject line "Job Title - Your Name"'
    },
    {
      name: 'published',
      type: 'boolean',
      title: 'Published',
      description: 'Show this job on the careers page',
      initialValue: true,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Show at the top of job listings',
      initialValue: false
    },
    {
      name: 'postedDate',
      type: 'date',
      title: 'Posted Date',
      description: 'When this job was first posted',
      initialValue: () => new Date().toISOString().split('T')[0]
    },
    {
      name: 'closingDate',
      type: 'date',
      title: 'Closing Date',
      description: 'Optional - when applications close'
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first (featured jobs always first)',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      type: 'type',
      published: 'published',
      featured: 'featured'
    },
    prepare(selection: any) {
      const { title, department, type, published, featured } = selection
      let subtitle = type
      if (department) subtitle += ` • ${department}`

      const status = []
      if (featured) status.push('⭐ FEATURED')
      if (!published) status.push('🔒 DRAFT')

      return {
        title: status.length > 0 ? `${title} ${status.join(' ')}` : title,
        subtitle
      }
    }
  },
  orderings: [
    {
      title: 'Featured First, Then Order',
      name: 'featuredAndOrder',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
        { field: 'postedDate', direction: 'desc' }
      ]
    },
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'postedDate', direction: 'desc' }]
    },
    {
      title: 'Department A-Z',
      name: 'departmentAsc',
      by: [
        { field: 'department', direction: 'asc' },
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
}
