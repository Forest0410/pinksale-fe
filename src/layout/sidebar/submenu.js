import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <Fragment>
      {item.path ? (
        <Link className="SidebarLink" to={item.path}>
          <div>
            {<item.icon />}
            <span className="SidebarLabel">{item.title}</span>
          </div>
        </Link>
      ) : (
        <div className="SidebarLink" onClick={showSubnav}>
          <div>
            {<item.icon />}
            <span className="SidebarLabel">{item.title}</span>
          </div>
          <div>
            {item.subNav && subnav ? (
              <item.iconOpened color="#000"/>
            ) : item.subNav ? (
              <item.iconClosed color="#000"/>
            ) : null}
          </div>
        </div>
      )}
      {subnav &&
        item.subNav.map((subItem, index) => {
          return (
            <Link className="DropdownLink" to={subItem.path} key={index}>
              <span className="SidebarLabel">{subItem.title}</span>
            </Link>
          );
        })}
    </Fragment>
  );
};
export default SubMenu;
