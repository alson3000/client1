// // // import { Link, useLocation } from "react-router-dom";
// // // import { useContext, useEffect, useCallback} from "react";
// // // import { UserContext } from "./UserContext.jsx";
// // // import SearchBar from "./SearchBar.jsx";
// // // import { useState } from "react";
// // // import axios from "axios";

// // // export default function Header() {
// // //   const { user, setUser } = useContext(UserContext);
// // //   const location = useLocation();
// // //   const [filteredPlaces, setFilteredPlaces] = useState([]);
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [showNotifications, setShowNotifications] = useState(false);

// // //   // Fetch notifications when user is logged in
// // //   useEffect(() => {
// // //     if (user) {
// // //       axios.get('http://localhost:5000/notifications', { withCredentials: true })
// // //         .then(response => {
// // //           const normalizedNotifications = response.data.map(n => ({
// // //             ...n,
// // //             is_read: !!n.is_read // Convert 0/1 to false/true
// // //           }));
// // //           console.log('Normalized notifications:', normalizedNotifications);
// // //           setNotifications(normalizedNotifications);
// // //         })
// // //         .catch(error => {
// // //           console.error("Error fetching notifications:", error);
// // //           if (error.response?.status === 401) {
// // //             console.log('Unauthorized, redirecting to login');
// // //             setUser(null);
// // //             window.location.href = '/login';
// // //           }
// // //         });
// // //     }
// // //   }, [user, setUser]);

// // //   const handleSearch = (searchResults) => {
// // //     // Update filteredPlaces with the search results
// // //     setFilteredPlaces(searchResults);
// // //   };

// // //   const toggleNotifications = () => {
// // //     console.log('Toggling notifications, current state:', notifications);
// // //     setShowNotifications(!showNotifications);
// // //   };

// // //   const markAsRead = useCallback(async (notificationId, event) => {
// // //     event.stopPropagation(); // Prevent bubbling
// // //     console.log('markAsRead called with notificationId:', notificationId);
// // //     try {
// // //       const response = await axios.put(
// // //         `http://localhost:5000/notifications/${notificationId}/read`,
// // //         {},
// // //         { withCredentials: true }
// // //       );
// // //       console.log('PUT response:', response.data);
// // //       // Re-fetch notifications to ensure consistency
// // //       const { data } = await axios.get('http://localhost:5000/notifications', { withCredentials: true });
// // //       const normalizedNotifications = data.map(n => ({
// // //         ...n,
// // //         is_read: !!n.is_read
// // //       }));
// // //       console.log('Re-fetched notifications:', normalizedNotifications);
// // //       setNotifications(normalizedNotifications);
// // //     } catch (error) {
// // //       console.error('Error marking notification as read:', {
// // //         message: error.message,
// // //         status: error.response?.status,
// // //         data: error.response?.data
// // //       });
// // //     }
// // //   }, [setNotifications]);

// // //   return (
// // //     <header className="flex items-center justify-between">
// // //       <Link to={'/'} className="flex items-center gap-1">
// // //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
// // //           <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
// // //         </svg>
// // //         <span className="font-bold text-xl">RoomNow</span>
// // //       </Link>
      
// // //        {/* // Show search bar only on IndexPage  */}
// // //       {/* {location.pathname === "/" && <SearchBar onSearch={handleSearch}/>} */}
// // //     <div className="flex items-center gap-4">
// // //       <Link to={user?'/account':'/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
// // //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
// // //           <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
// // //         </svg>
// // //         <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
// // //           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
// // //             <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
// // //           </svg>
// // //         </div>
// // //         {!!user && (
// // //           <div>
// // //             {user.username}
// // //           </div>
// // //         )}
// // //       </Link>

// // //       {/* Notification Bell Icon */}
// // //         <div className="relative">
// // //           <button onClick={toggleNotifications}>
// // //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
// // //               <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
// // //             </svg>
// // //             {/* Show unread notification count */}
// // //             {notifications.filter(n => !n.is_read).length > 0 && (
// // //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
// // //                 {notifications.filter(n => !n.is_read).length}
// // //               </span>
// // //             )}
// // //           </button>

