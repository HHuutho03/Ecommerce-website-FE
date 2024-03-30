import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers, DeleteUserAdmin } from "../../../../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class userWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState) {}
  handleViewDetailDoctor = (Customer) => {
    this.props.history.push(`/detail-customer/${Customer.id}`);
  };
  handleDeleteUser = async (item) => {
    let res = await DeleteUserAdmin(item.id);
    if (res.errCode === 0) {
      toast.success("Delete a user successfully");
    } else {
      toast.error("Delete a user failed");
    }

    console.log("check res", res);
  };
  render() {
    let { arrUsers } = this.state;
    console.log("arruse", arrUsers);
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Khách hàng</h1>
            <Link to={`/system/customer/Customer-create`}>
              <span className="btn-add">Thêm mới</span>
            </Link>

            <div className="row mt-3 align-items-center">
              <div className="col-6">
                <ul className="manager">
                  <li>
                    <a href="customer_index.html">Tất cả (123)</a>
                  </li>
                  <li>
                    <a href="/">Xuất bản (12)</a>
                  </li>
                  <li>
                    <a href="customer_trash.html">Rác (12)</a>
                  </li>
                </ul>
              </div>
              <div className="col-6 text-end">
                <input type="text" className="search d-inline" />
                <button className="d-inlin btnsearch">Tìm kiếm</button>
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
                      <a href="" className="page-link">
                        &laquo;
                      </a>
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
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "30px" }}>
                    <input type="checkbox" id="checkboxAll" />
                  </th>
                  <th className="text-center" style={{ width: "130px" }}>
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
              {arrUsers &&
                arrUsers.length > 0 &&
                arrUsers.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr className="datarow">
                        <td>
                          <input type="checkbox" id="checkId" />
                        </td>
                        <td>
                          <img
                            className="img-fluid"
                            src={item.image}
                            alt="category.jpg"
                          />
                        </td>
                        <td>
                          <div className="name">
                            <a href="customer_edit.html">
                              {item && item.firstName
                                ? `${item.firstName}  ${item.lastName}`
                                : ""}
                            </a>
                          </div>
                          <div className="function_style">
                            <a href="/" className="text-success mx-1">
                              <i className="fa fa-toggle-on"></i>
                            </a>
                            <span
                              href="customer_edit.html"
                              className="text-primary mx-1"
                              // onClick={() => {
                              //   this.handleViewDetailDoctor(item);
                              // }}
                            >
                              <Link
                                to={`/system/customer/Customer-edit/${item.id}`}
                                state={{ yourData: item }}
                              >
                                <i className="fa fa-edit"></i>
                              </Link>
                            </span>
                            <a
                              href="customer_show.html"
                              className="text-info mx-1"
                            >
                              <Link
                                to={`/system/customer/Customer-show/${item.id}`}
                              >
                                <i className="fa fa-eye"></i>
                              </Link>
                            </a>
                            <span className="text-danger mx-1">
                              <i
                                className="fa fa-trash"
                                onClick={() => {
                                  this.handleDeleteUser(item);
                                }}
                              ></i>
                            </span>
                          </div>
                        </td>
                        <td>{item.phonenumber}</td>
                        <td>{item.email}</td>
                        <td className="text-center">{index}</td>
                      </tr>
                    </tbody>
                  );
                })}
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

export default connect(mapStateToProps, mapDispatchToProps)(userWrite);
