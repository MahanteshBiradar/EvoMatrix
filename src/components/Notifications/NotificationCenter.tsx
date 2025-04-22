import React from 'react';
import { X, BellOff, Check } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import NotificationItem from './NotificationItem';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markAllAsRead, 
    unreadCount 
  } = useNotification();

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}
      
      <div 
        className={`fixed inset-y-0 right-0 w-80 max-w-full bg-white shadow-lg z-50 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Notifications</h2>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
            <div className="text-sm text-neutral-600">
              <span className="font-medium">{unreadCount}</span> unread notifications
            </div>
            
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="flex items-center text-xs font-medium text-primary-600 hover:text-primary-700"
              >
                <Check size={14} className="mr-1" />
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-neutral-200">
                {notifications.map((notification) => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification} 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <BellOff size={32} className="text-neutral-400 mb-2" />
                <p className="text-neutral-600">No notifications yet</p>
                <p className="text-sm text-neutral-500 mt-1">
                  You'll receive notifications about your matrix activity here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationCenter;