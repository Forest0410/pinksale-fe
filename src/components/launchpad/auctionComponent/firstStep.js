import React, { useState, useEffect } from "react";
import { Container, Col, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import * as ERC20ABI from "../../../Utils/ABIs/erc20Abi.json";
import { ThreeCircles } from "react-loader-spinner";
import ActionButtons from "../launchpadComponent/actionButtons";
import { SaleTokenAddresses } from "../../../Utils/config";
import { getNetwork, checkNetwork } from "../../../Utils/initialFunctions";
import { Networks } from "../../../Utils/network";

const FirstStepComponent = (props) => {
  const [info1, setInfo1] = useState({
    currency: "eth",
    fee: "false",
    tokenName: "",
    tokenSymbol: "",
    tokenDecimal: "",
  });
  useEffect(() => {
    setInfo1({...info1, currency: Networks[getNetwork()[0]].tokenSymbol});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [isApprove, setIsapprove] = useState(false);
  const [approveBtn, setApprovebtn] = useState("Approve");
  const [approved, setApproved] = useState(true);
  const [loading, setLoading] = useState(false);

  const onContractInputChanged = async (event) => {
    if (checkNetwork() === true) return 0;
    const targetValue = event.target.value;
    if (window.web3.utils.isAddress(targetValue) === false) {
      setError("Invalid token address");
      setInfo1({
        ...info1,
        tokenName: "",
        tokenDecimal: "",
        tokenSymbol: "",
      });
    } else if (targetValue.length === 0) {
      setError("Token address cannot be blank");
      setInfo1({
        ...info1,
        tokenName: "",
        tokenDecimal: "",
        tokenSymbol: "",
      });
    } else if (window.web3.utils.isAddress(targetValue) === true) {
      setLoading(true);
      window.TokenContract = new window.web3.eth.Contract(
        ERC20ABI.default,
        targetValue,
        { from: window.userAddress }
      );
      const tokenname1 = await window.TokenContract.methods.name().call();
      setInfo1((info1) => ({
        ...info1,
        tokenName: tokenname1,
      }));
      const symbol = await window.TokenContract.methods.symbol().call();
      setInfo1((info1) => ({
        ...info1,
        tokenSymbol: symbol,
      }));
      window.tokenSymbol = symbol;
      const decimal = await window.TokenContract.methods.decimals().call();
      setInfo1((info1) => ({
        ...info1,
        tokenDecimal: decimal,
      }));
      const allowance = await window.TokenContract.methods
        .allowance(window.userAddress, window.auctionGeneratorAddress)
        .call();
      const amount = await window.TokenContract.methods
        .balanceOf(window.userAddress)
        .call();
      window.tokenAmount = amount;
      setLoading(false);
      setValidated(true);
      setApproved(allowance >= amount ? true : false);
    }
    setInfo1((info1) => ({
      ...info1,
      tokenaddress: targetValue,
    }));
  };
  const handleApprove = async () => {
    const amount = await window.TokenContract.methods
      .balanceOf(window.userAddress)
      .call();
    setIsapprove(true);
    await window.TokenContract.methods
      .approve(window.auctionGeneratorAddress, amount)
      .send({ from: window.userAddress })
      .on("transactionHash", async () => {
        setApprovebtn("Approving...");
      })
      .on("receipt", async () => {
        setApprovebtn("Next");
        setApproved(true);
      });
    setIsapprove(false);
  };
  const handleInputChanged = async (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    setInfo1((info1) => ({
      ...info1,
      [targetName]: targetValue,
    }));
  };
  const validate = () => {
    if (!info1.tokenaddress) setError("Token address can't be empty!");
    else {
      setError("");
      props.nextStep();
      props.tokenCallback(info1);
    }
  };
  return (
    <Container>
      <FormGroup>
        <Label style={{ fontWeight: 600, marginBottom: 15 }}>
          Token address <span style={{ color: "red" }}>*</span>
        </Label>
        <Input
          type="text"
          name="tokenaddress"
          placeholder="contract address"
          onChange={onContractInputChanged}
        />
        <FormText className="color-sec">Pool creation fee: 0.01 {getNetwork().length > 0? Networks[getNetwork()[0]].tokenSymbol: ""}</FormText>
        <br />
        <span style={{ color: "#f95192", fontSize: 12 }}>{error}</span>
      </FormGroup>
      <br />
      {loading && (
        <ThreeCircles
          height="30"
          width="30"
          color="#e21586"
          visible={true}
          ariaLabel="three-circles-rotating"
        />
      )}
      {loading === false && info1.tokenDecimal && (
        <>
          <p style={{ borderBottom: "1px solid #cbcaca" }}>
            Name{" "}
            <span style={{ float: "right" }} className="color-sec">
              {info1.tokenName}
            </span>
          </p>
          <p style={{ borderBottom: "1px solid #cbcaca" }}>
            Symbol <span style={{ float: "right" }}>{info1.tokenSymbol}</span>
          </p>
          <p style={{ borderBottom: "1px solid #cbcaca" }}>
            Decimals{" "}
            <span style={{ float: "right" }}>{info1.tokenDecimal}</span>
          </p>
        </>
      )}
      <FormGroup tag="fieldset">
        <Label style={{ fontWeight: 600, marginBottom: 15, marginTop: 20 }}>
          Currency
        </Label>
        <Col sm={10}>
        {Object.keys(SaleTokenAddresses[getNetwork()[0]]).map((item) => (
              <FormGroup check key={item}>
                <Label check>
                  {" "}
                  <Input
                    type="radio"
                    name="currency"
                    value={item}
                    onChange={handleInputChanged}
                    checked={info1.currency && info1.currency.toLowerCase() === item.toLowerCase()}
                  />{" "}
                  {item.toUpperCase()}
                </Label>
              </FormGroup>
            ))}
        </Col>
        <FormText className="color-sec">
          Users will pay with {info1.currency?.toUpperCase()} for your token
        </FormText>
      </FormGroup>
      <FormGroup tag="fieldset">
        <Label style={{ fontWeight: 600, marginBottom: 15, marginTop: 20 }}>
          Fee Options
        </Label>
        <Col sm={10}>
          <FormGroup check>
            <Label check>
              {" "}
              <Input
                type="radio"
                name="fee"
                value={"false"}
                onChange={handleInputChanged}
                checked={info1.fee === "false"}
              />{" "}
              5% {info1.currency.toUpperCase()} raised only{" "}
              <span className="color-sec">(Recommanded)</span>
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="fee"
                value={"true"}
                onChange={handleInputChanged}
                checked={info1.fee === "true"}
              />{" "}
              2% {info1.currency.toUpperCase()} raised + 2% token sold
            </Label>
          </FormGroup>
        </Col>
      </FormGroup>
      <br />
      {approved === false && window.TokenContract ? (
        <Col style={{ textAlign: "center" }}>
          <Button
            onClick={handleApprove}
            color="primary"
            disabled={window.userAddress.length === 0 || isApprove}
          >
            {approveBtn}
          </Button>
        </Col>
      ) : validated ? (
        <ActionButtons {...props} nextStep={validate} />
      ) : (
        <Col style={{ textAlign: "center" }}>
          <Button disabled>Next</Button>
        </Col>
      )}
    </Container>
  );
};

export default React.memo(FirstStepComponent);
