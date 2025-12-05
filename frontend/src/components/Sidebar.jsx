import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, HelpCircle, LogOut, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Calendar, label: "Home", path: "/" },
  ];

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-64 bg-white h-screen border-r border-gray-300 flex flex-col fixed left-0 top-0 z-50 md:translate-x-0 md:!transform-none`}
        style={{ x: isOpen ? 0 : "-100%" }} // Fallback for initial render if needed, but variants handle it
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center shadow-lg shadow-gray-400/50"
            >
              <Calendar className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-extrabold text-gray-900">
              Eventify
            </span>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose && onClose()} // Close sidebar on navigation on mobile
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 text-white font-semibold shadow-lg shadow-gray-400/50"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  className="flex items-center gap-3 w-full"
                  whileHover={{ x: 5 }}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-300">
          <NavLink
            to="/help"
            onClick={() => onClose && onClose()}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
          >
            <motion.div
              className="flex items-center gap-3 w-full"
              whileHover={{ x: 5 }}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help & Support</span>
            </motion.div>
          </NavLink>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-4 p-3 bg-gray-100 rounded-xl flex items-center gap-3 shadow-xl shadow-gray-300/50"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-900 font-bold">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, color: "#111827" }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-500"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
