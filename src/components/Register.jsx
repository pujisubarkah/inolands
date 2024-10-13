// src/pages/Register.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // import the Supabase client
import bcrypt from 'bcryptjs';


const Register = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: '',
    instansi: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
       // Check if username already exists
    const { data: existingUser, error: fetchError } = await supabase
    .from('user_id') // your users table
    .select('username')
    .eq('username', formData.username)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // Check for a specific error
    throw fetchError; // Handle other errors
  }

  if (existingUser) {
    setErrorMessage("Username already exists!");
    return;
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash the password
     
      // Insert the new user data into the 'users' table in Supabase
      const { data, error } = await supabase
        .from('user_id') // your table name
        .insert([
          {
            username: formData.username,
            instansi: formData.instansi,
            email: formData.email,
            password: hashedPassword, // Store the hashed password
          },
        ]);

      if (error) throw error;

      console.log("User registered:", data);
      setErrorMessage('');
      closeModal(); // Close modal on successful registration
    } catch (error) {
      console.error("Error registering user:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="relative">
      {/* Close button */}
      <button 
        onClick={closeModal} 
        className="absolute top-0 right-0 m-4 text-gray-600 text-2xl hover:text-gray-800"
      >
        &times;
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Daftar</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Instansi
          </label>
          <input
            type="text"
            name="instansi"
            value={formData.instansi}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Masukkan instansi Anda"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Daftar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
