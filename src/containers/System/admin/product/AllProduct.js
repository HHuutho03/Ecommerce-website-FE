import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProduct, deleteProduct } from "../../../../services/userService";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../../utils";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import Pagination from "../../../HomePage/PageComponent/Pagination";
class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItems: null,
      pageCount: 1,
      itemOffset: 1,
      itemPerPage: 6,
      AllProduct: [],
      name: "",
      description: "",
      slug: "",
      image: "",
      status: "",
      toggle: false,
    };
  }

  componentDidMount() {
    this.handleGetAllProduct();
  }
  handleGetAllProduct = async () => {
    let res = await getAllProduct();

    if (res.errCode === 0) {
      this.setState({
        AllProduct: res.data.reverse(),
      });
    }
  };

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

  handleDeleteProduct = async (brandId) => {
    let res = await deleteProduct(brandId);
    if (res.errCode === 0) {
      toast.success("delete Product successfully");
      this.handleGetAllProduct();
    } else {
      toast.error("delete Product failed");
    }
  };
  buildDataInputSelection = (inputData) => {
    let result = [];
    console.log(inputData.CategoryIdData);
    // if (inputData && inputData.length > 0) {
    //   inputData.map((item, index) => {
    //     let object = {};
    //     object.label = item.name;
    //     object.value = item.id;

    //     result.push(object);
    //   });
    // }
    return result;
  };
  handleGetDataFromParent = (data) => {
    this.setState({ currentItems: data });
  };
  render() {
    let { AllProduct, currentItems, pageCount } = this.state;

    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Sản phẩm</h1>
            <Link to={`/system/product/product-create`}>
              <span className="btn-add">Thêm mới</span>
            </Link>
            <Link to={`/system/product/product-trash`}>
              <span className="btn-add">Thung rac</span>
            </Link>

            <div className="row mt-3 align-items-center">
              <div className="col-6">
                <ul className="manager">
                  <li>
                    <a href="product_index.html">Tất cả (123)</a>
                  </li>
                  <li>
                    <a href="/">Xuất bản (12)</a>
                  </li>
                  <li>
                    <a href="product_trash.html">Rác (12)</a>
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
                  <option value="">Tất cả danh mục</option>
                </select>
                <select name="" className="d-inline me-1">
                  <option value="">Tất cả thương hiệu</option>
                </select>
                <button className="btnfilter">Lọc</button>
              </div>
              <div className="col-md-4 text-end">
                {/* <ReactPaginate
                  breakLabel="..."
                  nextLabel="next >"
                  onPageChange={(event) => {
                    this.handlePageClick(event);
                  }}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination"
                  pageLinkClassName="page-num"
                  previousLinkClassName="page-num"
                  nextLinkClassName="page-num"
                  activeLinkClassName="active"
                /> */}
                <Pagination
                  data={AllProduct}
                  handleGetDataFromParent={this.handleGetDataFromParent}
                />
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
                  <th>Tên sản phẩm</th>
                  <th>Tên danh mục</th>
                  <th>Tên thương hiệu</th>
                  <th>ID</th>
                </tr>
              </thead>
              {currentItems &&
                currentItems.length > 0 &&
                currentItems.map((item, index) => {
                  console.log("currentItems", item.brandIdData.name);
                  return (
                    <tbody>
                      <tr className="datarow">
                        <td>
                          <input type="checkbox" id="checkId" />
                        </td>
                        <td>
                          <img class="img-fluid" src={item.image} alt="image" />
                        </td>
                        <td>
                          <div className="name">
                            <a href="product_edit.html">{item.name}</a>
                          </div>
                          <div className="function_style">
                            <a href="/" className="px-1 text-success">
                              <i className="fa fa-toggle-on"></i>
                            </a>
                            <a
                              href="product_edit.html"
                              className="px-1 text-primary"
                            >
                              <Link
                                to={`/system/product/Product-edit/${item.id}`}
                              >
                                <i className="fa fa-edit"></i>
                              </Link>
                            </a>
                            <a
                              href="product_show.html"
                              className="px-1 text-info"
                            >
                              <Link to={`/system/product/Product-show`}>
                                <i className="fa fa-eye"></i>
                              </Link>
                            </a>
                            <span
                              href="/"
                              className="px-1 text-danger"
                              onClick={() => {
                                this.handleDeleteProduct(item.id);
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </div>
                        </td>
                        <td>{item.CategoryIdData.name}</td>
                        <td>{item.brandIdData.name}</td>
                        <td className="text-center" style={{ width: "30px" }}>
                          1
                        </td>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
