// components/StepperSection.tsx
import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

type StepperSectionProps = {
  activeStep: number;
  steps: string[];
};

const StepperSection: React.FC<StepperSectionProps> = ({ activeStep, steps }) => {
  return (
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
  );
};

export default StepperSection;
