import React from "react";
import { Row, Col, Button } from "reactstrap";
const ActionButtons = (props) => {
  const handleBack = () => {
    props.previousStep();
  };

  const handleNext = () => {
    props.nextStep();
  };

  const handleFinish = () => {
    props.lastStep();
  };

  return (
    <div>
      <Row>
        {props.currentStep > 1 && (
          <Col style={{ textAlign: "center" }}>
            <Button color="primary" onClick={handleBack}>
              Back
            </Button>
          </Col>
        )}
        <Col style={{ textAlign: "center" }}>
          {props.currentStep < props.totalSteps && (
            <Button color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {props.currentStep === props.totalSteps && (
            <Button color="primary" onClick={handleFinish}>
              Finish
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default React.memo(ActionButtons);