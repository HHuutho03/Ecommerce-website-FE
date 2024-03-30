import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      var linkToRedirect = isLoggedIn ? "/system/product" : "/home";
    }
    console.log("linkToRedirect", linkToRedirect);
    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
