
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseMEL } from '@/contexts/SupabaseMELContext';
import MELLogin from '@/components/MEL/MELLogin';
import MELDashboard from '@/components/MEL/MELDashboard';
import SupabaseMELAdminPanel from '@/components/MEL/SupabaseMELAdminPanel';
import Navbar from '@/components/Navbar';

const MELPage = () => {
  const { user, isAdmin, isMELUser, loading } = useAuth();
  const { currentMELUser } = useSupabaseMEL();
  const [isAdminView, setIsAdminView] = useState(false);

  // Navbar handlers - MEL page doesn't use section navigation
  const handleNavigate = (section: string) => {
    // MEL page navigation is handled differently
    console.log('Navigation to:', section);
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div>
        <Navbar activeSection="mel" onNavigate={handleNavigate} />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show login with navbar
  if (!user) {
    return (
      <div>
        <Navbar activeSection="mel" onNavigate={handleNavigate} />
        <MELLogin />
      </div>
    );
  }

  // If admin wants admin view - NO NAVBAR, just the admin panel
  if (isAdmin && isAdminView) {
    return <SupabaseMELAdminPanel onBackToUser={() => setIsAdminView(false)} />;
  }

  // If admin but not in admin view - NO NAVBAR, just the admin panel
  if (isAdmin && !isAdminView) {
    return <SupabaseMELAdminPanel onBackToUser={() => setIsAdminView(false)} />;
  }

  // If MEL user - NO NAVBAR, just the dashboard with custom navbar
  if (isMELUser) {
    return (
      <MELDashboard 
        onRentEquipment={() => console.log('Navigate to rent equipment')} 
        onViewHistory={() => console.log('Navigate to rental history')} 
      />
    );
  }

  // If logged in but not authorized for MEL - show with navbar
  return (
    <div>
      <Navbar activeSection="mel" onNavigate={handleNavigate} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the MEL system.</p>
          <p className="text-sm text-gray-500 mt-2">Contact administrator for MEL access.</p>
        </div>
      </div>
    </div>
  );
};

export default MELPage;
