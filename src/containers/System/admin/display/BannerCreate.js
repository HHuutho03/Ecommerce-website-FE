import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../../utils";
import { saveBanner } from "../../../../services/userService";
class BannerCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      link: "",
      image: "",
      status: "",
      position: "",
    };
  }

  async componentDidMount() {}

  handleOnChange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check state", this.state);
      }
    );
  };
  handleGetFile = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        image: base64,
      });
    }
  };
  handleSaveBanner = async () => {
    let res = await saveBanner({
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      status: this.state.status,
      link: this.state.link,
      position: this.state.position,
    });
    console.log("res", res);
    if (res && res.data && res.data.errCode === 0) {
      toast.success("save banner successfully");
    } else {
      toast.error("vui lòng sửa banner đã xuất bản kia thành chưa xuất bản");
    }
  };
  render() {
    return (
      <div class="col-md-10">
        <div class="content">
          <section class="content-header my-2">
            <h1 class="d-inline">Thêm banner</h1>
            <div class="text-end">
              <a href="banner_index.html" class="btn btn-sm btn-success">
                <i class="fa fa-arrow-left"></i> Về danh sách
              </a>
            </div>
          </section>
          <section class="content-body my-2">
            <div class="row">
              <div class="col-md-9">
                <div class="mb-3">
                  <label>
                    <strong>Tên banner (*)</strong>
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Nhập tên banner"
                    onChange={(event) => this.handleOnChange(event, "name")}
                  />
                </div>
                <div class="mb-3">
                  <label>
                    <strong>Liên kết</strong>
                  </label>
                  <input
                    type="text"
                    name="link"
                    class="form-control"
                    placeholder="Nhập liên kết"
                    onChange={(event) => this.handleOnChange(event, "link")}
                  />
                </div>
                <div class="mb-3">
                  <label>
                    <strong>Mô tả (*)</strong>
                  </label>
                  <textarea
                    name="description"
                    rows="5"
                    class="form-control"
                    placeholder="Nhập mô tả"
                    onChange={(event) =>
                      this.handleOnChange(event, "description")
                    }
                  ></textarea>
                </div>
              </div>
              <div class="col-md-3">
                <div class="box-container mt-4 bg-white">
                  <div class="box-header py-1 px-2 border-bottom">
                    <strong>Đăng</strong>
                  </div>
                  <div class="box-body p-2 border-bottom">
                    <p>Chọn trạng thái đăng</p>
                    <select
                      name="status"
                      class="form-select"
                      onChange={(event) => this.handleOnChange(event, "status")}
                    >
                      <option value="1">Xuất bản</option>
                      <option value="2">Chưa xuất bản</option>
                    </select>
                  </div>
                  <div class="box-footer text-end px-2 py-3">
                    <button
                      type="submit"
                      class="btn btn-success btn-sm text-end"
                      onClick={() => {
                        this.handleSaveBanner();
                      }}
                    >
                      <i class="fa fa-save" aria-hidden="true"></i> Đăng
                    </button>
                  </div>
                </div>
                <div class="box-container mt-4 bg-white">
                  <div class="box-header py-1 px-2 border-bottom">
                    <strong>Vị trí (*)</strong>
                  </div>
                  <div class="box-body p-2 border-bottom">
                    <select
                      name="position"
                      class="form-select"
                      onChange={(event) =>
                        this.handleOnChange(event, "position")
                      }
                    >
                      <option>Chọn vị trí</option>
                      <option value="0">Slide đầu</option>
                      <option value="1">Slide cuối</option>
                    </select>
                    <p class="pt-2">Vị trí hiển thị banner</p>
                  </div>
                </div>
                <div class="box-container mt-4 bg-white">
                  <div class="box-header py-1 px-2 border-bottom">
                    <strong>Hình (*)</strong>
                  </div>
                  <div class="box-body p-2 border-bottom">
                    <input
                      type="file"
                      name="image"
                      class="form-control"
                      onChange={(event) => this.handleGetFile(event)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerCreate);
