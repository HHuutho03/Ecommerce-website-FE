import React, { Component } from "react";
import { connect } from "react-redux";

class Trademark extends Component {
  render() {
    return <></>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Trademark);
