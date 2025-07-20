import React from "react";
import { Button } from "@/components/ui/Button";
import logo from "../../public/logo.png";

interface NavItem {
  link: string
  name: string
}

const userNavItems: NavItem[] = [
  {
    link: "/Dashboard",
    name: "Dashboard"
  },
  {
    link: "/Issues",
    name: "Issues"
  },
  {
    link: "/Assets",
    name: "Assets"
  },
  {
    link: "/Reports",
    name: "Reports"
  }
]

const guestNavItems: NavItem[] = [
  {
    link: "/about",
    name: "About Us"
  },
  {
    link: "/pricing",
    name: "Pricing"
  },
  {
    link: "/docs",
    name: "Documents"
  },
  {
    link: "/contact",
    name: "Contact"
  }
]

const UNavBar: React.FC = () => {
  const loggedIn = true

  return (
    <nav className="border-b border-muted-foreground bg-background py-3 px-8 font-sans">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          <img src={logo} alt="logo" height={40} className="h-10 w-auto"/>
          <ul className="flex list-none space-x-6 text-sm font-medium text-muted-foreground">
            {
              (loggedIn ? userNavItems : guestNavItems).map((navItem, index) => (
                <li key={index}>
                  <a href={navItem.link} className="hover:text-foreground transition-colors">
                    {navItem.name}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {
            loggedIn && <span className="text-sm font-medium text-muted-foreground">Welcome, User!</span>
          }
          <Button variant="outline" className="text-sm px-4 py-1.5 h-auto">
            {loggedIn ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default UNavBar;
