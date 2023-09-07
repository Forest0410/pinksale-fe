import React, { Fragment, useEffect, useState } from "react";
import { Progress, Button } from "reactstrap";

import * as PresaleABI from "../../Utils/ABIs/presaleAbi.json";
import * as FairLaunchABI from "../../Utils/ABIs/fairlaunchABI.json";
import * as AuctionABI from "../../Utils/ABIs/auctionABI.json";
import * as ERC20ABI from "../../Utils/ABIs/erc20Abi.json";
import * as DefaultLaunchpadabi from "../../Utils/ABIs/defaultlaunchpadABI.json";
import { precision } from "../../Utils/precision";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { SaleTokenAddresses } from "../../Utils/config";
import {
  findCurrency,
  findPresaleAddress,
  getNetwork,
} from "../../Utils/initialFunctions";

const LaunchPad = () => {
  const [presaleContractinfos, setPresaleContractInfo] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      const presaleList = await window.PresaleFactoryContract.methods
        .PresaleList()
        .call();
      let queryList = [];
      for (let i = 0; i < presaleList.length; i++) {
        let contract = new window.web3.eth.Contract(
          DefaultLaunchpadabi.default,
          presaleList[i],
          { from: window.userAddress }
        );
        const PresaleGenerator = await contract.methods
          .PRESALE_GENERATOR()
          .call();
        if (
          findPresaleAddress(PresaleGenerator) === "PreSaleGeneratorAddress"
        ) {
          contract = new window.web3.eth.Contract(
            PresaleABI.default,
            presaleList[i],
            { from: window.userAddress }
          );
          const PresaleInfoCall = contract.methods.PRESALE_INFO().call();
          const PresaleStatusCall = contract.methods.STATUS().call();
          const paytokenCall = contract.methods.B_TOKEN().call();
          const contractAddressCall = contract.methods.S_TOKEN().call();
          const infos = await Promise.all([
            PresaleInfoCall,
            contractAddressCall,
            PresaleStatusCall,
            paytokenCall,
          ]);
          const tokenContract = new window.web3.eth.Contract(
            ERC20ABI.default,
            infos[1],
            { from: window.userAddress }
          );
          const tokenName = tokenContract.methods.name().call();
          const tokenSymbol = tokenContract.methods.symbol().call();
          const tokenDecimalCall = tokenContract.methods.decimals().call();
          const tokenInfo = await Promise.all([
            tokenName,
            tokenSymbol,
            tokenDecimalCall,
          ]);
          queryList.push({
            fairlaunch: false,
            address: presaleList[i],
            tokenname: tokenInfo[0],
            tokenSymbol: tokenInfo[1],
            presaleRate: precision.remove(
              infos[0].TOKEN_PRICE,
              SaleTokenAddresses[getNetwork()[0]][findCurrency(infos[3])]
                .decimals
            ),
            softCap: precision.remove(
              infos[0].SOFTCAP,
              SaleTokenAddresses[getNetwork()[0]][findCurrency(infos[3])]
                .decimals
            ),
            hardCap: precision.remove(
              infos[0].HARDCAP,
              SaleTokenAddresses[getNetwork()[0]][findCurrency(infos[3])]
                .decimals
            ),
            liquidity: Number(infos[0].LIQUIDITY_PERCENT) / 10,
            liqlock: Number(infos[0].LOCK_PERIOD) / 60,
            status: infos[2],
            paytoken: findCurrency(infos[3]),
            startTime: Number(infos[0].START_BLOCK),
            endTime: Number(infos[0].END_BLOCK),
          });
        } else if (
          findPresaleAddress(PresaleGenerator) === "FairLaunchGeneratorAddress"
        ) {
          contract = new window.web3.eth.Contract(
            FairLaunchABI.default,
            presaleList[i],
            { from: window.userAddress }
          );
          const PresaleInfoCall = contract.methods.PRESALE_INFO().call();
          const PresaleStatusCall = contract.methods.STATUS().call();
          const infos = await Promise.all([PresaleInfoCall, PresaleStatusCall]);
          const tokenContract = new window.web3.eth.Contract(
            ERC20ABI.default,
            infos[0].S_TOKEN,
            { from: window.userAddress }
          );
          const tokenName = tokenContract.methods.name().call();
          const tokenSymbol = tokenContract.methods.symbol().call();
          const tokenDecimalCall = tokenContract.methods.decimals().call();
          const tokenInfo = await Promise.all([
            tokenName,
            tokenSymbol,
            tokenDecimalCall,
          ]);
          queryList.push({
            fairlaunch: true,
            address: presaleList[i],
            tokenname: tokenInfo[0],
            tokenSymbol: tokenInfo[1],
            softCap: precision.remove(
              infos[0].SOFTCAP,
              SaleTokenAddresses[getNetwork()[0]][
                findCurrency(infos[0].B_TOKEN)
              ].decimals
            ),
            liquidity: Number(infos[0].LIQUIDITY_PERCENT) / 10,
            liqlock: Number(infos[0].LOCK_PERIOD) / 60,
            status: infos[1],
            paytoken: findCurrency(infos[0].B_TOKEN),
            startTime: Number(infos[0].START_BLOCK),
            endTime: Number(infos[0].END_BLOCK),
          });
        } else if (
          findPresaleAddress(PresaleGenerator) === "AuctionGeneratorAddress"
        ) {
          contract = new window.web3.eth.Contract(
            AuctionABI.default,
            presaleList[i],
            { from: window.userAddress }
          );
          const PresaleInfoCall = contract.methods.PRESALE_INFO().call();
          const PresaleStatusCall = contract.methods.STATUS().call();
          const paytokenCall = contract.methods.B_TOKEN().call();
          const contractAddressCall = contract.methods.S_TOKEN().call();
          const priceCall = contract.methods.getPrice().call();
          const infos = await Promise.all([
            PresaleInfoCall,
            contractAddressCall,
            PresaleStatusCall,
            paytokenCall,
            priceCall,
          ]);
          const tokenContract = new window.web3.eth.Contract(
            ERC20ABI.default,
            infos[1],
            { from: window.userAddress }
          );
          const tokenName = tokenContract.methods.name().call();
          const tokenSymbol = tokenContract.methods.symbol().call();
          const tokenDecimalCall = tokenContract.methods.decimals().call();
          const tokenInfo = await Promise.all([
            tokenName,
            tokenSymbol,
            tokenDecimalCall,
          ]);
          queryList.push({
            fairlaunch: false,
            auction: true,
            address: presaleList[i],
            tokenname: tokenInfo[0],
            tokenSymbol: tokenInfo[1],
            presaleRate: precision.remove(
              infos[4],
              SaleTokenAddresses[getNetwork()[0]][findCurrency(infos[3])]
                .decimals
            ),
            softCap: precision.remove(
              infos[0].SOFTCAP,
              SaleTokenAddresses[getNetwork()[0]][findCurrency(infos[3])]
                .decimals
            ),
            hardCap: precision.remove(
              infos[0].HARDCAP,
              SaleTokenAddresses[getNetwork()[0]][findCurrency(infos[3])]
                .decimals
            ),
            liquidity: Number(infos[0].LIQUIDITY_PERCENT) / 10,
            liqlock: Number(infos[0].LOCK_PERIOD) / 60,
            status: infos[2],
            paytoken: findCurrency(infos[3]),
            startTime: Number(infos[0].START_BLOCK),
            endTime: Number(infos[0].END_BLOCK),
          });
        }
      }
      setPresaleContractInfo(queryList);
    };
    initialize();
  }, []);
  const TokenCard = ({ tokenInfo }) => {
    const navigate = useNavigate();
    const [endTime, setEndtime] = useState(1663997472);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
      if (Number(tokenInfo.startTime) > new Date().getTime() / 1000)
        setEndtime(Number(tokenInfo.startTime));
      else if (Number(tokenInfo.endTime) > new Date().getTime() / 1000)
        setEndtime(Number(tokenInfo.endTime));
      else setEndtime(new Date().getTime() / 1000);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
        Math.floor((ts_diff - days * 60 * 60 * 24 - hours * 60 * 60) / 60) >=
          0 &&
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
    useEffect(() => {
      const timer = setTimeout(() => {
        calcTime();
      }, 1000);
      return () => clearTimeout(timer);
    });
    const handleClick = (fairlaunch, auction = false) => {
      if(auction) navigate(`/auction/${tokenInfo.address}`);
      else if (fairlaunch) navigate(`/fairlaunch/${tokenInfo.address}`);
      else navigate(`/launchpad/${tokenInfo.address}`);
    };
    return (
      <div className="cardBody">
        <div className="" style={{ display: "flex" }}>
          <div className="">
            <img
              className="logo"
              src={
                tokenInfo.logoLink ||
                "https://www.pinkswap.finance/pinkswap.png"
              }
              alt="tokenlogo"
            />
          </div>
          <div className="" style={{ marginLeft: "auto" }}>
            <div>
              <div
                className="status"
                style={
                  Number(tokenInfo.startTime) > new Date().getTime() / 1000
                    ? { backgroundColor: "#fdfaea", color: "#d29813" }
                    : Number(tokenInfo.endTime) > new Date().getTime() / 1000
                    ? {
                        backgroundColor: "#d1fae5",
                        color: "#10b981",
                      }
                    : { backgroundColor: "#ffeaef", color: "#ff3465" }
                }
              >
                {tokenInfo.status.FORCE_FAILED
                  ? "Canceled"
                  : Number(tokenInfo.startTime) > new Date().getTime() / 1000
                  ? "Upcoming"
                  : Number(tokenInfo.endTime) > new Date().getTime() / 1000
                  ? "Sale live"
                  : "Sale End"}
              </div>
            </div>
            {/* <div className="audit">
              <div className="safu">SAFU</div>
              <div className="audit">Audit</div>
              <div className="kyc">KYC</div>
            </div> */}
          </div>
        </div>
        <div>
          <div className="TokenName">{tokenInfo.tokenname}</div>
          {tokenInfo.fairlaunch === false ? (
            <div className="">
              1 {tokenInfo.tokenSymbol} = {tokenInfo.presaleRate}{" "}
              {String(tokenInfo?.paytoken).toUpperCase()}
            </div>
          ) : (
            <div style={{ fontWeight: "bold", color: "grey" }}>FairLaunch</div>
          )}
        </div>
        <div>
          {tokenInfo.fairlaunch === true ? (
            <div className="softcapTitle">Soft</div>
          ) : (
            <div className="softcapTitle">Soft/Hard</div>
          )}
          {tokenInfo.fairlaunch === true ? (
            <div className="softcapamount">
              {tokenInfo.softCap} {String(tokenInfo?.paytoken).toUpperCase()}
            </div>
          ) : (
            <div className="softcapamount">
              {tokenInfo.softCap} {String(tokenInfo?.paytoken).toUpperCase()} -{" "}
              {tokenInfo.hardCap} {String(tokenInfo?.paytoken).toUpperCase()}
            </div>
          )}
          <div className="processName">Progress (0.00%)</div>
          <div className="progressbar">
            {tokenInfo.fairlaunch ? (
              <Progress
                color="success"
                value={
                  ((precision.remove(
                    tokenInfo.status.TOTAL_BASE_COLLECTED,
                    SaleTokenAddresses[getNetwork()[0]][tokenInfo.paytoken]
                      .decimals
                  ) -
                    precision.remove(
                      tokenInfo.status.TOTAL_BASE_WITHDRAWN,
                      SaleTokenAddresses[getNetwork()[0]][tokenInfo.paytoken]
                        .decimals
                    )) *
                    100) /
                  tokenInfo.softCap
                }
              >
                {((precision.remove(
                  tokenInfo.status.TOTAL_BASE_COLLECTED,
                  SaleTokenAddresses[getNetwork()[0]][tokenInfo.paytoken]
                    .decimals
                ) -
                  precision.remove(
                    tokenInfo.status.TOTAL_BASE_WITHDRAWN,
                    SaleTokenAddresses[getNetwork()[0]][tokenInfo.paytoken]
                      .decimals
                  )) *
                  100) /
                  tokenInfo.softCap}
                %
              </Progress>
            ) : (
              <Progress
                color="success"
                value={
                  ((precision.remove(
                    tokenInfo.status.TOTAL_BASE_COLLECTED,
                    SaleTokenAddresses[getNetwork()[0]][tokenInfo.paytoken]
                      .decimals
                  ) -
                    precision.remove(
                      tokenInfo.status.TOTAL_BASE_WITHDRAWN,
                      SaleTokenAddresses[getNetwork()[0]][tokenInfo.paytoken]
                        .decimals
                    )) *
                    100) /
                  tokenInfo.hardCap
                }
              >
                {((precision.remove(
                  tokenInfo.status.TOTAL_BASE_COLLECTED,
                  SaleTokenAddresses[getNetwork()[0]][tokenInfo.paytoken]
                    .decimals
                ) -
                  precision.remove(
                    tokenInfo.status.TOTAL_BASE_WITHDRAWN,
                    SaleTokenAddresses[getNetwork()[0]][tokenInfo.paytoken]
                      .decimals
                  )) *
                  100) /
                  tokenInfo.hardCap}
                %
              </Progress>
            )}
            <div style={{ fontSize: 11 }}>
              0 {String(tokenInfo?.paytoken).toUpperCase()}{" "}
              <span style={{ float: "right" }}>
                {tokenInfo.fairlaunch ? tokenInfo.softCap : tokenInfo.hardCap}{" "}
                {String(tokenInfo?.paytoken).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="liquidity">
            <div className="liq">
              Liqudity %:{" "}
              <span style={{ float: "right" }}>{tokenInfo.liquidity} %</span>
            </div>
            <div className="liq">
              Lockup Time:{" "}
              <span style={{ float: "right" }}>{tokenInfo.liqlock} mins</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="menufooter">
          <div>
            {Number(tokenInfo.endTime) < new Date().getTime() / 1000 ? (
              <>
                <div>Presale: </div>
                <div>Ended</div>
              </>
            ) : (
              <>
                <div>
                  Sale{" "}
                  {Number(tokenInfo.startTime) < new Date().getTime() / 1000
                    ? "starts"
                    : "end"}{" "}
                  In:{" "}
                </div>
                <div>
                  {days}: {hours}: {minutes}: {seconds}
                </div>
              </>
            )}
          </div>
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <Button
              color="primary"
              onClick={() => handleClick(tokenInfo.fairlaunch, tokenInfo?.auction)}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <div className="launchpad container row">
        {presaleContractinfos.length === 0 && (
          <div style={{ alignSelf: "center" }}>
            <ThreeCircles wrapperStyle={{ justifyContent: "center" }} />
          </div>
        )}
        {presaleContractinfos.map((tokenInfo, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
            <TokenCard tokenInfo={tokenInfo} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default LaunchPad;
