import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useNotification } from '../../contexts/NotificationContext';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleNotifications: () => void;
  notificationsOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar,
  toggleNotifications,
  notificationsOpen
}) => {
  const { user, logout } = useUser();
  const { unreadCount } = useNotification();
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);

  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>
            
            <Link to="/app/dashboard" className="flex items-center ml-2 md:ml-0">
              <span className="text-2xl font-bold text-primary-600">1x3</span>
              <span className="text-2xl font-bold text-neutral-800">Matrix</span>
            </Link>
            
            <div className="hidden md:flex items-center ml-10">
              <Link to="/app/dashboard" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600">
                Dashboard
              </Link>
              <Link to="/app/matrix/1" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600">
                Matrices
              </Link>
              <Link to="/app/downline" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600">
                Downline
              </Link>
              <Link to="/app/transactions" className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary-600">
                Transactions
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={toggleNotifications}
              className="relative p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none mr-2"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-error rounded-full">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            <div className="relative">
              <button 
                onClick={toggleProfileMenu}
                className="flex items-center p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold mr-2">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="hidden md:block text-sm font-medium truncate max-w-[100px]">
                  {user?.username || 'User'}
                </span>
              </button>
              
              {profileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-neutral-100 focus:outline-none z-50">
                  <div className="py-1">
                    <Link
                      to="/app/profile"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileMenuOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;