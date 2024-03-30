import React, { Component } from "react";
import { connect } from "react-redux";

class OrderShow extends Component {
  render() {
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết đơn hàng</h1>
            <div className="mt-1 text-end">
              <a className="btn btn-sm btn-primary" href="order_index.html">
                <i className="fa fa-arrow-left"></i> Về danh sách
              </a>
            </div>
          </section>
          <section className="content-body my-2">
            <h3>Thông tin khách hàng</h3>
            <div className="row">
              <div className="col-md">
                <label>
                  <strong>Họ tên (*)</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  value=""
                  className="form-control"
                  readonly
                />
              </div>
              <div className="col-md">
                <label>
                  <strong>Email (*)</strong>
                </label>
                <input
                  type="text"
                  name="email"
                  value=""
                  className="form-control"
                  readonly
                />
              </div>
              <div className="col-md">
                <label>
                  <strong>Điện thoại (*)</strong>
                </label>
                <input
                  type="text"
                  name="phone"
                  value=""
                  className="form-control"
                  readonly
                />
              </div>
              <div className="col-md-5">
                <label>
                  <strong>Địa chỉ (*)</strong>
                </label>
                <input
                  type="text"
                  name="address"
                  value=""
                  className="form-control"
                  readonly
                />
              </div>
            </div>
            <h3>Chi tiết giỏ hàng</h3>
            <div className="row my-2">
              <div className="col-3">
                Tổng tiền: <strong>8888đ</strong>
              </div>
              <div className="col-3">
                Ngày đặt: <strong>ngayt</strong>
              </div>
              <div className="col-3">
                Hình thức đặt: <strong>type</strong>
              </div>
              <div className="col-3">
                Trạng thái: <strong>Kieu</strong>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: "90px" }}>
                        Hình ảnh
                      </th>
                      <th>Tên sản phẩm</th>
                      <th style={{ width: "160px" }} className="text-center">
                        Giá
                      </th>
                      <th style={{ width: "90px" }} className="text-center">
                        Số lượng
                      </th>
                      <th style={{ width: "160px" }} className="text-center">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img className="img-fluid" src="" alt="" />
                      </td>
                      <td>ten</td>
                      <td className="text-right">gia</td>
                      <td className="text-center">sl</td>
                      <td className="text-right">tong</td>
                    </tr>
                  </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderShow);
