
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import AdminPanel from './AdminPanel';
import SupabaseMELAdminPanel from './MEL/SupabaseMELAdminPanel';
import Navbar from './Navbar';
import PasswordChangeModal from './auth/PasswordChangeModal';
import { useState } from 'react';
import { downloadCSV } from '@/utils/csvExport';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Download } from 'lucide-react';

const UnifiedAdminPanel = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activePanel, setActivePanel] = useState<'main' | 'site' | 'mel'>('main');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  // Navbar handlers - Admin panel doesn't use section navigation
  const handleNavigate = (section: string) => {
    if (section === 'home') {
      navigate('/');
    } else {
      console.log('Navigation to:', section);
    }
  };

  // const downloadFeedback = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('feedback')
  //       .select('*')
  //       .order('created_at', { ascending: false });
      
  //     if (error) throw error;
      
  //     const feedbackData = data.map(feedback => ({
  //       Name: feedback.name,
  //       Email: feedback.email || '',
  //       'Contact Number': feedback.contact_number || '',
  //       Rating: feedback.rating || '',
  //       Feedback: feedback.feedback,
  //       Suggestion: feedback.suggestion || '',
  //       Date: new Date(feedback.created_at).toLocaleDateString()
  //     }));
      
  //     downloadCSV(feedbackData, 'Feedback_Data');
  //   } catch (error) {
  //     console.error('Error downloading feedback:', error);
  //     toast.error('Failed to download feedback data');
  //   }
  // };

  if (loading) {
    return (
      <div>
        <Navbar activeSection="admin" onNavigate={handleNavigate} />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar activeSection="admin" onNavigate={handleNavigate} />
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
        <Navbar activeSection="admin" onNavigate={handleNavigate} />
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
        <Navbar activeSection="admin" onNavigate={handleNavigate} />
        <AdminPanel onBack={() => setActivePanel('main')} />
      </div>
    );
  }

  if (activePanel === 'mel') {
    return (
      <div>
        <Navbar activeSection="admin" onNavigate={handleNavigate} />
        <SupabaseMELAdminPanel onBackToUser={() => setActivePanel('main')} />
      </div>
    );
  }

  return (
    <div>
      <Navbar activeSection="admin" onNavigate={handleNavigate} />
      <section className="py-20 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-marathi-orange mb-4">
              प्रशासकीय पॅनल
            </h2>
            <div className="w-24 h-1 saffron-gradient mx-auto mb-6"></div>
            <p className="text-sm text-gray-600 mb-4">Administrator Panel - Full System Access</p>
            <div className="flex justify-center gap-2">
              <PasswordChangeModal />
              {/* <Button onClick={downloadFeedback} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Feedback
              </Button> */}
              <Button 
                onClick={signOut}
                variant="outline"
                className="border-marathi-orange text-marathi-orange hover:bg-marathi-orange hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" /> 
                लॉगआउट
              </Button>
            </div>
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
