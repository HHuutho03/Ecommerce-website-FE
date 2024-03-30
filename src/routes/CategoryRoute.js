import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Trademark from "../containers/System/admin/product/Trademark";
import CategoryListEdit from "../containers/System/admin/product/CategoryListEdit";
import ShowDetail from "../containers/System/admin/ShowDetail";
import CategoryTrash from "../containers/System/admin/product/CategoryTrash";

class CategoryRoute extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/system/category/category-edit"
            component={CategoryListEdit}
          />
          <Route path="/system/category/category-show" component={ShowDetail} />
          <Route
            path="/system/category/category-trash"
            component={CategoryTrash}
          />
          <Route path="/system/category" component={Trademark} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryRoute);
