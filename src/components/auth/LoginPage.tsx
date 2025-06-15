import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Home } from 'lucide-react';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn(credentials.email, credentials.password);
    
    if (result.error) {
      toast.error('Login failed: ' + result.error.message);
    } else {
      toast.success('Login successful!');
      
      // Redirect based on user role
      if (result.isAdmin) {
        navigate('/admin');
      } else if (result.isMELUser) {
        navigate('/mel');
      } else {
        navigate('/');
      }
    }
    setLoading(false);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-marathi-orange">
            प्रणिता प्रतिष्ठान
          </CardTitle>
          <p className="text-gray-600">Admin & MEL Login</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email / Username
              </label>
              <Input
                type="text"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Enter your email or username"
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
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                type="submit" 
                className="w-full bg-marathi-orange hover:bg-marathi-deepOrange"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleHome}
                className="w-full flex items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            </div>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Only authorized users can access this system.</p>
            <p>Contact administrator for access.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
