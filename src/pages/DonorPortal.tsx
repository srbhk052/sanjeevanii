import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, CheckCircle, XCircle, User, Phone, MapPin } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const DonorPortal = () => {
  const user = useAuthStore((state) => state.user);
  
  // Mock data for donor
  const donorData = {
    lastDonation: '2023-11-15',
    nextEligible: '2024-02-15',
    totalDonations: 8,
    isEligible: true,
    eligibilityReasons: ['Minimum 56 days since last donation', 'Health parameters normal'],
    organPreference: ['Heart', 'Liver', 'Kidney']
  };

  const getDaysUntilEligible = () => {
    const next = new Date(donorData.nextEligible);
    const today = new Date();
    const diffTime = next.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysUntilEligible = getDaysUntilEligible();

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Donor Portal</h1>
          <p className="text-muted-foreground">Track your donations and help save lives</p>
        </div>

        {/* Profile Card */}
        <Card className="medical-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Donor Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{user?.name}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-emergency" />
                  <span>Blood Group: <strong>{user?.bloodGroup}</strong></span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Donations</p>
                  <p className="text-2xl font-bold text-primary">{donorData.totalDonations}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Donation</p>
                  <p className="font-medium">{new Date(donorData.lastDonation).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Organ Preferences</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {donorData.organPreference.map((organ) => (
                      <Badge key={organ} variant="outline">{organ}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eligibility Status */}
        <Card className="medical-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Donation Eligibility</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              {donorData.isEligible ? (
                <div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                    <span className="text-2xl font-bold text-primary">Eligible to Donate</span>
                  </div>
                  <p className="text-muted-foreground mb-4">You can donate blood and organs now!</p>
                  <Button size="lg" className="pulse-healing">
                    <Heart className="w-5 h-5 mr-2" />
                    Schedule Donation
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <XCircle className="w-8 h-8 text-destructive" />
                    <span className="text-2xl font-bold text-destructive">Not Eligible</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    You can donate after {daysUntilEligible} days
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Next eligible date:</p>
                    <p className="text-lg font-bold">{new Date(donorData.nextEligible).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Eligibility Criteria</h4>
              <ul className="space-y-2">
                {donorData.eligibilityReasons.map((reason, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Donation History */}
        <Card className="medical-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Donation History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '2023-11-15', type: 'Blood', amount: '450ml', location: 'City Hospital' },
                { date: '2023-09-20', type: 'Platelets', amount: '1 unit', location: 'Blood Bank Center' },
                { date: '2023-07-25', type: 'Blood', amount: '450ml', location: 'Mobile Camp' },
                { date: '2023-05-30', type: 'Blood', amount: '450ml', location: 'City Hospital' }
              ].map((donation, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                  <div>
                    <p className="font-medium">{donation.type} Donation</p>
                    <p className="text-sm text-muted-foreground">{donation.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{donation.amount}</p>
                    <p className="text-sm text-muted-foreground">{new Date(donation.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Opportunities */}
        <Card className="medical-card border-0">
          <CardHeader>
            <CardTitle>Nearby Donation Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  name: 'Blood Drive at City Mall', 
                  date: '2024-02-20', 
                  time: '10:00 AM - 4:00 PM', 
                  distance: '2.5 km',
                  urgent: false 
                },
                { 
                  name: 'Emergency: B+ Blood Needed', 
                  date: '2024-02-16', 
                  time: 'ASAP', 
                  distance: '1.2 km',
                  urgent: true 
                }
              ].map((opportunity, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${
                  opportunity.urgent ? 'border-emergency bg-emergency/5' : 'border-border bg-accent/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${opportunity.urgent ? 'text-emergency' : ''}`}>
                        {opportunity.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{opportunity.date} • {opportunity.time}</p>
                      <p className="text-sm text-muted-foreground">📍 {opportunity.distance} away</p>
                    </div>
                    <Button variant={opportunity.urgent ? "destructive" : "outline"}>
                      {opportunity.urgent ? 'Respond' : 'Register'}
                    </Button>
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

export default DonorPortal;