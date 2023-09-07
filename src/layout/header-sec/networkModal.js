import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { Networks } from "../../Utils/network";
const SwitchNetworkModal = (props) => {
  const [mainNET, setMainnet] = useState([]);
  const [testNET, setTestnet] = useState([]);
  useEffect(() => {
    setMainnet(
      Object.keys(Networks).filter((key) => {
        return !key.includes("TESTNET");
      })
    );
    setTestnet(
      Object.keys(Networks).filter((key) => {
        return key.includes("TESTNET");
      })
    );
  }, []);
  const changeNetwork = async (network) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: network.hexValue }], //AVAX: '0xa86a', Kovan 0x2A
      });
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: network.Name,
              chainId: network.hexValue,
              nativeCurrency: {
                name: network.tokenName,
                decimals: network.tokenDecimals,
                symbol: network.tokenSymbol,
              },
              rpcUrls: [network.rpcUrl],
            },
          ],
        });
      }
    }
  };
  return (
    <Modal isOpen={props.isOpen} toggle={props.onCloseModal}>
      <ModalHeader toggle={props.onCloseModal}>Choose network</ModalHeader>
      <ModalBody>
        <Row>
          {mainNET.map((item) => (
            <Col
              sm={6}
              key={item}
              className="networkbtngrid"
              onClick={() => changeNetwork(Networks[item])}
            >
              <div className="networkbutton">
                <img
                  src={Networks[item]?.logo}
                  alt="chain logo"
                  width={40}
                  style={{ marginBottom: 5 }}
                />
                <div>{Networks[item].Name}</div>
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{ paddingLeft: 20, fontWeight: 500 }}>TESTNET</Row>
        <Row>
          {testNET.map((key) => (
            <Col
              sm={6}
              key={key}
              className="networkbtngrid"
              onClick={() => changeNetwork(Networks[key])}
            >
              <div className="networkbutton">
                <img
                  src={Networks[key].logo}
                  alt="chain logo"
                  width={40}
                  style={{ marginBottom: 5 }}
                />
                <div>{Networks[key].Name}</div>
              </div>
            </Col>
          ))}
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default React.memo(SwitchNetworkModal);
