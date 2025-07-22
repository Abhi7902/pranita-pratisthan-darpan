import { Award, Users, Heart, Star } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const iconMap = {
  Award,
  Users,
  Heart,
  Star,
};

const DynamicTimeline = () => {
  const { timelineEvents: events, loading } = useAppContext();

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-orange-100 border-y-4 border-orange-200 shadow-[0_8px_32px_0_rgba(255,102,0,0.07)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading timeline...</p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-orange-100 border-y-4 border-orange-200 shadow-[0_8px_32px_0_rgba(255,102,0,0.07)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-marathi-orange mb-4">
              आमचा प्रवास
            </h2>
            <div className="w-24 h-1 saffron-gradient mx-auto mb-8"></div>
            <p className="text-gray-600">अद्याप कोणतेही टाइमलाइन इव्हेंट्स उपलब्ध नाहीत.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-orange-100 border-y-4 border-orange-200 shadow-[0_8px_32px_0_rgba(255,102,0,0.07)] relative overflow-hidden">
      {/* Decorative SVG waves */}
      <div className="absolute top-0 left-0 w-full -z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
          <path fill="#FFEDD5" d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,85.3C672,75,768,53,864,53.3C960,53,1056,75,1152,85.3C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-marathi-orange mb-4 font-[Tiro Devanagari Marathi,serif]">
            आमचा प्रवास
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            प्रणिता प्रतिष्ठानच्या स्थापनेपासून आजपर्यंतच्या महत्वाच्या टप्प्यांची माहिती
          </p>
        </div>
        <div className="relative">
          {/* Timeline vertical line with border and shadow */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-marathi-orange via-orange-300 to-orange-200 rounded-full shadow-lg border-1  border-orange-300"></div>
          <div className="space-y-16">
            {events.map((event, index) => {
              const IconComponent = iconMap[event.icon as keyof typeof iconMap] || Award;
              const isLeft = index % 2 === 0;
              return (
                 <div
                   key={`${event.year}-${index}`}
                  className={`relative flex flex-col md:flex-row items-center group`}
                >
                  {/* Timeline Card */}
                  <div
                    className={`
                      w-full md:w-5/12
                      ${isLeft ? 'md:pr-4 md:justify-end md:text-right' : 'md:pl-4 md:justify-start md:text-left'}
                      flex flex-col items-end md:items-stretch
                    `}
                  >
                    {isLeft && (
                      <div
                        className={`
                          bg-white p-8 rounded-2xl border border-orange-200
                          shadow-2xl max-w-2xl w-full relative transition-all duration-300
                          hover:scale-105 hover:border-marathi-orange hover:shadow-orange-200/40
                          md:ml-auto md:-mr-8
                        `}
                        style={{ marginRight: '-2rem' }}
                      >
                        <div className="flex items-center mb-4">
                          <div className={`w-14 h-14 ${event.color} rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white mr-4 text-2xl transition-transform duration-300 group-hover:rotate-12`}>
                            <IconComponent className="h-7 w-7" />
                          </div>
                          <span className="text-2xl font-extrabold text-marathi-orange drop-shadow">{event.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-[Tiro Devanagari Marathi,serif]">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    )}
                  </div>
                  {/* Timeline Dot */}
                  <div className="md:w-2/12 w-full flex justify-center items-center relative z-20 my-8 md:my-0">
                    <div className="w-7 h-7 bg-marathi-orange rounded-full border-4 border-white shadow-lg flex items-center justify-center relative transition-all duration-300 hover:scale-125 hover:ring-4 hover:ring-orange-200">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  {/* Timeline Card Right */}
                  <div
                    className={`
                      w-full md:w-5/12
                      ${!isLeft ? 'md:pl-4 md:justify-start md:text-left' : 'md:pr-4 md:justify-end md:text-right'}
                      flex flex-col items-start md:items-stretch
                    `}
                  >
                    {!isLeft && (
                      <div
                        className={`
                          bg-white p-8 rounded-2xl border border-orange-200
                          shadow-2xl max-w-2xl w-full relative transition-all duration-300
                          hover:scale-105 hover:border-marathi-orange hover:shadow-orange-200/40
                          md:mr-auto md:-ml-8
                        `}
                        style={{ marginLeft: '-2rem' }}
                      >
                        <div className="flex items-center mb-4">
                          <div className={`w-14 h-14 ${event.color} rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white mr-4 text-2xl transition-transform duration-300 group-hover:rotate-12`}>
                            <IconComponent className="h-7 w-7" />
                          </div>
                          <span className="text-2xl font-extrabold text-marathi-orange drop-shadow">{event.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 font-[Tiro Devanagari Marathi,serif]">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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

export default DynamicTimeline;