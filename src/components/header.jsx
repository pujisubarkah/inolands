import React from "react";

// Assuming you have a ScrollingText component, otherwise, you can create one.
const ScrollingText = ({ text, className }) => {
  return (
    <div className={`whitespace-nowrap overflow-hidden`}>
      <p className={`animate-marquee ${className}`}>{text}</p>
    </div>
  );
};

const Header = () => {
  return (
    <>
      <div
        className="relative bg-cover bg-center text-white p-6 mb-6"
        style={{
          backgroundImage:
            'url(https://lan.go.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-24-at-13.43.42-1024x682.jpeg)',
        }}
      >
        <div className="absolute inset-0 bg-teal-700 opacity-75"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold">IDAMAN</h1>
          <p className="text-2xl mt-2">
            Sistem Informasi Sumber Daya Manusia
          </p>
          
        </div>
      </div>

      
    </>
  );
};

export default Header;
