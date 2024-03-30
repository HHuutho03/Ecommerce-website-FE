import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllBannerDelete,
  deleteBannerSoft,
  restoreBanner,
} from "../../../../services/userService";
import { toast } from "react-toastify";
class Trademark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllProduct: [],
    };
  }
  async componentDidMount() {
    this.getAllBannerDelete();
  }
  getAllBannerDelete = async () => {
    let res = await getAllBannerDelete();
    console.log("check res", res);
    if (res.errCode === 0) {
      this.setState({
        AllProduct: res.data.reverse(),
      });
    }
  };
  async componentDidUpdate(prevProps, prevState) {}

  deleteBannerSoft = async (brandId) => {
    let res = await deleteBannerSoft(brandId);
    console.log("check res", res);
    if (res.errCode === 0) {
      toast.success("delete banner ni trash successfully");
      this.getAllBannerDelete();
    } else {
      toast.error("delete banner in trash failed");
    }
  };
  handleRestoreProduct = async (brandId) => {
    let res = await restoreBanner(brandId);

    if (res.restoredRecord.errCode === 0) {
      toast.success("restore banner successfully");
      this.getAllBannerDelete();
    } else {
      toast.error("restore banner failed");
    }
  };
  render() {
    let { AllProduct } = this.state;
    return (
      <div class="col-md-10">
        <div class="content">
          <section class="content-header my-2">
            <h1 class="d-inline">Thùng rác Banner</h1>
            <div class="row mt-3 align-items-center">
              <div class="col-6">
                <ul class="manager">
                  <li>
                    <a href="banner_index.html">Tất cả (123)</a>
                  </li>
                  <li>
                    <a href="#">Xuất bản (12)</a>
                  </li>
                  <li>
                    <a href="banner_trash.html">Rác (12)</a>
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
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        &raquo;
                      </a>
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
                  <th class="text-center" style={{ width: "90px" }}>
                    Hình ảnh
                  </th>
                  <th>Tên banner</th>
                  <th>Liên kết</th>
                  <th>Vị trí</th>
                  <th class="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              {AllProduct &&
                AllProduct.length > 0 &&
                AllProduct.map((item, index) => {
                  return (
                    <tbody>
                      <tr class="datarow">
                        <td class="text-center">
                          <input type="checkbox" />
                        </td>
                        <td>
                          <img
                            class="img-fluid"
                            src={item.image}
                            alt="banner.jpg"
                          />
                        </td>
                        <td>
                          <div class="name">
                            <a href="banner_edit.html">{item.name}</a>
                          </div>
                          <div class="function_style">
                            <span
                              onClick={() => {
                                this.handleRestoreProduct(item.id);
                              }}
                              href="#"
                              class="text-primary mx-1"
                            >
                              <i class="fa fa-undo"></i>
                            </span>
                            <span
                              onClick={() => {
                                this.deleteBannerSoft(item.id);
                              }}
                              href="#"
                              class="text-danger mx-1"
                            >
                              <i class="fa fa-trash"></i>
                            </span>
                          </div>
                        </td>
                        <td>{item.link}</td>
                        <td>{item.position}</td>
                        <td class="text-center">1</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Trademark);
