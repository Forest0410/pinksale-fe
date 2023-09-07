import React, { useState, Fragment } from "react";
import {MENUITEMS} from "./menu";
import SubMenu from "./submenu";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import Header from "../header-sec";
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Fragment>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="Nav">
          <Link className="NavIcon" to="#">
            <FaIcons.FaBars onClick={showSidebar} color="#000" />
          </Link>
          <Header />
        </nav>
        <div className="SidebarNav">
          <div className="SidebarWrap">
            {/* <Link className="NavIcon" to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} color="#000"/>
            </Link> */}
            {MENUITEMS.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </div>
      </IconContext.Provider>
    </Fragment>
  );
};
export default Sidebar;
