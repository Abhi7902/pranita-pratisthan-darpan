import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { useMELContext } from '@/contexts/MELContext';

interface MELAdminPanelProps {
  onBackToUser: () => void;
}

const MELAdminPanel = ({ onBackToUser }: MELAdminPanelProps) => {
  const {
    equipment,
    melUsers,
    rentals,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    addMELUser,
    deleteMELUser,
    getOverdueRentals
  } = useMELContext();

  const [newEquipment, setNewEquipment] = useState({
    name: '',
    photo: '',
    totalQuantity: 0,
    availableQuantity: 0,
    rentalDuration: 7,
    depositAmount: 0
  });

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    fullName: '',
    email: ''
  });

  const handleAddEquipment = () => {
    if (!newEquipment.name) {
      toast.error('Equipment name is required');
      return;
    }

    addEquipment({
      id: Date.now().toString(),
      ...newEquipment
    });

    setNewEquipment({
      name: '',
      photo: '',
      totalQuantity: 0,
      availableQuantity: 0,
      rentalDuration: 7,
      depositAmount: 0
    });

    toast.success('Equipment added successfully!');
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password) {
      toast.error('Username and password are required');
      return;
    }

    addMELUser({
      id: Date.now().toString(),
      ...newUser,
      createdAt: new Date().toISOString().split('T')[0]
    });

    setNewUser({
      username: '',
      password: '',
      fullName: '',
      email: ''
    });

    toast.success('User added successfully!');
  };

  const overdueRentals = getOverdueRentals();

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
                    placeholder="Enter equipment name (e.g., Blood Pressure Monitor)"
                    value={newEquipment.name}
                    onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                  />
                  <Input
                    placeholder="Equipment photo URL (e.g., https://example.com/image.jpg)"
                    value={newEquipment.photo}
                    onChange={(e) => setNewEquipment({...newEquipment, photo: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Total quantity available (e.g., 10)"
                    value={newEquipment.totalQuantity}
                    onChange={(e) => setNewEquipment({...newEquipment, totalQuantity: parseInt(e.target.value) || 0})}
                  />
                  <Input
                    type="number"
                    placeholder="Currently available quantity (e.g., 8)"
                    value={newEquipment.availableQuantity}
                    onChange={(e) => setNewEquipment({...newEquipment, availableQuantity: parseInt(e.target.value) || 0})}
                  />
                  <Input
                    type="number"
                    placeholder="Rental duration in days (e.g., 7)"
                    value={newEquipment.rentalDuration}
                    onChange={(e) => setNewEquipment({...newEquipment, rentalDuration: parseInt(e.target.value) || 7})}
                  />
                  <Input
                    type="number"
                    placeholder="Deposit amount in ₹ (e.g., 500)"
                    value={newEquipment.depositAmount}
                    onChange={(e) => setNewEquipment({...newEquipment, depositAmount: parseInt(e.target.value) || 0})}
                  />
                </div>
                <Button onClick={handleAddEquipment} className="mt-4">
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
                        <img src={item.photo} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Available: {item.availableQuantity}/{item.totalQuantity} | 
                            Duration: {item.rentalDuration} days | 
                            Deposit: ₹{item.depositAmount}
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
                <CardTitle>Add New MEL User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  />
                  <Input
                    placeholder="Full Name"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddUser} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
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
                        <h4 className="font-medium">{user.fullName}</h4>
                        <p className="text-sm text-gray-600">
                          Username: {user.username} | Email: {user.email} | Created: {user.createdAt}
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
                        <h4 className="font-medium">{rental.equipmentName}</h4>
                        <Badge variant={rental.status === 'returned' ? 'secondary' : 'default'}>
                          {rental.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <p>Patient: {rental.patientName}</p>
                        <p>Mobile: {rental.mobileNumber}</p>
                        <p>Pickup: {new Date(rental.pickupDate).toLocaleDateString()}</p>
                        <p>Return: {new Date(rental.returnDate).toLocaleDateString()}</p>
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
                          <h4 className="font-medium text-red-800">{rental.equipmentName}</h4>
                          <Badge variant="destructive">Overdue</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-red-700">
                          <p>Patient: {rental.patientName}</p>
                          <p>Mobile: {rental.mobileNumber}</p>
                          <p>Due: {new Date(rental.returnDate).toLocaleDateString()}</p>
                          <p>Days Late: {Math.ceil((new Date().getTime() - new Date(rental.returnDate).getTime()) / (1000 * 60 * 60 * 24))}</p>
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

export default MELAdminPanel;
