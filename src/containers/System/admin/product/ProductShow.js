import React, { Component } from "react";
import { connect } from "react-redux";

class ProductShow extends Component {
  render() {
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết</h1>
            <div className="row mt-2 align-items-center">
              <div className="col-md-12 text-end">
                <a href="product_index.html" className="btn btn-primary btn-sm">
                  <i className="fa fa-arrow-left"></i> Về danh sách
                </a>
                <a href="product_edit.html" className="btn btn-success btn-sm">
                  <i className="fa fa-edit"></i> Sửa
                </a>
                <a href="product_index.html" className="btn btn-danger btn-sm">
                  <i className="fa fa-trash"></i> Xóa
                </a>
              </div>
            </div>
          </section>
          <section className="content-body my-2">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ width: "180px" }}>Tên trường</th>
                  <th>Giá trị</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Id</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);
