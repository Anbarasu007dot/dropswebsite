import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Clock, Users, TrendingUp, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";

const Careers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Chemical Engineer",
      department: "R&D",
      location: "Coimbatore, Tamil Nadu",
      type: "Full-time",
      experience: "5-8 years",
      description: "Lead product development and process optimization for water treatment chemicals.",
      requirements: ["Chemical Engineering degree", "Experience in water treatment", "Process optimization skills"]
    },
    {
      id: 2,
      title: "Quality Control Analyst",
      department: "Quality Assurance",
      location: "Coimbatore, Tamil Nadu",
      type: "Full-time",
      experience: "2-4 years",
      description: "Ensure product quality through comprehensive testing and analysis.",
      requirements: ["Chemistry/Chemical Engineering background", "Laboratory experience", "Analytical skills"]
    },
    {
      id: 3,
      title: "Sales Executive",
      department: "Sales & Marketing",
      location: "Coimbatore, Tamil Nadu",
      type: "Full-time",
      experience: "3-5 years",
      description: "Drive business growth through client relationships and market expansion.",
      requirements: ["B2B sales experience", "Chemical industry knowledge", "Communication skills"]
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Clear career progression paths and skill development opportunities",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      iconColor: "text-blue-600",
      glowColor: "shadow-blue-500/25"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
      gradient: "from-rose-500 via-pink-600 to-red-600",
      iconColor: "text-rose-500",
      glowColor: "shadow-rose-500/25"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Culture",
      description: "Collaborative work environment with experienced professionals",
      gradient: "from-emerald-500 via-green-600 to-teal-600",
      iconColor: "text-emerald-600",
      glowColor: "shadow-emerald-500/25"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Recognition",
      description: "Performance-based rewards and recognition programs",
      gradient: "from-violet-500 via-purple-600 to-indigo-600",
      iconColor: "text-violet-600",
      glowColor: "shadow-violet-500/25"
    }
  ];

  const handleCardClick = () => {
    window.open('https://erp.dropschemicals.com/jobs', '_blank');
  };

  const handleViewOpeningsClick = () => {
    window.open('https://erp.dropschemicals.com/jobs', '_blank');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative text-white py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(24, 34, 60, 0.55), rgba(24, 34, 60, 0.55)), url('https://wallpapers.com/images/featured/work-background-kxmiw0h0ugqy2eoa.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in text-white tracking-wide drop-shadow-lg" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
              Build Your Career with Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in animation-delay-200">
              Join a team of passionate professionals dedicated to chemical innovation and excellence
            </p>
          </div>
        </div>
      </section>

      {/* Modern Premium Why Work With Us Section */}
      <section 
        ref={sectionRef}
        className="py-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-violet-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced Section Header with Animation */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full tracking-wide uppercase">
                Why Join Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Why Choose Drops Chemicals?
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Experience a positive, growth-oriented work culture backed by 20+ years of industry expertise
            </p>
          </div>

          {/* Premium Glassmorphism Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-700 ease-out cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: `${index * 150 + 200}ms`
                }}
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick();
                  }
                }}
              >
                {/* Glassmorphism Card */}
                <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2">
                  
                  {/* Gradient Border Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}></div>
                  
                  {/* Inner Content */}
                  <div className="relative z-10">
                    {/* Icon Container with Enhanced Styling */}
                    <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg ${benefit.glowColor} group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                      <div className="text-white group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                    </div>

                    {/* Typography with Enhanced Hierarchy */}
                    <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {benefit.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed font-light group-hover:text-slate-700 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>

                {/* Floating Accent Elements */}
                <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${benefit.gradient} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500 group-hover:scale-125`}></div>
                <div className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br ${benefit.gradient} rounded-full opacity-0 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110`} style={{ transitionDelay: '100ms' }}></div>
              </div>
            ))}
          </div>

          {/* Enhanced Call-to-Action */}
          <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-xl">
              <div className="text-slate-700">
                <p className="text-lg font-semibold mb-1">Ready to join our team?</p>
                <p className="text-sm text-slate-600">Explore opportunities and grow with us</p>
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={handleViewOpeningsClick}
              >
                View Openings
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;