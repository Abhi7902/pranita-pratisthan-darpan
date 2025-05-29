
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
}

interface AppContextType {
  timelineEvents: TimelineEvent[];
  setTimelineEvents: (events: TimelineEvent[]) => void;
  newsItems: NewsItem[];
  setNewsItems: (news: NewsItem[]) => void;
  youtubeVideos: YouTubeVideo[];
  setYoutubeVideos: (videos: YouTubeVideo[]) => void;
  programs: Program[];
  setPrograms: (programs: Program[]) => void;
  popupData: PopupData;
  setPopupData: (popup: PopupData) => void;
  addTimelineEvent: (event: TimelineEvent) => void;
  addNewsItem: (news: NewsItem) => void;
  addYouTubeVideo: (video: YouTubeVideo) => void;
  addProgram: (program: Program) => void;
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
      year: '2020',
      title: 'संस्था स्थापना',
      description: 'प्रणिता प्रतिष्ठानची स्थापना समाजसेवेच्या उद्देशाने',
      icon: 'Users',
      color: 'bg-marathi-orange'
    },
    {
      year: '2021', 
      title: 'शिक्षण सेवा सुरुवात',
      description: 'गरीब मुलांसाठी मोफत शिक्षण कार्यक्रम सुरू केला',
      icon: 'Award',
      color: 'bg-marathi-gold'
    },
    {
      year: '2022',
      title: 'आरोग्य शिबिर',
      description: 'गावोगावी मोफत आरोग्य तपासणी शिबिरे आयोजित केली',
      icon: 'Heart',
      color: 'bg-marathi-green'
    }
  ]);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      name: 'शिक्षण सेवा',
      description: 'गरीब मुलांसाठी मोफत शिक्षण सुविधा',
      details: 'आमची शिक्षण सेवा कार्यक्रमाअंतर्गत आम्ही गरीब आणि वंचित वर्गातील मुलांना मोफत शिक्षण पुरवितो. यामध्ये पुस्तके, गणवेश, शिष्यवृत्ती आणि शिक्षकांची व्यवस्था समाविष्ट आहे.'
    },
    {
      id: '2',
      name: 'आरोग्य सेवा',
      description: 'मोफत आरोग्य तपासणी आणि उपचार',
      details: 'आरोग्य सेवा कार्यक्रमाअंतर्गत आम्ही नियमित आरोग्य शिबिरे आयोजित करतो. यामध्ये मोफत तपासणी, औषधे आणि डॉक्टरांचा सल्ला समाविष्ट आहे.'
    },
    {
      id: '3',
      name: 'महिला सक्षमीकरण',
      description: 'महिलांसाठी स्वयंरोजगार आणि कौशल्य विकास',
      details: 'महिला सक्षमीकरण कार्यक्रमाअंतर्गत आम्ही महिलांना विविध हस्तकला, शिवणकाम आणि व्यवसायिक कौशल्यांचे प्रशिक्षण देतो.'
    }
  ]);

  const [popupData, setPopupData] = useState<PopupData>({
    title: 'आगामी कार्यक्रम',
    description: '"वार्षिक समाजसेवा दिन" - 15 जानेवारी 2024',
    date: '15 जानेवारी 2024',
    location: 'कॉम्युनिटी हॉल येथे'
  });

  const addTimelineEvent = (event: TimelineEvent) => {
    setTimelineEvents(prev => [...prev, event]);
  };

  const addNewsItem = (news: NewsItem) => {
    setNewsItems(prev => [...prev, news]);
  };

  const addYouTubeVideo = (video: YouTubeVideo) => {
    setYoutubeVideos(prev => [...prev, video]);
  };

  const addProgram = (program: Program) => {
    setPrograms(prev => [...prev, program]);
  };

  return (
    <AppContext.Provider value={{
      timelineEvents,
      setTimelineEvents,
      newsItems,
      setNewsItems,
      youtubeVideos,
      setYoutubeVideos,
      programs,
      setPrograms,
      popupData,
      setPopupData,
      addTimelineEvent,
      addNewsItem,
      addYouTubeVideo,
      addProgram
    }}>
      {children}
    </AppContext.Provider>
  );
};
