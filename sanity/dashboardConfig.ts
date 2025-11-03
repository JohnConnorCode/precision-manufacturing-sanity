import { DashboardWidget } from 'sanity';

/**
 * Custom Dashboard Configuration
 * Provides at-a-glance content overview and quick actions
 */

export const dashboardConfig: DashboardWidget[] = [
  {
    name: 'project-info',
    layout: { width: 'medium' },
  },
  {
    name: 'document-list',
    options: {
      title: 'Recent Services',
      order: '_createdAt desc',
      types: ['service'],
      limit: 5,
    },
    layout: { width: 'medium' },
  },
  {
    name: 'document-list',
    options: {
      title: 'Recent Industries',
      order: '_createdAt desc',
      types: ['industry'],
      limit: 5,
    },
    layout: { width: 'medium' },
  },
  {
    name: 'document-list',
    options: {
      title: 'Recent Resources',
      order: '_createdAt desc',
      types: ['resource'],
      limit: 10,
    },
    layout: { width: 'medium' },
  },
];

// Custom widget for content statistics
export const contentStatsWidget = {
  name: 'content-stats',
  component: () => {
    return `
      <div style="padding: 1rem;">
        <h2>Content Statistics</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
          <div style="padding: 1rem; background: #f3f4f6; border-radius: 8px;">
            <h3>Services</h3>
            <p style="font-size: 2rem; font-weight: bold;">4</p>
          </div>
          <div style="padding: 1rem; background: #f3f4f6; border-radius: 8px;">
            <h3>Industries</h3>
            <p style="font-size: 2rem; font-weight: bold;">3</p>
          </div>
          <div style="padding: 1rem; background: #f3f4f6; border-radius: 8px;">
            <h3>Resources</h3>
            <p style="font-size: 2rem; font-weight: bold;">50+</p>
          </div>
        </div>
      </div>
    `;
  },
};
