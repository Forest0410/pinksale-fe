import React, { Fragment, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";

import FirstStepComponent from "./fairlaunchComponent/firstStep";
import SecondStepCompoent from "./fairlaunchComponent/secondStep";
import LastStepComponent from "./fairlaunchComponent/lastStep";

const CreateFairLaunch = () => {
  // eslint-disable-next-line no-unused-vars
    const [stepWizard, setStepWizard] = useState(null);
    const [tokenInfo, setTokenInfo] = useState({});
    const [activeStep, setActiveStep] = useState(0);
  
    const assignStepWizard = (instance) => {
      setStepWizard(instance);
    };
  
    const assignToken = (val) => {
      if('currency' in val) {
        window.currency = val['currency'];
      }
      setTokenInfo((tokenInfo) => ({
        ...tokenInfo,
        ...val,
      }));
    };
  
    const handleStepChange = (e) => {
      setActiveStep(e.activeStep - 1);
    };
    return (
      <Fragment>
        <div className="createlaunchpad">
          <Stepper activeStep={activeStep}>
            <Step label="Verify Token" children={<MdDescription />} />
            <Step label="DeFi Fairlaunch Info" />
            <Step label="Finish" />
          </Stepper>
          <StepWizard
            instance={assignStepWizard}
            onStepChange={handleStepChange}
            className="stepwizard"
          >
            <FirstStepComponent tokenCallback={assignToken} />
            <SecondStepCompoent tokenInfo={tokenInfo} tokenCallback={assignToken} />
            <LastStepComponent tokenInfo={tokenInfo} />
          </StepWizard>
        </div>
      </Fragment>
    );
};

export default React.memo(CreateFairLaunch);