// // //           {/* Notification Dropdown */}
// // //           {showNotifications && (
// // //             <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
// // //               {notifications.length === 0 ? (
// // //                 <div className="p-4 text-center text-gray-500">No notifications</div>
// // //               ) : (
// // //                 notifications.map(notification => (
// // //                   <div
// // //                     key={notification.id}
// // //                     className={`p-4 border-b ${notification.is_read ? 'bg-gray-100' : 'bg-white'}`}
// // //                     onClick={() => markAsRead(notification.id)}
// // //                   >
// // //                     <p className="text-sm">{notification.message}</p>
// // //                     <p className="text-xs text-gray-500">
// // //                       {new Date(notification.created_at).toLocaleString()}
// // //                     </p>
// // //                   </div>
// // //                 ))
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </header>
// // //   );
// // // }



// // // Header.jsx
// // // import { Link, useLocation } from "react-router-dom";
// // // import { useContext, useEffect, useCallback } from "react";
// // // import { UserContext } from "./UserContext.jsx";
// // // import SearchBar from "./SearchBar.jsx";
// // // import { useState } from "react";
// // // import axios from "axios";

// // // export default function Header() {
// // //   const { user, setUser } = useContext(UserContext);
// // //   const location = useLocation();
// // //   const [filteredPlaces, setFilteredPlaces] = useState([]);
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [showNotifications, setShowNotifications] = useState(false);

// // //   useEffect(() => {
// // //     if (user) {
// // //       axios.get('http://localhost:5000/notifications', { withCredentials: true })
// // //         .then(response => {
// // //           const normalizedNotifications = response.data.map(n => ({
// // //             ...n,
// // //             is_read: !!n.is_read // Convert 0/1 to false/true
// // //           }));
// // //           console.log('Normalized notifications:', normalizedNotifications);
// // //           setNotifications(normalizedNotifications);
// // //         })
// // //         .catch(error => {
// // //           console.error("Error fetching notifications:", error);
// // //           if (error.response?.status === 401) {
// // //             console.log('Unauthorized, redirecting to login');
// // //             setUser(null);
// // //             window.location.href = '/login';
// // //           }
// // //         });
// // //     }
// // //   }, [user, setUser]);

// // //   const handleSearch = (searchResults) => {
// // //     setFilteredPlaces(searchResults);
// // //   };

// // //   const toggleNotifications = () => {
// // //     console.log('Toggling notifications, current state:', notifications);
// // //     setShowNotifications(!showNotifications);
// // //   };

// // //   const markAsRead = useCallback(async (notificationId, event) => {
// // //     event.stopPropagation(); // Prevent bubbling
// // //     console.log('markAsRead called with notificationId:', notificationId);
// // //     try {
// // //       const response = await axios.put(
// // //         `http://localhost:5000/notifications/${notificationId}/read`,
// // //         {},
// // //         { withCredentials: true }
// // //       );
// // //       console.log('PUT response:', response.data);
// // //       // Re-fetch notifications to ensure consistency
// // //       const { data } = await axios.get('http://localhost:5000/notifications', { withCredentials: true });
// // //       const normalizedNotifications = data.map(n => ({
// // //         ...n,
// // //         is_read: !!n.is_read
// // //       }));
// // //       console.log('Re-fetched notifications:', normalizedNotifications);
// // //       setNotifications(normalizedNotifications);
// // //     } catch (error) {
// // //       console.error('Error marking notification as read:', {
// // //         message: error.message,
// // //         status: error.response?.status,
// // //         data: error.response?.data
// // //       });
// // //     }
// // //   }, [setNotifications]);

// // //   return (
// // //     <header className="flex items-center justify-between">
// // //       <Link to={'/'} className="flex items-center gap-1">
// // //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
// // //           <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
// // //         </svg>
// // //         <span className="font-bold text-xl">RoomNow</span>
// // //       </Link>

// // //       <div className="flex items-center gap-4">
// // //         <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
// // //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
// // //             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
// // //           </svg>
// // //           <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
// // //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
// // //               <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
// // //             </svg>
// // //           </div>
// // //           {!!user && (
// // //             <div>
// // //               {user.username}
// // //             </div>
// // //           )}
// // //         </Link>

