import React, {useState, useEffect} from 'react';
import {Row, Col, Button, FormGroup, Label, Input, FormText } from "reactstrap";
import ActionButtons from "./actionButtons";
import { SwapRouters } from '../../../Utils/config';
import { getNetwork } from '../../../Utils/initialFunctions';
import DatePicker from 'react-datepicker';
const TwoCompoent = (props) => {
    const [info2, setInfo2] = useState({
      whitelist: "false",
      refundType: "false",
    });
    const [validated, setValidated] = useState(false);
    const [presaleValidate, setPresaleValidate] = useState("");
    const [softcapValidate, setSoftcapvalidate] = useState("");
    const [hardcapVaildate, setHardcapvalidate] = useState("");
    const [maxPurchaseValidate, setMaxpurchaseValidate] = useState("");
    const [liquidityValidate, setLiquidityValidate] = useState("");
    const [startTimeValidate, setStartTimeValidate] = useState("");
    const [endTimeValidate, setEndtimeValidate] = useState("");
    // const [amountValidate, setAmountValidate] = useState("");
    useEffect(() => {
      if (
        info2.presaleRate &&
        info2.softcap &&
        info2.hardcap &&
        info2.maxPurchase &&
        ((window.autolist && info2.router) || !window.autolist) &&
        ((window.autolist && info2.liquidity) || !window.autolist) &&
        ((window.autolist && info2.rate) || !window.autolist) &&
        info2.startTime &&
        info2.endICO &&
        ((window.autolist && info2.liqLock) || !window.autolist) &&
        presaleValidate.length === 0 &&
        softcapValidate.length === 0 &&
        hardcapVaildate.length === 0 &&
        maxPurchaseValidate.length === 0 &&
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
      if (targetName === "presaleRate") {
        if (targetValue.length === 0)
          setPresaleValidate("Presale rate cannot be blank");
        else
          setPresaleValidate("");
      }
      if (targetName === "softcap") {
        if (targetValue.length === 0)
          setSoftcapvalidate("Softcap cannot be blank");
        else if (Number(targetValue) * 2 < Number(info2.hardcap || 0))
          setSoftcapvalidate("Softcap must be >= 50% of Hardcap!");
        else if (Number(targetValue) > Number(info2.hardcap || 0))
          setSoftcapvalidate("Softcap must be less than or equal Hardcap");
        else setSoftcapvalidate("");
      } else if (targetName === "hardcap") {
        if (targetValue.length === 0) {
          setHardcapvalidate("Hardcap cannot be blank");
        } else if (targetValue === "0")
          setHardcapvalidate("Hardcap must be positive number");
        else setHardcapvalidate("");
        if (Number(info2.softcap || 0) * 2 < Number(targetValue))
          setSoftcapvalidate("Softcap must be >= 50% of Hardcap!");
        else if (Number(targetValue) < Number(info2.softcap || 0))
          setSoftcapvalidate("Softcap must be less than or equal Hardcap");
        else setSoftcapvalidate("");
      } else if (targetName === "maxPurchase") {
        if (targetValue.length === 0) {
          setMaxpurchaseValidate("Maximum buy cannot be blank");
        } else if (targetValue === "0")
          setMaxpurchaseValidate("Maximum buy must be positive number");
        else setMaxpurchaseValidate("");
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
        var timestamp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        var endTimestame = info2.endICO
          ? Date.UTC(info2.endICO.getFullYear(), info2.endICO.getMonth(), info2.endICO.getDate(), info2.endICO.getHours(), info2.endICO.getMinutes(), info2.endICO.getSeconds())
          : new Date((new Date()).getTime() + (new Date()).getTimezoneOffset() * 60000);
        if (date.length === 0)
          setStartTimeValidate("Start time can't be empty.");
        else if (timestamp < new Date((new Date()).getTime() + (new Date()).getTimezoneOffset() * 60000))
          setStartTimeValidate("Start time needs to be after now");
        else if (timestamp >= endTimestame)
          setStartTimeValidate("Start time needs to be before End time");
        else setStartTimeValidate("");
        setInfo2({...info2, startTime: date});
      } else{
        timestamp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        var startTimestame = info2.startTime
          ? Date.UTC(info2.startTime.getFullYear(), info2.startTime.getMonth(), info2.startTime.getDate(), info2.startTime.getHours(), info2.startTime.getMinutes(), info2.startTime.getSeconds())
          : new Date((new Date()).getTime() + (new Date()).getTimezoneOffset() * 60000);
        if (date.length === 0)
          setEndtimeValidate("End time can't be empty.");
        else if (timestamp <= new Date((new Date()).getTime() + (new Date()).getTimezoneOffset() * 60000))
          setEndtimeValidate("End time needs to be after now");
        else if (timestamp <= startTimestame) {
          setEndtimeValidate("End time needs to be after Start time");
          setStartTimeValidate("Start time needs to be before End time");
        } else setStartTimeValidate("");
        setInfo2({...info2, endICO: date});
      }
    }
    const handleClickPrev =() => {
      props.previousStep();
    }
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
            Presale rate <span style={{ color: "red" }}>*</span>
          </Label>
          <Input
            onKeyDown={(e) => handleKeyDown(e, info2.presaleRate)}
            name="presaleRate"
            placeholder="100"
            autoComplete="on"
            value={info2.presaleRate ? info2.presaleRate : ""}
            onChange={onInputChanged}
          />
          <FormText className="validate-msg">{presaleValidate}</FormText>
          <FormText className='color-sec'>
            To get 1 {window.tokenSymbol}, how many {window?.currency.toUpperCase()}s will I pay?
          </FormText>
        </FormGroup>
        <FormGroup tag="fieldset">
          <Label style={{ fontWeight: 600, marginBottom: 15, marginTop: 20 }}>
            Whitelist
          </Label>
          <Col sm={10} style={{ display: "flex" }}>
            <FormGroup check style={{ marginRight: 20 }}>
              <Label check>
                {" "}
                <Input
                  type="radio"
                  name="whitelist"
                  value={"false"}
                  onChange={onInputChanged}
                  checked={info2.whitelist === "false"}
                />{" "}
                Disable
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="whitelist"
                  value={"true"}
                  onChange={onInputChanged}
                  checked={info2.whitelist && info2.whitelist === "true"}
                />{" "}
                Enable
              </Label>
            </FormGroup>
          </Col>
          <FormText className='color-sec'>
            You can enable/disable whitelist anytime.
          </FormText>
        </FormGroup>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Softcap ({window?.currency.toUpperCase()}) <span style={{ color: "red" }}>*</span>
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
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Hardcap ({window?.currency.toUpperCase()}) <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="text"
                name="hardcap"
                placeholder="0"
                onChange={onInputChanged}
                value={info2.hardcap ? info2.hardcap : ""}
                onKeyDown={(e) => handleKeyDown(e, info2.hardcap)}
              />
              <FormText className="validate-msg">{hardcapVaildate}</FormText>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Maximum buy ({window?.currency.toUpperCase()}) per Account <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="text"
                name="maxPurchase"
                placeholder="0.1"
                onChange={onInputChanged}
                value={info2.maxPurchase || ""}
                onKeyDown={(e) => handleKeyDown(e, info2.maxPurchase)}
              />
            </FormGroup>
          </Col>
          {window.autolist && <Col md={6}></Col>}
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Refund type
              </Label>
              <Input
                type="select"
                name="refundType"
                onChange={onInputChanged}
                value={info2.refundType}
              >
                <option value={"true"}>Refund</option>
                <option value={"false"}>burn</option>
              </Input>
            </FormGroup>
          </Col>
          {window.autolist && <Col md={6}>
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
                <option>--- Select router exchange</option>
                {getNetwork().length > 0 && SwapRouters[getNetwork()[0]].map(item =><option key={item.name} value={item.name}>{item.name}</option>)}
                
              </Input>
            </FormGroup>
          </Col>}
          {window.autolist && <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              {info2['router']} liquidity (%) <span style={{ color: "red" }}>*</span>
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
          </Col>}
          {window.autolist && <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              {info2['router']} listing rate <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="text"
                name="rate"
                placeholder="50"
                value={info2.rate || ""}
                onChange={onInputChanged}
                onKeyDown={(e) => handleKeyDown(e, info2.rate)}
              />
              <FormText className='color-sec'>
                1 {window.tokenSymbol} = {info2.rate} {window?.currency.toUpperCase()}
              </FormText>
            </FormGroup>
          </Col>}
        </Row>
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
              selected={info2.startTime || new Date((new Date()).getTime() + (new Date()).getTimezoneOffset() * 60000)}
              onChange={(date) => handleTimeChange(date, true)}
              showTimeInput
              dateFormat="MM/dd/yyyy h:mm aa"
              className='form-control'
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
              selected={info2.endICO || new Date((new Date()).getTime() + (new Date()).getTimezoneOffset() * 60000)}
              onChange={(date) => handleTimeChange(date, false)}
              showTimeInput
              dateFormat="MM/dd/yyyy h:mm aa"
              className='form-control'
            />
              <FormText className="validate-msg">{endTimeValidate}</FormText>
            </FormGroup>
          </Col>
          {window.autolist && <Col md={12}>
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
          </Col>}
          {/* <Col>
            <Input type="checkbox" id="exampleCustomCheckbox" /> Using vesting
            contributor?
          </Col> */}
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
            <Button color="primary" onClick={handleClickPrev}>Back</Button>
          </Col>
          <Col style={{ textAlign: "center" }}>
            <Button disabled>Next</Button>
          </Col>
          </Row>
          
        )}
      </div>
    );
  };
  export default TwoCompoent;