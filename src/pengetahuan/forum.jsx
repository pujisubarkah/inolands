
import React from 'react';

const Forum = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-600 italic mb-6">
          "Jalan-jalan ke pasar baru, <br />
          Jangan lupa membeli ikan. <br />
          Tunggu sebentar halaman baru, <br />
          Akan hadir penuh harapan!"
        </p>
        <p className="text-gray-500">
          We're working hard to bring something amazing for you!
        </p>
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forum;
