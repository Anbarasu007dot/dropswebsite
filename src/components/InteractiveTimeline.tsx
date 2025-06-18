
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Clock, Cog, Truck, Shield, Flag } from 'lucide-react';

const timelineData = [
  {
    year: "2004",
    title: "Company Founded",
    description: "Drops Chemicals established in Coimbatore",
    icon: Flag,
    color: "#1e40af", // blue
    bgColor: "#dbeafe"
  },
  {
    year: "2012", 
    title: "Manufacturing Expansion",
    description: "Expanded manufacturing capabilities",
    icon: Cog,
    color: "#dc2626", // red
    bgColor: "#fecaca"
  },
  {
    year: "2017",
    title: "Multi-Industry Reach", 
    description: "Diversified into multiple sectors",
    icon: Truck,
    color: "#d97706", // amber
    bgColor: "#fed7aa"
  },
  {
    year: "2021",
    title: "Digital Transformation",
    description: "Implemented advanced systems", 
    icon: Shield,
    color: "#16a34a", // green
    bgColor: "#bbf7d0"
  },
  {
    year: "2024",
    title: "Future Vision",
    description: "Expanding with innovation focus",
    icon: Clock,
    color: "#059669", // emerald
    bgColor: "#a7f3d0"
  }
];

export const InteractiveTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (pathRef.current) {
            // Animate the timeline path
            gsap.fromTo(pathRef.current, 
              { strokeDasharray: "2500", strokeDashoffset: "2500" },
              { strokeDashoffset: "0", duration: 3, ease: "power2.out" }
            );
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Desktop Timeline */}
      <div className="hidden lg:block relative">
        <svg 
          width="100%" 
          height="300" 
          viewBox="0 0 1200 300" 
          className="absolute top-0 left-0"
        >
          <defs>
            <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="25%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="75%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          
          <path
            ref={pathRef}
            d="M 100 100 Q 200 70 300 100 Q 400 130 500 100 Q 600 70 700 100 Q 800 130 900 100 Q 1000 70 1100 100"
            fill="none"
            stroke="url(#timelineGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-lg"
          />
        </svg>

        <div className="relative z-10 grid grid-cols-5 gap-0 h-300 items-center pt-16">
          {timelineData.map((milestone, index) => {
            const IconComponent = milestone.icon;
            
            return (
              <div
                key={milestone.year}
                className={`flex flex-col items-center relative transition-all duration-500 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  animationDelay: `${index * 0.3 + 1}s`
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Vertical Line */}
                <div 
                  className="w-1 mb-6 transition-all duration-300"
                  style={{ 
                    backgroundColor: milestone.color,
                    height: hoveredIndex === index ? '32px' : '28px',
                    opacity: hoveredIndex === index ? 1 : 0.8
                  }}
                />

                {/* Milestone Circle */}
                <div
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 transform ${
                    hoveredIndex === index ? 'scale-110 -translate-y-2' : 'scale-100'
                  }`}
                  style={{ 
                    backgroundColor: milestone.bgColor,
                    boxShadow: hoveredIndex === index ? `0 25px 50px ${milestone.color}40` : undefined
                  }}
                >
                  <IconComponent 
                    size={32} 
                    style={{ color: milestone.color }}
                    className="drop-shadow-sm"
                  />
                  
                  {/* Pulse effect */}
                  {hoveredIndex === index && (
                    <div
                      className="absolute inset-0 rounded-full border-2 animate-ping"
                      style={{ borderColor: milestone.color }}
                    />
                  )}
                </div>

                {/* Year */}
                <div 
                  className={`text-2xl font-bold mt-6 mb-2 transition-all duration-300 ${
                    hoveredIndex === index ? 'scale-110 -translate-y-1' : 'scale-100'
                  }`}
                  style={{ color: milestone.color }}
                >
                  {milestone.year}
                </div>

                {/* Tooltip Card */}
                <div
                  className={`absolute top-40 bg-white rounded-xl shadow-2xl p-4 w-64 border transition-all duration-300 ${
                    hoveredIndex === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                  }`}
                  style={{ borderColor: milestone.color }}
                >
                  <h3 className="font-bold text-lg mb-2" style={{ color: milestone.color }}>
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {milestone.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="lg:hidden space-y-8">
        {timelineData.map((milestone, index) => {
          const IconComponent = milestone.icon;
          
          return (
            <div
              key={milestone.year}
              className={`flex items-start space-x-4 transition-all duration-500 ${
                isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105"
                  style={{ backgroundColor: milestone.bgColor }}
                >
                  <IconComponent size={24} style={{ color: milestone.color }} />
                </div>
                
                {index < timelineData.length - 1 && (
                  <div 
                    className="w-1 h-16 mt-4"
                    style={{ backgroundColor: milestone.color, opacity: 0.3 }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div 
                  className="text-xl font-bold mb-1"
                  style={{ color: milestone.color }}
                >
                  {milestone.year}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-600">
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
