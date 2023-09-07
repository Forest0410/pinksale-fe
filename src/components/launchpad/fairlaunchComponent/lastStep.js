import React, { useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { precision } from "../../../Utils/precision";
import {
  SaleTokenAddresses,
  PresaleContractAddresses,
  SwapRouters,
} from "../../../Utils/config";
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { getNetwork } from "../../../Utils/initialFunctions";

const LastStepComponent = (props) => {
  const navigator = useNavigate();
  const [finishbtn, setFinishBtn] = useState("Finish");
  const [createFlg, setCreateflg] = useState(false);
  const handleLastStep = async () => {
    let tokenAddresses = [];
    tokenAddresses[0] = window.userAddress; // Presale Owner
    tokenAddresses[1] =
      SaleTokenAddresses[getNetwork()[0]][
        props.tokenInfo.currency.toLowerCase()
      ]["address"]; // Base Tokek (paytoken)
    tokenAddresses[2] = props.tokenInfo.tokenaddress; // Presale Token
    tokenAddresses[3] = SwapRouters[getNetwork()[0]].find(
      (item) => item.name === props.tokenInfo.router
    ).factoryAddress;
    tokenAddresses[4] = PresaleContractAddresses[getNetwork()[0]].WETHAddress; //WETH address
    tokenAddresses[5] =
      PresaleContractAddresses[getNetwork()[0]].PresaleLockForwardAddress; //Presale Locker

    let _totalAmount = precision.add(
      props.tokenInfo["sellamount"],
      props.tokenInfo.tokenDecimal
    );
    let softCap = precision.add(
      props.tokenInfo["softcap"],
      SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]
    );
    let liquidityPercent = Number(props.tokenInfo["liquidity"] || 0) * 10;

    let startTime = Math.round(
      Date.UTC(
        props.tokenInfo.startTime.getFullYear(),
        props.tokenInfo.startTime.getMonth(),
        props.tokenInfo.startTime.getDate(),
        props.tokenInfo.startTime.getHours(),
        props.tokenInfo.startTime.getMinutes(),
        props.tokenInfo.startTime.getSeconds()
      ) / 1000
    );
    let endTime = Math.round(
      Date.UTC(
        props.tokenInfo.endICO.getFullYear(),
        props.tokenInfo.endICO.getMonth(),
        props.tokenInfo.endICO.getDate(),
        props.tokenInfo.endICO.getHours(),
        props.tokenInfo.endICO.getMinutes(),
        props.tokenInfo.endICO.getSeconds()
      ) / 1000
    );
    let liq_Lock = Number(props.tokenInfo.liqLock || 0) * 60;
    let feeOption = props.tokenInfo.fee === "true" ? true : false;
    setCreateflg(true);
    await window.FairLaunchGeneratorContract.methods
      .createPresale(
        tokenAddresses,
        _totalAmount,
        softCap,
        liquidityPercent,
        startTime,
        endTime,
        liq_Lock,
        feeOption
      )
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
        Total selling amount{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.sellamount} {props.tokenInfo.tokenSymbol}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Softcap{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.softcap} {window.currency.toUpperCase()}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Liquidity{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.liquidity} %</span>
      </p>
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
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Liquidity lockup time{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.liqLock} mins</span>
      </p>
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
export default React.memo(LastStepComponent);
