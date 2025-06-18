import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, Calendar, User, ArrowRight, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogPost } from "@/lib/supabase";

const Blog = () => {
  const { getPublishedPosts } = useBlogPosts();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date>(new Date());

  // Animation state for each card
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch published posts function
  const fetchPublishedPosts = async () => {
    console.log('Blog page: Fetching published posts...');
    setLoading(true);
    setError(null);
    
    try {
      const posts = await getPublishedPosts();
      console.log('Blog page: Received posts:', posts.length);
      setBlogPosts(posts);
      setVisibleCards(Array(posts.length).fill(false));
      setLastFetch(new Date());
    } catch (err) {
      console.error('Blog page: Error fetching posts:', err);
      setError('Failed to load blog posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and periodic refresh
  useEffect(() => {
    fetchPublishedPosts();
    
    // Set up periodic refresh every 30 seconds to catch new posts
    const interval = setInterval(() => {
      console.log('Blog page: Periodic refresh...');
      fetchPublishedPosts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Animation observer
  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top < windowHeight * 0.92 && rect.bottom > windowHeight * 0.08) {
          setVisibleCards((prev) => {
            if (!prev[idx]) {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            }
            return prev;
          });
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blogPosts]);

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const recentPosts = blogPosts.slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getReadTime = (content?: string) => {
    if (!content) return "2 min read";
    const words = content.split(' ').length;
    const readTime = Math.ceil(words / 200); // Average reading speed
    return `${readTime} min read`;
  };

  const handleRefresh = () => {
    fetchPublishedPosts();
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative text-white py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(16,23,54,0.7), rgba(16,23,54,0.7)), url('https://www.uxdesigninstitute.com/blog/wp-content/uploads/2025/04/447_Accessible-vs-Inclusive-vs-Universal_blog-1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in text-white tracking-wide drop-shadow-lg" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
              Industry Insights & Knowledge Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in animation-delay-200">
              Stay updated with the latest trends, safety guidelines, and innovations in chemical manufacturing
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative animate-fade-in animation-delay-400 flex items-stretch gap-2 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search articles, topics, or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-gray-300 w-full h-14"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 text-lg font-semibold h-14">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header with refresh button and last updated info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                <p className="text-sm text-gray-500">
                  Last updated: {lastFetch.toLocaleTimeString()}
                </p>
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors capitalize"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            )}

            {/* Blog Posts Grid */}
            <div className="space-y-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading blog posts...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">
                    {blogPosts.length === 0 
                      ? "No blog posts available yet." 
                      : "No blog posts found matching your criteria."
                    }
                  </p>
                  {blogPosts.length === 0 && (
                    <Button onClick={handleRefresh} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Check for new posts
                    </Button>
                  )}
                </div>
              ) : (
                filteredPosts.map((post, idx) => (
                  <div
                    key={post.id}
                    ref={el => cardRefs.current[idx] = el}
                    className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${visibleCards[idx] ? 'blog-fade-in' : 'blog-fade-init'}`}
                    style={{ transitionDelay: visibleCards[idx] ? `${idx * 0.15 + 0.1}s` : '0ms' }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                      <div className="md:flex">
                        {post.featured_image && (
                          <div className="md:w-1/3">
                            <img
                              src={post.featured_image}
                              alt={post.title}
                              className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div className={`${post.featured_image ? 'md:w-2/3' : 'w-full'} p-6`}>
                          <div className="flex items-center gap-4 mb-3">
                            <Badge variant="secondary" className="capitalize">{post.category}</Badge>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm text-gray-500 gap-1 sm:gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(post.published_at || post.created_at)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>Drops Chemicals</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{getReadTime(post.content)}</span>
                              </div>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.tags.slice(0, 3).map((tag, tagIdx) => (
                                <Badge key={tagIdx} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <Button variant="outline" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <div key={post.id} className="flex gap-3 pb-4 border-b last:border-b-0">
                      {post.featured_image && (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500">{formatDate(post.published_at || post.created_at)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No recent posts available.</p>
                )}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest industry insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Your email address" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {blogPosts.length > 0 ? (
                    Array.from(new Set(blogPosts.flatMap(post => post.tags))).slice(0, 10).map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs cursor-pointer hover:bg-blue-50"
                        onClick={() => setSearchTerm(tag)}
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No tags available yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;