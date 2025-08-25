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
  organType?: string;
  quantity?: number;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Completed';
  location: string;
  contactNumber: string;
  createdAt: string;
  hospitalId?: string;
}

export interface DonationOpportunity {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  urgent: boolean;
  type: string;
  registeredDonors: string[];
}

interface MedicalStore {
  bloodStock: BloodStock[];
  organStock: OrganStock[];
  requests: MedicalRequest[];
  donationOpportunities: DonationOpportunity[];
  addBloodStock: (stock: Omit<BloodStock, 'id'>) => void;
  updateBloodStock: (id: string, stock: Partial<BloodStock>) => void;
  deleteBloodStock: (id: string) => void;
  addOrganStock: (organ: Omit<OrganStock, 'id'>) => void;
  updateOrganStock: (id: string, organ: Partial<OrganStock>) => void;
  deleteOrganStock: (id: string) => void;
  addRequest: (request: Omit<MedicalRequest, 'id' | 'createdAt'>) => void;
  updateRequestStatus: (id: string, status: MedicalRequest['status']) => void;
  registerForDonation: (opportunityId: string, donorId: string) => void;
}

export const useMedicalStore = create<MedicalStore>((set) => ({
  bloodStock: [],
  organStock: [],
  requests: [],
  donationOpportunities: [
    {
      id: '1',
      name: 'Blood Drive at City Mall',
      date: '2024-02-20',
      time: '10:00 AM - 4:00 PM',
      location: 'City Mall, Main Street',
      distance: '2.5 km',
      urgent: false,
      type: 'Blood',
      registeredDonors: []
    },
    {
      id: '2',
      name: 'Emergency: B+ Blood Needed',
      date: '2024-02-16',
      time: 'ASAP',
      location: 'City Hospital',
      distance: '1.2 km',
      urgent: true,
      type: 'Blood',
      registeredDonors: []
    }
  ],
  
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
  
  addOrganStock: (organ) => set((state) => ({
    organStock: [...state.organStock, { ...organ, id: Date.now().toString() }]
  })),
  
  updateOrganStock: (id, updates) => set((state) => ({
    organStock: state.organStock.map(organ => 
      organ.id === id ? { ...organ, ...updates } : organ
    )
  })),
  
  deleteOrganStock: (id) => set((state) => ({
    organStock: state.organStock.filter(organ => organ.id !== id)
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
  })),
  
  registerForDonation: (opportunityId, donorId) => set((state) => ({
    donationOpportunities: state.donationOpportunities.map(opp =>
      opp.id === opportunityId 
        ? { ...opp, registeredDonors: [...opp.registeredDonors, donorId] }
        : opp
    )
  }))
}));