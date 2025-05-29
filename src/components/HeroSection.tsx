
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Organization name banner - top */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-marathi-orange text-white py-3 px-4">
        <h2 className="text-lg font-bold text-center">प्रणिता प्रतिष्ठान</h2>
      </div>

      {/* Hero Section */}
      <div 
        className="h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pt-20 pb-20">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-shadow">
              प्रणिता प्रतिष्ठान
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-shadow">
              समाजसेवा • संस्कृती • विकास
            </p>
            <div className="w-32 h-1 saffron-gradient mx-auto"></div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-16 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Organization name banner - bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-marathi-orange text-white py-3 px-4">
        <h2 className="text-lg font-bold text-center">प्रणिता प्रतिष्ठान - समाजसेवेसाठी समर्पित</h2>
      </div>

      {/* Event Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-fade-in cultural-shadow">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 saffron-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold text-marathi-orange mb-4">
                आगामी कार्यक्रम
              </h3>
              <p className="text-gray-700 mb-4">
                "वार्षिक समाजसेवा दिन" - 15 जानेवारी 2024
              </p>
              <p className="text-sm text-gray-600 mb-6">
                सकाळी 10 वाजता, कॉम्युनिटी हॉल येथे
              </p>
              <Button 
                onClick={() => setShowPopup(false)}
                className="bg-marathi-orange hover:bg-marathi-deepOrange text-white"
              >
                अधिक माहिती
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