// // //         <div className="relative">
// // //           <button onClick={toggleNotifications}>
// // //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
// // //               <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
// // //             </svg>
// // //             {notifications.filter(n => !n.is_read).length > 0 && (
// // //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
// // //                 {notifications.filter(n => !n.is_read).length}
// // //               </span>
// // //             )}
// // //           </button>

// // //           {showNotifications && (
// // //             <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
// // //               {notifications.length === 0 ? (
// // //                 <div className="p-4 text-center text-gray-500">No notifications</div>
// // //               ) : (
// // //                 notifications.map(notification => (
// // //                   <div
// // //                     key={notification.id}
// // //                     className={`p-4 border-b ${notification.is_read ? 'bg-gray-100' : 'bg-white'}`}
// // //                     onClick={(e) => markAsRead(notification.id, e)}
// // //                   >
// // //                     <p className="text-sm">{notification.message}</p>
// // //                     <p className="text-xs text-gray-500">
// // //                       {new Date(notification.created_at).toLocaleString()}
// // //                     </p>
// // //                   </div>
// // //                 ))
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </header>
// // //   );
// // // }



// // // import { Link, useLocation } from "react-router-dom";
// // // import { useContext, useEffect, useCallback } from "react";
// // // import { UserContext } from "./UserContext.jsx";
// // // import SearchBar from "./SearchBar.jsx";
// // // import { useState } from "react";
// // // import axios from "axios";

