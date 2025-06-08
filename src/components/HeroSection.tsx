
import { useState, useEffect } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const HeroSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { popupData } = useAppContext();

  useEffect(() => {
    // Only show popup if enabled and has content
    if (popupData.enabled && popupData.title) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [popupData]);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pattern-cultural opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 saffron-gradient rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 cultural-gradient rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat pt-12"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 102, 0, 0.6), rgba(255, 215, 0, 0.4), rgba(19, 136, 8, 0.5)), url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        {/* Cultural Border Pattern */}
        <div className="absolute top-0 left-0 right-0 h-2 cultural-gradient"></div>
        
        <div className="absolute inset-0 flex items-center justify-center pt-20 pb-20">
          <div className="text-center text-white animate-fade-in max-w-4xl mx-auto px-6">
            {/* Decorative Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 saffron-gradient rounded-full flex items-center justify-center animate-glow">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-300 animate-bounce-subtle" />
              </div>
            </div>

            <h1 className="heading-cultural text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow-cultural animate-scale-in">
              प्रणिता प्रतिष्ठान
            </h1>
            
            <div className="relative mb-8">
              <p className="text-cultural text-xl md:text-2xl lg:text-3xl mb-4 text-shadow animate-fade-in" style={{ animationDelay: '0.5s' }}>
                समाजसेवा • संस्कृती • विकास
              </p>
              <p className="text-cultural text-base md:text-lg text-orange-100 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                सेवा ही आमची शक्ती, संस्कृती आमचा अभिमान
              </p>
            </div>
            
            <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="w-32 h-1 saffron-gradient rounded-full"></div>
            </div>

            {/* Call to Action */}
            <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <Button 
                className="glass-cultural hover-lift border-2 border-orange-200 text-marathi-orange hover:text-white hover:bg-marathi-orange px-8 py-3 text-lg font-semibold rounded-full cultural-shadow-lg"
              >
                आमच्याबरोबर जुडा
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6600" />
                <stop offset="50%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#138808" />
              </linearGradient>
            </defs>
            <path d="M0,60 C300,90 900,30 1200,60 L1200,120 L0,120 Z" fill="url(#waveGradient)" opacity="0.8"></path>
          </svg>
        </div>
      </div>

      {/* Organization Banner - Enhanced */}
      <div className="absolute bottom-0 left-0 right-0 z-30 glass-cultural border-t-2 border-orange-200 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <h2 className="heading-cultural text-lg md:text-xl font-bold text-marathi-orange mb-1">
              प्रणिता प्रतिष्ठान
            </h2>
            <p className="text-cultural text-sm text-marathi-deepOrange">
              समाजसेवेसाठी समर्पित • सेवा आमचा धर्म
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Event Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-cultural rounded-2xl max-w-md w-full relative animate-scale-in cultural-shadow-xl border-2 border-orange-100">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-marathi-orange z-10 w-8 h-8 rounded-full glass-effect flex items-center justify-center hover-lift"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Banner Image */}
            {popupData.bannerImage && (
              <div className="w-full h-48 bg-cover bg-center rounded-t-2xl border-b-2 border-orange-100" 
                   style={{ backgroundImage: `url(${popupData.bannerImage})` }}>
                <div className="w-full h-full bg-gradient-to-t from-black/30 to-transparent rounded-t-2xl"></div>
              </div>
            )}
            
            <div className="p-8">
              <div className="text-center">
                {!popupData.bannerImage && (
                  <div className="w-20 h-20 saffron-gradient rounded-full mx-auto mb-6 flex items-center justify-center animate-glow">
                    <span className="text-3xl">🎉</span>
                  </div>
                )}
                <h3 className="heading-cultural text-2xl md:text-3xl font-bold text-marathi-orange mb-4">
                  {popupData.title}
                </h3>
                <p className="text-cultural text-gray-700 mb-4 leading-relaxed">
                  {popupData.description}
                </p>
                <div className="bg-orange-50 rounded-lg p-3 mb-6 border border-orange-100">
                  <p className="text-sm text-marathi-deepOrange font-medium">
                    📅 {popupData.date} • 📍 {popupData.location}
                  </p>
                </div>
                <Button 
                  onClick={() => setShowPopup(false)}
                  className="bg-marathi-orange hover:bg-marathi-deepOrange text-white px-8 py-3 rounded-full cultural-shadow hover-lift"
                >
                  अधिक माहिती
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
