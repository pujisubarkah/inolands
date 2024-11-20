import React from 'react';

const ListUnit = () => {
    const data = [
        { id: 1, name: 'Unit 1', description: 'Description 1' },
        { id: 2, name: 'Unit 2', description: 'Description 2' },
        { id: 3, name: 'Unit 3', description: 'Description 3' },
    ];

    return (
        <div className="container mx-auto p-6">
            <div className="text-center">
                <h2 className="text-lg font-semibold mb-4">Satuan Kerja</h2>
                <select id="satuan_kerja_id" name="satuan_kerja_id" 
                    className="w-full max-w-lg p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="">Pilih Satuan Kerja</option>
                    <option value="126">Balai Layanan Pemetaan Kompetensi</option>
                    <option value="115">CLTN</option>
                    <option value="100">LAN Jakarta</option>
                    <option value="111">Politeknik STIA LAN Bandung</option>
                    <option value="110">Politeknik STIA LAN Jakarta</option>
                    <option value="112">Politeknik STIA LAN Makassar</option>
                    <option value="124">Pusat Pelatihan dan Pengembangan dan Kajian Desentralisasi dan Otonomi Daerah</option>
                    <option value="125">Pusat Pelatihan dan Pengembangan dan Kajian Hukum Administrasi Negara</option>
                    <option value="122">Pusat Pelatihan dan Pengembangan dan Kajian Manajemen Pemerintahan</option>
                    <option value="123">Pusat Pelatihan dan Pengembangan dan Pemetaan Kompetensi Aparatur Sipil Negara</option>
                    <option value="101">Tugas Belajar</option>
                </select>
            </div>
        
            <div className="mt-6 text-center">
                <h3 className="text-xl font-bold">List Unit Kerja di LAN Jakarta</h3>
                <hr className="my-4 border-gray-300" />
                <a href="http://idaman.lan.go.id/list-all-pegawai/100" 
                    className="inline-block bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 float-right">
                    Lihat Semua Pegawai
                </a>
            </div>
        
            <div className="mt-8">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2 text-left">Satker</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Unit Kerja</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Jumlah Pegawai</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Pilihan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">LAN Jakarta</td>
                            <td className="border border-gray-300 px-4 py-2"></td>
                            <td className="border border-gray-300 px-4 py-2">412</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <a href="http://idaman.lan.go.id/list-all-pegawai/100" 
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                                    Lihat Data Pegawai
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2"></td>
                            <td className="border border-gray-300 px-4 py-2">Sekretariat Utama</td>
                            <td className="border border-gray-300 px-4 py-2">1</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <a href="http://idaman.lan.go.id/list-pegawai/all/101" 
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                                    Lihat Data Pegawai
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2"></td>
                            <td className="border border-gray-300 px-4 py-2">Biro Hukum dan Hubungan Masyarakat</td>
                            <td className="border border-gray-300 px-4 py-2">44</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <a href="http://idaman.lan.go.id/list-pegawai/all/10103" 
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                                    Lihat Data Pegawai
                                </a>
                            </td>
                        </tr>
                        {/* Tambahkan baris lain sesuai kebutuhan */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListUnit;