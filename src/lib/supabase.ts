// This file has been reverted to remove Supabase integration
// The original project did not have Supabase configured
export const supabase = null;

// Placeholder types for compatibility
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  tags: string[];
  category: string;
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  view_count: number;
}

export interface CreateBlogPost {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  category?: string;
  status?: 'draft' | 'published';
}

export interface UpdateBlogPost {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  category?: string;
  status?: 'draft' | 'published' | 'archived';
  published_at?: string;
}