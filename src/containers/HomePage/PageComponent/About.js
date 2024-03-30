import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import TabHeader from "../Section/TabHeader";
import cat3 from "../../../assets/images/product-1.jpg";
import Footer from "../Footer";
import Sidebar from "../Section/Sidebar";
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentDidMount() {}

  render() {
    return (
      <div className="component-container">
        <TabHeader />
        <div class="w3-row w3-padding-64" id="about">
          <div class="w3-col m6 w3-padding-large w3-hide-small">
            <img
              class="w3-round w3-image w3-opacity-min"
              style={{ width: "600px", height: "750" }}
              src={cat3}
              alt={"cat3"}
            />
          </div>

          <div class="w3-col m6 w3-padding-large">
            <h1 class="w3-center">About Catering</h1>
            <br></br>
            <h5 class="w3-center">Tradition since 1889</h5>
            <p class="w3-large">
              The Catering was founded in blabla by Mr. Smith in lorem ipsum
              dolor sit amet, consectetur adipiscing elit consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              iruredolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur.We only use{" "}
              <span class="w3-tag w3-light-grey">seasonal</span> ingredients.
            </p>
            <p class="w3-large w3-text-grey w3-hide-medium">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum consectetur adipiscing
              elit, sed do eiusmod temporincididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <Sidebar />
        <Footer />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));
