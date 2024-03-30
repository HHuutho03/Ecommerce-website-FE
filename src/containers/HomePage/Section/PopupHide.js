import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
class PopupHide extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentDidMount() {}

  render() {
    return (
      <div class="popup hide-popup">
        <div class="popup-content">
          <div class="popup-close">
            <i class="bx bx-x"></i>
          </div>
          <div class="popup-left">
            <div class="popup-img-container">
              {/* <img class="popup-img" src="./images/popup.jpg" alt="popup"> */}
            </div>
          </div>
          <div class="popup-right">
            <div class="right-content">
              <h1>
                Get Discount <span>50%</span> Off
              </h1>
              <p>
                Sign up to our newsletter and save 30% for you next purchase. No
                spam, we promise!
              </p>
              <form action="#">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  class="popup-form"
                ></input>
                <a>Subscribe</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PopupHide)
);
