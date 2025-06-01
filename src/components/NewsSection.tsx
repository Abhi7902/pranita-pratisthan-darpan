
import { Calendar, User, ExternalLink, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';

const NewsSection = () => {
  const { newsItems } = useAppContext();

  if (newsItems.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-marathi-orange mb-6">
              बातम्या व प्रसारमाध्यम
            </h2>
            <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              कोणत्याही बातम्या उपलब्ध नाहीत
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-marathi-orange mb-6">
            बातम्या व प्रसारमाध्यम
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            आमच्या कार्याच्या नवीनतम बातम्या आणि प्रसारमाध्यमातील कव्हरेज
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* News Articles */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-marathi-orange mb-8">ताज्या बातम्या</h3>
            
            {newsItems.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg cultural-shadow overflow-hidden mb-8"
              >
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{article.summary}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-marathi-orange text-marathi-orange hover:bg-marathi-orange hover:text-white">
                      वाचा <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Links Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-marathi-orange mb-8">आमच्याशी जुडा</h3>
            
            <div className="bg-white rounded-lg cultural-shadow p-6">
              <h4 className="font-bold text-gray-800 mb-4">सामाजिक माध्यम</h4>
              <div className="space-y-3">
                <a href="#" className="flex items-center text-gray-600 hover:text-marathi-orange">
                  <Facebook className="w-8 h-8 text-blue-600 mr-3" />
                  Facebook
                </a>
                <a href="#" className="flex items-center text-gray-600 hover:text-marathi-orange">
                  <Youtube className="w-8 h-8 text-red-600 mr-3" />
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
