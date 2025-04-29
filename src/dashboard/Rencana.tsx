import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; // pakai icon FaSend alias PaperPlane

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

  const [showModal, setShowModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    phase: 'preparation',
    activity: '',
    executor: '',
    output: '',
    method: '',
    timeline: Array(12).fill(false),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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

  const handleActivityChange = (phase, index, field, value) => {
    const updatedActivities = formData.activities[phase].map((activity, i) =>
      i === index ? { ...activity, [field]: value } : activity
    );
    setFormData({
      ...formData,
      activities: { ...formData.activities, [phase]: updatedActivities }
    });
  };

  const addActivity = () => {
    setShowModal(true);
  };

  const saveNewActivity = () => {
    setFormData({
      ...formData,
      activities: {
        ...formData.activities,
        [newActivity.phase]: [...formData.activities[newActivity.phase], {
          activity: newActivity.activity,
          executor: newActivity.executor,
          output: newActivity.output,
          method: newActivity.method,
          timeline: newActivity.timeline,
        }]
      }
    });
    setNewActivity({
      phase: 'preparation',
      activity: '',
      executor: '',
      output: '',
      method: '',
      timeline: Array(12).fill(false),
    });
    setShowModal(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-bold mb-5">FORM RENCANA AKSI INOVASI</h1>

      <form onSubmit={handleSubmit}>

        {/* Form OPD dan Kontak */}
        <div className="flex flex-col gap-4 mb-5">
          <input
            type="text"
            name="opdName"
            value={formData.opdName}
            onChange={handleChange}
            placeholder="Nama OPD"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Contact Person"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telp/HP"
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email OPD"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="innovationTitle"
            value={formData.innovationTitle}
            onChange={handleChange}
            placeholder="Judul Inovasi"
            className="border p-2 rounded"
          />
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end mb-5">
          <button 
            type="submit"
            className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded flex items-center gap-2"
          >
            <FaPaperPlane /> Kirim
          </button>
        </div>

        {/* Section Persiapan */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Persiapan</h2>
          
          <button
            type="button"
            onClick={addActivity}
            className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-500"
          >
            Tambah Kegiatan
          </button>

          {/* Tabel */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Kegiatan</th>
                  <th className="px-4 py-2 border">Pelaksana</th>
                  <th className="px-4 py-2 border">Output</th>
                  <th className="px-4 py-2 border">Metode</th>
                  <th className="px-4 py-2 border">Timeline (Jan-Des)</th>
                </tr>
              </thead>
              <tbody>
                {formData.activities.preparation.map((activity, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{activity.activity}</td>
                    <td className="border p-2">{activity.executor}</td>
                    <td className="border p-2">{activity.output}</td>
                    <td className="border p-2">{activity.method}</td>
                    <td className="border p-2">
                      {activity.timeline.map((checked, month) => (
                        <input
                          key={month}
                          type="checkbox"
                          className="mr-1"
                          checked={checked}
                          onChange={() => toggleTimeline('preparation', index, month)}
                        />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </form>

      {/* Modal Tambah Kegiatan */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">
            <h2 className="text-xl font-bold mb-4">Tambah Kegiatan</h2>

            <div className="flex flex-col gap-2">
              <label>Phase</label>
              <select
                value={newActivity.phase}
                onChange={(e) => setNewActivity({ ...newActivity, phase: e.target.value })}
                className="border p-2 rounded"
              >
                <option value="preparation">Persiapan</option>
                <option value="implementation">Pelaksanaan</option>
                <option value="monitoring">Monitoring</option>
                <option value="evaluation">Evaluasi</option>
              </select>

              <input
                type="text"
                placeholder="Kegiatan"
                value={newActivity.activity}
                onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Pelaksana"
                value={newActivity.executor}
                onChange={(e) => setNewActivity({ ...newActivity, executor: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Output"
                value={newActivity.output}
                onChange={(e) => setNewActivity({ ...newActivity, output: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Metode"
                value={newActivity.method}
                onChange={(e) => setNewActivity({ ...newActivity, method: e.target.value })}
                className="border p-2 rounded"
              />

              <div>
                <p className="mb-2 font-semibold">Timeline (Centang bulan pelaksanaan)</p>
                <div className="grid grid-cols-6 gap-1">
                  {newActivity.timeline.map((checked, idx) => (
                    <label key={idx} className="flex items-center space-x-1 text-sm">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          const updatedTimeline = [...newActivity.timeline];
                          updatedTimeline[idx] = !updatedTimeline[idx];
                          setNewActivity({ ...newActivity, timeline: updatedTimeline });
                        }}
                      />
                      <span>{idx + 1}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={saveNewActivity}
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-500"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rencana;
