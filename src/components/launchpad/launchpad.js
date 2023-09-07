import React, { Fragment, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import { FaCopy } from "react-icons/fa";

import StepWizard from "react-step-wizard";
import { Row, Col, Button } from "reactstrap";

import { precision } from "../../Utils/precision";

import { useNavigate } from "react-router-dom";
import OneComponent from "./launchpadComponent/one";
import TwoComponent from "./launchpadComponent/two";
import {
  SaleTokenAddresses,
  PresaleContractAddresses,
  SwapRouters,
} from "../../Utils/config";
import { getNetwork } from "../../Utils/initialFunctions";
const Forth = (props) => {
  const navigator = useNavigate();
  const [finishbtn, setFinishBtn] = useState("Finish");
  const [createFlg, setCreateflg] = useState(false);
  const handleLastStep = async () => {
    let tokenAddresses = [];
    let initialInfos = [];
    let tokenFlags = [];
    tokenAddresses[0] = window.userAddress; // Presale Owner
    tokenAddresses[1] =
      SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["address"]; // Base Tokek (paytoken)
    tokenAddresses[2] = props.tokenInfo.tokenaddress; // Presale Token
    tokenAddresses[3] = SwapRouters[getNetwork()[0]].find(
      (item) => item.name === props.tokenInfo.router
    ).factoryAddress; // Uniswap Factory address
    tokenAddresses[4] = PresaleContractAddresses[getNetwork()[0]].WETHAddress; //WETH address
    tokenAddresses[5] =
      PresaleContractAddresses[getNetwork()[0]].PresaleLockForwardAddress; //Presale Locker

    initialInfos[0] = precision.add(
      props.tokenInfo["presaleRate"],
      SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]
    );
    initialInfos[1] = precision.add(
      props.tokenInfo["maxPurchase"],
      SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]
    );
    initialInfos[2] = precision.add(
      props.tokenInfo["hardcap"],
      SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]
    );
    initialInfos[3] = precision.add(
      props.tokenInfo["softcap"],
      SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]
    );
    initialInfos[4] = Number(props.tokenInfo["liquidity"] || 0) * 10;
    initialInfos[5] = precision.add(
      props.tokenInfo["rate"] || "0",
      SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]
    );
    initialInfos[6] = Math.round(
      Date.UTC(
        props.tokenInfo.startTime.getFullYear(),
        props.tokenInfo.startTime.getMonth(),
        props.tokenInfo.startTime.getDate(),
        props.tokenInfo.startTime.getHours(),
        props.tokenInfo.startTime.getMinutes(),
        props.tokenInfo.startTime.getSeconds()
      ) / 1000
    );
    initialInfos[7] = Math.round(
      Date.UTC(
        props.tokenInfo.endICO.getFullYear(),
        props.tokenInfo.endICO.getMonth(),
        props.tokenInfo.endICO.getDate(),
        props.tokenInfo.endICO.getHours(),
        props.tokenInfo.endICO.getMinutes(),
        props.tokenInfo.endICO.getSeconds()
      ) / 1000
    );
    initialInfos[8] = Number(props.tokenInfo.liqLock || 0) * 60;

    tokenFlags[0] = props.tokenInfo.whitelist === "true" ? true : false;
    tokenFlags[1] = props.tokenInfo.listing === "true" ? true : false;
    tokenFlags[2] = props.tokenInfo.fee === "true" ? true : false;
    tokenFlags[3] = props.tokenInfo.refundType === "true" ? true : false;
    console.log(initialInfos);
    console.log(tokenFlags);
    console.log(tokenAddresses);
    setCreateflg(true);
    await window.PresaleGeneratorContract.methods
      .createPresale(tokenAddresses, initialInfos, tokenFlags)
      .send({
        from: window.userAddress,
        value: window.web3.utils.toWei("0.01", "ether"),
      })
      .on("transactionHash", async () => {
        setFinishBtn("Finishing ...");
      })
      .on("receipt", (e) => {
        var address = e.events.OwnershipTransferred.address;
        setFinishBtn("Finished");
        setCreateflg(false);
        navigator(`/launchpad/${address}`);
      });
    props.lastStep();
    setCreateflg(false);
    // props.completeCallback();
  };
  const handleBack = () => {
    props.previousStep();
  };
  return (
    <div>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Factory Address{" "}
        <span style={{ float: "right" }}>
          {window.presaleGeneratorAddress}
          <span style={{ marginLeft: 4, cursor: "pointer" }}>
            <FaCopy
              onClick={() => {
                navigator.clipboard.writeText(window.presaleGeneratorAddress);
              }}
            />
          </span>
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Token name{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.tokenName}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Token symbol{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.tokenSymbol}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Token decimals{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.tokenDecimal}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Presale rate{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.presaleRate} {window.currency.toUpperCase()}
        </span>
      </p>
      {window.autolist && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Listing rate{" "}
          <span style={{ float: "right" }}>
            {props.tokenInfo.rate} {window.currency.toUpperCase()}
          </span>
        </p>
      )}
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Sale method{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.whitelist === true ? "Whitelist Only" : "Public"}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Softcap{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.softcap} {window.currency.toUpperCase()}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Hardcap{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.hardcap} {window.currency.toUpperCase()}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Unsold tokens{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.refundType === true ? "Refund" : "Burn"}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Maximum buy per Wallet
        <span style={{ float: "right" }}>
          {props.tokenInfo.maxPurchase} {window.currency.toUpperCase()}
        </span>
      </p>
      {window.autolist && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Liquidity{" "}
          <span style={{ float: "right" }}>{props.tokenInfo.liquidity} %</span>
        </p>
      )}
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Start time{" "}
        <span style={{ float: "right" }}>
          {new Date(props.tokenInfo.startTime).toLocaleString({
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        End time{" "}
        <span style={{ float: "right" }}>
        {new Date(props.tokenInfo.endICO).toLocaleString({
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      </p>
      {window.autolist && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Liquidity lockup time{" "}
          <span style={{ float: "right" }}>{props.tokenInfo.liqLock} mins</span>
        </p>
      )}
      {/* <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Website{" "}
        <span style={{ float: "right" }}>
          <a href={props.tokenInfo.website} target="_blank" rel="noreferrer">
            {props.tokenInfo.website}
          </a>
        </span>
      </p>
      {props.tokenInfo.facebook && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Facebook{" "}
          <span style={{ float: "right" }}>
            <a href={props.tokenInfo.facebook} target="_blank" rel="noreferrer">
              {props.tokenInfo.facebook}
            </a>
          </span>
        </p>
      )}
      {props.tokenInfo.twitter && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Twitter{" "}
          <span style={{ float: "right" }}>
            <a href={props.tokenInfo.twitter} target="_blank" rel="noreferrer">
              {props.tokenInfo.twitter}
            </a>
          </span>
        </p>
      )}
      {props.tokenInfo.github && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Github{" "}
          <span style={{ float: "right" }}>
            <a href={props.tokenInfo.github} target="_blank" rel="noreferrer">
              {props.tokenInfo.github}
            </a>
          </span>
        </p>
      )}
      {props.tokenInfo.telegram && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Telegram{" "}
          <span style={{ float: "right" }}>
            <a href={props.tokenInfo.telegram} target="_blank" rel="noreferrer">
              {props.tokenInfo.telegram}
            </a>
          </span>
        </p>
      )}
      {props.tokenInfo.instagram && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Instagram{" "}
          <span style={{ float: "right" }}>
            <a
              href={props.tokenInfo.instagram}
              target="_blank"
              rel="noreferrer"
            >
              {props.tokenInfo.instagram}
            </a>
          </span>
        </p>
      )}
      {props.tokenInfo.discord && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Discord{" "}
          <span style={{ float: "right" }}>
            <a href={props.tokenInfo.discord} target="_blank" rel="noreferrer">
              {props.tokenInfo.discord}
            </a>
          </span>
        </p>
      )}
      {props.tokenInfo.reddit && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Reddit{" "}
          <span style={{ float: "right" }}>
            <a href={props.tokenInfo.reddit} target="_blank" rel="noreferrer">
              {props.tokenInfo.reddit}
            </a>
          </span>
        </p>
      )}
      {props.tokenInfo.description && (
        <p style={{ borderBottom: "1px solid #cbcaca" }}>
          Description{" "}
          <span style={{ float: "right" }}>{props.tokenInfo.description}</span>
        </p>
      )} */}
      <br />
      <Row>
        <Col style={{ textAlign: "center" }}>
          <Button color="primary" onClick={handleBack}>
            Back
          </Button>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <Button color="primary" onClick={handleLastStep} disabled={createFlg}>
            {finishbtn}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const CreateLaunchpad = () => {
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
      <div className="createlaunchpad">
        <Stepper activeStep={activeStep}>
          <Step label="Verify Token" children={<MdDescription />} />
          <Step label="DeFi Launchpad Info" />
          {/* <Step label="Add Additional Info" /> */}
          <Step label="Finish" />
        </Stepper>
        {/* NOTE: IMPORTANT !! StepWizard must contains at least 2 children components, else got error */}
        <StepWizard
          instance={assignStepWizard}
          onStepChange={handleStepChange}
          className="stepwizard"
        >
          <OneComponent tokenCallback={assignToken} />
          <TwoComponent tokenInfo={tokenInfo} tokenCallback={assignToken} />
          <Forth tokenInfo={tokenInfo} />
        </StepWizard>
      </div>
    </Fragment>
  );
};

export default CreateLaunchpad;
