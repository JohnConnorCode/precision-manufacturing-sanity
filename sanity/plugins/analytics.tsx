import { definePlugin } from 'sanity';

/**
 * Analytics & Performance Tracking Plugin
 * Track content performance, usage patterns, and optimization opportunities
 */

export const analytics = definePlugin({
  name: 'analytics',
});

// Analytics configuration
export const analyticsConfig = {
  // Google Analytics integration
  googleAnalytics: {
    enabled: true,
    trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    trackEvents: true,
    trackPageViews: true,
  },

  // Custom event tracking
  customEvents: {
    contentViews: true,
    contentEdits: true,
    contentPublishes: true,
    searchQueries: true,
    assetDownloads: true,
  },

  // Performance monitoring
  performance: {
    trackLoadTimes: true,
    trackImageLoading: true,
    trackAPILatency: true,
  },
};

// Content analytics
export const contentAnalytics = {
  // Track document views
  async trackView(client: any, documentId: string, documentType: string) {
    await client.create({
      _type: 'analytics.view',
      documentId,
      documentType,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });
  },

  // Get view count for a document
  async getViewCount(client: any, documentId: string, dateRange?: { start: Date; end: Date }) {
    const query = dateRange
      ? `count(*[_type == "analytics.view" && documentId == $documentId && timestamp >= $start && timestamp <= $end])`
      : `count(*[_type == "analytics.view" && documentId == $documentId])`;

    return await client.fetch(query, {
      documentId,
      start: dateRange?.start.toISOString(),
      end: dateRange?.end.toISOString(),
    });
  },

  // Get most viewed documents
  async getMostViewed(client: any, documentType: string, limit: number = 10) {
    return await client.fetch(
      `
      *[_type == $documentType]{
        _id,
        title,
        "views": count(*[_type == "analytics.view" && documentId == ^._id])
      } | order(views desc) [0...$limit]
    `,
      { documentType, limit }
    );
  },

  // Get engagement metrics
  async getEngagementMetrics(client: any, documentId: string) {
    return await client.fetch(
      `
      *[_id == $documentId][0]{
        _id,
        title,
        _createdAt,
        _updatedAt,
        "views": count(*[_type == "analytics.view" && documentId == ^._id]),
        "comments": count(*[_type == "comment" && documentId == ^._id]),
        "edits": count(*[_type == "transaction" && references(^._id)]),
        "avgTimeOnPage": avg(*[_type == "analytics.session" && documentId == ^._id].duration)
      }
    `,
      { documentId }
    );
  },
};

// Search analytics
export const searchAnalytics = {
  // Track search query
  async trackSearch(client: any, query: string, resultsCount: number) {
    await client.create({
      _type: 'analytics.search',
      query,
      resultsCount,
      timestamp: new Date().toISOString(),
    });
  },

  // Get popular searches
  async getPopularSearches(client: any, limit: number = 20) {
    return await client.fetch(
      `
      *[_type == "analytics.search"]{
        query,
        "count": count(*[_type == "analytics.search" && query == ^.query])
      }
      | order(count desc)
      | [0...$limit]
    `,
      { limit }
    );
  },

  // Get failed searches (no results)
  async getFailedSearches(client: any, limit: number = 20) {
    return await client.fetch(
      `
      *[_type == "analytics.search" && resultsCount == 0]
      | order(timestamp desc)
      | [0...$limit]
    `,
      { limit }
    );
  },
};

// Performance analytics
export const performanceAnalytics = {
  // Track page load time
  async trackPageLoad(client: any, page: string, loadTime: number) {
    await client.create({
      _type: 'analytics.performance',
      metric: 'pageLoad',
      page,
      value: loadTime,
      timestamp: new Date().toISOString(),
    });
  },

  // Track API latency
  async trackAPILatency(client: any, endpoint: string, latency: number) {
    await client.create({
      _type: 'analytics.performance',
      metric: 'apiLatency',
      endpoint,
      value: latency,
      timestamp: new Date().toISOString(),
    });
  },

  // Get performance metrics
  async getPerformanceMetrics(client: any, metric: string, dateRange?: { start: Date; end: Date }) {
    const query = dateRange
      ? `*[_type == "analytics.performance" && metric == $metric && timestamp >= $start && timestamp <= $end]`
      : `*[_type == "analytics.performance" && metric == $metric]`;

    const results = await client.fetch(query, {
      metric,
      start: dateRange?.start.toISOString(),
      end: dateRange?.end.toISOString(),
    });

    return {
      average: results.reduce((sum: number, r: any) => sum + r.value, 0) / results.length,
      min: Math.min(...results.map((r: any) => r.value)),
      max: Math.max(...results.map((r: any) => r.value)),
      count: results.length,
    };
  },
};

// Content optimization insights
export const contentInsights = {
  // Get content that needs attention
  async getContentNeedingAttention(client: any) {
    return await client.fetch(`
      *[_type in ["service", "industry", "resource"]]{
        _id,
        _type,
        title,
        _updatedAt,
        "views": count(*[_type == "analytics.view" && documentId == ^._id]),
        "daysSinceUpdate": round((now() - dateTime(_updatedAt)) / 86400),
        "needsAttention": select(
          count(*[_type == "analytics.view" && documentId == ^._id]) < 10 => "Low engagement",
          (now() - dateTime(_updatedAt)) / 86400 > 90 => "Outdated content",
          !defined(seo.metaDescription) => "Missing SEO",
          false
        )
      }[defined(needsAttention)]
    `);
  },

  // Get content performance report
  async getPerformanceReport(client: any, dateRange: { start: Date; end: Date }) {
    return await client.fetch(
      `
      {
        "topPerformers": *[_type in ["service", "industry", "resource"]]{
          _id,
          _type,
          title,
          "views": count(*[_type == "analytics.view" && documentId == ^._id && timestamp >= $start && timestamp <= $end])
        } | order(views desc) [0...5],

        "leastViewed": *[_type in ["service", "industry", "resource"]]{
          _id,
          _type,
          title,
          "views": count(*[_type == "analytics.view" && documentId == ^._id && timestamp >= $start && timestamp <= $end])
        } | order(views asc) [0...5],

        "recentlyUpdated": *[_type in ["service", "industry", "resource"] && _updatedAt >= $start]{
          _id,
          _type,
          title,
          _updatedAt
        } | order(_updatedAt desc) [0...5]
      }
    `,
      {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
      }
    );
  },
};

// Export utilities
export const analyticsExport = {
  // Export analytics data as CSV
  async exportToCSV(data: any[], filename: string) {
    if (!data.length) return;

    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',')
              ? `"${value}"`
              : value;
          })
          .join(',')
      ),
    ].join('\n');

    // Browser download
    if (typeof window !== 'undefined') {
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
    }

    return csv;
  },
};
