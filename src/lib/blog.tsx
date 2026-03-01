import React from 'react';
import { BLOG_POSTS } from '../data.tsx';
import { BlogPost } from '../types.ts';

interface SanityPostRecord {
  postId?: number;
  title?: string;
  excerpt?: string;
  body?: string;
  author?: string;
  date?: string;
  category?: string;
  image?: string;
}

const sanityProjectId = (import.meta as any).env?.VITE_SANITY_PROJECT_ID;
const sanityDataset = (import.meta as any).env?.VITE_SANITY_DATASET || 'production';
const sanityApiVersion = (import.meta as any).env?.VITE_SANITY_API_VERSION || '2024-01-01';

const normalizeContent = (body?: string) => {
  if (!body) return <p>Content coming soon.</p>;
  return (
    <>
      {body
        .split('\n\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={`${index}-${paragraph.slice(0, 20)}`} className="mb-4">
            {paragraph}
          </p>
        ))}
    </>
  );
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  if (!sanityProjectId) {
    return BLOG_POSTS;
  }

  const query = encodeURIComponent(
    `*[_type == "post" && defined(postId)] | order(publishedAt desc){
      postId,
      title,
      excerpt,
      "body": pt::text(body),
      "author": coalesce(author->name, "Alentejo Bites Team"),
      "date": coalesce(date, string(publishedAt)[0..9]),
      "category": coalesce(category->title, "Journal"),
      "image": coalesce(mainImage.asset->url, "")
    }`
  );

  const url = `https://${sanityProjectId}.api.sanity.io/v${sanityApiVersion}/data/query/${sanityDataset}?query=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return BLOG_POSTS;
    }

    const payload = await response.json();
    const records: SanityPostRecord[] = payload?.result || [];

    if (!records.length) {
      return BLOG_POSTS;
    }

    return records
      .filter((post) => post.postId && post.title && post.excerpt)
      .map((post) => ({
        id: Number(post.postId),
        title: post.title || 'Untitled',
        excerpt: post.excerpt || '',
        content: normalizeContent(post.body),
        author: post.author || 'Alentejo Bites Team',
        date: post.date || 'Jan 01, 2026',
        category: post.category || 'Journal',
        image: post.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      })) as BlogPost[];
  } catch {
    return BLOG_POSTS;
  }
};
