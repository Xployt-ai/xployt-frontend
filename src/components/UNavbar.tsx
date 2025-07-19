import React from "react";
import { Button } from "@/components/ui/Button";
import logo from "../../public/logo.png"; 

const UNavBar: React.FC = () => {
  return (
    <nav className="border-b border-muted-foreground bg-background py-3 px-8 font-sans">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <div className="flex items-center space-x-8">
          <img src={logo} alt="logo" height={40} className="h-10 w-auto" />
          <ul className="flex list-none space-x-6 text-sm font-medium text-muted-foreground">
            <li>
              <a href="/Dashboard" className="hover:text-foreground transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/Issues" className="hover:text-foreground transition-colors">
                Issues
              </a>
            </li>
            <li>
              <a href="/Assets" className="hover:text-foreground transition-colors">
                Assets
              </a>
            </li>
            <li>
              <a href="/bill" className="hover:text-foreground transition-colors">
                Bill
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-muted-foreground">Welcome, User!</span>
          <Button variant="outline" className="text-sm px-4 py-1.5 h-auto">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default UNavBar;
