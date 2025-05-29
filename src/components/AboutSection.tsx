
import { Users, Award, Target, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-marathi-orange mb-6">
            संस्था माहिती
          </h1>
          <div className="w-32 h-1 saffron-gradient mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            प्रणिता प्रतिष्ठान हि समाजसेवा, शिक्षण, आरोग्य आणि सामाजिक विकासाच्या क्षेत्रात काम करणारी एक प्रतिष्ठित संस्था आहे.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 cultural-shadow">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-marathi-orange mr-4" />
              <h2 className="text-3xl font-bold text-marathi-orange">आमचे ध्येय</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              समाजातील सर्व घटकांचा सर्वांगीण विकास करून एक आदर्श समाज निर्माण करणे. शिक्षण, आरोग्य, आणि सामाजिक न्यायाच्या माध्यमातून लोकांचे जीवन उन्नत करणे हे आमचे मुख्य ध्येय आहे.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 cultural-shadow">
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-marathi-orange mr-4" />
              <h2 className="text-3xl font-bold text-marathi-orange">आमची दृष्टी</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              एक न्यायसंगत, शिक्षित आणि प्रगतीशील समाज निर्माण करणे जिथे प्रत्येक व्यक्तीला त्याच्या क्षमतांचा पूर्ण विकास करण्याची संधी मिळेल आणि सर्वांचे कल्याण होईल.
            </p>
          </div>
        </div>

        {/* Leadership */}
        <div className="bg-white rounded-xl p-8 mb-16 cultural-shadow">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-marathi-orange mb-4">नेतृत्व</h2>
            <div className="w-24 h-1 saffron-gradient mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="w-32 h-32 saffron-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-marathi-orange mb-2">अध्यक्ष</h3>
              <p className="text-xl font-semibold text-gray-800 mb-4">श्री. राजेश पाटील</p>
              <p className="text-gray-600 leading-relaxed">
                समाजसेवेत 25 वर्षांचा अनुभव असलेले श्री. राजेश पाटील यांनी अनेक सामाजिक प्रकल्पांचे यशस्वी नेतृत्व केले आहे.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 saffron-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <Award className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-marathi-orange mb-2">सचिव</h3>
              <p className="text-xl font-semibold text-gray-800 mb-4">सौ. सुनिता शर्मा</p>
              <p className="text-gray-600 leading-relaxed">
                शिक्षण क्षेत्रातील तज्ञ असलेल्या सौ. सुनिता शर्मा यांनी संस्थेच्या सर्व कार्यक्रमांचे व्यवस्थापन उत्कृष्टपणे केले आहे.
              </p>
            </div>
          </div>
        </div>

        {/* Organization Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 text-center cultural-shadow">
            <div className="text-3xl font-bold text-marathi-orange mb-2">25+</div>
            <div className="text-gray-700">वर्षांचा अनुभव</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center cultural-shadow">
            <div className="text-3xl font-bold text-marathi-orange mb-2">50+</div>
            <div className="text-gray-700">प्रकल्प पूर्ण</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center cultural-shadow">
            <div className="text-3xl font-bold text-marathi-orange mb-2">1000+</div>
            <div className="text-gray-700">लाभार्थी</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center cultural-shadow">
            <div className="text-3xl font-bold text-marathi-orange mb-2">15+</div>
            <div className="text-gray-700">सक्रिय सदस्य</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
