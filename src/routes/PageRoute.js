import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ShowDetail from "../containers/System/admin/ShowDetail";
import Topic from "../containers/System/admin/topic/Topic";
import PageAlone from "../containers/System/admin/posts/PageAlone";
import PageEdit from "../containers/System/admin/posts/PageEdit";
import PageCreate from "../containers/System/admin/posts/PageCreate";

class PageRoute extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/system/category/category-show" component={ShowDetail} />

          <Route path="/system/page/post-show" component={ShowDetail} />
          <Route path="/system/page/page-edit" component={PageEdit} />
          <Route path="/system/page/page-create" component={PageCreate} />
          <Route path="/system/page/page-show" component={ShowDetail} />
          <Route path="/system/post/manage-Topic" component={Topic} />
          <Route path="/system/page" component={PageAlone} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PageRoute);
