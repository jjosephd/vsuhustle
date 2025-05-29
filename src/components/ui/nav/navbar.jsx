import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/auth/AuthContext';
import LogoutButton from '../../buttons/logout';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router';
import { LuCalendarSearch } from 'react-icons/lu';
import { useNavigate, useLocation } from 'react-router';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa6';
import { FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setDropdownOpen(false);
    }
  };

  const navItems = [
    { path: '/businesses', label: 'Businesses', icon: FaBuilding },
  ];

  // Condition 2: Logged in user on businesses page
  if (currentUser && location.pathname === '/businesses') {
    return (
      <nav className="w-full">
        <div className="navbar flex absolute top-0 left-0 right-0 z-30 bg-transparent justify-between px-4 text-white font-bold">
          {currentUser.email}
          {/* User Dropdown */}
          <div className="relative">
            <button
              ref={buttonRef}
              className="flex items-center gap-2 px-3 py-2 text-white font-medium hover:bg-white/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onKeyDown={handleKeyDown}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <FaRegUserCircle className="text-xl" />
              <span className="hidden sm:inline text-sm">
                {currentUser.name ||
                  currentUser.email?.split('@')[0] ||
                  'Account'}
              </span>
              <FaChevronDown
                className={`text-xs transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200"
                role="menu"
                aria-orientation="vertical"
              >
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {currentUser.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {currentUser.email}
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="md:hidden border-b border-gray-100">
                  {navItems.map(({ path, label, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      role="menuitem"
                    >
                      <Icon className="text-gray-400" />
                      {label}
                    </Link>
                  ))}
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    role="menuitem"
                  >
                    Profile Settings
                  </Link>

                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    role="menuitem"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    role="menuitem"
                  >
                    Help & Support
                  </Link>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 pt-1">
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }

  // Condition 1: Logged in user (but not on businesses page)
  if (currentUser && location.pathname !== '/businesses') {
    return (
      <nav
        className="w-full sticky top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar bg-primary shadow-lg">
          <div className="flex items-center justify-between gap-6 mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Logo */}
            <Link
              to="/"
              className="logo-container font-extrabold text-2xl sm:text-3xl text-white hover:text-gray-100 transition-colors duration-200"
              aria-label="VSUHustle Home"
            >
              VSUHustle
            </Link>

            {/* Navigation Links - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="flex items-center gap-2 px-4 py-2 text-white font-medium hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-105"
                  aria-label={`Go to ${label}`}
                >
                  <Icon className="text-sm" />
                  {label}
                </Link>
              ))}
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                ref={buttonRef}
                className="flex items-center gap-2 px-3 py-2 text-white font-medium hover:bg-white/10 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onKeyDown={handleKeyDown}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-label="User menu"
              >
                <FaRegUserCircle className="text-xl" />
                <span className="hidden sm:inline text-sm">
                  {currentUser.name ||
                    currentUser.email?.split('@')[0] ||
                    'Account'}
                </span>
                <FaChevronDown
                  className={`text-xs transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {currentUser.name || 'User'}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {currentUser.email}
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="md:hidden border-b border-gray-100">
                    {navItems.map(({ path, label, icon: Icon }) => (
                      <Link
                        key={path}
                        to={path}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        role="menuitem"
                      >
                        <Icon className="text-gray-400" />
                        {label}
                      </Link>
                    ))}
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      role="menuitem"
                    >
                      Profile Settings
                    </Link>

                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/help"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      role="menuitem"
                    >
                      Help & Support
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 pt-1">
                    <LogoutButton />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Condition 3: Not logged in
  return (
    <nav className="w-full">
      <div className="navbar flex absolute top-0 left-0 right-0 z-30 bg-transparent justify-between px-4 text-white font-bold">
        <div className="logo-container font-extrabold text-3xl">VSUHustle</div>
        <ul className="links-container flex gap-6 items-center uppercase text-xs">
          <li>
            <ScrollLink to="services" spy={true} smooth={true} duration={500}>
              Services
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="/" spy={true} smooth={true} duration={500}>
              About
            </ScrollLink>
          </li>
          <li className="hidden sm:block">
            <Link
              to="/login"
              className="btn btn-primary btn-sm border-0 rounded-full text-xs px-8 text-white"
            >
              <LuCalendarSearch />
              Browse Providers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
