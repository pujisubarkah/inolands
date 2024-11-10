import React, { useState } from 'react';
import './diagnose.css'; // Import the CSS file


function InnovationForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    namaOPD: '',
    contactPerson: '',
    Telp: '',
    email: '',
    latarBelakang: '',
    ideInovasi: '',
    tujuanInovasi: '',
    targetPerubahan: '',
    stakeholders: '',
    sumberDaya: '',
    penerimaManfaat: '',
    kebaruan: '',
    deskripsi: '',
    keterangan: '',
  });

  // State for admin reviews
  const [adminReviews, setAdminReviews] = useState({
    latarBelakang: '',
    ideInovasi: '',
    tujuanInovasi: '',
    targetPerubahan: '',
    stakeholders: '',
    sumberDaya: '',
    penerimaManfaat: '',
    kebaruan: '',
    deskripsi: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle admin review change
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setAdminReviews((prevReviews) => ({
      ...prevReviews,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission logic
    console.log(formData);
    console.log('Admin Reviews:', adminReviews);
  };

  return (
    <div>
      <h1>Form Inovasi</h1>
      <form onSubmit={handleSubmit}>
        {/* Existing form fields */}
        <div>
          <label>NAMA OPD:</label>
          <input
            type="text"
            name="namaOPD"
            value={formData.namaOPD}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Latar Belakang:</label>
          <textarea
            name="latarBelakang"
            value={formData.latarBelakang}
            onChange={handleChange}
          />
          <textarea
            name="latarBelakangReview"
            value={adminReviews.latarBelakang}
            onChange={handleReviewChange}
            placeholder="Review Admin untuk Latar Belakang..."
          />
        </div>

        <div>
          <label>Ide Inovasi:</label>
          <textarea
            name="ideInovasi"
            value={formData.ideInovasi}
            onChange={handleChange}
          />
          <textarea
            name="ideInovasiReview"
            value={adminReviews.ideInovasi}
            onChange={handleReviewChange}
            placeholder="Review Admin untuk Ide Inovasi..."
          />
        </div>

        <div>
          <label>Tujuan Inovasi:</label>
          <textarea
            name="tujuanInovasi"
            value={formData.tujuanInovasi}
            onChange={handleChange}
          />
          <textarea
            name="tujuanInovasiReview"
            value={adminReviews.tujuanInovasi}
            onChange={handleReviewChange}
            placeholder="Review Admin untuk Tujuan Inovasi..."
          />
        </div>

        <div>
          <label>Target Perubahan:</label>
          <textarea
            name="targetPerubahan"
            value={formData.targetPerubahan}
            onChange={handleChange}
          />
          <textarea
            name="targetPerubahanReview"
            value={adminReviews.targetPerubahan}
            onChange={handleReviewChange}
            placeholder="Review Admin untuk Target Perubahan..."
          />
        </div>

        <div>
          <label>Stakeholder Inovasi:</label>
          <textarea
            name="stakeholders"
            value={formData.stakeholders}
            onChange={handleChange}
          />
          <textarea
            name="stakeholdersReview"
            value={adminReviews.stakeholders}
            onChange={handleReviewChange}
            placeholder="Review Admin untuk Stakeholder Inovasi..."
          />
        </div>

        <div>
          <label>Sumber Daya Inovasi:</label>
          <textarea
            name="sumberDaya"
            value={formData.sumberDaya}
            onChange={handleChange}
          />
          <textarea
            name="sumberDayaReview"
            value={adminReviews.sumberDaya}
            onChange={handleReviewChange}
            placeholder="Review Admin untuk Sumber Daya Inovasi..."
          />
        </div>

        <div>
          <label>Penerima Manfaat:</label>
          <textarea
            name="penerimaManfaat"
            value={formData.penerimaManfaat}
            onChange={handleChange}
          />
          <textarea
            name="penerimaManfaatReview"
            value={adminReviews.penerimaManfaat}
            onChange={handleReviewChange}
            placeholder="Review Admin untuk Penerima Manfaat..."
          />
        </div>

        <div>
          <label>Kebaruan:</label>
          <textarea
            name="kebaruan"
            value={formData.kebaruan}
            onChange={handleChange}
          />
          <textarea
            name="kebaruanReview"
            value={adminReviews.kebaruan}
            onChange={handleReviewChange}
            placeholder="Review Admin untuk Kebaruan..."
          />
        </div>

        <div>
          <label>Deskripsi Singkat Ide Inovasi:</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
          />
          <textarea
            name="deskripsiReview"
            value={adminReviews.deskripsi}
            onChange={handleReviewChange}
            placeholder="Review Admin untuk Deskripsi Singkat Ide Inovasi..."
          />
        </div>

        <div>
          <label>Keterangan:</label>
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Displaying the admin reviews */}
      <div>
        <h2>Review Admin</h2>
        <ul>
          {Object.entries(adminReviews).map(([key, review]) => (
            review && (
              <li key={key}>
                <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong>{review}
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InnovationForm;


