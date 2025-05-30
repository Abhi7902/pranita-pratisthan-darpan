import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  title: string;
  description: string;
  date: string;
  location: string;
  enabled: boolean;
  bannerImage?: string;
}

interface AppContextType {
  timelineEvents: TimelineEvent[];
  addTimelineEvent: (event: TimelineEvent) => void;
  newsItems: NewsItem[];
  addNewsItem: (news: NewsItem) => void;
  youtubeVideos: YouTubeVideo[];
  addYouTubeVideo: (video: YouTubeVideo) => void;
  programs: Program[];
  addProgram: (program: Program) => void;
  popupData: PopupData;
  setPopupData: (data: PopupData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      year: '2009',
      title: 'संस्थापना',
      description: 'प्रणिता प्रतिष्ठानची स्थापना समाजसेवेच्या उद्दिष्टाने करण्यात आली.',
      icon: 'Award',
      color: 'bg-marathi-orange'
    },
    {
      year: '2012',
      title: 'शिक्षण प्रकल्प',
      description: 'गरिब मुलांसाठी मोफत शिक्षण कार्यक्रम सुरू केला.',
      icon: 'Users',
      color: 'bg-blue-500'
    },
    {
      year: '2015',
      title: 'आरोग्य शिबिर',
      description: 'ग्रामीण भागात मोफत आरोग्य तपासणी शिबिरे आयोजित केली.',
      icon: 'Heart',
      color: 'bg-green-500'
    },
    {
      year: '2020',
      title: 'कोविड सहाय्य',
      description: 'महामारीदरम्यान अन्नधान्य आणि वैद्यकीय सहाय्य पुरवले.',
      icon: 'Heart',
      color: 'bg-red-500'
    },
    {
      year: '2024',
      title: 'डिजिटल सेवा',
      description: 'ऑनलाइन प्लॅटफॉर्मद्वारे सेवा पुरवण्याची सुरुवात.',
      icon: 'Award',
      color: 'bg-purple-500'
    }
  ]);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'नवीन शिक्षण केंद्र उघडणी',
      summary: 'आमच्या संस्थेकडून नवीन शिक्षण केंद्राची उघडणी करण्यात आली.',
      content: 'प्रणिता प्रतिष्ठानच्या वतीने गरिब मुलांसाठी एक नवीन शिक्षण केंद्र उघडण्यात आले आहे...',
      author: 'प्रशासन',
      date: '2024-01-15'
    }
  ]);

  const [youtubeVideos, setYouTubeVideos] = useState<YouTubeVideo[]>([
    {
      id: '1',
      title: 'संस्था परिचय',
      videoId: 'dQw4w9WgXcQ',
      description: 'प्रणिता प्रतिष्ठानच्या कार्याचा आढावा'
    }
  ]);

  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      name: 'शिक्षण सहाय्य कार्यक्रम',
      description: 'गरिब मुलांना मोफत शिक्षण पुरवणे',
      details: 'या कार्यक्रमांतर्गत आम्ही गरिब मुलांना पुस्तके, गणवेश आणि इतर शैक्षणिक साहित्य मोफत पुरवतो.',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'आरोग्य सेवा',
      description: 'ग्रामीण भागात आरोग्य सेवा पुरवणे',
      details: 'आरोग्य शिबिरे, मोफत औषधे आणि डॉक्टरांची तपासणी या सेवा आम्ही पुरवतो.',
      image: '/placeholder.svg'
    }
  ]);

  const [popupData, setPopupData] = useState<PopupData>({
    title: 'वार्षिक सभा 2024',
    description: 'प्रणिता प्रतिष्ठानची वार्षिक सभा 2024 मध्ये सर्व सदस्यांना सादर आमंत्रण.',
    date: '15 डिसेंबर 2024, दुपारी 3:00 वाजता',
    location: 'प्रणिता भवन, पुणे',
    enabled: true,
    bannerImage: ''
  });

  const addTimelineEvent = (event: TimelineEvent) => {
    setTimelineEvents(prev => [...prev, event]);
  };

  const addNewsItem = (news: NewsItem) => {
    setNewsItems(prev => [...prev, news]);
  };

  const addYouTubeVideo = (video: YouTubeVideo) => {
    setYouTubeVideos(prev => [...prev, video]);
  };

  const addProgram = (program: Program) => {
    setPrograms(prev => [...prev, program]);
  };

  return (
    <AppContext.Provider value={{
      timelineEvents,
      addTimelineEvent,
      newsItems,
      addNewsItem,
      youtubeVideos,
      addYouTubeVideo,
      programs,
      addProgram,
      popupData,
      setPopupData
    }}>
      {children}
    </AppContext.Provider>
  );
};
