
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold saffron-gradient bg-clip-text text-transparent mb-4">
              प्रणिता प्रतिष्ठान
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              समाजसेवा, संस्कृती आणि विकासाच्या क्षेत्रात काम करणारी एक प्रतिष्ठित संस्था. 
              आमचे उद्दिष्ट समाजातील प्रत्येक व्यक्तीच्या जीवनात सकारात्मक बदल घडवून आणणे आहे.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-marathi-orange mb-4">द्रुत दुवे</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-marathi-orange transition-colors">मुख्यपृष्ठ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-marathi-orange transition-colors">आमच्याबद्दल</a></li>
              <li><a href="#" className="text-gray-300 hover:text-marathi-orange transition-colors">प्रकल्प</a></li>
              <li><a href="#" className="text-gray-300 hover:text-marathi-orange transition-colors">छायाचित्र दालन</a></li>
              <li><a href="#" className="text-gray-300 hover:text-marathi-orange transition-colors">बातम्या</a></li>
              <li><a href="#" className="text-gray-300 hover:text-marathi-orange transition-colors">संपर्क</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-marathi-orange mb-4">संपर्क माहिती</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-marathi-orange mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    मुख्य कार्यालय,<br />
                    एस.बी. रोड, पुणे - 411038<br />
                    महाराष्ट्र, भारत
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-marathi-orange mr-3" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-marathi-orange mr-3" />
                <span className="text-gray-300">info@pranitapratishthan.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 प्रणिता प्रतिष्ठान. सर्व हक्क राखीव.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-marathi-orange transition-colors">गोपनीयता धोरण</a>
              <a href="#" className="text-gray-400 hover:text-marathi-orange transition-colors">नियम व अटी</a>
              <a href="#" className="text-gray-400 hover:text-marathi-orange transition-colors">कुकी धोरण</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
