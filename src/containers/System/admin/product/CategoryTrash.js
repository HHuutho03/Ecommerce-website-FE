import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../../utils";
import { Link } from "react-router-dom";
import {
  deleteCategorySoft,
  getAllCategoryDelete,
  restoreCategory,
} from "../../../../services/userService";
import { toast } from "react-toastify";

class CategoryTrash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllCategory: [],
    };
  }
  async componentDidMount() {
    this.getAllCategoryDelete();
  }
  getAllCategoryDelete = async () => {
    let res = await getAllCategoryDelete();
    if (res.errCode === 0) {
      this.setState({
        AllCategory: res.data.reverse(),
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

  deleteCategorySoft = async (brandId) => {
    let res = await deleteCategorySoft(brandId);
    if (res.errCode === 0) {
      toast.success("delete category ni trash successfully");
      this.getAllCategoryDelete();
    } else {
      toast.error("delete category in trash failed");
    }
  };
  handleRestoreProduct = async (brandId) => {
    let res = await restoreCategory(brandId);

    if (res.restoredRecord.errCode === 0) {
      toast.success("restore category successfully");
      this.getAllCategoryDelete();
    } else {
      toast.error("restore category failed");
    }
  };
  render() {
    let { AllCategory } = this.state;
    return (
      <div class="col-md-10">
        <div class="content">
          <section class="content-header my-2">
            <h1 class="d-inline">Thùng rác danh mục</h1>
            <div class="row mt-3 align-items-center">
              <div class="col-6">
                <ul class="manager">
                  <li>
                    <a href="category_index.html">Tất cả (123)</a>
                  </li>
                  <li>
                    <a href="#">Xuất bản (12)</a>
                  </li>
                  <li>
                    <a href="category_trash.html">Rác (12)</a>
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
                  <th>Tên danh mục</th>
                  <th>Tên slug</th>
                </tr>
              </thead>
              {AllCategory &&
                AllCategory.length > 0 &&
                AllCategory.map((item, index) => {
                  return (
                    <tbody>
                      <tr class="datarow">
                        <td class="text-center">
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
                          <div class="name">
                            <a href="category_index.html">{item.name}</a>
                          </div>
                          <div class="function_style">
                            <span
                              class="text-primary mx-1"
                              onClick={() => this.handleRestoreProduct(item.id)}
                            >
                              <i class="fa fa-undo"></i>
                            </span>
                            <span
                              class="text-danger mx-1"
                              onClick={() => {
                                this.deleteCategorySoft(item.id);
                              }}
                            >
                              <i class="fa fa-trash"></i>
                            </span>
                          </div>
                        </td>
                        <td>{item.slug}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTrash);
