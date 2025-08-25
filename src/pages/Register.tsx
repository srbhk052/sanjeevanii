import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Cross, Hospital, User, Users } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '' as 'hospital' | 'donor' | 'patient' | '',
    bloodGroup: '',
    city: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) {
      toast.error("Please select your role");
      return;
    }
    
    const success = register({
      ...formData,
      role: formData.role as 'hospital' | 'donor' | 'patient'
    });
    if (success) {
      toast.success("Registration successful!");
      if (formData.role === 'hospital') {
        navigate('/dashboard');
      } else if (formData.role === 'donor') {
        navigate('/donor');
      } else {
        navigate('/patient');
      }
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  const roleCards = [
    { 
      id: 'hospital', 
      title: 'Hospital', 
      icon: Hospital, 
      description: 'Manage blood bank and patient requests' 
    },
    { 
      id: 'donor', 
      title: 'Blood Donor', 
      icon: Heart, 
      description: 'Register to donate blood and organs' 
    },
    { 
      id: 'patient', 
      title: 'Patient/Family', 
      icon: User, 
      description: 'Request blood or find donors' 
    }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-accent/20 to-background">
      <div className="w-full max-w-2xl space-y-6">
        {/* Logo */}
        <div className="text-center mb-8">
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
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <p className="text-muted-foreground">Join the Sanjeevani healthcare network</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Select Your Role</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roleCards.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setFormData({...formData, role: role.id as 'hospital' | 'donor' | 'patient'})}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.role === role.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-center">
                        <role.icon className={`w-8 h-8 mx-auto mb-2 ${
                          formData.role === role.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <h3 className="font-medium">{role.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
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
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                {(formData.role === 'donor' || formData.role === 'patient') && (
                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value) => setFormData({...formData, bloodGroup: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <div className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in here
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;