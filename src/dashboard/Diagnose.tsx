import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Grid, Box, Typography } from '@mui/material';

const Diagnose = () => {
  type FormDataType = {
    [key: string]: string | boolean;
    namaOPD: string;
    contactPerson: string;
    telp: string;
    email: string;
    latarBelakang: string;
    ideInovasi: string;
    stakeholderInovasi: string;
    sumberDaya: string;
    penerimaManfaat: string;
    deskripsiSingkat: string;
    keterangan: string;
    tanggapanLatarBelakang: string;
    tanggapanIdeInovasi: string;
    tanggapanStakeholderInovasi: string;
    tanggapanSumberDaya: string;
    tanggapanPenerimaManfaat: string;
    tanggapanDeskripsiSingkat: string;
    tanggapanKeterangan: string;
    checklist_tanggapanLatarBelakang: boolean;
    checklist_tanggapanIdeInovasi: boolean;
    checklist_tanggapanStakeholderInovasi: boolean;
    checklist_tanggapanSumberDaya: boolean;
    checklist_tanggapanPenerimaManfaat: boolean;
    checklist_tanggapanDeskripsiSingkat: boolean;
    checklist_tanggapanKeterangan: boolean;
  };

  const [formData, setFormData] = useState<FormDataType>({
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

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Informasi Kontak', 'Ide Inovasi', 'Tanggapan Ide Inovasi', 'Kirim'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (

  <div>
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        '& .MuiStepIcon-root': {
          color: '#D3D3D3', // Default color for inactive steps
        },
        '& .MuiStepIcon-root.Mui-active': {
          color: '#0000FF', // Color for active step
        },
        '& .MuiStepIcon-root.Mui-completed': {
          color: '#0000FF', // Color for completed steps
        },
      }}
    >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  
    <Box sx={{ width: '100%', padding: '0 20px' }}>
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', margin: '20px 0 10px 0' }}>
        Diagnose Inovasi
      </h1>
      <hr style={{ width: '100px', border: 'none', height: '2px', background: 'linear-gradient(to right, blue, black, blue)', margin: '0 auto 20px auto' }} />
      
    

      <form onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography width="200px">Nama OPD</Typography>
              <TextField
                fullWidth
                name="namaOPD"
                value={formData.namaOPD}
                onChange={handleChange}
              />
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Typography width="200px">Nama Penanggungjawab</Typography>
              <TextField
                fullWidth
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
              />
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Typography width="200px">Nomor Telp/HP</Typography>
              <TextField
                fullWidth
                name="telp"
                value={formData.telp}
                onChange={handleChange}
              />
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Typography width="200px">Alamat Email</Typography>
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Box>
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
                        checked={!!formData[`checklist_${item.name}`]}
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
                backgroundColor: activeStep === 0 ? '#FFFFFF' : '#0000FF', // Change to blue
                color: activeStep === 0 ? '#000' : '#FFFFFF',
                '&:hover': {
                  backgroundColor: activeStep === 0 ? '#F0F0F0' : '#0000CC', // Darker blue on hover
                },
              }}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Sebelumnya
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0000FF', // Change to blue
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#0000CC' }, // Darker blue on hover
              }}
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Kirim' : 'Berikutnya'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  </div>
  );
};

export default Diagnose;