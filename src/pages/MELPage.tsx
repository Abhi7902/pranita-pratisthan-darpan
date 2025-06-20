
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseMEL } from '@/contexts/SupabaseMELContext';
import MELLogin from '@/components/MEL/MELLogin';
import MELDashboard from '@/components/MEL/MELDashboard';
import SupabaseMELAdminPanel from '@/components/MEL/SupabaseMELAdminPanel';

const MELPage = () => {
  const { user, isAdmin, isMELUser, loading } = useAuth();
  const { currentMELUser } = useSupabaseMEL();
  const [isAdminView, setIsAdminView] = useState(false);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // If not logged in, show login
  if (!user) {
    return <MELLogin />;
  }

  // If admin and in admin view, show admin panel
  if (isAdmin && isAdminView) {
    return <SupabaseMELAdminPanel onBackToUser={() => setIsAdminView(false)} />;
  }

  // If admin but not in admin view, show option to switch to admin view
  if (isAdmin && !isAdminView) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-marathi-orange mb-4">Admin Access</h2>
          <p className="text-gray-600 mb-6">You have administrator privileges for the MEL system.</p>
          <div className="space-y-4">
            <button
              onClick={() => setIsAdminView(true)}
              className="w-full px-6 py-3 bg-marathi-orange text-white rounded-lg hover:bg-marathi-deepOrange transition-colors"
            >
              Access MEL Admin Panel
            </button>
            <p className="text-sm text-gray-500">Or use the MEL system as a regular user below</p>
            <MELDashboard 
              onRentEquipment={() => console.log('Navigate to rent equipment')} 
              onViewHistory={() => console.log('Navigate to rental history')} 
            />
          </div>
        </div>
      </div>
    );
  }

  // If MEL user, show dashboard
  if (isMELUser) {
    return (
      <MELDashboard 
        onRentEquipment={() => console.log('Navigate to rent equipment')} 
        onViewHistory={() => console.log('Navigate to rental history')} 
      />
    );
  }

  // If logged in but not authorized for MEL
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access the MEL system.</p>
        <p className="text-sm text-gray-500 mt-2">Contact administrator for MEL access.</p>
      </div>
    </div>
  );
};

export default MELPage;