// // // export default function Header() {
// // //   const { user, setUser } = useContext(UserContext);
// // //   const location = useLocation();
// // //   const [filteredPlaces, setFilteredPlaces] = useState([]);
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [showNotifications, setShowNotifications] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     if (user) {
// // //       axios.get('http://localhost:5000/notifications', { withCredentials: true })
// // //         .then(response => {
// // //           const normalizedNotifications = response.data.map(n => ({
// // //             ...n,
// // //             is_read: !!n.is_read
// // //           }));
// // //           console.log('Normalized notifications:', JSON.stringify(normalizedNotifications, null, 2));
// // //           setNotifications(normalizedNotifications);
// // //           setError(null);
// // //         })
// // //         .catch(error => {
// // //           console.error("Error fetching notifications:", error);
// // //           setError('Failed to fetch notifications');
// // //           if (error.response?.status === 401) {
// // //             console.log('Unauthorized, redirecting to login');
// // //             setUser(null);
// // //             window.location.href = '/login';
// // //           }
// // //         });
// // //     }
// // //   }, [user, setUser]);

// // //   useEffect(() => {
// // //     console.log('Notifications state updated:', JSON.stringify(notifications, null, 2));
// // //   }, [notifications]);

// // //   const handleSearch = (searchResults) => {
// // //     setFilteredPlaces(searchResults);
// // //   };

// // //   const toggleNotifications = () => {
// // //     console.log('Toggling notifications, current state:', notifications);
// // //     setShowNotifications(!showNotifications);
// // //   };

// // //   const markAsRead = useCallback(async (notificationId, event) => {
// // //     event.stopPropagation();
// // //     console.log('markAsRead called with notificationId:', notificationId);
// // //     try {
// // //       document.getElementById(`notification-${notificationId}`).style.pointerEvents = 'none';
// // //       const response = await axios.put(
// // //         `http://localhost:5000/notifications/${notificationId}/read`,
// // //         {},
// // //         { withCredentials: true }
// // //       );
// // //       console.log('PUT response:', response.data);
// // //       const { data } = await axios.get('http://localhost:5000/notifications', {
// // //         withCredentials: true,
// // //         params: { t: Date.now() } // Prevent caching
// // //       });
// // //       const normalizedNotifications = data.map(n => ({
// // //         ...n,
// // //         is_read: !!n.is_read
// // //       }));
// // //       console.log('Re-fetched notifications:', JSON.stringify(normalizedNotifications, null, 2));
// // //       setNotifications([...normalizedNotifications]);
// // //       setError(null);
// // //     } catch (error) {
// // //       console.error('Error marking notification as read:', {
// // //         message: error.message,
// // //         status: error.response?.status,
// // //         data: error.response?.data
// // //       });
// // //       setError('Failed to mark notification as read');
// // //     } finally {
// // //       document.getElementById(`notification-${notificationId}`).style.pointerEvents = 'auto';
// // //     }
// // //   }, [setNotifications]);

// // //   useEffect(() => {
// // //     fetchNotifications();
// // //   }, [user, refreshTrigger, fetchNotifications]);

// // //   return (
// // //     <header className="flex items-center justify-between">
// // //       <Link to={'/'} className="flex items-center gap-1">
// // //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
// // //           <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
// // //         </svg>
// // //         <span className="font-bold text-xl">RoomNow</span>
// // //       </Link>

// // //       <div className="flex items-center gap-4">
// // //         <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
// // //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
// // //             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
// // //           </svg>
// // //           <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
// // //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
// // //               <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 1 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
// // //             </svg>
// // //           </div>
// // //           {!!user && (
// // //             <div>
// // //               {user.username}
// // //             </div>
// // //           )}
// // //         </Link>

// // //         <div className="relative">
// // //           <button onClick={toggleNotifications}>
// // //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
// // //               <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
// // //             </svg>
// // //             {notifications.filter(n => !n.is_read).length > 0 && (
// // //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
// // //                 {notifications.filter(n => !n.is_read).length}
// // //               </span>
// // //             )}
// // //           </button>

// // //           {showNotifications && (
// // //             <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
// // //               {error && (
// // //                 <div className="p-4 text-center text-red-500">{error}</div>
// // //               )}
// // //               {notifications.length === 0 ? (
// // //                 <div className="p-4 text-center text-gray-500">No notifications</div>
// // //               ) : (
// // //                 notifications.map(notification => (
// // //                   <div
// // //                     id={`notification-${notification.id}`}
// // //                     key={notification.id}
// // //                     className={`p-4 border-b ${notification.is_read ? 'bg-gray-100' : 'bg-white'}`}
// // //                     onClick={(e) => markAsRead(notification.id, e)}
// // //                   >
// // //                     <p className="text-sm">{notification.message}</p>
// // //                     <p className="text-xs text-gray-500">
// // //                       {new Date(notification.created_at).toLocaleString()}
// // //                     </p>
// // //                   </div>
// // //                 ))
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </header>
// // //   );
// // // }


// // import { Link, useLocation } from "react-router-dom";
// // import { useContext, useEffect, useCallback } from "react";
// // import { UserContext } from "./UserContext.jsx";
// // import { useNotification } from "./NotificationContext.jsx";
// // import SearchBar from "./SearchBar.jsx";
// // import { useState } from "react";
// // import axios from "axios";

// // export default function Header() {
// //   const { user, setUser } = useContext(UserContext);
// //   const { refreshTrigger } = useNotification();
// //   const location = useLocation();
// //   const [filteredPlaces, setFilteredPlaces] = useState([]);
// //   const [notifications, setNotifications] = useState([]);
// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [error, setError] = useState(null);

// //   const fetchNotifications = useCallback(() => {
// //     if (user) {
// //       axios.get('http://localhost:5000/notifications', { withCredentials: true })
// //         .then(response => {
// //           const normalizedNotifications = response.data.map(n => ({
// //             ...n,
// //             is_read: !!n.is_read
// //           }));
// //           console.log('Normalized notifications:', JSON.stringify(normalizedNotifications, null, 2));
// //           setNotifications(normalizedNotifications);
// //           setError(null);
// //         })
// //         .catch(error => {
// //           console.error("Error fetching notifications:", error);
// //           setError('Failed to fetch notifications');
// //           if (error.response?.status === 401) {
// //             console.log('Unauthorized, redirecting to login');
// //             setUser(null);
// //             window.location.href = '/login';
// //           }
// //         });
// //     }
// //   }, [user, setUser]);

// //   useEffect(() => {
// //     fetchNotifications();
// //   }, [user, refreshTrigger, fetchNotifications]);

// //   useEffect(() => {
// //     console.log('Notifications state updated:', JSON.stringify(notifications, null, 2));
// //   }, [notifications]);

// //   const handleSearch = (searchResults) => {
// //     setFilteredPlaces(searchResults);
// //   };

// //   const toggleNotifications = () => {
// //     console.log('Toggling notifications, current state:', notifications);
// //     setShowNotifications(!showNotifications);
// //   };

// //   const markAsRead = useCallback(async (notificationId, event) => {
// //     event.stopPropagation();
// //     console.log('markAsRead called with notificationId:', notificationId);
// //     try {
// //       const element = document.getElementById(`notification-${notificationId}`);
// //       if (element) element.style.pointerEvents = 'none';
// //       const response = await axios.put(
// //         `http://localhost:5000/notifications/${notificationId}/read`,
// //         {},
// //         { withCredentials: true }
// //       );
// //       console.log('PUT response:', response.data);
// //       const { data } = await axios.get('http://localhost:5000/notifications', {
// //         withCredentials: true,
// //         params: { t: Date.now() }
// //       });
// //       const normalizedNotifications = data.map(n => ({
// //         ...n,
// //         is_read: !!n.is_read
// //       }));
// //       console.log('Re-fetched notifications:', JSON.stringify(normalizedNotifications, null, 2));
// //       setNotifications([...normalizedNotifications]);
// //       setError(null);
// //     } catch (error) {
// //       console.error('Error marking notification as read:', {
// //         message: error.message,
// //         status: error.response?.status,
// //         data: error.response?.data
// //       });
// //       setError('Failed to mark notification as read');
// //     } finally {
// //       const element = document.getElementById(`notification-${notificationId}`);
// //       if (element) element.style.pointerEvents = 'auto';
// //     }
// //   }, [setNotifications]);

// //   return (
// //     <header className="flex items-center justify-between">
// //       <Link to={'/'} className="flex items-center gap-1">
// //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
// //           <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
// //         </svg>
// //         <span className="font-bold text-xl">RoomNow</span>
// //       </Link>

// //       <div className="flex items-center gap-4">
// //         <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
// //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
// //             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
// //           </svg>
// //           <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
// //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
// //               <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 1 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
// //             </svg>
// //           </div>
// //           {!!user && (
// //             <div>
// //               {user.username}
// //             </div>
// //           )}
// //         </Link>

// //         <div className="relative">
// //           <button onClick={toggleNotifications}>
// //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
// //               <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
// //             </svg>
// //             {notifications.filter(n => !n.is_read).length > 0 && (
// //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
// //                 {notifications.filter(n => !n.is_read).length}
// //               </span>
// //             )}
// //           </button>

// //           {showNotifications && (
// //             <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
// //               {error && (
// //                 <div className="p-4 text-center text-red-500">{error}</div>
// //               )}
// //               {notifications.length === 0 ? (
// //                 <div className="p-4 text-center text-gray-500">No notifications</div>
// //               ) : (
// //                 notifications.map(notification => (
// //                   <div
// //                     id={`notification-${notification.id}`}
// //                     key={notification.id}
// //                     className={`p-4 border-b ${notification.is_read ? 'bg-gray-100 test-read' : 'bg-white test-unread'}`}
// //                     onClick={(e) => {
// //                       console.log(`Rendering notification ${notification.id}: is_read=${notification.is_read}`);
// //                       markAsRead(notification.id, e);
// //                     }}
// //                   >
// //                     <p className="text-sm">{notification.message}</p>
// //                     <p className="text-xs text-gray-500">
// //                       {new Date(notification.created_at).toLocaleString()}
// //                     </p>
// //                   </div>
// //                 ))
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }



