import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient'; // Make sure you import Supabase client

function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false); // State for modal
  const [user, setUser] = useState(null); // State to store user information
  const { t, i18n } = useTranslation();

  const menu = [
    { name: t('Beranda'), path: '/' },
    { name: t('Layanan Inovasi'), path: '/layanan' },
    { name: t('Cari Inovasi'), path: '/cari' },
    { name: t('Referensi'), path: '/referensi' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  // Function for Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error during logout:', error.message);
    } else {
        setUser(null); // Reset user state to null after logout
    }
  };

  // Effect to check user status and fetch cart item count
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;

      // Check if currentUser exists before making any queries
      if (currentUser) {
        const { error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError.message);
        } else {
          setUser(currentUser);
        }
      }
    }

  getSession(); // Call getSession when the component mounts

  // Listen for auth state changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      setUser(session.user);
    } else if (event === 'SIGNED_OUT') {
      setUser(null);
    }
  });

  // Cleanup the listener on component unmount
  return () => {
    subscription.unsubscribe();
  };
}, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-[darkred] shadow-md">
      <div className="flex items-center">
        <img src="/lanri.png" alt="Logo" className="h-12 mr-3 p-2" />
        <span className="text-white font-bold text-2xl">INOLAND</span>
      </div>

      <ul className="flex gap-6 list-none font-poppins font-bold text-lg text-white">
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              activeClassName="font-bold text-white"
              className="no-underline text-white hover:text-[darkred] hover:bg-white transition p-2 rounded"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="text-white text-lg cursor-pointer border-none bg-transparent hover:text-gray-300 transition"
          >
            Selamat Datang, {user.email || user.username}! (Logout)
          </button>
        ) : (
          <button
            onClick={openModal}
            className="border-2 border-white bg-[darkred] text-white py-2 px-4 rounded-lg cursor-pointer text-lg hover:bg-white hover:text-[darkred] transition"
          >
            Masuk
          </button>
        )}
        <div className="flex gap-2">
          <button onClick={() => changeLanguage('en')} className="bg-transparent border-none cursor-pointer">
            <img src="/uk_flag.png" alt="English" className="border border-gray-300 rounded-md" width="30" height="20" />
          </button>
          <button onClick={() => changeLanguage('id')} className="bg-transparent border-none cursor-pointer">
            <img src="/indonesia_flag.png" alt="Bahasa Indonesia" className="border border-gray-300 rounded-md" width="30" height="20" />
          </button>
        </div>
      </div>

      {/* Login Form Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/3">
            <Login isOpen={isModalOpen} onClose={closeModal} onLoginSuccess={(loggedInUser) => {
              setUser(loggedInUser);
              closeModal();
            }} />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
