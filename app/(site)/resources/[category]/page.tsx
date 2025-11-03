import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowRight } from 'lucide-react';
import { getResourcesByCategory } from '@/sanity/lib/queries';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export async function generateStaticParams() {
  return [
    { category: 'manufacturing-processes' },
    { category: 'industry-applications' },
    { category: 'quality-compliance' },
    { category: 'material-science' },
    { category: 'calculators-tools' },
  ];
}

// Static category definitions
const categoryDefinitions: Record<string, { title: string; description: string }> = {
  'manufacturing-processes': {
    title: 'Manufacturing Processes',
    description: 'Comprehensive guides on precision manufacturing processes, CNC machining, and advanced production techniques.'
  },
  'industry-applications': {
    title: 'Industry Applications',
    description: 'Industry-specific manufacturing applications and solutions for aerospace, defense, medical, and energy sectors.'
  },
  'quality-compliance': {
    title: 'Quality & Compliance',
    description: 'Quality control, inspection standards, and regulatory compliance for precision manufacturing.'
  },
  'material-science': {
    title: 'Material Science',
    description: 'Advanced materials, material properties, and selection guides for precision manufacturing applications.'
  },
  'calculators-tools': {
    title: 'Calculators & Tools',
    description: 'Useful calculators, estimation tools, and resources for manufacturing professionals.'
  },
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryData = categoryDefinitions[category];

  if (!categoryData) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${categoryData.title} | Technical Resources | IIS`,
    description: categoryData.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryData = categoryDefinitions[category];

  if (!categoryData) {
    notFound();
  }

  const resources = await getResourcesByCategory(category) || [];

  // Map Sanity slug structure (slug.current) to simple slug
  const formattedResources = resources.map((resource: any) => ({
    ...resource,
    slug: resource.slug?.current || resource.slug,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
            <span className="text-sm font-medium text-blue-400">Resources</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
            {categoryData.title}
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            {categoryData.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <span className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm">
              {formattedResources.length} Articles
            </span>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {formattedResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No resources found in this category yet.</p>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Browse All Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formattedResources.map((resource: any) => (
                <Link
                  key={resource._id}
                  href={`/resources/${category}/${resource.slug}`}
                  className="group relative bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-blue-600/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
                      resource.difficulty === 'Beginner'
                        ? 'bg-green-400/10 text-green-400 border-green-400/20'
                        : resource.difficulty === 'Intermediate'
                        ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                        : 'bg-red-400/10 text-red-400 border-red-400/20'
                    }`}>
                      {resource.difficulty}
                    </span>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{resource.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {resource.excerpt}
                  </p>

                  <div className="flex items-center text-blue-400 text-sm font-medium">
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
