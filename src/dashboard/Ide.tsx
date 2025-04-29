// components/Ide.tsx
import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import StepperSection from './StepperSection';
import ContactInformation from './ContactInfomation';
import InnovationIdeaForm from './InnovationIdeForm';
import InnovationResponseForm from './InnovationResponseForm';

function Ide() {
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
  });

  const [activeStep, setActiveStep] = useState<number>(0);
  const [roleId] = useState<string>('user'); // Default role user

  const steps = ['Informasi Kontak', 'Ide Inovasi', 'Tanggapan Ide Inovasi'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <Box sx={{ width: '100%', padding: '0 20px' }}>
      <br/>
      <br/>
      {/* Stepper with margin-bottom */}
      <StepperSection activeStep={activeStep} steps={steps} />
      
      {/* Add margin-top between stepper and form */}
      <Box mt={3}> {/* You can adjust the 'mt' value to your preference */}
        <form onSubmit={handleSubmit}>
          {activeStep === 0 && <ContactInformation formData={formData} handleChange={handleChange} />}
          {activeStep === 1 && <InnovationIdeaForm formData={formData} handleChange={handleChange} nextStep={handleNext} />}
          {activeStep === 2 && roleId === 'admin' && <InnovationResponseForm formData={formData} handleResponseChange={handleChange} handleChange={function (): void {
            throw new Error('Function not implemented.');
          } } handleComment={function (): void {
            throw new Error('Function not implemented.');
          } } nextStep={function (): void {
            throw new Error('Function not implemented.');
          } } handleApproval={function (): void {
            throw new Error('Function not implemented.');
          } } />}
        </form>
      </Box>

      <Grid container spacing={2} style={{ marginTop: '16px', marginBottom: '16px' }}>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: activeStep === 0 ? '#FFFFFF' : '#16578D',
              color: activeStep === 0 ? '#000' : '#FFFFFF',
              '&:hover': { backgroundColor: '#0000CC' },
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
              backgroundColor: '#16578D',
              color: '#FFFFFF',
              '&:hover': { backgroundColor: '#0000CC' },
            }}
            onClick={handleNext}
            disabled={activeStep === 2 && roleId !== 'admin'}
          >
            {activeStep === steps.length - 1 ? 'Kirim' : 'Berikutnya'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Ide;
