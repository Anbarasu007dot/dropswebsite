import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChemicalElements } from "@/components/ChemicalElements";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { FloatingMolecules } from "@/components/FloatingMolecules";
import React from "react";

// Typing animation hook
function useTypingEffect(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    if (!text) return;
    const interval = setInterval(() => {
      setDisplayed((prev) => {
        if (i < text.length) {
          const next = prev + text[i];
          i++;
          return next;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const supplyText = useTypingEffect("Supply Excellence", 60);

  // Dynamic background slideshow logic
  const bgImages = [
    "https://d12oja0ew7x0i8.cloudfront.net/images/Article_Images/ImageForArticle_21307_164499491645378.png",
    "https://new.abb.com/images/librariesprovider87/drives-global/drives-frontpage-segment-chemical.jpg?sfvrsn=4a3a910a_0",
    "https://indiaforensic.com/certifications/wp-content/uploads/2017/01/agriculture.jpg",
    "https://www.caia.co.za/wp-content/uploads/2025/05/CAIA-OG.jpg"
  ];
  const [bgIndex, setBgIndex] = useState(0);

  // Cycle background images
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center hero-premium-bg overflow-hidden"
    >
      {/* Dynamic Background Slideshow */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {bgImages.map((src, idx) => (
          <div
            key={src}
            className="hero-bg-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('${src}')`,
              opacity: bgIndex === idx ? 1 : 0,
              transition: 'opacity 1s cubic-bezier(0.4,0,0.2,1)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Enhanced Chemical Elements */}
      <ChemicalElements />
      <FloatingMolecules />

      {/* Professional Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-800 ${isVisible ? 'modern-fade-in' : 'opacity-0 translate-y-10'}`}>
            <h1 className="professional-heading mb-6 text-white">
              Expert Manufacturing
              <span className="block mt-2">
                <span className="inline-block">
                  &nbsp;&&nbsp;
                  <span aria-label="Supply Excellence" className="inline-block relative z-20 text-white">
                    <span className="supply-typing-text">
                      {supplyText}
                    </span>
                    <span className="type-cursor">|</span>
                  </span>
                </span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Leading manufacturer and supplier of high-quality chemical solutions for
              <span className="block font-medium text-white mt-1">
                Agriculture, Water Treatment, Food Processing, and Industrial Applications.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="professional-button text-lg px-8 py-4 w-full sm:w-auto">
                <Link to="/products" className="flex items-center justify-center">
                  Explore Our Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Link to="/about" className="inline-block w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="secondary-button text-lg px-8 py-4 flex items-center justify-center bg-white text-blue-900 border-white hover:bg-blue-100 hover:text-blue-900 hover:border-white w-full"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Know About Us
                </Button>
              </Link>
            </div>

            {/* Professional Stats with Animated Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <AnimatedCounter
                  end={22}
                  suffix="+"
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                />
                <div className="text-blue-200 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  end={500}
                  suffix="+"
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                />
                <div className="text-blue-200 font-medium">Products</div>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  end={1000}
                  suffix="+"
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                />
                <div className="text-blue-200 font-medium">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-200 font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};