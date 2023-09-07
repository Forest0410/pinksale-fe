import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import DatePicker from "react-datepicker";
import ActionButtons from "../launchpadComponent/actionButtons";
import { getNetwork } from "../../../Utils/initialFunctions";
import { SwapRouters } from "../../../Utils/config";
const SecondStepCompoent = (props) => {
  const [info2, setInfo2] = useState({
    whitelist: "false",
    refundType: "false",
  });
  const [validated, setValidated] = useState(false);
  const [TSAValidate, setTSAValidate] = useState("");
  const [softcapValidate, setSoftcapvalidate] = useState("");
  const [liquidityValidate, setLiquidityValidate] = useState("");
  const [startTimeValidate, setStartTimeValidate] = useState("");
  const [endTimeValidate, setEndtimeValidate] = useState("");
  useEffect(() => {
    if (
      info2.sellamount &&
      info2.softcap &&
      info2.router &&
      info2.liquidity &&
      info2.startTime &&
      info2.endICO &&
      info2.liqLock &&
      TSAValidate.length === 0 &&
      softcapValidate.length === 0 &&
      liquidityValidate.length === 0 &&
      startTimeValidate.length === 0 &&
      endTimeValidate.length === 0
    )
      setValidated(true);
    else setValidated(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info2]);
  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    if (targetName === "sellamount") {
      if (targetValue.length === 0)
        setTSAValidate("Presale rate cannot be blank");
      else setTSAValidate("");
    }
    if (targetName === "softcap") {
      if (targetValue.length === 0)
        setSoftcapvalidate("Softcap cannot be blank");
      else setSoftcapvalidate("");
    } else if (targetName === "liquidity") {
      if (targetValue.length === 0)
        setLiquidityValidate("Liquidity  cannot be blank");
      else if (Number(targetValue) <= 50)
        setLiquidityValidate("Liquidity must be greater than 50%");
      else if (Number(targetValue) > 100)
        setLiquidityValidate("Liquidity must be <= 100%");
      else setLiquidityValidate("");
    }
    setInfo2((info2) => ({
      ...info2,
      [targetName]: targetValue,
    }));
  };
  const handleTimeChange = (date, flg) => {
    if (flg === true) {
      var timestamp = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      );
      var endTimestame = info2.endICO
        ? Date.UTC(
            info2.endICO.getFullYear(),
            info2.endICO.getMonth(),
            info2.endICO.getDate(),
            info2.endICO.getHours(),
            info2.endICO.getMinutes(),
            info2.endICO.getSeconds()
          )
        : new Date(
            new Date().getTime() + new Date().getTimezoneOffset() * 60000
          );
      if (date.length === 0) setStartTimeValidate("Start time can't be empty.");
      else if (
        timestamp <
        new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000)
      )
        setStartTimeValidate("Start time needs to be after now");
      else if (timestamp >= endTimestame)
        setStartTimeValidate("Start time needs to be before End time");
      else setStartTimeValidate("");
      setInfo2({ ...info2, startTime: date });
    } else {
      timestamp = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      );
      var startTimestame = info2.startTime
        ? Date.UTC(
            info2.startTime.getFullYear(),
            info2.startTime.getMonth(),
            info2.startTime.getDate(),
            info2.startTime.getHours(),
            info2.startTime.getMinutes(),
            info2.startTime.getSeconds()
          )
        : new Date(
            new Date().getTime() + new Date().getTimezoneOffset() * 60000
          );
      if (date.length === 0) setEndtimeValidate("End time can't be empty.");
      else if (
        timestamp <=
        new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000)
      )
        setEndtimeValidate("End time needs to be after now");
      else if (timestamp <= startTimestame) {
        setEndtimeValidate("End time needs to be after Start time");
        setStartTimeValidate("Start time needs to be before End time");
      } else setStartTimeValidate("");
      setInfo2({ ...info2, endICO: date });
    }
  };
  const handleClickPrev = () => {
    props.previousStep();
  };
  const validate2 = () => {
    props.nextStep();
    props.tokenCallback(info2);
  };

  const handleKeyDown = (e, value) => {
    const key = e.keyCode;
    if (
      (key >= "0".charCodeAt(0) && key <= "9".charCodeAt(0)) ||
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      if (value === "0" && key === "0".charCodeAt(0)) e.preventDefault();
    } else if (key === 190 || key === 110) {
      if (value.length === 0 || value.includes(".")) e.preventDefault();
    } else if (key !== 8) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <FormGroup>
        <Label style={{ fontWeight: 600, marginBottom: 15 }}>
          Total selling amount <span style={{ color: "red" }}>*</span>
        </Label>
        <Input
          onKeyDown={(e) => handleKeyDown(e, info2.sellamount)}
          name="sellamount"
          placeholder="100"
          autoComplete="on"
          value={info2.sellamount ? info2.sellamount : ""}
          onChange={onInputChanged}
        />
        <FormText className="validate-msg">{TSAValidate}</FormText>
      </FormGroup>
      <FormGroup>
        <Label style={{ fontWeight: 600, marginBottom: 15 }}>
          Softcap ({window?.currency.toUpperCase()}){" "}
          <span style={{ color: "red" }}>*</span>
        </Label>
        <Input
          type="text"
          name="softcap"
          placeholder="0"
          value={info2.softcap ? info2.softcap : ""}
          onChange={onInputChanged}
          onKeyDown={(e) => handleKeyDown(e, info2.softcap)}
        />
        <FormText className="validate-msg">{softcapValidate}</FormText>
      </FormGroup>
      <FormGroup>
        <Label style={{ fontWeight: 600, marginBottom: 15 }}>
          Rouuter <span style={{ color: "red" }}>*</span>
        </Label>
        <Input
          type="select"
          name="router"
          onChange={onInputChanged}
          value={info2.router}
        >
          <option>--- select router exchange</option>
          {getNetwork().length > 0 &&
            SwapRouters[getNetwork()[0]].map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label style={{ fontWeight: 600, marginBottom: 15 }}>
          {info2["router"]} liquidity (%){" "}
          <span style={{ color: "red" }}>*</span>
        </Label>
        <Input
          type="text"
          name="liquidity"
          placeholder="50"
          value={info2.liquidity || ""}
          onChange={onInputChanged}
          onKeyDown={(e) => handleKeyDown(e, info2.liquidity)}
        />
        <FormText className="validate-msg">{liquidityValidate}</FormText>
      </FormGroup>
      <br />
      <Row>
        <Label>
          select start time {"&"} end time (UTC){" "}
          <span style={{ color: "red" }}>*</span>
        </Label>
        <Col md={6}>
          <FormGroup>
            <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              Start Time (UTC) <span style={{ color: "red" }}>*</span>
            </Label>
            <DatePicker
              selected={
                info2.startTime ||
                new Date(
                  new Date().getTime() + new Date().getTimezoneOffset() * 60000
                )
              }
              onChange={(date) => handleTimeChange(date, true)}
              showTimeInput
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
            />
            <FormText className="validate-msg">{startTimeValidate}</FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              End Time (UTC) <span style={{ color: "red" }}>*</span>
            </Label>
            <DatePicker
              selected={
                info2.endICO ||
                new Date(
                  new Date().getTime() + new Date().getTimezoneOffset() * 60000
                )
              }
              onChange={(date) => handleTimeChange(date, false)}
              showTimeInput
              dateFormat="MM/dd/yyyy h:mm aa"
              className="form-control"
            />
            <FormText className="validate-msg">{endTimeValidate}</FormText>
          </FormGroup>
        </Col>
        {window.autolist && (
          <Col md={12}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Liquidity lockup (mins) <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="text"
                name="liqLock"
                placeholder="0"
                onChange={onInputChanged}
                value={info2.liqLock || ""}
                onKeyDown={(e) => handleKeyDown(e, info2.liqLock)}
              />
            </FormGroup>
          </Col>
        )}
      </Row>
      <p style={{ textAlign: "center", color: "#e21586" }}>
        Need {Number(info2.hardcap || 0) / Number(info2.presaleRate) || 0}{" "}
        {window.tokenSymbol} to create launcpad
      </p>
      {validated ? (
        <ActionButtons {...props} nextStep={validate2} />
      ) : (
        <Row>
          <Col style={{ textAlign: "center" }}>
            <Button color="primary" onClick={handleClickPrev}>
              Back
            </Button>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Button disabled>Next</Button>
          </Col>
        </Row>
      )}
    </div>
  );
};
export default React.memo(SecondStepCompoent);
