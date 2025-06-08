
import { MapPin, Phone, Mail, Facebook, Youtube, Heart, Star } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = sectionId;
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
          <defs>
            <linearGradient id="footerWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6600" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#138808" />
            </linearGradient>
          </defs>
          <path d="M0,60 C300,30 900,90 1200,60 L1200,0 L0,0 Z" fill="url(#footerWaveGradient)" opacity="0.8"></path>
        </svg>
      </div>

      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24 pb-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 pattern-cultural opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Organization Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 saffron-gradient rounded-full flex items-center justify-center cultural-shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="heading-cultural text-2xl lg:text-3xl font-bold text-marathi-orange mb-2">
                    प्रणिता प्रतिष्ठान
                  </h3>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <p className="text-yellow-200 text-sm">समाजसेवेसाठी समर्पित</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-effect rounded-2xl p-6 mb-6 border border-orange-200">
                <p className="text-cultural text-gray-300 mb-4 leading-relaxed">
                  समाजसेवा, संस्कृती आणि विकासाच्या क्षेत्रात काम करणारी एक प्रतिष्ठित संस्था. 
                  आमचे उद्दिष्ट समाजातील प्रत्येक व्यक्तीच्या जीवनात सकारात्मक बदल घडवून आणणे आहे.
                </p>
                <div className="w-24 h-1 saffron-gradient rounded-full"></div>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="group">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 cultural-shadow hover-lift">
                    <Facebook className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                </a>
                <a href="https://youtube.com/@pranitapratishthan123?si=lCg-3n8B87s6IC5Y" className="group">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-all duration-300 cultural-shadow hover-lift">
                    <Youtube className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass-effect rounded-2xl p-6 border border-orange-200">
              <h4 className="heading-cultural text-lg font-bold text-marathi-orange mb-6 flex items-center gap-2">
                <span>🔗</span>
                द्रुत दुवे
              </h4>
              <ul className="space-y-3">
                {[
                  { id: 'home', label: 'मुख्यपृष्ठ', icon: '🏠' },
                  { id: 'about', label: 'आमच्याबद्दल', icon: '📖' },
                  { id: 'gallery', label: 'छायाचित्र दालन', icon: '📸' },
                  { id: 'youtube', label: 'YouTube व्हिडिओ', icon: '🎥' },
                  { id: 'news', label: 'बातम्या', icon: '📰' }
                ].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)} 
                      className="group flex items-center gap-3 text-gray-300 hover:text-marathi-orange transition-colors duration-300 w-full text-left py-2 px-3 rounded-lg hover:bg-orange-50/10"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="text-cultural">{item.label}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <a href="#" className="group flex items-center gap-3 text-gray-300 hover:text-marathi-orange transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-orange-50/10">
                    <span className="text-base group-hover:scale-110 transition-transform">📋</span>
                    <span className="text-cultural">नियम व अटी</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="glass-effect rounded-2xl p-6 border border-orange-200">
              <h4 className="heading-cultural text-lg font-bold text-marathi-orange mb-6 flex items-center gap-2">
                <span>📞</span>
                संपर्क माहिती
              </h4>
              <div className="space-y-4">
                <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-orange-50/10 transition-colors">
                  <div className="w-10 h-10 saffron-gradient rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-cultural text-gray-300 leading-relaxed">
                      'धनश्री',<br />
                      प्रभात कॉलनी, भुसावळ - 425201<br />
                      महाराष्ट्र, भारत
                    </p>
                  </div>
                </div>
                
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-orange-50/10 transition-colors">
                  <div className="w-10 h-10 saffron-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-cultural text-gray-300">+91 94203 48146</span>
                </div>
                
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-orange-50/10 transition-colors">
                  <div className="w-10 h-10 saffron-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-cultural text-gray-300 break-all">pranitapratibsl@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="glass-effect rounded-2xl p-6 border border-orange-200">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <Heart className="h-4 w-4 text-red-400" />
                    <span className="text-cultural text-gray-400 text-sm">
                      © 2024 प्रणिता प्रतिष्ठान. सर्व हक्क राखीव.
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    प्रेमाने बनवलेले • समाजसेवेसाठी समर्पित
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  {[
                    { label: 'गोपनीयता धोरण', icon: '🔒' },
                    { label: 'नियम व अटी', icon: '📋' },
                    { label: 'कुकी धोरण', icon: '🍪' }
                  ].map((item) => (
                    <a 
                      key={item.label}
                      href="#" 
                      className="group flex items-center gap-2 text-gray-400 hover:text-marathi-orange transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-orange-50/10"
                    >
                      <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="text-cultural">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
