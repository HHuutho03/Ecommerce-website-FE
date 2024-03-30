import React, { Component } from "react";
import { connect } from "react-redux";

class ManagerConfig extends Component {
  render() {
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Cấu hình website</h1>
          </section>
          <section className="content-body my-3">
            <form action="" method="post">
              <input type="hidden" name="id" value=""></input>
              <div className="mb-3">
                <label for="author">
                  <strong>Tác giả(*)</strong>
                </label>
                <input
                  type="text"
                  name="author"
                  value=""
                  id="author"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="email">
                  <strong>Email(*)</strong>
                </label>
                <input
                  type="text"
                  name="email"
                  value=""
                  id="email"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="phone">
                  <strong>Điện thoại(*)</strong>
                </label>
                <input
                  type="text"
                  name="phone"
                  value=""
                  id="phone"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="zalo">
                  <strong>Zalo(*)</strong>
                </label>
                <input
                  type="text"
                  name="zalo"
                  value=""
                  id="zalo"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label for="facebook">
                  <strong>Facebook cá nhân(*)</strong>
                </label>
                <input
                  type="text"
                  name="facebook"
                  value=""
                  id="facebook"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label for="address">
                  <strong>Địa chỉ(*)</strong>
                </label>
                <input
                  type="text"
                  name="address"
                  value=""
                  id="address"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label for="youtube">
                  <strong>Kênh Youtube(*)</strong>
                </label>
                <input
                  type="text"
                  name="youtube"
                  value=""
                  id="youtube"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label for="metadesc">
                  <strong>Mô tả seo(*)</strong>
                </label>
                <textarea
                  name="metadesc"
                  id="metadesc"
                  className="form-control"
                ></textarea>
              </div>
              <div className="mb-3">
                <label for="metakey">
                  <strong>Từ khoa seo(*)</strong>
                </label>
                <textarea
                  name="metakey"
                  id="metakey"
                  className="form-control"
                ></textarea>
              </div>
              <div className="mb-3">
                <label for="status">
                  <strong>Trạng thái</strong>
                </label>
                <select name="status" id="status" className="form-control">
                  <option value="1">Online</option>
                  <option value="2">Offline</option>
                </select>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-success">
                  <i className="fa fa-save" aria-hidden="true"></i> Lưu cấu hình
                </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerConfig);
