import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Our Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }
  ];

  const productCategories = [
    "Agro & Aquaculture",
    "Water Treatment",
    "Hygiene Products",
    "Metal Finishing",
    "Food Chemicals",
    "Solvents"
  ];

  return (
    <footer className="premium-footer text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="https://ik.imagekit.io/dvuz4klnl/Screenshot_2025-06-03-15-28-07-28_c37d74246d9c81aa0bb824b57eaf7062.jpg?updatedAt=1748944738882"
                className="w-12 h-12 rounded-full object-cover object-center shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                alt="Drops Chemicals Logo"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white company-name">Drops Chemicals</span>
                <span className="text-[8px] text-blue-200 -mt-1 company-name" style={{ width: 'max-content' }}>Reliable Partner Serving Excellence</span>
              </div>
            </div>
            
            <p className="text-blue-100 mb-6 leading-relaxed">
              Over two decades of expertise in chemical manufacturing and supply, 
              serving diverse industries with quality solutions and exceptional service.
            </p>

            {/* Quality Badges */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-blue-100">Quality Assured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">M</span>
                </div>
                <span className="text-sm text-blue-100">Make in India</span>
              </div>
              
              {/* Social Media Icons under Make in India */}
              <div className="flex items-center space-x-4 mt-3">
                <a 
                  href="https://www.linkedin.com/company/dropschemical/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <img 
                    src="https://img.icons8.com/3d-fluency/94/linkedin--v2.png"
                    alt="linkedin-new"
                    className="w-7 h-7 bg-transparent"
                  />
                </a>
                <a 
                  href="https://www.instagram.com/drops.chemicals/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <img 
                    src="https://img.icons8.com/3d-fluency/94/instagram-new.png"
                    alt="instagram-new"
                    className="w-8 h-8 bg-transparent"
                  />
                </a>
                <a 
                  href="https://www.facebook.com/dropschemical/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <img 
                    src="https://img.icons8.com/fluency/48/facebook-new.png"
                    alt="facebook-new"
                    className="w-7 h-7 bg-transparent"
                  />
                </a>
                <a 
                  href="https://www.youtube.com/@DropsChemicals-um5cm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  <img 
                    src="https://img.icons8.com/fluency/48/youtube-play.png"
                    alt="youtube-new"
                    className="w-7 h-7 bg-transparent"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-blue-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Product Categories</h3>
            <ul className="space-y-3">
              {productCategories.map((category, index) => (
                <li key={index}>
                  <Link 
                    to={`/products#${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-sm"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Info</h3>
            <div className="space-y-6">
              {/* Corporate Office */}
              <div>
                <h4 className="font-semibold text-blue-100 mb-1">Corporate Office</h4>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                  <div className="text-sm text-blue-100 leading-relaxed">
                    3rd floor, No.76, East Power House Road,<br />
                    Gandhipuram, Tatabad,<br />
                    Coimbatore - 641012,<br />
                    Tamil Nadu, India
                  </div>
                </div>
              </div>
              {/* Manufacturing Unit */}
              <div>
                <h4 className="font-semibold text-blue-100 mb-1">Manufacturing Unit</h4>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                  <div className="text-sm text-blue-100 leading-relaxed">
                    7/8-5, Main Rd, Athikadavu,<br />
                    Keeranatham, Tamil Nadu 641035
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-300" />
                <div className="text-sm text-blue-100">
                  <div>
                    <a href="mailto:info@dropschemicals.com" className="hover:text-white transition-colors">
                      info@dropschemicals.com
                    </a>
                  </div>
                  <div>
                    <a href="mailto:sales@dropschemicals.com" className="hover:text-white transition-colors">
                      sales@dropschemicals.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <Phone className="w-5 h-5 text-blue-300" />
                <div className="text-sm text-blue-100">
                  <a href="tel:+919677522201" className="hover:text-white transition-colors">
                    +91 96775 22201
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-blue-200">
              © 2024 Drops Chemicals. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};