import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
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

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-300 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center shadow-lg shadow-gray-400/50">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-extrabold text-gray-900">Eventify</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gray-900 text-white font-semibold shadow-lg shadow-gray-400/50"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-300">
        <NavLink
          to="/help"
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help & Support</span>
        </NavLink>

        <div className="mt-4 p-3 bg-gray-100 rounded-xl flex items-center gap-3 shadow-xl shadow-gray-300/50">
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
          <button
            onClick={handleLogout}
            className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
