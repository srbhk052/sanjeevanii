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

export const useMedicalStore = create<MedicalStore>((set) => ({
  bloodStock: [],
  organStock: [],
  requests: [],
  
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