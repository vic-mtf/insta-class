import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PropTypes from "prop-types";

const steps = [
  "Rôle du compte",
  "Identité personnelle",
  "Identité de sécurité",
];

export default function AlternativeLabelStepper({ activeStep }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

AlternativeLabelStepper.propTypes = {
  // label: PropTypes.string,
  activeStep: PropTypes.number,
};
