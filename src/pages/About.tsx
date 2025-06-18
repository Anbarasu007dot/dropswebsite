import { Award, Users, Target, Globe, Factory, Truck, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { InteractiveTimeline } from "@/components/InteractiveTimeline";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track stat card visibility for scroll-triggered animation
  const [statsVisible, setStatsVisible] = useState(false);
  const statsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!statsSectionRef.current) return;
      const rect = statsSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight * 0.85 && rect.bottom > windowHeight * 0.15) {
        setStatsVisible(true);
      } else {
        setStatsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const milestones = [
    { year: "2004", title: "Company Founded", description: "Drops Chemicals established in Coimbatore" },
    { year: "2012", title: "Manufacturing Expansion", description: "Expanded manufacturing capabilities" },
    { year: "2017", title: "Multi-Industry Reach", description: "Diversified into multiple sectors" },
    { year: "2021", title: "Digital Transformation", description: "Implemented advanced systems" },
    { year: "2024", title: "Future Vision", description: "Expanding with innovation focus" }
  ];

  const stats = [
    { icon: Users, number: "1000+", label: "Happy Clients", color: "from-blue-500 to-blue-600" },
    { icon: Factory, number: "500+", label: "Products", color: "from-green-500 to-green-600" },
    { icon: Truck, number: "24-48", label: "Hours Delivery", color: "from-purple-500 to-purple-600" },
    { icon: Clock, number: "22+", label: "Years Experience", color: "from-orange-500 to-orange-600" }
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide sustainable and innovative chemical solutions that contribute to client success.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Globe,
      title: "Our Vision", 
      description: "To be the most trusted chemical solutions provider, setting standards for quality and reliability.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Award,
      title: "Our Values",
      description: "Quality, Innovation, Sustainability, Customer-centricity, and Integrity guide everything we do.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative py-20 parallax-bg" style={{
         backgroundImage: "linear-gradient(rgba(16,23,54,0.65), rgba(16,23,54,0.65)), url('https://snu.edu.in/site/assets/files/6903/teamwork-dim-modern-lab.1600x0.webp')",
         backgroundSize: "cover",
         backgroundPosition: "center"
      }}>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 modern-fade-in text-white">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto modern-slide-up">
            Two decades of excellence in chemical manufacturing and supply, 
            serving diverse industries with unwavering commitment to quality.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="modern-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Established in 2004, Drops Chemicals is a leading manufacturer, trader, and wholesaler 
                of high-quality chemical solutions based in Coimbatore, Tamil Nadu.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our state-of-the-art facilities and experienced team ensure products 
                that meet the highest standards of quality and reliability.
              </p>
              
              <div ref={statsSectionRef} className="grid grid-cols-2 gap-9">
                {stats.map((stat, index) => {
               
                  const match = stat.number.match(/(\d+)(.*)/);
                  const end = match ? parseInt(match[1]) : 0;
                  const suffix = match ? match[2] : '';
                  return (
                    <div
                      key={index}
                      className={`text-center p-4 bg-[#e2e8f0] rounded-lg professional-card stat-bounce-in ${statsVisible ? 'stat-card-in' : 'opacity-0 translate-y-10'}`}
                      style={{ transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)', transitionDelay: statsVisible ? `${index * 0.15}s` : '0ms' }}
                    >
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        <AnimatedCounter end={end} duration={1200} suffix={suffix} />
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="modern-scale-in">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://player.vimeo.com/video/1089020992?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  title="About Drops Chemicals"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ border: 0 }}
                />
                <div className="absolute inset-0 bg-black/40 pointer-events-none rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guided by our core principles and driven by our vision for a better tomorrow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="interactive-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Interactive Timeline */}
      <section 
        ref={sectionRef}
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
      >
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'modern-fade-in' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our journey of growth and innovation
            </p>
          </div>

          <InteractiveTimeline />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
