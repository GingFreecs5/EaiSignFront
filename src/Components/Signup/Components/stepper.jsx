import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useSelector } from "react-redux";

export default function HorizontalStepper(props) {
  const steps = props.steps;
  const current = useSelector((state) => state.current.value);
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={current} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
