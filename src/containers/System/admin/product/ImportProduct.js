import React, { Component } from "react";
import { connect } from "react-redux";

class ImportProduct extends Component {
  render() {
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Nhập sản phẩm</h1>
            <div className="row mt-3 align-items-center">
              <div className="col-12 text-end">
                <input type="text" className="search d-inline" />
                <button className="d-inline btnsearch">Tìm kiếm</button>
              </div>
            </div>
            <div className="row mt-1 align-items-center">
              <div className="col-md-8">
                <select name="" className="d-inline me-1">
                  <option value="">Hành động</option>
                  <option value="">Bỏ vào thùng rác</option>
                </select>
                <button className="btnapply">Áp dụng</button>
                <select name="" className="d-inline me-1">
                  <option value="">Tất cả danh mục</option>
                </select>
                <select name="" className="d-inline me-1">
                  <option value="">Tất cả thương hiệu</option>
                </select>
                <button className="btnfilter">Lọc</button>
              </div>
              <div className="col-md-4 text-end">
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-end">
                    <li className="page-item disabled">
                      <a className="page-link">&laquo;</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="/">
                        &raquo;
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <section className="content-body my-2">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "90px" }}>
                    Hình ảnh
                  </th>
                  <th>Tên sản phẩm</th>
                  <th>Tên danh mục</th>
                  <th>Tên thương hiệu</th>
                  <th style={{ width: "90px" }} className="text-center">
                    Số lượng
                  </th>
                  <th style={{ width: "90px" }} className="text-center">
                    Giá nhập
                  </th>
                  <th style={{ width: "90px" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr className="datarow">
                  <td>{/* <img className="img-fluid" src="" alt=""> */}</td>
                  <td>Ten SP</td>
                  <td>sadsa</td>
                  <td>ádsa</td>
                  <td>
                    <input type="number" name="qty" style={{ width: "90px" }} />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      style={{ width: "90px" }}
                    />
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      onclick="selectproduct(1)"
                      className="btn btn-sm btn-success"
                    >
                      Lưu
                    </button>
                  </td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ImportProduct);
