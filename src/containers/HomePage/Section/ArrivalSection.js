import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import cat3 from "../../../assets/images/product-1.jpg";
import { getAllProductTop } from "../../../services/userService";
import { Link } from "react-router-dom";

class ArrivalSection extends Component {
  A;
  constructor(props) {
    super(props);
    this.state = {
      allProduct: [],
    };
  }
  componentDidMount() {
    this.handleGetAllProduct();
  }
  handleGetAllProduct = async () => {
    let res = await getAllProductTop();
    if (res.errCode === 0) {
      this.setState({
        allProduct: res.data.reverse(),
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { allProduct } = this.state;
    return (
      // <section class="section new-arrival">
      //   <div class="title">
      //     <h1>SẢN PHẨM MỚI</h1>
      //     <p>
      //       Tất cả những sản phẩm mới nhất được chọn từ nhà thiết kế của cửa
      //       hàng chúng tôi
      //     </p>
      //   </div>

      //   <div class="product-center">
      //     {allProduct &&
      //       allProduct.length > 0 &&
      //       allProduct.map((item, index) => {
      //         return (
      //           <div class="product-item">
      //             <Link
      //               to={{
      //                 pathname: `/product-detail/id=${item.id}`,
      //                 state: item,
      //               }}
      //             >
      //               <div class="overlay">
      //                 <span class="product-thumb">
      //                   <img src={item.image} alt={"cat3"} />
      //                 </span>
      //               </div>
      //               <div class="product-info">
      //                 <span>{item.name}</span>
      //                 <span>{item.description}</span>
      //                 <div>
      //                   {item &&
      //                   item.productIdSale &&
      //                   item.productIdSale.pricesale !== 0 ? (
      //                     <>
      //                       <span
      //                         style={{
      //                           textDecoration: "line-through",
      //                           float: "left",
      //                           marginRight: "10px",
      //                         }}
      //                       >
      //                         $ {item.price}
      //                       </span>
      //                       <span style={{ color: "#EE4D2D" }}>
      //                         $ {item.productIdSale.pricesale}
      //                       </span>
      //                     </>
      //                   ) : (
      //                     <span
      //                       style={{
      //                         float: "left",
      //                         marginRight: "10px",
      //                       }}
      //                     >
      //                       $ {item.price}
      //                     </span>
      //                   )}
      //                 </div>
      //               </div>
      //               <ul class="icons">
      //                 <li>
      //                   <i class="fa fa-heart" aria-hidden="true"></i>
      //                 </li>
      //                 <li>
      //                   <i class="fa fa-search" aria-hidden="true"></i>
      //                 </li>
      //                 <li>
      //                   <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      //                 </li>
      //               </ul>
      //             </Link>
      //           </div>
      //         );
      //       })}
      //   </div>
      // </section>
      <section class="padding-bottom">
        <header class="section-heading mb-4">
          <h3 class="title-section">Sản phẩm được đề xuất</h3>
        </header>

        <div class="row">
          {allProduct &&
            allProduct.length > 0 &&
            allProduct.map((item, index) => {
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
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArrivalSection));
