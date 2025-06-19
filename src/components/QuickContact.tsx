import { useState, useEffect, useRef } from "react";
import { Send, MapPin, Mail, Clock, AlertCircle, CheckCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { FloatingMolecules } from "@/components/FloatingMolecules";

export const QuickContact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => 
      !formData[field as keyof typeof formData] || 
      formData[field as keyof typeof formData].trim() === ''
    );

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 Quick contact form submission started');
    console.log('📋 Form data:', formData);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('📤 Sending contact email...');
      
      const payload = {
        formType: 'contact',
        formData: {
          fullName: formData.name.trim(), // Map name to fullName for contact form
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }
      };

      console.log('📦 Payload:', payload);

      // Try multiple server endpoints for better reliability
      const serverEndpoints = [
        'http://localhost:5000/send-email',
        'http://localhost:3001/send-email'
      ];

      let response;
      let lastError;

      for (const endpoint of serverEndpoints) {
        try {
          console.log(`📡 Trying endpoint: ${endpoint}`);
          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload),
          });
          
          if (response.ok) {
            console.log(`✅ Successfully connected to ${endpoint}`);
            break;
          }
        } catch (error) {
          console.log(`❌ Failed to connect to ${endpoint}:`, error);
          lastError = error;
          continue;
        }
      }

      if (!response || !response.ok) {
        throw lastError || new Error('All server endpoints failed');
      }

      console.log('📡 Response status:', response.status);
      
      const responseData = await response.json();
      console.log('📨 Response data:', responseData);
      
      if (response.ok && responseData.success) {
        console.log('✅ Contact email sent successfully');
        setSubmitStatus('success');
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('❌ Server responded with error:', responseData);
        setSubmitStatus('error');
        const errorMessage = responseData.error || 'Failed to send message';
        toast.error(`Failed to send message: ${errorMessage}`);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setSubmitStatus('error');
      toast.error("Unable to connect to email server. Please try again later or contact us directly at info@dropschemicals.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Reset status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["3rd floor, No.76, East Power House Road", "Gandhipuram, Coimbatore - 641012"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@dropschemicals.com", "sales@dropschemicals.com"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Saturday: 9:00 AM - 8:00 PM", "Sunday: Closed"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Headphones,
      title: "24/7 Technical Support",
      details: ["We're always here to help you"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 premium-page-bg text-white"
      style={{
        backgroundImage: "url('https://www.ionos.com/startupguide/fileadmin/_processed_/c/0/csm_data-analysis-laptop-t_4483ab6cad.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <FloatingMolecules />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative container mx-auto px-4 z-10">
        <div className={`text-center mb-16 transition-all duration-800`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <div className="section-divider bg-white"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Ready to discuss your chemical solution needs? Contact our expert team today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Connect with our team for personalized chemical solutions and expert consultation.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index}
                  className={`border-white/20 text-white transition-all duration-500 ${
                    isVisible ? 'modern-scale-in' : 'opacity-0 scale-95'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.2}s`,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <CardContent className="py-4 px-8 flex flex-row items-center h-full">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center flex-shrink-0 mr-6`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-lg font-semibold text-white mb-1">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-blue-100 text-sm">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div>
            <Card 
              className="border-white/20 shadow-lg"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-400 bg-green-900/30 p-3 rounded-lg mb-6">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Message sent successfully!</span>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-900/30 p-3 rounded-lg mb-6">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Failed to send message. Please try again.</span>
                  </div>
                )}
                
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-100">Full Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className={`border-white/30 text-white placeholder:text-blue-200 focus:border-blue-400 professional-input ${submitStatus === 'error' ? 'border-red-400' : ''}`}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(5px)',
                          background: 'rgba(255, 255, 255, 0.05)'
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-100">Email Address</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@company.com"
                        required
                        className={`border-white/30 text-white placeholder:text-blue-200 focus:border-blue-400 professional-input ${submitStatus === 'error' ? 'border-red-400' : ''}`}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(5px)',
                          background: 'rgba(255, 255, 255, 0.05)'
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-blue-100">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you?"
                      required
                      className={`border-white/30 text-white placeholder:text-blue-200 focus:border-blue-400 professional-input ${submitStatus === 'error' ? 'border-red-400' : ''}`}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(5px)',
                        background: 'rgba(255, 255, 255, 0.05)'
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-blue-100">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your requirements..."
                      required
                      rows={5}
                      className={`border-white/30 text-white placeholder:text-blue-200 focus:border-blue-400 professional-textarea resize-none ${submitStatus === 'error' ? 'border-red-400' : ''}`}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(5px)',
                        background: 'rgba(255, 255, 255, 0.05)'
                      }}
                    />
                  </div>

                  <div className="text-sm text-blue-200 flex items-center gap-2 mb-2">
                    <Headphones className="w-4 h-4" />
                    <span>24/7 Technical Support Available</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-lg py-4 transition-all duration-300 ${
                      submitStatus === 'success' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'professional-button'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : submitStatus === 'success' ? (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Message Sent!
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};