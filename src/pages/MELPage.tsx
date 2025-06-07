
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseMEL } from '@/contexts/SupabaseMELContext';
import MELLogin from '@/components/MEL/MELLogin';
import MELDashboard from '@/components/MEL/MELDashboard';
import SupabaseMELAdminPanel from '@/components/MEL/SupabaseMELAdminPanel';

const MELPage = () => {
  const { user, isAdmin, isMELUser } = useAuth();
  const { currentMELUser } = useSupabaseMEL();
  const [isAdminView, setIsAdminView] = useState(false);

  // If not logged in, show login
  if (!user) {
    return <MELLogin />;
  }

  // If admin wants admin view
  if (isAdmin && isAdminView) {
    return <SupabaseMELAdminPanel onBackToUser={() => setIsAdminView(false)} />;
  }

  // If admin but not in admin view, show admin panel by default
  if (isAdmin && !isAdminView) {
    return <SupabaseMELAdminPanel onBackToUser={() => setIsAdminView(false)} />;
  }

  // If MEL user, show dashboard
  if (isMELUser && currentMELUser) {
    return <MELDashboard onAdminAccess={() => setIsAdminView(true)} />;
  }

  // If logged in but not authorized
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access the MEL system.</p>
      </div>
    </div>
  );
};

export default MELPage;
