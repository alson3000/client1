// NotificationContext.jsx
import { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerNotificationRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <NotificationContext.Provider value={{ triggerNotificationRefresh, refreshTrigger }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);