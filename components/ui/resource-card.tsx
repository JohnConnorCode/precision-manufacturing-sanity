'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/design-system';

interface ResourceCardProps {
  resource: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    category: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    readTime?: string;
    featuredImage?: {
      asset?: {
        url: string;
        _id: string;
      };
      alt?: string;
      attribution?: string;
    };
  };
  priority?: boolean;
}


// Difficulty badge styles
const difficultyStyles = {
  beginner: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  advanced: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

export default function ResourceCard({ resource, priority = false }: ResourceCardProps) {
  const imageUrl = resource.featuredImage?.asset?.url;
  const hasImage = Boolean(imageUrl);
  const imageAlt = resource.featuredImage?.alt || resource.title;
  const difficulty = resource.difficulty || 'intermediate';

  return (
    <Link
      href={`/resources/${resource.category}/${resource.slug}`}
      className="block h-full group"
    >
      <article
        className={cn(
          // Base card styling
          "h-full flex flex-col overflow-hidden rounded-xl border",
          "bg-white dark:bg-slate-900",
          "border-slate-200/80 dark:border-slate-800",
          // Hover effects
          "shadow-sm hover:shadow-xl dark:shadow-slate-950/50",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1 hover:border-blue-500/30 dark:hover:border-blue-500/30"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
          {hasImage && imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover",
                "transition-transform duration-500 ease-out",
                "group-hover:scale-105"
              )}
              priority={priority}
            />
          ) : (
            /* Placeholder when no image */
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600" />
            </div>
          )}

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category badge overlay */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
              "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm",
              "text-slate-700 dark:text-slate-200",
              "border border-white/20 dark:border-slate-700/50"
            )}>
              <BookOpen className="w-3 h-3" />
              {resource.category.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          {/* Meta row */}
          <div className="flex items-center justify-between mb-3">
            <span className={cn(
              "text-xs font-semibold px-2.5 py-1 rounded-full border",
              difficultyStyles[difficulty]
            )}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>

            {resource.readTime && (
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                <Clock className="h-3.5 w-3.5 mr-1 text-blue-500 dark:text-blue-400" />
                <span>{resource.readTime}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className={cn(
            typography.cardTitle,
            "mb-2 line-clamp-2",
            "group-hover:text-blue-600 dark:group-hover:text-blue-400",
            "transition-colors duration-200"
          )}>
            {resource.title}
          </h3>

          {/* Excerpt */}
          {resource.excerpt && (
            <p className={cn(
              typography.small,
              "text-slate-600 dark:text-slate-400",
              "mb-4 line-clamp-2 leading-relaxed flex-grow"
            )}>
              {resource.excerpt}
            </p>
          )}

          {/* CTA */}
          <div className={cn(
            "flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold",
            "mt-auto pt-2"
          )}>
            Read Article
            <ArrowRight className={cn(
              "h-4 w-4 ml-1.5",
              "transition-transform duration-200",
              "group-hover:translate-x-1"
            )} />
          </div>
        </div>
      </article>
    </Link>
  );
}
