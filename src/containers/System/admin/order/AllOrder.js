import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrder } from "../../../../services/userService";
class AllOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { allProduct: [], currentItems: null, selectedPrice: "" };
  }
  async componentDidMount() {
    this.handleGetAllProduct();
  }
  handleGetAllProduct = async () => {
    let res = await getAllOrder();
    if (res.errCode === 0) {
      this.setState({
        allProduct: res.data.reverse(),
      });
    }
  };
  render() {
    console.log("allProduct", this.state.allProduct);
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Quản lý đơn hàng</h1>
            <div className="row mt-3 align-items-center">
              <div className="col-6">
                <ul className="manager">
                  <li>
                    <a>Tất cả (123)</a>
                  </li>
                  <li>
                    <a>Xuất bản (12)</a>
                  </li>
                  <li>
                    <a>Rác (12)</a>
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
                <select name="" className="d-inline me-1">
                  <option value="">Chọn tháng</option>
                  <option value="">Tháng 9</option>
                </select>
                <select name="" className="d-inline me-1">
                  <option value="">Chọn năm</option>
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
                      <a className="page-link">1</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link">2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link">3</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link">&raquo;</a>
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
                  <th>Họ tên khách hàng</th>
                  <th>Điện thoại</th>
                  <th>Email</th>
                  <th>Ngày đặt hàng</th>
                  <th className="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="datarow">
                  <td>
                    <input type="checkbox" id="checkId" />
                  </td>
                  <td>
                    <div className="name">
                      <a>Hoten</a>
                    </div>
                    <div className="function_style">
                      <a className="text-success mx-1">
                        <i className="fa fa-toggle-on"></i>
                      </a>
                      <a className="text-primary mx-1">
                        <i className="fa fa-edit"></i>
                      </a>
                      <a className="text-info mx-1">
                        <Link to={`/system/order-show`}>
                          <i className="fa fa-eye"></i>
                        </Link>
                      </a>
                      <a className="text-danger mx-1">
                        <i className="fa fa-trash"></i>
                      </a>
                    </div>
                  </td>
                  <td>09877777777</td>
                  <td>Email</td>
                  <td>Ng</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllOrder);
