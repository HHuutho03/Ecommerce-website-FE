import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../../utils";
import { Link } from "react-router-dom";
import {
  deleteBrandSoft,
  getAllBrandDelete,
  restoreBrand,
} from "../../../../services/userService";
import { toast } from "react-toastify";

class BrandTrash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllBrand: [],
    };
  }
  async componentDidMount() {
    this.getAllBrandDelete();
  }
  getAllBrandDelete = async () => {
    let res = await getAllBrandDelete();
    if (res.errCode === 0) {
      this.setState({
        AllBrand: res.data.reverse(),
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
  handleGetFile = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        image: base64,
      });
    }
  };

  deleteBrandSoft = async (brandId) => {
    let res = await deleteBrandSoft(brandId);
    if (res.errCode === 0) {
      toast.success("delete Product ni trash successfully");
      this.getAllBrandDelete();
    } else {
      toast.error("delete Product in trash failed");
    }
  };
  handleRestoreProduct = async (brandId) => {
    let res = await restoreBrand(brandId);

    if (res.restoredRecord.errCode === 0) {
      toast.success("restore Product successfully");
      this.getAllBrandDelete();
    } else {
      toast.error("restore Product failed");
    }
  };
  render() {
    let { AllBrand } = this.state;
    return (
      <div class="col-md-10">
        <div class="content">
          <section class="content-header my-2">
            <h1 class="d-inline">Thùng rác thương hiệu</h1>
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
                  <th class="text-center" style={{ width: "30px" }}>
                    Hình ảnh
                  </th>
                  <th>Tên thương hiệu</th>
                  <th>Tên slug</th>
                  <th class="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              {AllBrand &&
                AllBrand.length > 0 &&
                AllBrand.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr class="datarow">
                        <td class="text-center">
                          <input type="checkbox" id="checkId" />
                        </td>
                        <td>
                          <img src={item.image} alt="brand.jpg" />
                        </td>
                        <td>
                          <a>{item.name}</a>
                          <div class="function_style">
                            <span
                              onClick={() => {
                                this.handleRestoreProduct(item.id);
                              }}
                              class="text-primary mx-1"
                            >
                              <i class="fa fa-undo"></i>
                            </span>
                            <span
                              onClick={() => {
                                this.deleteBrandSoft(item.id);
                              }}
                              class="text-danger mx-1"
                            >
                              <i class="fa fa-trash"></i>
                            </span>
                          </div>
                        </td>
                        <td>{item.slug}</td>
                        <td class="text-center">{index}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandTrash);
