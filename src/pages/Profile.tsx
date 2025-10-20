import { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
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
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [plan, setPlan] = useState('Free');

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
        setGithubUrl(userData.username ? `https://github.com/${userData.username}` : '');
        
        // Use plan from initialUser (comes from Settings)
        setPlan(initialUser.plan || 'Free');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Use initial user data as fallback
        setName(initialUser.name);
        setUsername(initialUser.username);
        setGithubUrl(initialUser.username ? `https://github.com/${initialUser.username}` : '');
        setPlan(initialUser.plan);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [initialUser]);

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

          {/* GitHub URL Field */}
          <div>
            <label className="block text-sm text-muted-foreground mb-2">GitHub Profile</label>
            {githubUrl ? (
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-4 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                  <Github size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-400 mb-0.5">GitHub</p>
                  <p className="text-white font-medium truncate group-hover:text-slate-100">{username}</p>
                </div>
                <svg 
                  className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <div className="flex items-center gap-3 w-full bg-slate-900/30 border border-slate-700/50 rounded-lg px-4 py-4">
                <div className="flex-shrink-0 w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center">
                  <Github size={20} className="text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500">No GitHub profile linked</p>
                </div>
              </div>
            )}
          </div>

          {/* Plan Information */}
          <div className="pt-6 border-t border-gray-600">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="bg-card rounded-lg p-4 border border-gray-600">
              <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
              <p className="text-xl font-semibold">{plan}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
