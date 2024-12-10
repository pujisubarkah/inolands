
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Grid, Box } from '@mui/material';

const Ide = () => {
  const [formData, setFormData] = useState({
    namaOPD: '',
    contactPerson: '',
    telp: '',
    email: '',
    latarBelakang: '',
    ideInovasi: '',
    stakeholderInovasi: '',
    sumberDaya: '',
    penerimaManfaat: '',
    deskripsiSingkat: '',
    keterangan: '',
    tanggapanLatarBelakang: '',
    tanggapanIdeInovasi: '',
    tanggapanStakeholderInovasi: '',
    tanggapanSumberDaya: '',
    tanggapanPenerimaManfaat: '',
    tanggapanDeskripsiSingkat: '',
    tanggapanKeterangan: '',
    // Initialize checklist and penjelasan dynamic fields
    checklist_tanggapanLatarBelakang: false,
    checklist_tanggapanIdeInovasi: false,
    checklist_tanggapanStakeholderInovasi: false,
    checklist_tanggapanSumberDaya: false,
    checklist_tanggapanPenerimaManfaat: false,
    checklist_tanggapanDeskripsiSingkat: false,
    checklist_tanggapanKeterangan: false,
  });

  const resetForm = () => {
    setFormData({
      namaOPD: '',
      contactPerson: '',
      telp: '',
      email: '',
      latarBelakang: '',
      ideInovasi: '',
      stakeholderInovasi: '',
      sumberDaya: '',
      penerimaManfaat: '',
      deskripsiSingkat: '',
      keterangan: '',
      tanggapanLatarBelakang: '',
      tanggapanIdeInovasi: '',
      tanggapanStakeholderInovasi: '',
      tanggapanSumberDaya: '',
      tanggapanPenerimaManfaat: '',
      tanggapanDeskripsiSingkat: '',
      tanggapanKeterangan: '',
      checklist_tanggapanLatarBelakang: false,
      checklist_tanggapanIdeInovasi: false,
      checklist_tanggapanStakeholderInovasi: false,
      checklist_tanggapanSumberDaya: false,
      checklist_tanggapanPenerimaManfaat: false,
      checklist_tanggapanDeskripsiSingkat: false,
      checklist_tanggapanKeterangan: false,
    });
  };

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Informasi Kontak', 'Ide Inovasi', 'Rencana Aksi', 'Monitoring'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <Box sx={{ width: '100%', padding: '0 20px' }} >
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
        Ide Inovasi
      </h1>
      <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, red, black, red)', margin: '0 auto 20px auto' }} />
      
      <Stepper
  activeStep={activeStep}
  alternativeLabel
  sx={{
    '& .MuiStepIcon-root': {
      color: '#D3D3D3', // Warna default untuk Step yang belum aktif
    },
    '& .MuiStepIcon-root.Mui-active': {
      color: '#8B0000', // Warna untuk Step yang aktif
    },
    '& .MuiStepIcon-root.Mui-completed': {
      color: '#8B0000', // Warna untuk Step yang telah selesai
    },
  }}
