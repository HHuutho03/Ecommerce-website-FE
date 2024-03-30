import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllProductDelete,
  deleteProductSoft,
  restoreProduct,
} from "../../../../services/userService";
import { CommonUtils } from "../../../../utils";
import { toast } from "react-toastify";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllProduct: [],
    };
  }
  async componentDidMount() {
    this.getAllProductDelete();
  }
  getAllProductDelete = async () => {
    let res = await getAllProductDelete();
    console.log("check res", res);
    if (res.errCode === 0) {
      this.setState({
        AllProduct: res.data.reverse(),
      });
    }
  };
  async componentDidUpdate(prevProps, prevState) {}

  deleteProductSoft = async (brandId) => {
    let res = await deleteProductSoft(brandId);
    console.log("check res", res);
    if (res.errCode === 0) {
      toast.success("delete Product ni trash successfully");
      this.getAllProductDelete();
    } else {
      toast.error("delete Product in trash failed");
    }
  };
  handleRestoreProduct = async (brandId) => {
    let res = await restoreProduct(brandId);

    if (res.restoredRecord.errCode === 0) {
      toast.success("restore Product successfully");
      this.getAllProductDelete();
    } else {
      toast.error("restore Product failed");
    }
  };
  render() {
    let { AllProduct } = this.state;
    console.log("AllProduct", AllProduct);
    return (
      <div class="col-md-10">
        <div class="content">
          <section class="content-header my-2">
            <h1 class="d-inline">Thùng rác sản phẩm</h1>
            <div class="row mt-3 align-items-center">
              <div class="col-6">
                <ul class="manager">
                  <li>
                    <a href="product_index.html">Tất cả (123)</a>
                  </li>
                  <li>
                    <a href="#">Xuất bản (12)</a>
                  </li>
                  <li>
                    <a href="product_trash.html">Rác (12)</a>
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
                  <option value="">Tất cả danh mục</option>
                </select>
                <select name="" class="d-inline me-1">
                  <option value="">Tất cả thương hiệu</option>
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
                  <th class="text-center" style={{ width: "130px" }}>
                    Hình ảnh
                  </th>
                  <th>Tên sản phẩm</th>
                  <th>Tên danh mục</th>
                  <th>Tên thương hiệu</th>
                  <th class="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              {AllProduct &&
                AllProduct.length > 0 &&
                AllProduct.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr class="datarow">
                        <td>
                          <input type="checkbox" id="checkId" />
                        </td>
                        <td>
                          <img class="img-fluid" src={item.image} alt="image" />
                        </td>
                        <td>
                          <div class="name">
                            <a href="product_edit.html">{item.name}</a>
                          </div>
                          <div class="function_style">
                            <span
                              href="#"
                              class="btn btn-primary btn-sm"
                              onClick={() => {
                                this.handleRestoreProduct(item.id);
                              }}
                            >
                              <i class="fa fa-undo"></i>
                            </span>
                            <span
                              href="#"
                              class="btn btn-danger btn-sm"
                              onClick={() => {
                                this.deleteProductSoft(item.id);
                              }}
                            >
                              <i class="fa fa-trash"></i>
                            </span>
                          </div>
                        </td>
                        <td>{item.CategoryIdData.name}</td>
                        <td>{item.CategoryIdData.name}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
