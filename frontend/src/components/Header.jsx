import React from "react";
import { Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="py-4 border-b border-gray-200 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-3xl font-bold text-gray-900 tracking-wider">
          Eventify<span className="text-gray-500">.</span>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            Home
          </Link>
          {
            user ?  <Link
            to="/dashboard"
            className="text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            Dashboard
          </Link> : null
          }
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Login
              </Link>
              {/* CTA button: Black background, white text */}
              <Link to="/register">
                <button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-gray-400/50">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </nav>
        <Menu className="w-6 h-6 md:hidden text-gray-900" />
      </div>
    </header>
  );
};

export default Header;
