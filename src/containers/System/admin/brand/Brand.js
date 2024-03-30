import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils } from "../../../../utils";
import { Link } from "react-router-dom";

import {
  saveBrand,
  getAllBrand,
  deleteBrand,
} from "../../../../services/userService";
import { toast } from "react-toastify";
class Brand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBrand: [],
      name: "",
      description: "",
      slug: "",
      image: "",
      status: "",
      toggle: false,
    };
  }

  async componentDidMount() {
    this.handleGetAllBrand();
  }
  handleGetAllBrand = async () => {
    let res = await getAllBrand();
    if (res.errCode === 0) {
      this.setState({
        allBrand: res.data.reverse(),
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
  handleSaveBrand = async () => {
    let res = await saveBrand({
      name: this.state.name,
      slug: this.state.name,
      description: this.state.description,
      image: this.state.image,
      status: this.state.status,
    });
    if (res && res.errCode === 0) {
      toast.success("save brand successfully");
      this.handleGetAllBrand();
    } else {
      toast.error("save brand failed");
    }
    let resBrand = await getAllBrand();
  };
  handleDeleteBrand = async (brandId) => {
    console.log("brandId", brandId);
    let res = await deleteBrand(brandId);
    if (res.errCode === 0) {
      toast.success("delete brand successfully");
      this.handleGetAllBrand();
    } else {
      toast.error("delete brand failed");
    }
  };
  handleOnclickToggle = () => {
    this.setState({
      toggle: true,
    });
  };
  render() {
    let { allBrand, toggle } = this.state;
    console.log("allBrand", allBrand);
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Thương hiệu</h1>
            <Link to={`/system/brand/brand-trash`}>
              <span className="btn-add">Thung rac</span>
            </Link>
            <hr style={{ border: "none" }} />
          </section>
          <section className="content-body my-2">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label>
                    <strong>Tên thương hiệu (*)</strong>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nhập tên danh mục"
                    className="form-control"
                    onChange={(event) => this.handleOnChange(event, "name")}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Mô tả</strong>
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    className="form-control"
                    placeholder="Mô tả"
                    onChange={(event) =>
                      this.handleOnChange(event, "description")
                    }
                  ></textarea>
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
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Trạng thái</strong>
                  </label>
                  <select
                    name="status"
                    className="form-control"
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
                    onClick={() => {
                      this.handleSaveBrand();
                    }}
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
                    <button className="btnsearch d-inline">Tìm kiếm</button>
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
                      <th>Tên thương hiệu</th>
                      <th>Tên slug</th>
                      <th className="text-center" style={{ width: "30px" }}>
                        ID
                      </th>
                    </tr>
                  </thead>
                  {allBrand &&
                    allBrand.length > 0 &&
                    allBrand.map((item, index) => {
                      return (
                        <tbody key={index}>
                          <tr className="datarow">
                            <td className="text-center">
                              <input type="checkbox" />
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
                                <a> {item.name} </a>
                              </div>
                              <div className="function_style">
                                {
                                  (toggle = false ? (
                                    <span
                                      className="px-1 text-success"
                                      onClick={() => {
                                        this.handleOnclickToggle();
                                      }}
                                    >
                                      <i className="fa fa-toggle-on"></i>
                                    </span>
                                  ) : (
                                    <span
                                      className="px-1 text-danger"
                                      onClick={() => {
                                        this.handleOnclickToggle();
                                      }}
                                    >
                                      <i className="fa fa-toggle-off"></i>
                                    </span>
                                  ))
                                }
                                <Link
                                  to={`/system/brand/brand-edit`}
                                  className="px-1 text-primary"
                                  s
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <Link
                                  to={`/system/brand/brand-show`}
                                  className="px-1 text-info"
                                  s
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>

                                <span
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
                            <td className="text-center">{item.id}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Brand);
