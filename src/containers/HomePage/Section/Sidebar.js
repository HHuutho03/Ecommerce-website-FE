import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import cat3 from "../../../assets/images/logobrabk.png";
import logo from "../../../assets/images/anh-naruto-chibi_110704874.jpg";
import { getAllProductSearch } from "../../../services/userService";
import { getAllTrademark, getAllBrand } from "../../../services/userService";
import * as actions from "../../../store/actions";

import "./Sidebar.scss";
class TabHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { allTrademark: [], allBrand: [] };
  }
  async componentDidMount() {
    this.handleGetAllTrademark();
  }
  handleGetAllTrademark = async () => {
    let res = await getAllTrademark();
    let resBrand = await getAllBrand();
    if (res.errCode === 0 && resBrand.errCode === 0) {
      this.setState({
        allTrademark: res.data.reverse(),
        allBrand: resBrand.data.reverse(),
      });
    }
  };
  render() {
    let { isSidebarOn } = this.props;
    let { allBrand, allTrademark } = this.state;
    console.log("allBrand", allBrand);
    return (
      <aside className={`sidebar ${isSidebarOn ? "hide-sidebar" : ""}`}>
        <button type="button" className="sidebar-hide-btn" onClick={() => this.props.sideBarOff()}>
          <i className="fas fa-times"></i>
        </button>
        <div className="sidebar-cnt">
          <div
            className="cat-title fs-17 text-uppercase fw-6 ls-1h text-center "
            style={{
              paddingTop: "20px",
              background: "#6cbe02",
              textAlign: "center !important",
            }}
          >
            Danh mục sản phẩm
          </div>
          <ul className="cat-list" style={{ height: "100%" }}>
            {allTrademark &&
              allTrademark.length > 0 &&
              allTrademark.map((category, idx) => {
                let categories = category.name.replace("-", " ");
                return (
                  <li key={idx} onClick={() => this.props.sideBarOff()}>
                    <Link
                      to={{
                        pathname: `/category/${categories}`,
                        state: category.name,
                      }}
                      className="cat-list-link text-capitalize"
                    >
                      {category.name.replace("-", " ")}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <div className="cat-title fs-17 text-uppercase fw-6 ls-1h text-center" style={{ paddingTop: "20px", background: "#6cbe02" }}>
            Thương hiệu sản phẩm
          </div>
          <ul className="cat-list">
            {allBrand &&
              allBrand.length > 0 &&
              allBrand.map((brand, idx) => {
                let brands = brand.name.replace("-", " ");
            
                return (
                  <li key={idx} onClick={() => this.props.sideBarOff()}>
                    <Link
                      to={{
                        pathname: `/brand/${brands}`,
                        state: brand.name,
                      }}
                      className="cat-list-link text-capitalize"
                    >
                      {brand.name.replace("-", " ")}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSidebarOn: state.admin.isSidebarOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sideBarOff: () => dispatch(actions.sideBarOff()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabHeader));
