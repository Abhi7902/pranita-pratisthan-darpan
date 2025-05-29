
import { Calendar, Users, Award, Heart } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const Timeline = () => {
  const { timelineEvents } = useAppContext();

  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Users': return Users;
      case 'Heart': return Heart;
      case 'Calendar': return Calendar;
      default: return Award;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-marathi-orange mb-6">
            आमचा प्रवास
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            प्रणिता प्रतिष्ठानच्या समाजसेवेच्या प्रवासातील महत्वाच्या क्षणांची आठवण
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full saffron-gradient"></div>
          
          {timelineEvents.map((event, index) => {
            const IconComponent = getIconComponent(event.icon);
            return (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white rounded-lg p-6 cultural-shadow animate-fade-in">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${event.color} rounded-full flex items-center justify-center text-white mr-4`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-2xl font-bold text-marathi-orange">{event.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
                
                {/* Center circle */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-marathi-orange rounded-full border-4 border-white shadow-lg z-10"></div>
                </div>
                
                <div className="w-5/12"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
