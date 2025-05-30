
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Equipment {
  id: string;
  name: string;
  photo: string;
  totalQuantity: number;
  availableQuantity: number;
  rentalDuration: number; // in days
  depositAmount: number;
}

interface MELUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  createdAt: string;
}

interface Rental {
  id: string;
  patientName: string;
  address: string;
  mobileNumber: string;
  aadharNumber: string;
  equipmentId: string;
  equipmentName: string;
  depositAmount: number;
  pickupDate: string;
  returnDate: string;
  actualReturnDate?: string;
  status: 'active' | 'returned' | 'overdue';
  userId: string;
}

interface MELContextType {
  equipment: Equipment[];
  setEquipment: (equipment: Equipment[]) => void;
  melUsers: MELUser[];
  setMELUsers: (users: MELUser[]) => void;
  rentals: Rental[];
  setRentals: (rentals: Rental[]) => void;
  currentMELUser: MELUser | null;
  setCurrentMELUser: (user: MELUser | null) => void;
  addEquipment: (equipment: Equipment) => void;
  updateEquipment: (equipment: Equipment) => void;
  deleteEquipment: (id: string) => void;
  addMELUser: (user: MELUser) => void;
  deleteMELUser: (id: string) => void;
  addRental: (rental: Rental) => void;
  markEquipmentReturned: (rentalId: string) => void;
  getOverdueRentals: () => Rental[];
  getTotalEquipmentCount: () => number;
  getAvailableEquipmentCount: () => number;
}

const MELContext = createContext<MELContextType | undefined>(undefined);

export const useMELContext = () => {
  const context = useContext(MELContext);
  if (!context) {
    throw new Error('useMELContext must be used within a MELProvider');
  }
  return context;
};

export const MELProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'Wheelchair',
      photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop',
      totalQuantity: 10,
      availableQuantity: 7,
      rentalDuration: 7,
      depositAmount: 2000
    },
    {
      id: '2',
      name: 'Walking Stick',
      photo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop',
      totalQuantity: 15,
      availableQuantity: 12,
      rentalDuration: 14,
      depositAmount: 500
    }
  ]);

  const [melUsers, setMELUsers] = useState<MELUser[]>([
    {
      id: '1',
      username: 'meluser1',
      password: 'mel123',
      fullName: 'राजेश पाटील',
      email: 'rajesh@example.com',
      createdAt: '2024-01-01'
    }
  ]);

  const [rentals, setRentals] = useState<Rental[]>([]);
  const [currentMELUser, setCurrentMELUser] = useState<MELUser | null>(null);

  const addEquipment = (newEquipment: Equipment) => {
    setEquipment(prev => [...prev, newEquipment]);
  };

  const updateEquipment = (updatedEquipment: Equipment) => {
    setEquipment(prev => prev.map(eq => eq.id === updatedEquipment.id ? updatedEquipment : eq));
  };

  const deleteEquipment = (id: string) => {
    setEquipment(prev => prev.filter(eq => eq.id !== id));
  };

  const addMELUser = (user: MELUser) => {
    setMELUsers(prev => [...prev, user]);
  };

  const deleteMELUser = (id: string) => {
    setMELUsers(prev => prev.filter(user => user.id !== id));
  };

  const addRental = (rental: Rental) => {
    // Reduce available quantity
    const equipmentItem = equipment.find(eq => eq.id === rental.equipmentId);
    if (equipmentItem && equipmentItem.availableQuantity > 0) {
      updateEquipment({
        ...equipmentItem,
        availableQuantity: equipmentItem.availableQuantity - 1
      });
      setRentals(prev => [...prev, rental]);
    }
  };

  const markEquipmentReturned = (rentalId: string) => {
    const rental = rentals.find(r => r.id === rentalId);
    if (rental) {
      // Increase available quantity
      const equipmentItem = equipment.find(eq => eq.id === rental.equipmentId);
      if (equipmentItem) {
        updateEquipment({
          ...equipmentItem,
          availableQuantity: equipmentItem.availableQuantity + 1
        });
      }
      
      setRentals(prev => prev.map(r => 
        r.id === rentalId 
          ? { ...r, status: 'returned' as const, actualReturnDate: new Date().toISOString() }
          : r
      ));
    }
  };

  const getOverdueRentals = () => {
    const currentDate = new Date();
    return rentals.filter(rental => {
      if (rental.status !== 'active') return false;
      const returnDate = new Date(rental.returnDate);
      return currentDate > returnDate;
    });
  };

  const getTotalEquipmentCount = () => {
    return equipment.reduce((total, eq) => total + eq.totalQuantity, 0);
  };

  const getAvailableEquipmentCount = () => {
    return equipment.reduce((total, eq) => total + eq.availableQuantity, 0);
  };

  return (
    <MELContext.Provider value={{
      equipment,
      setEquipment,
      melUsers,
      setMELUsers,
      rentals,
      setRentals,
      currentMELUser,
      setCurrentMELUser,
      addEquipment,
      updateEquipment,
      deleteEquipment,
      addMELUser,
      deleteMELUser,
      addRental,
      markEquipmentReturned,
      getOverdueRentals,
      getTotalEquipmentCount,
      getAvailableEquipmentCount
    }}>
      {children}
    </MELContext.Provider>
  );
};
