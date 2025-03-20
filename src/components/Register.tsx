import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import ReCAPTCHA from "react-google-recaptcha";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    instansi: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const SITE_KEY = '6LdPPfoqAAAAABZ-nF1TNZqd8qxJehYmk6fJWE6b'; // Ganti dengan Site Key reCAPTCHA Anda

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok.");
      return;
    }

    if (!captchaValue) {
      setErrorMessage("Silakan verifikasi bahwa Anda bukan robot.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.username,
          instansi: formData.instansi,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    // Pesan sukses menunggu verifikasi email
    setSuccessMessage(
      "Registrasi berhasil! Silakan cek email Anda untuk verifikasi sebelum login."
    );

    // Kosongkan input
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      instansi: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-poppins">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10 max-w-lg w-full mx-4">
        <button onClick={onClose} className="absolute top-2 right-4 text-2xl text-gray-700 hover:text-gray-900">
          &times;
        </button>
        <form onSubmit={handleRegister} className="w-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Daftar</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
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
          <div className="mb-4">
            <ReCAPTCHA  sitekey={SITE_KEY} onChange={handleCaptchaChange} />
          </div>
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
