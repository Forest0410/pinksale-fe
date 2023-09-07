import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { FaKey, FaEdit } from "react-icons/fa";
import { GoPrimitiveDot, GoLock } from "react-icons/go";
import { Progress, Input, Button } from "reactstrap";
import { TailSpin } from "react-loader-spinner";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import * as FairlaunchABI from "../../Utils/ABIs/fairlaunchABI.json";
import * as ERC20ABI from "../../Utils/ABIs/erc20Abi.json";
import { precision } from "../../Utils/precision";
import { SaleTokenAddresses } from "../../Utils/config";
import { getNetwork } from "../../Utils/initialFunctions";
const FairlaunchDetail = () => {
  const { address } = useParams();
  const [paytoken, setPaytoken] = useState("");
  const [endTime, setEndtime] = useState(1663997472);
  const [startdate, setStartdate] = useState();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState({});
  const [presaleInfo, setPresaleInfo] = useState({});
  const [feeInfo, setFeeinfo] = useState({});
  const [tokenInfo, setTokenInfos] = useState({});
  const [softcap, setSoftcap] = useState(0);
  const [weiRaised, setWeiraised] = useState(0);
  const [myPurchase, setMypurchase] = useState(0);
  const [tokenSupply, setTokensupply] = useState(0);
  const [startICO, setStartICO] = useState("");
  const [endICO, setEndICO] = useState("");
  const [tokenAmount, setTokenAmount] = useState(0);
  const [buyBtntext, setBuybtntext] = useState(`Buy with BNB`);
  const [refundBtxtext, setRefundbtntext] = useState("Emergency Withdraw");
  const [claimBtn, setClaimbtn] = useState("Claim");
  const [finalizeFlg, setFinalizeflg] = useState(false);
  const [cancelFlg, setCancelFlg] = useState(false);
  const [ownerAddress, setOwner] = useState("");
  const findPayToken = (addr) => {
    return Object.keys(SaleTokenAddresses[getNetwork()[0]]).filter((key) => {
      return (
        SaleTokenAddresses[getNetwork()[0]][key].address.toLowerCase() ===
        addr.toLowerCase()
      );
    });
  };
  useEffect(() => {
    const initialize = async () => {
      if (window.web3.utils.isAddress(address) === true) {
        window.fairlaunchContract = new window.web3.eth.Contract(
          FairlaunchABI.default,
          address,
          { from: window.userAddress }
        );
        const presaleinfoCall = window.fairlaunchContract.methods
          .PRESALE_INFO()
          .call();
        const statusCall = window.fairlaunchContract.methods.STATUS().call();
        const factoryAddressCall = window.fairlaunchContract.methods
          .PRESALE_GENERATOR()
          .call();
        const myInfoCall = window.fairlaunchContract.methods
          .BUYERS(window.userAddress)
          .call();
        const feeInfoCall = window.fairlaunchContract.methods
          .PRESALE_FEE_INFO()
          .call();

        const infos = await Promise.all([
          presaleinfoCall, //0
          statusCall, //1
          factoryAddressCall, //2
          myInfoCall, //3
          feeInfoCall, //4
        ]);
        setPresaleInfo(infos[0]);
        setFeeinfo(infos[4]);
        setStatus(infos[1]);
        window.tokenContract = new window.web3.eth.Contract(
          ERC20ABI.default,
          infos[0].S_TOKEN,
          { from: window.userAddress }
        );
        const tokenNameCall = window.tokenContract.methods.name().call();
        const tokenSupplyCall = window.tokenContract.methods
          .totalSupply()
          .call();
        const tokenSymbolCall = window.tokenContract.methods.symbol().call();
        const tokenDecimalCall = window.tokenContract.methods.decimals().call();
        const tokenInfoCall = await Promise.all([
          tokenNameCall,
          tokenSupplyCall,
          tokenSymbolCall,
          tokenDecimalCall,
        ]);
        setTokenInfos(tokenInfoCall);
        if (getNetwork().length > 0) {
          setPaytoken(findPayToken(infos[0].B_TOKEN));
          setBuybtntext(
            `Buy with ${String(findPayToken(infos[0].B_TOKEN)).toUpperCase()}`
          );

          setSoftcap(
            precision.remove(
              infos[0].SOFTCAP,
              SaleTokenAddresses[getNetwork()[0]][
                findPayToken(infos[0].B_TOKEN)
              ].decimals
            )
          );
          setWeiraised(
            precision.remove(
              infos[1].TOTAL_BASE_COLLECTED,
              SaleTokenAddresses[getNetwork()[0]][
                findPayToken(infos[0].B_TOKEN)
              ].decimals
            ) -
              precision.remove(
                infos[1].TOTAL_BASE_WITHDRAWN,
                SaleTokenAddresses[getNetwork()[0]][
                  findPayToken(infos[0].B_TOKEN)
                ].decimals
              )
          );
          setMypurchase(
            precision.remove(
              infos[3].baseDeposited,
              SaleTokenAddresses[getNetwork()[0]][
                findPayToken(infos[0].B_TOKEN)
              ].decimals
            )
          );
        }
        setTokensupply(
          precision.remove(tokenInfoCall[1], Number(tokenInfoCall[3]))
        );
        var startDate = new Date(Number(infos[0].START_BLOCK) * 1000);
        setStartICO(
          startDate.getFullYear() +
            "." +
            (startDate.getMonth() + 1) +
            "." +
            startDate.getDate() +
            " " +
            startDate.getHours() +
            ":" +
            startDate.getMinutes()
        );
        var endDate = new Date(Number(infos[0].END_BLOCK) * 1000);
        setEndICO(
          endDate.getFullYear() +
            "." +
            (endDate.getMonth() + 1) +
            "." +
            endDate.getDate() +
            " " +
            endDate.getHours() +
            ":" +
            endDate.getMinutes()
        );
        setEndtime(Number(infos[2].END_BLOCK));
        setStartdate(Number(infos[2].START_BLOCK));
        setOwner(infos[0].PRESALE_OWNER);
        setDATA({
          labels: ["Presale", "Liquidity", "Unlocked"],
          datasets: [
            {
              label: "# of Votes",
              data: [
                precision.remove(
                  infos[0].TOTAL_AMOUNT,
                  SaleTokenAddresses[getNetwork()[0]][
                    findPayToken(infos[0].B_TOKEN)
                  ].decimals
                ),
                (precision.remove(
                  infos[0].TOTAL_AMOUNT,
                  SaleTokenAddresses[getNetwork()[0]][
                    findPayToken(infos[0].B_TOKEN)
                  ].decimals
                ) *
                  infos[0].LIQUIDITY_PERCENT *
                  (1000 - infos[4].PINK_BASE_FEE)) /
                  (1000 * 1000),
                precision.remove(tokenInfoCall[1], Number(tokenInfoCall[3])) -
                  precision.remove(
                    infos[0].TOTAL_AMOUNT,
                    SaleTokenAddresses[getNetwork()[0]][
                      findPayToken(infos[0].B_TOKEN)
                    ].decimals
                  ) -
                  (precision.remove(
                    infos[0].TOTAL_AMOUNT,
                    SaleTokenAddresses[getNetwork()[0]][
                      findPayToken(infos[0].B_TOKEN)
                    ].decimals
                  ) *
                    infos[0].LIQUIDITY_PERCENT *
                    (1000 - infos[4].PINK_BASE_FEE)) /
                    (1000 * 1000),
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [data, setDATA] = useState({
    labels: ["Presale", "Liquidity", "Unlocked"],
    datasets: [
      {
        label: "# of Votes",
        data: [0, 0, 10000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const calcTime = () => {
    var ts_diff = endTime - Math.floor(new Date().getTime() / 1000);
    if (Math.floor(ts_diff / 60 / 60 / 24) >= 0) {
      setDays(Math.floor(ts_diff / 60 / 60 / 24));
    }
    if (
      Math.floor((ts_diff - days * 60 * 60 * 24) / 60 / 60) >= 0 &&
      Math.floor((ts_diff - days * 60 * 60 * 24) / 60 / 60) < 24
    ) {
      setHours(Math.floor((ts_diff - days * 60 * 60 * 24) / 60 / 60));
    }
    if (
      Math.floor((ts_diff - days * 60 * 60 * 24 - hours * 60 * 60) / 60) >= 0 &&
      Math.floor((ts_diff - days * 60 * 60 * 24 - hours * 60 * 60) / 60) < 60
    ) {
      setMinutes(
        Math.floor((ts_diff - days * 60 * 60 * 24 - hours * 60 * 60) / 60)
      );
    }
    if (
      Math.floor(
        ts_diff - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60
      ) >= 0 &&
      Math.floor(
        ts_diff - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60
      ) < 60
    ) {
      setSeconds(
        Math.floor(
          ts_diff - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60
        )
      );
    }
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
  useEffect(() => {
    const timer = setTimeout(() => {
      calcTime();
    }, 1000);
    return () => clearTimeout(timer);
  });
  const handleBuyToken = async () => {
    if (paytoken !== Object.keys(SaleTokenAddresses[getNetwork()[0]])[0]) {
      const PayTokenContract = new window.web3.eth.Contract(
        ERC20ABI.default,
        SaleTokenAddresses[getNetwork()[0]][paytoken].address,
        { from: window.userAddress }
      );
      await PayTokenContract.methods
        .approve(
          address,
          precision.add(
            tokenAmount,
            SaleTokenAddresses[getNetwork()[0]][paytoken].decimals
          )
        )
        .send({ from: window.userAddress })
        .on("transactionHash", async () => {
          setBuybtntext("Approving...");
        })
        .on("receipt", async () => {
          setBuybtntext(`Buy with ${String(paytoken).toUpperCase()}`);
        });
    }
    await window.fairlaunchContract.methods
      .userDeposit(
        precision.add(
          tokenAmount,
          SaleTokenAddresses[getNetwork()[0]][paytoken].decimals
        )
      )
      .send({
        from: window.userAddress,
        value:
          paytoken !== Object.keys(SaleTokenAddresses[getNetwork()[0]])[0]
            ? 0
            : window.web3.utils.toWei(tokenAmount.toString(), "ether"),
      })
      .on("transactionHash", async () => {
        setBuybtntext("Buying...");
      })
      .on("receipt", async () => {
        setBuybtntext(`Buy with ${String(paytoken).toUpperCase()}`);
        const myPurchaseCall = await window.fairlaunchContract.methods
          .BUYERS(window.userAddress)
          .call();
        setMypurchase(
          precision.remove(
            Number(myPurchaseCall.baseDeposited),
            SaleTokenAddresses[getNetwork()[0]][paytoken].decimals
          )
        );
      });
  };
  const handleRefund = async () => {
    await window.fairlaunchContract.methods
      .userWithdrawBaseTokens()
      .send()
      .on("transactionHash", async () => {
        setRefundbtntext("Withdrawing...");
      })
      .on("receipt", async () => {
        setBuybtntext("Emergency Withdraw");
        setMypurchase(0);
      });
  };
  const handleEmergencyClaim = async () => {
    await window.fairlaunchContract.methods
      .userWithdrawBaseTokensEmergency()
      .send()
      .on("transactionHash", async () => {
        setRefundbtntext("Withdrawing...");
      })
      .on("receipt", async () => {
        setRefundbtntext("Emergency Withdraw");
        setMypurchase(0);
      });
  };
  const handleClaim = async () => {
    await window.fairlaunchContract.methods
      .userWithdrawTokens()
      .send()
      .on("transactionHash", async () => {
        setClaimbtn("Claiming...");
      })
      .on("receipt", async () => {
        setClaimbtn("Claim");
      });
  };
  const handleFinalizePool = async () => {
    await window.fairlaunchContract.methods
      .finalizePool()
      .send()
      .on("transactionHash", async () => {
        setFinalizeflg(true);
      })
      .on("receipt", async () => {
        setFinalizeflg(false);
      });
  };
  const handleCancelPool = async () => {
    await window.fairlaunchContract.methods
      .cancelPool()
      .send()
      .on("transactionHash", async () => {
        setCancelFlg(true);
      })
      .on("receipt", async () => {
        setCancelFlg(false);
      });
  };
  return (
    <Fragment>
      <div className="launchpad container">
        <Row>
          <Col md={8} style={{ padding: 15 }}>
            <Row>
              <div style={{ background: "#fff", padding: 20 }}>
                <div className="header">
                  <img
                    className="logo"
                    src={"https://www.pinkswap.finance/pinkswap.png"}
                    alt="tokenlogo"
                  ></img>
                  <div className="headerBody">
                    <div style={{ display: "flex" }}>
                      <div className="title">{tokenInfo[0]} Fair Launch</div>
                      {window.userAddress === ownerAddress && (
                        <>
                          <div className="ownerkey">
                            <FaKey />
                          </div>
                          <div className="editbutton">
                            {" "}
                            <FaEdit size={20} color="#f95192" />{" "}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {status.FORCE_FAILED ? (
                    <div className="statusnotlive">
                      <GoLock /> {"Canceled"}
                    </div>
                  ) : endTime > new Date().getTime() / 1000 &&
                    startdate < new Date().getTime() / 1000 ? (
                    <div className="statuslive">
                      <GoPrimitiveDot /> {"Sale live"}
                    </div>
                  ) : (
                    <div className="statusnotlive">
                      <GoLock />{" "}
                      {startdate > new Date().getTime() / 1000
                        ? "upcoming"
                        : "sale ended"}
                    </div>
                  )}
                </div>
                <div className="mainbody">
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Presale Address{" "}
                    <span style={{ float: "right" }}>
                      <a
                        href={`https://testnet.bscscan.com/address/${address}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {address}
                      </a>
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Token name{" "}
                    <span style={{ float: "right" }}>{tokenInfo[0]}</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Token symbol{" "}
                    <span style={{ float: "right" }}>{tokenInfo[2]}</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Token decimals{" "}
                    <span style={{ float: "right" }}>{tokenInfo[3]}</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Token Address{" "}
                    <span style={{ float: "right" }}>
                      <a
                        href={`https://testnet.bscscan.com/address/${presaleInfo.S_TOKEN}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {presaleInfo.S_TOKEN}
                      </a>
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Total Supply{" "}
                    <span style={{ float: "right" }}>
                      {tokenSupply} {tokenInfo[2]}
                    </span>
                  </p>
                  {Object.keys(presaleInfo).length > 0 && (
                    <p style={{ borderBottom: "1px solid #cbcaca" }}>
                      Tokens for Presale{" "}
                      <span style={{ float: "right" }}>
                        {precision.remove(
                          presaleInfo.TOTAL_AMOUNT,
                          getNetwork().length > 0 && paytoken.length > 0
                            ? SaleTokenAddresses[getNetwork()[0]][paytoken]
                                .decimals
                            : 18
                        )}{" "}
                        {tokenInfo[2]}
                      </span>
                    </p>
                  )}
                  {Object.keys(feeInfo).length > 0 && (
                    <p style={{ borderBottom: "1px solid #cbcaca" }}>
                      Tokens for Liquidity{" "}
                      <span style={{ float: "right" }}>
                        {(precision.remove(
                          presaleInfo.TOTAL_AMOUNT,
                          getNetwork().length > 0 && paytoken.length > 0
                            ? SaleTokenAddresses[getNetwork()[0]][paytoken]
                                .decimals
                            : 18
                        ) *
                          presaleInfo.LIQUIDITY_PERCENT *
                          (1000 - feeInfo.PINK_BASE_FEE)) /
                          (1000 * 1000)}{" "}
                        {tokenInfo[2]}
                      </span>
                    </p>
                  )}
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Soft Cap{" "}
                    <span style={{ float: "right" }}>
                      {softcap} {String(paytoken).toUpperCase()}
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Presale Start Time{" "}
                    <span style={{ float: "right" }}>{startICO} (UTC)</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Presale End Time{" "}
                    <span style={{ float: "right" }}>{endICO} (UTC)</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Listing On <span style={{ float: "right" }}>Uniswap</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Liquidity Percent{" "}
                    <span style={{ float: "right" }}>
                      {presaleInfo.LIQUIDITY_PERCENT / 10} %
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Liquidity Lockup Time{" "}
                    <span style={{ float: "right" }}>
                      {presaleInfo.LOCK_PERIOD / 60} minutes after pool ends
                    </span>
                  </p>
                </div>
              </div>
            </Row>
            <Row style={{ marginTop: 40 }}>
              <div style={{ background: "#fff", padding: 20 }}>
                <div
                  className="header"
                  style={{
                    fontSize: 20,
                    borderBottom: "1px solid",
                    paddingBottom: 10,
                  }}
                >
                  Token Metrics
                </div>
                <div>
                  <Doughnut data={data} height={100} />
                </div>
              </div>
            </Row>
          </Col>
          <Col md={4} style={{ padding: 15 }}>
            <div style={{ background: "#fff", padding: 20 }}>
              <div className="clock">
                <div className="mt-4" style={{ backgroundSize: "cover" }}>
                  <div style={{ backgroundSize: "cover" }}>Presale Ends In</div>
                  <div
                    className="de_countdown is-countdown px-4 py-2 position-static d-inline-block"
                    style={{ backgroundSize: "cover" }}
                  >
                    <span className="countdown-row countdown-show4">
                      <span className="countdown-section">
                        {days.toString().length < 2 ? "0" + days : days}
                      </span>
                      <span className="countdown-section">
                        {hours.toString().length < 2 ? "0" + hours : hours}
                      </span>
                      <span className="countdown-section">
                        {minutes.toString().length < 2
                          ? "0" + minutes
                          : minutes}
                      </span>
                      <span className="countdown-section">
                        {seconds.toString().length < 2
                          ? "0" + seconds
                          : seconds}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {endTime + presaleInfo.LOCK_PERIOD * 60 >=
              new Date().getTime() / 1000 ? (
                <>
                  <div className="processbar">
                    <Progress
                      color="success"
                      value={(weiRaised * 100) / softcap}
                    >
                      {((weiRaised * 100) / softcap).toFixed(2)}%
                    </Progress>
                    <div style={{ fontSize: 11 }}>
                      0 {String(paytoken).toUpperCase()}{" "}
                      <span style={{ float: "right" }}>
                        {softcap} {String(paytoken).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {status.FORCE_FAILED && (
                    <div className="emergency">
                      <Button
                        color="primary"
                        style={{ marginTop: 15, marginBottom: 15 }}
                        onClick={handleRefund}
                      >
                        {"Withdraw Token"}
                      </Button>
                    </div>
                  )}
                  {!status.LP_GENERATION_COMPLETE && !status.FORCE_FAILED && (
                    <div className="buytoken">
                      <Input
                        onKeyDown={(e) => handleKeyDown(e, e.target.value)}
                        style={{ width: "90%" }}
                        name="tokenamount"
                        placeholder="100"
                        autoComplete="on"
                        value={tokenAmount}
                        onChange={(e) => setTokenAmount(e.target.value)}
                      />
                      <Button
                        color="primary"
                        style={{ marginTop: 15, marginBottom: 15 }}
                        onClick={handleBuyToken}
                        disabled={tokenAmount === 0 || tokenAmount.length === 0}
                      >
                        {buyBtntext}
                      </Button>
                    </div>
                  )}
                  <br />
                  {myPurchase > 0 &&
                    !status.LP_GENERATION_COMPLETE &&
                    !status.FORCE_FAILED && (
                      <div className="emergency">
                        <Button
                          color="primary"
                          style={{ marginTop: 15, marginBottom: 15 }}
                          onClick={handleEmergencyClaim}
                        >
                          {refundBtxtext}
                        </Button>
                      </div>
                    )}
                </>
              ) : (
                <>
                  <div className="emergency">
                    <Button
                      color="primary"
                      style={{ marginTop: 15, marginBottom: 15 }}
                      onClick={handleClaim}
                    >
                      {claimBtn}
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div
              style={{
                background: "#fff",
                padding: 20,
                marginTop: 30,
                marginBottom: 20,
              }}
            >
              <p style={{ borderBottom: "1px solid #cbcaca" }}>
                Status{" "}
                <span style={{ float: "right" }}>
                  {endTime > new Date().getTime() / 1000 &&
                  startdate < new Date().getTime() / 1000
                    ? "in process"
                    : startdate > new Date().getTime() / 1000
                    ? "upcoming"
                    : "ended"}
                </span>
              </p>
              <p>
                You Purchase{" "}
                <span style={{ float: "right" }}>
                  {myPurchase} {String(paytoken).toUpperCase()}
                </span>
              </p>
            </div>
            {window.userAddress === ownerAddress &&
              !status.LP_GENERATION_COMPLETE &&
              !status.FORCE_FAILED && (
                <div
                  style={{
                    background: "#fff",
                    padding: 20,
                    marginTop: 30,
                    marginBottom: 20,
                  }}
                >
                  <div
                    className="header"
                    style={{
                      fontSize: 20,
                      borderBottom: "1px solid",
                      paddingBottom: 10,
                    }}
                  >
                    Owner Zone
                  </div>
                  <div className="zonebody">
                    <div className="feeoption">
                      <div>
                        Pool Fee: {feeInfo.PINK_BASE_FEE / 10} %{" "}
                        {String(paytoken).toUpperCase()} raised +{" "}
                        {feeInfo.PINK_TOKEN_FEE / 10} % {tokenInfo[2]} raised
                      </div>
                    </div>
                    <div className="controlpool">
                      <Button
                        color="primary"
                        onClick={handleFinalizePool}
                        disabled={finalizeFlg || cancelFlg}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          marginBottom: 10,
                        }}
                      >
                        Finalize pool{" "}
                        <span style={{ marginLeft: 10 }}>
                          <TailSpin
                            radius="1"
                            width={20}
                            height={20}
                            color="#000000"
                            visible={finalizeFlg}
                          />
                        </span>
                      </Button>
                      <Button
                        color="primary"
                        onClick={handleCancelPool}
                        disabled={finalizeFlg || cancelFlg}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        Cancel pool{" "}
                        <span style={{ marginLeft: 10 }}>
                          <TailSpin
                            radius="1"
                            width={20}
                            height={20}
                            color="#000000"
                            visible={cancelFlg}
                          />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default FairlaunchDetail;
