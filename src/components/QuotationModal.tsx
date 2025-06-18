
import { useState } from "react";
import { X, Send, Package, User, Mail, Phone, Building, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productCategory: string;
}

export const QuotationModal = ({ isOpen, onClose, productCategory }: QuotationModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "",
    specifications: "",
    timeline: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quotation request submitted:", { productCategory, ...formData });
    // Handle form submission logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Premium backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <Card className="relative z-10 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-3xl rounded-3xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 p-8 text-white rounded-t-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Request Quotation</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full p-2"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Package className="w-6 h-6" />
                <span className="text-xl font-semibold">{productCategory}</span>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-4 right-20 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
            <div className="absolute bottom-4 left-20 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 font-semibold text-lg">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-lg"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 font-semibold text-lg">
                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 font-semibold text-lg">
                    <Phone className="w-5 h-5 mr-2 text-blue-600" />
                    Phone Number *
                  </label>
                  <Input
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-lg"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 font-semibold text-lg">
                    <Building className="w-5 h-5 mr-2 text-blue-600" />
                    Company Name
                  </label>
                  <Input
                    name="company"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-lg"
                  />
                </div>
              </div>

              {/* Product Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 font-semibold text-lg">
                    <Package className="w-5 h-5 mr-2 text-blue-600" />
                    Required Quantity
                  </label>
                  <Input
                    name="quantity"
                    placeholder="e.g., 500 kg, 10 tons"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 font-semibold text-lg">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Required Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-lg focus:outline-none"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (1-3 days)</option>
                    <option value="week">Within a week</option>
                    <option value="month">Within a month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold text-lg">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  Product Specifications
                </label>
                <Textarea
                  name="specifications"
                  placeholder="Please specify grade, purity, packaging requirements, or any other specifications..."
                  value={formData.specifications}
                  onChange={handleInputChange}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-lg min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold text-lg">
                  <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                  Additional Message
                </label>
                <Textarea
                  name="message"
                  placeholder="Any additional information or special requirements..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl py-3 px-4 text-lg min-h-[120px]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="px-8 py-3 text-lg font-semibold rounded-xl border-2"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 group shadow-xl"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Quotation Request
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
