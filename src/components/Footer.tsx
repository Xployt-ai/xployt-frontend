import { FaInstagram, FaFacebookF, FaLinkedinIn, FaDiscord, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-transparent border-t border-[#23262F] pt-8 pb-4 px-4 md:px-0 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
        {/* Left: Logo and Socials */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
          <div className="flex items-center mb-6">
            <img src="/logo.png" alt="Xployt.ai Logo" className="h-10 w-auto mr-2" />
            <span className="text-[#E0E0E0] text-xl font-semibold tracking-wide select-none"></span>
          </div>
          <div className="flex space-x-6 mt-2 mb-4 md:mb-0">
            <a href="#" className="bg-[#E5E5E5] rounded-full p-3 hover:bg-[#d1d1d1] transition-colors" aria-label="Instagram"><FaInstagram className="text-[#23262F] text-xl" /></a>
            <a href="#" className="bg-[#E5E5E5] rounded-full p-3 hover:bg-[#d1d1d1] transition-colors" aria-label="Facebook"><FaFacebookF className="text-[#23262F] text-xl" /></a>
            <a href="#" className="bg-[#E5E5E5] rounded-full p-3 hover:bg-[#d1d1d1] transition-colors" aria-label="LinkedIn"><FaLinkedinIn className="text-[#23262F] text-xl" /></a>
            <a href="#" className="bg-[#E5E5E5] rounded-full p-3 hover:bg-[#d1d1d1] transition-colors" aria-label="Discord"><FaDiscord className="text-[#23262F] text-xl" /></a>
          </div>
        </div>
        {/* Center: Links */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 mt-4 md:mt-0">
          <a href="#" className="text-white font-semibold mb-4 hover:underline">Validator Applications</a>
          <a href="#" className="text-white font-semibold mb-4 hover:underline">Terms and Policy</a>
          <a href="#" className="text-white font-semibold mb-4 hover:underline">Privacy Statement</a>
          <a href="#" className="text-white font-semibold mb-4 hover:underline">Help Center</a>
          <a href="#" className="text-white font-semibold hover:underline">Sitemap</a>
        </div>
        {/* Right: Contact Info */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 mt-4 md:mt-0">
          <span className="text-white font-semibold mb-4">Contact Us</span>
          <div className="flex items-center text-[#E0E0E0] mb-2">
            <FaEnvelope className="w-5 h-5 mr-2" />
            info@xployt.com
          </div>
          <div className="flex items-center text-[#E0E0E0] mb-2">
            <FaPhone className="w-5 h-5 mr-2" />
            +9411XXXXXXX
          </div>
          <div className="text-[#E0E0E0]">Xployt Co, Colombo, Sri Lanka</div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 border-t border-[#23262F] pt-4 text-center">
        <span className="text-[#888] text-sm">© Xployt.ai 2025. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer; 