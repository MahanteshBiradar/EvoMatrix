import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Grid, Users, BarChart, CreditCard, Settings, HelpCircle } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useMatrix } from '../../contexts/MatrixContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useUser();
  const { totalEarnings } = useMatrix();

  const closeSidebar = () => setIsOpen(false);

  const menuItems = [
    { path: '/app/dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/app/matrix/1', name: 'Matrices', icon: <Grid size={20} /> },
    { path: '/app/downline', name: 'Downline', icon: <Users size={20} /> },
    { path: '/app/transactions', name: 'Transactions', icon: <BarChart size={20} /> },
    { path: '/app/profile', name: 'Profile', icon: <Settings size={20} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/app/matrix/1') {
      return location.pathname.startsWith('/app/matrix');
    }
    return location.pathname === path;
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <Link to="/app/dashboard" className="flex items-center">
                <span className="text-2xl font-bold text-primary-600">1x3</span>
                <span className="text-2xl font-bold text-neutral-800">Matrix</span>
              </Link>
              
              <button 
                onClick={closeSidebar} 
                className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 md:hidden"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-4 border-b border-neutral-200">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold mr-3">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <div className="font-medium text-neutral-900 truncate max-w-[180px]">
                  {user?.username || 'User'}
                </div>
                <div className="text-sm text-neutral-500 truncate max-w-[180px]">
                  {user?.email || 'user@example.com'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-neutral-50 rounded-md">
              <div className="text-sm text-neutral-500">Total Earnings</div>
              <div className="text-lg font-semibold text-neutral-900">${totalEarnings.toFixed(2)}</div>
              <div className="text-sm text-neutral-500 mt-1">Balance: ${user?.balance.toFixed(2) || '0.00'}</div>
            </div>
          </div>
          
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md font-medium ${
                      isActive(item.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                    }`}
                    onClick={closeSidebar}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-neutral-200">
            <Link
              to="/help"
              className="flex items-center px-3 py-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-50"
            >
              <HelpCircle size={20} className="mr-3" />
              Help & Support
            </Link>
            
            <div className="mt-4 text-xs text-neutral-500 text-center">
              © 2025 1x3 Matrix. All rights reserved.
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;