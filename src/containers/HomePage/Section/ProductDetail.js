import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import TabHeader from "./TabHeader";
import Footer from "../Footer";
import { getAllProductTopRelation } from "../../../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { productDetail: [], productRelation: [] };
  }
  componentDidMount() {
    let productDetail = this.props.location.state;
    this.setState({ productDetail }, () => {
      this.handleGetAllProductRelation({
        category_id: productDetail.category_id,
        productDetailId: productDetail.id,
      });
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location.state !== prevProps.location.state) {
      let productDetail = this.props.location.state;

      this.setState({ productDetail }, () => {
        this.handleGetAllProductRelation({
          category_id: productDetail.category_id,
          productDetailId: productDetail.id,
        });
      });
    }
  }
  handleGetAllProductRelation = async ({ ...relatedId }) => {
    let res = await getAllProductTopRelation(relatedId);
    if (res.errCode === 0) {
      this.setState({
        productRelation: res.data,
      });
    }
  };
  handleCheckAddCart = (productDetail) => {
    this.props.buyProduct(productDetail);
    toast.success("Đã thêm giỏ hàng");
  };
  render() {
    let { productDetail, productRelation } = this.state;
    return (
      // <div className="component-container">
      //   <TabHeader />
      //   <section className="section product-detail">
      //     <div className="details container">
      //       <div className="left image-container">
      //         <div className="main">
      //           <img src={productDetail.image} id="zoom" alt="" />
      //         </div>
      //       </div>
      //       <div className="right">
      //         <span>{productDetail.name}</span>
      //         <h1>Boy’s T-Shirt By Handsome</h1>
      //         <div>
      //           {productDetail && productDetail.productIdSale && productDetail.productIdSale.pricesale !== 0 ? (
      //             <>
      //               <span
      //                 style={{
      //                   textDecoration: "line-through",
      //                   float: "left",
      //                   marginRight: "10px",
      //                 }}
      //               >
      //                 $ {productDetail.price}
      //               </span>
      //               <span style={{ color: "#EE4D2D" }}>& {productDetail.productIdSale.pricesale}</span>
      //             </>
      //           ) : (
      //             <span
      //               style={{
      //                 float: "left",
      //                 marginRight: "10px",
      //               }}
      //             >
      //               $ {productDetail.price}
      //             </span>
      //           )}
      //         </div>

      //         <form>
      //           <div>
      //             <select>
      //               <option value="Select Size" selected disabled>
      //                 Select Size
      //               </option>
      //               <option value="1">32</option>
      //               <option value="2">42</option>
      //               <option value="3">52</option>
      //               <option value="4">62</option>
      //             </select>
      //             <span>
      //               <i className="bx bx-chevron-down"></i>
      //             </span>
      //           </div>
      //         </form>
      //         <form className="form">
      //           <input type="text" placeholder="1" />
      //           <a
      //             href
      //             onClick={() => {
      //               this.handleCheckAddCart(productDetail);
      //             }}
      //             className="addCart"
      //           >
      //             Add To Cart
      //           </a>
      //         </form>
      //         <h3>Product Detail</h3>
      //         <p>{productDetail.description}</p>
      //       </div>
      //     </div>
      //   </section>

      //   <section className="section featured">
      //     <div className="top container">
      //       <h1>Danh mục liên quan</h1>
      //       <a className="view-more">View more</a>
      //     </div>
      //     <div className="product-center container">
      //       {productRelation &&
      //         productRelation.length > 0 &&
      //         productRelation.map((item, index) => {
      //           return (
      //             <div
      //               className="product-item"
      //               onClick={() => {
      //                 this.handleGetAllProductRelation({
      //                   category_id: item.category_id,
      //                   productDetailId: item.id,
      //                 });
      //               }}
      //             >
      //               <Link
      //                 to={{
      //                   pathname: `/product-detail/id=${item.id}`,
      //                   state: item,
      //                 }}
      //               >
      //                 <div className="overlay">
      //                   <span className="product-thumb">
      //                     <img src={item.image} alt="" />
      //                   </span>
      //                 </div>
      //                 <div className="product-info">
      //                   <span>{item.name}</span>
      //                   <span>Concepts Solid Pink Men’s Polo</span>
      //                   <div>
      //                     {item && item.productIdSale && item.productIdSale.pricesale !== 0 ? (
      //                       <>
      //                         <span
      //                           style={{
      //                             textDecoration: "line-through",
      //                             float: "left",
      //                             marginRight: "10px",
      //                           }}
      //                         >
      //                           $ {item.price}
      //                         </span>
      //                         <span style={{ color: "#EE4D2D" }}>$ {item.productIdSale.pricesale}</span>
      //                       </>
      //                     ) : (
      //                       <span
      //                         style={{
      //                           float: "left",
      //                           marginRight: "10px",
      //                         }}
      //                       >
      //                         $ {item.price}
      //                       </span>
      //                     )}
      //                   </div>
      //                 </div>
      //                 <ul className="icons">
      //                   <li>
      //                     <i className="fa fa-heart"></i>
      //                   </li>
      //                   <li>
      //                     <i className="fa fa-search"></i>
      //                   </li>
      //                   <li>
      //                     <i className="fa fa-shopping-cart"></i>
      //                   </li>
      //                 </ul>
      //               </Link>
      //             </div>
      //           );
      //         })}
      //     </div>
      //   </section>
      //   <Footer />
      // </div>
      <>
        <TabHeader />
        <div class="row">
          <aside class="col-md-6">
            <div class="card">
              <article class="gallery-wrap">
                <div class="img-big-wrap">
                  <div>
                    <a href="#">
                      <img src={productDetail.image} />
                    </a>
                  </div>
                </div>
                {/* <div class="thumbs-wrap">
                  <a href="#" class="item-thumb">
                    {" "}
                    <img src="images/items/15.jpg" />
                  </a>
                  <a href="#" class="item-thumb">
                    {" "}
                    <img src="images/items/15-1.jpg" />
                  </a>
                  <a href="#" class="item-thumb">
                    {" "}
                    <img src="images/items/15-2.jpg" />
                  </a>
                  <a href="#" class="item-thumb">
                    {" "}
                    <img src="images/items/15-1.jpg" />
                  </a>
                </div> */}
              </article>
            </div>
          </aside>
          <main class="col-md-6">
            <article class="product-info-aside">
              <h2 class="title mt-3">Hot sale unisex New Design Shoe </h2>

              <div class="rating-wrap my-3">
                <ul class="rating-stars">
                  <li style={{ width: "80%" }} class="stars-active">
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </li>
                  <li>
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </li>
                </ul>
                <small class="label-rating text-muted">132 reviews</small>
                <small class="label-rating text-success">
                  {" "}
                  <i class="fa fa-clipboard-check"></i> 154 orders{" "}
                </small>
              </div>

              <div class="mb-3">
                {productDetail &&
                productDetail.productIdSale &&
                productDetail.productIdSale.pricesale !== 0 ? (
                  <>
                    <var
                      style={{
                        float: "left",
                        marginRight: "10px",
                      }}
                      class="price h4"
                    >
                      VND {productDetail.productIdSale.pricesale}
                    </var>
                    <span
                      class="text-muted"
                      style={{
                        color: "#EE4D2D",
                        textDecoration: "line-through",
                      }}
                    >
                      VND {productDetail.price}
                    </span>
                  </>
                ) : (
                  <var
                    style={{
                      float: "left",
                      marginRight: "10px",
                    }}
                    class="price h4"
                  >
                    USD {productDetail.price}
                  </var>
                )}
              </div>

              <p>{productDetail.description}</p>

              <dl class="row">
                <dt class="col-sm-3">Manufacturer</dt>
                <dd class="col-sm-9">
                  <a href="#">Great textile Ltd.</a>
                </dd>

                <dt class="col-sm-3">Article number</dt>
                <dd class="col-sm-9">596 065</dd>

                <dt class="col-sm-3">Guarantee</dt>
                <dd class="col-sm-9">2 year</dd>

                <dt class="col-sm-3">Delivery time</dt>
                <dd class="col-sm-9">3-4 days</dd>

                <dt class="col-sm-3">Availabilty</dt>
                <dd class="col-sm-9">in Stock</dd>
              </dl>

              <div class="form-row  mt-4">
                <div class="form-group col-md flex-grow-0">
                  <div class="input-group mb-3 input-spinner">
                    <div class="input-group-prepend">
                      <button
                        class="btn btn-light"
                        type="button"
                        id="button-plus"
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                    <input type="text" class="form-control" value="1"></input>
                    <div class="input-group-append">
                      <button
                        class="btn btn-light"
                        type="button"
                        id="button-minus"
                      >
                        {" "}
                        &minus;{" "}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md">
                  <span
                    class="btn  btn-primary"
                    onClick={() => {
                      this.handleCheckAddCart(productDetail);
                    }}
                  >
                    <i class="fas fa-shopping-cart"></i>{" "}
                    <span class="text">Add to cart</span>
                  </span>
                  <a href="#" class="btn btn-light">
                    <i class="fas fa-envelope"></i>{" "}
                    <span class="text">Contact supplier</span>
                  </a>
                </div>
              </div>
            </article>
          </main>
        </div>
        <section class="padding-bottom">
          <header class="section-heading mb-4">
            <h3 class="title-section">Sản phẩm liên quan</h3>
          </header>

          <div class="row">
            {productRelation &&
              productRelation.length > 0 &&
              productRelation.map((item, index) => {
                return (
                  <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                    <div
                      class="card card-product-grid"
                      onClick={() => {
                        this.handleGetAllProductRelation({
                          category_id: item.category_id,
                          productDetailId: item.id,
                        });
                      }}
                    >
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
                              <img
                                src="images/icons/starts-disable.svg"
                                alt=""
                              />
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

                          {item &&
                          item.productIdSale &&
                          item.productIdSale.pricesale !== 0 ? (
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
                              <div
                                class="price h5 mt-2"
                                style={{ color: "#EE4D2D" }}
                              >
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
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfoClint: state.user.userInfoClint,
    cart: state.admin.cartAr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyProduct: (product_current) =>
      dispatch(actions.buyProduct(product_current)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
