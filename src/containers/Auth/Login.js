import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
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
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
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
  handleOnclickRegister = (e) => {
    let container = document.getElementById("container");
    container.classList.toggle("right-panel-active");
  };
  handleOnclickLogin = (e) => {
    let container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };
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
  render() {
    return (
      <div className="login-background">
        <div className="container" id="container">
          <div className="form-container register-container">
            <form action="#">
              <h1>Register hire.</h1>
              <input
                type="text"
                placeholder="Họ"
                onChange={(event) => this.handleOnChange(event, "firstName")}
              ></input>
              <input
                type="text"
                placeholder="Tên"
                onChange={(event) => this.handleOnChange(event, "lastName")}
              ></input>
              <input type="email" placeholder="Email" c></input>
              <input
                type="password"
                placeholder="Password"
                onChange={(event) => this.handleOnChange(event, "password")}
              ></input>
              <button type="submit " onClick={() => this.handleSaveUser()}>
                Register
              </button>
              <span>or use your account</span>
              <div className="social-container">
                <a className="social">
                  <i className="fab fa-facebook social-icon"></i>
                </a>
                <a className="social">
                  <i className="fab fa-google-plus social-icon gg"></i>
                </a>
                <a className="social">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </form>
          </div>

          <div className="form-container login-container">
            <form action="#">
              <h1>Login hire.</h1>
              <input
                type="email"
                placeholder="Email"
                value={this.state.username}
                onChange={(e) => this.handleOnChangeUserName(e)}
              ></input>
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.handleOnChangePassword(e)}
              ></input>

              <div className="content">
                <div className="checkbox">
                  <input type="checkbox" name="checkbox" id="checkbox"></input>
                  <label>Remember me</label>
                </div>
                <div className="pass-link">
                  <a>Forgot password?</a>
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <button
                onClick={() => this.handleLogin()}
                onKeyDown={this.handleKeyPress}
              >
                Login
              </button>
              <span>or use your account</span>
              <div className="social-container">
                <a className="social">
                  <i className="fab fa-facebook social-icon"></i>
                </a>
                <a className="social">
                  <i className="fab fa-google-plus social-icon gg"></i>
                </a>
                <a  className="social">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="title">
                  Hello <br></br> friends
                </h1>
                <p>if Yout have an account, login here and have fun</p>
                <button
                  className="ghost"
                  id="login"
                  onClick={(e) => {
                    this.handleOnclickLogin(e);
                  }}
                >
                  Login
                  <i className="fa-solid fa-arrow-left login"></i>
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="title">
                  Start yout <br></br> journy now
                </h1>
                <p>
                  if you don't have an account yet, join us and start your
                  journey.
                </p>
                <button
                  className="ghost"
                  id="register"
                  onClick={(e) => {
                    this.handleOnclickRegister(e);
                  }}
                >
                  Register
                  <i className="fa-solid fa-arrow-right register"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
