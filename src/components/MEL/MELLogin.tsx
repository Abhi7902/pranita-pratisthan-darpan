
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useMELContext } from '@/contexts/MELContext';

interface MELLoginProps {
  onAdminAccess: () => void;
}

const MELLogin = ({ onAdminAccess }: MELLoginProps) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { melUsers, setCurrentMELUser } = useMELContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin credentials
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      onAdminAccess();
      toast.success('Admin login successful!');
      return;
    }

    const user = melUsers.find(u => 
      u.username === credentials.username && u.password === credentials.password
    );

    if (user) {
      setCurrentMELUser(user);
      toast.success('MEL login successful!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">
            Medical Equipment Library
          </CardTitle>
          <p className="text-gray-600">User Login</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <Input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Demo User: meluser1 / mel123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MELLogin;
