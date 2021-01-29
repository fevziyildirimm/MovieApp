import React from "react";
import { connect } from "react-redux";
import {
  NavbarBrand,
  Navbar,
  Nav,
} from "reactstrap";
import { bindActionCreators } from "redux"
import * as searchAction from "../../redux/actions/searchAction"
import Search from "./Search";

class Navi extends React.Component {
  render() {
    return (
      <div>
          {/* Navbar primary */}
          <Navbar className="navbar-dark" expand="lg">
              <NavbarBrand href="/">
                Primary Color
              </NavbarBrand>
              
                <Nav className="ml-lg-auto" navbar>
                  
                  
                  <Search></Search>
                </Nav>
              
          </Navbar>
          </div>
    );
  }
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


export default connect(mapStateToProps,mapDispatchToProps)(Navi);