import React from 'react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import logo from '../../public/logo.png';
import { useNavigate, useLocation } from "react-router-dom";

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
  { name: "Home", link: "/" },
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

const Navbar: React.FC = () => {
  const { user, login, logout, loading } = useAuth();
  const loggedIn = !!user;
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActiveLink = (path: string) => location.pathname === path;
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);

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
    <nav className="border-muted-foreground bg-background border-b px-8 py-3 font-sans relative">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" height={40} className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex text-muted-foreground items-center space-x-6 ml-2 text-sm font-medium">
            {(loggedIn ? userNavItems : guestNavItems).map((navItem) => (
              <button
                key={navItem.name}
                onClick={() => navigate(navItem.link)}
                className="hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                {navItem.name}
              </button>
            ))}
            {loggedIn && user && (
              <Button onClick={() => navigate("/repo-import")}>Import Repo</Button>
            )}
          </div>
        </div>
        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-2">
          {loggedIn && user && (
            <span className="text-muted-foreground text-sm font-medium">
              Welcome, {user.username || user.email || 'User'}!
            </span>
          )}
          {!loggedIn ? (
            <>
              <Button
                onClick={handleAuthClick}
                className="h-auto px-4 py-1.5 text-sm"
                variant="outline"
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="h-auto px-4 py-1.5 text-sm"
              onClick={handleAuthClick}
            >
              Logout
            </Button>
          )}
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#181C25] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg
              className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close icon */}
            <svg
              className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background rounded-b-lg shadow-lg z-50 md:hidden">
            <div className="flex flex-col items-start px-4 py-4 space-y-2">
              {(loggedIn ? userNavItems : guestNavItems).map((navItem) => (
                <button
                  key={navItem.name}
                  onClick={() => {
                    navigate(navItem.link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded font-medium transition-colors duration-200 text-muted-foreground ${
                    isActiveLink(navItem.link)
                      ? "bg-[#181C25] text-white"
                      : "hover:bg-[#181C25] hover:text-white text-white/80"
                  }`}
                >
                  {navItem.name}
                </button>
              ))}
              {loggedIn && user && (
                <Button
                  onClick={() => {
                    navigate("/repo-import");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Import Repo
                </Button>
              )}
              {!loggedIn ? (
                <>
                  <button
                    onClick={() => {
                      handleAuthClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="border border-white text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-[#181C25] font-medium w-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      handleAuthClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-white text-black px-4 py-2 rounded font-medium transition-colors duration-200 w-full"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="h-auto px-4 py-1.5 text-sm w-full"
                  onClick={() => {
                    handleAuthClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
