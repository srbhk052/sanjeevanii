import { create } from 'zustand';

export interface BloodStock {
  id: string;
  type: 'Blood' | 'Plasma' | 'Platelets';
  bloodGroup: string;
  quantity: number;
  expiryDate: string;
  hospitalId?: string;
}

export interface OrganStock {
  id: string;
  type: string;
  available: boolean;
  hospitalId?: string;
  urgency: 'Low' | 'Medium' | 'High';
}

export interface MedicalRequest {
  id: string;
  patientName: string;
  requirement: string;
  bloodGroup?: string;
  quantity?: number;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Completed';
  location: string;
  contactNumber: string;
  createdAt: string;
  hospitalId?: string;
}

interface MedicalStore {
  bloodStock: BloodStock[];
  organStock: OrganStock[];
  requests: MedicalRequest[];
  addBloodStock: (stock: Omit<BloodStock, 'id'>) => void;
  updateBloodStock: (id: string, stock: Partial<BloodStock>) => void;
  deleteBloodStock: (id: string) => void;
  addRequest: (request: Omit<MedicalRequest, 'id' | 'createdAt'>) => void;
  updateRequestStatus: (id: string, status: MedicalRequest['status']) => void;
}

// Mock data
const mockBloodStock: BloodStock[] = [
  { id: '1', type: 'Blood', bloodGroup: 'A+', quantity: 45, expiryDate: '2024-02-15', hospitalId: '1' },
  { id: '2', type: 'Blood', bloodGroup: 'B+', quantity: 32, expiryDate: '2024-02-20', hospitalId: '1' },
  { id: '3', type: 'Blood', bloodGroup: 'O+', quantity: 78, expiryDate: '2024-02-18', hospitalId: '1' },
  { id: '4', type: 'Plasma', bloodGroup: 'A+', quantity: 25, expiryDate: '2024-03-01', hospitalId: '1' },
  { id: '5', type: 'Platelets', bloodGroup: 'O+', quantity: 18, expiryDate: '2024-01-30', hospitalId: '1' },
];

const mockOrganStock: OrganStock[] = [
  { id: '1', type: 'Kidney', available: true, hospitalId: '1', urgency: 'High' },
  { id: '2', type: 'Liver', available: false, hospitalId: '1', urgency: 'Medium' },
  { id: '3', type: 'Heart', available: true, hospitalId: '1', urgency: 'High' },
];

const mockRequests: MedicalRequest[] = [
  {
    id: '1',
    patientName: 'Rohit Sharma',
    requirement: 'Blood - B+',
    bloodGroup: 'B+',
    quantity: 2,
    urgency: 'High',
    status: 'Pending',
    location: 'Mumbai',
    contactNumber: '+91 9876543201',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    patientName: 'Anita Singh',
    requirement: 'Platelets - O+',
    bloodGroup: 'O+',
    quantity: 1,
    urgency: 'Medium',
    status: 'Approved',
    location: 'Delhi',
    contactNumber: '+91 9876543202',
    createdAt: '2024-01-14T15:45:00Z'
  }
];

export const useMedicalStore = create<MedicalStore>((set) => ({
  bloodStock: mockBloodStock,
  organStock: mockOrganStock,
  requests: mockRequests,
  
  addBloodStock: (stock) => set((state) => ({
    bloodStock: [...state.bloodStock, { ...stock, id: Date.now().toString() }]
  })),
  
  updateBloodStock: (id, updates) => set((state) => ({
    bloodStock: state.bloodStock.map(stock => 
      stock.id === id ? { ...stock, ...updates } : stock
    )
  })),
  
  deleteBloodStock: (id) => set((state) => ({
    bloodStock: state.bloodStock.filter(stock => stock.id !== id)
  })),
  
  addRequest: (request) => set((state) => ({
    requests: [...state.requests, { 
      ...request, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }]
  })),
  
  updateRequestStatus: (id, status) => set((state) => ({
    requests: state.requests.map(req => 
      req.id === id ? { ...req, status } : req
    )
  }))
}));