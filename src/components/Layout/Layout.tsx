import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import NotificationCenter from '../Notifications/NotificationCenter';
import { useUser } from '../../contexts/UserContext';

const Layout: React.FC = () => {
  const { isAuthenticated, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (!notificationsOpen) setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content wrapper with responsive margin-left */}
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        } md:ml-64`}
      >
        {/* Header */}
        <Header
          toggleSidebar={toggleSidebar}
          toggleNotifications={toggleNotifications}
          notificationsOpen={notificationsOpen}
        />

        {/* Main area */}
        <main className="flex-1 overflow-y-auto pb-10">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Notification center */}
      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
};

export default Layout;
