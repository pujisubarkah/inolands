import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

type ContactInformationProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ContactInformation: React.FC<ContactInformationProps> = ({ formData, handleChange }) => {
  return (
    <>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography 
          sx={{ width: "250px", flexShrink: 0, bgcolor: '#16578D', color: 'white', fontWeight: 'bold', px: 2, py: 2, borderRadius: 1 }}
        >
          Nama OPD
        </Typography>
        <TextField fullWidth name="namaOPD" value={formData.namaOPD} onChange={handleChange} />
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography 
          sx={{ width: "250px", flexShrink: 0, bgcolor: '#16578D', color: 'white', fontWeight: 'bold', px: 2, py: 2, borderRadius: 1 }}
        >
          Nama Penanggungjawab
        </Typography>
        <TextField fullWidth name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography 
          sx={{ width: "250px", flexShrink: 0, bgcolor: '#16578D', color: 'white', fontWeight: 'bold', px: 2, py: 2, borderRadius: 1 }}
        >
          Nomor Telp/HP
        </Typography>
        <TextField fullWidth name="telp" value={formData.telp} onChange={handleChange} />
      </Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography 
          sx={{ width: "250px", flexShrink: 0, bgcolor: '#16578D', color: 'white', fontWeight: 'bold', px: 2, py: 2, borderRadius: 1 }}
        >
          Alamat Email
        </Typography>
        <TextField fullWidth name="email" value={formData.email} onChange={handleChange} />
      </Box>
    </>
  );
};

export default ContactInformation;
