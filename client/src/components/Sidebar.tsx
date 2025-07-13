import React from 'react';
import ThemeToggle from "./ThemeToggle";
import { NavLink } from 'react-router'; 
import { FiLock,FiLogIn, FiUserPlus, FiLogOut, FiHome, FiSettings, FiUsers, FiInfo, FiMail, FiX } from 'react-icons/fi'; // Import icons from react-icons

/**
 * Sidebar component for navigation.
 * It is designed to be responsive and includes NavLinks for routing,
 * along with react-icons for visual appeal.
 *
 * @param {object} props - Component props.
 * @param {function} props.onClose - Function to call when the sidebar needs to be closed (e.g., on mobile after clicking a link).
 * @param {boolean} props.isMobile - A boolean indicating if the current screen size is considered mobile.
 */

function Sidebar({ onClose, isMobile }) {
  return (
    <div className="flex flex-col h-full p-6">
      {/* Sidebar Header with App Menu title and optional close button for mobile */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">App Menu</h2>
        {/* Close button for mobile sidebar, visible only on mobile */}
        {isMobile && (
          <button
            onClick={onClose} // Calls the onClose prop to close the sidebar
            className="p-2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-full"
            aria-label="Close sidebar" // Accessibility label
          >
            <FiX size={24} /> {/* X icon from react-icons */}
          </button>
        )}
      </div>

      {/* Navigation links section */}
      <nav className="flex-1">
        <ul className="space-y-4">
          {/* Login NavLink */}
          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) => // Function to apply classes based on active state
                `flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200
                ${isActive ? 'bg-gray-700 text-white' : ''}` // Apply active styles
              }
              onClick={isMobile ? onClose : undefined} 
            >
              <FiLogIn size={20} /> {/* Login icon */}
              <span>Login / signup</span>
            </NavLink>
          </li>

          {/* Signup NavLink */}
          <li>
            <NavLink
              to="/forgot-password"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200
                ${isActive ? 'bg-gray-700 text-white' : ''}`
              }
              onClick={isMobile ? onClose : undefined} // Close sidebar on click if on mobile
            >
              <FiLock size={20} /> {/* forgot password icon */}
              <span>forgot password</span>
            </NavLink>
          </li>

          {/* Logout NavLink */}
          <li>
            <NavLink
              to="/logout" // Target path for the link
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200
                ${isActive ? 'bg-gray-700 text-white' : ''}`
              }
              onClick={isMobile ? onClose : undefined} // Close sidebar on click if on mobile
            >
              <FiLogOut size={20} /> {/* Logout icon */}
              <span>Logout</span>
            </NavLink>
          </li>

          {/* Example of other links to demonstrate icon usage and active styling */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200
                ${isActive ? 'bg-gray-700 text-white' : ''}`
              }
              onClick={isMobile ? onClose : undefined}
            >
              <FiHome size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200
                ${isActive ? 'bg-gray-700 text-white' : ''}`
              }
              onClick={isMobile ? onClose : undefined}
            >
              <FiUsers size={20} />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200
                ${isActive ? 'bg-gray-700 text-white' : ''}`
              }
              onClick={isMobile ? onClose : undefined}
            >
              <FiMail size={20} />
              <span>Messages</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200
                ${isActive ? 'bg-gray-700 text-white' : ''}`
              }
              onClick={isMobile ? onClose : undefined}
            >
              <FiSettings size={20} />
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200
                ${isActive ? 'bg-gray-700 text-white' : ''}`
              }
              onClick={isMobile ? onClose : undefined}
            >
              <FiInfo size={20} />
              <span>About</span>
            </NavLink>
          </li>
        </ul>
      </nav>
        <div className="mb-3">
            <ThemeToggle/>
        </div>
      {/* Footer section of the sidebar */}
      <div className="mt-auto pt-6 border-t border-gray-700 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} linkVault. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Sidebar;
