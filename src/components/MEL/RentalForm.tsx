
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useMELContext } from '@/contexts/MELContext';

const RentalForm = () => {
  const { equipment, addRental, currentMELUser } = useMELContext();
  const [formData, setFormData] = useState({
    patientName: '',
    address: '',
    mobileNumber: '',
    aadharNumber: '',
    equipmentId: '',
    pickupDate: new Date().toISOString().split('T')[0]
  });

  const selectedEquipment = equipment.find(eq => eq.id === formData.equipmentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEquipment || selectedEquipment.availableQuantity === 0) {
      toast.error('Selected equipment is not available');
      return;
    }

    if (!currentMELUser) {
      toast.error('User not logged in');
      return;
    }

    const pickupDate = new Date(formData.pickupDate);
    const returnDate = new Date(pickupDate);
    returnDate.setDate(returnDate.getDate() + selectedEquipment.rentalDuration);

    const rental = {
      id: Date.now().toString(),
      patientName: formData.patientName,
      address: formData.address,
      mobileNumber: formData.mobileNumber,
      aadharNumber: formData.aadharNumber,
      equipmentId: formData.equipmentId,
      equipmentName: selectedEquipment.name,
      depositAmount: selectedEquipment.depositAmount,
      pickupDate: formData.pickupDate,
      returnDate: returnDate.toISOString().split('T')[0],
      status: 'active' as const,
      userId: currentMELUser.id
    };

    addRental(rental);
    toast.success('Rental created successfully!');
    
    // Reset form
    setFormData({
      patientName: '',
      address: '',
      mobileNumber: '',
      aadharNumber: '',
      equipmentId: '',
      pickupDate: new Date().toISOString().split('T')[0]
    });
  };

  const availableEquipment = equipment.filter(eq => eq.availableQuantity > 0);

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
                Aadhar Number *
              </label>
              <Input
                value={formData.aadharNumber}
                onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
                pattern="[0-9]{12}"
                title="Please enter a valid 12-digit Aadhar number"
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
                      {item.name} (Available: {item.availableQuantity})
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows={3}
              required
            />
          </div>

          {selectedEquipment && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Rental Details:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>Equipment: {selectedEquipment.name}</p>
                <p>Rental Duration: {selectedEquipment.rentalDuration} days</p>
                <p>Deposit Amount: ₹{selectedEquipment.depositAmount}</p>
                {formData.pickupDate && (
                  <p>Return Date: {new Date(new Date(formData.pickupDate).getTime() + selectedEquipment.rentalDuration * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
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
