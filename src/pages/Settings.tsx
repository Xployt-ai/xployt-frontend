import React, { useState, useEffect } from 'react';
import { User, CreditCard, Activity, DollarSign, Trash2, LogOut } from 'lucide-react';
import Bill from "./Bill";
import Usage from './Usage';
import Topup from './topup';
import Profile from './Profile';
import { authEndpoints } from '@/data/network/auth';
import type { User as UserModel } from '@/data/models/user';

interface UserType {
  name: string;
  username: string;
  email: string;
  avatar: string;
  plan: string;
  scansUsed: number;
  scansLimit: number;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<'profile' | 'subscription' | 'usage' | 'topup' | 'notifications' | 'security' | 'api' | 'delete'>('profile');
  const [user, setUser] = useState<UserType>({
    name: 'Loading...',
    username: 'loading',
    email: 'loading@example.com',
    avatar: 'L',
    plan: 'Pro',
    scansUsed: 47,
    scansLimit: 100
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData: UserModel = await authEndpoints.getCurrentUser();
        setUser({
          name: userData.username || 'User',
          username: userData.username || 'user',
          email: userData.email || 'user@example.com',
          avatar: userData.username ? userData.username.charAt(0).toUpperCase() : 'U',
          plan: 'Pro', // Default value, can be fetched from another endpoint if available
          scansUsed: 47, // Default value, can be fetched from another endpoint if available
          scansLimit: 100 // Default value, can be fetched from another endpoint if available
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Keep default values on error
        setUser({
          name: 'Madushika Marapana',
          username: 'madushika02',
          email: 'madushika@example.com',
          avatar: 'M',
          plan: 'Pro',
          scansUsed: 47,
          scansLimit: 100
        });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="justify-center  items-center flex bg-background ">
    <div className="min-h-[80vh]  w-6xl font-sans flex   justify-center">
      <aside className="w-72  border-r border-gray-600 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">Settings</h1>
          <div className="flex items-center gap-3 mt-4 p-3  rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.avatar}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{user.name}</p>
              <p className="text-gray-400 text-xs">@{user.username}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1 flex-grow">
          
          <NavItem icon={<User size={18} />} label="Profile" active={activeSection === 'profile'} onClick={() => setActiveSection('profile')} />
          <NavItem icon={<CreditCard size={18} />} label="Subscription" active={activeSection === 'subscription'} onClick={() => setActiveSection('subscription')} />
          <NavItem icon={<Activity size={18} />} label="Usage" active={activeSection === 'usage'} onClick={() => setActiveSection('usage')} />
          <NavItem icon={<DollarSign size={18} />} label="Top Up" active={activeSection === 'topup'} onClick={() => setActiveSection('topup')} />

        </nav>

        <div className="pt-4 mt-4 border-t border-gray-600">
          <NavItem icon={<Trash2 size={18} />} label="Delete Account" active={activeSection === 'delete'} onClick={() => setActiveSection('delete')} danger />
          <NavItem icon={<LogOut size={18} />} label="Sign Out" onClick={() => alert('Signing out...')} />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {activeSection === "profile" && <Profile user={user} />}
        {activeSection === "subscription" && <Bill />}
        {activeSection === "usage" && <Usage />}
        {activeSection === "topup" && <Topup />}
      </main>
    </div>
    </div>
  );
}

// NavItem component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  danger?: boolean;
}

function NavItem({ icon, label, active, onClick, danger }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-slate-800 text-white'
          : danger
          ? 'text-red-400 hover:bg-red-500/10'
          : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
