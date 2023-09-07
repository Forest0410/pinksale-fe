/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from "react";
import SmallLogo from "../../assets/images/logo/logo.png";
import { Link, Outlet } from "react-router-dom";
import { initContracts } from "../../Utils/init";
import { Web3Context } from "../../context/Web3Context";
import { Networks } from "../../Utils/network";
import SwitchNetworkModal from "./networkModal";
import defaultChain from "../../assets/images/network/default.svg";
import WalletImg from "../../assets/images/svg/wallet.svg";
import { Row, Col } from "reactstrap";
const HeaderSec = () => {
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const web3 = useContext(Web3Context);
  const [openModal, setOpenModal] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const handleConnectMetamask = async () => {
    try {
      initContracts(fetchBalance);
    } catch (error) {
      console.log(error);
    }
    // if (isMetamaskInstalled()) {
    //   if(window.ethereum.chainId != window.correctChainId){
    //     changeNetwork();
    //   }
    //   initContracts(fetchBalance);
    // } else {
    // }
  };
  // const isMetamaskInstalled = () => {
  //   return typeof window.ethereum !== "undefined";
  // };
  const checkNetwork = () => {
    let netFlg = true;
    Object.keys(Networks).forEach((key) => {
      if (Networks[key].ChainID === Number(window.chainId)) {
        netFlg = false;
        return;
      }
    });
    return netFlg;
  };
  const getNetwork = () => {
    return Object.keys(Networks).filter((key) => {
      return Networks[key].ChainID === Number(window.chainId);
    });
  };
  const fetchBalance = async () => {
    let balance = await window.web3.eth.getBalance(window.userAddress);
    balance = window.web3.utils.fromWei(balance);
    setUserBalance(Number(balance).toFixed(6));
    const userData = {
      address: window.userAddress,
      balance: balance,
    };
    web3.dispatch(userData);
  };
  useEffect(() => {
    if (window.userAddress) fetchBalance();
    if (window.userAddress && checkNetwork()) setIsWrongNetwork(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container-fluid" style={{ paddingTop: 8 }}>
      <div className="row" style={{ paddingLeft: "10px" }}>
        <div
          className="col-md-12"
          style={{ paddingRight: 0, paddingBottom: 8 }}
        >
          <Link to="/" className="navbar-brand hidden-xs-down">
            <img src={SmallLogo} alt="" style={{ height: "3.5rem" }} />
          </Link>
          <Link to="/" className="navbar-brand hidden-unless-xs">
            <img src={SmallLogo} alt="" style={{ height: "3rem" }} />
          </Link>
          {window.userAddress ? (
            isWrongNetwork ? (
              <button
                className="btn btn-primary js-tilt"
                id="btn-connect"
                ref={(el) => {
                  if (el) {
                    el.style.setProperty(
                      "background-color",
                      "#ffc107",
                      "important"
                    );
                    el.style.setProperty("color", "#000000", "important");
                    el.style.setProperty("font-weight", "500", "important");
                  }
                }}
                style={{
                  marginRight: "30px",
                  float: "right",
                  marginTop: "10px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
                data-tilt-perspective="300"
                data-tilt-speed="700"
                data-tilt-max="24"
              >
                WRONG NETWORK
              </button>
            ) : (
              getNetwork().length > 0 && <button
                className="btn btn-primary js-tilt"
                id="btn-connect"
                ref={(el) => {
                  if (el) {
                    el.style.setProperty(
                      "background-color",
                      "#ffc107",
                      "important"
                    );
                    el.style.setProperty("color", "#000000", "important");
                    el.style.setProperty("font-weight", "500", "important");
                  }
                }}
                style={{
                  marginRight: "30px",
                  float: "right",
                  marginTop: "10px",
                  padding: "8px",
                  fontSize: 10.5
                }}
                data-tilt-perspective="300"
                data-tilt-speed="700"
                data-tilt-max="24"
              >
                <Row>
                  <Col style={{paddingRight: 0}}>
                  <div>
                    {window.userAddress.substr(0, 5)}...
                    {window.userAddress.substr(38, 42)}</div>
                    <div style={{whiteSpace: "nowrap", marginTop: 2}}>{userBalance} {Networks[getNetwork()[0]].tokenSymbol}</div>
                  </Col>
                  <Col style={{paddingRight: 15, paddingLeft:5}}><img src={WalletImg} alt="Wallet" height={"100%"} style={{border: 'solid 1px', borderRadius: '50%', padding: 2}}/></Col>
                </Row>
              </button>
            )
          ) : (
            <button
              className="btn btn-primary js-tilt"
              id="btn-connect"
              ref={(el) => {
                if (el) {
                  el.style.setProperty(
                    "background-color",
                    "#ffc107",
                    "important"
                  );
                  el.style.setProperty("color", "#000000", "important");
                  el.style.setProperty("font-weight", "500", "important");
                }
              }}
              style={{
                marginRight: "30px",
                float: "right",
                marginTop: "10px",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
              data-tilt-perspective="300"
              data-tilt-speed="700"
              data-tilt-max="24"
              onClick={handleConnectMetamask}
            >
              CONNECT
            </button>
          )}
          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-primary js-tilt"
            id="buy_banana"
            ref={(el) => {
              if (el) {
                el.style.setProperty(
                  "background-color",
                  "#ffc107",
                  "important"
                );
                el.style.setProperty("color", "#000000", "important");
              }
            }}
            style={{
              marginRight: 0,
              float: "right",
              marginTop: "10px",
              padding: "10px 8px",
            }}
            data-tilt-perspective="300"
            data-tilt-speed="700"
            data-tilt-max="24"
            rel="noreferrer"
          >
            {isWrongNetwork ? (
              <div className="changeNetwork">
                <img
                  src={defaultChain}
                  width={20}
                  style={{ marginRight: 10 }}
                  alt="chain logo"
                />
                {"No Suport"}
              </div>
            ) : (
              getNetwork().length > 0 && (
                <div className="changeNetwork">
                  <img
                    src={Networks[getNetwork()[0]].logo}
                    width={20}
                    style={{ marginRight: 10 }}
                    alt="chain logo"
                  />
                  {Networks[getNetwork()[0]].label}
                </div>
              )
            )}
          </button>
        </div>
        <Outlet />
      </div>
      <SwitchNetworkModal
        isOpen={openModal}
        onCloseModal={() => setOpenModal(false)}
      />
    </div>
  );
};

export default HeaderSec;
