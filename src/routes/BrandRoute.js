import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ShowDetail from "../containers/System/admin/ShowDetail";
import Brand from "../containers/System/admin/brand/Brand";
import BrandEdit from "../containers/System/admin/brand/BrandEdit";
import BrandTrash from "../containers/System/admin/brand/BrandTrash";

class BrandRoute extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/system/brand/brand-edit" component={BrandEdit} />
          <Route path="/system/brand/brand-show" component={ShowDetail} />
          <Route path="/system/brand/brand-trash" component={BrandTrash} />

          <Route path="/system/brand" component={Brand} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandRoute);