// import { Link, useLocation } from "react-router-dom";
// import { useContext, useEffect, useCallback } from "react";
// import { UserContext } from "./UserContext.jsx";
// import { useNotification } from "./NotificationContext.jsx";
// import SearchBar from "./SearchBar.jsx";
// import { useState } from "react";
// import axios from "axios";

// export default function Header() {
//   const { user, setUser } = useContext(UserContext);
//   const { refreshTrigger } = useNotification();
//   const location = useLocation();
//   const [filteredPlaces, setFilteredPlaces] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchNotifications = useCallback(() => {
//     if (user) {
//       axios.get('http://localhost:5000/notifications', { withCredentials: true })
//         .then(response => {
//           const normalizedNotifications = response.data.map(n => ({
//             ...n,
//             is_read: !!n.is_read
//           }));
//           console.log('Normalized notifications:', JSON.stringify(normalizedNotifications, null, 2));
//           setNotifications(normalizedNotifications);
//           setError(null);
//         })
//         .catch(error => {
//           console.error("Error fetching notifications:", error);
//           setError('Failed to fetch notifications');
//           if (error.response?.status === 401) {
//             console.log('Unauthorized, redirecting to login');
//             setUser(null);
//             window.location.href = '/login';
//           }
//         });
//     }
//   }, [user, setUser]);

