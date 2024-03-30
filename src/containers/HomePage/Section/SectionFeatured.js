import React, { Component } from "react";
import { connect } from "react-redux";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllPost } from "../../../services/userService";

class SectionFeatured extends Component {
  constructor(props) {
    super(props);
    this.glideRef = React.createRef();
    this.glide = null;
    this.state = { allPost: [] };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  async componentDidMount() {
    await this.handleGetAllBrand();
    if (this.glideRef.current) {
      this.glide = new Glide(this.glideRef.current, {
        type: "carousel",
        perView: 2,
        focusAt: "center",
        breakpoints: {
          800: {
            perView: 2,
          },
          480: {
            perView: 1,
          },
        },
      });

      this.glide.mount(); // Mount Glide
    }
  }

  handleGetAllBrand = async () => {
    let res = await getAllPost();
    if (res.errCode === 0) {
      this.setState({
        allPost: res.data.reverse(),
      });
    }
  };
  render() {
    let { allPost } = this.state;
    return (
      <section class="padding-bottom">
        <div class="title">
          <h1>Bài viết của chúng tôi</h1>
          <p>Hiểu thêm về chúng tôi</p>
        </div>
        <div class="row">
          <div class="glide" id="glide_1" ref={this.glideRef}>
            <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides">
                {allPost &&
                  allPost.length > 0 &&
                  allPost.map((item, index) => {
                    return (
                      <li class="glide__slide">
                        <Link
                          to={{
                            pathname: `/post/id=${item.id}`,
                            state: item,
                          }}
                        >
                          <div class="card card-banner-lg bg-dark">
                            <img src={item.image} class="card-img opacity" />
                            <div class="card-img-overlay text-white">
                              <h2 class="card-title">{item.title}</h2>
                              <p class="card-text" style={{ maxWidth: "80%" }}>
                                {item.detail}
                              </p>
                              <a href="#" class="btn btn-light">
                                Discover
                              </a>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div class="glide__arrows" data-glide-el="controls">
              <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
              </button>
              <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SectionFeatured));
