import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import TabHeader from "../Section/TabHeader";
import Footer from "../Footer";
import { getAllProduct } from "../../../services/userService";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import Sidebar from "../Section/Sidebar";
import Loader from "./Loader/Loader";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { allProduct: [], currentItems: null, selectedPrice: "" };
  }
  async componentDidMount() {
    this.handleGetAllProduct();
  }
  handleGetAllProduct = async () => {
    let res = await getAllProduct();
    if (res.errCode === 0) {
      this.setState({
        allProduct: res.data.reverse(),
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleGetDataFromParent = (data) => {
    this.setState({ currentItems: data });
  };
  filterAndSortProductsByPrice = (products) => {
    return products
      .filter((product) => typeof product.price === "number") // Optional: Filter out items without a valid price
      .sort((a, b) => a.price - b.price);
  };
  filterAndLowProductsByPrice = (products) => {
    return products
      .filter((product) => typeof product.price === "number") // Optional: Filter out items without a valid price
      .sort((a, b) => b.price - a.price);
  };
  filterAndSaleProductsByPrice = (products) => {
    console.log("productsPrice", products.productIdSale);
    return products.filter((product) => product.productIdSale.pricesale > 0);
  };

  handleOnChange = (event) => {
    let products = this.state.allProduct;
    let selectPrice = event.target.value;
    if (products && products.length > 0) {
      if (selectPrice === "0") {
        const sortedProducts = this.filterAndSortProductsByPrice(products);
        this.setState({ allProduct: sortedProducts });
      } else if (selectPrice === "1") {
        const sortedProducts = this.filterAndLowProductsByPrice(products);
        this.setState({ allProduct: sortedProducts });
      }
      if (selectPrice === "2") {
        const sortedProducts = this.filterAndSaleProductsByPrice(products);
        this.setState({ allProduct: sortedProducts.reverse() });
      }
    }
  };
  render() {
    let { allProduct, currentItems } = this.state;
    console.log("allProduct", allProduct);
    return (
      <div className="component-container">
        <TabHeader />
        {/* <section className="section all-products" id="products">
          <div className="top container">
            <h1>Tất cả sản phẩm</h1>
            <form>
              <select
                onChange={(event) => {
                  this.handleOnChange(event);
                }}
              >
                <option value="3">tìm sản phẩm</option>
                <option value="0">tìm theo [giá từ thâp đến cao]</option>
                <option value="1">tìm theo [giá từ cao đến thấp]</option>
                <option value="2">tìm theo sản phẩm có giảm giá</option>
              </select>
              <span>
                <i
                  className="fa fa-angle-down"
                  style={{ transform: "translateY(-80%)" }}
                ></i>
              </span>
            </form>
          </div>
          <div className="product-center container">
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((item, index) => {
                return (
                  <div className="product-item">
                    <Link
                      to={{
                        pathname: `/product-detail/id=${item.id}`,
                        state: item,
                      }}
                    >
                      <div className="overlay">
                        <span className="product-thumb">
                          <img src={item.image} alt="" />
                        </span>
                      </div>
                      <div className="product-info">
                        <span>{item.name}</span>
                        <span>{item.description}</span>
                        <div>
                          {item &&
                          item.productIdSale &&
                          item.productIdSale.pricesale !== 0 ? (
                            <>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  float: "left",
                                  marginRight: "10px",
                                }}
                              >
                                $ {item.price}
                              </span>
                              <span style={{ color: "#EE4D2D" }}>
                                {item.productIdSale.pricesale}
                              </span>
                            </>
                          ) : (
                            <span
                              style={{
                                float: "left",
                                marginRight: "10px",
                              }}
                            >
                              $ {item.price}
                            </span>
                          )}
                        </div>
                      </div>
                      <ul className="icons">
                        <li>
                          <i className="fa fa-heart"></i>
                        </li>
                        <li>
                          <i className="fa fa-search"></i>
                        </li>
                        <li
                          onClick={() => {
                            this.props.buyProduct(item);
                          }}
                        >
                          <i className="fa fa-cart-arrow-down"></i>
                        </li>
                      </ul>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section> */}
        <section class="section-content padding-y">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-2"> Your are here: </div>
                <nav class="col-md-8">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">Category name</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">Sub category</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Items
                    </li>
                  </ol>
                </nav>
              </div>
              <hr></hr>

              <div class="row">
                <div class="col-md-2">Filter by</div>
                <div class="col-md-10">
                  <ul class="list-inline">
                    <li class="list-inline-item mr-3 dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        Supplier type
                      </a>
                      <div class="dropdown-menu p-3" style={{ maxWidth: "400px" }}>
                        <label class="form-check">
                          <input type="radio" name="myfilter" class="form-check-input"></input> Good supplier
                        </label>
                        <label class="form-check">
                          <input type="radio" name="myfilter" class="form-check-input"></input> Best supplier
                        </label>
                        <label class="form-check">
                          <input type="radio" name="myfilter" class="form-check-input"></input> New supplier
                        </label>
                      </div>
                    </li>
                    <li class="list-inline-item mr-3 dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        Country
                      </a>
                      <div class="dropdown-menu p-3">
                        <label class="form-check">
                          <input type="checkbox" class="form-check-input"></input> China
                        </label>
                        <label class="form-check">
                          <input type="checkbox" class="form-check-input"></input> Japan
                        </label>
                        <label class="form-check">
                          <input type="checkbox" class="form-check-input"></input> Uzbekistan
                        </label>
                        <label class="form-check">
                          <input type="checkbox" class="form-check-input"></input> Russia
                        </label>
                      </div>
                    </li>
                    <li class="list-inline-item mr-3 dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        Feature
                      </a>
                      <div class="dropdown-menu">
                        <a href="" class="dropdown-item">
                          Anti backterial
                        </a>
                        <a href="" class="dropdown-item">
                          With buttons
                        </a>
                        <a href="" class="dropdown-item">
                          Extra safety
                        </a>
                      </div>
                    </li>
                    <li class="list-inline-item mr-3">
                      <a href="#">Color</a>
                    </li>
                    <li class="list-inline-item mr-3">
                      <a href="#">Size</a>
                    </li>
                    <li class="list-inline-item mr-3">
                      <div class="form-inline">
                        <label class="mr-2">Price</label>
                        <input class="form-control form-control-sm" placeholder="Min" type="number"></input>
                        <span class="px-2"> - </span>
                        <input class="form-control form-control-sm" placeholder="Max" type="number"></input>
                        <button type="submit" class="btn btn-sm btn-light ml-2">
                          Ok
                        </button>
                      </div>
                    </li>
                    <li class="list-inline-item mr-3">
                      <label class="custom-control mt-1 custom-checkbox">
                        <input type="checkbox" class="custom-control-input"></input>
                        <div class="custom-control-label">Ready to ship</div>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <header class="mb-3">
            <div class="form-inline">
              <strong class="mr-md-auto">32 Items found </strong>
              <select class="mr-2 form-control" onChange={this.handleOnChange}>
                <option>Chọn giá phù hợp</option>
                <option value={0}>Giá từ thấp lên cao</option>
                <option value={1}>Giá từ cao xuống thấp</option>
              </select>
              <div class="btn-group">
                <a href="page-listing-grid.html" class="btn btn-light active" data-toggle="tooltip" title="List view">
                  <i class="fa fa-bars"></i>
                </a>
                <a href="page-listing-large.html" class="btn btn-light" data-toggle="tooltip" title="Grid view">
                  <i class="fa fa-th"></i>
                </a>
              </div>
            </div>
          </header>
          <div class="row">
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((item, index) => {
                return (
                  <div class="col-md-3">
                    <Link
                      to={{
                        pathname: `/product-detail/id=${item.id}`,
                        state: item,
                      }}
                    >
                      <figure class="card card-product-grid">
                        <div class="img-wrap">
                          <img src={item.image} />
                        </div>
                        <figcaption class="info-wrap">
                          <a href="#" class="title mb-2">
                            {item.description}
                          </a>
                          <div class="price">
                            {item && item.productIdSale && item.productIdSale.pricesale !== 0 ? (
                              <>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                >
                                  $ {item.price}
                                </span>
                                <span style={{ color: "#EE4D2D" }}>{item.productIdSale.pricesale}</span>
                              </>
                            ) : (
                              <span
                                style={{
                                  float: "left",
                                  marginRight: "10px",
                                }}
                              >
                                $ {item.price}
                              </span>
                            )}
                            <small class="text-muted">/per bag</small>
                          </div>

                          <p class="mb-2">
                            {" "}
                            2 Pieces <small class="text-muted">(Min Order)</small>
                          </p>

                          <p class="text-muted ">Guangzhou Yichuang Electronic Co</p>

                          <hr></hr>

                          <p class="mb-3">
                            <span class="tag">
                              {" "}
                              <i class="fa fa-check"></i> Verified
                            </span>
                            <span class="tag"> 4 Years </span>
                            <span class="tag"> 60 reviews </span>
                            <span class="tag"> China </span>
                          </p>

                          <label class="custom-control mb-3 custom-checkbox">
                            <input type="checkbox" class="custom-control-input"></input>
                            <div class="custom-control-label">Add to compare</div>
                          </label>

                          <a href="#" class="btn btn-outline-primary">
                            {" "}
                            <i class="fa fa-envelope"></i> Contact supplier{" "}
                          </a>
                        </figcaption>
                      </figure>
                    </Link>
                  </div>
                );
              })}
          </div>
        </section>
        <Pagination className="pagination" data={allProduct} handleGetDataFromParent={this.handleGetDataFromParent} />
        <Sidebar />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.admin.cartAr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyProduct: (product_current) => dispatch(actions.buyProduct(product_current)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
