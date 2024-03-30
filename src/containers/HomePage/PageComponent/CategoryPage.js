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

class CategoryPage extends Component {
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
      this.setState(
        {
          allProduct: res.data,
        },
        () => {
          let allProduct = this.state.allProduct;
          if (allProduct && allProduct.length > 0) {
            let category = this.filterProductsByCategory(allProduct, this.props.location.state);
            this.setState({
              allProduct: category,
            });
          }
        }
      );
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.state !== this.props.location.state) {
      this.handleGetAllProduct();
    }
  }
  handleGetDataFromParent = (data) => {
    this.setState({ currentItems: data });
  };
  filterAndSortProductsByPrice = (products) => {
    return products.filter((product) => typeof product.price === "number").sort((a, b) => a.price - b.price);
  };
  filterAndLowProductsByPrice = (products) => {
    return products.filter((product) => typeof product.price === "number").sort((a, b) => b.price - a.price);
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
    }
  };

  filterProductsByCategory = (allProduct, targetCategory) => {
    return allProduct.filter((product, index) => allProduct[index].CategoryIdData.name === targetCategory);
  };
  render() {
    let { allProduct, currentItems } = this.state;
    return (
      <div className="component-container">
        <TabHeader />

        <section className="section all-products" id="products">
          <section class="padding-bottom">
            <header class="section-heading mb-4">
              <h3 class="title-section">Sản phẩm theo danh mục</h3>
            <select class="mr-2 form-control" onChange={this.handleOnChange}>
                <option>Chọn giá phù hợp</option>
                <option value={0}>Giá từ thấp lên cao</option>
                <option value={1}>Giá từ cao xuống thấp</option>
              </select>
            </header>
            <div class="row">
              {currentItems &&
                currentItems.length > 0 &&
                currentItems.map((item, index) => {
                  return (
                    <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                      <div class="card card-product-grid">
                        <Link
                          to={{
                            pathname: `/product-detail/id=${item.id}`,
                            state: item,
                          }}
                        >
                          <a href="#" class="img-wrap">
                            <img src={item.image} />{" "}
                          </a>
                          <figcaption class="info-wrap">
                            <ul class="rating-stars mb-1">
                              <li style={{ width: "80%" }} class="stars-active">
                                <img src="images/icons/stars-active.svg" alt="" />
                              </li>
                              <li>
                                <img src="images/icons/starts-disable.svg" alt="" />
                              </li>
                            </ul>
                            <div>
                              <a href="#" class="text-muted">
                                {item.name}
                              </a>
                              <a href="#" class="title">
                                {item.description}
                              </a>
                            </div>

                            {item && item.productIdSale && item.productIdSale.pricesale !== 0 ? (
                              <>
                                <div
                                  class="price h5 mt-2"
                                  style={{
                                    textDecoration: "line-through",
                                    float: "left",
                                    marginRight: "10px",
                                  }}
                                >
                                  $ {item.price}
                                </div>
                                <div class="price h5 mt-2" style={{ color: "#EE4D2D" }}>
                                  $ {item.productIdSale.pricesale}
                                </div>
                              </>
                            ) : (
                              <div class="price h5 mt-2">$ {item.price}</div>
                            )}
                          </figcaption>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryPage));
