import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPost, deletePost } from "../../../../services/userService";
import { toast } from "react-toastify";

class AllPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPost: [],
    };
  }
  async componentDidMount() {
    this.handleGetAllBrand();
  }
  handleGetAllBrand = async () => {
    let res = await getAllPost();
    if (res.errCode === 0) {
      this.setState({
        allPost: res.data.reverse(),
      });
    }
  };
  handleDeleteBrand = async (brandId) => {
    console.log("brandId", brandId);
    let res = await deletePost(brandId);
    if (res.errCode === 0) {
      toast.success("delete Post successfully");
      this.handleGetAllBrand();
    } else {
      toast.error("delete Post failed");
    }
  };
  render() {
    let { allPost } = this.state;
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Quản lý bài viết</h1>
            <Link to={`/system/post/post-create`}>
              <span href="post_create.html" className="btn-add">
                Thêm mới
              </span>
            </Link>

            <div className="row mt-3 align-items-center">
              <div className="col-6">
                <ul className="manager">
                  <li>
                    <a href="post_index.html">Tất cả (123)</a>
                  </li>
                  <li>
                    <a href="/">Xuất bản (12)</a>
                  </li>
                  <li>
                    <a href="post_trash.html">Rác (12)</a>
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
                  <option value="">Chủ đề</option>
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
                  <th>Tiêu đề bài viết</th>
                  <th>Tên chủ đề</th>
                  <th className="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              {allPost &&
                allPost.length > 0 &&
                allPost.map((item, index) => {
                  return (
                    <tbody>
                      <tr className="datarow">
                        <td>
                          <input type="checkbox" id="checkId"></input>
                        </td>
                        <td>
                          <img
                            className="img-fluid"
                            src={item.image}
                            alt="post.jpg"
                          />
                        </td>
                        <td>
                          <div className="name">
                            <a href="post_edit.html">{item.title}</a>
                          </div>
                          <div className="function_style">
                            <a href="/" className="text-success mx-1">
                              <i className="fa fa-toggle-on"></i>
                            </a>
                            <a
                              href="post_edit.html"
                              className="text-primary mx-1"
                            >
                              <Link to={`/system/post/post-edit`}>
                                <i className="fa fa-edit"></i>
                              </Link>
                            </a>
                            <a href="post_show.html" className="text-info mx-1">
                              <Link to={`/system/post/post-show`}>
                                <i className="fa fa-eye"></i>
                              </Link>
                            </a>
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
                        <td>{item.TopicIdData.name}</td>
                        <td className="text-center">1</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllPost);
