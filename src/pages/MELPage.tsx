
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseMEL } from '@/contexts/SupabaseMELContext';
import MELLogin from '@/components/MEL/MELLogin';
import MELDashboard from '@/components/MEL/MELDashboard';
import SupabaseMELAdminPanel from '@/components/MEL/SupabaseMELAdminPanel';
import Navbar from '@/components/Navbar';

const MELPage = () => {
  const { user, isAdmin, isMELUser } = useAuth();
  const { currentMELUser } = useSupabaseMEL();
  const [isAdminView, setIsAdminView] = useState(false);

  // Navbar handlers - MEL page doesn't use section navigation
  const handleNavigate = (section: string) => {
    // MEL page navigation is handled differently
    console.log('Navigation to:', section);
  };

  // If not logged in, show login
  if (!user) {
    return (
      <div>
        <Navbar activeSection="mel" onNavigate={handleNavigate} />
        <MELLogin />
      </div>
    );
  }

  // If admin wants admin view
  if (isAdmin && isAdminView) {
    return (
      <div>
        <Navbar activeSection="mel" onNavigate={handleNavigate} />
        <SupabaseMELAdminPanel onBackToUser={() => setIsAdminView(false)} />
      </div>
    );
  }

  // If admin but not in admin view, show admin panel by default
  if (isAdmin && !isAdminView) {
    return (
      <div>
        <Navbar activeSection="mel" onNavigate={handleNavigate} />
        <SupabaseMELAdminPanel onBackToUser={() => setIsAdminView(false)} />
      </div>
    );
  }

  // If MEL user, show dashboard
  if (isMELUser && currentMELUser) {
    return (
      <div>
        <Navbar activeSection="mel" onNavigate={handleNavigate} />
        <MELDashboard onAdminAccess={() => setIsAdminView(true)} />
      </div>
    );
  }

  // If logged in but not authorized
  return (
    <div>
      <Navbar activeSection="mel" onNavigate={handleNavigate} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the MEL system.</p>
        </div>
      </div>
    </div>
  );
};

export default MELPage;
