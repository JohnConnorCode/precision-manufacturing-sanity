import fs from 'fs';
import path from 'path';

interface PortableTextChild {
  _type?: string;
  text?: string;
  marks?: string[];
}

interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: PortableTextChild[];
  listItem?: string;
  items?: string[];
  type?: string;
  title?: string;
  content?: string;
  code?: string;
  language?: string;
  description?: string;
  headers?: string[];
  rows?: Record<string, string>[];
  specs?: Record<string, string>[];
  steps?: Record<string, string>[];
  text?: string;
  href?: string;
}

interface RelatedReference {
  _ref?: string;
  _type?: string;
  title?: string;
  slug?: { current: string };
}

interface TransformedContentBlock {
  type: string;
  content?: string;
  items?: string[];
  style?: string;
  title?: string;
  description?: string;
  headers?: string[];
  rows?: Record<string, string>[];
  specs?: Record<string, string>[];
  steps?: Record<string, string>[];
  language?: string;
  text?: string;
  href?: string;
}

export interface TechnicalArticleAuthor {
  name: string;
  title: string;
  bio: string;
  image: string | null;
}

export interface RelatedArticle {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
}

// Raw JSON structure from files
interface RawTechnicalArticle {
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  category: string;
  series?: string;
  seriesSlug?: string;
  seriesOrder?: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  publishDate: string;
  lastUpdated?: string;
  featured: boolean;
  tags: string[];
  targetAudience: string[];
  industries: string[];
  author: TechnicalArticleAuthor;
  prerequisites: string[];
  learningObjectives: string[];
  content: PortableTextBlock[];
  relatedContent?: {
    relatedServices?: RelatedReference[];
    relatedCaseStudies?: RelatedReference[];
    relatedGlossary?: RelatedReference[];
    relatedArticles?: RelatedArticle[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string | null;
    focusKeywords?: string[];
    secondaryKeywords?: string[];
  };
}

export interface TechnicalArticle {
  metadata: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    series?: string;
    seriesSlug?: string;
    seriesOrder?: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    readTime: string;
    publishDate: string;
    lastUpdated?: string;
    featured: boolean;
    tags: string[];
    targetAudience: string[];
    industries: string[];
    author: TechnicalArticleAuthor;
  };
  introduction: {
    overview: string;
    learningObjectives: string[];
    prerequisites: string[];
  };
  content: TransformedContentBlock[];
  relatedContent: {
    relatedServices: RelatedReference[];
    relatedCaseStudies: RelatedReference[];
    relatedGlossary: RelatedReference[];
    relatedArticles?: RelatedArticle[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    keywords: string[];
  };
}

const articlesDirectory = path.join(process.cwd(), 'content/technical-articles');

// Transform Sanity portable text blocks to simple content structure
function transformContent(rawContent: PortableTextBlock[]): TransformedContentBlock[] {
  if (!rawContent) return [];

  return rawContent.map((block: PortableTextBlock): TransformedContentBlock | null => {
    // Handle Sanity blocks (paragraphs, headings)
    if (block._type === 'block') {
      const textContent = block.children?.map((child: PortableTextChild) => child.text).join('') || '';

      if (block.style === 'h2') {
        return { type: 'heading', content: textContent };
      } else if (block.style === 'h3') {
        return { type: 'subheading', content: textContent };
      } else if (block.style === 'normal' && textContent.trim()) {
        return { type: 'paragraph', content: textContent };
      }
    }

    // Handle list items
    if (block._type === 'list') {
      return {
        type: 'list',
        items: block.items || []
      };
    }

    // Handle callout boxes
    if (block._type === 'calloutBox') {
      return {
        type: 'callout',
        style: block.type || 'info',
        title: block.title || '',
        content: block.content || ''
      };
    }

    // Handle code blocks
    if (block._type === 'code') {
      return {
        type: 'code',
        language: block.language || 'text',
        content: block.code || ''
      };
    }

    // Handle tolerance tables
    if (block._type === 'toleranceTable') {
      return {
        type: 'table',
        title: block.title || '',
        description: block.description || '',
        headers: block.headers || [],
        rows: block.rows || []
      };
    }

    // Handle technical specs
    if (block._type === 'technicalSpecs') {
      return {
        type: 'specs',
        specs: block.specs || []
      };
    }

    // Handle process flows
    if (block._type === 'processFlow') {
      return {
        type: 'process',
        title: block.title || '',
        steps: block.steps || []
      };
    }

    // Handle CTA buttons
    if (block._type === 'ctaButton') {
      return {
        type: 'cta',
        text: block.text || '',
        href: block.href || '#',
        style: block.style || 'primary'
      };
    }

    // Return null for empty or unsupported blocks
    return null;
  }).filter((block): block is TransformedContentBlock => block !== null);
}

// Transform raw JSON to our interface
function transformArticle(raw: RawTechnicalArticle): TechnicalArticle {
  // Extract overview from content (first paragraph block)
  let overview = '';
  const firstParagraph = raw.content?.find((item: PortableTextBlock) => item._type === 'block' && item.style === 'normal');
  if (firstParagraph?.children?.[0]?.text) {
    overview = firstParagraph.children[0].text;
  }

  return {
    metadata: {
      title: raw.title,
      slug: raw.slug.current,
      excerpt: raw.excerpt,
      category: raw.category,
      series: raw.series,
      seriesSlug: raw.seriesSlug,
      seriesOrder: raw.seriesOrder,
      difficulty: raw.difficulty,
      readTime: raw.readTime,
      publishDate: raw.publishDate,
      lastUpdated: raw.lastUpdated,
      featured: raw.featured,
      tags: raw.tags,
      targetAudience: raw.targetAudience,
      industries: raw.industries,
      author: raw.author,
    },
    introduction: {
      overview: overview || raw.excerpt,
      learningObjectives: raw.learningObjectives || [],
      prerequisites: raw.prerequisites || [],
    },
    content: transformContent(raw.content || []),
    relatedContent: {
      relatedServices: raw.relatedContent?.relatedServices || [],
      relatedCaseStudies: raw.relatedContent?.relatedCaseStudies || [],
      relatedGlossary: raw.relatedContent?.relatedGlossary || [],
      relatedArticles: raw.relatedContent?.relatedArticles || [],
    },
    seo: {
      metaTitle: raw.seo.metaTitle,
      metaDescription: raw.seo.metaDescription,
      canonicalUrl: raw.seo.canonicalUrl || '',
      keywords: [...(raw.seo.focusKeywords || []), ...(raw.seo.secondaryKeywords || [])],
    },
  };
}

// Get all technical articles
export function getAllTechnicalArticles(): TechnicalArticle[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const articles: TechnicalArticle[] = fileNames
    .filter((name) => name.endsWith('.json'))
    .map((name) => {
      const fullPath = path.join(articlesDirectory, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const raw = JSON.parse(fileContents) as RawTechnicalArticle;
      return transformArticle(raw);
    })
    .sort((a, b) => {
      // Sort by series order first, then by publish date
      if (a.metadata.series && b.metadata.series && a.metadata.series === b.metadata.series) {
        return (a.metadata.seriesOrder || 0) - (b.metadata.seriesOrder || 0);
      }
      return new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime();
    });

  return articles;
}

// Get article by slug
export function getTechnicalArticleBySlug(slug: string): TechnicalArticle | null {
  const articles = getAllTechnicalArticles();
  return articles.find(article => article.metadata.slug === slug) || null;
}

// Get articles by category
export function getTechnicalArticlesByCategory(category: string): TechnicalArticle[] {
  const allArticles = getAllTechnicalArticles();
  return allArticles.filter(article => article.metadata.category === category);
}

// Get articles by series
export function getTechnicalArticlesBySeries(seriesName: string): TechnicalArticle[] {
  const allArticles = getAllTechnicalArticles();
  return allArticles
    .filter(article => article.metadata.series === seriesName)
    .sort((a, b) => (a.metadata.seriesOrder || 0) - (b.metadata.seriesOrder || 0));
}

// Get all unique series
export function getAllSeries(): SeriesInfo[] {
  const articles = getAllTechnicalArticles();
  const seriesMap = new Map<string, TechnicalArticle[]>();

  articles.forEach(article => {
    if (article.metadata.series) {
      if (!seriesMap.has(article.metadata.series)) {
        seriesMap.set(article.metadata.series, []);
      }
      seriesMap.get(article.metadata.series)!.push(article);
    }
  });

  return Array.from(seriesMap.entries()).map(([seriesName, seriesArticles]) => {
    const sortedArticles = seriesArticles.sort((a, b) =>
      (a.metadata.seriesOrder || 0) - (b.metadata.seriesOrder || 0)
    );

    // Use seriesSlug from metadata if available
    const seriesSlug = sortedArticles[0]?.metadata.seriesSlug || seriesNameToSlug(seriesName);

    return {
      name: seriesName,
      slug: seriesSlug,
      title: seriesNameToTitle(seriesName),
      description: seriesDescriptions[seriesName] || '',
      category: sortedArticles[0]?.metadata.category || '',
      articleCount: sortedArticles.length,
      articles: sortedArticles,
      totalReadTime: sortedArticles.reduce((total, article) => {
        const minutes = parseInt(article.metadata.readTime.match(/\d+/)?.[0] || '0');
        return total + minutes;
      }, 0),
    };
  });
}

// Get series by slug
export function getSeriesBySlug(slug: string): SeriesInfo | null {
  const allSeries = getAllSeries();
  return allSeries.find(series => series.slug === slug) || null;
}

// Helper function to convert series name to slug
function seriesNameToSlug(seriesName: string): string {
  return seriesName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

// Helper function to convert series name to title
function seriesNameToTitle(seriesName: string): string {
  return seriesName;
}

// Series descriptions
const seriesDescriptions: Record<string, string> = {
  'CMM Inspection Mastery': 'Master coordinate measuring machine (CMM) setup, programming, and measurement strategies for precision inspection. Learn probe selection, error analysis, and environment control for accurate dimensional verification.',
  'First Article Inspection (FAI) Excellence': 'Complete guide to AS9102 First Article Inspection requirements, documentation, measurement procedures, and customer approval processes for aerospace and defense machining.',
  'GD&T Fundamentals and Application': 'Comprehensive Geometric Dimensioning and Tolerancing (GD&T) training covering symbols, datum reference frames, position tolerances, and measurement verification strategies for precision machining.',
  'CNC Manufacturing Precision': 'Advanced CNC machining techniques covering tolerance capabilities, surface finish requirements, material considerations, and 5-axis machining strategies for precision parts.',
  'AS9100 Quality Management': 'Complete AS9100 quality management system implementation guide covering certification requirements, risk management, configuration control, and supplier management for aerospace machining.',
  'MetBase Quality Systems': 'Master MetBase quality data management system setup, statistical process control (SPC), advanced automation, and custom integration solutions for machining quality control.',
};

// Series information interface
export interface SeriesInfo {
  name: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  articleCount: number;
  articles: TechnicalArticle[];
  totalReadTime: number;
}

// Get featured technical articles
export function getFeaturedTechnicalArticles(): TechnicalArticle[] {
  return getAllTechnicalArticles().filter(article => article.metadata.featured);
}

// Search technical articles
export function searchTechnicalArticles(query: string): TechnicalArticle[] {
  const allArticles = getAllTechnicalArticles();
  const lowercaseQuery = query.toLowerCase();

  return allArticles.filter(article =>
    article.metadata.title.toLowerCase().includes(lowercaseQuery) ||
    article.metadata.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.metadata.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    article.introduction.overview.toLowerCase().includes(lowercaseQuery)
  );
}