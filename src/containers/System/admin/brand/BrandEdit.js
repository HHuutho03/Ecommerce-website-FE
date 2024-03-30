import React, { Component } from "react";
import { connect } from "react-redux";

class BrandEdit extends Component {
  render() {
    return (
      <div class="col-md-10">
        <div class="content">
          <section class="content-header my-2">
            <h1 class="d-inline">Cap nhat Banner</h1>
            <div class="text-end">
              <a class="btn btn-sm btn-success">
                <i class="fa fa-arrow-left"></i> Về danh sách
              </a>
            </div>
          </section>
          <section class="content-body my-2">
            <div class="row">
              <div class="col-md-9">
                <div class="mb-3">
                  <label>
                    <strong>Tên thương hiệu (*)</strong>
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    required
                  ></input>
                </div>
                <div class="mb-3">
                  <label>
                    <strong>Slug</strong>
                  </label>
                  <input type="text" name="slug" class="form-control"></input>
                </div>
                <div class="mb-3">
                  <label>
                    <strong>Mô tả</strong>
                  </label>
                  <textarea name="description" class="form-control"></textarea>
                </div>
              </div>
              <div class="col-md-3">
                <div class="box-container mt-4 bg-white">
                  <div class="box-header py-1 px-2 border-bottom">
                    <strong>Đăng</strong>
                  </div>
                  <div class="box-body p-2 border-bottom">
                    <p>Chọn trạng thái đăng</p>
                    <select name="status" class="form-control">
                      <option value="1">Xuất bản</option>
                      <option value="2">Chưa xuất bản</option>
                    </select>
                  </div>
                  <div class="box-footer text-end px-2 py-3">
                    <button
                      type="submit"
                      class="btn btn-success btn-sm text-end"
                    >
                      <i class="fa fa-save" aria-hidden="true"></i> Đăng
                    </button>
                  </div>
                </div>
                <div class="box-container mt-2 bg-white">
                  <div class="box-header py-1 px-2 border-bottom">
                    <strong>Hình đại diện</strong>
                  </div>
                  <div class="box-body p-2 border-bottom">
                    <input
                      type="file"
                      name="image"
                      class="form-control"
                    ></input>
                  </div>
                </div>
                <div class="box-container mt-2 bg-white">
                  <div class="box-header py-1 px-2 border-bottom">
                    <strong>Thứ tự</strong>
                  </div>
                  <div class="box-body p-2 border-bottom">
                    <select name="sort_order" class="form-control">
                      <option value="">Sau</option>
                      <option value="2">sau</option>
                    </select>
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
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandEdit);
