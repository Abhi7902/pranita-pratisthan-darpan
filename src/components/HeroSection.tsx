import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSupabaseMEL } from '@/contexts/SupabaseMELContext';

const HeroSection = () => {
  const { popup, fetchPopup } = useSupabaseMEL();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchPopup();
    // Show popup after short delay if enabled
    if (popup?.enabled && popup?.title) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [popup?.enabled, popup?.title]);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero.png')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="heading-cultural text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow">
              प्रणिता प्रतिष्ठान
            </h1>
            <p className="text-cultural text-xl md:text-2xl lg:text-3xl mb-4 text-shadow">
              समाजसेवा • संस्कृती • विकास
            </p>
            <p className="text-cultural text-base md:text-lg text-orange-100">
              सेवा ही आमची शक्ती, संस्कृती आमचा अभिमान
            </p>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && popup?.enabled && popup.title && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full relative shadow-xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-orange-600 z-10 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>
            {popup.banner_image_url && (
              <div className="w-full flex justify-center">
                <img
                  src={popup.banner_image_url}
                  alt="Banner"
                  className="rounded-t-2xl object-contain"
                  style={{
                    maxHeight: 220,
                    maxWidth: '100%',
                    width: 'auto',
                    height: 'auto',
                    aspectRatio: 'auto'
                  }}
                />
              </div>
            )}
            <div className="p-8">
              <div className="text-center">
                {!popup.banner_image_url && (
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-3xl">🎉</span>
                  </div>
                )}
                <h3 className="heading-cultural text-2xl md:text-3xl font-bold text-orange-600 mb-4">
                  {popup.title}
                </h3>
                <p className="text-cultural text-gray-700 mb-4 leading-relaxed">
                  {popup.description}
                </p>
                {(popup.date || popup.location) && (
                  <div className="bg-orange-50 rounded-lg p-3 mb-6">
                    <p className="text-sm text-orange-800 font-medium">
                      {popup.date ? <>📅 {popup.date} </> : null}
                      {popup.location ? <>• 📍 {popup.location}</> : null}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
