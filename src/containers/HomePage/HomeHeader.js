import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { withRouter } from "react-router-dom";
import hero1 from "../../assets/images/hero-1.png";
import hero2 from "../../assets/images/hero-2.png";
import { getAllBanner } from "../../services/userService";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import TabHeader from "./Section/TabHeader";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.glideRef = React.createRef();
    this.glide = null; // Glide instance placeholder
    this.state = {
      AllBanner: [],
    };
  }

  async componentDidMount() {
    await this.handleGetAllProduct();
    // Initialize Glide when the component mounts
    if (this.glideRef.current) {
      this.glide = new Glide(this.glideRef.current, {
        type: "carousel",
        startAt: 0,
        autoplay: 3000,
        gap: 0,
        hoverpause: true,
        perView: 1,
        animationDuration: 800,
        animationTimingFunc: "linear",
      });

this.glide.mount(); // Mount Glide
    }
  }

  handleGetAllProduct = async () => {
    let res = await getAllBanner();

    if (res.errCode === 0) {
      this.setState({
        AllBanner: res.data.reverse(),
      });
    }
  };
  componentWillUnmount() {
    // Destroy Glide instance when the component unmounts
    if (this.glide) {
      this.glide.destroy();
    }
  }

  returnHomePage = () => {
    this.props.processLogout();
    this.props.history.push("/login");
  };

  render() {
    let { AllBanner } = this.state;

    return (
      <header className="header" id="header">
        <TabHeader />

        <div className="hero">
          <div className="glide" id="glide_1" ref={this.glideRef}>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {AllBanner &&
                  AllBanner.length > 0 &&
                  AllBanner.map((item, index) => {
                    return (
                      <li className="glide__slide">
                        <div className="center">
                          <div className="left">
                            <span className="">{item.description}</span>
                            <h1 className="">NEW COLLECTION!</h1>
                            <p>Trending from men's and women's style collection</p>
                            <a className="hero-btn">SHOP NOW</a>
                          </div>
                          <div className="right">
                            <img src={item.image} alt={"hero1"} />
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
