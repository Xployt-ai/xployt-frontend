import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Pricing", path: "/pricing" },
        { name: "Documentation", path: "/docs" },
        { name: "Contact", path: "/contact" }
    ];

    const isActiveLink = (path: string) => location.pathname === path;
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="bg-[#0A0D14] rounded-lg mt-2 mx-2 px-4 py-2 flex items-center justify-between border border-white">
            {/* Left: Logo and Links */}
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
                    <img src="/logo.png" alt="Xployt.ai Logo" className="h-8 w-auto" />
                    <span className="text-[#E0E0E0] text-lg font-medium tracking-wide select-none"></span>
                </div>
                <div className="hidden md:flex items-center space-x-1 ml-2">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => navigate(link.path)}
                            className={`px-4 py-2 rounded font-medium transition-colors duration-200 text-white ${
                                isActiveLink(link.path)
                                    ? "bg-[#181C25] text-white"
                                    : "hover:bg-[#181C25] hover:text-white text-white/80"
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            </div>
            {/* Right: Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
                <button
                    onClick={() => navigate("/login")}
                    className="border border-white text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-[#181C25] font-medium"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate("/signup")}
                    className="bg-white text-black px-4 py-2 rounded font-medium transition-colors duration-200"
                >
                    Sign Up
                </button>
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
                <div className="absolute top-16 left-0 w-full bg-[#0A0D14] rounded-b-lg shadow-lg z-50 md:hidden">
                    <div className="flex flex-col items-start px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => {
                                    navigate(link.path);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 rounded font-medium transition-colors duration-200 text-white ${
                                    isActiveLink(link.path)
                                        ? "bg-[#181C25] text-white"
                                        : "hover:bg-[#181C25] hover:text-white text-white/80"
                                }`}
                            >
                                {link.name}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                navigate("/login");
                                setIsMobileMenuOpen(false);
                            }}
                            className="border border-white text-white px-4 py-2 rounded transition-colors duration-200 hover:bg-[#181C25] font-medium w-full"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => {
                                navigate("/signup");
                                setIsMobileMenuOpen(false);
                            }}
                            className="bg-white text-black px-4 py-2 rounded font-medium transition-colors duration-200 w-full"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 