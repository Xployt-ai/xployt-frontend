import { useState, useEffect } from 'react';
import { User, CreditCard, Activity, DollarSign } from 'lucide-react';
import Bill from "./Bill";
import Usage from './Usage';
import Topup from './topup';
import Profile from './Profile';
import PaymentModal from '@/components/PaymentModal';
import { authEndpoints } from '@/data/network/auth';
import { subscriptionEndpoints } from '@/data/network/subscription';
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
  // Initialize activeSection from localStorage or default to 'profile'
  const [activeSection, setActiveSection] = useState<'profile' | 'subscription' | 'usage' | 'topup'>(() => {
    const saved = localStorage.getItem('settings_active_tab');
    if (saved && ['profile', 'subscription', 'usage', 'topup'].includes(saved)) {
      return saved as 'profile' | 'subscription' | 'usage' | 'topup';
    }
    return 'profile';
  });
  const [user, setUser] = useState<UserType>({
    name: 'Loading...',
    username: 'loading',
    email: 'loading@example.com',
    avatar: 'L',
    plan: 'Free',
    scansUsed: 47,
    scansLimit: 100
  });

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [topupRefreshKey, setTopupRefreshKey] = useState(0);
  const [billRefreshKey, setBillRefreshKey] = useState(0);

  // Save active section to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('settings_active_tab', activeSection);
  }, [activeSection]);

  // Trigger refresh when topup section becomes active
  useEffect(() => {
    if (activeSection === 'topup') {
      setTopupRefreshKey(prev => prev + 1);
    }
  }, [activeSection]);

  const fetchUser = async () => {
    try {
      const userData: UserModel = await authEndpoints.getCurrentUser();
      // Start from current plan and only update if subscription info is available
      let nextPlan = user.plan;
      try {
        const pro = await subscriptionEndpoints.getProStatus();
        if (pro) {
          if (pro.is_pro && !pro.is_cancelled) nextPlan = 'Pro';
          else if (pro.is_cancelled) nextPlan = 'Expired';
          else nextPlan = 'Free';
        }
      } catch (subErr) {
        console.warn('Could not fetch subscription status; keeping existing plan', subErr);
      }

      // Update only with values we actually received; keep existing values otherwise
      setUser((prev) => ({
        name: userData.username || prev.name,
        username: userData.username || prev.username,
        email: userData.email || prev.email,
        avatar: userData.username ? userData.username.charAt(0).toUpperCase() : prev.avatar,
        plan: nextPlan,
        scansUsed: prev.scansUsed,
        scansLimit: prev.scansLimit,
      }));
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // Do not overwrite with hard-coded defaults on error; keep existing state
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubscriptionChange = async () => {
    // Save current active section before refresh
    localStorage.setItem('settings_active_tab', activeSection);
    
    // Small delay to ensure backend has processed the change
    await new Promise(resolve => setTimeout(resolve, 500));
    await fetchUser();
    setBillRefreshKey(prev => prev + 1);
    
    // Refresh the page to ensure all data is updated
    window.location.reload();
  };

  const handlePaymentSuccess = async () => {
    // Save current active section before refresh
    localStorage.setItem('settings_active_tab', activeSection);
    
    setPaymentOpen(false);
    // Small delay to ensure backend has processed the payment
    await new Promise(resolve => setTimeout(resolve, 500));
    await fetchUser();
    setBillRefreshKey(prev => prev + 1);
    
    // Refresh the page to ensure all data is updated
    window.location.reload();
  };

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
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {activeSection === "profile" && <Profile user={user} />}
        {activeSection === "subscription" && (
          <div>
            <Bill 
              key={`${user.plan}-${billRefreshKey}`}
              plan={user.plan} 
              onUpgrade={() => setPaymentOpen(true)}
              onStatusChange={handleSubscriptionChange}
            />
            <PaymentModal 
              open={paymentOpen} 
              onClose={() => setPaymentOpen(false)} 
              onSuccess={handlePaymentSuccess} 
            />
          </div>
        )}
        {activeSection === "usage" && <Usage />}
        {activeSection === "topup" && <Topup key={topupRefreshKey} />}
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
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-slate-800 text-white'
          : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
