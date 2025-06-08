
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import AdminPanel from './AdminPanel';
import SupabaseMELAdminPanel from './MEL/SupabaseMELAdminPanel';
import Navbar from './Navbar';
import { useState } from 'react';

const UnifiedAdminPanel = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activePanel, setActivePanel] = useState<'main' | 'site' | 'mel'>('main');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <section className="py-20 bg-gray-100 min-h-screen">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-lg cultural-shadow p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-marathi-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-marathi-orange">Access Denied</h2>
                <p className="text-gray-600 mt-2">कृपया लॉगिन करा</p>
              </div>
              <Button 
                onClick={() => navigate('/login')}
                className="w-full bg-marathi-orange hover:bg-marathi-deepOrange text-white"
              >
                लॉगिन करा
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Only allow admin access to this panel
  if (!isAdmin) {
    return (
      <div>
        <Navbar />
        <section className="py-20 bg-gray-100 min-h-screen">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-lg cultural-shadow p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                <p className="text-gray-600 mt-2">आपल्याकडे प्रशासकीय अधिकार नाहीत</p>
                <p className="text-sm text-gray-500 mt-1">Only the system administrator can access this panel</p>
              </div>
              <div className="space-y-2">
                <Button 
                  onClick={() => navigate('/')}
                  className="w-full bg-marathi-orange hover:bg-marathi-deepOrange text-white"
                >
                  मुख्यपृष्ठावर जा
                </Button>
                <Button 
                  onClick={signOut}
                  variant="outline"
                  className="w-full"
                >
                  लॉगआउट
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (activePanel === 'site') {
    return (
      <div>
        <Navbar />
        <AdminPanel onBack={() => setActivePanel('main')} />
      </div>
    );
  }

  if (activePanel === 'mel') {
    return (
      <div>
        <Navbar />
        <SupabaseMELAdminPanel onBackToUser={() => setActivePanel('main')} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-marathi-orange mb-4">
              प्रशासकीय पॅनल
            </h2>
            <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
            <p className="text-sm text-gray-600 mb-4">Administrator Panel - Full System Access</p>
            <Button 
              onClick={signOut}
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
    </div>
  );
};

export default UnifiedAdminPanel;
