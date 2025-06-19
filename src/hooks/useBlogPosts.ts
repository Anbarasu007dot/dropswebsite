import { useState, useEffect } from 'react'
import { BlogPost, CreateBlogPost, UpdateBlogPost } from '@/lib/supabase'
import { toast } from 'sonner'

// Mock data for demonstration
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Water Treatment: Advanced Chemical Solutions',
    slug: 'future-water-treatment-advanced-chemical-solutions',
    excerpt: 'Explore the latest innovations in water treatment technology and how advanced chemical solutions are revolutionizing the industry.',
    content: 'Water treatment technology has evolved significantly over the past decade...',
    featured_image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    meta_title: 'Future of Water Treatment',
    meta_description: 'Latest innovations in water treatment technology',
    tags: ['water treatment', 'technology', 'innovation'],
    category: 'water-treatment',
    status: 'published' as const,
    author_id: 'admin',
    published_at: '2024-01-15T00:00:00Z',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    view_count: 150
  },
  {
    id: '2',
    title: 'Sustainable Agriculture: The Role of Eco-Friendly Fertilizers',
    slug: 'sustainable-agriculture-eco-friendly-fertilizers',
    excerpt: 'Discover how eco-friendly fertilizers and micronutrients are helping farmers achieve higher yields while protecting the environment.',
    content: 'Sustainable agriculture practices are becoming increasingly important...',
    featured_image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80',
    meta_title: 'Sustainable Agriculture',
    meta_description: 'Eco-friendly fertilizers for sustainable farming',
    tags: ['agriculture', 'sustainability', 'fertilizers'],
    category: 'agriculture',
    status: 'published' as const,
    author_id: 'admin',
    published_at: '2024-01-12T00:00:00Z',
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
    view_count: 200
  },
  {
    id: '3',
    title: 'Industrial Hygiene: Best Practices for Chemical Safety',
    slug: 'industrial-hygiene-chemical-safety-practices',
    excerpt: 'Learn about the latest safety protocols and best practices for handling industrial chemicals in manufacturing environments.',
    content: 'Chemical safety in industrial environments requires strict protocols...',
    featured_image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&q=80',
    meta_title: 'Industrial Chemical Safety',
    meta_description: 'Best practices for chemical safety in industry',
    tags: ['safety', 'industrial', 'chemicals'],
    category: 'safety',
    status: 'published' as const,
    author_id: 'admin',
    published_at: '2024-01-10T00:00:00Z',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
    view_count: 175
  }
];

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock fetch function
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPosts(mockPosts);
    setLoading(false);
  };

  // Mock create function
  const createPost = async (postData: CreateBlogPost): Promise<BlogPost | null> => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: postData.title,
        slug: postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: postData.excerpt || '',
        content: postData.content || '',
        featured_image: postData.featured_image || '',
        meta_title: postData.meta_title || '',
        meta_description: postData.meta_description || '',
        tags: postData.tags || [],
        category: postData.category || 'general',
        status: postData.status || 'draft',
        author_id: 'admin',
        published_at: postData.status === 'published' ? new Date().toISOString() : undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        view_count: 0
      };
      
      setPosts(prev => [newPost, ...prev]);
      toast.success('Blog post created successfully!');
      return newPost;
    } catch (err) {
      toast.error('Failed to create post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Mock update function
  const updatePost = async (id: string, updates: UpdateBlogPost): Promise<BlogPost | null> => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prev => prev.map(post => 
        post.id === id 
          ? { 
              ...post, 
              ...updates, 
              updated_at: new Date().toISOString(),
              published_at: updates.status === 'published' && !post.published_at 
                ? new Date().toISOString() 
                : post.published_at
            }
          : post
      ));
      
      const updatedPost = posts.find(p => p.id === id);
      toast.success('Blog post updated successfully!');
      return updatedPost || null;
    } catch (err) {
      toast.error('Failed to update post');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Mock delete function
  const deletePost = async (id: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prev => prev.filter(post => post.id !== id));
      toast.success('Blog post deleted successfully!');
      return true;
    } catch (err) {
      toast.error('Failed to delete post');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Mock get published posts
  const getPublishedPosts = async (): Promise<BlogPost[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPosts.filter(post => post.status === 'published');
  };

  // Mock get post by slug
  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPosts.find(post => post.slug === slug && post.status === 'published') || null;
  };

  // Initialize with mock data
  useEffect(() => {
    fetchPosts();
  }, []);

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
  };
};