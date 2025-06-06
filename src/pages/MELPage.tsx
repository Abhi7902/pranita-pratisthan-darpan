
import { useState } from 'react';
import { useMELContext } from '@/contexts/MELContext';
import MELLogin from '@/components/MEL/MELLogin';
import MELDashboard from '@/components/MEL/MELDashboard';
import MELAdminPanel from '@/components/MEL/MELAdminPanel';

const MELPage = () => {
  const { currentMELUser } = useMELContext();
  const [isAdminView, setIsAdminView] = useState(false);

  if (!currentMELUser) {
    return <MELLogin />;
  }

  if (isAdminView) {
    return <MELAdminPanel onBackToUser={() => setIsAdminView(false)} />;
  }

  return <MELDashboard onAdminAccess={() => setIsAdminView(true)} />;
};

export default MELPage;
