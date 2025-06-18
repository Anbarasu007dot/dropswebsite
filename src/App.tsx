import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Preloader } from "@/components/Preloader";
import { Chatbot } from "@/components/Chatbot";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  // Show preloader on route changes
  useEffect(() => {
    setLoading(true);
    setShowPreloader(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
      setShowPreloader(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Show preloader on initial load
  useEffect(() => {
    setLoading(true);
    setShowPreloader(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
      setShowPreloader(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Show preloader while loading
  if (loading && showPreloader) {
    return <Preloader onComplete={() => {}} />;
  }

  // Show content immediately after preloader
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;