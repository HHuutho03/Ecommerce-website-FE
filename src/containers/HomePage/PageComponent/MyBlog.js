import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import TabHeader from "../Section/TabHeader";
import Footer from "../Footer";
import { saveContract } from "../../../services/userService";
import { toast } from "react-toastify";
import Sidebar from "../Section/Sidebar";
import { getAllPost } from "../../../services/userService";
import { Link } from "react-router-dom";

class MyBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postDetail: [],
      allPost: [],
      Name: "",
      Email: "",
      Message: "",
    };
  }
  async componentDidMount() {
    let postDetail = this.props.location.state;
    this.setState({ postDetail });
    this.handleGetAllBrand();
  }
  handleGetAllBrand = async () => {
    let res = await getAllPost();
    if (res.errCode === 0) {
      this.setState({
        allPost: res.data.reverse(),
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.state !== this.props.location.state) {
      let postDetail = this.props.location.state;
      this.setState({ postDetail });
    }
  }
  render() {
    let { allPost, postDetail } = this.state;
    console.log("allPost", allPost);
    return (
      <div className="component-container">
        <TabHeader />

        <div class="w3-content" style={{ maxWidth: "1400px" }}>
          <header class="w3-container w3-center w3-padding-32">
            <h1>
              <b>Baì viết của chúng tôi</b>
            </h1>
            <p>
              Chào mừng đến với những điều chưa biết về chúng tôi <span class="w3-tag">unknown</span>
            </p>
          </header>
          <div class="w3-row">
            <div class="w3-col l8 s12">
              <div class="w3-card-4 w3-margin w3-white">
                <img src={postDetail.image} alt="Nature" style={{ width: "100%" }} />
                <div class="w3-container">
                  <h3>
                    <b>{postDetail.title}</b>
                  </h3>
                  <h5>
                    {postDetail.detail}
                    <span class="w3-opacity">April 7, 2014</span>
                  </h5>
                </div>

                <div class="w3-container">
                  <p>{postDetail.description}</p>
                  <div class="w3-row">
                    <div class="w3-col m8 s12">
                      <p>
                        <button class="w3-button w3-padding-large w3-white w3-border">
                          <b> »</b>
                        </button>
                      </p>
                    </div>
                    <div class="w3-col m4 w3-hide-small">
                      <p>
                        <span class="w3-padding-large w3-right">
                          <b>Comments &nbsp;</b> <span class="w3-tag">0</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>
            </div>
            <div class="w3-col l4">
              <div class="w3-card w3-margin">
                <div class="w3-container w3-padding">
                  <h4>Bài viết phổ biến</h4>
                </div>
                <ul class="w3-ul w3-hoverable w3-white">
                  {allPost &&
                    allPost.length > 0 &&
                    allPost.map((item, index) => {
                      return (
                        <Link
                          to={{
                            pathname: `/post/id=${item.id}`,
                            state: item,
                          }}
                        >
                          <li class="w3-padding-16">
                            <img src={item.image} alt="Image" class="w3-left w3-margin-right" style={{ width: "50px" }} />
                            <span class="w3-large">{item.title}</span>
                            <br></br>
                            <span>{item.detail}</span>
                          </li>
                        </Link>
                      );
                    })}
                </ul>
              </div>
              <hr></hr>
              <div class="w3-card w3-margin">
                <div class="w3-container w3-padding">
                  <h4>Bài viết theo chủ đề</h4>
                </div>
                <div class="w3-container w3-white">
                  <p>
                    <span class="w3-tag w3-black w3-margin-bottom">Travel</span>{" "}
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">New York</span>{" "}
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">London</span>
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">IKEA</span>{" "}
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">NORWAY</span>{" "}
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">DIY</span>
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Ideas</span>{" "}
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Baby</span>{" "}
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Family</span>
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">News</span>{" "}
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Clothing</span>{" "}
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Shopping</span>
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Sports</span>{" "}
                    <span class="w3-tag w3-light-grey w3-small w3-margin-bottom">Games</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <br></br>
        </div>
        <Sidebar />
        <Footer />
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
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyBlog));
