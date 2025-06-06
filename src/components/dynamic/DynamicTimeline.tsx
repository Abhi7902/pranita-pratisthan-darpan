
import { useState, useEffect } from 'react';
import { Award, Users, Heart, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const iconMap = {
  Award,
  Users,
  Heart,
  Star,
};

const DynamicTimeline = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('timeline_events')
          .select('*')
          .order('year', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching timeline events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
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
      <section className="py-20 bg-gray-50">
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-marathi-orange mb-4">
            आमचा प्रवास
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            प्रणिता प्रतिष्ठानच्या स्थापनेपासून आजपर्यंतच्या महत्वाच्या टप्प्यांची माहिती
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-marathi-orange"></div>
          
          <div className="space-y-12">
            {events.map((event, index) => {
              const IconComponent = iconMap[event.icon as keyof typeof iconMap] || Award;
              
              return (
                <div key={event.id} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg cultural-shadow">
                      <div className="flex items-center mb-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${event.color} text-white mr-4`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-marathi-orange">{event.year}</h3>
                          <h4 className="text-lg font-semibold text-gray-800">{event.title}</h4>
                        </div>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-marathi-orange rounded-full border-4 border-white"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicTimeline;
