
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DynamicTimeline from '@/components/dynamic/DynamicTimeline';
import DynamicPhotoGallery from '@/components/dynamic/DynamicPhotoGallery';
import DynamicNewsSection from '@/components/dynamic/DynamicNewsSection';
import DynamicYouTubeSection from '@/components/dynamic/DynamicYouTubeSection';
import DynamicFeedbackForm from '@/components/dynamic/DynamicFeedbackForm';
import UnifiedAdminPanel from '@/components/UnifiedAdminPanel';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (section: string) => {
    if (section === 'admin') {
      if (!user) {
        navigate('/login');
        return;
      }
    }
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <HeroSection />
            <DynamicTimeline />
          </>
        );
      case 'about':
        return <AboutSection />;
      case 'gallery':
        return <DynamicPhotoGallery />;
      case 'news':
        return <DynamicNewsSection />;
      case 'youtube':
        return <DynamicYouTubeSection />;
      case 'admin':
        return <UnifiedAdminPanel />;
      default:
        return (
          <>
            <HeroSection />
            <DynamicTimeline />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main className="pt-12">
        {renderSection()}
        
        {/* Only show feedback form on home page */}
        {activeSection === 'home' && <DynamicFeedbackForm />}
      </main>

      {/* Always show footer except on admin page */}
      {activeSection !== 'admin' && <Footer />}
    </div>
  );
};

export default Index;
