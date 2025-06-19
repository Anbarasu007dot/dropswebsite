import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, CheckCircle } from "lucide-react";

const ratingOptions = ["Bad", "Okay", "Good", "Excellent"];
const performanceOptions = ["Poor", "Average", "Good", "Excellent"];

const Feedback = () => {
  const [form, setForm] = useState({
    company: "",
    date: "",
    completedBy: "",
    contact: "",
    email: "",
    products: "",
    experience: "",
    price: "",
    quality: "",
    expectations: "",
    suggestions: "",
    overall: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Reset status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleClear = () => {
    setForm({
      company: "",
      date: "",
      completedBy: "",
      contact: "",
      email: "",
      products: "",
      experience: "",
      price: "",
      quality: "",
      expectations: "",
      suggestions: "",
      overall: ""
    });
    setSubmitStatus('idle');
  };

  const validateForm = () => {
    const requiredFields = [
      'company', 'date', 'completedBy', 'contact', 'email', 
      'products', 'experience', 'price', 'quality', 
      'expectations', 'suggestions', 'overall'
    ];
    
    const missingFields = requiredFields.filter(field => 
      !form[field as keyof typeof form] || 
      form[field as keyof typeof form].trim() === ''
    );
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 Feedback form submission started');
    console.log('📋 Form data:', form);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      console.log('📤 Sending feedback email...');
      
      // Trim all form values
      const trimmedForm = Object.keys(form).reduce((acc, key) => {
        acc[key] = form[key as keyof typeof form].trim();
        return acc;
      }, {} as typeof form);

      const payload = {
        formType: 'feedback',
        formData: trimmedForm
      };

      console.log('📦 Payload:', payload);

      // Use the proxied API endpoint to avoid mixed content issues
      const apiEndpoint = '/api/send-email';
      
      console.log(`📡 Sending request to: ${apiEndpoint}`);
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      console.log('📡 Response status:', response.status);
      
      const responseData = await response.json();
      console.log('📨 Response data:', responseData);
      
      if (response.ok && responseData.success) {
        console.log('✅ Feedback sent successfully');
        setSubmitStatus('success');
        toast.success("Thank you for your feedback! We appreciate your input.");
        handleClear();
      } else {
        console.error('❌ Server responded with error:', responseData);
        setSubmitStatus('error');
        const errorMessage = responseData.error || 'Failed to send feedback';
        toast.error(`Failed to send feedback: ${errorMessage}`);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setSubmitStatus('error');
      
      // Provide more helpful error messages
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      if (errorMessage.includes('Failed to fetch')) {
        toast.error("Unable to connect to the server. Please ensure the backend server is running and try again.");
      } else {
        toast.error("Network error occurred. Please try again later or contact us directly at info@dropschemicals.com");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-white py-12 px-2">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-xl rounded-2xl bg-white/90">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-blue-900 text-center">Feedback</CardTitle>
              <p className="text-blue-700 text-center mt-2">We value your feedback on our water treatment services and eco-friendly solutions! Please fill out the form below.</p>
              
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mt-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Feedback submitted successfully!</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mt-4">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Failed to submit feedback. Please try again.</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Company Name *</label>
                    <Input 
                      name="company" 
                      value={form.company} 
                      onChange={handleChange} 
                      required 
                      className={`bg-white/80 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date *</label>
                    <Input 
                      name="date" 
                      type="date" 
                      value={form.date} 
                      onChange={handleChange} 
                      required 
                      className={`bg-white/80 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Survey Completed By *</label>
                    <Input 
                      name="completedBy" 
                      value={form.completedBy} 
                      onChange={handleChange} 
                      required 
                      className={`bg-white/80 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact No *</label>
                    <Input 
                      name="contact" 
                      value={form.contact} 
                      onChange={handleChange} 
                      required 
                      className={`bg-white/80 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <Input 
                      name="email" 
                      type="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                      className={`bg-white/80 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">What products/services did you purchase from Drops Chemicals? *</label>
                    <Input 
                      name="products" 
                      value={form.products} 
                      onChange={handleChange} 
                      required 
                      className={`bg-white/80 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Was your purchasing experience positive? *</label>
                  <Input 
                    name="experience" 
                    value={form.experience} 
                    onChange={handleChange} 
                    required 
                    className={`bg-white/80 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price *</label>
                    <select 
                      name="price" 
                      value={form.price} 
                      onChange={handleChange} 
                      required 
                      className={`w-full rounded-lg border border-gray-300 py-2 px-3 bg-white/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm text-gray-900 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select</option>
                      {performanceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Quality *</label>
                    <select 
                      name="quality" 
                      value={form.quality} 
                      onChange={handleChange} 
                      required 
                      className={`w-full rounded-lg border border-gray-300 py-2 px-3 bg-white/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm text-gray-900 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select</option>
                      {performanceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Did the products purchased meet your expectations? *</label>
                  <Textarea 
                    name="expectations" 
                    value={form.expectations} 
                    onChange={handleChange} 
                    required 
                    rows={2} 
                    className={`bg-white/80 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Suggestions on how we can serve better *</label>
                  <Textarea 
                    name="suggestions" 
                    value={form.suggestions} 
                    onChange={handleChange} 
                    required 
                    rows={2} 
                    className={`bg-white/80 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm text-gray-900 placeholder:text-gray-400 ${submitStatus === 'error' ? 'border-red-300' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 mb-2">Rate your experience with us *</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {ratingOptions.map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="overall"
                          value={opt}
                          checked={form.overall === opt}
                          onChange={handleChange}
                          className="accent-blue-600 w-5 h-5"
                          required
                        />
                        <span className="text-base font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    className={`w-full transition-all duration-300 ${
                      submitStatus === 'success' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </div>
                    ) : submitStatus === 'success' ? (
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Feedback Submitted!
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleClear}
                    disabled={submitting}
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;