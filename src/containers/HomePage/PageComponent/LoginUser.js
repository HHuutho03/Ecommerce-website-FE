import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import { push } from "connected-react-router";

import TabHeader from "../Section/TabHeader";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import cat3 from "../images/img-login.svg";

import { handleLoginApi } from "../../../services/userService";

class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      showPassword: false,
      errMessage: "",
    };
  }

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["email", "password", "firstName", "lastName"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required " + arrCheck[i]);
      }
    }
    return isValid;
  };

  handleOnChangeUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.email, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        if (data.user.roleId) {
          this.props.LoginSuccess(data.user);
          this.props.history.push(`/home`);
        }
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
    console.log(this.state.showPassword);
  };
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleLogin();
    }
  }

  handleOnChange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {}
    );
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phonenumber: this.state.phoneNumber,
      avatar: this.state.avatar,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnclickRegister = (e) => {
    let loginIn = document.getElementById("sign-in");
    let loginUp = document.getElementById("login-up");
    loginIn.classList.remove("block");
    loginUp.classList.remove("none");

    // Add classes

    loginUp.classList.toggle("block");
  };
  handleOnclickLogin = (e) => {
    let loginIn = document.getElementById("sign-in");
    let loginUp = document.getElementById("login-up");
    loginIn.classList.remove("none");
    loginUp.classList.remove("block");

    // Add classes
    loginIn.classList.toggle("block");
    loginUp.classList.toggle("none");
  };
  componentDidMount() {}

  render() {
    return (
      <div className="section-content padding-y" style={{minHeight:"84vh"}}>
      <TabHeader />
      <div class="card mx-auto" style={{ maxWidth: '380px', marginTop: '100px'}}>
        <div class="card-body">
          
          <div class="login__forms">
            <form action="#" class="login__registre" id="login-in">
              <h1 class="card-title mb-4">Đăng nhập</h1>

              <div class="form-group">
                <i class="bx bx-user login__icon"></i>
                <input
                  type="text"
                  placeholder="email"
                  class="form-control"
                  onChange={(event) => this.handleOnChange(event, "email")}
                ></input>
              </div>

              <div class="form-group">
                <i class="bx bx-lock-alt login__icon"></i>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(event) => this.handleOnChange(event, "password")}
                  class="form-control"
                ></input>
              </div>

              <a class="login__forgot"> Quên mật khẩu?</a>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <button
                class="btn btn-primary btn-block"
                onClick={() => this.handleLogin()}
                onKeyDown={this.handleKeyPress}
              >
                Đăng nhập
              </button>

              <div>
                <span class="login__account">Tạo tài khoản </span>
                <span
                  class="login__signin"
                  id="sign-up"
                  onClick={() => this.handleOnclickRegister()}
                >
                  Đăng kí
                </span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfoClint: state.user.userInfoClint,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    LoginSuccess: (userInfoClint) =>
      dispatch(actions.LoginSuccess(userInfoClint)),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginUser)
);
