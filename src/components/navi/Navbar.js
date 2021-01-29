import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { bindActionCreators } from "redux";
import * as searchAction from "../../redux/actions/searchAction";
import Search from "./Search";
import { connect } from "react-redux";
import "./togglebgcolor.scss";
const changebackground = (e) => {
  if (e.target.checked) {
    document.body.style.background = "#ededed";
  } else {
    document.body.style.background = "#121212";
  }
};

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="span">{item.title}</span>
                  </Link>
                </li>
              );
            })}

            <input
              className="checkbox"
              id="checkbox"
              type="checkbox"
              onChange={(e) => changebackground(e)}
            />
            <label className="toggle" htmlFor="checkbox">
              <i className="star"></i>
              <i className="star"></i>
              <i className="star"></i>
              <i className="star"></i>
              <i className="star"></i>
              <i className="star"></i>
              <i className="star"></i>
              <span className="disc">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span className="cloud">
                <i className="cloud__sub1"></i>
                <i className="cloud__sub2"></i>
              </span>
            </label>
          </ul>
        </nav>
      </IconContext.Provider>
      <Search></Search>
    </>
  );
}
function mapStateToProps(state) {
  return {
    search: state.searchReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getSearch: bindActionCreators(searchAction.getSearch, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
