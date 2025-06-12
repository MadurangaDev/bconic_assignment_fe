import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Menu, X, User, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Mock auth state
  const isAdmin = localStorage.getItem('userRole') === 'admin'; // Mock admin state

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/track', label: 'Track Shipment' },
    ...(isLoggedIn ? [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/create-shipment', label: 'Create Shipment' },
      ...(isAdmin ? [{ path: '/admin', label: 'Admin Panel' }] : [])
    ] : [])
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 transition-colors">
              <Package className="h-8 w-8" />
              <span className="text-xl font-bold">Half Life Courier</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-700 hover:text-blue-700 hover:bg-gray-100 rounded-md transition-colors">
                  <User className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userRole');
                    window.location.href = '/';
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-blue-700 hover:text-blue-800 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <button 
                  onClick={() => {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userRole');
                    window.location.href = '/';
                  }}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-1">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;