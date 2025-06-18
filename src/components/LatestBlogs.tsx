import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const LatestBlogs = () => {
  const blogs = [
    {
      title: "The Future of Water Treatment: Advanced Chemical Solutions",
      excerpt: "Explore the latest innovations in water treatment technology and how advanced chemical solutions are revolutionizing the industry...",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Water Treatment"
    },
    {
      title: "Sustainable Agriculture: The Role of Eco-Friendly Fertilizers",
      excerpt: "Discover how eco-friendly fertilizers and micronutrients are helping farmers achieve higher yields while protecting the environment...",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Agriculture"
    },
    {
      title: "Industrial Hygiene: Best Practices for Chemical Safety",
      excerpt: "Learn about the latest safety protocols and best practices for handling industrial chemicals in manufacturing environments...",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600&q=80",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Safety"
    }
  ];

  // Animation state for each card
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(blogs.length).fill(false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
  }, []);

  return (
    <section className="py-20" style={{ backgroundColor: '57b8d9' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Latest Insights on Water Treatment and Chemical Safety
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with industry trends, safety protocols, and innovative chemical solutions 
            through our expert insights and knowledge sharing. Explore our latest articles on water treatment, eco-friendly solutions, and industrial chemical safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform
                ${visibleCards[index] ? 'blog-fade-in' : 'blog-fade-init'}`}
              style={{ transitionDelay: visibleCards[index] ? `${index * 0.15 + 0.1}s` : '0ms' }}
            >
              <Card 
                className="group overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <div 
                      className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url('${blog.image}')` }}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(blog.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {blog.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 group"
          >
            <Link to="/blog" className="flex items-center">
              View All Articles on Water Treatment and Chemical Safety
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
