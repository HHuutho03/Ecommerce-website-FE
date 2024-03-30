import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";

import CategorySection from "./Section/CategorySection";

import SectionFeatured from "./Section/SectionFeatured";
import Footer from "./Footer";
import PopupHide from "./Section/PopupHide";
import ArrivalSection from "./Section/ArrivalSection";
import BannerSection from "./Section/BannerSection";
import ContactSection from "./Section/ContactSection";
import "../../assets/js/script";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/ui.css";
import Sidebar from "./Section/Sidebar";
class HomePage extends Component {
  render() {
    return (
      <div className="component-container">
        <HomeHeader isShowBanner={true} />
        <div className="container">
          <ArrivalSection />
          <SectionFeatured />
        </div>{" "}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
