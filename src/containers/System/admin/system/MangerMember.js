import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class MangerMember extends Component {
  render() {
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Thành viên</h1>
            <Link to={`/system/member-create`}>
              <span className="btn-add">Thêm mới</span>
            </Link>

            <div className="row mt-3 align-items-center">
              <div className="col-6">
                <ul className="manager">
                  <li>
                    <a href="user_index.html">Tất cả (123)</a>
                  </li>
                  <li>
                    <a href="#">Xuất bản (12)</a>
                  </li>
                  <li>
                    <a href="user_trash.html">Rác (12)</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 text-end">
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
              </div>
              <div className="col-md-4 text-end">
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-end">
                    <li className="page-item disabled">
                      <a className="page-link">&laquo;</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        &raquo;
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <section className="content-body my-2">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "30px" }}>
                    <input type="checkbox" id="checkAll" />
                  </th>
                  <th className="text-center" style={{ width: "90px" }}>
                    Hình ảnh
                  </th>
                  <th>Họ tên</th>
                  <th>Điện thoại</th>
                  <th>Email</th>
                  <th className="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="datarow">
                  <td className="text-center">
                    <input type="checkbox" id="checkId" />
                  </td>
                  <td>
                    <img
                      className="img-fluid"
                      src="public/images/user.jpg"
                      alt="user.jpg"
                    />
                  </td>
                  <td>
                    <div className="name">
                      <a href="menu_index.html">Hồ Diên Lợi</a>
                    </div>
                    <div className="function_style">
                      <a href="#" className="text-success mx-1">
                        <i className="fa fa-toggle-on"></i>
                      </a>
                      <a href="user_edit.html" className="text-primary mx-1">
                        <i className="fa fa-edit"></i>
                      </a>
                      <a href="user_show.html" className="text-info mx-1">
                        <i className="fa fa-eye"></i>
                      </a>
                      <a href="#" className="text-danger mx-1">
                        <i className="fa fa-trash"></i>
                      </a>
                    </div>
                  </td>
                  <td>0987654331</td>
                  <td>dienloisoft@gmail.com</td>
                  <td className="text-center">1</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(MangerMember);
