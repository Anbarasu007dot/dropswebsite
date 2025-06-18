import { Award, Clock, DollarSign, Headphones, Truck, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChemicalElements } from "@/components/ChemicalElements";

export const WhyChooseUs = () => {
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

  const features = [
    {
      icon: Award,
      title: "2 Decades of Experience",
      description: "Established expertise in chemical manufacturing and supply since 2004",
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: Users,
      title: "High-Quality Materials",
      description: "Verified raw materials meeting international quality standards",
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100"
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Cost-effective solutions without compromising on quality",
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100"
    },
    {
      icon: Headphones,
      title: "Prompt Customer Service",
      description: "24/7 support with dedicated customer service team",
      color: "text-orange-600",
      bgColor: "bg-orange-50 hover:bg-orange-100"
    },
    {
      icon: Truck,
      title: "Fast Local Delivery",
      description: "Local delivery within 24-48 hours across Tamil Nadu",
      color: "text-red-600",
      bgColor: "bg-red-50 hover:bg-red-100"
    },
    {
      icon: Clock,
      title: "End-to-End Support",
      description: "Complete journey from consultation to testing and supply",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 hover:bg-indigo-100"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-[57b8d9] overflow-hidden"
    >
      {/* Enhanced Top Area with Advanced Visual Effects */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        {/* Animated Geometric Shapes */}
        <div className="absolute top-0 left-0 right-0 h-full">
          <div className="geometric-shape shape-1"></div>
          <div className="geometric-shape shape-2"></div>
          <div className="geometric-shape shape-3"></div>
          <div className="geometric-shape shape-4"></div>
          <div className="geometric-shape shape-5"></div>
        </div>

        {/* SVG Pattern Overlay */}
        <svg className="absolute top-0 left-0 right-0 w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <pattern id="hexPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,5 35,15 35,25 20,35 5,25 5,15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </pattern>
            <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
          <path d="M0,0 C300,60 900,60 1200,0 L1200,120 L0,120 Z" fill="url(#topGradient)" className="animate-gradient-shift" />
        </svg>

        {/* Floating Tech Elements */}
        <div className="absolute top-4 left-12 w-16 h-16 opacity-15 animate-techFloat1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-white">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="2" strokeWidth="1.5" />
            <path d="M21 15.5c-3.09-3.09-8.91-3.09-12 0" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="absolute top-8 right-20 w-12 h-12 opacity-20 animate-techFloat2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
          </svg>
        </div>

        <div className="absolute top-2 left-1/3 w-14 h-14 opacity-18 animate-techFloat3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-white">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" strokeWidth="1.5" />
            <path d="M9 12l2 2 4-4" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="absolute top-6 right-1/3 w-10 h-10 opacity-25 animate-techFloat4">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <line x1="9" y1="9" x2="9.01" y2="9" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="9" x2="15.01" y2="9" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Animated Dots Grid */}
        <div className="absolute top-0 left-0 right-0 h-full">
          <div className="dots-grid">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
            <div className="dot dot-4"></div>
            <div className="dot dot-5"></div>
            <div className="dot dot-6"></div>
            <div className="dot dot-7"></div>
            <div className="dot dot-8"></div>
          </div>
        </div>
      </div>

      <ChemicalElements />
      
      {/* Floating Background Images */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Flask Lab - Top Left */}
        <img
          src="https://img.freepik.com/premium-vector/flask-lab-logo-chemistry-laboratory-vector-icon_658271-10795.jpg"
          alt=""
          className="absolute w-20 h-20 opacity-25"
          style={{
            top: '15%',
            left: '8%',
            animation: 'floatGentle1 14s ease-in-out infinite'
          }}
        />
        
        {/* Molecule Structure - Top Right */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJTCFkEaK8Hrufdx8IJcNTsJbKA4w32uAug&s"
          alt=""
          className="absolute w-24 h-24 opacity-20"
          style={{
            top: '20%',
            right: '12%',
            animation: 'floatGentle2 16s ease-in-out infinite'
          }}
        />
        
        {/* Handshake - Bottom Left */}
        <img
          src="https://content.presentermedia.com/files/clipart/00033000/33230/handshake_800_wht.jpg"
          alt=""
          className="absolute w-28 h-28 opacity-15"
          style={{
            bottom: '15%',
            left: '10%',
            animation: 'floatGentle3 18s ease-in-out infinite'
          }}
        />
        
        {/* Stopwatch - Bottom Right */}
        <img
          src="https://media.istockphoto.com/id/1409428311/vector/stopwatch-3d-icon-vector-illustration-blue-timer-with-red-button-isolated-object-on-a.jpg?s=612x612&w=0&k=20&c=PZ8zvaCyCpxwvOnlKX-yg04Jjxfv6POspOzAOb6hih8="
          alt=""
          className="absolute w-22 h-22 opacity-25"
          style={{
            bottom: '20%',
            right: '8%',
            animation: 'floatGentle4 12s ease-in-out infinite'
          }}
        />
        
        {/* Additional Flask - Middle Left */}
        <img
          src="https://img.freepik.com/premium-vector/flask-lab-logo-chemistry-laboratory-vector-icon_658271-10795.jpg"
          alt=""
          className="absolute w-16 h-16 opacity-20"
          style={{
            top: '50%',
            left: '5%',
            animation: 'floatGentle5 15s ease-in-out infinite'
          }}
        />
        
        {/* Additional Molecule - Middle Right */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfJTCFkEaK8Hrufdx8IJcNTsJbKA4w32uAug&s"
          alt=""
          className="absolute w-18 h-18 opacity-15"
          style={{
            top: '60%',
            right: '6%',
            animation: 'floatGentle6 13s ease-in-out infinite'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'classic-fade-in' : 'opacity-0 translate-y-10'}`}>
          <h2 className="professional-subheading mb-4">
            Why Choose Us
          </h2>
          <div className="section-divider"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Partner with Drops Chemicals for reliable, high-quality chemical solutions 
            backed by decades of expertise and unwavering commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`interactive-card group p-8 transition-all duration-500 ${
                isVisible ? 'classic-scale-in' : 'opacity-0 scale-95'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};