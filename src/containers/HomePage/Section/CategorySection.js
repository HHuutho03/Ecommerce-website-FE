import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import cat1 from "../../../assets/images/cat1.jpg";
import cat2 from "../../../assets/images/cat2.jpg";
import cat3 from "../../../assets/images/cat3.jpg";
class CategorySection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentDidMount() {}

  render() {
    return (
      <section class="section category">
        <div class="cat-center">
          <div class="cat">
            <img src={cat1} alt={"cat1"} />

            <div>
              <p>THỜI TRANG NAM</p>
            </div>
          </div>
          <div class="cat">
            <img src={cat2} alt={"cat2"} />

            <div>
              <p>THỜI TRANG NỮ</p>
            </div>
          </div>
          <div class="cat">
            <img src={cat3} alt={"cat3"} />

            <div>
              <p>THỜI TRANG TRẺ EM</p>
            </div>
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
  connect(mapStateToProps, mapDispatchToProps)(CategorySection)
);
