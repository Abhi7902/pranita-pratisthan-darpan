
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isMELUser: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  createMELUser: (userData: { email: string; password: string; fullName: string; username: string }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMELUser, setIsMELUser] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check if user is admin or MEL user
          setTimeout(async () => {
            try {
              console.log('Checking admin status for user:', session.user.id, session.user.email);
              
              // Check if user is admin - just check if they exist in admins table
              const { data: adminData, error: adminError } = await supabase
                .from('admins')
                .select('*')
                .eq('user_id', session.user.id)
                .single();

              console.log('Admin query result:', adminData, adminError);
              
              const { data: melData, error: melError } = await supabase
                .from('mel_users')
                .select('*')
                .eq('user_id', session.user.id)
                .single();

              console.log('MEL query result:', melData, melError);

              setIsAdmin(!!adminData && !adminError);
              setIsMELUser(!!melData && !melError);
              
              console.log('Final roles:', { isAdmin: !!adminData && !adminError, isMELUser: !!melData && !melError });
            } catch (error) {
              console.error('Error checking user roles:', error);
              setIsAdmin(false);
              setIsMELUser(false);
            }
          }, 0);
        } else {
          setIsAdmin(false);
          setIsMELUser(false);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setIsMELUser(false);
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { error };
  };

  const createMELUser = async (userData: { email: string; password: string; fullName: string; username: string }) => {
    // Only admin can create MEL users
    if (!isAdmin) {
      return { error: { message: 'Unauthorized' } };
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true
    });

    if (authError) {
      return { error: authError };
    }

    // Create MEL user record
    const { error: melError } = await supabase
      .from('mel_users')
      .insert({
        user_id: authData.user.id,
        username: userData.username,
        full_name: userData.fullName,
        email: userData.email
      });

    return { error: melError };
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    isMELUser,
    signIn,
    signOut,
    updatePassword,
    createMELUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
