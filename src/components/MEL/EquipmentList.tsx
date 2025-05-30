
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMELContext } from '@/contexts/MELContext';

const EquipmentList = () => {
  const { equipment } = useMELContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {equipment.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="aspect-video relative">
            <img
              src={item.photo}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge variant={item.availableQuantity > 0 ? "default" : "destructive"}>
                {item.availableQuantity > 0 ? 'Available' : 'Out of Stock'}
              </Badge>
            </div>
          </div>
          
          <CardHeader>
            <CardTitle className="text-lg">{item.name}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Available:</span>
              <span className="font-semibold">
                {item.availableQuantity} / {item.totalQuantity}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Rental Period:</span>
              <span>{item.rentalDuration} days</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Deposit:</span>
              <span className="font-semibold">₹{item.depositAmount}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EquipmentList;
