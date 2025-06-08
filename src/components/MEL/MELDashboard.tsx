
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSupabaseMEL } from '@/contexts/SupabaseMELContext';
import { LogOut, Settings } from 'lucide-react';
import EquipmentList from './EquipmentList';
import RentalForm from './RentalForm';
import RentalHistory from './RentalHistory';

interface MELDashboardProps {
  onAdminAccess: () => void;
}

const MELDashboard = ({ onAdminAccess }: MELDashboardProps) => {
  const { currentMELUser, setCurrentMELUser, getOverdueRentals } = useSupabaseMEL();

  const handleLogout = () => {
    setCurrentMELUser(null);
  };

  const overdueRentals = getOverdueRentals();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">
                Medical Equipment Library
              </h1>
              <p className="text-sm text-gray-600">
                Welcome, {currentMELUser?.full_name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="equipment" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="rental">New Rental</TabsTrigger>
            <TabsTrigger value="history">Rental History</TabsTrigger>
            <TabsTrigger value="overdue">Overdue ({overdueRentals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="equipment">
            <EquipmentList />
          </TabsContent>

          <TabsContent value="rental">
            <RentalForm />
          </TabsContent>

          <TabsContent value="history">
            <RentalHistory />
          </TabsContent>

          <TabsContent value="overdue">
            <Card>
              <CardHeader>
                <CardTitle>Overdue Equipment ({overdueRentals.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overdueRentals.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No overdue equipment.</p>
                  ) : (
                    overdueRentals.map((rental) => (
                      <div key={rental.id} className="p-4 border rounded-lg border-red-200 bg-red-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-red-800">{rental.equipment_name}</h4>
                          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">Overdue</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-red-700">
                          <p>Patient: {rental.patient_name}</p>
                          <p>Mobile: {rental.mobile_number}</p>
                          <p>Due: {new Date(rental.return_date).toLocaleDateString()}</p>
                          <p>Days Late: {Math.ceil((new Date().getTime() - new Date(rental.return_date).getTime()) / (1000 * 60 * 60 * 24))}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MELDashboard;
