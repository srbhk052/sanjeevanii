import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Cross, Hospital, Users, User } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import medicalHero from "@/assets/medical-hero.jpg";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) {
      toast.error("Please select your role");
      return;
    }
    
    const success = login(formData.email, formData.password, formData.role);
    if (success) {
      toast.success("Login successful!");
      if (formData.role === 'hospital') {
        navigate('/dashboard');
      } else if (formData.role === 'donor') {
        navigate('/donor');
      } else {
        navigate('/patient');
      }
    } else {
      toast.error("Invalid credentials. Try: hospital@sanjeevani.com / hospital123");
    }
  };

  const roleCards = [
    { 
      id: 'hospital', 
      title: 'Hospital', 
      icon: Hospital, 
      description: 'Manage blood bank and requests',
      demo: 'hospital@sanjeevani.com / hospital123'
    },
    { 
      id: 'donor', 
      title: 'Donor', 
      icon: Heart, 
      description: 'Track donations and eligibility',
      demo: 'donor@sanjeevani.com / donor123'
    },
    { 
      id: 'patient', 
      title: 'Patient/Family', 
      icon: User, 
      description: 'Request blood and track status',
      demo: 'patient@sanjeevani.com / patient123'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src={medicalHero} 
          alt="Medical professionals" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5"></div>
        <div className="absolute top-8 left-8 flex items-center space-x-3">
          <div className="relative">
            <Cross className="w-10 h-10 text-white" />
            <Heart className="w-4 h-4 text-white absolute top-3 left-3" />
          </div>
          <span className="text-2xl font-bold text-white">Sanjeevani</span>
        </div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-4xl font-bold mb-4">Healthcare Resource Management</h2>
          <p className="text-xl opacity-90">Connecting donors, hospitals, and patients for better healthcare outcomes</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-accent/20 to-background">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="relative">
                <Cross className="w-8 h-8 text-primary" />
                <Heart className="w-3 h-3 text-primary absolute top-2.5 left-2.5" />
              </div>
              <span className="text-2xl font-bold text-primary">Sanjeevani</span>
            </div>
          </div>

          <Card className="medical-card border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <p className="text-muted-foreground">Sign in to your account</p>
            </CardHeader>
            <CardContent>
              {/* Role Selection */}
              <div className="mb-6">
                <Label className="text-sm font-medium mb-3 block">Select Your Role</Label>
                <div className="grid grid-cols-1 gap-3">
                  {roleCards.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setFormData({...formData, role: role.id})}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.role === role.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <role.icon className={`w-5 h-5 ${
                          formData.role === role.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <div className="flex-1">
                          <h3 className="font-medium">{role.title}</h3>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                          <p className="text-xs text-primary mt-1">Demo: {role.demo}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
              
              <div className="mt-6 text-center space-y-2">
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
                <div className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;