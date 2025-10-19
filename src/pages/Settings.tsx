import React, { useState } from 'react';
import { User, CreditCard, Activity, Bell, Shield, Key, Trash2, LogOut } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-900 font-sans flex">
      <aside className="w-72 bg-slate-950 border-r border-slate-800 p-6">
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">Settings</h1>
          <div className="flex items-center gap-3 mt-4 p-3 bg-slate-800/50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.avatar}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{user.name}</p>
              <p className="text-gray-400 text-xs">@{user.username}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          <NavItem icon={<User size={18} />} label="Profile" active={activeSection === 'profile'} onClick={() => setActiveSection('profile')} />
          <NavItem icon={<CreditCard size={18} />} label="Subscription" active={activeSection === 'subscription'} onClick={() => setActiveSection('subscription')} />
          <NavItem icon={<Activity size={18} />} label="Usage" active={activeSection === 'usage'} onClick={() => setActiveSection('usage')} />
          <NavItem icon={<Bell size={18} />} label="Notifications" active={activeSection === 'notifications'} onClick={() => setActiveSection('notifications')} />
          <NavItem icon={<Shield size={18} />} label="Security" active={activeSection === 'security'} onClick={() => setActiveSection('security')} />
          <NavItem icon={<Key size={18} />} label="API Keys" active={activeSection === 'api'} onClick={() => setActiveSection('api')} />

          <div className="pt-4 mt-4 border-t border-slate-800">
            <NavItem icon={<Trash2 size={18} />} label="Delete Account" active={activeSection === 'delete'} onClick={() => setActiveSection('delete')} danger />
            <NavItem icon={<LogOut size={18} />} label="Sign Out" onClick={() => alert('Signing out...')} />
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeSection === 'profile' && <ProfileSection user={user} />}
        {activeSection === 'subscription' && <SubscriptionSection user={user} />}
        {activeSection === 'usage' && <UsageSection user={user} />}
        {activeSection === 'notifications' && <NotificationsSection />}
        {activeSection === 'security' && <SecuritySection />}
        {activeSection === 'api' && <APIKeysSection />}
        {activeSection === 'delete' && <DeleteAccountSection />}
      </main>
    </div>
  );
}

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

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-8 pb-8 border-b border-slate-800 last:border-0">
      <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  textarea?: boolean;
}

function Field({ label, value, textarea }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-400 text-sm mb-2">{label}</label>
      {textarea ? (
        <textarea
          defaultValue={value}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          rows={3}
        />
      ) : (
        <input
          type="text"
          defaultValue={value}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
        />
      )}
    </div>
  );
}

interface ProfileSectionProps {
  user: UserType;
}

function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="max-w-3xl">
      <h2 className="text-white text-3xl font-bold mb-8">Profile</h2>
      
      <Section title="Basic Information">
        <Field label="Name" value={user.name} />
        <Field label="Username" value={`@${user.username}`} />
        <Field label="Email" value={user.email} />
        <Field label="Bio" value="Full-stack developer passionate about security" textarea />
      </Section>

      <Section title="Avatar">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {user.avatar}
          </div>
          <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
            Upload New
          </button>
        </div>
      </Section>

      <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Save Changes
      </button>
    </div>
  );
}

// -- Continue the rest similarly: SubscriptionSection, UsageSection, NotificationsSection, SecuritySection, APIKeysSection, DeleteAccountSection
// Ensure all props are typed and optional props are handled (like time in SessionItem)
