import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import ProductCreate from "../containers/System/admin/product/ProductCreate";
import AllProducts from "../containers/System/admin/product/AllProduct";
import ProductEdit from "../containers/System/admin/product/ProductEdit";
import ProductShow from "../containers/System/admin/product/ProductShow";
import ProductTrash from "../containers/System/admin/product/ProductTrash";

class ProductRoute extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/system/product/product-create"
            component={ProductCreate}
          />
          <Route
            path="/system/product/Product-edit/:id"
            component={ProductEdit}
          />
          <Route
            path="/system/product/Product-trash"
            component={ProductTrash}
          />
          <Route path="/system/product/Product-show" component={ProductShow} />
          <Route path="/system/product" component={AllProducts} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRoute);
