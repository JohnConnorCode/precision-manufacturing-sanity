export const searchConfig = {
  search: {
    // Define which fields are searchable
    __experimental_search: [
      {
        // Services
        _type: 'service',
        weight: 10,
        path: 'title',
      },
      {
        _type: 'service',
        weight: 5,
        path: 'shortDescription',
      },
      {
        _type: 'service',
        weight: 3,
        path: 'description',
      },
      // Industries
      {
        _type: 'industry',
        weight: 10,
        path: 'title',
      },
      {
        _type: 'industry',
        weight: 5,
        path: 'shortDescription',
      },
      // Resources
      {
        _type: 'resource',
        weight: 10,
        path: 'title',
      },
      {
        _type: 'resource',
        weight: 8,
        path: 'category',
      },
      {
        _type: 'resource',
        weight: 5,
        path: 'excerpt',
      },
      {
        _type: 'resource',
        weight: 3,
        path: 'content',
      },
      // Team Members
      {
        _type: 'teamMember',
        weight: 10,
        path: 'name',
      },
      {
        _type: 'teamMember',
        weight: 8,
        path: 'role',
      },
      {
        _type: 'teamMember',
        weight: 5,
        path: 'bio',
      },
    ],
  },
};

// Weighted search operators for better results
export const searchOperators = {
  boost: {
    title: 3.0,
    description: 2.0,
    content: 1.0,
    tags: 2.5,
  },
  filters: {
    type: true,
    category: true,
    status: true,
    publishedAt: true,
  },
};
