import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
}

interface YouTubeVideo {
  id: string;
  title: string;
  videoId: string;
  description: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  details: string;
  image?: string;
}

interface PopupData {
  enabled: boolean;
  title: string;
  description: string;
  date: string;
  location: string;
  bannerImage?: string;
}

interface MELUser {
  id: string;
  fullName: string;
  username: string;
  role: 'user' | 'admin';
}

interface MELRental {
  id: string;
  equipmentId: string;
  equipmentName: string;
  patientName: string;
  mobileNumber: string;
  rentalDate: number;
  returnDate: number;
  userId: string;
}

interface Feedback {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  rating: number;
  feedback: string;
  suggestion: string;
  date: string;
  isRead: boolean;
}

interface OrganizationInfo {
  president: {
    name: string;
    photo?: string;
    message: string;
  };
  secretary: {
    name: string;
    photo?: string;
    message: string;
  };
}

interface AppContextType {
  timelineEvents: TimelineEvent[];
  addTimelineEvent: (event: TimelineEvent) => void;
  newsItems: NewsItem[];
  addNewsItem: (item: NewsItem) => void;
  youtubeVideos: YouTubeVideo[];
  addYouTubeVideo: (video: YouTubeVideo) => void;
  programs: Program[];
  addProgram: (program: Program) => Promise<void>;
  popupData: PopupData;
  setPopupData: (data: PopupData) => void;
  currentMELUser: MELUser | null;
  setCurrentMELUser: (user: MELUser | null) => void;
  melRentals: MELRental[];
  addMELRental: (rental: MELRental) => void;
  updateMELRental: (rental: MELRental) => void;
  deleteMELRental: (id: string) => void;
  getOverdueRentals: () => MELRental[];
  feedbackList: Feedback[];
  addFeedback: (feedback: Feedback) => void;
  markFeedbackAsRead: (id: string) => void;
  organizationInfo: OrganizationInfo;
  updateOrganizationInfo: (info: OrganizationInfo) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [youtubeVideos, setYouTubeVideos] = useState<YouTubeVideo[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [popupData, setPopupData] = useState<PopupData>({
    enabled: false,
    title: '',
    description: '',
    date: '',
    location: '',
  });
  const [currentMELUser, setCurrentMELUser] = useState<MELUser | null>(null);
  const [melRentals, setMelRentals] = useState<MELRental[]>([]);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  
  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo>({
    president: {
      name: 'श्री. राज पाटील',
      message: 'समाजसेवेच्या क्षेत्रात अग्रणी असलेल्या प्रणिता प्रतिष्ठानच्या अध्यक्षपदी कार्यरत आहेत. त्यांच्या नेतृत्वाखाली संस्थेने अनेक महत्वाचे प्रकल्प राबवले आहेत.'
    },
    secretary: {
      name: 'सौ. प्रिया शर्मा',
      message: 'संस्थेच्या दैनंदिन कामकाजाची जबाबदारी सांभाळणाऱ्या सचिव म्हणून कार्यरत आहेत. त्यांच्या कुशल व्यवस्थापनामुळे संस्थेची कार्ये सुरळीतपणे चालतात.'
    }
  });

  // --- PROGRAMS FETCH FROM SUPABASE ---
  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, description, details, image_url');
    if (error) {
      console.error("Error fetching projects from Supabase:", error.message);
      return;
    }
    // Convert to Program[] and add 'image' alias if needed
    setPrograms(
      data.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        details: p.details,
        image: p.image_url || undefined,
      }))
    );
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // When a new program is added, insert to Supabase and refresh
  const addProgram = async (program: Program) => {
    const { error } = await supabase
      .from('projects')
      .insert([
        {
          name: program.name,
          description: program.description,
          details: program.details,
          image_url: program.image || null,
        }
      ]);
    if (error) {
      console.error("Error adding program:", error.message);
      return;
    }
    await fetchPrograms();
  };

  const addTimelineEvent = (event: TimelineEvent) => {
    setTimelineEvents((prevEvents) => [...prevEvents, event]);
  };

  const addNewsItem = (item: NewsItem) => {
    setNewsItems((prevItems) => [...prevItems, item]);
  };

  const addYouTubeVideo = (video: YouTubeVideo) => {
    setYouTubeVideos((prevVideos) => [...prevVideos, video]);
  };

  const addMELRental = (rental: MELRental) => {
    setMelRentals(prev => [...prev, rental]);
  };

  const updateMELRental = (rental: MELRental) => {
    setMelRentals(prev => prev.map(r => r.id === rental.id ? rental : r));
  };

  const deleteMELRental = (id: string) => {
    setMelRentals(prev => prev.filter(r => r.id !== id));
  };

  const getOverdueRentals = () => {
    const today = new Date().getTime();
    return melRentals.filter(rental => rental.returnDate < today);
  };

  const addFeedback = (feedback: Feedback) => {
    setFeedbackList(prev => [feedback, ...prev]);
  };

  const markFeedbackAsRead = (id: string) => {
    setFeedbackList(prev => 
      prev.map(feedback => 
        feedback.id === id ? { ...feedback, isRead: true } : feedback
      )
    );
  };

  const updateOrganizationInfo = (info: OrganizationInfo) => {
    setOrganizationInfo(info);
  };

  return (
    <AppContext.Provider
      value={{
        timelineEvents,
        addTimelineEvent,
        newsItems,
        addNewsItem,
        youtubeVideos,
        addYouTubeVideo,
        programs,
        addProgram,
        popupData,
        setPopupData,
        currentMELUser,
        setCurrentMELUser,
        melRentals,
        addMELRental,
        updateMELRental,
        deleteMELRental,
        getOverdueRentals,
        feedbackList,
        addFeedback,
        markFeedbackAsRead,
        organizationInfo,
        updateOrganizationInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
