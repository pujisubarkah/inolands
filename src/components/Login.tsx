import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Register from './Register';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const signInWithEmail = async () => {
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in:', error.message);
      setError('Email atau password salah');
      return;
    }

    console.log('Logged in successfully:', data);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) {
      console.error('Error getting user:', userError?.message);
      setError('Gagal mendapatkan data user');
      return;
    }

    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('role_id')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError.message);
      setError('Gagal mengambil profil pengguna');
      return;
    }

    if (userProfile?.role_id === '1') {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/', { replace: true });
    }

    onClose(); // Pastikan onClose hanya dipanggil jika login berhasil
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmail();
  };

  // Fungsi untuk menutup modal Register
  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="relative max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-[0px] right-[20px] text-5xl text-gray-700 hover:text-gray-900"
      >
        &times;
      </button>

      <div className="flex">
        <div className="bg-transparent p-6 flex flex-col justify-center items-center w-1/3 rounded-l-lg">
          <img src="/ino.png" alt="Logo" className="w-32 h-auto mb-4" />
        </div>

        <div className="p-6 w-2/3">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {error && <div className="mb-4 text-red-500">{error}</div>}

            <button
              type="submit"
              className="w-full bg-[#3781c8] text-white py-2 rounded-md hover:bg-blue-800 transition duration-200"
            >
              Masuk
            </button>

            <p className="mt-4 text-sm text-gray-600">
              Belum punya akun?{' '}
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="text-blue-600 hover:underline"
              >
                Daftar di sini
              </button>
            </p>
          </form>
        </div>
      </div>

      {isRegisterOpen && (
        <Register isOpen={isRegisterOpen} onClose={closeRegisterModal} />
      )}
    </div>
  );
};

export default Login;
