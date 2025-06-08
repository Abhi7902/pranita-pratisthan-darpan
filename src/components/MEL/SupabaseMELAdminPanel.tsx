
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Trash2, Edit, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useSupabaseMEL } from '@/contexts/SupabaseMELContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SupabaseMELAdminPanelProps {
  onBackToUser: () => void;
}

const SupabaseMELAdminPanel = ({ onBackToUser }: SupabaseMELAdminPanelProps) => {
  const { createMELUser } = useAuth();
  const {
    equipment,
    melUsers,
    rentals,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    deleteMELUser,
    getOverdueRentals,
    refreshData,
    loading
  } = useSupabaseMEL();

  const [newEquipment, setNewEquipment] = useState({
    name: '',
    photo_url: '',
    total_quantity: 0,
    available_quantity: 0,
    rental_duration: 7,
    deposit_amount: 0
  });

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    full_name: '',
    email: ''
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file: File, folder: string = 'equipment') => {
    if (!file) return null;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('equipment')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('equipment')
        .getPublicUrl(filePath);

      setUploading(false);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      setUploading(false);
      return null;
    }
  };

  const handleAddEquipment = async () => {
    if (!newEquipment.name) {
      toast.error('Equipment name is required');
      return;
    }

    try {
      await addEquipment(newEquipment);
      setNewEquipment({
        name: '',
        photo_url: '',
        total_quantity: 0,
        available_quantity: 0,
        rental_duration: 7,
        deposit_amount: 0
      });
    } catch (error) {
      console.error('Error adding equipment:', error);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password || !newUser.full_name || !newUser.email) {
      toast.error('All fields are required');
      return;
    }

    const { error } = await createMELUser({
      username: newUser.username,
      password: newUser.password,
      fullName: newUser.full_name,
      email: newUser.email
    });

    if (error) {
      toast.error('Failed to create user: ' + error.message);
    } else {
      toast.success('MEL user created successfully!');
      setNewUser({
        username: '',
        password: '',
        full_name: '',
        email: ''
      });
      await refreshData();
    }
  };

  const overdueRentals = getOverdueRentals();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onBackToUser}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">
                  MEL Admin Panel
                </h1>
                <p className="text-sm text-gray-600">
                  Medical Equipment Library Administration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="equipment" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="rentals">Rentals</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>

          <TabsContent value="equipment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Equipment name"
                    value={newEquipment.name}
                    onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                  />
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const photoUrl = await handleImageUpload(file);
                          if (photoUrl) {
                            setNewEquipment({...newEquipment, photo_url: photoUrl});
                          }
                        }
                      }}
                      disabled={uploading}
                    />
                    {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                  </div>
                  <Input
                    type="number"
                    placeholder="Total quantity"
                    value={newEquipment.total_quantity}
                    onChange={(e) => setNewEquipment({...newEquipment, total_quantity: parseInt(e.target.value) || 0})}
                  />
                  <Input
                    type="number"
                    placeholder="Available quantity"
                    value={newEquipment.available_quantity}
                    onChange={(e) => setNewEquipment({...newEquipment, available_quantity: parseInt(e.target.value) || 0})}
                  />
                  <Input
                    type="number"
                    placeholder="Rental duration (days)"
                    value={newEquipment.rental_duration}
                    onChange={(e) => setNewEquipment({...newEquipment, rental_duration: parseInt(e.target.value) || 7})}
                  />
                  <Input
                    type="number"
                    placeholder="Deposit amount (₹)"
                    value={newEquipment.deposit_amount}
                    onChange={(e) => setNewEquipment({...newEquipment, deposit_amount: parseInt(e.target.value) || 0})}
                  />
                </div>
                <Button onClick={handleAddEquipment} className="mt-4" disabled={uploading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Equipment
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Equipment ({equipment.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipment.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {item.photo_url && (
                          <img src={item.photo_url} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Available: {item.available_quantity}/{item.total_quantity} | 
                            Duration: {item.rental_duration} days | 
                            Deposit: ₹{item.deposit_amount}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600"
                          onClick={() => deleteEquipment(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New MEL User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  />
                  <Input
                    placeholder="Full Name"
                    value={newUser.full_name}
                    onChange={(e) => setNewUser({...newUser, full_name: e.target.value})}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddUser} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create MEL User
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MEL Users ({melUsers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {melUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{user.full_name}</h4>
                        <p className="text-sm text-gray-600">
                          Username: {user.username} | Email: {user.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Created: {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600"
                        onClick={() => deleteMELUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rentals">
            <Card>
              <CardHeader>
                <CardTitle>All Rentals ({rentals.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rentals.map((rental) => (
                    <div key={rental.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{rental.equipment_name}</h4>
                        <Badge variant={rental.status === 'returned' ? 'secondary' : 'default'}>
                          {rental.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <p>Patient: {rental.patient_name}</p>
                        <p>Mobile: {rental.mobile_number}</p>
                        <p>Pickup: {new Date(rental.pickup_date).toLocaleDateString()}</p>
                        <p>Return: {new Date(rental.return_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                          <Badge variant="destructive">Overdue</Badge>
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

export default SupabaseMELAdminPanel;
