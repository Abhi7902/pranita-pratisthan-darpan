import { Calendar, Users, Award, Heart } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const Timeline = () => {
  const { timelineEvents } = useAppContext();

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return Users;
      case 'Heart':
        return Heart;
      case 'Calendar':
        return Calendar;
      default:
        return Award;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-orange-50 via-white to-orange-100 relative overflow-hidden border-y-4 border-orange-200 shadow-[0_8px_32px_0_rgba(255,102,0,0.07)]">
      {/* Decorative SVG waves */}
      <div className="absolute top-0 left-0 w-full -z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
          <path fill="#FFEDD5" d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,85.3C672,75,768,53,864,53.3C960,53,1056,75,1152,85.3C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-extrabold text-marathi-orange drop-shadow-lg tracking-tight mb-6 font-[Tiro Devanagari Marathi,serif]">
            आमचा प्रवास
          </h2>
          <div className="w-32 h-2 mx-auto rounded-full saffron-gradient mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            प्रणिता प्रतिष्ठानच्या समाजसेवेच्या प्रवासातील महत्वाच्या क्षणांची आठवण
          </p>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Vertical timeline line with border */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-3 bg-gradient-to-b from-marathi-orange via-yellow-300 to-white-400 rounded-full shadow-lg border-2 border-orange-300"></div>

          {timelineEvents.map((event, index) => {
            const IconComponent = getIconComponent(event.icon);
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`w-full flex flex-col md:flex-row items-center mb-20 relative group`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Left Side */}
                <div className={`md:w-5/12 w-full flex md:flex-col flex-row items-center md:items-end ${isLeft ? 'md:justify-end' : 'md:order-2 md:justify-start'}`}>
                  {isLeft && (
                    <div className="w-full flex md:justify-end justify-center md:pr-2">
                      <div
                        className="bg-white rounded-2xl p-8 shadow-2xl border border-orange-200 hover:scale-105 hover:border-marathi-orange hover:shadow-orange-200/40 transition-all duration-300 max-w-md relative md:mr-0 md:ml-auto md:-mr-8"
                        style={{ marginRight: '-2rem' }}
                      >
                        <div className="flex items-center mb-4 border-b-2 border-gray-200 pb-4">
                          <div className={`w-16 h-16 ${event.color} rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white mr-4 text-3xl transition-transform duration-300 group-hover:rotate-12`}>
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <span className="text-3xl font-extrabold text-marathi-orange drop-shadow">{event.year}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 font-[Tiro Devanagari Marathi,serif]">{event.title}</h3>
                        <p className="text-gray-600 text-lg">{event.description}</p>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-marathi-orange rounded-full border-4 border-white shadow-lg z-20"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Center timeline dot */}
                <div className="md:w-2/12 w-full flex justify-center items-center relative z-20 my-8 md:my-0">
                  <div className="w-10 h-10 bg-marathi-orange rounded-full border-4 border-white shadow-lg flex items-center justify-center relative transition-all duration-300 hover:scale-125 hover:ring-4 hover:ring-orange-200">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Right Side */}
                <div className={`md:w-5/12 w-full flex md:flex-col flex-row items-center md:items-start ${!isLeft ? 'md:justify-start' : 'md:order-2 md:justify-end'}`}>
                  {!isLeft && (
                    <div className="w-full flex md:justify-start justify-center md:pl-2">
                      <div
                        className="bg-white rounded-2xl p-8 shadow-2xl border border-orange-200 hover:scale-105 hover:border-marathi-orange hover:shadow-orange-200/40 transition-all duration-300 max-w-md relative md:ml-0 md:mr-auto md:-ml-8"
                        style={{ marginLeft: '-2rem' }}
                      >
                        <div className="flex items-center mb-4">
                          <div className={`w-16 h-16 ${event.color} rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white mr-4 text-3xl transition-transform duration-300 group-hover:rotate-12`}>
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <span className="text-3xl font-extrabold text-marathi-orange drop-shadow">{event.year}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 font-[Tiro Devanagari Marathi,serif]">{event.title}</h3>
                        <p className="text-gray-600 text-lg">{event.description}</p>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-marathi-orange rounded-full border-4 border-white shadow-lg z-20"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative SVG waves bottom */}
      <div className="absolute bottom-0 left-0 w-full -z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
          <path fill="#FFEDD5" d="M0,32L48,53.3C96,75,192,117,288,128C384,139,480,117,576,101.3C672,85,768,75,864,80C960,85,1056,107,1152,117.3C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Timeline;