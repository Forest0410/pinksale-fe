import React from "react";
import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// ----- components import -----
import Home from "./components/home";
import CreateLaunchpad from "./components/launchpad/launchpad";
import Itemdetail from "./components/launchpad/iteamdetail";
import CreateAuction from "./components/launchpad/auctioncreate";
import LaunchPad from "./components/launchpad/launchpadList";
import CreateFairLaunch from "./components/launchpad/fairlaunch";
import FairlaunchDetail from "./components/launchpad/fairlaunchdetail";
import AuctionDetail from "./components/launchpad/auctiondetail";
// ----- layout import -----
import Loader from "./layout/loader";
import ScrollToTop from "./layout/scroll-to-top";
import Sidebar from "./layout/sidebar";
import "react-datepicker/dist/react-datepicker.css";
import { Web3ContextProvider } from "./context/Web3Context";
const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Web3ContextProvider>
        <Loader />
        <ScrollToTop />
        <Sidebar />
        <div className="page-body-wrapper">
          <Routes>
              <Route path="" element={<Home />} />
              <Route path="/launchpad/create" element={<CreateLaunchpad />} />
              <Route path="/launchpad/:address" element={<Itemdetail />} />
              <Route path="/fairlaunch/:address" element={<FairlaunchDetail />} />
              <Route path="/auction/:address" element={<AuctionDetail />} />
              <Route path="/fairlaunch/create" element={<CreateFairLaunch />} />
              <Route path="/dutch-auction/create" element={<CreateAuction />} />
              <Route path="/launchpads" element={<LaunchPad />} />
            </Routes>
        </div>
      </Web3ContextProvider>
    </BrowserRouter>
  );
};

export default App;
