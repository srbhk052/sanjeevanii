import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Hospital, Users, MapPin, Phone } from "lucide-react";
import { useMedicalStore } from "@/stores/medicalStore";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

const PatientPortal = () => {
  const user = useAuthStore((state) => state.user);
  const { requests, addRequest } = useMedicalStore();
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [requestForm, setRequestForm] = useState({
    patientName: '',
    requirement: 'Blood',
    bloodGroup: 'A+',
    quantity: '',
    urgency: 'Medium',
    location: '',
    contactNumber: ''
  });

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    addRequest({
      ...requestForm,
      quantity: parseInt(requestForm.quantity),
      status: 'Pending',
      urgency: requestForm.urgency as any
    });
    setRequestForm({
      patientName: '',
      requirement: 'Blood',
      bloodGroup: 'A+',
      quantity: '',
      urgency: 'Medium',
      location: '',
      contactNumber: ''
    });
    setIsRequestOpen(false);
    toast.success("Request submitted successfully!");
  };

  const mockHospitals: any[] = [];

  const filteredHospitals = searchCity 
    ? mockHospitals.filter(h => h.city.toLowerCase().includes(searchCity.toLowerCase()))
    : mockHospitals;

  const userRequests = requests.filter(req => req.contactNumber === user?.phone);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'Approved': return 'default';
      case 'Completed': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Patient Portal</h1>
          <p className="text-muted-foreground">Find hospitals and request medical resources</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="emergency-card border-0">
                <Plus className="w-5 h-5 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Submit Medical Request</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={requestForm.patientName}
                    onChange={(e) => setRequestForm({...requestForm, patientName: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requirement">Type</Label>
                    <Select value={requestForm.requirement} onValueChange={(value) => setRequestForm({...requestForm, requirement: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Blood">Blood</SelectItem>
                        <SelectItem value="Plasma">Plasma</SelectItem>
                        <SelectItem value="Platelets">Platelets</SelectItem>
                        <SelectItem value="Organ">Organ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select value={requestForm.bloodGroup} onValueChange={(value) => setRequestForm({...requestForm, bloodGroup: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={requestForm.quantity}
                      onChange={(e) => setRequestForm({...requestForm, quantity: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select value={requestForm.urgency} onValueChange={(value) => setRequestForm({...requestForm, urgency: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={requestForm.location}
                    onChange={(e) => setRequestForm({...requestForm, location: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={requestForm.contactNumber}
                    onChange={(e) => setRequestForm({...requestForm, contactNumber: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Hospitals */}
        <Card className="medical-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Find Hospitals & Donors</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label htmlFor="search">Search by City/Location</Label>
              <Input
                id="search"
                placeholder="Enter city name..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="space-y-4">
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital) => (
                  <Card key={hospital.id} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Hospital className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold">{hospital.name}</h3>
                            <Badge variant="outline">⭐ {hospital.rating}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{hospital.city} • {hospital.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{hospital.phone}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-sm font-medium">Available:</span>
                            {hospital.availableBlood.map((blood: string) => (
                              <Badge key={blood} variant="outline" className="text-xs">
                                {blood}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button size="sm">Contact</Button>
                          <Button size="sm" variant="outline">View Stock</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <Hospital className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No hospitals found. Hospital admins can add their facilities.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Request Tracking */}
        <Card className="medical-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>My Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userRequests.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.patientName}</TableCell>
                      <TableCell>{request.requirement}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{request.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No requests found. Submit your first request to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientPortal;