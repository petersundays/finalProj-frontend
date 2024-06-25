// ProgressBarComponent.js
import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./OthersProgressBar.css";

const OthersProgressBar = ({ step, steps }) => {
  const percent = ((step - 1) / (steps.length - 1)) * 100 + 20;

  return (

      <ProgressBar percent={percent}>
        {steps.map((_, index) => (
          <Step key={index} position={(index / (steps.length - 1)) * 100}>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${accomplished ? "accomplished" : ""}`}
              >
                {index + 1}
              </div>
            )}
          </Step>
        ))}
      </ProgressBar>

  );
};

export default OthersProgressBar;
