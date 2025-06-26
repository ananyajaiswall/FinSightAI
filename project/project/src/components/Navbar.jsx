import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-extrabold text-primary-600 hover:scale-105 transition-transform hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-700 hover:bg-clip-text hover:text-transparent">
              FinSightAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-8 items-center">
            <Link to="/upload" className="text-gray-700 hover:text-primary-600 hover:underline">
              Upload
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 hover:underline">
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 hover:underline">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 }
        }}
        className="sm:hidden px-2 pt-2 pb-3 space-y-1"
      >
        <Link to="/upload" className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50">
          Upload
        </Link>
        <Link to="/contact" className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50">
          Contact
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="block w-full text-left px-3 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="block px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50">
              Login
            </Link>
            <Link to="/signup" className="block px-3 py-2 rounded-md text-white bg-primary-600 hover:bg-primary-700">
              Sign Up
            </Link>
          </>
        )}
      </motion.div>
    </nav>
  );
}

export default Navbar;
