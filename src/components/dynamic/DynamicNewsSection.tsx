import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import NewsArticleDialog from "./NewsArticleDialog";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  created_at: string;
}

const DynamicNewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<NewsItem | null>(null);

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

    fetchNews();
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

export default DynamicNewsSection;
