import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import cat3 from "../../../assets/images/logobrabk.png";
import logo from "../../../assets/img/logo.png";
import { getAllTrademark, getAllBrand } from "../../../services/userService";
import "../../../assets/js/script";

import * as actions from "../../../store/actions";

class TabHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", allTrademark: [], allBrand: [] };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleRedirectCart = () => {
    this.props.history.push("/product-cart");
  };
  returnHomePage = () => {
    this.props.processLogout();
    this.props.history.push("/home");
  };
  async componentDidMount() {
    this.handleGetAllTrademark();
  }
  handleGetAllTrademark = async () => {
    let res = await getAllTrademark();
    let resBrand = await getAllBrand();
    if (res.errCode === 0 && resBrand.errCode === 0) {
      this.setState({
        allTrademark: res.data.reverse(),
        allBrand: resBrand.data.reverse(),
      });
    }
  };
  handleSearchTerm = (e) => {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value,
    });
  };
  handleOnchangeTradmark = (event) => {
    let brand = event.target.value;
    let path = `/category/${brand}`;
    this.props.history.push(path, brand);
  };
  handleOnchange = (event) => {
    let brand = event.target.value;
    let path = `/brand/${brand}`;
    this.props.history.push(path, brand);
  };
  render() {
    let { userInfoClint } = this.props;
    let { allBrand, allTrademark } = this.state;
    return (
      // <>
      //   <div className="top-nav">
      //     <div className="container d-flex">
      //       <p>Order Online Or Call Us: (001) 2222-55555</p>
      //       <ul className="d-flex">
      //         <li>
      //           <a>About Us</a>
      //         </li>
      //         <li>
      //           <a>FAQ</a>
      //         </li>
      //         <li>
      //           <a>Contact</a>
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      //   <div className="navigation">
      //     <div className="nav-center container d-flex">
      //       <div className="icon" onClick={() => this.props.sideBarOn()}>
      //         <i className="fas fa-bars"></i>
      //       </div>

      //       <Link className="logo" to={`/home`}>
      //         <h1>Dans</h1>
      //         <img src={cat3} alt={"cat3"} className="logo-img" />
      //       </Link>

      //       <ul className="nav-list d-flex">
      //         <li className="nav-item">
      //           <Link className="nav-link" to={`/home`}>
      //             Home
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to={`/product`}>
      //             Shop
      //           </Link>
      //         </li>

      //         <li className="nav-item">
      //           <Link className="nav-link" to={`/about`}>
      //             About
      //           </Link>
      //         </li>
      //         <li className="nav-item">
      //           <Link className="nav-link" to={`/contract`}>
      //             Contact
      //           </Link>
      //         </li>
      //       </ul>
      //       <div class="search-box">
      //         {this.state.searchTerm.length > 0 ? (
      //           <Link
      //             to={{
      //               pathname: `/search/${this.state.searchTerm}`,
      //               state: this.state.searchTerm,
      //             }}
      //           >
      //             <button class="btn-search">
      //               <i class="fas fa-search"></i>
      //             </button>
      //           </Link>
      //         ) : (
      //           <button class="btn-search">
      //             <i class="fas fa-search"></i>
      //           </button>
      //         )}

      //         <input
      //           type="text"
      //           class="input-search"
      //           placeholder="Type to Search..."
      //           onChange={(e) => {
      //             this.handleSearchTerm(e);
      //           }}
      //         ></input>
      //       </div>

      //       <div className="icons d-flex">
      //         <span
      //           className="icon icon-shopping-show"
      //           onClick={() => this.handleRedirectCart()}
      //         >
      //           <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      //           <span className="d-flex">{this.props.cart.length}</span>
      //         </span>
      //         <div class="header__cart-list">
      //           <img
      //             src="./assets/img/no_cart.png"
      //             alt=""
      //             class="header__cart-no-cart-img"
      //           />
      //           <span class="header__cart-list-no-cart-msg">
      //             Chưa có sản phẩm
      //           </span>

      //           <h4 class="header__cart-heading">Sản phẩm đã thêm</h4>
      //           <ul class="header__cart-list-item">
      //             <li class="header__cart-item">
      //               <img
      //                 src="https://img.tickid.vn/photos/resized/320x/83-1580888419-myphamohui-lgvina.png"
      //                 alt=""
      //                 class="header__cart-img"
      //               />
      //               <div class="header__cart-item-info">
      //                 <div class="header__cart-item-head">
      //                   <h5 class="header__cart-item-name">
      //                     Bộ kem đặc trị vùng mắt
      //                   </h5>
      //                   <div class="header__cart-item-price-wrap">
      //                     <span class="header__cart-item-price">
      //                       2.000.000đ
      //                     </span>
      //                     <span class="header__cart-item-multiply">x</span>
      //                     <span class="header__cart-item-qnt">2</span>
      //                   </div>
      //                 </div>
      //                 <div class="header__cart-item-body">
      //                   <span class="header__cart-item-description">
      //                     Phân loại: Bạc
      //                   </span>
      //                   <span class="header__cart-item-remove">Xóa</span>
      //                 </div>
      //               </div>
      //             </li>
      //             <li class="header__cart-item">
      //               <img
      //                 src="https://img.tickid.vn/photos/resized/320x/83-1580888419-myphamohui-lgvina.png"
      //                 alt=""
      //                 class="header__cart-img"
      //               />
      //               <div class="header__cart-item-info">
      //                 <div class="header__cart-item-head">
      //                   <h5 class="header__cart-item-name">
      //                     Bộ kem đặc trị vùng mắt
      //                   </h5>
      //                   <div class="header__cart-item-price-wrap">
      //                     <span class="header__cart-item-price">
      //                       2.000.000đ
      //                     </span>
      //                     <span class="header__cart-item-multiply">x</span>
      //                     <span class="header__cart-item-qnt">2</span>
      //                   </div>
      //                 </div>
      //                 <div class="header__cart-item-body">
      //                   <span class="header__cart-item-description">
      //                     Phân loại: Bạc
      //                   </span>
      //                   <span class="header__cart-item-remove">Xóa</span>
      //                 </div>
      //               </div>
      //             </li>
      //             <li class="header__cart-item">
      //               <img
      //                 src="https://img.tickid.vn/photos/resized/320x/83-1580889448-myphamohui-lgvina.png"
      //                 alt=""
      //                 class="header__cart-img"
      //               />
      //               <div class="header__cart-item-info">
      //                 <div class="header__cart-item-head">
      //                   <h5 class="header__cart-item-name">
      //                     Bộ kem đặc trị vùng mắt
      //                   </h5>
      //                   <div class="header__cart-item-price-wrap">
      //                     <span class="header__cart-item-price">
      //                       2.000.000đ
      //                     </span>
      //                     <span class="header__cart-item-multiply">x</span>
      //                     <span class="header__cart-item-qnt">2</span>
      //                   </div>
      //                 </div>
      //                 <div class="header__cart-item-body">
      //                   <span class="header__cart-item-description">
      //                     Phân loại: Bạc
      //                   </span>
      //                   <span class="header__cart-item-remove">Xóa</span>
      //                 </div>
      //               </div>
      //             </li>
      //             <li class="header__cart-item">
      //               <img
      //                 src="https://img.tickid.vn/photos/resized/320x/83-1580888419-myphamohui-lgvina.png"
      //                 alt=""
      //                 class="header__cart-img"
      //               />
      //               <div class="header__cart-item-info">
      //                 <div class="header__cart-item-head">
      //                   <h5 class="header__cart-item-name">
      //                     Bộ kem đặc trị vùng mắt
      //                   </h5>
      //                   <div class="header__cart-item-price-wrap">
      //                     <span class="header__cart-item-price">
      //                       2.000.000đ
      //                     </span>
      //                     <span class="header__cart-item-multiply">x</span>
      //                     <span class="header__cart-item-qnt">2</span>
      //                   </div>
      //                 </div>
      //                 <div class="header__cart-item-body">
      //                   <span class="header__cart-item-description">
      //                     Phân loại: Bạc
      //                   </span>
      //                   <span class="header__cart-item-remove">Xóa</span>
      //                 </div>
      //               </div>
      //             </li>
      //           </ul>

      //           <a href="#" class="header__cart-view-cart btn btn--primary">
      //             Xem giỏ hàng
      //           </a>
      //         </div>
      //         {userInfoClint && userInfoClint.email ? (
      //           <div className="icon header_icon">
      //             <img
      //               src={logo}
      //               alt={"logo"}
      //               class="header__navbar-user-img"
      //             />

      //             <h1 class="user-name">
      //               {userInfoClint.firstName} {userInfoClint.lastName}
      //             </h1>
      //           </div>
      //         ) : (
      //           <Link className="icon" to={`/login-user`}>
      //             <i class="fa fa-user" aria-hidden="true"></i>
      //           </Link>
      //         )}
      //       </div>

      //       <div className="hamburger">
      //         <i className="bx bx-menu-alt-left"></i>
      //       </div>
      //     </div>
      //   </div>
      // </>
      <header class="section-header">
        <nav class="navbar d-none d-md-flex p-md-0 navbar-expand-sm navbar-light border-bottom">
          <div class="container">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTop4"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTop4">
              <ul class="navbar-nav mr-auto">
                {userInfoClint && userInfoClint !== null ? (
                  <li>
                    <span class="nav-link">
                      {userInfoClint.fistName} {userInfoClint.lastName}
                    </span>
                  </li>
                ) : (
                  <li>
                    <span class="nav-link">
                      Hi, <Link to={`/login-user`}> Đăng nhập </Link> or{" "}
                      <Link to={`/SignUp-user`}> Đăng kí </Link>
                    </span>
                  </li>
                )}

                <li>
                  <Link className="nav-link" to={`/contract`}>
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to={`/about`}>
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <a href="#" class="nav-link">
                    Hỗ trợ
                  </a>
                </li>
              </ul>
              <ul class="navbar-nav">
                <li>
                  <a href="#" class="nav-link">
                    <img src="images/icons/flags/US.png" height="16" /> Vận chuyển
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Watchlist
                  </a>
                  <ul class="dropdown-menu small">
                    <li>
                      <a class="dropdown-item" href="#">
                        First item
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Second item
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Third item
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" class="nav-link">
                    My shop
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link">
                    <i class="fa fa-bell"></i>
                  </a>
                </li>
                <li>
                  <a href="/product-cart" class="nav-link">
                    <i class="fa fa-shopping-cart"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="container">
          <section class="header-main border-bottom">
            <div class="row row-sm">
              <div class="col-6 col-sm col-md col-lg  flex-grow-0">
                <a href="http://bootstrap-ecommerce.com" class="brand-wrap">
                  <img class="logo" src={logo} />
                </a>
              </div>
              <div class="col-6 col-sm col-md col-lg flex-md-grow-0">
                <div class="d-md-none float-right">
                  <a href="#" class="btn btn-light">
                    <i class="fa fa-bell"></i>
                  </a>
                  <a href="#" class="btn btn-light">
                    <i class="fa fa-user"></i>
                  </a>
                  <a href="#" class="btn btn-light">
                    <i class="fa fa-shopping-cart"></i> 2
                  </a>
                </div>

                <div class="category-wrap d-none dropdown d-md-inline-block">
                  <button
                    type="button"
                    class="btn btn-light dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Shop by
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">
                      Machinery / Mechanical Parts / Tools
                    </a>
                    <a class="dropdown-item" href="#">
                      Consumer Electronics / Home Appliances
                    </a>
                    <a class="dropdown-item" href="#">
                      Auto / Transportation
                    </a>
                    <a class="dropdown-item" href="#">
                      Apparel / Textiles / Timepieces
                    </a>
                    <a class="dropdown-item" href="#">
                      Home & Garden / Construction / Lights
                    </a>
                    <a class="dropdown-item" href="#">
                      Beauty & Personal Care / Health
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-xl col-md-5 col-sm-12 flex-grow-1">
                <form action="#" class="search-header">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      onChange={(e) => {
                        this.handleSearchTerm(e);
                      }}
                    ></input>
                    <select
                      class="custom-select border-left"
                      name="category_name"
                    >
                      <option value="">All type</option>
                      <option value="codex">Special</option>
                      <option value="comments">Only best</option>
                      <option value="content">Latest</option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="col col-lg col-md flex-grow-0">
                <Link
                  to={{
                    pathname: `/search/${this.state.searchTerm}`,
                    state: this.state.searchTerm,
                  }}
                >
                  <button class="btn btn-block btn-primary" type="submit">
                    Tìm kiếm
                  </button>
                </Link>
              </div>
              <div class="col col-lg col-md flex-grow-0">
                <button class="btn btn-block btn-light" type="submit">
                  Advanced
                </button>
              </div>
            </div>
          </section>

          <nav class="navbar navbar-main navbar-expand pl-0">
            <ul class="navbar-nav flex-wrap">
              <li class="nav-item">
                <Link className="nav-link" to={`/home`}>
                  Trang chủ
                </Link>
              </li>
              <li class="nav-item dropdown">
                <select
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  style={{ border: "none" }}
                  onChange={(event) => {
                    this.handleOnchangeTradmark(event);
                  }}
                >
                  <option href="page-index-1.html"> Danh muc</option>
                  {allTrademark &&
                    allTrademark.length > 0 &&
                    allTrademark.map((brand, idx) => {
                      let brands = brand.name.replace("-", " ");

                      return <option key={idx}>{brand.name}</option>;
                    })}
                </select>
              </li>
              <li class="nav-item">
                <select
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  style={{ border: "none" }}
                  onChange={(event) => {
                    this.handleOnchange(event);
                  }}
                >
                  <option href="page-index-1.html"> Thương hiệu</option>
                  {allBrand &&
                    allBrand.length > 0 &&
                    allBrand.map((brand, idx) => {
                      let brands = brand.name.replace("-", " ");

                      return <option key={idx}>{brand.name}</option>;
                    })}
                </select>
              </li>
              <li class="nav-item">
                <select
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  style={{ border: "none" }}
                >
                  <option href="page-index-1.html"> Khuyến mãi</option>

                  <option href="page-index-1.html">Home page 1</option>
                  <option href="page-index-2.html">Home page 2</option>
                  <option href="page-category.html">All category</option>
                  <option href="page-listing-large.html">Listing list</option>
                  <option href="page-listing-grid.html">Listing grid</option>
                  <option href="page-shopping-cart.html">Shopping cart</option>
                  <option href="page-detail-product.html">
                    Product detail
                  </option>
                  <option href="page-content.html">Page content</option>
                  <option href="page-user-login.html">Page login</option>
                  <option href="page-user-register.html">Page register</option>
                </select>
              </li>
              <li class="nav-item">
                <Link className="nav-link" to={`/product`}>
                  Tất cả sản phẩm
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfoClint: state.user.userInfoClint,
    cart: state.admin.cartAr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    sideBarOn: () => dispatch(actions.sideBarOn()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TabHeader)
);
