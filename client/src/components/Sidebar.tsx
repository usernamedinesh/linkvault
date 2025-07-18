import { useSidebar } from '../context/SidebarContext';
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from 'react-router';  // use react-router-dom, not react-router
import {
  FiX, FiLogIn, FiLock, FiLogOut,
  FiHome, FiUsers, FiMail, FiSettings, FiInfo
} from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import type { IconType } from 'react-icons';

type NavItem =
  | { to: string; label: string; icon: IconType; onClick?: never }
  | { onClick: () => void; label: string; icon: IconType; to?: never };

type SidebarProps = {
  onClose: () => void;
  isMobile: boolean;
};

  const Sidebar: React.FC<SidebarProps> = ({ onClose: _onClose, isMobile: _isMobile }) => {

  const { close } = useSidebar();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // clear token
    close();            // close sidebar
    navigate('/auth');  // go to login
  };

  // Make sure to filter out falsey values, so navItems is NavItem[]
  const navItems: NavItem[] = [
    !isLoggedIn && { to: '/auth', label: 'Login / Signup', icon: FiLogIn },
    isLoggedIn && { onClick: handleLogout, label: 'Logout', icon: FiLogOut },
    { to: '/forgot-password', label: 'Forgot Password', icon: FiLock },
    { to: '/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/users', label: 'Users', icon: FiUsers },
    { to: '/messages', label: 'Messages', icon: FiMail },
    { to: '/settings', label: 'Settings', icon: FiSettings },
    { to: '/about', label: 'About', icon: FiInfo },
  ].filter(Boolean) as NavItem[];

  return (
    <div className="fixed top-0 left-0 z-50 w-64 bg-gray-800 text-white h-full sm:h-screen transition-transform duration-300 translate-x-0 sm:relative flex flex-col">
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
          {navItems.map(({ to, label, icon: Icon, onClick }) => (
            <li key={label}>
              {onClick ? (
                <button
                  onClick={onClick}
                  className="flex w-full items-center space-x-3 p-3 rounded-md transition-colors duration-200 hover:bg-gray-700 text-left text-gray-300 hover:text-white"
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ) : (
                <NavLink
                  to={to!}
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
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-4 px-6 mb-4">
        <ThemeToggle />
      </div>

      <footer className="mt-auto pt-6 border-t border-gray-700 text-sm text-gray-400 px-6">
        <p>&copy; {new Date().getFullYear()} linkVault. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default Sidebar;
