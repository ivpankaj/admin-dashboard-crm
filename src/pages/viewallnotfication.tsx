import React, { useEffect, useState } from 'react';
import { InformationCircleIcon, CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface NotificationType {
  id: number;
  title: string;
  message: string;
  notificationType: string;
  createdAt: string;
}

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notifications/getall');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: NotificationType[] = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Notifications</h1>
      <div className="space-y-6">
        {notifications.map(notification => (
          <div key={notification.id} className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${getNotificationTypeStyles(notification.notificationType)}`}>
            <div className="flex justify-between items-start">
              {/* Left Side: Notification Type with Icon */}
              <div className="flex items-center space-x-2">
                {getNotificationTypeIcon(notification.notificationType)}
                <span className="text-lg font-medium">{notification.notificationType.toUpperCase()}</span>
              </div>
              {/* Right Side: Notification Content */}
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold">{notification.title}</h2>
                <p className="mt-2 text-lg">{notification.message}</p>
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <span className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full inline-block bg-current" style={{ backgroundColor: getNotificationTypeColor(notification.notificationType) }}></span>
                    <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getNotificationTypeStyles = (type: string) => {
  switch (type) {
    case 'info':
      return 'bg-blue-50 border-l-4 border-blue-500 text-blue-700';
    case 'success':
      return 'bg-green-50 border-l-4 border-green-500 text-green-700';
    case 'warning':
      return 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700';
    case 'error':
      return 'bg-red-50 border-l-4 border-red-500 text-red-700';
    default:
      return 'bg-gray-50 border-l-4 border-gray-300 text-gray-700';
  }
};

const getNotificationTypeColor = (type: string) => {
  switch (type) {
    case 'info':
      return '#3b82f6'; // blue-500
    case 'success':
      return '#10b981'; // green-500
    case 'warning':
      return '#f59e0b'; // yellow-500
    case 'error':
      return '#ef4444'; // red-500
    default:
      return '#9ca3af'; // gray-400
  }
};

const getNotificationTypeIcon = (type: string) => {
  switch (type) {
    case 'info':
      return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
    case 'success':
      return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
    case 'warning':
      return <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />;
    case 'error':
      return <XCircleIcon className="w-6 h-6 text-red-500" />;
    default:
      return <InformationCircleIcon className="w-6 h-6 text-gray-500" />;
  }
};

export default NotificationList;
