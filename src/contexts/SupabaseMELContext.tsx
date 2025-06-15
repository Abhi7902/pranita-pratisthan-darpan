import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface Equipment {
  id: string;
  name: string;
  photo_url: string;
  total_quantity: number;
  available_quantity: number;
  rental_duration: number;
  deposit_amount: number;
}

interface MELUser {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  email: string;
  created_at: string;
}

interface Rental {
  id: string;
  equipment_id: string;
  equipment_name: string;
  patient_name: string;
  mobile_number: string;
  pickup_date: string;
  return_date: string;
  status: string;
  created_by_user_id: string;
}

interface PresidentSecretary {
  id: string;
  name: string;
  role: string; // 'president' or 'secretary'
  message: string | null;
  photo_url: string | null;
}

interface PopupEvent {
  id: string;
  enabled: boolean;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  banner_image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface SupabaseMELContextType {
  equipment: Equipment[];
  melUsers: MELUser[];
  rentals: Rental[];
  currentMELUser: MELUser | null;
  president: PresidentSecretary | null;
  secretary: PresidentSecretary | null;
  loading: boolean;
  popup: PopupEvent | null;
  fetchPopup: () => Promise<void>;
  updatePopup: (data: Partial<PopupEvent> & { id?: string; banner_file?: File | null }) => Promise<void>;
  addEquipment: (equipment: Omit<Equipment, 'id'>) => Promise<void>;
  updateEquipment: (id: string, updates: Partial<Equipment>) => Promise<void>;
  deleteEquipment: (id: string) => Promise<void>;
  deleteMELUser: (id: string) => Promise<void>;
  addRental: (rental: Omit<Rental, 'id'>) => Promise<void>;
  updateRental: (id: string, updates: Partial<Rental>) => Promise<void>;
  getOverdueRentals: () => Rental[];
  setCurrentMELUser: (user: MELUser | null) => void;
  refreshData: () => Promise<void>;
  updatePresidentSecretary: (
    updates: Omit<PresidentSecretary, 'id'> & { id?: string }
  ) => Promise<void>;
  fetchPresidentAndSecretary: () => Promise<void>;
}

const SupabaseMELContext = createContext<SupabaseMELContextType | undefined>(undefined);

export const useSupabaseMEL = () => {
  const context = useContext(SupabaseMELContext);
  if (!context) {
    throw new Error('useSupabaseMEL must be used within a SupabaseMELProvider');
  }
  return context;
};

export const SupabaseMELProvider = ({ children }: { children: ReactNode }) => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [melUsers, setMELUsers] = useState<MELUser[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [currentMELUser, setCurrentMELUser] = useState<MELUser | null>(null);
  const [president, setPresident] = useState<PresidentSecretary | null>(null);
  const [secretary, setSecretary] = useState<PresidentSecretary | null>(null);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState<PopupEvent | null>(null);
  const { user, isMELUser } = useAuth();

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from('equipment_inventory')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setEquipment(data || []);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      toast.error('Failed to load equipment');
    }
  };

  const fetchMELUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('mel_users')
        .select('*')
        .order('full_name');
      
      if (error) throw error;
      setMELUsers(data || []);
    } catch (error) {
      console.error('Error fetching MEL users:', error);
      toast.error('Failed to load MEL users');
    }
  };

  const fetchRentals = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_history')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRentals(data || []);
    } catch (error) {
      console.error('Error fetching rentals:', error);
      toast.error('Failed to load rental history');
    }
  };

  const fetchCurrentMELUser = async () => {
    if (!user || !isMELUser) return;
    
    try {
      const { data, error } = await supabase
        .from('mel_users')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      setCurrentMELUser(data);
    } catch (error) {
      console.error('Error fetching current MEL user:', error);
    }
  };

  const fetchPresidentAndSecretary = async () => {
    try {
      const { data, error } = await supabase
        .from('president_secretary')
        .select('*')
        .in('role', ['president', 'secretary'])
        .order('updated_at', { ascending: false });

      if (error) throw error;
      if (Array.isArray(data)) {
        const pres = data.find((r) => r.role === 'president') || null;
        const sec = data.find((r) => r.role === 'secretary') || null;
        setPresident(pres);
        setSecretary(sec);
      } else {
        setPresident(null);
        setSecretary(null);
      }
    } catch (error) {
      console.error('Error fetching president/secretary:', error);
      toast.error('Failed to load president/secretary info');
      setPresident(null);
      setSecretary(null);
    }
  };

  const fetchPopup = async () => {
    try {
      const { data, error } = await supabase
        .from('popup_events')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      setPopup(data || null);
    } catch (error) {
      console.error('Error fetching popup:', error);
      toast.error('Failed to fetch popup');
      setPopup(null);
    }
  };

  const updatePopup = async (changes: Partial<PopupEvent> & { id?: string; banner_file?: File | null }) => {
    try {
      let bannerUrl: string | null | undefined = changes.banner_image_url;
      let bannerPath: string | null | undefined = undefined;

      if (changes.banner_file) {
        const file = changes.banner_file;
        const ext = file.name.split('.').pop();
        const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const storageRes = await supabase.storage
          .from('popup')
          .upload(`banners/${filename}`, file, { upsert: true });
        if (storageRes.error) throw storageRes.error;
        const { data: { publicUrl } } = supabase.storage.from('popup').getPublicUrl(`banners/${filename}`);
        bannerUrl = publicUrl;
        bannerPath = `banners/${filename}`;
      }

      // Find if popup already exists
      let popupId = changes.id;
      if (!popupId && popup) popupId = popup.id;
      let payload: any = {
        enabled: changes.enabled ?? popup?.enabled ?? false,
        title: changes.title ?? popup?.title ?? '',
        description: changes.description ?? popup?.description ?? '',
        date: changes.date ?? popup?.date ?? '',
        location: changes.location ?? popup?.location ?? '',
        updated_at: new Date().toISOString(),
      };
      if (bannerUrl !== undefined) {
        payload.banner_image_url = bannerUrl;
        payload.banner_image_path = bannerPath;
      }

      if (popupId) {
        const { error } = await supabase
          .from('popup_events')
          .update(payload)
          .eq('id', popupId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('popup_events')
          .insert([payload]);
        if (error) throw error;
      }
      toast.success('Popup updated!');
      await fetchPopup();
    } catch (error) {
      console.error('Error updating popup:', error);
      toast.error('Failed to update popup');
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchEquipment(),
      fetchMELUsers(),
      fetchRentals(),
      fetchCurrentMELUser(),
      fetchPresidentAndSecretary(),
      fetchPopup(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, [user, isMELUser]);

  const addEquipment = async (equipmentData: Omit<Equipment, 'id'>) => {
    try {
      const { error } = await supabase
        .from('equipment_inventory')
        .insert([equipmentData]);
      
      if (error) throw error;
      
      toast.success('Equipment added successfully!');
      await fetchEquipment();
    } catch (error) {
      console.error('Error adding equipment:', error);
      toast.error('Failed to add equipment');
      throw error;
    }
  };

  const updateEquipment = async (id: string, updates: Partial<Equipment>) => {
    try {
      const { error } = await supabase
        .from('equipment_inventory')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Equipment updated successfully!');
      await fetchEquipment();
    } catch (error) {
      console.error('Error updating equipment:', error);
      toast.error('Failed to update equipment');
      throw error;
    }
  };

  const deleteEquipment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('equipment_inventory')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Equipment deleted successfully!');
      await fetchEquipment();
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast.error('Failed to delete equipment');
      throw error;
    }
  };

  const deleteMELUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('mel_users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('MEL user deleted successfully!');
      await fetchMELUsers();
    } catch (error) {
      console.error('Error deleting MEL user:', error);
      toast.error('Failed to delete MEL user');
      throw error;
    }
  };

  const addRental = async (rentalData: Omit<Rental, 'id'>) => {
    try {
      const { error } = await supabase
        .from('patient_history')
        .insert([rentalData]);
      
      if (error) throw error;
      
      toast.success('Rental added successfully!');
      await fetchRentals();
    } catch (error) {
      console.error('Error adding rental:', error);
      toast.error('Failed to add rental');
      throw error;
    }
  };

  const updateRental = async (id: string, updates: Partial<Rental>) => {
    try {
      const { error } = await supabase
        .from('patient_history')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Rental updated successfully!');
      await fetchRentals();
    } catch (error) {
      console.error('Error updating rental:', error);
      toast.error('Failed to update rental');
      throw error;
    }
  };

  const getOverdueRentals = () => {
    const today = new Date();
    return rentals.filter(rental => 
      rental.status === 'rented' && new Date(rental.return_date) < today
    );
  };

  const updatePresidentSecretary = async (
    updates: Omit<PresidentSecretary, 'id'> & { id?: string }
  ) => {
    try {
      // Only allow update/insert for 'president' or 'secretary'
      if (!['president', 'secretary'].includes(updates.role)) throw new Error('Invalid role');
      // Find the existing record for that role if present
      const { data: existingArr, error: selError } = await supabase
        .from('president_secretary')
        .select('*')
        .eq('role', updates.role)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (selError) throw selError;

      if (existingArr && existingArr.length > 0) {
        // update existing entry
        const id = existingArr[0].id;
        const { error } = await supabase
          .from('president_secretary')
          .update({
            name: updates.name,
            message: updates.message,
            photo_url: updates.photo_url,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id);

        if (error) throw error;
        toast.success(`Updated ${updates.role}`);
      } else {
        // Insert new entry
        const { error } = await supabase
          .from('president_secretary')
          .insert([
            {
              name: updates.name,
              role: updates.role,
              message: updates.message,
              photo_url: updates.photo_url,
              updated_at: new Date().toISOString(),
            },
          ]);
        if (error) throw error;
        toast.success(`Added ${updates.role}`);
      }
      await fetchPresidentAndSecretary();
    } catch (error) {
      console.error('Error updating president/secretary:', error);
      toast.error('Failed to update president/secretary');
      throw error;
    }
  };

  const fetchPresidentAndSecretary = async () => {
    try {
      const { data, error } = await supabase
        .from('president_secretary')
        .select('*')
        .in('role', ['president', 'secretary'])
        .order('updated_at', { ascending: false });

      if (error) throw error;
      if (Array.isArray(data)) {
        const pres = data.find((r) => r.role === 'president') || null;
        const sec = data.find((r) => r.role === 'secretary') || null;
        setPresident(pres);
        setSecretary(sec);
      } else {
        setPresident(null);
        setSecretary(null);
      }
    } catch (error) {
      console.error('Error fetching president/secretary:', error);
      toast.error('Failed to load president/secretary info');
      setPresident(null);
      setSecretary(null);
    }
  };

  const value = {
    equipment,
    melUsers,
    rentals,
    currentMELUser,
    president,
    secretary,
    loading,
    popup,
    fetchPopup,
    updatePopup,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    deleteMELUser,
    addRental,
    updateRental,
    getOverdueRentals,
    setCurrentMELUser,
    refreshData,
    updatePresidentSecretary,
  };

  return (
    <SupabaseMELContext.Provider value={value}>
      {children}
    </SupabaseMELContext.Provider>
  );
};
