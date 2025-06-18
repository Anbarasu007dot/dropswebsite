import { useState, useEffect } from "react";
import { Search, MessageSquare } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChemicalElements } from "@/components/ChemicalElements";
import { FloatingMolecules } from "@/components/FloatingMolecules";
import { Link, useLocation } from "react-router-dom";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const location = useLocation();

  // Get category from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const category = urlParams.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('all');
    }
  }, [location.search]);

  // Category background images
  const categoryBackgrounds = {
    "agro-aquaculture": "url('https://i0.wp.com/razzanj.com/wp-content/uploads/2016/07/nature-landscape-nature-landscape-hd-image-download-wheat-farm-hd-wallpaper-notebook-background-wheat-farmers-wheat-farming-process-wheat-farming-in-kenya.jpg?ssl=1')",
    "water-treatment": "url('https://hydromarque.com/images/_mainFeature/The-Role-of-Water-Treatment-in-Sustainability-and-Environmental-Stewardship.jpg')",
    "food-chemicals": "url('https://ik.imagekit.io/dvuz4klnl/IMG-20250603-WA0002.jpg?updatedAt=1748941753292')",
    "hygiene-raw-materials": "url('https://plus.unsplash.com/premium_photo-1661597057916-f1d021a8465c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FzaGluZyUyMGRpc2hlc3xlbnwwfHwwfHx8MA%3D%3D')",
    "basic-chemicals": "url('https://kbsiplaw.com/wp-content/uploads/Science-laboratory-glassware73532203MED.jpg')",
    "pharmaceutical": "url('https://t4.ftcdn.net/jpg/09/21/52/41/360_F_921524123_XJ149EOFKyhjm4Q1oSJYbyZrMYKvdZYE.jpg')",
    "all": "url('https://fineotex.com/wp-content/uploads/2024/09/Body-Image-1-min-6-scaled.jpg')"
  };

  const getCurrentBackground = () => {
    return categoryBackgrounds[selectedCategory as keyof typeof categoryBackgrounds] || categoryBackgrounds.all;
  };

  const productCategories = [
    {
      name: "Agro & Aquaculture Chemicals",
      id: "agro-aquaculture",
      description: "Our comprehensive range of agricultural chemicals supports modern farming practices with innovative solutions for crop protection, soil enhancement, and yield optimization. We provide environmentally conscious formulations that ensure sustainable agriculture while maximizing productivity.",
      products: [
        "Ammonium Polyphosphate", "Ammonium Chloride", "Ammonium Sulphate (White)",
        "Biofertilizer", "Boran", "Boric Acid", "Calcium Carbonate", "Calcium Chloride",
        "Calcium Sulphate", "Calcium Nitrate", "Copper Sulphate", "Di Calcium Phosphate",
        "Ferric Chloride", "Ferrous Sulphate", "Fumaric Acid", "Humic Acid (Liquid/Powder)",
        "Humic Acid (Shiny Flakes)", "Hydrochloric Acid", "Hydrogen Peroxide", "Lime Powder",
        "Magnesium Phosphate", "Malic Acid", "Manganese Chloride", "Manganese Sulphate",
        "Magnesium Chloride", "Magnesium Sulphate", "Micronutrients", "Mixed Fertilizer",
        "Mono Ammonium Phosphate", "Mono Calcium Phosphate", "NPK Fertilizers (All Series)",
        "Organix", "Phosphoric Acid", "Potassium Chloride", "Potassium Humate",
        "Potassium Hydroxide", "Potassium Nitrate", "Potassium Sulphate", "Silver Hydrogen Peroxide",
        "Sodium Chloride", "Sodium Hydroxide", "Sodium Nitrate", "Urea", "Zinc Sulphate",
        "Iron Chelate", "Calcium Ammonium Nitrate", "Seaweed Extract", "Amino Acid Fertilizer"
      ]
    },
    {
      name: "Water Treatment Chemicals",
      id: "water-treatment",
      description: "Advanced water treatment solutions designed for industrial, municipal, and residential applications. Our chemical formulations ensure water purity, system efficiency, and environmental compliance across diverse treatment processes.",
      products: [
        "Alum (Ferric / Non-Ferric)", "Bioculture", "Bleaching Powder", "Calcium Hypochlorite",
        "Caustic Soda", "Citric Acid", "Decolorant", "EDTA", "Ferric Chloride",
        "Hydrated Lime Powder", "Hydrazine Hydrate (80%)", "Hydrochloric Acid (32%)",
        "Hydrogen Peroxide (50%)", "Liquid Ammonia", "Microbes and Enzymes", "Nitric Acid (55%, 60%, 72%)",
        "Oxygen Scavengers", "Poly Aluminium Chloride (L/P)", "Poly Electrolyte (Anionic, Cationic)",
        "Soda Ash", "Sodium Chloride", "Sodium Hypochlorite", "Sodium Meta Bi Sulphate",
        "Sodium Sulphate", "RO Antiscalant", "pH Booster", "Sodium Bicarbonate", "Scale Remover (HCL)",
        "TCCA 90", "Copper Sulphate", "Chlorine", "Chlorine Dioxide", "Ozone", "UV Disinfection Chemicals",
        "Corrosion Inhibitors", "Biocides", "Flocculants", "Coagulants"
      ]
    },
    {
      name: "Hygiene Raw Materials & Detergents",
      id: "hygiene-raw-materials",
      description: "Premium quality raw materials specifically formulated for the hygiene industry, including surfactants, emulsifiers, preservatives, and active ingredients for detergents and personal care products. Our carefully selected portfolio enables manufacturers to create high-performance cleaning solutions.",
      products: [
        "Acid Slurry (IPCL/TP)", "Acid Thickener", "Alphox 100 & 200 (All Grades)",
        "AOS Liquid/Paste/Powder", "BKC (50%/80%)", "Baking Soda (Sodium Bicarbonate)",
        "Butyl Acetate", "Caustic Soda", "Cetyl Acetate", "Coco Amido Propyl Betaine (CAPB)",
        "Coco Diethanol Amide (CDEA)", "EGMS", "Enzyme", "EDTA", "Fatty Acids",
        "Fatty Alcohols", "Filler Salt / Free Flow Salt", "Ginasul / Ginol (All Series)",
        "Gum Resin", "Glycerine", "IPA (Isopropyl Alcohol)", "Isopropyl Myristate",
        "Lauramide DEA", "Liquid Paraffin (Light & Heavy)", "Lauric Acid", "Muristic",
        "MEC (Mono Ethylene Sulphate)", "Non-Ionic Surfactant", "Olic Acid", "Optical Brightener",
        "Oxytech", "Petroleum Jelly", "Phynoil Compound", "Pine Oil (32%)", "Silicon Oil",
        "Silky (Silicone)", "SLES Series / SLES Paste 70%", "Soap Noodles", "Soda Ash",
        "SLS Powder (Needle)", "Sodium Carboxy Methyl Cellulose", "Sodium Percarbonate",
        "Sodium Meta Silicate", "Sodium Sulphate", "Sodium Tripolyphosphate (STPP)",
        "Synthetic Thickener", "Soft Soap", "Tri Sodium Phosphate", "Tinopal", "Washing Soda",
        "Surfactants", "Emulsifiers", "Preservatives", "Chelating Agents", "pH Adjusters"
      ]
    },
    {
      name: "Food Chemicals",
      id: "food-chemicals",
      description: "Food-grade chemical solutions that meet stringent safety standards for food processing, preservation, and packaging industries. Our products ensure quality, safety, and regulatory compliance throughout the food supply chain.",
      products: [
        "Acetic Acid", "Ammonium Bicarbonate", "Ascorbic Acid", "Calcium Chloride",
        "Calcium Propionate", "Citric Acid", "Final Gel", "Liquid Glucose",
        "Phosphoric Acid (Food Grade)", "Potassium Citrate", "Potassium Sorbate",
        "Sodium Aluminium Sulphate", "Sodium Benzoate", "Sodium Bicarbonate",
        "Sodium Citrate", "Sorbic Acid", "Sorbitol", "Xanthan Gum", "Agar Agar",
        "Carrageenan", "Pectin", "Gellan Gum", "Guar Gum", "Locust Bean Gum",
        "Food Colors", "Natural Flavors", "Artificial Flavors", "Vanilla Extract",
        "Lactic Acid", "Malic Acid", "Tartaric Acid", "Fumaric Acid"
      ]
    },
    {
      name: "Basic Industrial Chemicals",
      id: "basic-chemicals",
      description: "Essential industrial chemicals for manufacturing and processing applications across various industries, ensuring consistent quality and reliable supply for industrial operations.",
      products: [
        "Sulfuric Acid", "Hydrochloric Acid", "Nitric Acid", "Acetic Acid",
        "Ammonia", "Sodium Hydroxide", "Potassium Hydroxide", "Calcium Oxide",
        "Magnesium Oxide", "Aluminum Oxide", "Silicon Dioxide", "Titanium Dioxide",
        "Iron Oxide", "Zinc Oxide", "Copper Oxide", "Lead Oxide", "Chromium Oxide",
        "Benzene", "Toluene", "Xylene", "Acetone", "Ethanol", "Methanol",
        "Isopropanol", "Butanol", "Ethyl Acetate", "Methyl Acetate"
      ]
    },
    {
      name: "Pharmaceutical Raw Materials",
      id: "pharmaceutical",
      description: "High-purity pharmaceutical raw materials meeting stringent quality standards for pharmaceutical manufacturing, ensuring safety, efficacy, and regulatory compliance.",
      products: [
        "Lactose Monohydrate", "Microcrystalline Cellulose", "Starch", "Mannitol",
        "Sorbitol", "Magnesium Stearate", "Talc", "Titanium Dioxide",
        "Polyethylene Glycol", "Propylene Glycol", "Glycerin", "Ethanol",
        "Isopropyl Alcohol", "Sodium Chloride", "Potassium Chloride",
        "Calcium Carbonate", "Sodium Bicarbonate", "Citric Acid", "Tartaric Acid",
        "Ascorbic Acid", "Sodium Benzoate", "Potassium Sorbate"
      ]
    }
  ];

  const filteredCategories = productCategories.filter(category =>
    selectedCategory === "all" || category.id === selectedCategory
  );

  const selectedCategoryData = productCategories.find(cat => cat.id === selectedCategory);

  // Get all products for A-Z view
  const getAllProductsAlphabetically = () => {
    const allProducts: string[] = [];
    productCategories.forEach(category => {
      allProducts.push(...category.products);
    });
    return allProducts
      .filter(product => 
        searchTerm === "" || 
        product.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative py-20 bg-blue-800 text-white"
        style={{
          backgroundImage: getCurrentBackground(),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <ChemicalElements />
        <FloatingMolecules />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 text-center z-10 flex justify-center">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-12 flex flex-col items-center w-full max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in text-white drop-shadow">
              Our Products
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 animate-slide-up">
              Comprehensive range of high-quality chemical solutions for diverse industrial applications
            </p>
            {/* Search and Filter */}
            <div className="w-full flex flex-col md:flex-row gap-4 mt-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white focus:border-blue-400"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:border-blue-400 focus:outline-none"
              >
                <option value="all" className="text-gray-900">All Products</option>
                {productCategories.map((category) => (
                  <option key={category.id} value={category.id} className="text-gray-900">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Category Description Section */}
      {selectedCategory !== "all" && selectedCategoryData && (
        <section className="py-12 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--brand-dark-blue)' }}>
                {selectedCategoryData.name}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {selectedCategoryData.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {selectedCategory === "all" ? (
            // A-Z Products View
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: 'var(--brand-dark-blue)' }}>
                A–Z Products
              </h2>
              
              <div className="max-w-4xl mx-auto space-y-4">
                {getAllProductsAlphabetically().map((product, index) => (
                  <Card
                    key={index}
                    className="product-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardContent className="p-6 relative">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 mb-4 md:mb-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors" style={{ color: 'var(--brand-dark-blue)' }}>
                            {product}
                          </h3>
                          {/* Hide description on mobile */}
                          <p className="text-sm text-gray-600 hidden md:block">
                            High-quality chemical solution for industrial applications
                          </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 md:ml-4">
                          <Link to="/contact" style={{ textDecoration: 'none' }}>
                            <Button
                              size="sm"
                              className="professional-button animated-btn w-full sm:w-auto"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Quote
                            </Button>
                          </Link>
                          <Link to="/contact" style={{ textDecoration: 'none' }}>
                            <Button
                              size="sm"
                              className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold shadow-md border-0 px-4 py-2 rounded-lg flex items-center gap-1 animated-btn w-full sm:w-auto"
                              style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '0.05em' }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-1" stroke="currentColor"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="9" width="6" height="6" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              Request MSDS
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="overlay absolute left-0 right-0 bottom-0 h-full w-full bg-blue-900/90 rounded-2xl flex flex-col items-center justify-center opacity-0 pointer-events-none transition-all duration-500 ease-out" style={{transform: 'translateY(100%)'}}>
                        <div className="text-white text-center px-4">
                          <p className="mb-2 font-semibold">More Info</p>
                          <div className="flex justify-center gap-3">
                            <span className="inline-block"><MessageSquare className="w-5 h-5" /></span>
                            <span className="inline-block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="9" width="6" height="6" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Category-specific view
            filteredCategories.map((category, categoryIndex) => (
              <div key={category.id} id={category.id} className="mb-16">
                <div className="max-w-4xl mx-auto space-y-4">
                  {category.products
                    .filter(product => 
                      searchTerm === "" || 
                      product.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((product, index) => (
                      <Card
                        key={index}
                        className="product-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200 animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <CardContent className="p-6 relative">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex-1 mb-4 md:mb-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors" style={{ color: 'var(--brand-dark-blue)' }}>
                                {product}
                              </h3>
                              {/* Hide description on mobile */}
                              <p className="text-sm text-gray-600 hidden md:block">
                                High-quality chemical solution for industrial applications
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 md:ml-4">
                              <Link to="/contact" style={{ textDecoration: 'none' }}>
                                <Button
                                  size="sm"
                                  className="professional-button animated-btn w-full sm:w-auto"
                                >
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Quote
                                </Button>
                              </Link>
                              <Link to="/contact" style={{ textDecoration: 'none' }}>
                                <Button
                                  size="sm"
                                  className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold shadow-md border-0 px-4 py-2 rounded-lg flex items-center gap-1 animated-btn w-full sm:w-auto"
                                  style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '0.05em' }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-1" stroke="currentColor"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="9" width="6" height="6" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                  Request MSDS
                                </Button>
                              </Link>
                            </div>
                          </div>
                          <div className="overlay absolute left-0 right-0 bottom-0 h-full w-full bg-blue-900/90 rounded-2xl flex flex-col items-center justify-center opacity-0 pointer-events-none transition-all duration-500 ease-out" style={{transform: 'translateY(100%)'}}>
                            <div className="text-white text-center px-4">
                              <p className="mb-2 font-semibold">More Info</p>
                              <div className="flex justify-center gap-3">
                                <span className="inline-block"><MessageSquare className="w-5 h-5" /></span>
                                <span className="inline-block"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor"><path d="M4 17V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="9" width="6" height="6" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;