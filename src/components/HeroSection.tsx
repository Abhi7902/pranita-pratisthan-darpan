
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
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <div className="mb-8 flex justify-center">
              {/* <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                <Heart className="h-10 w-10 text-white" />
              </div> */}
            </div>

            <h1 className="heading-cultural text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow">
              प्रणिता प्रतिष्ठान
            </h1>
            
            <p className="text-cultural text-xl md:text-2xl lg:text-3xl mb-4 text-shadow">
              समाजसेवा • संस्कृती • विकास
            </p>
            <p className="text-cultural text-base md:text-lg text-orange-100">
              सेवा ही आमची शक्ती, संस्कृती आमचा अभिमान
            </p>
            
            {/* <div className="mt-8">
              <Button 
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/30 text-white px-8 py-3 text-lg font-semibold rounded-full"
              >
                आमच्याबरोबर जुडा
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Organization Banner
      <div className="absolute bottom-0 left-0 right-0 linear-gradient bg-gradient-to-br from-orange-400 to-yellow-400 backdrop-blur-sm border-t py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <h2 className="heading-cultural text-lg md:text-xl font-bold text-orange-600 mb-1">
              प्रणिता प्रतिष्ठान
            </h2>
            <p className="text-cultural text-sm text-orange-800">
              समाजसेवेसाठी समर्पित • सेवा आमचा धर्म
            </p>
          </div>
        </div>
      </div> */}

      {/* Event Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full relative shadow-xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-orange-600 z-10 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Banner Image */}
            {popupData.bannerImage && (
              <div className="w-full h-48 bg-cover bg-center rounded-t-2xl" 
                   style={{ backgroundImage: `url(${popupData.bannerImage})` }}>
                <div className="w-full h-full bg-gradient-to-t from-black/30 to-transparent rounded-t-2xl"></div>
              </div>
            )}
            
            <div className="p-8">
              <div className="text-center">
                {!popupData.bannerImage && (
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">🎉</span>
                  </div>
                )}
                <h3 className="heading-cultural text-2xl md:text-3xl font-bold text-orange-600 mb-4">
                  {popupData.title}
                </h3>
                <p className="text-cultural text-gray-700 mb-4 leading-relaxed">
                  {popupData.description}
                </p>
                <div className="bg-orange-50 rounded-lg p-3 mb-6">
                  <p className="text-sm text-orange-800 font-medium">
                    📅 {popupData.date} • 📍 {popupData.location}
                  </p>
                </div>
                <Button 
                  onClick={() => setShowPopup(false)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full"
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
