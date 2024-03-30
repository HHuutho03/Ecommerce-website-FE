import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
class ContactSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentDidMount() {}

  render() {
    return (
      <section class="section contact">
        <div class="row">
          <div class="col">
            <h2>EXCELLENT SUPPORT</h2>
            <p>
              We love our customers and they can reach us any time of day we
              will be at your service 24/7
            </p>
            <a class="btn btn-1">Contact</a>
          </div>
          <div class="col">
            <form action="">
              <div>
                <input type="email" placeholder="Email Address"></input>
                <a>Send</a>
              </div>
            </form>
          </div>
        </div>
      </section>
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
  connect(mapStateToProps, mapDispatchToProps)(ContactSection)
);
