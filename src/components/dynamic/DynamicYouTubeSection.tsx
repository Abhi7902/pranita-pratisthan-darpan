
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from '@/lib/youtube';

interface YouTubeVideo {
  id: string;
  title: string;
  video_id: string;
  description: string;
  thumbnail_url?: string;
  is_news: boolean;
}

const DynamicYouTubeSection = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .eq('is_news', false) // Only fetch non-news videos
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching videos:', error);
        return;
      }

      setVideos(data || []);
      if (data && data.length > 0) {
        setSelectedVideo(data[0]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVideoThumbnail = (video: YouTubeVideo): string => {
    // Use custom thumbnail if available, otherwise use YouTube's thumbnail
    if (video.thumbnail_url) {
      return video.thumbnail_url;
    }
    
    const videoId = extractYouTubeVideoId(video.video_id);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    
    return '/placeholder.svg';
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
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
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-marathi-orange mb-6">
              YouTube व्हिडिओ
            </h2>
            <p className="text-gray-600">No videos available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50 section-watermark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-marathi-orange mb-6">
            YouTube व्हिडिओ
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            आमच्या कार्याचे व्हिडिओ आणि सामाजिक सेवेच्या उपक्रमांची माहिती
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            {selectedVideo && (
              <Card className="cultural-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video relative">
                    <iframe
                      src={getYouTubeEmbedUrl(selectedVideo.video_id)}
                      title={selectedVideo.title}
                      className="w-full h-full rounded-t-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedVideo.title}
                    </h3>
                    <p className="text-gray-600">
                      {selectedVideo.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Video List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-marathi-orange mb-4">
              अधिक व्हिडिओ
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {videos.map((video) => (
                <Card
                  key={video.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedVideo?.id === video.id 
                      ? 'ring-2 ring-marathi-orange' 
                      : ''
                  }`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <CardContent className="p-3">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 relative">
                        <img
                          src={getVideoThumbnail(video)}
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {video.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicYouTubeSection;
