
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useSupabaseMEL } from '@/contexts/SupabaseMELContext';
import { useAuth } from '@/contexts/AuthContext';

const RentalForm = () => {
  const { equipment, addRental } = useSupabaseMEL();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    equipmentId: '',
    pickupDate: new Date().toISOString().split('T')[0]
  });

  const selectedEquipment = equipment.find(eq => eq.id === formData.equipmentId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEquipment || selectedEquipment.available_quantity === 0) {
      toast.error('Selected equipment is not available');
      return;
    }

    if (!user) {
      toast.error('User not logged in');
      return;
    }

    const pickupDate = new Date(formData.pickupDate);
    const returnDate = new Date(pickupDate);
    returnDate.setDate(returnDate.getDate() + selectedEquipment.rental_duration);

    const rental = {
      patient_name: formData.patientName,
      mobile_number: formData.mobileNumber,
      equipment_id: formData.equipmentId,
      equipment_name: selectedEquipment.name,
      pickup_date: formData.pickupDate,
      return_date: returnDate.toISOString().split('T')[0],
      status: 'rented',
      created_by_user_id: user.id
    };

    try {
      await addRental(rental);
      toast.success('Rental created successfully!');
      
      // Reset form
      setFormData({
        patientName: '',
        mobileNumber: '',
        equipmentId: '',
        pickupDate: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error creating rental:', error);
      toast.error('Failed to create rental');
    }
  };

  const availableEquipment = equipment.filter(eq => eq.available_quantity > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Rental</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Name *
              </label>
              <Input
                value={formData.patientName}
                onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <Input
                value={formData.mobileNumber}
                onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit mobile number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment *
              </label>
              <Select 
                value={formData.equipmentId} 
                onValueChange={(value) => setFormData({...formData, equipmentId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  {availableEquipment.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} (Available: {item.available_quantity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Date *
              </label>
              <Input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                required
              />
            </div>
          </div>

          {selectedEquipment && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Rental Details:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>Equipment: {selectedEquipment.name}</p>
                <p>Rental Duration: {selectedEquipment.rental_duration} days</p>
                <p>Deposit Amount: ₹{selectedEquipment.deposit_amount}</p>
                {formData.pickupDate && (
                  <p>Return Date: {new Date(new Date(formData.pickupDate).getTime() + selectedEquipment.rental_duration * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Create Rental
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RentalForm;
