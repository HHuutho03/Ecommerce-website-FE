import React, { Component } from "react";
import { userIsAuthenticated } from "../hoc/authentication";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "../containers/Header/Header";

import ImportProduct from "../containers/System/admin/product/ImportProduct";

import Promotion from "../containers/System/admin/product/Promotion";
import "../containers/Header/Header.css";
import Navigator from "../components/Navigator";
import { USER_ROLE } from "../utils/constant";
import { adminMenu, doctorMenu } from "../containers/Header/menuApp";
import _ from "lodash";

import AllOrder from "../containers/System/admin/order/AllOrder";
import ManageContract from "../containers/System/admin/contact/ManageContract";

import MangerMember from "../containers/System/admin/system/MangerMember";
import ManagerConfig from "../containers/System/admin/system/ManagerConfig";

import OrderExport from "../containers/System/admin/order/OrderExport";
import OrderShow from "../containers/System/admin/order/OrderShow";

import ProductRoute from "./ProductRoute";
import CategoryRoute from "./CategoryRoute";
import PostRoute from "./PostRoute";
import PageRoute from "./PageRoute";
import TopicRoute from "./TopicRoute";
import BrandRoute from "./BrandRoute";
import MenuRoute from "./MenuRoute";
import BannerRoute from "./BannerRoute";
import CustomerRouter from "./CustomerRouter";
import ContractReply from "../containers/System/admin/contact/ContractReply";

class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  componentDidMount() {
    const lisitem = document.querySelectorAll(".item-sub");
    lisitem.forEach((hdlitem) => {
      hdlitem.addEventListener("click", function (e) {
        hdlitem.classList.toggle("active");
      });
    });
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  HandleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { systemMenuPath } = this.props;

    return (
      <React.Fragment>
        <div className="system-container">
          <Header />
          <section className="hdl-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-2 bg-dark p-0 hdl-left">
                  <div className="hdl-left">
                    <div className="dashboard-name">Bản điều khiển</div>
                    <nav className="m-2 mainmenu">
                      <ul className="main">
                        <Navigator menus={this.state.menuApp} />
                      </ul>
                    </nav>
                  </div>
                </div>

                <Switch>
                  {/* //?Manage Product */}
                  <Route
                    path={"/system/product/"}
                    component={userIsAuthenticated(ProductRoute)}
                  />
                  {/* //?Manage category */}
                  <Route
                    path={"/system/category"}
                    component={userIsAuthenticated(CategoryRoute)}
                  />
                  <Route path="/system/user-redux" component={ImportProduct} />
                  {/* //?Manage brand */}
                  <Route
                    path={"/system/brand"}
                    component={userIsAuthenticated(BrandRoute)}
                  />
                  <Route
                    path="/system/manage-promotion"
                    component={Promotion}
                  />{" "}
                  {/* //?Manage page */}
                  <Route
                    path={"/system/page"}
                    component={userIsAuthenticated(PageRoute)}
                  />
                  {/* //?Manage topic */}
                  <Route
                    path={"/system/topic"}
                    component={userIsAuthenticated(TopicRoute)}
                  />
                  {/* //?Manage Post */}
                  <Route
                    path={"/system/post"}
                    component={userIsAuthenticated(PostRoute)}
                  />
                  <Route path="/system/contract" component={ManageContract} />
                  <Route
                    path="/system/contract-reply"
                    component={ContractReply}
                  />
                  {/* //?manager order */}
                  <Route path="/system/order-export" component={OrderExport} />
                  <Route path="/system/all-orders" component={AllOrder} />
                  <Route path="/system/order-show" component={OrderShow} />
                  {/* //?manager customer */}
                  <Route
                    path={"/system/customer"}
                    component={userIsAuthenticated(CustomerRouter)}
                  />
                  {/* //?manager menu */}
                  <Route
                    path={"/system/menu"}
                    component={userIsAuthenticated(MenuRoute)}
                  />
                  {/* //?manager banner */}
                  <Route
                    path={"/system/banner"}
                    component={userIsAuthenticated(BannerRoute)}
                  />
                  {/* //?manager system */}
                  <Route
                    path="/system/manager-member"
                    component={MangerMember}
                  />
                  <Route
                    path="/system/manager-config"
                    component={ManagerConfig}
                  />
                  <Route
                    component={() => {
                      return <Redirect to={systemMenuPath} />;
                    }}
                  />
                </Switch>
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
