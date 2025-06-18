import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (password === "drops_chemicals_#01") {
        localStorage.setItem("adminAuthenticated", "true");
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid password. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-content shadow-xl">
            <img
              src="https://ik.imagekit.io/dvuz4klnl/Screenshot_2025-06-03-15-28-07-28_c37d74246d9c81aa0bb824b57eaf7062.jpg?updatedAt=1748944738882"
              className="w-16 h-16 rounded-xl object-cover mx-auto"
              alt="Drops Chemicals Logo"
            />
          </div>
          <CardTitle className="text-3xl font-bold company-name" style={{ color: 'var(--brand-dark-blue)' }}>
            Admin Portal
          </CardTitle>
          <p className="text-gray-600 mt-2">Drops Chemicals Content Management</p>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value="admin"
                  disabled
                  className="pl-12 bg-gray-50 border-2 rounded-xl h-12 text-gray-600"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 border-2 rounded-xl h-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Secure access to content management system</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;