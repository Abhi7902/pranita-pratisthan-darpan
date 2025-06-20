
import { Play, ExternalLink, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from '@/lib/youtube';

const YouTubeSection = () => {
  const { youtubeVideos } = useAppContext();

  if (youtubeVideos.length === 0) {
    return (
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              YouTube विंडो
            </h2>
            <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
            <p className="text-lg text-gray-300">
              कोणतेही व्हिडिओ उपलब्ध नाहीत
            </p>
          </div>
        </div>
      </section>
    );
  }

  const featuredVideo = youtubeVideos[0];
  const otherVideos = youtubeVideos.slice(1);

  const getVideoThumbnail = (videoId: string): string => {
    const cleanVideoId = extractYouTubeVideoId(videoId);
    if (cleanVideoId) {
      return `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`;
    }
    return '/placeholder.svg';
  };

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
                src={getYouTubeEmbedUrl(featuredVideo.videoId)}
                title={featuredVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-marathi-orange mb-3">
              {featuredVideo.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {featuredVideo.description}
            </p>
            <Button className="bg-marathi-orange hover:bg-marathi-deepOrange text-white">
              <ExternalLink className="h-4 w-4 mr-2" />
              YouTube वर पहा
            </Button>
          </div>
        </div>

        {/* Video Grid */}
        {otherVideos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {otherVideos.map((video) => (
              <div key={video.id} className="bg-gray-900 rounded-lg overflow-hidden cultural-shadow hover:scale-105 transition-transform">
                <div className="relative">
                  <img
                    src={getVideoThumbnail(video.videoId)}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{video.description}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-marathi-orange text-marathi-orange hover:bg-marathi-orange hover:text-white"
                  >
                    पहा
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

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
              <Youtube className="h-4 w-4 mr-2" />
              Subscribe करा
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
