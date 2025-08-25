import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, TrendingUp, Users, Activity, Heart } from "lucide-react";
import { useMedicalStore } from "@/stores/medicalStore";
import { toast } from "sonner";

const HospitalDashboard = () => {
  const { bloodStock, organStock, requests, addBloodStock, updateBloodStock, deleteBloodStock, addOrganStock, updateOrganStock, deleteOrganStock, updateRequestStatus } = useMedicalStore();
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [isAddOrganOpen, setIsAddOrganOpen] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [stockForm, setStockForm] = useState({
    type: 'Blood',
    bloodGroup: 'A+',
    quantity: '',
    expiryDate: ''
  });
  const [organForm, setOrganForm] = useState({
    type: '',
    urgency: 'Low',
    available: true
  });

  const organTypes = [
    'Heart', 'Liver', 'Kidney', 'Lung', 'Pancreas', 'Cornea', 'Bone Marrow', 'Skin', 'Bone'
  ];

  const handleAddStock = (e: React.FormEvent) => {
    e.preventDefault();
    addBloodStock({
      type: stockForm.type as any,
      bloodGroup: stockForm.bloodGroup,
      quantity: parseInt(stockForm.quantity),
      expiryDate: stockForm.expiryDate,
      hospitalId: '1'
    });
    setStockForm({ type: 'Blood', bloodGroup: 'A+', quantity: '', expiryDate: '' });
    setIsAddStockOpen(false);
    toast.success("Stock added successfully!");
  };

  const handleAddOrgan = (e: React.FormEvent) => {
    e.preventDefault();
    addOrganStock({
      type: organForm.type,
      available: organForm.available,
      urgency: organForm.urgency as any,
      hospitalId: '1'
    });
    setOrganForm({ type: '', urgency: 'Low', available: true });
    setIsAddOrganOpen(false);
    toast.success("Organ added successfully!");
  };

  const handleStatusUpdate = (requestId: string, newStatus: any) => {
    updateRequestStatus(requestId, newStatus);
    toast.success(`Request status updated to ${newStatus}`);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Pending': return 'secondary';
      case 'Approved': return 'default';
      case 'Completed': return 'outline';
      default: return 'secondary';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-emergency';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const totalStock = bloodStock.reduce((sum, stock) => sum + stock.quantity, 0);
  const pendingRequests = requests.filter(req => req.status === 'Pending').length;
  const completedToday = requests.filter(req => req.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
            <p className="text-muted-foreground">Manage your medical resources and requests</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="medical-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Stock</p>
                  <p className="text-2xl font-bold">{totalStock} Units</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-yellow-100">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                  <p className="text-2xl font-bold">{pendingRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="medical-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                  <p className="text-2xl font-bold">{completedToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blood & Plasma Stock Management */}
        <Card className="medical-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Blood & Plasma Stock</span>
              </CardTitle>
              <Dialog open={isAddStockOpen} onOpenChange={setIsAddStockOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stock
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Stock</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddStock} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select value={stockForm.type} onValueChange={(value) => setStockForm({...stockForm, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Blood">Blood</SelectItem>
                            <SelectItem value="Plasma">Plasma</SelectItem>
                            <SelectItem value="Platelets">Platelets</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select value={stockForm.bloodGroup} onValueChange={(value) => setStockForm({...stockForm, bloodGroup: value})}>
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
                          type="number"
                          value={stockForm.quantity}
                          onChange={(e) => setStockForm({...stockForm, quantity: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          type="date"
                          value={stockForm.expiryDate}
                          onChange={(e) => setStockForm({...stockForm, expiryDate: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Add Stock</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bloodStock.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell>{stock.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{stock.bloodGroup}</Badge>
                    </TableCell>
                    <TableCell>{stock.quantity} units</TableCell>
                    <TableCell>{new Date(stock.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteBloodStock(stock.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Organ Stock Management */}
        <Card className="medical-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Organ Stock</span>
              </CardTitle>
              <Dialog open={isAddOrganOpen} onOpenChange={setIsAddOrganOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Organ
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Organ</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddOrgan} className="space-y-4">
                    <div>
                      <Label htmlFor="organType">Organ Type</Label>
                      <Select value={organForm.type} onValueChange={(value) => setOrganForm({...organForm, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organ type" />
                        </SelectTrigger>
                        <SelectContent>
                          {organTypes.map(organ => (
                            <SelectItem key={organ} value={organ}>{organ}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="urgency">Urgency</Label>
                        <Select value={organForm.urgency} onValueChange={(value) => setOrganForm({...organForm, urgency: value})}>
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
                      <div className="flex items-center space-x-2 mt-6">
                        <input 
                          type="checkbox" 
                          checked={organForm.available}
                          onChange={(e) => setOrganForm({...organForm, available: e.target.checked})}
                          className="w-4 h-4"
                        />
                        <Label>Available</Label>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Add Organ</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organ Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organStock.map((organ) => (
                  <TableRow key={organ.id}>
                    <TableCell className="font-medium">{organ.type}</TableCell>
                    <TableCell>
                      <Badge variant={organ.available ? "default" : "secondary"}>
                        {organ.available ? "Available" : "Not Available"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${getUrgencyColor(organ.urgency)}`}>
                        {organ.urgency}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteOrganStock(organ.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Requests Management */}
        <Card className="medical-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Patient Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.patientName}</TableCell>
                    <TableCell>{request.requirement}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(request.status)}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.location}</TableCell>
                    <TableCell>
                      <Select 
                        value={request.status} 
                        onValueChange={(value) => handleStatusUpdate(request.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HospitalDashboard;