'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    _linkedin_partner_id?: string;
    lintrk?: (...args: any[]) => void;
  }
}

interface AnalyticsProps {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  linkedInPartnerId?: string;
  hotjarId?: string;
}

export function Analytics({
  googleAnalyticsId,
  facebookPixelId,
  linkedInPartnerId,
  hotjarId
}: AnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Google Analytics 4
  useEffect(() => {
    if (typeof window !== 'undefined' && googleAnalyticsId) {
      // Load GA4 script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      script.async = true;
      document.head.appendChild(script);

      // Initialize GA4
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', googleAnalyticsId, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
        // Enhanced ecommerce for B2B tracking
        custom_map: {
          custom_parameter_1: 'software_solution',
          custom_parameter_2: 'turbine_manufacturer',
          custom_parameter_3: 'data_integration_type',
        },
        // Privacy settings
        anonymize_ip: true,
        allow_google_signals: false,
        cookie_expires: 60 * 60 * 24 * 30, // 30 days
      });

      // Set custom dimensions for data-driven machining
      gtag('config', googleAnalyticsId, {
        custom_map: {
          custom_dimension_1: 'metbase_interest',
          custom_dimension_2: 'turbine_type',
          custom_dimension_3: 'data_integration_need',
        }
      });
    }
  }, [googleAnalyticsId]);

  // Facebook Pixel
  useEffect(() => {
    if (typeof window !== 'undefined' && facebookPixelId) {
      // Load Facebook Pixel
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${facebookPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      // Track custom B2B events
      if (window.fbq) {
        window.fbq('trackCustom', 'B2BWebsiteVisit', {
          industry: 'data_driven_machining',
          services: 'metbase_software,adaptive_machining',
          specialties: 'industrial_gas_turbines,cmm_inspection',
          certifications: 'ISO9001,AS9100,ITAR'
        });
      }
    }
  }, [facebookPixelId]);

  // LinkedIn Insight Tag
  useEffect(() => {
    if (typeof window !== 'undefined' && linkedInPartnerId) {
      window._linkedin_partner_id = linkedInPartnerId;

      const script = document.createElement('script');
      script.innerHTML = `
        _linkedin_data_partner_id = "${linkedInPartnerId}";
      `;
      document.head.appendChild(script);

      const script2 = document.createElement('script');
      script2.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      script2.async = true;
      document.head.appendChild(script2);

      // Track B2B conversion events
      if (window.lintrk) {
        window.lintrk('track', { conversion_id: 'lead_generation' });
      }
    }
  }, [linkedInPartnerId]);

  // Hotjar
  useEffect(() => {
    if (typeof window !== 'undefined' && hotjarId) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${hotjarId},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;
      document.head.appendChild(script);
    }
  }, [hotjarId]);

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = pathname + searchParams.toString();

      // Google Analytics page view
      if (window.gtag) {
        window.gtag('config', googleAnalyticsId, {
          page_path: url,
          page_title: document.title,
        });

        // Track industry-specific page views
        const industry = pathname.includes('/industries/') ? pathname.split('/industries/')[1] : null;
        const service = pathname.includes('/services/') ? pathname.split('/services/')[1] : null;
        const metbaseView = pathname.includes('metbase') || pathname.includes('Metbase');

        if (industry) {
          window.gtag('event', 'industry_page_view', {
            industry_type: industry,
            turbine_focus: industry === 'gas-turbines' ? 'primary' : 'secondary',
            page_path: url,
          });
        }

        if (service) {
          window.gtag('event', 'service_page_view', {
            service_category: service,
            data_driven: service === 'adaptive-machining' || service === 'metrology' ? 'yes' : 'no',
            page_path: url,
          });
        }

        if (metbaseView) {
          window.gtag('event', 'metbase_interest', {
            event_category: 'software_solution',
            software_type: 'metbase',
            page_path: url,
          });
        }
      }

      // Facebook Pixel page view
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
    }
  }, [pathname, searchParams, googleAnalyticsId]);

  return null;
}

// Helper functions for tracking custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackQuoteRequest = (service?: string, industry?: string) => {
  trackEvent('quote_request', {
    event_category: 'lead_generation',
    service_type: service,
    industry_type: industry,
    value: 1000, // Estimated lead value
  });

  // Facebook Pixel custom conversion
  if (window.fbq) {
    window.fbq('trackCustom', 'QuoteRequest', {
      service: service,
      industry: industry,
      lead_type: 'machining_quote'
    });
  }
};

export const trackContactSubmission = (contactType: string) => {
  trackEvent('contact_form_submission', {
    event_category: 'lead_generation',
    contact_type: contactType,
    value: 500,
  });
};

export const trackResourceDownload = (resourceTitle: string, category: string) => {
  trackEvent('resource_download', {
    event_category: 'engagement',
    resource_title: resourceTitle,
    resource_category: category,
  });
};

export const trackServiceInquiry = (service: string) => {
  trackEvent('service_inquiry', {
    event_category: 'lead_generation',
    service_type: service,
    value: 750,
  });
};

export default Analytics;