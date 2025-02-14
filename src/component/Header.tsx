import { MenuIcon, X } from "lucide-react";
import React from "react";

interface Props {
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
  isMobileMenuOpen: boolean;
}

const Header = ({ setIsMobileMenuOpen, isMobileMenuOpen }: Props) => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              News Aggregator
            </h1>
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
