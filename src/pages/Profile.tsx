import { useState, useEffect } from 'react';
import { authEndpoints } from '@/data/network/auth';
import type { User } from '@/data/models/user';

interface UserType {
  name: string;
  username: string;
  email: string;
  avatar: string;
  plan: string;
  scansUsed: number;
  scansLimit: number;
}

interface ProfileProps {
  user: UserType;
}

export default function Profile({ user: initialUser }: ProfileProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('Pro');
  const [scansUsed, setScansUsed] = useState(0);
  const [scansLimit, setScansLimit] = useState(100);

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Fetch user profile data
        const userData: User = await authEndpoints.getCurrentUser();
        console.log('Fetched user data:', userData);
        
        setName(userData.username || '');
        setUsername(userData.username || '');
        setEmail(userData.email || '');
        
        // TODO: Fetch plan and scans data from appropriate endpoint when available
        setPlan('Pro');
        setScansUsed(47);
        setScansLimit(100);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Use initial user data as fallback
        setName(initialUser.name);
        setUsername(initialUser.username);
        setEmail(initialUser.email);
        setPlan(initialUser.plan);
        setScansUsed(initialUser.scansUsed);
        setScansLimit(initialUser.scansLimit);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [initialUser]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API endpoint for updating user profile
      console.log('Saving profile data:', {
        name,
        username,
        email,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 py-8 max-w-5xl mx-auto space-y-8 min-h-[80vh]">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-5xl mx-auto space-y-8 min-h-[80vh]">
      <section>
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
            />
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-background border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
            />
          </div>

          {/* Plan Information */}
          <div className="pt-6 border-t border-gray-600">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-4 border border-gray-600">
                <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                <p className="text-xl font-semibold">{plan}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-gray-600">
                <p className="text-sm text-muted-foreground mb-1">Scans Used</p>
                <p className="text-xl font-semibold">{scansUsed} / {scansLimit}</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
