import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ArticleMetadata {
  title: string;
  excerpt: string;
  publishDate: string;
  author: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  tags: string[];
  category: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  content: string;
}

const contentDirectory = path.join(process.cwd(), 'content/resources');

export function getArticlesByCategory(category: string): Article[] {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(categoryPath);
  const articles: Article[] = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => {
      const fullPath = path.join(categoryPath, name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = name.replace(/\.mdx$/, '');

      return {
        slug,
        metadata: data as ArticleMetadata,
        content,
      };
    })
    .sort((a, b) => {
      // Sort by featured first, then by publish date
      if (a.metadata.featured && !b.metadata.featured) return -1;
      if (!a.metadata.featured && b.metadata.featured) return 1;
      return new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime();
    });

  return articles;
}

export function getArticle(category: string, slug: string): Article | null {
  try {
    const fullPath = path.join(contentDirectory, category, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data as ArticleMetadata,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllArticles(): Article[] {
  const categories = ['manufacturing-processes', 'material-science', 'quality-compliance', 'industry-applications', 'calculators-tools'];
  const allArticles: Article[] = [];

  categories.forEach(category => {
    const articles = getArticlesByCategory(category);
    allArticles.push(...articles);
  });

  return allArticles.sort((a, b) =>
    new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime()
  );
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter(article => article.metadata.featured);
}

export function getRelatedArticles(currentSlug: string, category: string, count: number = 3): Article[] {
  const categoryArticles = getArticlesByCategory(category);
  return categoryArticles
    .filter(article => article.slug !== currentSlug)
    .slice(0, count);
}

export function searchArticles(query: string): Article[] {
  const allArticles = getAllArticles();
  const lowercaseQuery = query.toLowerCase();

  return allArticles.filter(article =>
    article.metadata.title.toLowerCase().includes(lowercaseQuery) ||
    article.metadata.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.metadata.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    article.content.toLowerCase().includes(lowercaseQuery)
  );
}

// Category information
export const categoryInfo = {
  'manufacturing-processes': {
    title: 'Manufacturing Processes',
    description: 'Comprehensive guides on CNC machining, 5-axis capabilities, and precision manufacturing techniques.',
    slug: 'manufacturing-processes'
  },
  'material-science': {
    title: 'Material Science',
    description: 'Expert insights on aerospace alloys, heat treatment processes, and material selection.',
    slug: 'material-science'
  },
  'quality-compliance': {
    title: 'Quality & Compliance',
    description: 'AS9100D certification, ITAR compliance, and quality assurance methodologies.',
    slug: 'quality-compliance'
  },
  'industry-applications': {
    title: 'Industry Applications',
    description: 'Real-world applications in aerospace, defense, and precision instrumentation.',
    slug: 'industry-applications'
  },
  'calculators-tools': {
    title: 'Calculators & Tools',
    description: 'Interactive tools for tolerance calculations, material properties, and cost estimation.',
    slug: 'calculators-tools'
  }
} as const;

export function getCategoryInfo(slug: string) {
  return categoryInfo[slug as keyof typeof categoryInfo] || null;
}
export function getAllCategories() {
  return Object.values(categoryInfo);
}
