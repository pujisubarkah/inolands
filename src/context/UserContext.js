import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create a custom hook to access the UserContext
export const useUser = () => useContext(UserContext);

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This will hold the user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

