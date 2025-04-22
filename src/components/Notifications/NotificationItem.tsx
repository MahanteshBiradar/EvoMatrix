import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useNotification, Notification } from '../../contexts/NotificationContext';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { markAsRead, removeNotification } = useNotification();
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };
  
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="text-success" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-warning" size={20} />;
      case 'error':
        return <AlertCircle className="text-error" size={20} />;
      case 'info':
      default:
        return <Info className="text-primary-500" size={20} />;
    }
  };
  
  return (
    <div 
      className={`p-4 hover:bg-neutral-50 transition-colors cursor-pointer ${
        !notification.read ? 'bg-primary-50' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex">
        <div className="mr-3 mt-0.5">{getIcon()}</div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className={`text-sm font-medium ${!notification.read ? 'text-neutral-900' : 'text-neutral-700'}`}>
              {notification.title}
            </h4>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                removeNotification(notification.id);
              }}
              className="ml-2 text-neutral-400 hover:text-neutral-600"
            >
              <X size={14} />
            </button>
          </div>
          
          <p className="text-xs text-neutral-600 mt-1">{notification.message}</p>
          
          <div className="text-xs text-neutral-500 mt-2">
            {new Date(notification.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

const X = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default NotificationItem;