//   useEffect(() => {
//     fetchNotifications();
//   }, [user, refreshTrigger, fetchNotifications]);

//   useEffect(() => {
//     console.log('Notifications state updated:', JSON.stringify(notifications, null, 2));
//   }, [notifications]);

//   const handleSearch = (searchResults) => {
//     setFilteredPlaces(searchResults);
//   };

//   const toggleNotifications = () => {
//     console.log('Toggling notifications, current state:', notifications);
//     setShowNotifications(!showNotifications);
//   };

//   const markAsRead = useCallback(async (notificationId, event) => {
//     event.stopPropagation();
//     console.log('markAsRead called with notificationId:', notificationId);
//     try {
//       const element = document.getElementById(`notification-${notificationId}`);
//       if (element) element.style.pointerEvents = 'none';
//       console.log('Sending PUT request to:', `http://localhost:5000/notifications/${notificationId}/read`);
//       const response = await axios.put(
//         `http://localhost:5000/notifications/${notificationId}/read`,
//         {},
//         { withCredentials: true }
//       );
//       console.log('PUT response:', response.data);
//       if (!response.data.success) {
//         throw new Error(response.data.error || 'Failed to mark as read');
//       }
//       console.log('Fetching updated notifications');
//       const { data } = await axios.get('http://localhost:5000/notifications', {
//         withCredentials: true,
//         params: { t: Date.now() }
//       });
//       const normalizedNotifications = data.map(n => ({
//         ...n,
//         is_read: !!n.is_read
//       }));
//       console.log('Re-fetched notifications:', JSON.stringify(normalizedNotifications, null, 2));
//       setNotifications([...normalizedNotifications]);
//       setError(null);
//     } catch (error) {
//       console.error('Error marking notification as read:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data
//       });
//       setError(`Failed to mark notification as read: ${error.message}`);
//     } finally {
//       const element = document.getElementById(`notification-${notificationId}`);
//       if (element) element.style.pointerEvents = 'auto';
//     }
//   }, []);

//   return (
//     <header className="flex items-center justify-between">
//       <Link to={'/'} className="flex items-center gap-1">
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
//         </svg>
//         <span className="font-bold text-xl">RoomNow</span>
//       </Link>

//       {/* {location.pathname === "/" && <SearchBar onSearch={handleSearch} />} */}

//       <div className="flex items-center gap-4">
//         <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//           </svg>
//           <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
//               <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 1 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
//             </svg>
//           </div>
//           {!!user && (
//             <div>
//               {user.username}
//             </div>
//           )}
//         </Link>

//         <div className="relative">
//           <button onClick={toggleNotifications}>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
//             </svg>
//             {notifications.filter(n => !n.is_read).length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 {notifications.filter(n => !n.is_read).length}
//               </span>
//             )}
//           </button>

//           {showNotifications && (
//             <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
//               {error && (
//                 <div className="p-4 text-center text-red-500">{error}</div>
//               )}
//               {notifications.length === 0 ? (
//                 <div className="p-4 text-center text-gray-500">No notifications</div>
//               ) : (
//                 notifications.map(notification => (
//                   <div
//                     id={`notification-${notification.id}`}
//                     key={notification.id}
//                     className={`p-4 border-b ${notification.is_read ? 'bg-gray-100 test-read' : 'bg-white test-unread'}`}
//                     onClick={(e) => {
//                       console.log(`Clicked notification ${notification.id}: is_read=${notification.is_read}`);
//                       markAsRead(notification.id, e);
//                     }}
//                   >
//                     <p className="text-sm">{notification.message}</p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(notification.created_at).toLocaleString()}
//                     </p>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }



