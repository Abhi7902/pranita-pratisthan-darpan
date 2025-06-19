import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Package, Clock, AlertTriangle, LogOut, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseMEL } from '@/contexts/SupabaseMELContext';
import { downloadCSV } from '@/utils/csvExport';
import { supabase } from '@/integrations/supabase/client';
import PasswordChangeModal from '@/components/auth/PasswordChangeModal';

interface MELDashboardProps {
  onRentEquipment: () => void;
  onViewHistory: () => void;
}

const MELDashboard = ({ onRentEquipment, onViewHistory }: MELDashboardProps) => {
  const { signOut, user } = useAuth();
  const { equipment, rentals, getOverdueRentals, currentMELUser } = useSupabaseMEL();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const { data: melUserData } = await supabase
            .from('mel_users')
            .select('full_name, username')
            .eq('user_id', user.id)
            .single();
          
          if (melUserData) {
            setUserName(melUserData.full_name || melUserData.username);
          } else {
            setUserName(user.user_metadata?.full_name || user.email || '');
          }
        } catch (error) {
          console.error('Error fetching user name:', error);
          setUserName(user.user_metadata?.full_name || user.email || '');
        }
      }
    };

    fetchUserName();
  }, [user]);

  const totalEquipment = equipment.length;
  const availableEquipment = equipment.filter(item => item.available_quantity > 0).length;
  const totalRentals = rentals.length;
  const overdueRentals = getOverdueRentals();

  const downloadRentalHistory = () => {
    const rentalData = rentals.map(rental => ({
      Equipment: rental.equipment_name,
      Patient: rental.patient_name,
      Mobile: rental.mobile_number,
      'Pickup Date': new Date(rental.pickup_date).toLocaleDateString(),
      'Return Date': new Date(rental.return_date).toLocaleDateString(),
      Status: rental.status
    }));
    downloadCSV(rentalData, 'MEL_Rental_History');
  };

  const downloadFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const feedbackData = data.map(feedback => ({
        Name: feedback.name,
        Email: feedback.email || '',
        'Contact Number': feedback.contact_number || '',
        Rating: feedback.rating || '',
        Feedback: feedback.feedback,
        Suggestion: feedback.suggestion || '',
        Date: new Date(feedback.created_at).toLocaleDateString()
      }));
      
      downloadCSV(feedbackData, 'Feedback_Data');
    } catch (error) {
      console.error('Error downloading feedback:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">
                MEL Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome, {userName || 'User'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PasswordChangeModal />
              <Button onClick={downloadRentalHistory} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Rentals
              </Button>
              <Button onClick={downloadFeedback} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Feedback
              </Button>
              <Button 
                onClick={signOut}
                variant="outline" 
                size="sm"
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Equipment</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEquipment}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{availableEquipment}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rentals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRentals}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overdueRentals.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={onRentEquipment} className="w-full">
                Rent Equipment
              </Button>
              <Button onClick={onViewHistory} variant="outline" className="w-full">
                View Rental History
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rentals.slice(0, 3).map((rental) => (
                  <div key={rental.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{rental.equipment_name}</p>
                      <p className="text-sm text-gray-600">{rental.patient_name}</p>
                    </div>
                    <Badge variant={rental.status === 'returned' ? 'secondary' : 'default'}>
                      {rental.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overdue Equipment Alert */}
        {overdueRentals.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Overdue Equipment ({overdueRentals.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overdueRentals.slice(0, 5).map((rental) => (
                  <div key={rental.id} className="flex justify-between items-center p-3 bg-white rounded border border-red-200">
                    <div>
                      <p className="font-medium text-red-800">{rental.equipment_name}</p>
                      <p className="text-sm text-red-600">
                        Patient: {rental.patient_name} | Due: {new Date(rental.return_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="destructive">
                      {Math.ceil((new Date().getTime() - new Date(rental.return_date).getTime()) / (1000 * 60 * 60 * 24))} days late
                    </Badge>
                  </div>
                ))}
                {overdueRentals.length > 5 && (
                  <p className="text-sm text-red-600 text-center">
                    And {overdueRentals.length - 5} more overdue items...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MELDashboard;
