import React, { Component } from "react";
import { connect } from "react-redux";
import { languages, CRUD, CommonUtils } from "../../../../utils";
import {
  saveTrademark,
  getAllTrademark,
  deleteTrademark,
} from "../../../../services/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Trademark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTrademark: [],
      name: "",
      description: "",
      image: "",
      status: "",
      parent_id: "",
    };
  }
  async componentDidMount() {
    this.handleGetAllTrademark();
  }
  handleGetAllTrademark = async () => {
    let res = await getAllTrademark();
    if (res.errCode === 0) {
      this.setState({
        allTrademark: res.data.reverse(),
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
  saveTrademark = async () => {
    let res = await saveTrademark({
      name: this.state.name,
      slug: this.state.name,
      description: this.state.description,
      image: this.state.image,
      parent_id: this.state.parent_id,
      status: this.state.status,
    });
    if (res && res.errCode === 0) {
      toast.success("save brand successfully");
      this.handleGetAllTrademark();
    } else {
      toast.error("save brand failed");
    }
  };
  handleDeleteBrand = async (brandId) => {
    let res = await deleteTrademark(brandId);
    if (res.errCode === 0) {
      toast.error("delete brand successfully");
      this.handleGetAllTrademark();
    } else {
      toast.error("delete brand failed");
    }
  };
  render() {
    let { allTrademark } = this.state;
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Danh mục</h1>
            <Link to={`/system/category/category-trash`}>
              <span className="btn-add">Thung rac</span>
            </Link>
            <hr style={{ border: "none" }} />
          </section>
          <section className="content-body my-2">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label>
                    <strong>Tên danh mục (*)</strong>
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nhập tên danh mục"
                    className="form-control"
                    required
                    onChange={(event) => this.handleOnChange(event, "name")}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Mô tả</strong>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Mô tả"
                    rows="4"
                    className="form-control"
                    onChange={(event) =>
                      this.handleOnChange(event, "description")
                    }
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Danh mục cha</strong>
                  </label>
                  <select
                    name="parent_id"
                    className="form-select"
                    onChange={(event) =>
                      this.handleOnChange(event, "parent_id")
                    }
                  >
                    <option value="0">None</option>
                    <option value="1">Tên danh mục</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Hình đại diện</strong>
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={(event) => this.handleGetFile(event)}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Trạng thái</strong>
                  </label>
                  <select
                    name="status"
                    className="form-select"
                    onChange={(event) => this.handleOnChange(event, "status")}
                  >
                    <option value="1">Xuất bản</option>
                    <option value="2">Chưa xuất bản</option>
                  </select>
                </div>
                <div className="mb-3 text-end">
                  <button
                    type="submit"
                    className="btn btn-success"
                    name="THEM"
                    onClick={() => this.saveTrademark()}
                  >
                    <i className="fa fa-save"></i> Lưu[Thêm]
                  </button>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row mt-3 align-items-center">
                  <div className="col-12">
                    <ul className="manager">
                      <li>
                        <a href="category_index.html">Tất cả (123)</a>
                      </li>
                      <li>
                        <a href="/">Xuất bản (12)</a>
                      </li>
                      <li>
                        <a href="category_trash.html">Rác (12)</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2 align-items-center">
                  <div className="col-md-6">
                    <select name="" className="d-inline me-1">
                      <option value="">Hành động</option>
                      <option value="">Bỏ vào thùng rác</option>
                    </select>
                    <button className="btnapply">Áp dụng</button>
                  </div>
                  <div className="col-md-6 text-end">
                    <input type="text" className="search d-inline" />
                    <button className="d-inline btnsearch">Tìm kiếm</button>
                  </div>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                      </th>
                      <th className="text-center" style={{ width: "90px" }}>
                        Hình ảnh
                      </th>
                      <th>Tên danh mục</th>
                      <th>Tên slug</th>
                      <th className="text-center" style={{ width: "30px" }}>
                        ID
                      </th>
                    </tr>
                  </thead>
                  {allTrademark &&
                    allTrademark.length > 0 &&
                    allTrademark.map((item, index) => {
                      return (
                        <tbody key={index}>
                          <tr className="datarow">
                            <td className="text-center">
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
                                <a href="category_index.html">{item.name}</a>
                              </div>
                              <div className="function_style">
                                <a href="/" className="px-1 text-success">
                                  <i className="fa fa-toggle-on"></i>
                                </a>
                                <Link
                                  to={`/system/category/category-edit`}
                                  className="px-1 text-primary"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <Link
                                  to={`/system/category/category-show`}
                                  className="px-1 text-info"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>

                                <span
                                  href="/"
                                  className="px-1 text-danger"
                                  onClick={() => {
                                    this.handleDeleteBrand(item.id);
                                  }}
                                >
                                  <i className="fa fa-trash"></i>
                                </span>
                              </div>
                            </td>
                            <td>{item.slug}</td>
                            <td className="text-center">{index + 1}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                </table>
              </div>
            </div>
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
