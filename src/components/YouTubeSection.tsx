
import { Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const YouTubeSection = () => {
  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'प्रणिता प्रतिष्ठान - परिचय व्हिडिओ',
      description: 'आमच्या संस्थेच्या कार्याचा आढावा आणि उद्दिष्टे',
      thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      views: '15,420',
      duration: '5:32'
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'शिक्षण सेवा कार्यक्रम - भाग 1',
      description: 'गावातील मुलांसाठी चालवल्या जाणाऱ्या शिक्षण सेवांची माहिती',
      thumbnail: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      views: '8,750',
      duration: '8:15'
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'आरोग्य शिबिर - मोफत तपासणी',
      description: 'गावोगावी आयोजित केल्या जाणाऱ्या आरोग्य शिबिरांची नोंद',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      views: '12,340',
      duration: '6:45'
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'महिला सक्षमीकरण कार्यशाळा',
      description: 'महिलांच्या आर्थिक स्वावलंबनासाठी चालवल्या जाणाऱ्या कार्यशाळा',
      thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      views: '6,890',
      duration: '7:28'
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            YouTube विंडो
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            आमच्या कार्याचे व्हिडिओ पहा आणि आमच्या समाजसेवेच्या प्रवासाचा भाग व्हा
          </p>
        </div>

        {/* Featured Video */}
        <div className="mb-16">
          <div className="relative rounded-lg overflow-hidden cultural-shadow">
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Featured Video"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-marathi-orange mb-3">
              प्रणिता प्रतिष्ठान - आमचे काम
            </h3>
            <p className="text-gray-300 mb-4">
              समाजसेवेतील आमच्या योगदानाची संपूर्ण माहिती या व्हिडिओमध्ये पहा
            </p>
            <Button className="bg-marathi-orange hover:bg-marathi-deepOrange text-white">
              <ExternalLink className="h-4 w-4 mr-2" />
              YouTube वर पहा
            </Button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden cultural-shadow hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-sm rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{video.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{video.views} views</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-marathi-orange text-marathi-orange hover:bg-marathi-orange hover:text-white"
                  >
                    पहा
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-marathi-orange to-marathi-gold rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              आमच्या YouTube चॅनलला Subscribe करा
            </h3>
            <p className="text-white/90 mb-6">
              नवीन व्हिडिओंची माहिती मिळवण्यासाठी आमच्या चॅनलला Subscribe करा
            </p>
            <Button className="bg-white text-marathi-orange hover:bg-gray-100 font-bold">
              Subscribe करा
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
