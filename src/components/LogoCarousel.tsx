import React from 'react';

export const LogoCarousel = () => {
  const logos = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoa1iqJRFd7I_mmGhnrz7Yr2jpMs7WKRPxog&s",
      alt: "ELGi Equipments"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4Y4LYJSpthySotwwuLqtI5-YWyAk-bGyjw&s",
      alt: "Roots Industries"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDGfMI62jUY6FhDdBw5WTcnrSOe6I8VCrIIA&s",
      alt: "L&T Construction"
    },
    {
      src: "https://imgs.search.brave.com/MrYGbrDWPqWPcKbXPgaaYHAV6JQQZW3RMRZAyqkHJVA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzI0LzEvcmFkaXNz/b24tYmx1LWxvZ28t/cG5nX3NlZWtsb2dv/LTI0NzQ1OC5wbmc",
      alt: "Radisson Blu"
    },
    {
      src: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-18236,resizemode-75,msid-119848724/industry/indl-goods/svs/engineering/larsen-toubro-wins-large-orders-in-india-overseas.jpg",
      alt: "Craftsman Automation"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXFMLy8l6NWCHjNtjYHQZ6kBNozBAwCEjhgQ&s",
      alt: "O by Tamara"
    },
    {
      src: "https://www.brushexpert.com/getimage/directory%20-%20logos/zahoransky%20logo.jpg/",
      alt: "Zahoransky India"
    },
    {
      src: "https://logos-world.net/wp-content/uploads/2023/08/Propel-Water-Logo.png",
      alt: "Propel Water"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa_e8SzShMrMSw8E60BXddEYAqo1_Lhmnlnw&s",
      alt: "Client Logo"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ13x52ghbLcWO7_b2EaW3Yy-NJ6Anqlzerg&s",
      alt: "Client Logo"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#18345c] tracking-wide" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
          Trusted by Top Companies
        </h2>
        <p className="text-base italic text-slate-500 mb-2 font-light">We're proud to have earned the trust of these organizations.</p>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-10">
          Partnering with renowned companies across Tamil Nadu and beyond
        </p>

        {/* Enhanced Auto-scrolling logo carousel with seamless looping */}
        <div className="relative">
          <div className="overflow-hidden w-full">
            <div className="logo-carousel flex animate-logo-scroll gap-8">
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <div key={`first-${index}`} className="flex items-center justify-center mx-6 flex-shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-w-56 max-h-28 object-contain opacity-90 transition-opacity duration-300 bg-transparent"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class='text-slate-500 font-semibold text-sm'>${logo.alt}</span>`;
                      }
                    }}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless looping */}
              {logos.map((logo, index) => (
                <div key={`second-${index}`} className="flex items-center justify-center mx-6 flex-shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-w-56 max-h-28 object-contain opacity-90 transition-opacity duration-300 bg-transparent"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class='text-slate-500 font-semibold text-sm'>${logo.alt}</span>`;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};