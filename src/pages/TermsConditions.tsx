
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              मुख्यपृष्ठ
            </Button>
            <h1 className="text-2xl font-bold text-marathi-orange">
              नियम व अटी
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-marathi-orange">
              प्रणिता प्रतिष्ठान - नियम व अटी
            </CardTitle>
            <p className="text-gray-600">अंतिम अपडेट: {new Date().toLocaleDateString('mr-IN')}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-cultural">
            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">१. सामान्य अटी</h2>
              <p>
                या वेबसाइटचा वापर करून आपण या नियम व अटींना मान्यता देता. या अटींचे पालन न केल्यास 
                आम्ही आपल्या सेवेचा वापर थांबवण्याचा अधिकार राखून ठेवतो.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">२. वैद्यकीय उपकरण भाडे सेवा (MEL)</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">२.१ भाडे धोरण</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>सर्व उपकरणे ठराविक कालावधीसाठी भाड्याने दिली जातात</li>
                <li>ठेव रक्कम आगाऊ भरावी लागते</li>
                <li>वेळेत परत न केल्यास अतिरिक्त शुल्क आकारले जाईल</li>
                <li>उपकरणाचे नुकसान झाल्यास वापरकर्ता जबाबदार असेल</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-2">२.२ वापरकर्त्याची जबाबदारी</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>उपकरणाचा योग्य वापर आणि देखभाल करणे</li>
                <li>ठरलेल्या दिवसापर्यंत उपकरण परत करणे</li>
                <li>कोणतीही समस्या आल्यास लगेच कळवणे</li>
                <li>चुकीची माहिती दिल्यास होणाऱ्या परिणामांसाठी जबाबदार असणे</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">३. वेबसाइट वापर</h2>
              <h3 className="text-lg font-medium text-gray-800 mb-2">३.१ स्वीकार्य वापर</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                <li>केवळ कायदेशीर हेतूंसाठी वापर करा</li>
                <li>इतरांचे अधिकार आणि गोपनीयता यांचा आदर करा</li>
                <li>चुकीची किंवा भ्रामक माहिती देऊ नका</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mb-2">३.२ प्रतिबंधित क्रियाकलाप</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>वेबसाइटमध्ये अनधिकृत प्रवेश करण्याचा प्रयत्न</li>
                <li>व्हायरस किंवा हानिकारक कोड अपलोड करणे</li>
                <li>इतर वापरकर्त्यांना त्रास देणे</li>
                <li>कॉपीराइट उल्लंघन करणे</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">४. दायित्व मर्यादा</h2>
              <p>
                प्रणिता प्रतिष्ठान या वेबसाइटच्या वापरामुळे होणाऱ्या कोणत्याही प्रत्यक्ष किंवा अप्रत्यक्ष 
                नुकसानासाठी जबाबदार राहणार नाही. आम्ही सेवा उपलब्ध राहण्याची हमी देत नाही.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">५. बौद्धिक संपदा</h2>
              <p>
                या वेबसाइटवरील सर्व सामग्री प्रणिता प्रतिष्ठानची मालकी आहे. आमची लेखी परवानगी 
                घेतल्याशिवाय कोणत्याही सामग्रीचा वापर करू नका.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">६. खाते व्यवस्थापन</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>आपल्या खात्याची माहिती सुरक्षित ठेवा</li>
                <li>पासवर्ड इतरांसोबत सामायिक करू नका</li>
                <li>संशयास्पद क्रियाकलाप लगेच कळवा</li>
                <li>खोटी माहिती दिल्यास खाते बंद केले जाऊ शकते</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">७. सेवा बदल</h2>
              <p>
                आम्हाला कोणत्याही वेळी सेवा बदलण्याचा किंवा बंद करण्याचा अधिकार आहे. 
                महत्त्वाचे बदल आगाऊ कळवले जातील.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">८. कायदेशीर अधिकारक्षेत्र</h2>
              <p>
                या नियम व अटी भारतीय कायद्याच्या अधीन आहेत. कोणताही वाद भुसावळ न्यायालयाच्या 
                अधिकारक्षेत्रात सोडवला जाईल.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">९. संपर्क माहिती</h2>
              <p>या नियम व अटींबद्दल प्रश्न असल्यास कृपया संपर्क साधा:</p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2">
                <p><strong>ईमेल:</strong> pranitapratibsl@gmail.com</p>
                <p><strong>फोन:</strong> +91 94203 48146</p>
                <p><strong>पत्ता:</strong> 'धनश्री', प्रभात कॉलनी, भुसावळ - 425201, महाराष्ट्र</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">१०. नियम बदल</h2>
              <p>
                आम्ही या नियम व अटींमध्ये वेळोवेळी बदल करू शकतो. कोणतेही महत्त्वाचे बदल 
                आमच्या वेबसाइटवर प्रसिद्ध केले जातील आणि नवीन अटी लागू होण्याची तारीख दर्शवली जाईल.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditions;
