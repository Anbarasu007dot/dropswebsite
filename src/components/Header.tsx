import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { 
      name: "Our Products", 
      href: "/products",
      hasDropdown: true,
      dropdownItems: [
        { name: "All Products", id: "all" },
        { name: "Agro & Aquaculture", id: "agro-aquaculture" },
        { name: "Water Treatment", id: "water-treatment" },
        { name: "Food Chemicals", id: "food-chemicals" },
        { name: "Hygiene Raw Materials", id: "hygiene-raw-materials" },
        { name: "Basic Industrial Chemicals", id: "basic-chemicals" },
        { name: "Pharmaceutical Raw Materials", id: "pharmaceutical" }
      ]
    },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Feedback", href: "/feedback" },
  ];

  const handleDropdownItemClick = (itemId: string) => {
    setOpenDropdownIndex(null);
    setIsMenuOpen(false);
    
    if (itemId === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${itemId}`);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-xl' 
        : 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 hover:scale-105">
            <img
              src="https://ik.imagekit.io/dvuz4klnl/Screenshot_2025-06-03-15-28-07-28_c37d74246d9c81aa0bb824b57eaf7062.jpg?updatedAt=1748944738882"
              className="w-14 h-14 rounded-full object-cover object-center shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
              alt="Drops Chemicals Logo"
            />
            <div className="flex flex-col justify-center h-14">
              <span className="font-bold text-lg gradient-text company-name leading-tight" style={{ color: 'var(--brand-dark-blue)' }}>Drops Chemicals</span>
              <span className="text-[8px] text-gray-600 leading-tight company-name" style={{ width: 'max-content' }}>Reliable Partner Serving Excellence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdownIndex(index)}
                    onMouseLeave={() => setOpenDropdownIndex(null)}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center space-x-1 text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 font-medium relative"
                      style={{ color: 'var(--brand-dark-blue)' }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                    </Link>
                    
                    {/* Enhanced Dropdown */}
                    <div className={`absolute top-full left-0 mt-2 w-80 premium-dropdown ${openDropdownIndex === index ? 'open' : ''}`}>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--brand-dark-blue)' }}>Product Categories</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {item.dropdownItems?.map((dropdownItem, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDropdownItemClick(dropdownItem.id)}
                            className="premium-dropdown-item text-left w-full"
                          >
                            {dropdownItem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center space-x-1 text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 font-medium relative group"
                    style={{ color: 'var(--brand-dark-blue)' }}
                  >
                    <span>{item.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-container lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu-container lg:hidden py-4 border-t border-gray-200 animate-fade-in professional-card rounded-b-xl mt-2">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                item.hasDropdown ? (
                  <div key={index} className="relative">
                    <button
                      className="w-full text-left text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-between"
                      onClick={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)}
                      style={{ color: 'var(--brand-dark-blue)' }}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdownIndex === index ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdownIndex === index && (
                      <div className="pl-4 mt-2 flex flex-col gap-1">
                        {item.dropdownItems?.map((dropdownItem, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDropdownItemClick(dropdownItem.id)}
                            className="block text-gray-700 px-4 py-2 rounded hover:bg-blue-50 text-left w-full"
                            style={{ color: 'var(--brand-dark-blue)' }}
                          >
                            {dropdownItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={item.href}
                    className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                    onClick={() => { 
                      setIsMenuOpen(false); 
                      setOpenDropdownIndex(null); 
                    }}
                    style={{ color: 'var(--brand-dark-blue)' }}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};