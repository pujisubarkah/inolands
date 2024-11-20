import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Example of simple login validation logic
    if (username === "username" && password === "password123") {
      navigate("/dashboard"); // Redirect to dashboard on successful login
        } else {
      setErrorMessage("Invalid username or password");
    }
  };
  
 
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen m-0 p-0">
      <div className="w-1/4 flex flex-col justify-center items-center bg-white p-8">
        <div className="flex flex-col items-center mb-6">
          <img src="/lanri.png" alt="Logo LANRI" className="w-20 mb-4" />
          <h1 className="text-4xl font-bold mb-2 text-teal-600">IDAMAN LAN</h1>
          <p className="text-gray-600 text-center">Sistem Informasi Sumber Daya Manusia Lembaga Administrasi Negara</p>
        </div>
        <div className="w-full max-w-md">
          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <div className="mb-4">
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-3 text-gray-500"></i>
                <input className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="username" 
                  type="text" 
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-3 text-gray-500"></i>
                <input className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
                <i 
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-3 text-gray-500 cursor-pointer`}
                  onClick={() => setShowPassword(!showPassword)}></i>
              </div>
            </div>
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" 
                  className="form-checkbox text-teal-600"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)} />
                <span className="ml-2 text-gray-700">Ingat saya?</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button 
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline" 
                type="submit">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-3/4 bg-gray-100 flex items-center justify-center m-0 p-0">
        <img 
          src="/lan-ilustrasi.jpeg" 
          alt="Illustration of Lembaga Administrasi Negara building with cartoon characters" 
          className="h-full object-cover" />
      </div>
    </div>
  );
};
export default Login;