import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useCallback } from "react";
import { UserContext } from "./UserContext.jsx";
import { useNotification } from "./NotificationContext.jsx";
import SearchBar from "./SearchBar.jsx";
import { useState } from "react";
import axios from "axios";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const { refreshTrigger } = useNotification();
  const location = useLocation();
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(() => {
    if (user) {
      axios.get('http://localhost:5000/notifications', { withCredentials: true })
        .then(response => {
          const normalizedNotifications = response.data.map(n => ({
            ...n,
            is_read: !!n.is_read
          }));
          console.log('Normalized notifications:', JSON.stringify(normalizedNotifications, null, 2));
          setNotifications(normalizedNotifications);
          setError(null);
        })
        .catch(error => {
          console.error("Error fetching notifications:", error);
          setError('Failed to fetch notifications');
          if (error.response?.status === 401) {
            console.log('Unauthorized, redirecting to login');
            setUser(null);
            window.location.href = '/login';
          }
        });
    }
  }, [user, setUser]);

  useEffect(() => {
    fetchNotifications();
  }, [user, refreshTrigger, fetchNotifications]);

  useEffect(() => {
    console.log('Notifications state updated:', JSON.stringify(notifications, null, 2));
  }, [notifications]);

  const handleSearch = (searchResults) => {
    setFilteredPlaces(searchResults);
  };

  const toggleNotifications = () => {
    console.log('Toggling notifications, current state:', notifications);
    setShowNotifications(!showNotifications);
  };

  const markAsRead = useCallback(async (notificationId, event) => {
    event.stopPropagation();
    console.log('markAsRead called with notificationId:', notificationId);
    try {
      const element = document.getElementById(`notification-${notificationId}`);
      if (element) element.style.pointerEvents = 'none';
      console.log('Sending PUT request to:', `http://localhost:5000/notifications/${notificationId}/read`);
      const response = await axios.put(
        `http://localhost:5000/notifications/${notificationId}/read`,
        {},
        { withCredentials: true }
      );
      console.log('PUT response:', response.data);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to mark as read');
      }
      console.log('Fetching updated notifications');
      const { data } = await axios.get('http://localhost:5000/notifications', {
        withCredentials: true,
        params: { t: Date.now() }
      });
      const normalizedNotifications = data.map(n => ({
        ...n,
        is_read: !!n.is_read
      }));
      console.log('Re-fetched notifications:', JSON.stringify(normalizedNotifications, null, 2));
      setNotifications([...normalizedNotifications]);
      setError(null);
    } catch (error) {
      console.error('Error marking notification as read:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      setError(`Failed to mark notification as read: ${error.message}`);
      // Fallback: Optimistically update UI
      setNotifications(prev => prev.map(n =>
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
    } finally {
      const element = document.getElementById(`notification-${notificationId}`);
      if (element) element.style.pointerEvents = 'auto';
    }
  }, []);

  return (
    <header className="flex items-center justify-between">
      <Link to={'/'} className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
        <span className="font-bold text-xl">RoomNow</span>
      </Link>



      <div className="flex items-center gap-4">
        <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 1 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
          </div>
          {!!user && (
            <div>
              {user.username}
            </div>
          )}
        </Link>

        <div className="relative">
          <button onClick={toggleNotifications}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
            {notifications.filter(n => !n.is_read).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.filter(n => !n.is_read).length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
              {error && (
                <div className="p-4 text-center text-red-500">{error}</div>
              )}
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No notifications</div>
              ) : (
                notifications.map(notification => (
                  <div
                    id={`notification-${notification.id}`}
                    key={notification.id}
                    className={`p-4 border-b ${notification.is_read ? 'bg-gray-100 test-read' : 'bg-white test-unread'}`}
                    onClick={(e) => {
                      console.log(`Clicked notification ${notification.id}: is_read=${notification.is_read}`);
                      markAsRead(notification.id, e);
                    }}
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}