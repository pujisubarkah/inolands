import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full px-4">
      {/* Section: Daftar Status */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold font-poppins">DAFTAR STATUS</h3>
      </div>
      <hr className="my-4 border-gray-300" />
      <table className="w-full border-collapse border border-gray-300 mb-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Jumlah</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {[
            { status: "Draft", jumlah: 244, link: "1" },
            { status: "Usul Perubahan", jumlah: 8, link: "2" },
            { status: "Revisi", jumlah: 1, link: "3" },
            { status: "Sudah Verifikasi SDM", jumlah: 757, link: "4" },
            { status: "Usul Perubahan (Pegawai Unit Kerja)", jumlah: 0, link: "5" },
            { status: "Revisi Perubahan (Pegawai Unit Kerja)", jumlah: 0, link: "6" },
          ].map(({ status, jumlah, link }, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{status}</td>
              <td className="border border-gray-300 px-4 py-2">{jumlah}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={`http://idaman.lan.go.id/list-permohonan/${link}`}
                  className="text-teal-600 hover:underline"
                >
                  Lihat Detail
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section: Statistik Operator */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          STATISTIK OPERATOR
        </h3>
      </div>
      <hr className="mb-6" />
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="entries" className="text-sm text-gray-600">
            Show
          </label>
          <select
            id="entries"
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring focus:ring-blue-300"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
        <div className="relative">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            id="search"
            placeholder="Search"
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              <th className="py-3 px-4 border-b">Nama Operator</th>
              <th className="py-3 px-4 border-b">Jumlah</th>
              <th className="py-3 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Lina Indarwati", jumlah: 315, link: "5" },
              { name: "Iwan Prasetyo", jumlah: 2, link: "6" },
              { name: "Achmad Fauzi", jumlah: 5, link: "7" },
            ].map(({ name, jumlah, link }, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{name}</td>
                <td className="py-3 px-4 border-b">{jumlah}</td>
                <td className="py-3 px-4 border-b">
                  <a
                    href={`http://idaman.lan.go.id/list-log-edit/${link}`}
                    className="text-blue-600 hover:underline"
                  >
                    Lihat Detail
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Showing 1 to 10 of 24 entries
        </span>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          {[1, 2, 3].map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-sm rounded ${
                page === 1
                  ? "text-white bg-blue-600 hover:bg-blue-700"
                  : "text-gray-600 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
