
import { useMELContext } from '@/contexts/MELContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const RentalHistory = () => {
  const { rentals, markEquipmentReturned, currentMELUser } = useMELContext();

  const userRentals = rentals.filter(rental => rental.userId === currentMELUser?.id);

  const handleMarkReturned = (rentalId: string) => {
    markEquipmentReturned(rentalId);
    toast.success('Equipment marked as returned successfully!');
  };

  const getStatusBadge = (rental: any) => {
    const currentDate = new Date();
    const returnDate = new Date(rental.returnDate);
    
    if (rental.status === 'returned') {
      return <Badge variant="secondary">Returned</Badge>;
    } else if (currentDate > returnDate) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else {
      return <Badge variant="default">Active</Badge>;
    }
  };

  const getDaysRemaining = (returnDate: string) => {
    const currentDate = new Date();
    const targetDate = new Date(returnDate);
    const diffTime = targetDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else {
      return `${diffDays} days remaining`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {userRentals.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No rental history found.</p>
            </CardContent>
          </Card>
        ) : (
          userRentals.map((rental) => (
            <Card key={rental.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{rental.equipmentName}</CardTitle>
                {getStatusBadge(rental)}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Patient:</p>
                    <p>{rental.patientName}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-700">Mobile:</p>
                    <p>{rental.mobileNumber}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-700">Pickup Date:</p>
                    <p>{new Date(rental.pickupDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-700">Return Date:</p>
                    <p>{new Date(rental.returnDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-700">Deposit:</p>
                    <p>₹{rental.depositAmount}</p>
                  </div>
                  
                  {rental.status === 'active' && (
                    <div>
                      <p className="font-medium text-gray-700">Status:</p>
                      <p className={new Date() > new Date(rental.returnDate) ? 'text-red-600 font-medium' : 'text-green-600'}>
                        {getDaysRemaining(rental.returnDate)}
                      </p>
                    </div>
                  )}
                  
                  {rental.actualReturnDate && (
                    <div>
                      <p className="font-medium text-gray-700">Returned On:</p>
                      <p>{new Date(rental.actualReturnDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <p className="font-medium text-gray-700 mb-1">Address:</p>
                  <p className="text-sm">{rental.address}</p>
                </div>
                
                {rental.status === 'active' && (
                  <div className="mt-4">
                    <Button 
                      onClick={() => handleMarkReturned(rental.id)}
                      variant="outline"
                      size="sm"
                    >
                      Mark as Returned
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RentalHistory;
