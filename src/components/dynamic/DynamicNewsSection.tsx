import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import NewsArticleDialog from "./NewsArticleDialog";
import { Youtube } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  created_at: string;
}

interface YoutubeVideoItem {
  id: string;
  title: string;
  video_id: string;
  thumbnail_url?: string | null;
}

const DynamicNewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideoItem[]>([]);
  const [ytLoading, setYTLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNews(data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchYoutubeVideos = async () => {
      setYTLoading(true);
      try {
        const { data, error } = await supabase
          .from('youtube_videos')
          .select('id, title, video_id, thumbnail_url')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setYoutubeVideos(data ?? []);
      } catch (error) {
        console.error('Error fetching YouTube news videos:', error);
      } finally {
        setYTLoading(false);
      }
    };

    fetchNews();
    fetchYoutubeVideos();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-marathi-orange mb-4">
              बातम्या व मीडिया
            </h2>
            <div className="w-24 h-1 saffron-gradient mx-auto mb-8"></div>
            <p className="text-gray-600">अद्याप कोणत्याही बातम्या उपलब्ध नाहीत.</p>
          </div>
          {/* YouTube Section even if news is empty */}
          <YouTubeNewsSection youtubeVideos={youtubeVideos} ytLoading={ytLoading} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-marathi-orange mb-4">
            बातम्या व मीडिया
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            आमच्या संस्थेच्या नवीनतम बातम्या आणि कार्यक्रमांची माहिती
          </p>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <button
              className="text-left w-full focus:outline-none"
              key={item.id}
              onClick={() => {
                setSelected(item);
                setDialogOpen(true);
              }}
              aria-label={`${item.title} article`}
            >
              <div className="cultural-shadow hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white">
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="text-gray-600 mb-2 line-clamp-3">
                      {item.summary}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* YouTube News Section */}
        <YouTubeNewsSection youtubeVideos={youtubeVideos} ytLoading={ytLoading} />
      </div>
      <NewsArticleDialog
        open={dialogOpen}
        onOpenChange={open => {
          setDialogOpen(open);
          if (!open) setSelected(null);
        }}
        news={
          selected
            ? {
                title: selected.title,
                summary: selected.summary,
                content: selected.content,
                author: selected.author,
                date: selected.date,
              }
            : undefined
        }
      />
    </section>
  );
};

// Separate Component for YouTube News Section (keep file small)
function YouTubeNewsSection({
  youtubeVideos,
  ytLoading,
}: {
  youtubeVideos: YoutubeVideoItem[];
  ytLoading: boolean;
}) {
  if (ytLoading) {
    return (
      <div className="mt-12 text-center text-gray-500">
        YouTube News Videos लोड होत आहेत...
      </div>
    );
  }

  if (youtubeVideos.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="text-lg font-bold text-marathi-orange mb-4 flex items-center gap-2">
        <Youtube className="w-6 h-6 text-red-500" />
        YouTube News
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {youtubeVideos.map((yt) => (
          <a
            key={yt.id}
            href={`https://www.youtube.com/watch?v=${yt.video_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group w-full"
          >
            <div className="rounded-lg overflow-hidden bg-white shadow cultural-shadow hover:shadow-xl transition-shadow duration-300">
              {yt.thumbnail_url ? (
                <img
                  src={yt.thumbnail_url}
                  alt={yt.title}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-gray-200">
                  <Youtube className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="p-4">
                <div className="font-semibold text-gray-900 text-lg line-clamp-2 group-hover:text-red-700">
                  {yt.title}
                </div>
                <div className="mt-2 text-blue-600 text-sm flex items-center gap-1 group-hover:underline">
                  <Youtube className="w-4 h-4" /> Watch on YouTube
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default DynamicNewsSection;
