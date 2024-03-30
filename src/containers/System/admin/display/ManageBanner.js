import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBanner, deleteBanner } from "../../../../services/userService";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../../utils";
class ManageBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllBanner: [],
    };
  }

  async componentDidMount() {
    this.handleGetAllProduct();
  }
  handleGetAllProduct = async () => {
    let res = await getAllBanner();

    if (res.errCode === 0) {
      this.setState({
        AllBanner: res.data.reverse(),
      });
    }
  };
  async componentDidUpdate(prevProps, prevState) {}

  handleOnChange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {}
    );
  };

  handleDeleteBanner = async (brandId) => {
    let res = await deleteBanner(brandId);
    if (res.errCode === 0) {
      toast.success("delete banner successfully");
      this.handleGetAllProduct();
    } else {
      toast.error("delete banner failed");
    }
  };
  render() {
    let { AllBanner } = this.state;
    return (
      <div class="col-md-10">
        <div class="content">
          <section class="content-header my-2">
            <h1 class="d-inline">Banner</h1>
            <Link to={`/system/banner/banner-create`} class="btn-add">
              Thêm mới
            </Link>
            <Link to={`/system/banner/banner-trash`} class="btn-add">
              Thùng rác
            </Link>
            <div class="row mt-3 align-items-center">
              <div class="col-6">
                <ul class="manager">
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
              <div class="col-6 text-end">
                <input type="text" class="search d-inline" />
                <button class="d-inline btnsearch">Tìm kiếm</button>
              </div>
            </div>
            <div class="row mt-1 align-items-center">
              <div class="col-md-8">
                <select name="" class="d-inline me-1">
                  <option value="">Hành động</option>
                  <option value="">Bỏ vào thùng rác</option>
                </select>
                <button class="btnapply">Áp dụng</button>
                <select name="" class="d-inline me-1">
                  <option value="">Tất cả vị trí</option>
                </select>
                <button class="btnfilter">Lọc</button>
              </div>
              <div class="col-md-4 text-end">
                <nav aria-label="Page navigation example">
                  <ul class="pagination pagination-sm justify-content-end">
                    <li class="page-item disabled">
                      <a class="page-link">&laquo;</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link">1</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link">2</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link">3</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link">&raquo;</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
          <section class="content-body my-2">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th class="text-center" style={{ width: "30px" }}>
                    <input type="checkbox" id="checkboxAll" />
                  </th>
                  <th class="text-center" style={{ width: "130px" }}>
                    Hình ảnh
                  </th>
                  <th>Tên banner</th>
                  <th>Vị trí</th>
                  <th>Liên kết</th>
                  <th class="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              {AllBanner &&
                AllBanner.length > 0 &&
                AllBanner.map((item, index) => {
                  return (
                    <tbody>
                      <tr class="datarow">
                        <td class="text-center">
                          <input type="checkbox" />
                        </td>
                        <td>
                          <img
                            src={item.image}
                            class="img-fluid"
                            alt="banner.jpg"
                          />
                        </td>
                        <td>
                          <div class="name">
                            <a>{item.name}</a>
                          </div>
                          <div class="function_style">
                            <a class="text-success mx-1">
                              <i class="fa fa-toggle-on"></i>
                            </a>
                            <Link
                              to={`/system/banner/banner-edit`}
                              class="text-primary mx-1"
                            >
                              <i class="fa fa-edit"></i>
                            </Link>

                            <Link
                              to={`/system/banner/banner-show`}
                              class="text-info mx-1"
                            >
                              <i class="fa fa-eye"></i>
                            </Link>

                            <span
                              onClick={() => {
                                this.handleDeleteBanner(item.id);
                              }}
                              class="text-danger mx-1"
                            >
                              <i class="fa fa-trash"></i>
                            </span>
                          </div>
                        </td>
                        <td>{item.position}</td>
                        <td>{item.link}</td>
                        <td class="text-center">id</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageBanner);
