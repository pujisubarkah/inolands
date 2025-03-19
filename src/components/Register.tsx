import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    confirmPassword: "",
    password: "",
    username: "",
    instansi: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok.");
      return;
    }

    console.log("Attempting to register user with formData:", formData);

    const { data, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError || !data.user) {
      console.error("Auth error:", authError);
      setErrorMessage(authError ? authError.message : "Registrasi gagal.");
      return;
    }

    const { error: dbError } = await supabase.from("users").insert([
      {
        auth_id: data.user.id,
        username: formData.username,
        email: formData.email,
        instansi: formData.instansi,
      },
    ]);

    if (dbError) {
      console.error("Database error:", dbError);
      setErrorMessage(dbError.message);
      return;
    }

    console.log("User  registered successfully, closing modal");
    onClose();
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null; // Menambahkan kondisi untuk tidak merender jika tidak terbuka

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-poppins">
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="relative bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10 max-w-lg w-full mx-4">
        <button onClick={handleClose} className="absolute top-2 right-4 text-2xl text-gray-700 hover:text-gray-900">
          &times;
        </button>

        <form onSubmit={handleRegister} className="w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Daftar</h2>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          {[
            { label: "Username", name: "username", type: "text" },
            { label: "Instansi", name: "instansi", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Konfirmasi Password", name: "confirmPassword", type: "password" },
          ].map(({ label, name, type }) => (
            <div className="mb-4 flex items-center" key={name}>
              <label className="w-1/3 text-gray-700 text-sm font-bold">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={`Masukkan ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Daftar
            </button>
         
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
