export default {
  name: 'jobPosting',
  type: 'document',
  title: 'Job Postings',
  icon: () => '💼',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Job Content' },
    { name: 'application', title: 'Application' },
    { name: 'settings', title: 'Settings' }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Job Title',
      description: 'e.g., "Senior CNC Machinist", "Quality Inspector"',
      group: 'basic',
      validation: (Rule: any) => Rule.required().error('Job title is required')
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly version of the job title',
      group: 'basic',
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
      group: 'basic',
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
      title: 'Employment Type (Legacy)',
      description: 'DEPRECATED: Use employmentType instead',
      hidden: true,
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Temporary', value: 'Temporary' }
        ]
      }
    },
    {
      name: 'employmentType',
      type: 'string',
      title: 'Employment Type',
      group: 'basic',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Temporary', value: 'Temporary' }
        ]
      },
      initialValue: 'Full-time',
      validation: (Rule: any) => Rule.required().error('Employment type is required')
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
      description: 'e.g., "Clackamas, OR", "Remote", "Hybrid"',
      group: 'basic',
      initialValue: 'Clackamas, OR'
    },
    {
      name: 'shortDescription',
      type: 'text',
      title: 'Short Description',
      description: 'Brief summary shown in job listings (1-2 sentences)',
      group: 'basic',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300).warning('Keep under 300 characters')
    },
    {
      name: 'overview',
      type: 'array',
      title: 'Overview',
      description: 'Detailed overview of the role (2-3 paragraphs) - Rich text editor with formatting',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule: any) => Rule.required().error('Overview is required for job detail page')
    },
    {
      name: 'responsibilities',
      type: 'array',
      title: 'Key Responsibilities',
      group: 'content',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.min(3).warning('Add at least 3 responsibilities')
    },
    {
      name: 'qualifications',
      type: 'array',
      title: 'Required Qualifications',
      group: 'content',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.min(3).warning('Add at least 3 qualifications')
    },
    {
      name: 'preferredQualifications',
      type: 'array',
      title: 'Preferred Qualifications',
      description: 'Nice-to-have skills and experience',
      group: 'content',
      of: [{ type: 'string' }]
    },
    {
      name: 'benefits',
      type: 'array',
      title: 'Benefits Highlights',
      description: 'Key benefits specific to this role (or leave empty to use company-wide benefits)',
      group: 'content',
      of: [{ type: 'string' }]
    },
    {
      name: 'salaryRange',
      type: 'string',
      title: 'Salary Range',
      description: 'Optional - e.g., "$65,000 - $85,000/year" or "$25 - $35/hour"',
      group: 'basic',
      placeholder: '$65,000 - $85,000/year'
    },
    {
      name: 'description',
      type: 'array',
      title: 'Full Job Description (Advanced)',
      description: 'Optional - Rich text description with formatting (legacy field)',
      group: 'content',
      hidden: true,
      of: [{ type: 'block' }]
    },
    {
      name: 'applicationEmail',
      type: 'string',
      title: 'Application Email',
      description: 'Email address for job applications',
      group: 'application',
      placeholder: 'hr@iismet.com',
      initialValue: 'hr@iismet.com',
      validation: (Rule: any) => Rule.email().error('Please enter a valid email address')
    },
    {
      name: 'applicationInstructions',
      type: 'text',
      title: 'Application Instructions',
      description: 'Optional - Special instructions for applicants',
      group: 'application',
      rows: 3,
      placeholder: 'Please include 3 professional references with your application'
    },
    {
      name: 'applicationLink',
      type: 'string',
      title: 'Application Link (Advanced)',
      description: 'Optional - External application URL (e.g., ADP, Indeed)',
      group: 'application',
      hidden: true,
      placeholder: 'https://...'
    },
    {
      name: 'published',
      type: 'boolean',
      title: 'Published',
      description: 'Show this job on the careers page',
      group: 'settings',
      initialValue: true,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      description: 'Show at the top of job listings',
      group: 'settings',
      initialValue: false
    },
    {
      name: 'datePosted',
      type: 'date',
      title: 'Date Posted',
      description: 'When this job was first posted (shown on job detail page)',
      group: 'settings',
      initialValue: () => new Date().toISOString().split('T')[0]
    },
    {
      name: 'closingDate',
      type: 'date',
      title: 'Closing Date',
      description: 'Optional - when applications close',
      group: 'settings'
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Lower numbers appear first (featured jobs always first)',
      group: 'settings',
      initialValue: 0
    },
    {
      name: 'postedDate',
      type: 'date',
      title: 'Posted Date (Legacy)',
      description: 'DEPRECATED: Use datePosted instead',
      group: 'settings',
      hidden: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      employmentType: 'employmentType',
      type: 'type',
      published: 'published',
      featured: 'featured'
    },
    prepare(selection: any) {
      const { title, department, employmentType, type, published, featured } = selection
      const empType = employmentType || type || 'Full-time'
      let subtitle = empType
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
