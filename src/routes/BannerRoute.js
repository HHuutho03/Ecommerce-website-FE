import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ShowDetail from "../containers/System/admin/ShowDetail";
import ManageBanner from "../containers/System/admin/display/ManageBanner";
import BannerEdit from "../containers/System/admin/display/BannerEdit";
import BannerCreate from "../containers/System/admin/display/BannerCreate";
import BannerTrash from "../containers/System/admin/display/BannerTrash";

class BannerRoute extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/system/banner/banner-edit" component={BannerEdit} />
          <Route path="/system/banner/banner-create" component={BannerCreate} />
          <Route path="/system/banner/banner-trash" component={BannerTrash} />
          <Route path="/system/banner/banner-show" component={ShowDetail} />
          <Route path="/system/banner" component={ManageBanner} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BannerRoute);
