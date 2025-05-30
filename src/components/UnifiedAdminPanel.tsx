
import { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import AdminPanel from './AdminPanel';
import MELAdminPanel from './MEL/MELAdminPanel';

const UnifiedAdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState<'main' | 'site' | 'mel'>('main');
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      toast.success('यशस्वीरीत्या लॉगिन झाले!');
    } else {
      toast.error('चुकीचे वापरकर्ता नाव किंवा पासवर्ड');
    }
  };

  if (!isLoggedIn) {
    return (
      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg cultural-shadow p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-marathi-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-marathi-orange">Admin Login</h2>
              <p className="text-gray-600 mt-2">प्रशासकीय पॅनलमध्ये प्रवेश</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 max-w-sm mx-auto">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  वापरकर्ता नाव
                </label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  placeholder="admin"
                  className="border-marathi-orange/30 focus:border-marathi-orange w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  पासवर्ड
                </label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="admin123"
                  className="border-marathi-orange/30 focus:border-marathi-orange w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-marathi-orange hover:bg-marathi-deepOrange text-white"
              >
                लॉगिन करा
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Demo: admin / admin123</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activePanel === 'site') {
    return <AdminPanel onBack={() => setActivePanel('main')} />;
  }

  if (activePanel === 'mel') {
    return <MELAdminPanel onBackToUser={() => setActivePanel('main')} />;
  }

  return (
    <section className="py-20 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-marathi-orange mb-4">
            प्रशासकीय पॅनल
          </h2>
          <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
          <Button 
            onClick={() => setIsLoggedIn(false)}
            variant="outline"
            className="border-marathi-orange text-marathi-orange hover:bg-marathi-orange hover:text-white"
          >
            लॉगआउट
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="cultural-shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setActivePanel('site')}>
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-marathi-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-white">🌐</span>
              </div>
              <CardTitle className="text-2xl text-marathi-orange">Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                वेबसाइट सेटिंग्स व्यवस्थापित करा
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• फोटो गॅलरी</li>
                <li>• बातम्या व्यवस्थापन</li>
                <li>• YouTube व्हिडिओ</li>
                <li>• टाइमलाइन इव्हेंट्स</li>
                <li>• पॉपअप बॅनर</li>
                <li>• प्रकल्प व्यवस्थापन</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="cultural-shadow hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setActivePanel('mel')}>
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-white">🏥</span>
              </div>
              <CardTitle className="text-2xl text-blue-600">MEL Settings</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Medical Equipment Library व्यवस्थापन
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Equipment Management</li>
                <li>• User Administration</li>
                <li>• Rental Tracking</li>
                <li>• Overdue Monitoring</li>
                <li>• Inventory Control</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UnifiedAdminPanel;
