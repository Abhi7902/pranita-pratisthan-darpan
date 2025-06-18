
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
              गोपनीयता धोरण
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-marathi-orange">
              प्रणिता प्रतिष्ठान - गोपनीयता धोरण
            </CardTitle>
            <p className="text-gray-600">अंतिम अपडेट: {new Date().toLocaleDateString('mr-IN')}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-cultural">
            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">१. माहिती संकलन</h2>
              <p className="mb-2">प्रणिता प्रतिष्ठान खालील प्रकारची माहिती संकलित करते:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>वैयक्तिक माहिती: नाव, ईमेल, फोन नंबर</li>
                <li>वैद्यकीय उपकरण भाडे संबंधी माहिती</li>
                <li>कार्यक्रम आणि सेवांमधील सहभाग माहिती</li>
                <li>फीडबॅक आणि सूचना</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">२. माहितीचा वापर</h2>
              <p className="mb-2">आम्ही आपली माहिती खालील उद्देशांसाठी वापरतो:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>सेवा प्रदान करणे आणि सुधारणे</li>
                <li>वैद्यकीय उपकरण भाडे व्यवस्थापन</li>
                <li>कार्यक्रम आणि सेवांबद्दल माहिती देणे</li>
                <li>कायदेशीर आवश्यकता पूर्ण करणे</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">३. माहिती सुरक्षा</h2>
              <p>
                आम्ही आपली वैयक्तिक माहिती सुरक्षित ठेवण्यासाठी योग्य तांत्रिक आणि संघटनात्मक उपाययोजना करतो. 
                आपली माहिती एन्क्रिप्टेड स्वरूपात संग्रहित केली जाते आणि केवळ अधिकृत व्यक्तींनाच प्रवेश दिला जातो.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">४. माहिती सामायिकरण</h2>
              <p className="mb-2">आम्ही आपली वैयक्तिक माहिती तृतीय पक्षांसोबत सामायिक करत नाही, अशा प्रकरणांशिवाय:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>आपली स्पष्ट संमती असल्यास</li>
                <li>कायदेशीर आवश्यकता असल्यास</li>
                <li>आपातकालीन परिस्थितीत</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">५. आपले अधिकार</h2>
              <p className="mb-2">आपणास खालील अधिकार आहेत:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>आपली माहिती पाहण्याचा अधिकार</li>
                <li>चुकीची माहिती सुधारण्याचा अधिकार</li>
                <li>माहिती हटवण्याचा अधिकार</li>
                <li>माहिती प्रक्रिया थांबवण्याचा अधिकार</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">६. संपर्क माहिती</h2>
              <p>गोपनीयता धोरणाबद्दल प्रश्न असल्यास कृपया संपर्क साधा:</p>
              <div className="bg-gray-50 p-4 rounded-lg mt-2">
                <p><strong>ईमेल:</strong> pranitapratibsl@gmail.com</p>
                <p><strong>फोन:</strong> +91 94203 48146</p>
                <p><strong>पत्ता:</strong> 'धनश्री', प्रभात कॉलनी, भुसावळ - 425201, महाराष्ट्र</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-marathi-orange mb-3">७. धोरण बदल</h2>
              <p>
                आम्ही या गोपनीयता धोरणात वेळोवेळी बदल करू शकतो. कोणतेही महत्त्वाचे बदल 
                आमच्या वेबसाइटवर प्रसिद्ध केले जातील.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
