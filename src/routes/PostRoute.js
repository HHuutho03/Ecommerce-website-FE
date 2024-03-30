import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import ShowDetail from "../containers/System/admin/ShowDetail";
import AllPost from "../containers/System/admin/posts/AllPost";
import PostEdit from "../containers/System/admin/posts/PostEdit";
import PostCreate from "../containers/System/admin/posts/PostCreate";
import Topic from "../containers/System/admin/topic/Topic";
import PageAlone from "../containers/System/admin/posts/PageAlone";
import PageEdit from "../containers/System/admin/posts/PageEdit";
import PageCreate from "../containers/System/admin/posts/PageCreate";

class PostRoute extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/system/category/category-show" component={ShowDetail} />

          <Route path="/system/post/post-edit" component={PostEdit} />
          <Route path="/system/post/post-create" component={PostCreate} />
          <Route path="/system/post/post-show" component={ShowDetail} />
          <Route path="/system/post/page-edit" component={PageEdit} />
          <Route path="/system/post/page-create" component={PageCreate} />
          <Route path="/system/post/page-show" component={ShowDetail} />
          <Route path="/system/post/manage-Topic" component={Topic} />
          <Route path="/system/post/manage-PageAlone" component={PageAlone} />

          <Route path="/system/post" component={AllPost} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PostRoute);
