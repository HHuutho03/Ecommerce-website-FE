import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../../utils";
import { saveProduct } from "../../../../services/userService";
class ProductCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resBrand: [],
      resCategory: [],
      selectedBrand: "",
      selectedCategory: "",
      name: "",
      description: "",
      detail: "",
      image: "",
      price: "",
      number: "",
      pricesale: "",
    };
  }

  async componentDidMount() {
    this.props.fetchAllInfoRedux();
    let { resBrand, resTrademark } = this.props.AllInfoRedux;
    let resBrandInfo = this.buildDataInputSelection(resBrand);
    let resTrademarkInfo = this.buildDataInputSelection(resTrademark);
    this.setState({
      resBrand: resBrandInfo,
      resCategory: resTrademarkInfo,
    });
  }
  buildDataInputSelection = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.name;
        object.value = item.id;

        result.push(object);
      });
    }
    return result;
  };
  handleChangeInfo = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({ ...stateCopy });
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
  handleSaveBrand = async () => {
    let res = await saveProduct({
      name: this.state.name,
      category_id: this.state.selectedCategory.value,
      brand_id: this.state.selectedBrand.value,
      detail: this.state.detail,
      slug: this.state.name,
      price: this.state.price,
      description: this.state.description,
      image: this.state.image,
      status: this.state.status,
      number: this.state.number,
      pricesale: this.state.pricesale,
    });
    if (res && res.errCode === 0) {
      toast.success("save product successfully");
    } else {
      toast.error("save product failed");
    }
  };
  render() {
    return (
      <div className="col-md-10">
        <div className="content">
          <section className="content-header my-2">
            <h1 className="d-inline">Thêm sản phẩm</h1>
            <div className="mt-1 text-end">
              <a className="btn btn-sm btn-primary" href="product_index.html">
                <i className="fa fa-arrow-left"></i> Về danh sách
              </a>
            </div>
          </section>
          <section className="content-body my-2">
            <div className="row">
              <div className="col-md-9">
                <div className="mb-3">
                  <label>
                    <strong>Tên sản phẩm (*)</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    name="name"
                    className="form-control"
                    onChange={(event) => this.handleOnChange(event, "name")}
                  />
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Chi tiết (*)</strong>
                  </label>
                  <textarea
                    name="detail"
                    placeholder="Nhập chi tiết sản phẩm"
                    rows="7"
                    className="form-control"
                    onChange={(event) => this.handleOnChange(event, "detail")}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Mô tả (*)</strong>
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Nhập mô tả"
                    onChange={(event) =>
                      this.handleOnChange(event, "description")
                    }
                  ></textarea>
                </div>
              </div>
              <div className="col-md-3">
                <div className="box-container mt-4 bg-white">
                  <div className="box-header py-1 px-2 border-bottom"></div>
                  <div className="box-body p-2 border-bottom">
                    <select
                      name="c"
                      className="form-select"
                      onChange={(event) => this.handleOnChange(event, "status")}
                    >
                      <option value="1">Xuất bản</option>
                      <option value="2">Chưa xuất bản</option>
                    </select>
                  </div>
                  <div className="box-footer text-end px-2 py-2">
                    <button
                      type="submit"
                      className="btn btn-success btn-sm text-end"
                      onClick={() => {
                        this.handleSaveBrand();
                      }}
                    >
                      <i className="fa fa-save" aria-hidden="true"></i> Đăng
                    </button>
                  </div>
                </div>
                <div className="box-container mt-2 bg-white">
                  <div className="box-header py-1 px-2 border-bottom">
                    <strong>Danh mục(*)</strong>
                  </div>
                  <div className="box-body p-2 border-bottom">
                    <Select
                      lassName="form-select"
                      // value={this.state.resCategory}
                      onChange={this.handleChangeInfo}
                      options={this.state.resCategory}
                      placeholder="Chọn danh mục"
                      name="selectedCategory"
                    />
                  </div>
                </div>
                <div className="box-container mt-2 bg-white">
                  <div className="box-header py-1 px-2 border-bottom">
                    <strong>Thương hiệu(*)</strong>
                  </div>
                  <div className="box-body p-2 border-bottom">
                    <Select
                      lassName="form-select"
                      // value={this.state.resCategory}
                      onChange={this.handleChangeInfo}
                      options={this.state.resBrand}
                      placeholder="Chọn danh mục"
                      name="selectedBrand"
                    />
                  </div>
                </div>
                <div className="box-container mt-2 bg-white">
                  <div className="box-header py-1 px-2 border-bottom">
                    <strong>Giá và số lượng</strong>
                  </div>
                  <div className="box-body p-2 border-bottom">
                    <div className="mb-3">
                      <label>
                        <strong>Giá bán (*)</strong>
                      </label>
                      <input
                        type="number"
                        min="10000"
                        name="price"
                        className="form-control"
                        placeholder="10000"
                        onChange={(event) =>
                          this.handleOnChange(event, "price")
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label>
                        <strong>Giá khuyến mãi (*)</strong>
                      </label>
                      <input
                        type="number"
                        min="10000"
                        name="pricesale"
                        className="form-control"
                        placeholder="10000"
                        onChange={(event) =>
                          this.handleOnChange(event, "pricesale")
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label>
                        <strong>Số lượng (*)</strong>
                      </label>
                      <input
                        type="number"
                        min="1"
                        name="qty"
                        className="form-control"
                        placeholder="10"
                        onChange={(event) =>
                          this.handleOnChange(event, "number")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="box-container mt-2 bg-white">
                  <div className="box-header py-1 px-2 border-bottom">
                    <strong>Hình đại diện(*)</strong>
                  </div>
                  <div className="box-body p-2 border-bottom">
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={(event) => this.handleGetFile(event)}
                    />
                  </div>
                </div>
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
    AllInfoRedux: state.admin.AllInfoState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllInfoRedux: () => dispatch(actions.fetchAllInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreate);
