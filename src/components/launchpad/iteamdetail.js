import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { FaKey, FaEdit } from "react-icons/fa";
import { GoPrimitiveDot, GoLock } from "react-icons/go";
import { Progress, Input, Button, FormGroup, Label } from "reactstrap";
import { TailSpin } from "react-loader-spinner";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import * as PresaleABI from "../../Utils/ABIs/presaleAbi.json";
import * as ERC20ABI from "../../Utils/ABIs/erc20Abi.json";
import { precision } from "../../Utils/precision";
import { SaleTokenAddresses } from "../../Utils/config";
import WhiteListModal from "./launchpadComponent/whiteListModal";
import { getNetwork } from "../../Utils/initialFunctions";
const Itemdetail = () => {
  const { address } = useParams();
  const [paytoken, setPaytoken] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenDecimals, setTokendecimals] = useState("");
  const [tokenSymbol, setTokensymbol] = useState("");
  const [tokenSupply, setTokensupply] = useState(0);
  const [presaleSupply, setPresaleSupply] = useState(0);
  const [liquidity, setLiquidity] = useState(0);
  const [presaleRate, setPresalerate] = useState(0);
  const [rate, setRate] = useState(0);
  const [softcap, setSoftcap] = useState(0);
  const [hardcap, setHardcap] = useState(0);
  const [refundType, setRefundtype] = useState(false);
  const [startICO, setStartICO] = useState(null);
  const [endICO, setEndICO] = useState(null);
  const [liqPercent, setLiqPro] = useState(0);
  const [liqLock, setLiqlock] = useState(0);
  const [weiRaised, setWeiraised] = useState(0);
  const [iswhitelist, setIswhitelist] = useState(false);
  const [maxPurchase, setMaxpurchase] = useState(0);
  const [myPurchase, setMypurchase] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [endTime, setEndtime] = useState(1663997472);
  const [startdate, setStartdate] = useState();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState({});
  const [buyBtntext, setBuybtntext] = useState(`Buy with BNB`);
  const [refundBtxtext, setRefundbtntext] = useState("Emergency Withdraw");
  const [claimBtn, setClaimbtn] = useState("Claim");
  const [openModal, setOpenModal] = useState(false);
  const [addList, setAddlist] = useState(false);
  const [addwhitelistFlag, setAddwhitelistflg] = useState(false);
  const [removewhitelistFlag, setRemovewhitelistflg] = useState(false);
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
        window.presaleContract = new window.web3.eth.Contract(
          PresaleABI.default,
          address,
          { from: window.userAddress }
        );
        const tokenAddressCall = window.presaleContract.methods
          .S_TOKEN()
          .call();
        const ownerCall = window.presaleContract.methods.PRESALE_OWNER().call();
        const payTokenCall = window.presaleContract.methods.B_TOKEN().call();
        const presaleinfoCall = window.presaleContract.methods
          .PRESALE_INFO()
          .call();
        const refundTypeCall = window.presaleContract.methods
          .returnType()
          .call();
        const statusCall = window.presaleContract.methods.STATUS().call();
        const factoryAddressCall = window.presaleContract.methods
          .PRESALE_GENERATOR()
          .call();
        const myInfoCall = window.presaleContract.methods
          .BUYERS(window.userAddress)
          .call();

        const infos = await Promise.all([
          tokenAddressCall, //0
          payTokenCall, //1
          presaleinfoCall, //2
          refundTypeCall, //3
          statusCall, //4
          factoryAddressCall, //5
          myInfoCall, //6
          ownerCall, //7
        ]);
        setStatus(infos[4]);
        setTokenAddress(infos[0]);
        window.tokenContract = new window.web3.eth.Contract(
          ERC20ABI.default,
          infos[0],
          { from: window.userAddress }
        );
        const tokenNameCall = window.tokenContract.methods.name().call();
        const tokenSupplyCall = window.tokenContract.methods
          .totalSupply()
          .call();
        const tokenSymbolCall = window.tokenContract.methods.symbol().call();
        const tokenDecimalCall = window.tokenContract.methods.decimals().call();
        const tokenInfo = await Promise.all([
          tokenNameCall,
          tokenSupplyCall,
          tokenSymbolCall,
          tokenDecimalCall,
        ]);
        if (getNetwork().length > 0) {
          setPaytoken(findPayToken(infos[1])[0]);
          setBuybtntext(
            `Buy with ${String(findPayToken(infos[1])).toUpperCase()}`
          );
          setPresaleSupply(
            precision.remove(
              infos[2].HARDCAP,
              SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                .decimals
            ) /
              precision.remove(
                infos[2].TOKEN_PRICE,
                SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                  .decimals
              )
          );
          setPresalerate(
            precision.remove(
              infos[2].TOKEN_PRICE,
              SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                .decimals
            )
          );
          setRate(
            precision.remove(
              infos[2].LISTING_RATE,
              SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                .decimals
            )
          );
          setSoftcap(
            precision.remove(
              infos[2].SOFTCAP,
              SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                .decimals
            )
          );
          setHardcap(
            precision.remove(
              infos[2].HARDCAP,
              SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                .decimals
            )
          );
          setWeiraised(
            precision.remove(
              infos[4].TOTAL_BASE_COLLECTED,
              SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                .decimals
            ) -
              precision.remove(
                infos[4].TOTAL_BASE_WITHDRAWN,
                SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                  .decimals
              )
          );
          setMaxpurchase(
            precision.remove(
              infos[2].MAX_SPEND_PER_BUYER,
              SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                .decimals
            )
          );
          setMypurchase(
            precision.remove(
              infos[6].baseDeposited,
              SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                .decimals
            )
          );
        }
        setTokenName(tokenInfo[0]);
        setTokensupply(precision.remove(tokenInfo[1], Number(tokenInfo[3])));
        setTokensymbol(tokenInfo[2]);
        setTokendecimals(tokenInfo[3]);

        setLiquidity((precision.remove(
          infos[2].HARDCAP,
          SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
            .decimals
        ) *
          infos[2].LIQUIDITY_PERCENT) /
          (precision.remove(
            infos[2].LISTING_RATE,
            SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
              .decimals
          ) *
            1000));

        setRefundtype(infos[3]);
        var startDate = new Date(Number(infos[2].START_BLOCK) * 1000);
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
        var endDate = new Date(Number(infos[2].END_BLOCK) * 1000);
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
        setLiqPro(Number(infos[2].LIQUIDITY_PERCENT) / 10);
        setLiqlock(Number(infos[2].LOCK_PERIOD) / 60);

        setIswhitelist(infos[4].WHITELIST_ONLY);
        setOwner(infos[7]);
        setDATA({
          labels: ["Presale", "Liquidity", "Unlocked"],
          datasets: [
            {
              label: "# of Votes",
              data: [
                precision.remove(
                  infos[2].HARDCAP,
                  SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                    .decimals
                ) /
                  precision.remove(
                    infos[2].TOKEN_PRICE,
                    SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                      .decimals
                  ),
                (precision.remove(
                  infos[2].HARDCAP,
                  SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                    .decimals
                ) *
                  infos[2].LIQUIDITY_PERCENT) /
                  (precision.remove(
                    infos[2].LISTING_RATE,
                    SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                      .decimals
                  ) *
                    1000),
                precision.remove(tokenInfo[1], Number(tokenInfo[3])) -
                  precision.remove(
                    infos[2].HARDCAP,
                    SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                      .decimals
                  ) /
                    precision.remove(
                      infos[2].TOKEN_PRICE,
                      SaleTokenAddresses[getNetwork()[0]][
                        findPayToken(infos[1])
                      ].decimals
                    ) -
                  (precision.remove(
                    infos[2].HARDCAP,
                    SaleTokenAddresses[getNetwork()[0]][findPayToken(infos[1])]
                      .decimals
                  ) *
                    infos[2].LIQUIDITY_PERCENT) /
                    (precision.remove(
                      infos[2].LISTING_RATE,
                      SaleTokenAddresses[getNetwork()[0]][
                        findPayToken(infos[1])
                      ].decimals
                    ) *
                      1000),
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
        data: [100, 1000, 10000],
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
    await window.presaleContract.methods
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
        const myPurchaseCall = await window.presaleContract.methods
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
    await window.presaleContract.methods
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
    await window.presaleContract.methods
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
    await window.presaleContract.methods
      .userWithdrawTokens()
      .send()
      .on("transactionHash", async () => {
        setClaimbtn("Claiming...");
      })
      .on("receipt", async () => {
        setClaimbtn("Claim");
      });
  };
  const handleWhitelistflg = async (val) => {
    await window.presaleContract.methods
      .setWhitelistFlag(val)
      .send()
      .on("receipt", async () => {
        setIswhitelist(val);
      });
  };
  const handleWhitelist = async (list, flag) => {
    setOpenModal(false);
    let whitelist = list.split("\n");
    let notAdddresses = [];
    let newAddresses = [];
    for (let address of whitelist) {
      if (!window.web3.utils.isAddress(address)) {
        notAdddresses.push(address);
      } else {
        newAddresses.push(address);
      }
    }
    if (newAddresses.length > 0) {
      await window.presaleContract.methods
        .editWhitelist(newAddresses, flag)
        .send()
        .on("transactionHash", async () => {
          if (flag) setAddwhitelistflg(true);
          else setRemovewhitelistflg(true);
        })
        .on("receipt", async () => {
          if (flag) {
            setAddwhitelistflg(false);
            setAddlist(false);
          } else {
            setRemovewhitelistflg(false);
          }
        });
    }
  };
  const handleFinalizePool = async () => {
    await window.presaleContract.methods
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
    await window.presaleContract.methods
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
                      <div className="title">{tokenName} Presale</div>
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
                    {/* <div className="socialIcons">
                      {website && (
                        <a
                          href={website}
                          className="socialIcon"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <TiWorld />
                        </a>
                      )}
                      {facebook && (
                        <a
                          href={facebook}
                          className="socialIcon"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <TiSocialFacebookCircular />
                        </a>
                      )}
                      {twitter && (
                        <a
                          href={twitter}
                          className="socialIcon"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FiTwitter />
                        </a>
                      )}
                      {github && (
                        <a
                          href={github}
                          className="socialIcon"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FiGithub />
                        </a>
                      )}
                      {telegram && (
                        <a
                          href={telegram}
                          className="socialIcon"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaTelegramPlane />
                        </a>
                      )}
                      {instagram && (
                        <a
                          href={instagram}
                          className="socialIcon"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaInstagram />
                        </a>
                      )}
                      {discord && (
                        <a
                          href={discord}
                          className="socialIcon"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaDiscord />
                        </a>
                      )}
                      {reddit && (
                        <a
                          href={reddit}
                          className="socialIcon"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaReddit />
                        </a>
                      )}
                      {youtube && (
                        <a
                          href={youtube}
                          className="socialIcon"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaYoutube />
                        </a>
                      )}
                    </div>
                    <div className="description">
                      {description && <p>{description}</p>}
                    </div> */}
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
                    <span style={{ float: "right" }}>{tokenName}</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Token symbol{" "}
                    <span style={{ float: "right" }}>{tokenSymbol}</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Token decimals{" "}
                    <span style={{ float: "right" }}>{tokenDecimals}</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Token Address{" "}
                    <span style={{ float: "right" }}>
                      <a
                        href={`https://testnet.bscscan.com/address/${tokenAddress}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {tokenAddress}
                      </a>
                      {/* <p style={{textAlign:'right'}}>(Do not send {String(paytoken).toUpperCase()} to the token address!)</p> */}
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Total Supply{" "}
                    <span style={{ float: "right" }}>
                      {tokenSupply} {tokenSymbol}
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Tokens for Presale{" "}
                    <span style={{ float: "right" }}>
                      {presaleSupply} {tokenSymbol}
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Tokens for Liquidity{" "}
                    <span style={{ float: "right" }}>
                      {liquidity} {tokenSymbol}
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Presale Rate{" "}
                    <span style={{ float: "right" }}>
                      1 {tokenSymbol} = {presaleRate}{" "}
                      {String(paytoken).toUpperCase()}
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Listing Rate{" "}
                    <span style={{ float: "right" }}>
                      1 {tokenSymbol} = {rate} {String(paytoken).toUpperCase()}
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Initial Market Cap (estimate){" "}
                    <span style={{ float: "right" }}>$299,067</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Soft Cap{" "}
                    <span style={{ float: "right" }}>
                      {softcap} {String(paytoken).toUpperCase()}
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Hard Cap{" "}
                    <span style={{ float: "right" }}>
                      {hardcap} {String(paytoken).toUpperCase()}
                    </span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Unsold Tokens{" "}
                    <span style={{ float: "right" }}>
                      {refundType ? "Refund" : "Burn"}
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
                    <span style={{ float: "right" }}>{liqPercent} %</span>
                  </p>
                  <p style={{ borderBottom: "1px solid #cbcaca" }}>
                    Liquidity Lockup Time{" "}
                    <span style={{ float: "right" }}>
                      {liqLock} minutes after pool ends
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
              {endTime + liqLock * 60 >= new Date().getTime() / 1000 ? (
                <>
                  <div className="processbar">
                    <Progress
                      color="success"
                      value={(weiRaised * 100) / hardcap}
                    >
                      {((weiRaised * 100) / hardcap).toFixed(2)}%
                    </Progress>
                    <div style={{ fontSize: 11 }}>
                      0 {String(paytoken).toUpperCase()}{" "}
                      <span style={{ float: "right" }}>
                        {hardcap} {String(paytoken).toUpperCase()}
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
              <p style={{ borderBottom: "1px solid #cbcaca" }}>
                Sale Type{" "}
                <span style={{ float: "right" }}>
                  {iswhitelist ? "whitelist only" : "public"}
                </span>
              </p>
              <p>
                Maximum Buy{" "}
                <span style={{ float: "right" }}>
                  {maxPurchase} {String(paytoken).toUpperCase()}
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
                    <div className="saletype">
                      <FormGroup check style={{ marginRight: 20 }}>
                        <Label check>
                          {" "}
                          <Input
                            type="radio"
                            name="whitelist"
                            value={"false"}
                            onChange={() => handleWhitelistflg(false)}
                            checked={iswhitelist === false}
                          />{" "}
                          Public
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="whitelist"
                            value={"true"}
                            onChange={() => handleWhitelistflg(true)}
                            checked={iswhitelist}
                          />{" "}
                          Whitelist
                        </Label>
                      </FormGroup>
                    </div>
                    {iswhitelist && (
                      <div className="whitelistbuttons">
                        <Button
                          color="info"
                          style={{
                            marginBottom: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            setOpenModal(true);
                            setAddlist(true);
                          }}
                          disabled={addwhitelistFlag || removewhitelistFlag}
                        >
                          Add whitelist
                          <span style={{ marginLeft: 10 }}>
                            <TailSpin
                              radius="1"
                              width={20}
                              height={20}
                              color="#000000"
                              visible={addwhitelistFlag}
                            />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          style={{
                            marginBottom: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            setOpenModal(true);
                            setAddlist(false);
                          }}
                          disabled={addwhitelistFlag || removewhitelistFlag}
                        >
                          Remove whitelist{" "}
                          <span style={{ marginLeft: 10 }}>
                            <TailSpin
                              radius="1"
                              width={20}
                              height={20}
                              color="#000000"
                              visible={removewhitelistFlag}
                            />
                          </span>
                        </Button>
                      </div>
                    )}
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
      <WhiteListModal
        isOpen={openModal}
        isAddList={addList}
        onCloseModal={() => setOpenModal(false)}
        onChangeList={handleWhitelist}
      />
    </Fragment>
  );
};

export default Itemdetail;
