import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Make sure Supabase client is imported
import Register from './Register'; // Ensure the Register component is imported

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); 
  const [resetEmail, setResetEmail] = useState(''); 
  const [resetError, setResetError] = useState(null); 
  const [resetSuccess, setResetSuccess] = useState(false); 
  const navigate = useNavigate(); 

  const isLocal = window.location.hostname === 'localhost';
  const redirectUrl = isLocal
    ? 'http://localhost:3000/'  
    : 'https://inolands.vercel.app/';

  const signInWithEmail = async () => {
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in with email and password:', error.message);
      setError('Invalid email or password');
    } else {
      console.log('Logged in successfully:', data);
      navigate('/dashboard', { replace: true }); 
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmail();
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      window.location.href = `${redirectUrl}dashboard`;

    } catch (error) {
      console.error('Error during Google login:', error.message);
      alert('Terjadi kesalahan saat login dengan Google.');
    }
  };

  const handleRegisterRedirect = () => {
    setIsRegisterOpen(true); 
  };

  const handlePasswordReset = async () => {
    setResetError(null);
    setResetSuccess(false);
    const { error } = await supabase.auth.api.resetPasswordForEmail(resetEmail);

    if (error) {
      setResetError(error.message);
    } else {
      setResetSuccess(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="relative max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col">
      <button onClick={onClose} className="absolute top-0 right-5 text-5xl text-gray-700 hover:text-gray-900">
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
                name="email"
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {error && (
              <div className="mb-4 text-red-500">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#a2003b] text-white py-2 rounded-md hover:bg-red-800 transition duration-200"
            >
              Masuk
            </button>

            <p className="mt-4 text-sm text-gray-600">
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={handleRegisterRedirect} 
                className="text-blue-600 hover:underline"
              >
                Daftar di sini
              </button>
            </p>

            <p className="mt-2 text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setResetEmail('')} 
                className="text-blue-600 hover:underline"
              >
                Lupa Password? 
              </button>
            </p>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            Masuk dengan Google
          </button>
        </div>
      </div>

      {isRegisterOpen && (
        <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      )}

      {resetEmail && (
        <div className="modal-container">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold">Reset Password</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Email untuk reset password</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Masukkan email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {resetError && <div className="mb-4 text-red-500">{resetError}</div>}
            {resetSuccess && <div className="mb-4 text-green-500">Email reset password telah dikirim.</div>}

            <button
              onClick={handlePasswordReset}
              className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
              Kirim Link Reset
            </button>

            <button
              onClick={() => setResetEmail('')}
              className="mt-2 w-full bg-gray-300 text-gray-700 py-2 rounded-md"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
