import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Phone, Clock, MapPin, Heart, Zap } from "lucide-react";
import { useMedicalStore } from "@/stores/medicalStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EmergencyRequest = () => {
  const navigate = useNavigate();
  const { addRequest } = useMedicalStore();
  const [emergencyForm, setEmergencyForm] = useState({
    patientName: '',
    requirement: 'Blood',
    bloodGroup: 'A+',
    quantity: '',
    location: '',
    contactNumber: '',
    hospitalName: '',
    additionalInfo: ''
  });

  const handleEmergencySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addRequest({
      ...emergencyForm,
      quantity: parseInt(emergencyForm.quantity),
      urgency: 'High',
      status: 'Pending'
    });

    toast.success("🚨 Emergency request submitted! Nearby hospitals and donors will be notified immediately.");
    
    // Simulate emergency notifications
    setTimeout(() => {
      toast.success("📞 3 nearby hospitals contacted");
    }, 2000);
    
    setTimeout(() => {
      toast.success("👥 12 compatible donors notified");
    }, 4000);

    navigate('/patient');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emergency/10 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Emergency Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 rounded-full bg-emergency/10 pulse-healing">
              <AlertTriangle className="w-8 h-8 text-emergency" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-emergency">Emergency Request</h1>
              <p className="text-emergency/80 text-lg">Critical medical resource needed urgently</p>
            </div>
          </div>
          
          {/* Emergency Stats */}
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-emergency" />
              <span className="font-medium">Response Time: &lt;5 min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-emergency" />
              <span className="font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emergency" />
              <span className="font-medium">Instant Alerts</span>
            </div>
          </div>
        </div>

        {/* Emergency Form */}
        <Card className="max-w-2xl mx-auto emergency-card border-0">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <Heart className="w-6 h-6" />
              <span>Submit Emergency Request</span>
            </CardTitle>
            <p className="text-center text-emergency-foreground/80">
              Fill in the details below. Our system will immediately alert nearby hospitals and compatible donors.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmergencySubmit} className="space-y-6">
              {/* Patient Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emergency-foreground">Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientName" className="text-emergency-foreground">Patient Name *</Label>
                    <Input
                      id="patientName"
                      value={emergencyForm.patientName}
                      onChange={(e) => setEmergencyForm({...emergencyForm, patientName: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="Full name of patient"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactNumber" className="text-emergency-foreground">Emergency Contact *</Label>
                    <Input
                      id="contactNumber"
                      type="tel"
                      value={emergencyForm.contactNumber}
                      onChange={(e) => setEmergencyForm({...emergencyForm, contactNumber: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emergency-foreground">Medical Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="requirement" className="text-emergency-foreground">Type *</Label>
                    <Select value={emergencyForm.requirement} onValueChange={(value) => setEmergencyForm({...emergencyForm, requirement: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Blood">Blood</SelectItem>
                        <SelectItem value="Plasma">Plasma</SelectItem>
                        <SelectItem value="Platelets">Platelets</SelectItem>
                        <SelectItem value="Organ">Organ Transplant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bloodGroup" className="text-emergency-foreground">Blood Group *</Label>
                    <Select value={emergencyForm.bloodGroup} onValueChange={(value) => setEmergencyForm({...emergencyForm, bloodGroup: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="text-emergency-foreground">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={emergencyForm.quantity}
                      onChange={(e) => setEmergencyForm({...emergencyForm, quantity: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="Units needed"
                    />
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emergency-foreground">Location Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hospitalName" className="text-emergency-foreground">Hospital/Location Name *</Label>
                    <Input
                      id="hospitalName"
                      value={emergencyForm.hospitalName}
                      onChange={(e) => setEmergencyForm({...emergencyForm, hospitalName: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="Hospital or facility name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-emergency-foreground">Complete Address *</Label>
                    <Input
                      id="location"
                      value={emergencyForm.location}
                      onChange={(e) => setEmergencyForm({...emergencyForm, location: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="Full address with pincode"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emergency-foreground">Additional Information</h3>
                <div>
                  <Label htmlFor="additionalInfo" className="text-emergency-foreground">Medical Details (Optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    value={emergencyForm.additionalInfo}
                    onChange={(e) => setEmergencyForm({...emergencyForm, additionalInfo: e.target.value})}
                    className="mt-1"
                    rows={3}
                    placeholder="Any additional medical information, special requirements, or notes for donors/hospitals..."
                  />
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="bg-emergency/10 border border-emergency/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-emergency flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-emergency mb-1">Emergency Protocol:</p>
                    <ul className="text-emergency/80 space-y-1">
                      <li>• Nearby hospitals will be contacted immediately</li>
                      <li>• Compatible donors within 25km will receive instant notifications</li>
                      <li>• Our emergency helpline will call you within 5 minutes</li>
                      <li>• Real-time updates will be sent via SMS</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-emergency hover:bg-emergency/90 text-emergency-foreground pulse-healing"
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                SUBMIT EMERGENCY REQUEST
              </Button>

              {/* Emergency Contact */}
              <div className="text-center text-sm text-muted-foreground">
                <p>For immediate assistance, call our 24/7 helpline:</p>
                <p className="text-lg font-bold text-emergency">📞 1800-SANJEEVANI (1800-726-5338)</p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Recent Emergency Responses */}
        <Card className="max-w-2xl mx-auto medical-card border-0">
          <CardHeader>
            <CardTitle className="text-center">Recent Emergency Responses</CardTitle>
            <p className="text-center text-muted-foreground text-sm">
              See how quickly our network responds to emergencies
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'B+ Blood', location: 'Mumbai', responseTime: '4 min', donors: 8 },
                { type: 'O- Platelets', location: 'Delhi', responseTime: '3 min', donors: 12 },
                { type: 'A+ Blood', location: 'Bangalore', responseTime: '5 min', donors: 15 }
              ].map((response, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                  <div>
                    <p className="font-medium">{response.type}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {response.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{response.responseTime}</p>
                    <p className="text-sm text-muted-foreground">{response.donors} donors</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmergencyRequest;