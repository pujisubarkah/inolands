import React from "react";
import { FaBell, FaPowerOff } from "react-icons/fa";

const Navbar = () => {
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
            <span className="font-medium">
                Selamat Datang, Administrator
            </span>

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
