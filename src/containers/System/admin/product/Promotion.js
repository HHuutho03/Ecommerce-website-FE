import React, { Component } from "react";
import { connect } from "react-redux";

class Promotion extends Component {
  render() {
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Khuyến mãi</h1>
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
            <table className="table table-bordered" id="mytable2">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "30px" }}>
                    <input type="checkbox" id="checkboxAll" />
                  </th>
                  <th className="text-center" style={{ width: "90px" }}>
                    Hình ảnh
                  </th>
                  <th>Tên sản phẩm</th>
                  <th>Giá bán</th>
                  <th>Ngày BĐ</th>
                  <th>Ngày kết thúc</th>
                  <th>Giá sale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="datarow">
                  <td className="text-center">
                    <input type="checkbox" id="checkId" />
                  </td>
                  <td>
                    <img style={{ width: "90px" }} src="hinh" alt="hh" />
                  </td>
                  <td>
                    <div className="name">Tên sản phẩm</div>
                    <div className="function_style">
                      <a className="mx-1 text-success" href="/">
                        <i className="fas fa-toggle-on"></i>
                      </a>
                      <a className="mx-1 text-primary" href="/">
                        <i className="fas fa-edit"></i>
                      </a>
                      <a className="mx-1 text-info" href="/">
                        <i className="fas fa-eye"></i>
                      </a>
                      <a className="mx-1 text-danger" href="/">
                        <i className="fas fa-trash"></i>
                      </a>
                    </div>
                  </td>
                  <td>324343</td>
                  <td>ngày bd</td>
                  <td>jjjj</td>
                  <td>2321</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);
