
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PasswordChangeModalProps {
  trigger?: React.ReactNode;
}

const PasswordChangeModal = ({ trigger }: PasswordChangeModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwords.new.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) throw error;

      toast.success('Password updated successfully');
      setPasswords({ current: '', new: '', confirm: '' });
      setIsOpen(false);
    } catch (error: any) {
      console.error('Password change error:', error);
      toast.error(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <KeyRound className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="current">Current Password</Label>
            <Input
              id="current"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="new">New Password</Label>
            <Input
              id="new"
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
              required
              minLength={6}
            />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input
              id="confirm"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
              required
              minLength={6}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChangeModal;
