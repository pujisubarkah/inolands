import React, { createContext, useState, useEffect } from 'react';

export const RoleContext = createContext();

const RoleProvider = ({ children }) => {
  const [userRoleMenus, setUserRoleMenus] = useState([]);

  // Fetch role-based menu data (this bisa didapat dari API atau hardcoded)
  useEffect(() => {
    const fetchedMenus = [
      { name: 'Dashboard', visible: true },
      { name: 'List All Pegawai', visible: true },
      { name: 'User Dashboard', visible: false },
    ];
    setUserRoleMenus(fetchedMenus);
  }, []);

  return (
    <RoleContext.Provider value={{ userRoleMenus }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleProvider;