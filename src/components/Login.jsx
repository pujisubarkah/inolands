import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Make sure you import Supabase client

const Login = ({  isOpen, onClose  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Untuk menangani kesalahan login
  const navigate = useNavigate(); // Gunakan useNavigate untuk redirecting
  
  const signInWithEmail = async () => {
    // Reset error sebelum mencoba login
    setError(null);

    // Attempt login with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in with email and password:', error.message);
      setError('Invalid email or password');
    } else {
      console.log('Logged in successfully:', data);
      navigate('/Sidebar', { replace: true }); // Redirect to /Penilaian without adding to history
      onClose(); // Tutup modal setelah login berhasil
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent form submission
      await signInWithEmail();  // Panggil fungsi sign-in
    };
  
      if (!isOpen) return null; // Jika modal tidak terbuka, kembalikan null

  const handleGoogleLogin = async () => {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            throw error; // Handle the error if login fails
        }

        // Redirect to the home page or dashboard after successful login
        navigate('/Sidebar');

        // Only close the modal after confirming the user is set
        // Optionally, you can add a timeout here to give time for the UI to update
        setTimeout(() => {
            onClose(); // Close the modal after a brief delay
        }, 500); // Delay in milliseconds (adjust as needed)
    } catch (error) {
        console.error('Error during Google login:', error.message);
        alert('Terjadi kesalahan saat login dengan Google.');
    }
};

  return (
    <div className="relative max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col">
      <button onClick={onClose} className="absolute top-[0px] right-[20px] text-5xl text-gray-700 hover:text-gray-900">
        &times;
      </button>

      <div className="flex">
        {/* Left side - Logo */}
        <div className="bg-transparent p-6 flex flex-col justify-center items-center w-1/3 rounded-l-lg">
          <img src="/ino.png" alt="Logo" className="w-32 h-auto mb-4" />
        </div>

        {/* Right side - Login Form */}
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
                className="text-blue-600 hover:underline"
              >
                Daftar di sini
              </button>
            </p>

            <p className="mt-2 text-sm text-gray-600">
              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Lupa Password? 
              </button>
            </p>
          </form>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            Masuk dengan Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
