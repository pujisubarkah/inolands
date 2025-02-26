import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient'; // Make sure you import Supabase client
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false); // State for modal
  const [user, setUser] = useState(null); // State to store user information
  interface UserProfile {
    nama_lengkap: string;
    instansi: string;
  }

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // State to store user profile
  const [isMenuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [isProfileOpen, setProfileOpen] = useState(false); // State for profile dropdown
  const { t, i18n } = useTranslation();

  const menu = [
    { name: t('Beranda'), path: '/' },
    { name: t('Layanan Inovasi'), path: '/layanan' },
    { name: t('Cari Inovasi'), path: '/cari' },
    { name: t('Referensi'), path: '/referensi' },
    { name: t('Pengetahuan'), path: '/pengetahuan' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const toggleProfile = () => setProfileOpen(!isProfileOpen);

  // Function for Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during logout:', error.message);
    } else {
      setUser(null); // Reset user state to null after logout
      setUserProfile(null); // Reset user profile state to null after logout
    }
  };

  // Effect to check user status and fetch cart item count
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      if (currentUser) {
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', currentUser.id)
          .single();
        if (profileError) {
          console.error('Error fetching user profile:', profileError.message);
        } else {
          setUser(currentUser);
          setUserProfile(userProfile);
        }
      }
    };
    getSession(); // Call getSession when the component mounts

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string) => {
      if (event === 'SIGNED_IN') {
        getSession();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserProfile(null);
      }
    });

    // Cleanup the listener on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  

  return (
    <nav className="flex justify-between items-center p-4 bg-[#3781c8] shadow-md">
      {/* Logo */}
      <div className="flex items-center">
      <img src="/lanri.png" alt="Logo" className="h-12 mr-3 p-2 sm:h-16" />
      <span className="text-white font-bold text-xl sm:text-2xl">INOLAND</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
      <ul className="flex gap-6 list-none font-poppins font-bold text-lg text-white">
        {menu.map((item) => (
        <li key={item.name} className="my-2 md:my-0">
          <NavLink
          to={item.path}
          className={({ isActive }) => isActive ? "font-bold text-white no-underline text-white hover:text-[#3781c8] hover:bg-white transition p-2 rounded" : "no-underline text-white hover:text-[#3781c8] hover:bg-white transition p-2 rounded"}
          >
          {item.name}
          </NavLink>
        </li>
        ))}
      </ul>
      </div>

      {/* Right Side (Profile, Language, Hamburger Menu) */}
      <div className="flex items-center gap-4">
      {/* Hamburger Menu for Mobile */}
      <button className="md:hidden text-white" onClick={toggleMenu}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Mobile Menu */}
      <ul
        className={`absolute top-full left-0 w-full bg-white shadow-lg rounded-lg p-4 md:hidden list-none font-poppins font-bold text-lg text-[#3781c8] ${
        isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        {menu.map((item) => (
        <li key={item.name} className="my-2 md:my-0">
          <NavLink
          to={item.path}
          className={({ isActive }) => isActive ? "font-bold text-[#3781c8]" : "no-underline text-[#3781c8] hover:text-white hover:bg-[#3781c8] transition p-2 rounded block"}
          onClick={toggleMenu} // Close menu after clicking a link
          >
          {item.name}
          </NavLink>
        </li>
        ))}
      </ul>

      {/* Profile Dropdown */}
      {userProfile ? (
        <div className="relative">
        <button
          className="text-white text-lg cursor-pointer border-none bg-transparent hover:text-gray-300 transition"
          onClick={toggleProfile}
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
          <p className="px-4 py-2 text-sm text-gray-700">{t('Selamat Datang')}, {userProfile.nama_lengkap} dari {userProfile.instansi}!</p>
          <NavLink to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {t('Admin')}
          </NavLink>
          <NavLink to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {t('Dashboard')}
          </NavLink>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {t('Logout')}
          </button>
          </div>
        )}
        </div>
      ) : (
        <button
        onClick={openModal}
        className="border-2 border-white bg-[#3781c8] text-white py-2 px-4 rounded-lg cursor-pointer text-lg hover:bg-white hover:text-[#3781c8] transition"
        >
        {t('Masuk')}
        </button>
      )}

      {/* Language Selector */}
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded shadow-lg w-1/3 sm:w-1/2 md:w-1/3">
        <Login isOpen={isModalOpen} onClose={closeModal} onLoginSuccess={(loggedInUser: any) => {
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
