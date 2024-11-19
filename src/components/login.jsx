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
  
 
  return (
    <section className="h-screen bg-gray-100">
      <div className="container mx-auto h-full px-6 py-12">
        <div className="flex flex-wrap h-full items-center justify-center lg:justify-between">
          {/* Left column with an image */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
  <img 
    src="/photo.png" 
    alt="Illustration" 
    className="w-full max-w-[800px] mx-auto" 
  />
</div>

          {/* Right column with the login form */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-teal-600">IDAMAN LAN</h1>
              <p className="text-sm text-gray-600">
                Sistem Informasi Sumber Daya Manusia
                <br />
                Lembaga Administrasi Negara
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
              Selamat Datang
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Silakan masukkan username & password untuk login ke IDAMAN LAN
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-300 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-300 focus:outline-none"
              />
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring focus:ring-teal-300"
                />
                <label className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 focus:ring focus:ring-teal-300 focus:outline-none"
              >
                LOGIN
              </button>
            </form>

            {/* Footer Section */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Digital Signature By:</p>
              <img
                src="/path-to-digital-signature.png"
                alt="Digital Signature"
                className="mx-auto w-32 mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
