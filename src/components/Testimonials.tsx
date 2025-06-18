import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "AgriTech Solutions",
      role: "CEO",
      content: "Drops Chemicals has been our trusted partner for over 5 years. Their agricultural chemicals have significantly improved our crop yields and quality. Exceptional service and reliable products.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Priya Sharma",
      company: "AquaFresh Industries",
      role: "Operations Manager",
      content: "The water treatment chemicals from Drops have revolutionized our purification processes. Outstanding quality and excellent technical support team. Highly recommended for industrial applications.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Dr. Arun Patel",
      company: "FoodTech Labs",
      role: "Quality Director",
      content: "Their food-grade chemicals meet the highest safety standards. Consistent quality, timely delivery, and competitive pricing make them our preferred supplier for all food processing needs.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Suresh Menon",
      company: "ChemTech Manufacturing",
      role: "Production Head",
      content: "We rely on Drops Chemicals for our manufacturing processes. Their industrial chemicals are top-notch, and their customer service is always responsive. A true partner in our growth.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Anita Reddy",
      company: "EcoClean Solutions",
      role: "Founder",
      content: "Drops Chemicals provides eco-friendly solutions that align with our sustainability goals. Their commitment to quality and innovation is evident in every product. A pleasure to work with.",
      rating: 5,
      image: "https://imgs.search.brave.com/HcmxOTyAOtVsl6aUPH7Hd6gSST5yoMxPlrDT04CFGNw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/d28tYnVzaW5lc3N3/b21lbi13b3JraW5n/LWNhZmVfMTE1Ny0y/NjM4Ni5qcGc_c2Vt/dD1haXNfaXRlbXNf/Ym9vc3RlZCZ3PTc0/MA"
    },
    {
      name: "Vikram Singh",
      company: "Industrial Supplies Co.",
      role: "Sales Director",
      content: "We have been sourcing chemicals from Drops for years. Their extensive range and consistent quality have made them our go-to supplier. Excellent products and customer service.",
      rating: 5,
      image: "https://imgs.search.brave.com/Z_wvk4K5Np2qCps-IVPPKJoaD_y2YsX8XY1S3GTT9To/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM0/NDUyNjkxNi9waG90/by95b3VuZy1zaWto/LWJ1c2luZXNzbWFu/LXdvcmtpbmctb24t/Y29tcHV0ZXItYXQt/b2ZmaWNlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1vVmFL/ZFBiVzEybHQzbHVy/YWg1bFBoUkhhREgw/dlBnOEFyOUxJVHcz/Y3JrPQ"
    }
  ];

  // Carousel logic
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation CSS variables
  const CARD_WIDTH = 340; // px, adjust to match card width + margin
  const GAP = 32; // px, adjust to match gap-8
  const totalCards = testimonials.length;
  const totalWidth = totalCards * (CARD_WIDTH + GAP);
  const duration = totalCards * 3.2; // seconds, adjusted to match logo carousel smoothness

  // Pause animation on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      // Handle swipe logic here if needed
    }
  };

  return (
    <section
      className="py-20 premium-bg-overlay text-white"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.pexels.com/photos/4963433/pexels-photo-4963433.jpeg?cs=srgb&dl=pexels-ketut-subiyanto-4963433.jpg&fm=jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Clients Say
          </h2>
          <div className="section-divider bg-white"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Trusted by Industry Experts - Real feedback from our valued partners
          </p>
        </div>

        {/* Desktop/Tablet: Infinite Carousel */}
        <div
          className="hidden md:block overflow-x-hidden w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={carouselRef}
            className="flex gap-8 testimonial-carousel-track"
            style={{
              animation: 'testimonial-move 25s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running',
              width: `${testimonials.length * 2 * 352}px` // Total width for seamless loop
            }}
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <Card
                key={`first-${index}`}
                className="professional-card bg-black/30 backdrop-blur-lg border-white/20 text-white testimonial-hover min-w-[320px] max-w-xs w-[320px] cursor-pointer flex-shrink-0"
                style={{ flex: "0 0 320px" }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-6 line-height-loose">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-blue-200">{testimonial.role}</p>
                      <p className="text-sm text-blue-300">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {/* Duplicate set for seamless looping */}
            {testimonials.map((testimonial, index) => (
              <Card
                key={`second-${index}`}
                className="professional-card bg-black/30 backdrop-blur-lg border-white/20 text-white testimonial-hover min-w-[320px] max-w-xs w-[320px] cursor-pointer flex-shrink-0"
                style={{ flex: "0 0 320px" }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-6 line-height-loose">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-blue-200">{testimonial.role}</p>
                      <p className="text-sm text-blue-300">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile: Auto-scrolling carousel with touch support */}
        <div 
          className="md:hidden overflow-x-hidden w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex gap-6 testimonial-carousel-track"
            style={{
              animation: 'testimonial-move 50s linear infinite',
              animationPlayState: 'running',
              width: `${testimonials.length * 2 * 91}vw` // Total width for seamless loop
            }}
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <Card
                key={`mobile-first-${index}`}
                className="professional-card bg-black/30 backdrop-blur-lg border-white/20 text-white testimonial-hover min-w-[85vw] max-w-[90vw] cursor-pointer flex-shrink-0"
                style={{ flex: "0 0 85vw" }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-6 line-height-loose">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-blue-200">{testimonial.role}</p>
                      <p className="text-sm text-blue-300">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {/* Duplicate set for seamless looping */}
            {testimonials.map((testimonial, index) => (
              <Card
                key={`mobile-second-${index}`}
                className="professional-card bg-black/30 backdrop-blur-lg border-white/20 text-white testimonial-hover min-w-[85vw] max-w-[90vw] cursor-pointer flex-shrink-0"
                style={{ flex: "0 0 85vw" }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-6 line-height-loose">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-blue-200">{testimonial.role}</p>
                      <p className="text-sm text-blue-300">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};