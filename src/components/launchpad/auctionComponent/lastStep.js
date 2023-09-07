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

  const handleLastStep = async () => {
    let initialInfo = [];
    initialInfo.push(precision.add(props.tokenInfo.sellingAmount, props.tokenInfo.tokenDecimal));
    initialInfo.push(precision.add(props.tokenInfo.startingPrice, SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]));
    initialInfo.push(precision.add(props.tokenInfo.endPrice, SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]));
    initialInfo.push(precision.add(props.tokenInfo.maxPurchase, SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]));
    initialInfo.push(precision.add(props.tokenInfo.hardcap, SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]));
    initialInfo.push(precision.add(props.tokenInfo.softcap, SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]));
    initialInfo.push(Number(props.tokenInfo.liquidity) * 10);
    initialInfo.push(precision.add(props.tokenInfo.decreaseRate, SaleTokenAddresses[getNetwork()[0]][props.tokenInfo.currency.toLowerCase()]["decimals"]));
    initialInfo.push(
        Math.round(new Date(props.tokenInfo.startTime).getTime() / 1000) || 0
      );
      initialInfo.push(
        Math.round(new Date(props.tokenInfo.endICO).getTime() / 1000) || 0
      );
    initialInfo.push(Number(props.tokenInfo.liqlock) * 60 || 0);
    
    var flags = [];
    
    flags.push(props.tokenInfo.isWhitelist === "true" ? true : false);
    flags.push(props.tokenInfo.fee === "true" ? true : false);
    flags.push(props.tokenInfo.refundType === "true" ? true : false);
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
    await window.AuctionGeneratorContract.methods
      .createPresale(
        tokenAddresses, initialInfo, flags
      )
      .send({
        from: window.userAddress,
        value: window.web3.utils.toWei("0.1", "ether"),
      })
      .on("transactionHash", async () => {
        setFinishBtn("Finishing ...");
      })
      .on("receipt", (e) => {
        console.log(e);
        var address = e.events.OwnershipTransferred.address;
        setFinishBtn("Finished");
        navigator(`/auction/${address}`);
      });
    props.lastStep();
    props.completeCallback();
  };
  const handleBack = () => {
    props.previousStep();
  };
  return (
    <div>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Factory Address{" "}
        <span style={{ float: "right" }}>
          {window.auctionFactoryAddress}
          <span style={{ marginLeft: 4, cursor: "pointer" }}>
            <FaCopy
              onClick={() => {
                navigator.clipboard.writeText(window.auctionFactoryAddress);
              }}
            />
          </span>
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Token Address{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.tokenaddress}</span>
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
        Total Selling amount{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.sellingAmount} {props.tokenInfo.tokenSymbol}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Currency <span style={{ float: "right" }}>{window.currency.toUpperCase()}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Fee Options{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.fee === false
            ? `5% ${window.currency.toUpperCase()} raised only`
            : `2% ${window.currency.toUpperCase()} raised + 2% token sold`}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Start Price ({window.currency.toUpperCase()}){" "}
        <span style={{ float: "right" }}>{props.tokenInfo.startingPrice} {window.currency.toUpperCase()}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        End Price ({window.currency.toUpperCase()}){" "}
        <span style={{ float: "right" }}>{props.tokenInfo.endPrice} {window.currency.toUpperCase()}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Softcap{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.softcap} {window.currency.toUpperCase()}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Hardcap{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.hardcap} {window.currency.toUpperCase()}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Whitelist{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.whitelist === true ? "Whitelist Only" : "Public"}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Decrease Price Cycle (minutes){" "}
        <span style={{ float: "right" }}>{props.tokenInfo.decreaseRate} {window.currency.toUpperCase()}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Liquidity{" "}
        <span style={{ float: "right" }}>{props.tokenInfo.liquidity} %</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Router <span style={{ float: "right" }}>{props.tokenInfo.router} </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Refund Type{" "}
        <span style={{ float: "right" }}>
          {props.tokenInfo.refundType === true ? "Refund" : "Burn"}
        </span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Liquidity Lock Time (minutes){" "}
        <span style={{ float: "right" }}>{props.tokenInfo.liqlock}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        Start time{" "}
        <span style={{ float: "right" }}>{new Date(props.tokenInfo.startTime).toLocaleString({
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}</span>
      </p>
      <p style={{ borderBottom: "1px solid #cbcaca" }}>
        End time{" "}
        <span style={{ float: "right" }}>{new Date(props.tokenInfo.endICO).toLocaleString({
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}</span>
      </p>
      <br />
      <Row>
        <Col style={{ textAlign: "center" }}>
          <Button color="primary" onClick={handleBack}>
            Back
          </Button>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <Button color="primary" onClick={handleLastStep}>
            {finishbtn}
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default React.memo(LastStepComponent);
