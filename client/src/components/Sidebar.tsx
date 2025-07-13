import { useSidebar } from '../context/SidebarContext';
import { NavLink } from 'react-router';
import {
  FiX, FiLogIn, FiLock, FiLogOut,
  FiHome, FiUsers, FiMail, FiSettings, FiInfo
} from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <div
      className={`
        fixed top-0 left-0 z-50 w-64 bg-gray-800 text-white
        h-full sm:h-screen                      // ✅ keep height full even on large screens
        transition-transform duration-300
        translate-x-0
        sm:relative                             // ✅ so the sidebar flows in layout properly
        flex flex-col
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 p-6">
        <h2 className="text-2xl font-bold">App Menu</h2>
        <button onClick={close} className="sm:hidden p-2">
          <FiX size={24} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-6 overflow-y-auto">
        <ul className="space-y-4">
          {[
            { to: '/auth', label: 'Login / signup', icon: FiLogIn },
            { to: '/forgot-password', label: 'Forgot Password', icon: FiLock },
            { to: '/logout', label: 'Logout', icon: FiLogOut },
            { to: '/dashboard', label: 'Dashboard', icon: FiHome },
            { to: '/users', label: 'Users', icon: FiUsers },
            { to: '/messages', label: 'Messages', icon: FiMail },
            { to: '/settings', label: 'Settings', icon: FiSettings },
            { to: '/about', label: 'About', icon: FiInfo },
          ].map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={close}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-md transition-colors duration-200
                   hover:bg-gray-700 hover:text-white text-gray-300
                   ${isActive ? 'bg-gray-700 text-white' : ''}`
                }
              >
                <Icon size={20} />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4 px-6 mb-4">
        <ThemeToggle />
      </div>

      {/* ✅ Footer pinned to the bottom */}
      <footer className="mt-auto pt-6 border-t border-gray-700 text-sm text-gray-400 px-6">
        <p>&copy; {new Date().getFullYear()} linkVault. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Sidebar;

