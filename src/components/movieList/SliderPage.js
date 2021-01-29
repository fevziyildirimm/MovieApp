import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userAction from "../../redux/actions/userAction";
import { Button } from "reactstrap";
class SliderPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };
  async componentDidMount() {
    console.log(this.state);
    await this.props.actions.getUserDetail();
  }
  async yaz() {
    await this.props.actions.postUserRegister(this.state.name,this.state.email,this.state.password);
  }
  async login() {
    await this.props.actions.postUserLogin(this.state.email,this.state.password);
    //console.log("giriş yaptı");
  }
  myChangeHandler = async (event) => {
    const nam =await event.target.name;
    const val=await event.target.value;
    await this.setState({[nam]:val});
  };
  render() {
    return (
      <div>
        {this.props.userDetail.map((result) => (
          <h3>{result.name}</h3>
        ))}
        <div>
          <h3>{this.state.name}</h3>
          <input
            onChange={this.myChangeHandler}
            name="name"
            className="input"
          ></input>
        </div>
        <div>
          <h3>{this.state.email}</h3>
          <input
            onChange={this.myChangeHandler}
            name="email"
            className="input"
          ></input>
        </div>
        <div>
          <h3>{this.state.password}</h3>
          <input
            onChange={this.myChangeHandler}
            name="password"
            className="input"
          ></input>
        </div>
        <Button color="danger" onClick={() => this.yaz()}>
          {" "}
          kayıt
        </Button>
        <Button color="success" onClick={() => this.login()}>
          {" "}
          login
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetail: state.userDetailReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getUserDetail: bindActionCreators(userAction.getUserDetail, dispatch),
      postUserRegister: bindActionCreators(
        userAction.postUserRegister,
        dispatch
      ),
      postUserLogin: bindActionCreators(
        userAction.postUserLogin,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderPage);