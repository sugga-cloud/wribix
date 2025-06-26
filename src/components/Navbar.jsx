import DarkRoundedButton from "../assets/Buttons";
import React, { useState, useEffect, useRef } from 'react';

const AnimatedLink = ({ text, href, className, delayIncrement = 0.05, ...props }) => {
  const letters = text.split('');
  return (
    <a href={href} className={`nav-link ${className}`} {...props}>
      {letters.map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * delayIncrement}s` }}>
          {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space for actual spaces */}
        </span>
      ))}
    </a>
  );
};

/**
 * Navbar Component
 * Fixed header navigation with responsive mobile menu and dropdowns.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const mobileServicesSubmenuRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const servicesBtnRef = useRef(null);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Toggle desktop services dropdown
  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen((prev) => !prev);
  };

  // Toggle mobile services submenu
  const toggleMobileServicesSubmenu = () => {
    if (mobileServicesSubmenuRef.current) {
      const submenu = mobileServicesSubmenuRef.current;
      if (submenu.style.maxHeight && submenu.style.maxHeight !== '0px') {
        submenu.style.maxHeight = '0';
        submenu.style.opacity = '0';
      } else {
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
        submenu.style.opacity = '1';
      }
    }
  };

  // Close desktop dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target) &&
        servicesBtnRef.current &&
        !servicesBtnRef.current.contains(event.target)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-[#160b17] fixed w-full z-30 top-0 left-0 border-b border-gray-800">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-[#b9f000] font-extrabold text-3xl leading-none select-none">W</span>
          <span className="text-[#b9f000] font-extrabold text-3xl leading-none select-none">e</span>
          <span className="text-[#b9f000] font-extrabold text-3xl leading-none select-none">b</span>
          <span className="font-extrabold text-white text-xl tracking-tight select-none">ROCKET</span>
        </div>

        {/* Mobile menu button */}
        <button
          id="menu-btn"
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMobileMenu}
        >
          <i className="fas fa-bars fa-lg"></i>
        </button>

        {/* Desktop Navigation */}
        <nav
          id="menu"
          className="hidden md:flex items-center space-x-8 text-sm font-normal nav-fade-slide"
        >
          <AnimatedLink href="#" text="About" aria-label="About" />
         
          <AnimatedLink href="#" text="Blog" aria-label="Blog" />
          <AnimatedLink href="#" text="Portfolio" className="text-[#c72e5f]" aria-label="Portfolio" />
          <AnimatedLink href="#" text="Careers" aria-label="Careers" />
          <AnimatedLink href="#" text="Get a Quote" aria-label="Get a Quote" />
          <AnimatedLink href="#" text="Contact" aria-label="Contact" />
        </nav>

        {/* Desktop Call to Action Button */}
        <div className="hidden md:block">
          <DarkRoundedButton
            text="Schedule a Call Now"
            style="bg-white text-black text-sm font-semibold rounded-full px-6 py-2 hover:bg-gray-200 transition"
            onClick={() => console.log('Schedule a Call Now button clicked!')}
          />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <nav
        id="mobile-menu"
        className={`md:hidden bg-[#160b17] border-t border-gray-800 flex-col space-y-2 px-6 pb-4 ${
          isMobileMenuOpen ? 'show' : ''
        }`}
        aria-label="Mobile menu"
      >
        <a className="block py-2 hover:text-[#c72e5f] transition-colors" href="#">About</a>
        <button
          id="mobile-services-btn"
          aria-expanded={mobileServicesSubmenuRef.current?.style.maxHeight !== '0px'}
          aria-controls="mobile-services-submenu"
          className="flex justify-between items-center w-full py-2 hover:text-[#c72e5f] transition-colors focus:outline-none"
          onClick={toggleMobileServicesSubmenu}
        >
          Services
          <svg
            className={`w-3 h-3 text-white transition-transform duration-300 ${
              mobileServicesSubmenuRef.current?.style.maxHeight !== '0px' ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <div
          id="mobile-services-submenu"
          ref={mobileServicesSubmenuRef}
          className="pl-4 flex flex-col space-y-1 max-h-0 overflow-hidden transition-max-height duration-300"
          aria-label="Mobile Services submenu"
        >
          <a className="hover:text-[#c72e5f] transition-colors" href="#">Service 1</a>
          <a className="hover:text-[#c72e5f] transition-colors" href="#">Service 2</a>
          <a className="hover:text-[#c72e5f] transition-colors" href="#">Service 3</a>
        </div>
        <a className="block py-2 hover:text-[#c72e5f] transition-colors" href="#">Blog</a>
        <a className="block py-2 text-[#c72e5f] hover:text-[#e04a7f] transition-colors" href="#">Portfolio</a>
        <a className="block py-2 hover:text-[#c72e5f] transition-colors" href="#">Careers</a>
        <a className="block py-2 hover:text-[#c72e5f] transition-colors" href="#">Get a Quote</a>
        <a className="block py-2 hover:text-[#c72e5f] transition-colors" href="#">Contact</a>
        <DarkRoundedButton
          text="Schedule a Call Now"
          style="bg-white text-black text-sm font-semibold rounded-full px-6 py-2 mt-2 w-full hover:bg-gray-200 transition"
          onClick={() => console.log('Mobile Schedule a Call Now button clicked!')}
        />
      </nav>
    </header>
  );
};

export default Navbar;