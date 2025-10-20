import React, { useState } from 'react';
import { User, CreditCard, Activity, Bell, Shield, Key, Trash2, LogOut } from 'lucide-react';
import Bill from "./Bill";
import Usage from './Usage';

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
  const [activeSection, setActiveSection] = useState<'profile' | 'subscription' | 'usage' | 'notifications' | 'security' | 'api' | 'delete'>('profile');

  const user: UserType = {
    name: 'Madushika Marapana',
    username: 'madushika02',
    email: 'madushika@example.com',
    avatar: 'M',
    plan: 'Pro',
    scansUsed: 47,
    scansLimit: 100
  };

  return (
    <div className="justify-center  items-center flex bg-background ">
    <div className="min-h-[80vh]  w-6xl font-sans flex   justify-center">
      <aside className="w-72  border-r border-slate-800 p-6 flex flex-col">
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

        </nav>

        <div className="pt-4 mt-4 border-t border-slate-800">
          <NavItem icon={<Trash2 size={18} />} label="Delete Account" active={activeSection === 'delete'} onClick={() => setActiveSection('delete')} danger />
          <NavItem icon={<LogOut size={18} />} label="Sign Out" onClick={() => alert('Signing out...')} />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {activeSection === "profile" && <ProfileSection user={user} />}
        {activeSection === "subscription" && <Bill />}
        {activeSection === "usage" && <Usage />}
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

// ProfileSection component (as you already defined)
interface ProfileSectionProps {
  user: UserType;
}
function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="max-w-3xl min-h-[80vh]">
      <h2 className="text-white text-3xl font-bold mb-8">Profile</h2>
      <div className="mb-8 pb-8 border-b border-slate-800 last:border-0">
        <label className="block text-gray-400 text-sm mb-2">Name</label>
        <input type="text" defaultValue={user.name} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
      </div>
    </div>
  );
}
