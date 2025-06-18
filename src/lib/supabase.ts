import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  })
  throw new Error('Missing Supabase environment variables')
}

console.log('Initializing Supabase client...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Test connection
supabase.from('blog_posts').select('count', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error)
    } else {
      console.log('Supabase connected successfully. Blog posts count:', count)
    }
  })

// Types for our blog posts
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured_image?: string
  meta_title?: string
  meta_description?: string
  tags: string[]
  category: string
  status: 'draft' | 'published' | 'archived'
  author_id: string
  published_at?: string
  created_at: string
  updated_at: string
  view_count: number
}

export interface CreateBlogPost {
  title: string
  slug?: string
  excerpt?: string
  content?: string
  featured_image?: string
  meta_title?: string
  meta_description?: string
  tags?: string[]
  category?: string
  status?: 'draft' | 'published'
}

export interface UpdateBlogPost {
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  featured_image?: string
  meta_title?: string
  meta_description?: string
  tags?: string[]
  category?: string
  status?: 'draft' | 'published' | 'archived'
  published_at?: string
}