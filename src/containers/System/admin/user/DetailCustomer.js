import React, { Component } from "react";
import { connect } from "react-redux";
import { getCustomer } from "../../../../services/userService";
import { CommonUtils } from "../../../../utils";

class DetailCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCustomer: [],
      isOpen: false,
      username: "",
      password: "",
      email: "",
      phone: "",
      name: "",
      gender: "",
      address: "",
      image: "",
      status: "",
      previewImage: "",
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.id;
    let res = await getCustomer(id);
    if (res) {
      this.setState({
        arrCustomer: res,
        username: res.firstName,
        password: "",
        email: res.email,
        phone: res.phonenumber,
        name: res.lastName,
        gender: "",
        address: res.address,
        image: "",
        status: "",
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.arrCustomer !== this.state.arrCustomer) {
      this.setState({ arrCustomer: this.state.arrCustomer });
    }
  }
  handleBackHome = () => {
    this.props.history.push(`/system/Customer`);
  };
  handleGetFile = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImage: objectUrl,
        image: base64,
      });
    }
  };
  handlePreviewImage = () => {
    this.setState({
      isOpen: true,
    });
  };
  render() {
    let { status } = this.state;
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Thêm thành viên</h1>
            <div className="row mt-2 align-items-center">
              <div className="col-md-12 text-end">
                <button className="btn btn-success btn-sm" name="THEM">
                  <i className="fa fa-save"></i> Lưu [Thêm]
                </button>
                <span
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    this.handleBackHome();
                  }}
                >
                  <i className="fa fa-arrow-left"></i> Về danh sách
                </span>
              </div>
            </div>
          </section>
          <section className="content-body my-2">
            <form action="" method="#" enctype="multipart/form-data">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label>
                      <strong>Tên đăng nhập(*)</strong>
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Tên đăng nhập"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Mật khẩu(*)</strong>
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Mật khẩu"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Xác nhận mật khẩu(*)</strong>
                    </label>
                    <input
                      type="password"
                      name="re_password"
                      className="form-control"
                      placeholder="Xác nhận mật khẩu"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Email(*)</strong>
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Xác nhận email(*)</strong>
                    </label>
                    <input
                      type="text"
                      name="re_email"
                      className="form-control"
                      placeholder="Xác nhận email"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Điện thoại(*)</strong>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="Điện thoại"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label>
                      <strong>Họ tên (*)</strong>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Họ tên"
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Giới tính</strong>
                    </label>
                    <select name="gender" id="gender" className="form-select">
                      <option>Chọn giới tinh</option>
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Địa chỉ</strong>
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Địa chỉ"
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <label>
                      <strong>Hình đại diện</strong>
                    </label>
                    <input
                      style={{ width: "100px" }}
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={(event) => this.handleGetFile(event)}
                    />
                    <div
                      style={{
                        backgroundImage: `URL(${this.state.previewImage})`,
                        width: "12%",
                        background: "center center no-repeat",
                        backgroundSize: "contain",
                        cursor: "pointer",
                      }}
                      onClick={() => this.handlePreviewImage()}
                    ></div>
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Trạng thái</strong>
                    </label>
                    <select
                      name="status"
                      className="form-select"
                      value={status}
                    >
                      <option value="1">Xuất bản</option>
                      <option value="2">Chưa xuất bản</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCustomer);