>
  {steps.map((label, index) => (
    <Step key={index}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>


      <form onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <>
            <TextField
              label="Nama OPD"
              fullWidth
              name="namaOPD"
              value={formData.namaOPD}
              onChange={handleChange}
              style={{ marginTop: '16px' }}
            />
            <TextField
              label="Nama Penanggungjawab"
              fullWidth
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              style={{ marginTop: '16px' }}
            />
            <TextField
              label="Nomor Telp/HP"
              fullWidth
              name="telp"
              value={formData.telp}
              onChange={handleChange}
              style={{ marginTop: '16px' }}
            />
            <TextField
              label="Alamat Email"
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ marginTop: '16px' }}
            />
          </>
        )}

        {activeStep === 1 && (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
              Step 1: Keterangan
            </h1>
            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Left Column */}
              <div style={{ flex: 1 }}>
                <TextField
                  label="Latar Belakang"
                  fullWidth
                  name="latarBelakang"
                  value={formData.latarBelakang}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
                <TextField
                  label="Ide Inovasi"
                  fullWidth
                  name="ideInovasi"
                  value={formData.ideInovasi}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  style={{ marginTop: '16px' }}
                />
                <TextField
                  label="Stakeholder Inovasi"
                  fullWidth
                  name="stakeholderInovasi"
                  value={formData.stakeholderInovasi}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  style={{ marginTop: '16px' }}
                />
                <TextField
                  label="Sumber Daya"
                  fullWidth
                  name="sumberDaya"
                  value={formData.sumberDaya}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  style={{ marginTop: '16px' }}
                />
                <TextField
                  label="Penerima Manfaat"
                  fullWidth
                  name="penerimaManfaat"
                  value={formData.penerimaManfaat}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  style={{ marginTop: '16px' }}
                />
                <TextField
                  label="Deskripsi Singkat"
                  fullWidth
                  name="deskripsiSingkat"
                  value={formData.deskripsiSingkat}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  style={{ marginTop: '16px' }}
                />
                <TextField
                  label="Keterangan"
                  fullWidth
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  style={{ marginTop: '16px' }}
                />
              </div>

              {/* Right Column */}
              <div style={{ flex: 1 }}>
                {[
                  { label: 'Tanggapan Latar Belakang', name: 'tanggapanLatarBelakang' },
                  { label: 'Tanggapan Ide Inovasi', name: 'tanggapanIdeInovasi' },
                  { label: 'Tanggapan Stakeholder Inovasi', name: 'tanggapanStakeholderInovasi' },
                  { label: 'Tanggapan Sumber Daya', name: 'tanggapanSumberDaya' },
                  { label: 'Tanggapan Penerima Manfaat', name: 'tanggapanPenerimaManfaat' },
                  { label: 'Tanggapan Deskripsi Singkat', name: 'tanggapanDeskripsiSingkat' },
                  { label: 'Tanggapan Keterangan', name: 'tanggapanKeterangan' },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      border: '1px solid #ccc',
                      padding: '16px',
                      borderRadius: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    {/* Label Tanggapan */}
                    <label
                      style={{
                        display: 'block',
                        fontWeight: '600',
                        marginBottom: '8px',
                      }}
                    >
                      {item.label}
                    </label>

                    {/* Checkbox */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={formData[`checklist_${item.name}`] || false}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            [`checklist_${item.name}`]: e.target.checked,
                            [`penjelasan_${item.name}`]: e.target.checked
                              ? ''
                              : prev[`penjelasan_${item.name}`],
                          }))
                        }
                      />
                      <label>Sudah OK</label>
                    </div>

                    {/* Explanation */}
                    {formData[`checklist_${item.name}`] && (
                      <TextField
                        label={`Penjelasan ${item.label}`}
                        fullWidth
                        name={`penjelasan_${item.name}`}
                        value={formData[`penjelasan_${item.name}`]}
                        onChange={handleChange}
                        style={{ marginTop: '8px' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Buttons for Next and Back */}
        <Grid container spacing={2} style={{ marginTop: '16px', marginBottom: '16px' }}>
  <Grid item>
    <Button
      variant="contained"
      sx={{
        backgroundColor: activeStep === 0 ? '#FFFFFF' : '#8B0000',
        color: activeStep === 0 ? '#000' : '#FFFFFF',
        '&:hover': {
          backgroundColor: activeStep === 0 ? '#F0F0F0' : '#6B0000',
        },
      }}
      onClick={handleBack}
      disabled={activeStep === 0}
    >
      Back
    </Button>
  </Grid>
  <Grid item>
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#8B0000',
        color: '#FFFFFF',
        '&:hover': { backgroundColor: '#6B0000' },
      }}
      onClick={handleNext}
    >
      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
    </Button>
  </Grid>
</Grid>


      </form>
    </Box>
  );
};

export default Ide;
