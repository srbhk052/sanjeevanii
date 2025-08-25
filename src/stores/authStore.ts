import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'hospital' | 'donor' | 'patient';
  bloodGroup?: string;
  city?: string;
  phone?: string;
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string, role: string) => boolean;
  register: (userData: Omit<User, 'id'> & { password: string }) => boolean;
  logout: () => void;
}

// Mock user data
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Sharma',
    email: 'hospital@sanjeevani.com',
    role: 'hospital',
    city: 'Mumbai',
    phone: '+91 9876543210',
    password: 'hospital123'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'donor@sanjeevani.com',
    role: 'donor',
    bloodGroup: 'O+',
    city: 'Delhi',
    phone: '+91 9876543211',
    password: 'donor123'
  },
  {
    id: '3',
    name: 'Amit Kumar',
    email: 'patient@sanjeevani.com',
    role: 'patient',
    bloodGroup: 'B+',
    city: 'Bangalore',
    phone: '+91 9876543212',
    password: 'patient123'
  }
];

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (email, password, role) => {
    const user = mockUsers.find(u => 
      u.email === email && 
      u.password === password && 
      u.role === role
    );
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      set({ user: userWithoutPassword });
      return true;
    }
    return false;
  },
  register: (userData) => {
    // In a real app, this would make an API call
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };
    set({ user: newUser });
    return true;
  },
  logout: () => set({ user: null })
}));