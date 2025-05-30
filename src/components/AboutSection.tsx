import React from 'react';
import { useMELContext } from '@/contexts/MELContext';

const AboutSection = () => {
  const { getTotalEquipmentCount, getAvailableEquipmentCount } = useMELContext();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-marathi-orange mb-4">
            संस्था माहिती
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            प्रणिता प्रतिष्ठान ही एक गैर-सरकारी संस्था आहे जी समाजसेवा, शिक्षण, आरोग्य आणि सांस्कृतिक विकासाच्या क्षेत्रात काम करते
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              आमचे ध्येय
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              समाजातील वंचित वर्गाच्या शिक्षण, आरोग्य आणि सामाजिक विकासासाठी काम करणे. 
              प्रत्येक व्यक्तीला समान संधी मिळावी आणि समाजात सकारात्मक बदल घडवून आणावा हा आमचा मुख्य उद्देश आहे.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 saffron-gradient rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">गरीब मुलांसाठी मोफत शिक्षण</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 saffron-gradient rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">आरोग्य सेवा आणि जागरूकता</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 saffron-gradient rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">महिला सक्षमीकरण</span>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 saffron-gradient rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">सांस्कृतिक कार्यक्रम</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="समाजसेवा कार्य" 
              className="rounded-lg cultural-shadow w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-marathi-orange text-white p-4 rounded-lg cultural-shadow">
              <div className="text-center">
                <div className="text-2xl font-bold">2020</div>
                <div className="text-sm">स्थापना वर्ष</div>
              </div>
            </div>
          </div>
        </div>

        {/* MEL Equipment Summary */}
        <div className="bg-blue-50 rounded-lg p-6 mb-16">
          <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            Medical Equipment Library (MEL)
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">{getTotalEquipmentCount()}</div>
              <div className="text-sm text-gray-600">Total Equipment</div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600">{getAvailableEquipmentCount()}</div>
              <div className="text-sm text-gray-600">Available Equipment</div>
            </div>
          </div>
          <p className="text-center text-blue-700 mt-4 text-sm">
            Medical equipment rental service for community members
          </p>
        </div>

        {/* Organization Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-marathi-orange rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl text-white">👨‍💼</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">श्री. मिलिंद धर्माधिकारी</h4>
            <p className="text-marathi-orange font-medium">अध्यक्ष</p>
            <p className="text-gray-600 mt-2">संस्थेचे नेतृत्व आणि मार्गदर्शन</p>
          </div>
          <div className="text-center">
            <div className="w-32 h-32 bg-marathi-gold rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl text-white">📝</span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">श्री. भानुदास पाटील</h4>
            <p className="text-marathi-orange font-medium">सचिव</p>
            <p className="text-gray-600 mt-2">प्रशासकीय कामकाज आणि समन्वय</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">संपर्क माहिती</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-marathi-orange rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-xl">📍</span>
              </div>
              <h4 className="font-medium text-gray-900">पत्ता</h4>
              <p className="text-gray-600">मुख्य कार्यालय, महाराष्ट्र</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-marathi-orange rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-xl">📞</span>
              </div>
              <h4 className="font-medium text-gray-900">फोन</h4>
              <p className="text-gray-600">+91 12345 67890</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-marathi-orange rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-xl">✉️</span>
              </div>
              <h4 className="font-medium text-gray-900">ईमेल</h4>
              <p className="text-gray-600">info@pranitapratisthan.org</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
