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
class Contract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBrand: [],
      Name: "",
      Email: "",
      Message: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

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
  handleSaveBrand = async (data) => {
    let res = await saveContract({
      idUser: data.id,
      userName: data.userName,
      Name: this.state.Name,
      Email: this.state.Email,
      Message: this.state.Message,
    });
    if (res && res.errCode === 0) {
      toast.success("send email successfully");
    } else {
      toast.error("send email failed");
    }
  };
  handleAlert = () => {
    alert("vui long dang nhap");
  };

  render() {
    const { userInfoClint } = this.props;
    return (
      <div className="card">
        <TabHeader />
        <div class="card-body" style={{ maxWidth: "1100px" }} id="contact">
          <h2 class="w3-wide w3-center">LIÊN HỆ</h2>
          <p class="w3-opacity w3-center">
            <i>Ghi chú ở phần dưới đây !</i>
          </p>
          <div class="row">
            <div class="col-mb-9">
              <i class="fa fa-map-marker" style={{ width: "30px" }}></i> Vị trí hiện tại của bạn
              <br></br>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62709.02810686104!2d106.65328639999998!3d10.787225600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1705661152851!5m2!1sen!2s"
                width="500"
                height="350"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div class="col form-group">
              <i class="fa fa-phone" style={{ width: "30px" }}></i> SĐT: +00 151515
              <br></br>
              <i class="fa fa-envelope" style={{ width: "30px" }}>
                {" "}
              </i>{" "}
              Email: mail@mail.com<br></br>
              <form action="/action_page.php" target="_blank">
                <div class="w3-row-padding" style={{ margin: "0 -16px 8px -16px" }}>
                  <div class="w3-half">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Họ và tên"
                      required
                      name="Name"
                      onChange={(event) => this.handleOnChange(event, "Name")}
                    ></input>
                  </div>
                  <div class="w3-half">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Email của bạn"
                      required
                      name="Email"
                      onChange={(event) => this.handleOnChange(event, "Email")}
                    ></input>
                  </div>
                </div>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Lời liên hệ"
                  required
                  name="Message"
                  onChange={(event) => this.handleOnChange(event, "Message")}
                ></input>
                {userInfoClint !== null ? (
                  <button
                    class="btn btn-primary btn-block"
                    type="submit"
                    onClick={() => {
                      this.handleSaveBrand({
                        id: userInfoClint.id,
                        userName: userInfoClint.firstName,
                      });
                    }}
                  >
                    Gửi liên hệ
                  </button>
                ) : (
                  <button
                    class="btn btn-primary btn-block"
                    type="submit"
                    onClick={() => {
                      this.handleAlert();
                    }}
                  >
                    Gửi liên hệ
                  </button>
                )}
              </form>
            </div>
          </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contract));
