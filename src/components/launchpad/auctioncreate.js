import React, { Fragment, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
import FirstStepComponent from "./auctionComponent/firstStep";
import SecondStepCompoent from "./auctionComponent/secondStep";
import LastStepComponent from "./auctionComponent/lastStep";

const CreateAuction = () => {
  // eslint-disable-next-line no-unused-vars
  const [stepWizard, setStepWizard] = useState(null);
  const [tokenInfo, setTokenInfo] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };

  const assignToken = (val) => {
    if ("currency" in val) {
      window.currency = val["currency"];
    }
    setTokenInfo((tokenInfo) => ({
      ...tokenInfo,
      ...val,
    }));
  };

  const handleStepChange = (e) => {
    setActiveStep(e.activeStep - 1);
  };

  // const handleComplete = () => {
  //   alert("You r done. TQ");
  // };

  return (
    <Fragment>
      <div className="createauction">
        <Stepper activeStep={activeStep}>
          <Step label="Verify Token" children={<MdDescription />} />
          <Step label="Dutch Auction" />
          <Step label="Add Additional Info" />
          <Step label="Finish" />
        </Stepper>
        {/* NOTE: IMPORTANT !! StepWizard must contains at least 2 children components, else got error */}
        <StepWizard
          instance={assignStepWizard}
          onStepChange={handleStepChange}
          className="stepwizard"
        >
          <FirstStepComponent tokenCallback={assignToken} />
          <SecondStepCompoent
            tokenInfo={tokenInfo}
            tokenCallback={assignToken}
          />
          <LastStepComponent tokenInfo={tokenInfo} />
        </StepWizard>
      </div>
    </Fragment>
  );
};

export default CreateAuction;
