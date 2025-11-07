'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  inp?: number;
}

interface PerformanceEntry extends globalThis.PerformanceEntry {
  value?: number;
  processingStart?: number;
  processingEnd?: number;
  target?: Element;
}

export function PerformanceMonitor() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const metrics: PerformanceMetrics = {};

    // Core Web Vitals observer
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const perfEntry = entry as PerformanceEntry;

        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
              sendMetric('FCP', entry.startTime, pathname);
            }
            break;

          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime;
            sendMetric('LCP', entry.startTime, pathname);
            break;

          case 'first-input':
            if (perfEntry.processingStart && perfEntry.processingEnd) {
              const fid = perfEntry.processingStart - entry.startTime;
              metrics.fid = fid;
              sendMetric('FID', fid, pathname);
            }
            break;

          case 'layout-shift':
            if (!perfEntry.value) break;
            if (perfEntry.value > 0) {
              metrics.cls = (metrics.cls || 0) + perfEntry.value;
              sendMetric('CLS', metrics.cls, pathname);
            }
            break;

          case 'navigation': {
            const navEntry = entry as PerformanceNavigationTiming;
            const ttfb = navEntry.responseStart - navEntry.fetchStart;
            metrics.ttfb = ttfb;
            sendMetric('TTFB', ttfb, pathname);
            break;
          }
        }
      }
    });

    // Observe Core Web Vitals
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
    } catch (e) {
      console.warn('Performance observer not supported:', e);
    }

    // INP (Interaction to Next Paint) - newer metric
    if ('PerformanceEventTiming' in window) {
      const inpObserver = new PerformanceObserver((entryList) => {
        let maxInp = 0;
        for (const entry of entryList.getEntries()) {
          const perfEntry = entry as PerformanceEntry;
          if (perfEntry.processingStart && perfEntry.processingEnd) {
            const inp = perfEntry.processingEnd - entry.startTime;
            maxInp = Math.max(maxInp, inp);
          }
        }
        if (maxInp > 0) {
          metrics.inp = maxInp;
          sendMetric('INP', maxInp, pathname);
        }
      });

      try {
        inpObserver.observe({ entryTypes: ['event'] });
      } catch (e) {
        console.warn('INP observer not supported:', e);
      }
    }

    // Resource loading performance
    const resourceObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const resource = entry as PerformanceResourceTiming;

        // Track slow resources (>1s)
        if (resource.duration > 1000) {
          sendResourceMetric(resource.name, resource.duration, resource.transferSize || 0, pathname);
        }

        // Track large resources (>500KB)
        if (resource.transferSize && resource.transferSize > 500000) {
          sendResourceMetric(resource.name, resource.duration, resource.transferSize, pathname, 'large-resource');
        }
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource observer not supported:', e);
    }

    // Memory usage monitoring
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB threshold
          sendMemoryMetric(memory.usedJSHeapSize, memory.totalJSHeapSize, pathname);
        }
      }
    };

    const memoryInterval = setInterval(monitorMemory, 30000); // Check every 30s

    // Page visibility API for tab switching
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        sendEngagementMetric('tab-focus', pathname);
      } else {
        sendEngagementMetric('tab-blur', pathname);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      observer.disconnect();
      clearInterval(memoryInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}

function sendMetric(name: string, value: number, pathname: string) {
  // Send to Google Analytics
  if (window.gtag) {
    window.gtag('event', 'web_vitals', {
      event_category: 'Performance',
      metric_name: name,
      metric_value: Math.round(value),
      page_path: pathname,
      metric_rating: getMetricRating(name, value),
      custom_parameter_1: 'core_web_vitals'
    });
  }

  // Send to Facebook Pixel
  if (window.fbq) {
    window.fbq('trackCustom', 'PerformanceMetric', {
      metric_name: name,
      metric_value: value,
      page_path: pathname,
      rating: getMetricRating(name, value)
    });
  }

  // Console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name}: ${Math.round(value)}ms (${getMetricRating(name, value)}) - ${pathname}`);
  }
}

function sendResourceMetric(url: string, duration: number, size: number, pathname: string, type = 'slow-resource') {
  if (window.gtag) {
    window.gtag('event', 'resource_performance', {
      event_category: 'Performance',
      resource_url: url.split('/').pop(), // Just filename for privacy
      resource_duration: Math.round(duration),
      resource_size: size,
      resource_type: type,
      page_path: pathname
    });
  }
}

function sendMemoryMetric(used: number, total: number, pathname: string) {
  if (window.gtag) {
    window.gtag('event', 'memory_usage', {
      event_category: 'Performance',
      memory_used_mb: Math.round(used / 1024 / 1024),
      memory_total_mb: Math.round(total / 1024 / 1024),
      memory_usage_percent: Math.round((used / total) * 100),
      page_path: pathname
    });
  }
}

function sendEngagementMetric(action: string, pathname: string) {
  if (window.gtag) {
    window.gtag('event', 'user_engagement', {
      event_category: 'Engagement',
      engagement_action: action,
      page_path: pathname
    });
  }
}

function getMetricRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 }
  };

  const threshold = thresholds[metric as keyof typeof thresholds];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export default PerformanceMonitor;