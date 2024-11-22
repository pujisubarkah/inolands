import React, { useEffect, useState } from "react";
import { FaBell, FaPowerOff } from "react-icons/fa";

const Navbar = () => {
    const [userName, setUserName] = useState("");

useEffect(() => {
// Ambil data user dari localStorage (atau sessionStorage)
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
    setUserName(user.nama); // Mengambil nama pengguna yang disimpan di localStorage
    }
    }, []);

return (
    <div className="flex justify-between items-center p-4 bg-[#333] text-white">
        {/* Left Section */}
        <div></div> {/* Empty to maintain spacing */}

        {/* Right Section */}
        <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                title="Notifications"
            >
                <FaBell className="mr-2" />
            </button>

           {/* Greeting */}
        {userName && (
          <span className="font-medium">Selamat Datang, {userName}</span>
        )}

            {/* Logout Button */}
            <a
                href="http://idaman.lan.go.id/auth/logout"
                className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                title="Logout"
            >
                <FaPowerOff className="mr-2" />
            </a>
        </div>
    </div>
);
};

export default Navbar;
