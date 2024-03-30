import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ShowDetail from "../containers/System/admin/ShowDetail";

import ManageDisplay from "../containers/System/admin/display/ManageDisplay";
import DisplayEdit from "../containers/System/admin/display/DisplayEdit";

class MenuRoute extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/system/menu/menu-edit" component={DisplayEdit} />
          <Route path="/system/menu/menu-show" component={ShowDetail} />
          <Route path="/system/menu" component={ManageDisplay} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuRoute);
