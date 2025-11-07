import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

export interface FrontmatterData {
  [key: string]: any;
}

export interface MDXContent {
  frontmatter: FrontmatterData;
  content: React.ReactNode;
  source: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

export async function getMDXFile(
  contentType: 'services' | 'industries' | 'pages',
  slug: string
): Promise<MDXContent | null> {
  try {
    const filePath = path.join(contentDirectory, contentType, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const source = fs.readFileSync(filePath, 'utf-8');

    const { frontmatter, content } = await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
      },
    });

    return {
      frontmatter: frontmatter as FrontmatterData,
      content,
      source,
    };
  } catch (error) {
    console.error(`Error reading MDX file for ${slug}:`, error);
    return null;
  }
}

export function getAllMDXFiles(
  contentType: 'services' | 'industries' | 'pages'
): string[] {
  try {
    const dir = path.join(contentDirectory, contentType);

    if (!fs.existsSync(dir)) {
      return [];
    }

    const files = fs.readdirSync(dir);
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace('.mdx', ''));
  } catch (error) {
    console.error(`Error reading MDX files from ${contentType}:`, error);
    return [];
  }
}

export async function getAllMDXFilesWithFrontmatter(
  contentType: 'services' | 'industries' | 'pages'
): Promise<(FrontmatterData & { slug: string })[]> {
  const slugs = getAllMDXFiles(contentType);
  const files = [];

  for (const slug of slugs) {
    const mdx = await getMDXFile(contentType, slug);
    if (mdx) {
      files.push({
        ...mdx.frontmatter,
        slug: mdx.frontmatter.slug || slug,
      });
    }
  }

  return files;
}
