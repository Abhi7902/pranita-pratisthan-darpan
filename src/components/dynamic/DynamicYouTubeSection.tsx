import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Video {
  id: string;
  title: string;
  video_id: string;
  description: string;
  thumbnail_url: string;
  created_at: string;
}

const DynamicYouTubeSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('youtube_videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Add thumbnail URLs if not present
        const videosWithThumbnails = (data || []).map(video => ({
          ...video,
          thumbnail_url: video.thumbnail_url || `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`
        }));
        
        setVideos(videosWithThumbnails);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading videos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-marathi-orange mb-4">
              YouTube व्हिडिओ
            </h2>
            <div className="w-24 h-1 saffron-gradient mx-auto mb-8"></div>
            <p className="text-gray-600">अद्याप कोणतेही व्हिडिओ उपलब्ध नाहीत.</p>
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
            YouTube व्हिडिओ
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            आमच्या संस्थेच्या कार्यक्रमांचे आणि उपक्रमांचे व्हिडिओ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="cultural-shadow hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  {selectedVideo === video.video_id ? (
                    <div className="aspect-video">
                      <iframe
                        key={video.video_id} // force re-mount
                        src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1&rel=0`}
                        title={video.title}
                        className="w-full h-full rounded-t-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div 
                      className="relative cursor-pointer group"
                      onClick={() => setSelectedVideo(video.video_id)}
                    >
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                        <Play className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicYouTubeSection;
