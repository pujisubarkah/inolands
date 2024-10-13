import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Make sure you import Supabase client
import bcrypt from 'bcryptjs'; // Import bcrypt for password comparison
import { useUser } from '../context/UserContext'; // Import useUser from context

const Login = ({ closeModal, openRegisterModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useUser(); // Access setUser from the context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      // Query Supabase to find the user with the provided email
      const { data, error } = await supabase
        .from('user_id') // Replace 'user_id' with the correct table name in Supabase
        .select('*')
        .eq('email', email)
        .single(); // Retrieve a single user record

      if (error || !data) {
        console.error('Login failed:', error ? error.message : 'User not found');
        alert('Login gagal. Email atau password salah.');
        return; // Exit the function if user is not found
      }

      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, data.password);

      if (!isMatch) {
        console.error('Incorrect password');
        alert('Login gagal. Email atau password salah.');
      } else {
        console.log('Login berhasil:', data);
        
        // Store the logged-in user in the context
        setUser(data); // Save the user data in the context
        
        // Redirect to the dashboard after successful login
        navigate('/Sidebar');
        closeModal(); // Close the modal after successful login
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Terjadi kesalahan saat login.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signIn({
        provider: 'google',
      });

      if (error) {
        throw error;
      }

      // Assuming Google login returns user data in supabase.auth.user()
      const googleUser = supabase.auth.user();
      setUser(googleUser); // Store the Google user in context
      
      // Redirect to the dashboard after successful login
      navigate('/Sidebar');
      closeModal(); // Close the modal after successful login
    } catch (error) {
      console.error('Error during Google login:', error.message);
      alert('Terjadi kesalahan saat login dengan Google.');
    }
  };

  const handleContactAdmin = () => {
    const { email } = formData;

    if (!email) {
      alert('Silakan masukkan email Anda terlebih dahulu.');
      return;
    }

    alert(`Silakan hubungi admin untuk reset password`);
  };

  return (
    <div className="relative max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col">
      <button onClick={closeModal} className="absolute top-[0px] right-[20px] text-5xl text-gray-700 hover:text-gray-900">
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
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

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
                onClick={() => {
                  closeModal();
                  openRegisterModal();
                }}
                className="text-blue-600 hover:underline"
              >
                Daftar di sini
              </button>
            </p>

            <p className="mt-2 text-sm text-gray-600">
              <button
                type="button"
                onClick={handleContactAdmin}
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

