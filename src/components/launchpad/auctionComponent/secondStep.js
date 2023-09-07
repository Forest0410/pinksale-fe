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
  const [startPrice, setStartprice] = useState("");
  const [endPrice, setEndprice] = useState("");
  const [softcapValidate, setSoftcapvalidate] = useState("");
  const [liquidityValidate, setLiquidityValidate] = useState("");
  const [startTimeValidate, setStartTimeValidate] = useState("");
  const [endTimeValidate, setEndtimeValidate] = useState("");
  const [sellingAmountValidate, setSellingAmountValidate] = useState("");
  const [maxPurchaseValidate, setMaxpurchaseValidate] = useState("");
  const [hardcapVaildate, setHardcapvalidate] = useState("");
  const [startPriceValidate, setStartpriceValidate] = useState("");
  const [endPriceValidate, setEndpriceValidate] = useState("");
  const [decreaseRateValidate, setDecreaseRateValidate] = useState("");
  useEffect(() => {
    if (
      info2.sellingAmount &&
      info2.startingPrice &&
      info2.endPrice &&
      info2.softcap &&
      info2.hardcap &&
      info2.maxPurchase &&
      info2.decreaseRate &&
      info2.router &&
      info2.liquidity &&
      info2.startTime &&
      info2.endICO &&
      info2.liqlock &&
      sellingAmountValidate.length === 0 &&
      softcapValidate.length === 0 &&
      hardcapVaildate.length === 0 &&
      endPriceValidate.length === 0 &&
      startPriceValidate.length === 0 &&
      liquidityValidate.length === 0 &&
      startTimeValidate.length === 0 &&
      endTimeValidate.length === 0 &&
      maxPurchaseValidate.length === 0 &&
      decreaseRateValidate.length === 0
    )
      setValidated(true);
    else setValidated(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info2]);
  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    if (targetName === "sellingAmount") {
      if (targetValue.length === 0)
        setSellingAmountValidate("Presale rate cannot be blank");
      else if (Number(targetValue) === 0)
        setSellingAmountValidate(
          "Total Selling Amount must be positive number"
        );
      else setSellingAmountValidate("");
    }
    if (targetName === "softcap") {
      if (info2.sellingAmount && targetValue.length !== 0) {
        setInfo2((info2) => ({
          ...info2,
          endPrice: Number(targetValue) / Number(info2.sellingAmount),
        }));
      }
      if (targetValue.length === 0)
        setSoftcapvalidate("Softcap cannot be blank");
      else if (Number(targetValue) * 5 < Number(info2.hardcap || 0))
        setSoftcapvalidate("Softcap must be >= 20% of Hardcap!");
      else if (Number(targetValue) > Number(info2.hardcap || 0))
        setSoftcapvalidate("Softcap must be less than or equal Hardcap");
      else setSoftcapvalidate("");
    } else if (targetName === "hardcap") {
      if (info2.sellingAmount && targetValue.length !== 0) {
        setInfo2((info2) => ({
          ...info2,
          startingPrice: Number(targetValue) / Number(info2.sellingAmount),
        }));
      }
      if (targetValue.length === 0) {
        setHardcapvalidate("Hardcap cannot be blank");
      } else if (targetValue === "0")
        setHardcapvalidate("Hardcap must be positive number");
      else setHardcapvalidate("");
      if (Number(info2.softcap || 0) * 5 < Number(targetValue))
        setSoftcapvalidate("Softcap must be >= 20% of Hardcap!");
      else if (Number(targetValue) < Number(info2.softcap || 0))
        setSoftcapvalidate("Softcap must be less than or equal Hardcap");
      else setSoftcapvalidate("");
    } else if (targetName === "endPrice") {
      setEndprice(targetValue);
      if (info2.sellingAmount && targetValue.length !== 0) {
        setInfo2((info2) => ({
          ...info2,
          softcap: Number(targetValue) * Number(info2.sellingAmount),
        }));
        if (
          info2.hardcap &&
          info2.hardcap > Number(targetValue) * Number(info2.sellingAmount) * 5
        )
          setSoftcapvalidate("Softcap must be >= 20% of Hardcap!");
        else setSoftcapvalidate("");
      }
      if (targetValue.length === 0)
        setEndpriceValidate("End Price cannot be blank");
      else if (targetValue === "0")
        setEndpriceValidate("End Price must be positive number");
      else if (Number(targetValue) >= Number(info2.startingPrice || 0))
        setEndpriceValidate("End Price must be less than Start Price");
      else setEndpriceValidate("");
    } else if (targetName === "startingPrice") {
      setStartprice(targetValue);
      if (info2.sellingAmount && targetValue.length !== 0) {
        setInfo2((info2) => ({
          ...info2,
          hardcap: Number(targetValue) * Number(info2.sellingAmount),
        }));
        if (
          info2.softcap &&
          info2.softcap * Number(info2.sellingAmount) * 5 < Number(targetValue)
        )
          setSoftcapvalidate("Softcap must be >= 20% of Hardcap!");
        else setSoftcapvalidate("");
      }
      if (targetValue.length === 0) {
        setStartpriceValidate("Start Price cannot be blank");
      } else if (targetValue === "0")
        setStartpriceValidate("Start Price must be positive number");
      else setStartpriceValidate("");
      if (Number(info2.endPrice) > Number(targetValue))
        setEndpriceValidate("End Price must be less than Start Price");
      else setEndpriceValidate("");
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
    } else if (targetName === "decreaseRate") {
      if (targetValue.length === 0)
        setDecreaseRateValidate("Cycle cannot be blank");
      else if (Number(targetValue) === 0)
        setDecreaseRateValidate("Cycle must be positive number");
      else setDecreaseRateValidate("");
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
          Total Selling Amount <span style={{ color: "red" }}>*</span>
        </Label>
        <Input
          onKeyDown={(e) => handleKeyDown(e, info2.sellingAmount)}
          name="sellingAmount"
          placeholder="100"
          autoComplete="on"
          value={info2.sellingAmount ? info2.sellingAmount : ""}
          onChange={onInputChanged}
        />
        <FormText className="validate-msg">{sellingAmountValidate}</FormText>
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              Start Price ({window?.currency.toUpperCase()}){" "}
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="startingPrice"
              placeholder="0"
              value={info2.startingPrice ? info2.startingPrice : ""}
              onChange={onInputChanged}
              onKeyDown={(e) => handleKeyDown(e, info2.startingPrice)}
            />
            <p
              color="muted"
              style={{
                fontSize: 12,
                fontWeight: 500,
                marginBottom: 2,
                lineHeight: "14px",
              }}
            >
              1 {window.tokenSymbol} = {startPrice}{" "}
              {window?.currency.toUpperCase()}
            </p>
            <p
              color="muted"
              style={{
                fontSize: 12,
                fontWeight: 500,
                marginBottom: 2,
                lineHeight: "14px",
              }}
            >
              1 {window?.currency.toUpperCase()} ={" "}
              {startPrice > 0 ? (1 / startPrice).toFixed(3) : 0}{" "}
              {window.tokenSymbol}
            </p>
            <FormText className="validate-msg">{startPriceValidate}</FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              End Price ({window?.currency.toUpperCase()}){" "}
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="endPrice"
              placeholder="0"
              onChange={onInputChanged}
              value={info2.endPrice ? info2.endPrice : ""}
              onKeyDown={(e) => handleKeyDown(e, info2.endPrice)}
            />
            <p
              color="muted"
              style={{
                fontSize: 12,
                fontWeight: 500,
                marginBottom: 2,
                lineHeight: "14px",
              }}
            >
              1 {window.tokenSymbol} = {endPrice}{" "}
              {window?.currency.toUpperCase()}
            </p>
            <p
              color="muted"
              style={{
                fontSize: 12,
                fontWeight: 500,
                marginBottom: 2,
                lineHeight: "14px",
              }}
            >
              1 {window?.currency.toUpperCase()} ={" "}
              {endPrice > 0 ? (1 / endPrice).toFixed(3) : 0}{" "}
              {window.tokenSymbol}
            </p>
            <FormText className="validate-msg">{endPriceValidate}</FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              SoftCap ({window?.currency.toUpperCase()}){" "}
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="softcap"
              placeholder="0.001"
              onChange={onInputChanged}
              value={info2.softcap || ""}
              onKeyDown={(e) => handleKeyDown(e, info2.softcap)}
            />
            <FormText className="validate-msg">{softcapValidate}</FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              HardCap ({window?.currency.toUpperCase()}){" "}
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="hardcap"
              placeholder="0.1"
              onChange={onInputChanged}
              value={info2.hardcap || ""}
              onKeyDown={(e) => handleKeyDown(e, info2.hardcap)}
            />
            <FormText className="validate-msg">{hardcapVaildate}</FormText>
          </FormGroup>
        </Col>
      </Row>
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
        <FormText color="muted">
          You can enable/disable whitelist anytime.
        </FormText>
      </FormGroup>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              Decrease Price Cycle (minutes){" "}
              <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="decreaseRate"
              placeholder="0.001"
              onChange={onInputChanged}
              value={info2.decreaseRate || ""}
              onKeyDown={(e) => handleKeyDown(e, info2.decreaseRate)}
            />
            <FormText className="validate-msg">{decreaseRateValidate}</FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              Liquidity Percent (%)<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              type="text"
              name="liquidity"
              placeholder="0.1"
              onChange={onInputChanged}
              value={info2.liquidity || ""}
              onKeyDown={(e) => handleKeyDown(e, info2.liquidity)}
            />
            <FormText className="validate-msg">{liquidityValidate}</FormText>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label style={{ fontWeight: 600, marginBottom: 15 }}>
              Maximum buy ({window?.currency.toUpperCase()}) per Account{" "}
              <span style={{ color: "red" }}>*</span>
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
        <Col md={6}>
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
        </Col>
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
                name="liqlock"
                placeholder="0"
                onChange={onInputChanged}
                value={info2.liqlock || ""}
                onKeyDown={(e) => handleKeyDown(e, info2.liqlock)}
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
