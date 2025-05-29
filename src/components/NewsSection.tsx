
import { Calendar, User, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: 'प्रणिता प्रतिष्ठानला राष्ट्रीय पुरस्कार',
      excerpt: 'समाजसेवेतील उत्कृष्ट कामाबद्दल संस्थेला राष्ट्रीय स्तरावर सन्मान प्राप्त झाला.',
      date: '15 डिसेंबर 2024',
      author: 'प्रशासन विभाग',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'नवीन शिक्षण केंद्र उघडले',
      excerpt: 'गावातील मुलांसाठी आधुनिक सुविधांसह नवीन शिक्षण केंद्र सुरू केले.',
      date: '10 डिसेंबर 2024',
      author: 'शिक्षण विभाग',
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      featured: false
    },
    {
      id: 3,
      title: 'आरोग्य शिबिराला प्रचंड प्रतिसाद',
      excerpt: '500 पेक्षा जास्त लोकांनी मोफत आरोग्य तपासणीचा लाभ घेतला.',
      date: '5 डिसेंबर 2024',
      author: 'आरोग्य विभाग',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      featured: false
    }
  ];

  const mediaLinks = [
    {
      title: 'दैनिक सकाळ मध्ये बातमी',
      date: '12 डिसेंबर 2024',
      type: 'वृत्तपत्र'
    },
    {
      title: 'टीव्ही 9 मराठी कव्हरेज',
      date: '8 डिसेंबर 2024',
      type: 'टेलिव्हिजन'
    },
    {
      title: 'झी मराठी न्यूज रिपोर्ट',
      date: '3 डिसेंबर 2024',
      type: 'टेलिव्हिजन'
    }
  ];

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
            
            {news.map((article) => (
              <div
                key={article.id}
                className={`bg-white rounded-lg cultural-shadow overflow-hidden mb-8 ${
                  article.featured ? 'border-l-4 border-marathi-orange' : ''
                }`}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    {article.featured && (
                      <span className="bg-marathi-orange text-white px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                        मुख्य बातमी
                      </span>
                    )}
                    <h4 className="text-xl font-bold text-gray-800 mb-3">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
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
              </div>
            ))}
          </div>

          {/* Media Coverage Sidebar */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-marathi-orange mb-8">प्रसारमाध्यम कव्हरेज</h3>
            
            <div className="bg-white rounded-lg cultural-shadow p-6">
              {mediaLinks.map((media, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 mb-4 last:mb-0">
                  <h4 className="font-medium text-gray-800 mb-2">{media.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{media.date}</span>
                    <span className="bg-marathi-orange/10 text-marathi-orange px-2 py-1 rounded text-xs">
                      {media.type}
                    </span>
                  </div>
                </div>
              ))}
              
              <Button className="w-full mt-6 bg-marathi-orange hover:bg-marathi-deepOrange text-white">
                सर्व प्रसारमाध्यम पहा
              </Button>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-lg cultural-shadow p-6 mt-6">
              <h4 className="font-bold text-gray-800 mb-4">आमच्याशी जुडा</h4>
              <div className="space-y-3">
                <a href="#" className="flex items-center text-gray-600 hover:text-marathi-orange">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">f</span>
                  Facebook
                </a>
                <a href="#" className="flex items-center text-gray-600 hover:text-marathi-orange">
                  <span className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm mr-3">t</span>
                  Twitter
                </a>
                <a href="#" className="flex items-center text-gray-600 hover:text-marathi-orange">
                  <span className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm mr-3">i</span>
                  Instagram
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
