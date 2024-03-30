import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
class BannerSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentDidMount() {}

  render() {
    return (
      <section class="section banner">
        <div class="left">
          <span class="trend">Thiết kế theo xu hướng </span>
          <h1>Bộ sưu tập mới 2024</h1>
          <p>
            Giảm giá hàng mới{" "}
            <span class="color" style={{ color: "red" }}>
              GIẢM GIÁ 50% Ưu đãi
            </span>{" "}
            trong thời gian có hạn
          </p>
          <a href="/product" class="btn btn-1">
            Khám phá ngay
          </a>
        </div>
        <div class="right">
          <img src="./images/banner.png" alt=""></img>
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
  connect(mapStateToProps, mapDispatchToProps)(BannerSection)
);
