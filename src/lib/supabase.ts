import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('🔍 Supabase Environment Check:')
console.log('URL exists:', !!supabaseUrl)
console.log('Key exists:', !!supabaseAnonKey)
console.log('URL value:', supabaseUrl)
console.log('Key length:', supabaseAnonKey?.length || 0)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('VITE_SUPABASE_URL:', supabaseUrl)
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing')
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

// Validate URL format
try {
  new URL(supabaseUrl)
} catch (error) {
  console.error('❌ Invalid Supabase URL format:', supabaseUrl)
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}`)
}

console.log('✅ Initializing Supabase client...')

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

// Test connection with better error handling
const testConnection = async () => {
  try {
    console.log('🔄 Testing Supabase connection...')
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error.message)
      console.error('Error details:', error)
      
      // Check if it's a table not found error
      if (error.message.includes('relation "blog_posts" does not exist')) {
        console.warn('⚠️ blog_posts table does not exist. This might be expected if migrations haven\'t run yet.')
      }
    } else {
      console.log('✅ Supabase connected successfully. Blog posts count:', count)
    }
  } catch (err) {
    console.error('❌ Connection test error:', err)
  }
}

// Run connection test
testConnection()

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