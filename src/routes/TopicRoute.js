import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ShowDetail from "../containers/System/admin/ShowDetail";
import Topic from "../containers/System/admin/topic/Topic";
import TopicEdit from "../containers/System/admin/topic/TopicEdit";

class TopicRoute extends Component {
  render() {
    // const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <Route path="/system/topic/topic-show" component={ShowDetail} />
          <Route path="/system/topic/topic-edit" component={TopicEdit} />

          <Route path="/system/topic" component={Topic} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TopicRoute);
