import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
// import Login from '../routes/Login';
import Login from "./Auth/Login";

// import Header from "./Header/Header";
import System from "../routes/System";

// import { CustomToastCloseButton } from "../components/CustomToast";
import HomePage from "./HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars";
import Cart from "./HomePage/PageComponent/Cart.js";
import Product from "./HomePage/PageComponent/Product.js";
import Contract from "./HomePage/PageComponent/Contract.js";
import About from "./HomePage/PageComponent/About.js";
import SearchPage from "./HomePage/PageComponent/SearchPage.js";
import LoginUser from "./HomePage/PageComponent/LoginUser.js";
import ProductDetail from "./HomePage/Section/ProductDetail.js";
import CategoryPage from "./HomePage/PageComponent/CategoryPage.js";
import BrandPage from "./HomePage/PageComponent/BrandPage.js";
import MyBlog from "./HomePage/PageComponent/MyBlog.js";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="content-container">
            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />

                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.PRODUCT_CART} component={Cart} />
                <Route path={path.PRODUCT_DETAIL} component={ProductDetail} />
                <Route path={path.PRODUCT} component={Product} />
                <Route path={path.CATEGORY} component={CategoryPage} />
                <Route path={path.BRAND} component={BrandPage} />
                <Route path={path.POST} component={MyBlog} />
                <Route path={path.CONTRACT} component={Contract} />
                <Route path={path.ABOUT} component={About} />
                <Route path={path.LOGIN_USER} component={LoginUser} />
                <Route path={path.SEARCH} component={SearchPage} />
                <Route path={path.DETAIL_CLINIC} component={""} />
                <Route path={path.VERIFY_EMAIL_BOOKING} component={""} />
              </Switch>
            </CustomScrollbars>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
