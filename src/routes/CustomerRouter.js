import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import userWrite from "../containers/System/admin/user/userWrite";
import DetailCustomer from "../containers/System/admin/user/DetailCustomer";
import CustomerShow from "../containers/System/admin/user/CustomerShow";
import CustomerCreate from "../containers/System/admin/user/CustomerCreate";

class CustomerRouter extends Component {
  render() {

    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/system/customer/Customer-edit/:id"
            component={DetailCustomer}
          />
          <Route
            path="/system/customer/Customer-show/:id"
            component={CustomerShow}
          />
          <Route
            path="/system/customer/Customer-create"
            component={CustomerCreate}
          />
          <Route path="/system/Customer" component={userWrite} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRouter);
