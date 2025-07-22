import React from 'react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import logo from '../../public/logo.png';

interface NavItem {
  link: string;
  name: string;
}

const userNavItems: NavItem[] = [
  {
    link: '/Dashboard',
    name: 'Dashboard',
  },
  {
    link: '/Issues',
    name: 'Issues',
  },
  {
    link: '/Assets',
    name: 'Assets',
  },
  {
    link: '/Reports',
    name: 'Reports',
  },
];

const guestNavItems: NavItem[] = [
  {
    link: '/about',
    name: 'About Us',
  },
  {
    link: '/bill',
    name: 'Pricing',
  },
  {
    link: '/docs',
    name: 'Documents',
  },
  {
    link: '/contact',
    name: 'Contact',
  },
];

const UNavBar: React.FC = () => {
  const { user, login, logout, loading } = useAuth();
  const loggedIn = !!user;

  const handleAuthClick = () => {
    if (loggedIn) {
      logout();
    } else {
      login();
    }
  };

  if (loading) {
    return (
      <nav className="border-muted-foreground bg-background border-b px-8 py-3 font-sans">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/">
              <img src={logo} alt="logo" height={40} className="h-10 w-auto" />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground text-sm">Loading...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-muted-foreground bg-background border-b px-8 py-3 font-sans">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          <a href="/">
            <img src={logo} alt="logo" height={40} className="h-10 w-auto" />
          </a>
          <ul className="text-muted-foreground flex list-none space-x-6 text-sm font-medium">
            {(loggedIn ? userNavItems : guestNavItems).map((navItem, index) => (
              <li key={index}>
                <a href={navItem.link} className="hover:text-foreground transition-colors">
                  {navItem.name}
                </a>
              </li>
            ))}
          </ul>
          {
            loggedIn && user && (
              <Button>
                <a href="/repo-import" className="hover:text-foreground transition-colors">
                  Import Repo
                </a>
              </Button>
            )
          }
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {loggedIn && user && (
            <span className="text-muted-foreground text-sm font-medium">
              Welcome, {user.username || user.email || 'User'}!
            </span>
          )}
          <Button
            variant="outline"
            className="h-auto px-4 py-1.5 text-sm"
            onClick={handleAuthClick}
          >
            {loggedIn ? 'Logout' : 'Login'}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default UNavBar;
