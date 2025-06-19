import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone', 'company', 'subject', 'message'];
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 Contact form submission started');
    console.log('📋 Form data:', formData);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('📤 Sending service request email...');
      
      const payload = {
        formType: 'service-request',
        formData: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
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
        console.log('✅ Email sent successfully');
        setSubmitStatus('success');
        toast.success("Message sent successfully! We'll get back to you soon.");
        
        // Reset form
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          company: '', 
          subject: '', 
          message: '' 
        });
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

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "Corporate Office",
      content: [
        "3rd floor, No.76, East Power House Road,",
        "Gandhipuram, Tatabad,",
        "Coimbatore - 641012,",
        "Tamil Nadu, India"
      ]
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "Manufacturing Unit",
      content: [
        "7/8-5, Main Rd, Athikadavu,",
        "Keeranatham, Tamil Nadu 641035"
      ]
    },
    {
      icon: <Phone className="w-6 h-6 text-green-600" />,
      title: "Phone",
      content: [
        "+91 96775 22201"
      ]
    },
    {
      icon: <Mail className="w-6 h-6 text-red-600" />,
      title: "Email",
      content: [
        "info@dropschemicals.com",
        "sales@dropschemicals.com"
      ]
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Business Hours",
      content: [
        "Monday to Saturday:",
        "9:00 AM to 8:00 PM"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section
        className="relative text-white py-20"
        style={{
          backgroundImage: ` url('https://b2bblogassets.airtel.in/wp-content/uploads/2022/11/sip-calling.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in text-white tracking-wide drop-shadow-lg" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in animation-delay-200">
              We'd love to hear from you. Reach out for inquiries, partnerships, or custom product requests.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative">
              <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border border-transparent hover:border-blue-400">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                    Send us a Message
                  </CardTitle>
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Message sent successfully!</span>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Failed to send message. Please try again.</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <Input 
                          name="name"
                          placeholder="Your full name" 
                          required 
                          value={formData.name} 
                          onChange={handleInputChange}
                          className={submitStatus === 'error' ? 'border-red-300' : ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input 
                          name="email"
                          type="email" 
                          placeholder="your.email@example.com" 
                          required 
                          value={formData.email} 
                          onChange={handleInputChange}
                          className={submitStatus === 'error' ? 'border-red-300' : ''}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <Input 
                          name="phone"
                          placeholder="+91 XXXXX XXXXX" 
                          required 
                          value={formData.phone} 
                          onChange={handleInputChange}
                          className={submitStatus === 'error' ? 'border-red-300' : ''}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company Name *</label>
                        <Input 
                          name="company"
                          placeholder="Your company name" 
                          required 
                          value={formData.company} 
                          onChange={handleInputChange}
                          className={submitStatus === 'error' ? 'border-red-300' : ''}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <Input 
                        name="subject"
                        placeholder="How can we help you?" 
                        required 
                        value={formData.subject} 
                        onChange={handleInputChange}
                        className={submitStatus === 'error' ? 'border-red-300' : ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your requirements, questions, or how we can assist you..."
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className={submitStatus === 'error' ? 'border-red-300' : ''}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className={`w-full transition-all duration-300 ${
                        submitStatus === 'success' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </div>
                      ) : submitStatus === 'success' ? (
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Message Sent!
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Business Hours Card placed below the form */}
              <div className="mt-8">
                <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border border-transparent hover:border-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">Business Hours</h3>
                        <div className="space-y-1">
                          <p className="text-gray-600">Monday to Saturday:</p>
                          <p className="text-gray-600">9:00 AM to 8:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.filter(info => info.title !== 'Business Hours').map((info, index) => (
                <Card key={index} className={
                  `transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border border-transparent ` +
                  (info.title === 'Corporate Office' ? 'hover:border-blue-400 ' :
                   info.title === 'Manufacturing Unit' ? 'hover:border-blue-400 ' :
                   info.title === 'Phone' ? 'hover:border-green-500 ' :
                   info.title === 'Email' ? 'hover:border-red-500 ' :
                   '')
                }>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                        <div className="space-y-1">
                          {info.content.map((line, idx) => (
                            <p key={idx} className="text-gray-600">{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Section moved here for better layout */}
        <div className="container mx-auto px-4 mt-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Coimbatore's industrial district
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="h-96 bg-gray-200 flex items-center justify-center p-0">
                <iframe
                  title="Google Map - Drops Chemicals"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.324728934624!2d76.9630130750426!3d11.02196445402837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857e2e2e2e2e2%3A0x123456789abcdef!2s3rd%20floor%2C%20No.76%2C%20East%20Power%20House%20Rd%2C%20Tatabad%2C%20Coimbatore%2C%20Tamil%20Nadu%20641012%2C%20India!5e0!3m2!1sen!2sin!4v1685700000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-96 rounded-none border-0"
                ></iframe>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;