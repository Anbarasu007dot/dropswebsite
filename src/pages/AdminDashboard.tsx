import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  FileText, 
  Users, 
  ShoppingCart, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Eye,
  Save,
  X,
  Calendar,
  Tag,
  Image,
  Globe,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { CreateBlogPost, UpdateBlogPost } from "@/lib/supabase";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { posts, loading, error, createPost, updatePost, deletePost, refetch } = useBlogPosts();
  
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateBlogPost & { id?: string }>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    meta_title: "",
    meta_description: "",
    tags: [],
    category: "general",
    status: "draft"
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      meta_title: "",
      meta_description: "",
      tags: [],
      category: "general",
      status: "draft"
    });
    setEditingPost(null);
    setShowNewPostForm(false);
  };

  const handleEdit = (post: any) => {
    setFormData({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      featured_image: post.featured_image || "",
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      tags: post.tags || [],
      category: post.category || "general",
      status: post.status
    });
    setEditingPost(post.id);
    setShowNewPostForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt) {
      toast.error("Please fill in all required fields (Title and Excerpt)");
      return;
    }

    try {
      if (editingPost) {
        const { id, ...updateData } = formData;
        const result = await updatePost(editingPost, updateData as UpdateBlogPost);
        if (result) {
          resetForm();
          toast.success("Post updated successfully! Changes will appear on the blog page shortly.");
        }
      } else {
        const result = await createPost(formData as CreateBlogPost);
        if (result) {
          resetForm();
          toast.success("Post created successfully! It will appear on the blog page shortly.");
        }
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const success = await deletePost(id);
      if (success) {
        toast.success("Post deleted successfully!");
      }
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData({ ...formData, tags });
  };

  const handleRefresh = () => {
    refetch();
    toast.info("Refreshing blog posts...");
  };

  const stats = [
    { 
      title: "Total Blog Posts", 
      value: posts.length, 
      icon: <FileText className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      title: "Published Posts", 
      value: posts.filter(p => p.status === "published").length, 
      icon: <Eye className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      title: "Draft Posts", 
      value: posts.filter(p => p.status === "draft").length, 
      icon: <Edit className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    { 
      title: "Total Views", 
      value: posts.reduce((sum, post) => sum + (post.view_count || 0), 0), 
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://ik.imagekit.io/dvuz4klnl/Screenshot_2025-06-03-15-28-07-28_c37d74246d9c81aa0bb824b57eaf7062.jpg?updatedAt=1748944738882"
              className="w-12 h-12 rounded-full object-cover shadow-lg"
              alt="Drops Chemicals Logo"
            />
            <div>
              <h1 className="text-2xl font-bold company-name" style={{ color: 'var(--brand-dark-blue)' }}>
                Drops Chemicals Admin
              </h1>
              <p className="text-sm text-gray-600">Content Management System</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Enhanced Sidebar */}
        <aside className="w-72 bg-white/90 backdrop-blur-md shadow-xl border-r border-gray-200/50">
          <nav className="p-6 space-y-3">
            {[
              { id: "overview", label: "Dashboard Overview", icon: <BarChart3 className="w-5 h-5" />, color: "blue" },
              { id: "blog", label: "Blog Management", icon: <FileText className="w-5 h-5" />, color: "green" },
              { id: "inquiries", label: "Customer Inquiries", icon: <Users className="w-5 h-5" />, color: "purple" },
              { id: "products", label: "Product Catalog", icon: <ShoppingCart className="w-5 h-5" />, color: "orange" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-300 group ${
                  activeTab === item.id
                    ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg transform scale-105`
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-102"
                }`}
              >
                <div className={`${activeTab === item.id ? 'text-white' : `text-${item.color}-500`} transition-colors duration-300`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold" style={{ color: 'var(--brand-dark-blue)' }}>
                    Dashboard Overview
                  </h2>
                  <p className="text-gray-600 mt-2">Monitor your content performance and analytics</p>
                </div>
              </div>
              
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                          <p className="text-3xl font-bold" style={{ color: 'var(--brand-dark-blue)' }}>
                            {stat.value}
                          </p>
                        </div>
                        <div className={`${stat.bgColor} p-3 rounded-xl ${stat.color}`}>
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Enhanced Recent Activity */}
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: 'var(--brand-dark-blue)' }}>
                    <FileText className="w-6 h-6" />
                    Recent Blog Posts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {posts.slice(0, 5).map((post) => (
                      <div key={post.id} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        <div>
                          <span className="font-semibold text-gray-900">{post.title}</span>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge 
                              variant={post.status === "published" ? "default" : "secondary"}
                              className={post.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            >
                              {post.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-600">{post.view_count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold" style={{ color: 'var(--brand-dark-blue)' }}>
                    Blog Management
                  </h2>
                  <p className="text-gray-600 mt-2">Create, edit, and manage your blog content</p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleRefresh}
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={loading}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <Button 
                    onClick={() => setShowNewPostForm(true)} 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{error}</p>
                  <Button onClick={handleRefresh} variant="outline" size="sm" className="mt-2">
                    Try Again
                  </Button>
                </div>
              )}

              {/* Enhanced Blog Post Form */}
              {showNewPostForm && (
                <Card className="border-2 border-blue-200 bg-white/90 backdrop-blur-sm shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2" style={{ color: 'var(--brand-dark-blue)' }}>
                        <FileText className="w-6 h-6" />
                        {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={resetForm} className="hover:bg-red-100">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-3 text-gray-700">
                            <FileText className="w-4 h-4 inline mr-2" />
                            Title *
                          </label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter blog post title"
                            required
                            className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold mb-3 text-gray-700">
                            <Globe className="w-4 h-4 inline mr-2" />
                            Slug
                          </label>
                          <Input
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="url-friendly-slug (auto-generated if empty)"
                            className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-700">
                          <FileText className="w-4 h-4 inline mr-2" />
                          Excerpt *
                        </label>
                        <Textarea
                          value={formData.excerpt}
                          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                          placeholder="Brief description of the blog post"
                          rows={3}
                          required
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-700">
                          <Edit className="w-4 h-4 inline mr-2" />
                          Content
                        </label>
                        <Textarea
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          placeholder="Full blog post content (Markdown supported)"
                          rows={10}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>

                      {/* SEO & Meta */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-3 text-gray-700">
                            <Image className="w-4 h-4 inline mr-2" />
                            Featured Image URL
                          </label>
                          <Input
                            value={formData.featured_image}
                            onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold mb-3 text-gray-700">
                            <Tag className="w-4 h-4 inline mr-2" />
                            Category
                          </label>
                          <Input
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            placeholder="Category"
                            className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-700">
                          <Tag className="w-4 h-4 inline mr-2" />
                          Tags (comma-separated)
                        </label>
                        <Input
                          value={formData.tags.join(', ')}
                          onChange={(e) => handleTagsChange(e.target.value)}
                          placeholder="water treatment, chemicals, industry"
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-3 text-gray-700">Meta Title</label>
                          <Input
                            value={formData.meta_title}
                            onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                            placeholder="SEO title (60 chars max)"
                            className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold mb-3 text-gray-700">Status</label>
                          <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:outline-none"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3 text-gray-700">Meta Description</label>
                        <Textarea
                          value={formData.meta_description}
                          onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                          placeholder="SEO description (160 chars max)"
                          rows={2}
                          className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                        />
                      </div>

                      <div className="flex space-x-4 pt-6">
                        <Button 
                          type="submit" 
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {editingPost ? "Update Post" : "Create Post"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={resetForm}
                          className="hover:bg-gray-50 border-2"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Enhanced Blog Posts List */}
              <div className="space-y-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading posts...</p>
                  </div>
                ) : posts.length === 0 ? (
                  <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                    <CardContent className="p-12 text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">No blog posts yet. Create your first post!</p>
                    </CardContent>
                  </Card>
                ) : (
                  posts.map((post) => (
                    <Card key={post.id} className="hover:shadow-xl transition-all duration-500 hover:scale-102 border-0 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                              <Badge 
                                variant={post.status === "published" ? "default" : "secondary"}
                                className={post.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                              >
                                {post.status}
                              </Badge>
                              {post.tags.length > 0 && (
                                <div className="flex gap-1">
                                  {post.tags.slice(0, 2).map((tag, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.created_at).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {post.view_count} views
                              </span>
                              {post.category && (
                                <span className="flex items-center gap-1">
                                  <Tag className="w-4 h-4" />
                                  {post.category}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 ml-6">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit(post)}
                              className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDelete(post.id)}
                              className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold" style={{ color: 'var(--brand-dark-blue)' }}>
                  Customer Inquiries
                </h2>
                <p className="text-gray-600 mt-2">Manage customer inquiries and support requests</p>
              </div>
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No recent inquiries to display.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold" style={{ color: 'var(--brand-dark-blue)' }}>
                  Product Management
                </h2>
                <p className="text-gray-600 mt-2">Manage your product catalog and inventory</p>
              </div>
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Product management features coming soon.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;