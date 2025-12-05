import React from "react";
import { Bell, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/userActions";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="py-4 border-b border-gray-200 flex-shrink-0 relative z-50 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-3xl font-bold text-gray-900 tracking-wider"
        >
          <Link to="/">
            Eventify<span className="text-gray-500">.</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/">
            <motion.span
              whileHover={{ scale: 1.1, color: "#111827" }}
              className="text-gray-700 transition-colors font-medium inline-block"
            >
              Home
            </motion.span>
          </Link>
          {user ? (
            <Link to="/dashboard">
              <motion.span
                whileHover={{ scale: 1.1, color: "#111827" }}
                className="text-gray-500 transition-colors font-medium inline-block"
              >
                Dashboard
              </motion.span>
            </Link>
          ) : null}
          {user ? (
            <motion.button
              whileHover={{ scale: 1.1, color: "#111827" }}
              onClick={handleLogout}
              className="text-gray-700 transition-colors font-medium cursor-pointer"
            >
              Logout
            </motion.button>
          ) : (
            <>
              <Link to="/login">
                <motion.span
                  whileHover={{ scale: 1.1, color: "#111827" }}
                  className="text-gray-700 transition-colors font-medium inline-block"
                >
                  Login
                </motion.span>
              </Link>
              {/* CTA button: Black background, white text */}
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#374151" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-gray-400/50"
                >
                  Get Started
                </motion.button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="md:hidden text-gray-900 focus:outline-none"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden flex flex-col overflow-hidden"
          >
            <div className="p-4 space-y-4 flex flex-col">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Home
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-900 transition-colors font-medium"
                >
                  Dashboard
                </Link>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-left text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-gray-400/50">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
