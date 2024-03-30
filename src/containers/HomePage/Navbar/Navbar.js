import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.scss";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleRedirectCart = () => {
    this.props.history.push("/product-cart");
  };
  returnHomePage = () => {
    this.props.processLogout();
    this.props.history.push("/home");
  };
  componentDidMount() {}
  handleSearchTerm = (e) => {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value,
    });
  };
  render() {
    let { userInfoClint } = this.props;

    return (
      <nav className="navbar">
        <div className="navbar-cnt flex align-center">
          <div className="brand-and-toggler flex align-center">
            <button type="button" className="sidebar-show-btn text-white">
              <i className="fas fa-bars"></i>
            </button>
            <Link to="/" className="navbar-brand flex align-center">
              <span className="navbar-brand-ico">
                <i className="fa-solid fa-bag-shopping"></i>
              </span>
              <span className="navbar-brand-txt mx-2">
                <span className="fw-7">Snap</span>Up.
              </span>
            </Link>
          </div>

          <div className="navbar-collapse w-100">
            <div className="navbar-search bg-white">
              <div className="flex align-center">
                <input
                  type="text"
                  className="form-control fs-14"
                  placeholder="Search your preferred items here"
                />
                <Link className="text-white search-btn flex align-center justify-center">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Link>
              </div>
            </div>

            <ul className="navbar-nav flex align-center fs-12 fw-4 font-manrope">
              {/* {
                // taking only first 8 categories
                categories.slice(0, 8).map((category, idx) => (
                  <li className="nav-item no-wrap" key={idx}>
                    <Link
                      to={`category/${category}`}
                      className="nav-link text-capitalize"
                    >
                      {category.replace("-", " ")}
                    </Link>
                  </li>
                ))
              } */}
            </ul>
          </div>

          <div className="navbar-cart flex align-center">
            <Link to="/cart" className="cart-btn">
              <i className="fa-solid fa-cart-shopping"></i>
              <div className="cart-items-value"></div>
              {/* <CartModal carts={carts} /> */}
            </Link>
          </div>
        </div>
      </nav>
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
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
