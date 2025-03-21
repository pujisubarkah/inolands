import React, { useState } from 'react';

const Rencana = () => {
  const [formData, setFormData] = useState({
    opdName: '',
    contactPerson: '',
    phone: '',
    email: '',
    innovationTitle: '',
    activities: {
      preparation: [],
      implementation: [],
      monitoring: [],
      evaluation: []
    }
  });

  // Fungsi untuk handle perubahan input OPD dan inovasi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk menambah kegiatan baru ke tahap tertentu
  const addActivity = (phase) => {
    setFormData({
      ...formData,
      activities: {
        ...formData.activities,
        [phase]: [
          ...formData.activities[phase],
          { activity: '', executor: '', output: '', method: '', timeline: Array(12).fill(false) }
        ]
      }
    });
  };

  // Fungsi untuk handle perubahan tiap kegiatan
  const handleActivityChange = (phase, index, field, value) => {
    const updatedActivities = formData.activities[phase].map((activity, i) =>
      i === index ? { ...activity, [field]: value } : activity
    );
    setFormData({
      ...formData,
      activities: { ...formData.activities, [phase]: updatedActivities }
    });
  };

  // Fungsi untuk handle checkbox timeline per bulan
  const toggleTimeline = (phase, index, month) => {
    const updatedActivities = formData.activities[phase].map((activity, i) =>
      i === index ? {
        ...activity,
        timeline: activity.timeline.map((checked, m) => (m === month ? !checked : checked))
      } : activity
    );
    setFormData({
      ...formData,
      activities: { ...formData.activities, [phase]: updatedActivities }
    });
  };

  // Fungsi untuk handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

return (
    <div>
        <h1 className="text-center text-3xl font-bold">FORM RENCANA AKSI INOVASI</h1>


        <div className="flex justify-end mb-5">
            <button 
                type="submit" 
                className="bg-red-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
                Kirim
            </button>
        </div>
        <form onSubmit={handleSubmit}>
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

        <div className="flex items-center mb-5">
            <label htmlFor="email" className="inline-block w-24 mr-6 text-right font-bold text-gray-600">
                JUDUL INOVASI
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

             {/* Form Persiapan */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Persiapan</h2>
        
        {/* Tombol Tambah Kegiatan */}
        <button
          onClick={addActivity}
          className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-500 focus:outline-none"
        >
          Tambah Kegiatan
        </button>
        
        {/* Tabel kegiatan */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr>
              <th className="px-4 py-2 border border-gray-300">Tahap</th>
                <th className="px-4 py-2 border border-gray-300">Kegiatan</th>
                <th className="px-4 py-2 border border-gray-300">Pelaksana</th>
                <th className="px-4 py-2 border border-gray-300">Output</th>
                <th className="px-4 py-2 border border-gray-300">Metode</th>
                <th className="px-4 py-2 border border-gray-300">Rencana Waktu</th>
                <th className="px-4 py-2 border border-gray-300">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {formData.activities.preparation.map((activity, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={activity.activity}
                      onChange={(e) => handleActivityChange(index, 'activity', e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="Kegiatan"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={activity.executor}
                      onChange={(e) => handleActivityChange(index, 'executor', e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="Pelaksana"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={activity.output}
                      onChange={(e) => handleActivityChange(index, 'output', e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="Output"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={activity.method}
                      onChange={(e) => handleActivityChange(index, 'method', e.target.value)}
                      className="border p-2 w-full rounded"
                      placeholder="Metode"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={activity.timeline}
                      onChange={() => toggleTimeline('preparation', index, 0)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  </div>
  );
};

export default Rencana;


