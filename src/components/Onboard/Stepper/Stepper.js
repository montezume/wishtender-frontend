import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function getSteps() {
  return ["Set Up Account Info", "Set Up Wishlist", "Connect Bank Account"];
}

export default function Onboard() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        style={{ position: "absolute", background: "#fbfb98", width: "100%" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
