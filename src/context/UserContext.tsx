import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state and setter

  const logout = () => {
    setUser(null); // Clear user state on logout
    // Add any other logout logic, such as clearing tokens, etc.
    localStorage.removeItem('token'); // Example of clearing token if using localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}> {/* Add logout to the value */}
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using UserContext
export const useUser = () => {
  return useContext(UserContext);
};
