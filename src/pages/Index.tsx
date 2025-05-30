
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Timeline from '@/components/Timeline';
import PhotoGallery from '@/components/PhotoGallery';
import NewsSection from '@/components/NewsSection';
import YouTubeSection from '@/components/YouTubeSection';
import FeedbackForm from '@/components/FeedbackForm';
import UnifiedAdminPanel from '@/components/UnifiedAdminPanel';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <HeroSection />
            <Timeline />
          </>
        );
      case 'about':
        return <AboutSection />;
      case 'gallery':
        return <PhotoGallery />;
      case 'news':
        return <NewsSection />;
      case 'youtube':
        return <YouTubeSection />;
      case 'admin':
        return <UnifiedAdminPanel />;
      default:
        return (
          <>
            <HeroSection />
            <Timeline />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
      
      <main className="pt-12">
        {renderSection()}
        
        {/* Only show feedback form on home page */}
        {activeSection === 'home' && <FeedbackForm />}
      </main>

      {/* Always show footer except on admin page */}
      {activeSection !== 'admin' && <Footer />}
    </div>
  );
};

export default Index;
