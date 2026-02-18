import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Import the icons

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Brand</div>

        {/* Hamburger Icon - Only visible on mobile */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Links - Hidden on mobile */}
        <ul className="hidden md:flex gap-6">
          <li><a href="#" className="hover:text-blue-600">Home</a></li>
          <li><a href="#" className="hover:text-blue-600">Products</a></li>
          <li><a href="#" className="hover:text-blue-600">Contact</a></li>
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="p-6">
          <button onClick={toggleMenu} className="mb-8 float-right">
            <X size={32} />
          </button>
          
          <ul className="flex flex-col gap-8 text-2xl font-medium mt-16">
            <li><a href="#" onClick={toggleMenu}>Home</a></li>
            <li><a href="#" onClick={toggleMenu}>Products</a></li>
            <li><a href="#" onClick={toggleMenu}>Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;
    