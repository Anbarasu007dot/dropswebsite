import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('🔍 Supabase Environment Check:')
console.log('URL exists:', !!supabaseUrl)
console.log('Key exists:', !!supabaseAnonKey)

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== haxfxxrukroasoapkevd &&
  supabaseAnonKey !== eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhheGZ4eHJ1a3JvYXNvYXBrZXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTM5OTAsImV4cCI6MjA2NTQ4OTk5MH0.cVifp9iIPt5v1BSVrbxkvC_BjiJyyxgwVSdyrsGTcng &&
  supabaseUrl.trim() !== '' &&
  supabaseAnonKey.trim() !== ''

// Declare supabase variable at top level
let supabase: any

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase not configured yet')
  console.warn('Please click the "Connect to Supabase" button in the top right to set up your Supabase project')
  
  // Create a mock client that will show helpful errors
  const mockError = { message: 'Supabase not configured. Please connect to Supabase first.' }
  
  // Create a chainable mock query builder
  const createMockQueryBuilder = () => ({
    select: () => createMockQueryBuilder(),
    insert: () => createMockQueryBuilder(),
    update: () => createMockQueryBuilder(),
    delete: () => createMockQueryBuilder(),
    order: () => createMockQueryBuilder(),
    limit: () => createMockQueryBuilder(),
    range: () => createMockQueryBuilder(),
    eq: () => createMockQueryBuilder(),
    neq: () => createMockQueryBuilder(),
    gt: () => createMockQueryBuilder(),
    gte: () => createMockQueryBuilder(),
    lt: () => createMockQueryBuilder(),
    lte: () => createMockQueryBuilder(),
    like: () => createMockQueryBuilder(),
    ilike: () => createMockQueryBuilder(),
    is: () => createMockQueryBuilder(),
    in: () => createMockQueryBuilder(),
    contains: () => createMockQueryBuilder(),
    containedBy: () => createMockQueryBuilder(),
    rangeGt: () => createMockQueryBuilder(),
    rangeGte: () => createMockQueryBuilder(),
    rangeLt: () => createMockQueryBuilder(),
    rangeLte: () => createMockQueryBuilder(),
    rangeAdjacent: () => createMockQueryBuilder(),
    overlaps: () => createMockQueryBuilder(),
    textSearch: () => createMockQueryBuilder(),
    match: () => createMockQueryBuilder(),
    not: () => createMockQueryBuilder(),
    or: () => createMockQueryBuilder(),
    filter: () => createMockQueryBuilder(),
    then: (resolve: any) => resolve({ data: [], error: mockError }),
    catch: (reject: any) => reject(mockError)
  })

  // Create a mock channel
  const createMockChannel = () => ({
    on: () => createMockChannel(),
    subscribe: () => ({ unsubscribe: () => {} }),
    unsubscribe: () => {}
  })

  supabase = {
    from: () => createMockQueryBuilder(),
    channel: () => createMockChannel(),
    removeChannel: () => {},
    removeAllChannels: () => {},
    auth: {
      signUp: () => Promise.resolve({ data: null, error: mockError }),
      signIn: () => Promise.resolve({ data: null, error: mockError }),
      signInWithPassword: () => Promise.resolve({ data: null, error: mockError }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: mockError }),
        download: () => Promise.resolve({ data: null, error: mockError }),
        remove: () => Promise.resolve({ data: null, error: mockError }),
        list: () => Promise.resolve({ data: [], error: mockError }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  }
} else {
  // Validate URL format only if configured
  try {
    new URL(supabaseUrl)
  } catch (error) {
    console.error('❌ Invalid Supabase URL format:', supabaseUrl)
    throw new Error(`Invalid Supabase URL format: ${supabaseUrl}`)
  }

  console.log('✅ Initializing Supabase client...')

  supabase = createClient(supabaseUrl, supabaseAnonKey, {
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
}

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

// Export supabase at the end of the file
export { supabase }