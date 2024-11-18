
import React from 'react';

const Pdflist = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 text-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-600 italic mb-6">
          "Ke pasar pagi membeli nanas, <br />
          Pulangnya mampir beli bubur. <br />
          Website kami akan tuntas, <br />
          Pada tanggal yang sudah terukur!"
        </p>
        <p className="text-gray-500 mb-6">
          We're excited to unveil our project! Stay tuned and mark your calendar.
        </p>
        <div className="bg-gray-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">Launch Date:</p>
          <p className="text-xl text-blue-600 font-bold">November 22, 2024</p>
        </div>
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pdflist;
