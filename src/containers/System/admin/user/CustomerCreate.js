import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../../utils";
import { saveCustomer } from "../../../../services/userService";
class Trademark extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  handleSaveCustomer = async () => {
    let res = await saveCustomer(this.state);
    console.log("check save res", res);
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
                <button
                  className="btn btn-success btn-sm"
                  name="THEM"
                  onClick={() => {
                    this.handleSaveCustomer();
                  }}
                >
                  <i className="fa fa-save"></i> Lưu [Thêm]
                </button>
                <a href="user_index.html" className="btn btn-primary btn-sm">
                  <i className="fa fa-arrow-left"></i> Về danh sách
                </a>
              </div>
            </div>
          </section>
          <section className="content-body my-2">
            <form action="" method="post" enctype="multipart/form-data">
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
                      onChange={(event) =>
                        this.handleOnChange(event, "username")
                      }
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
                      onChange={(event) =>
                        this.handleOnChange(event, "password")
                      }
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
                      onChange={(event) => this.handleOnChange(event, "email")}
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
                      onChange={(event) => this.handleOnChange(event, "phone")}
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
                      onChange={(event) => this.handleOnChange(event, "name")}
                    />
                  </div>
                  <div className="mb-3">
                    <label>
                      <strong>Giới tính</strong>
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      className="form-select"
                      onChange={(event) => this.handleOnChange(event, "gender")}
                    >
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
                      onChange={(event) =>
                        this.handleOnChange(event, "address")
                      }
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
                      onChange={(event) => this.handleOnChange(event, "status")}
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

export default connect(mapStateToProps, mapDispatchToProps)(Trademark);
