import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router-dom";

class Footer extends Component {
  handleLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnHomePage = () => {
    this.props.processLogout();
    this.props.history.push("/login");
  };
  render() {
    const { userInfo } = this.props;
    return (
      <footer class="section-footer bg-secondary text-white">
        <div class="container">
          <section class="footer-top padding-y-lg">
            <div class="row">
              <aside class="col-md-4 col-12">
                <article class="mr-md-4">
                  <h5 class="title">Contact us</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.</p>
                  <ul class="list-icon">
                    <li>
                      <i class="icon fa fa-map-marker"> </i>542 Fake Street, Cityname 10021 Netheerlends
                    </li>
                    <li>
                      <i class="icon fa fa-envelope"> </i> info@example.com
                    </li>
                    <li>
                      <i class="icon fa fa-phone"> </i> (800) 060-0730, (800) 060-0730
                    </li>
                    <li>
                      <i class="icon fa fa-clock"> </i>Mon-Sat 10:00pm - 7:00pm
                    </li>
                  </ul>
                </article>
              </aside>
              <aside class="col-md col-6">
                <h5 class="title">Information</h5>
                <ul class="list-unstyled">
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">Career</a>
                  </li>
                  <li>
                    <a href="#">Find a store</a>
                  </li>
                  <li>
                    <a href="#">Rules and terms</a>
                  </li>
                  <li>
                    <a href="#">Sitemap</a>
                  </li>
                </ul>
              </aside>
              <aside class="col-md col-6">
                <h5 class="title">My Account</h5>
                <ul class="list-unstyled">
                  <li>
                    <a href="#">Contact us</a>
                  </li>
                  <li>
                    <a href="#">Money refund</a>
                  </li>
                  <li>
                    <a href="#">Order status</a>
                  </li>
                  <li>
                    <a href="#">Shipping info</a>
                  </li>
                  <li>
                    <a href="#">Open dispute</a>
                  </li>
                </ul>
              </aside>
              <aside class="col-md-4 col-12">
                <h5 class="title">Newsletter</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat lorem.</p>

                <form class="form-inline mb-3">
                  <input type="text" placeholder="Email" class="border-0 w-auto form-control" name="" />
                  <button class="btn ml-2 btn-warning">Subscribe</button>
                </form>

                <p class="text-white-50 mb-2">Follow us on social media</p>
                <div>
                  <a href="#" class="btn btn-icon btn-outline-light">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="btn btn-icon btn-outline-light">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#" class="btn btn-icon btn-outline-light">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#" class="btn btn-icon btn-outline-light">
                    <i class="fab fa-youtube"></i>
                  </a>
                </div>
              </aside>
            </div>
          </section>

          <section class="footer-bottom text-center">
            <p class="text-white">Privacy Policy - Terms of Use - User Information Legal Enquiry Guide</p>
            <p class="text-muted">&copy 2019 Company name, All rights reserved</p>
            <br />
          </section>
        </div>
      </footer>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
