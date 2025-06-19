import { useState, useEffect } from 'react'
import { supabase, BlogPost, CreateBlogPost, UpdateBlogPost } from '@/lib/supabase'
import { toast } from 'sonner'

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('📡 Fetching blog posts...')
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ Supabase fetch error:', error)
        
        // Handle specific error cases
        if (error.message.includes('relation "blog_posts" does not exist')) {
          throw new Error('Blog posts table does not exist. Please run database migrations first.')
        } else if (error.message.includes('Invalid API key')) {
          throw new Error('Invalid Supabase API key. Please check your credentials.')
        } else if (error.message.includes('Project not found')) {
          throw new Error('Supabase project not found. Please check your project URL.')
        } else {
          throw new Error(`Database error: ${error.message}`)
        }
      }
      
      console.log('✅ Fetched posts:', data?.length || 0, 'posts')
      setPosts(data || [])
    } catch (err) {
      console.error('❌ Error fetching posts:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Create a new blog post
  const createPost = async (postData: CreateBlogPost): Promise<BlogPost | null> => {
    try {
      console.log('📝 Creating new post:', postData.title)
      
      // Generate slug if not provided
      if (!postData.slug) {
        postData.slug = postData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }

      // Prepare the data for insertion
      const insertData = {
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt || null,
        content: postData.content || null,
        featured_image: postData.featured_image || null,
        meta_title: postData.meta_title || null,
        meta_description: postData.meta_description || null,
        tags: postData.tags || [],
        category: postData.category || 'general',
        status: postData.status || 'draft',
        published_at: postData.status === 'published' ? new Date().toISOString() : null,
        author_id: null // Let the database handle this with uid()
      }

      console.log('📦 Insert data:', insertData)

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([insertData])
        .select()
        .single()

      if (error) {
        console.error('❌ Supabase insert error:', error)
        throw new Error(`Failed to create post: ${error.message}`)
      }
      
      console.log('✅ Created post:', data)
      
      // Update local state immediately
      setPosts(prev => [data, ...prev])
      toast.success('Blog post created successfully!')
      
      // Refetch to ensure consistency
      await fetchPosts()
      
      return data
    } catch (err) {
      console.error('❌ Create post error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    }
  }

  // Update a blog post
  const updatePost = async (id: string, updates: UpdateBlogPost): Promise<BlogPost | null> => {
    try {
      console.log('📝 Updating post:', id, updates)
      
      // Set published_at when changing status to published
      const updateData = { ...updates }
      if (updates.status === 'published') {
        const currentPost = posts.find(p => p.id === id)
        if (currentPost && !currentPost.published_at) {
          updateData.published_at = new Date().toISOString()
        }
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('❌ Supabase update error:', error)
        throw new Error(`Failed to update post: ${error.message}`)
      }

      console.log('✅ Updated post:', data)
      
      // Update local state immediately
      setPosts(prev => prev.map(post => post.id === id ? data : post))
      toast.success('Blog post updated successfully!')
      
      // Refetch to ensure consistency
      await fetchPosts()
      
      return data
    } catch (err) {
      console.error('❌ Update post error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post'
      setError(errorMessage)
      toast.error(errorMessage)
      return null
    }
  }

  // Delete a blog post
  const deletePost = async (id: string): Promise<boolean> => {
    try {
      console.log('🗑️ Deleting post:', id)
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('❌ Supabase delete error:', error)
        throw new Error(`Failed to delete post: ${error.message}`)
      }

      console.log('✅ Deleted post:', id)
      
      // Update local state immediately
      setPosts(prev => prev.filter(post => post.id !== id))
      toast.success('Blog post deleted successfully!')
      
      return true
    } catch (err) {
      console.error('❌ Delete post error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    }
  }

  // Get published posts for public blog page
  const getPublishedPosts = async (): Promise<BlogPost[]> => {
    try {
      console.log('📡 Fetching published posts...')
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) {
        console.error('❌ Get published posts error:', error)
        throw new Error(`Failed to fetch published posts: ${error.message}`)
      }
      
      console.log('✅ Fetched published posts:', data?.length || 0, 'posts')
      return data || []
    } catch (err) {
      console.error('❌ Failed to fetch published posts:', err)
      return []
    }
  }

  // Get post by slug for public viewing
  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      console.log('📡 Fetching post by slug:', slug)
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

      if (error) {
        console.error('❌ Get post by slug error:', error)
        throw new Error(`Failed to fetch post: ${error.message}`)
      }

      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ view_count: data.view_count + 1 })
        .eq('id', data.id)

      console.log('✅ Fetched post by slug:', data.title)
      return data
    } catch (err) {
      console.error('❌ Failed to fetch post by slug:', err)
      return null
    }
  }

  // Subscribe to real-time changes
  useEffect(() => {
    console.log('🔄 Setting up blog posts hook...')
    fetchPosts()

    // Set up real-time subscription
    const subscription = supabase
      .channel('blog_posts_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'blog_posts' },
        (payload) => {
          console.log('🔄 Real-time update received:', payload)
          
          // Handle different types of changes
          if (payload.eventType === 'INSERT') {
            console.log('➕ New post inserted:', payload.new)
            setPosts(prev => {
              // Check if post already exists to avoid duplicates
              const exists = prev.some(p => p.id === payload.new.id)
              if (!exists) {
                return [payload.new as BlogPost, ...prev]
              }
              return prev
            })
          } else if (payload.eventType === 'UPDATE') {
            console.log('📝 Post updated:', payload.new)
            setPosts(prev => prev.map(post => 
              post.id === payload.new.id ? payload.new as BlogPost : post
            ))
          } else if (payload.eventType === 'DELETE') {
            console.log('🗑️ Post deleted:', payload.old)
            setPosts(prev => prev.filter(post => post.id !== payload.old.id))
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status)
      })

    return () => {
      console.log('🧹 Cleaning up blog posts subscription...')
      subscription.unsubscribe()
    }
  }, [])

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    getPublishedPosts,
    getPostBySlug,
    refetch: fetchPosts
  }
}