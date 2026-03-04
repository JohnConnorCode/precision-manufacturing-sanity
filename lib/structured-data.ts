// Comprehensive structured data (JSON-LD) for world-class SEO

export interface OrganizationData {
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    telephone: string;
    email: string;
    contactType: string;
  };
  sameAs: string[];
}

export interface ServiceData {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  serviceType: string;
  url: string;
}

export interface ArticleData {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  url: string;
  image?: string;
  articleSection: string;
  keywords: string[];
}

export interface ProductData {
  name: string;
  description: string;
  manufacturer: string;
  category: string;
  offers: {
    priceCurrency: string;
    availability: string;
    url: string;
  };
}

// Organization Schema (for all pages)
export function generateOrganizationSchema(data: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${data.url}#organization`,
    "name": data.name,
    "alternateName": data.alternateName,
    "url": data.url,
    "logo": {
      "@type": "ImageObject",
      "url": data.logo,
      "width": 600,
      "height": 200
    },
    "description": data.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": data.contactPoint.telephone,
      "email": data.contactPoint.email,
      "contactType": data.contactPoint.contactType,
      "availableLanguage": "English"
    },
    "sameAs": data.sameAs,
    "foundingDate": data.foundingDate || "1995",
    "numberOfEmployees": "25+",
    "industry": "Precision Machining & Inspection",
    "naics": "332710", // Machine Shops
    "certifications": [
      "AS9100",
      "ISO 9001",
      "ITAR"
    ],
    "knowsAbout": [
      "First Article Inspection (FAI)",
      "CMM inspection services",
      "Dimensional measurement",
      "GD&T principles",
      "MetBase® proprietary software",
      "Coordinate measuring machines",
      "Aerospace machining",
      "Defense machining",
      "Statistical process control",
      "Process capability studies",
      "Reverse engineering"
    ],
    "specialties": [
      "CMM Inspection Services",
      "First Article Inspection",
      "Precision Machining",
      "MetBase® Data Integration",
      "Dimensional Measurement",
      "Process Verification"
    ]
  };
}

// Local Business Schema (for contact/about pages)
export function generateLocalBusinessSchema(data: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${data.url}#localbusiness`,
    "name": data.name,
    "description": data.description,
    "url": data.url,
    "telephone": data.contactPoint.telephone,
    "email": data.contactPoint.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.streetAddress,
      "addressLocality": data.address.addressLocality,
      "addressRegion": data.address.addressRegion,
      "postalCode": data.address.postalCode,
      "addressCountry": data.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.5152,  // Update with actual coordinates
      "longitude": -122.6784
    },
    "openingHours": [
      "Mo-Fr 07:00-18:00",
      "Sa 08:00-14:00"
    ],
    "priceRange": "$$$$",
    "paymentAccepted": ["Invoice", "Check", "Bank Transfer"],
    "currenciesAccepted": "USD"
  };
}

// Service Schema
export function generateServiceSchema(service: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": service.provider
    },
    "areaServed": service.areaServed.map(area => ({
      "@type": "Country",
      "name": area
    })),
    "serviceType": service.serviceType,
    "url": service.url,
    "category": "Machining & Inspection Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Precision Machining & Inspection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.name,
            "description": service.description
          }
        }
      ]
    }
  };
}

// Article Schema (for resources)
export function generateArticleSchema(article: ArticleData) {
  return {
    "@context": "https://schema.org",
    "@type": "TechnicalArticle",
    "headline": article.headline,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "IIS - Integrated Inspection Systems",
      "logo": {
        "@type": "ImageObject",
        "url": "/logo.png"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "url": article.url,
    "mainEntityOfPage": article.url,
    "image": article.image ? {
      "@type": "ImageObject",
      "url": article.image,
      "width": 1200,
      "height": 630
    } : undefined,
    "articleSection": article.articleSection,
    "keywords": article.keywords,
    "about": {
      "@type": "Thing",
      "name": "Precision Machining & Inspection"
    },
    "mentions": [
      {
        "@type": "Thing",
        "name": "CNC Machining"
      },
      {
        "@type": "Thing",
        "name": "Aerospace Machining"
      },
      {
        "@type": "Thing",
        "name": "AS9100D"
      }
    ]
  };
}

// Machining Process Schema
export function generateMachiningProcessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Precision CNC Machining Process",
    "description": "Professional precision machining process for aerospace and defense components",
    "image": "https://iismet.com/og-image.jpg",
    "totalTime": "PT24H", // 24 hours typical
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Raw Material (Titanium, Aluminum, Inconel)"
      },
      {
        "@type": "HowToSupply",
        "name": "CNC Machining Center"
      },
      {
        "@type": "HowToSupply",
        "name": "Precision Measuring Tools"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "5-Axis CNC Machine"
      },
      {
        "@type": "HowToTool",
        "name": "CMM (Coordinate Measuring Machine)"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Engineering Review & Programming",
        "text": "Engineering review of component design for machinability"
      },
      {
        "@type": "HowToStep",
        "name": "CAM Programming",
        "text": "Create precision toolpaths for optimal machining"
      },
      {
        "@type": "HowToStep",
        "name": "First Article Production",
        "text": "Machine initial component with full inspection"
      },
      {
        "@type": "HowToStep",
        "name": "Quality Validation",
        "text": "CMM inspection and certification to specifications"
      },
      {
        "@type": "HowToStep",
        "name": "Production Run",
        "text": "Full production with statistical process control"
      }
    ]
  };
}

// FAQ Schema
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What tolerances can you achieve with CNC machining?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We routinely achieve tolerances of ±0.0001\" (±0.0025mm) with our advanced 5-axis CNC machining centers and precision measurement systems."
        }
      },
      {
        "@type": "Question",
        "name": "Are you AS9100D certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are AS9100D certified for aerospace quality management and ITAR registered for defense programs."
        }
      },
      {
        "@type": "Question",
        "name": "What materials can you machine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We machine over 150+ certified materials including titanium, Inconel, aluminum alloys, stainless steel, and exotic alloys for aerospace and defense applications."
        }
      },
      {
        "@type": "Question",
        "name": "What is your typical lead time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lead times vary by complexity, but we typically deliver initial parts in 1-2 weeks and production quantities in 2-4 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide first article inspection reports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide comprehensive first article inspection reports (FAIR) with full dimensional analysis, material certifications, and traceability documentation."
        }
      }
    ]
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Website Schema
export function generateWebsiteSchema(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": url,
    "name": "IIS - Integrated Inspection Systems",
    "description": "Precision machining and inspection services for aerospace, defense, and energy industries. AS9100D certified with ITAR registration.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "IIS - Integrated Inspection Systems"
    }
  };
}

// Product/Service Catalog Schema
export function generateProductCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Precision Machining & Inspection Services",
    "description": "Comprehensive precision machining and inspection capabilities for critical applications",
    "numberOfItems": 6,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Service",
          "name": "5-Axis CNC Machining",
          "description": "Complex geometries with ±0.0001\" tolerances"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Service",
          "name": "Precision Metrology",
          "description": "Advanced measurement and inspection services"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Service",
          "name": "Adaptive Machining",
          "description": "Intelligent machining with real-time control"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Service",
          "name": "Engineering Services",
          "description": "Engineering support and process optimization"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Service",
          "name": "Quality Assurance",
          "description": "Data-driven quality control and process optimization"
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Service",
          "name": "Supply Chain Integration",
          "description": "End-to-end machining and inspection solutions"
        }
      }
    ]
  };
}