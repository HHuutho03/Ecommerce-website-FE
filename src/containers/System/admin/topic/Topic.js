import React, { Component } from "react";
import { connect } from "react-redux";
import {
  saveTopic,
  getAllTopic,
  deleteTopic,
} from "../../../../services/userService";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTopic: [],
      name: "",
      description: "",
      status: "",
    };
  }
  async componentDidMount() {
    this.handleGetAllTrademark();
  }
  handleGetAllTrademark = async () => {
    let res = await getAllTopic();
    if (res.errCode === 0) {
      this.setState({
        allTopic: res.data.reverse(),
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

  saveTopic = async () => {
    let res = await saveTopic({
      name: this.state.name,
      slug: this.state.name,
      description: this.state.description,
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
    let res = await deleteTopic(brandId);
    if (res.errCode === 0) {
      toast.success("delete topic successfully");
      this.handleGetAllTrademark();
    } else {
      toast.error("delete topic failed");
    }
  };
  render() {
    let { allTopic } = this.state;

    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Chủ đề bài viết</h1>
            <hr style={{ border: "none " }} />
          </section>
          <section className="content-body my-2">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label>
                    <strong>Tên chủ đề (*)</strong>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Tên chủ để"
                    onChange={(event) => this.handleOnChange(event, "name")}
                  ></input>
                </div>
                <div className="mb-3">
                  <label>
                    <strong>
                      <strong>Mô tả</strong>
                    </strong>
                  </label>
                  <textarea
                    name="description"
                    rows="6"
                    className="form-control"
                    placeholder="Mô tả"
                    onChange={(event) =>
                      this.handleOnChange(event, "description")
                    }
                  ></textarea>
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
                    className="btn btn-sm btn-success"
                    type="submit"
                    name="THEM"
                    onClick={() => this.saveTopic()}
                  >
                    <i className="fa fa-save"></i> Lưu[Cập nhật]
                  </button>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row mt-3 align-items-center">
                  <div className="col-12">
                    <ul className="manager">
                      <li>
                        <a href="brand_index.html">Tất cả (123)</a>
                      </li>
                      <li>
                        <a href="/">Xuất bản (12)</a>
                      </li>
                      <li>
                        <a href="brand_trash.html">Rác (12)</a>
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
                    <button className="d-inline">Tìm kiếm</button>
                  </div>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: "30px" }}>
                        <input type="checkbox" id="checkboxAll" />
                      </th>
                      <th>Tên chủ đề</th>
                      <th>Tên slug</th>
                      <th className="text-center" style={{ width: "30px" }}>
                        ID
                      </th>
                    </tr>
                  </thead>
                  {allTopic &&
                    allTopic.length > 0 &&
                    allTopic.map((item, index) => {
                      return (
                        <tbody key={index}>
                          <tr className="datarow">
                            <td>
                              <input type="checkbox" id="checkId" />
                            </td>
                            <td>
                              <div className="name">
                                <a href="topic_edit.html">{item.name}</a>
                              </div>
                              <div className="function_style">
                                <a href="/" className="text-success mx-1">
                                  <i className="fa fa-toggle-on"></i>
                                </a>
                                <Link
                                  to={`/system/topic/topic-edit`}
                                  className="text-primary mx-1"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>

                                <Link
                                  to={`/system/topic/topic-show`}
                                  className="text-primary mx-1"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>

                                <span
                                  href="/"
                                  className="text-danger mx-1"
                                  onClick={() => {
                                    this.handleDeleteBrand(item.id);
                                  }}
                                >
                                  <i className="fa fa-trash"></i>
                                </span>
                              </div>
                            </td>
                            <td>{item.slug}</td>
                            <td className="text-center">1</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
