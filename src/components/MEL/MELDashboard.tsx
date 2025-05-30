
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMELContext } from '@/contexts/MELContext';
import { LogOut, Settings } from 'lucide-react';
import EquipmentList from './EquipmentList';
import RentalForm from './RentalForm';
import RentalHistory from './RentalHistory';

interface MELDashboardProps {
  onAdminAccess: () => void;
}

const MELDashboard = ({ onAdminAccess }: MELDashboardProps) => {
  const { currentMELUser, setCurrentMELUser } = useMELContext();

  const handleLogout = () => {
    setCurrentMELUser(null);
  };

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
                Welcome, {currentMELUser?.fullName}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onAdminAccess}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Button>
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="rental">New Rental</TabsTrigger>
            <TabsTrigger value="history">Rental History</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default MELDashboard;
