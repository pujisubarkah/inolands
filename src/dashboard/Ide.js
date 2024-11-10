import React, { useState } from 'react';

const Ide = () => {
  const [formData, setFormData] = useState({
    namaOPD: '',
    contactPerson: '',
    telp: '',
    email: '',
    latarBelakang: '',
    ideInovasi: '',
    tujuanInovasi: '',
    targetPerubahan: '',
    stakeholderInovasi: '',
    sumberDaya: '',
    penerimaManfaat: '',
    kebaruan: '',
    deskripsiSingkat: '',
    waktuPelaksanaan: '',
    usulanInovasi: '',
    namaPimpinan: '',
    nipPimpinan: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you can add code to send formData to a server or API
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Form Inovasi</h2>

      {/* Compact flex layout for primary contact information */}
      <div className="flex items-center mb-5">
        <label htmlFor="namaOPD" className="inline-block w-24 mr-6 text-right font-bold text-gray-600">
          Nama OPD
        </label>
        <input
          type="text"
          id="namaOPD"
          name="namaOPD"
          value={formData.namaOPD}
          onChange={handleChange}
          placeholder="Masukkan nama OPD"
          className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center mb-5">
        <label htmlFor="contactPerson" className="inline-block w-24 mr-6 text-right font-bold text-gray-600">
          Contact Person
        </label>
        <input
          type="text"
          id="contactPerson"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          placeholder="Nama PIC inovasi"
          className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center mb-5">
        <label htmlFor="telp" className="inline-block w-24 mr-6 text-right font-bold text-gray-600">
          Telp/HP
        </label>
        <input
          type="text"
          id="telp"
          name="telp"
          value={formData.telp}
          onChange={handleChange}
          placeholder="Nomor telepon"
          className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center mb-5">
        <label htmlFor="email" className="inline-block w-24 mr-6 text-right font-bold text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email OPD"
          className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>

      {/* Individual fields for other form sections */}
      <label className="block mb-2">Latar Belakang</label>
      <textarea
        name="latarBelakang"
        value={formData.latarBelakang}
        onChange={handleChange}
        placeholder="Masalah yang dihadapi atau kondisi yang ingin diperbaiki"
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2">Ide Inovasi Terpilih</label>
      <textarea
        name="ideInovasi"
        value={formData.ideInovasi}
        onChange={handleChange}
        placeholder="Tuliskan ide inovasi"
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Additional fields follow similar structure */}
      <div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block mb-2">Tujuan Inovasi</label>
    <textarea
      name="tujuanInovasi"
      value={formData.tujuanInovasi}
      onChange={handleChange}
      placeholder="Apa tujuan inovasi ini?"
      className="w-full p-2 border rounded"
    />
  </div>
  
  <div>
    <label className="block mb-2">Target Perubahan</label>
    <textarea
      name="targetPerubahan"
      value={formData.targetPerubahan}
      onChange={handleChange}
      placeholder="Apa target Perubahan inovasi ini?"
      className="w-full p-2 border rounded"
    />
  </div>
</div>
{/* 4 kolom */}
<div className="grid grid-cols-4 gap-4">
  <div>
    <label className="block mb-2">Stakeholder Inovasi</label>
    <textarea
      name="stakeholderInovasi"
      value={formData.stakeholderInovasi}
      onChange={handleChange}
      placeholder="Siapa stakeholder inovasi ini?"
      className="w-full p-2 border rounded"
    />
  </div>

  <div>
    <label className="block mb-2">Sumber Daya</label>
    <textarea
      name="sumberDayaInovasi"
      value={formData.sumberDayaInovasi}
      onChange={handleChange}
      placeholder="Apa sumber daya inovasi ini?"
      className="w-full p-2 border rounded"
    />
  </div>

  <div>
    <label className="block mb-2">Penerima Manfaat</label>
    <textarea
      name="penerimaManfaat"
      value={formData.penerimaManfaat}
      onChange={handleChange}
      placeholder="Siapa penerima manfaat dari inovasi ini?"
      className="w-full p-2 border rounded"
    />
  </div>

  <div>
    <label className="block mb-2">Kebaruan</label>
    <textarea
      name="kebaruan"
      value={formData.kebaruan}
      onChange={handleChange}
      placeholder="Apa kebaruan inovasi ini?"
      className="w-full p-2 border rounded"
    />
  </div>
</div>
{/* 1 kolom */}
<label className="block mb-2">Deskripsi Singkat Ide Inovasi</label>
      <textarea
        name="deskripsiSingkat"
        value={formData.deskripsiSingkat}
        onChange={handleChange}
        placeholder="Penjelasan singkat tentang ide inovasi"
        className="w-full p-2 mb-4 border rounded"
      />
<label className="block mb-2">Keterangan</label>
      <textarea
        name="Keterangan"
        value={formData.keterangan}
        onChange={handleChange}
        placeholder="Penjelasan singkat tentang ide inovasi"
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Continue with other fields as needed */}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
        Submit
      </button>
    </form>
  );
};

export default Ide;
