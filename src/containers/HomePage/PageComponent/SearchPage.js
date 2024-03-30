import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import TabHeader from "../Section/TabHeader";
import Footer from "../Footer";
import { getAllProductSearch } from "../../../services/userService";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Sidebar from "../Section/Sidebar";
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { currentItems: null, AllInfoSearch: [] };
  }

  componentDidMount() {
    this.handleGetAllProduct(this.props.location.state);
  }

  handleGetAllProduct = async (input) => {
    let res = await getAllProductSearch(input);
    if (res && res.errCode === 0) {
      this.setState({ AllInfoSearch: res.data });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location.state !== this.props.location.state) {
      this.handleGetAllProduct(this.props.location.state);
    }
  }

  handleGetDataFromParent = (data) => {
    this.setState({ currentItems: data });
  };
  render() {
    let { currentItems, AllInfoSearch } = this.state;
    return (
      <div className="component-container">
        <TabHeader />

        <div className="title">
          <h3>Search results:</h3>
        </div>
        <div className="product-center container">
          {currentItems &&
            currentItems.length > 0 &&
            currentItems.map((item, index) => {
              return (
                <div className="product-item">
                  <Link
                    to={{
                      pathname: `/product-detail/id=${item.id}`,
                      state: item,
                    }}
                  >
                    <div className="overlay">
                      <span className="product-thumb">
                        <img src={item.image} alt="" />
                      </span>
                    </div>
                    <div className="product-info">
                      <span>{item.name}</span>
                      <span>{item.description}</span>
                      <div>
                        {item &&
                        item.productIdSale &&
                        item.productIdSale.pricesale !== 0 ? (
                          <>
                            <span
                              style={{
                                textDecoration: "line-through",
                                float: "left",
                                marginRight: "10px",
                              }}
                            >
                              $ {item.price}
                            </span>
                            <span style={{ color: "#EE4D2D" }}>
                              {item.productIdSale.pricesale}
                            </span>
                          </>
                        ) : (
                          <span
                            style={{
                              float: "left",
                              marginRight: "10px",
                            }}
                          >
                            $ {item.price}
                          </span>
                        )}
                      </div>
                    </div>
                    <ul className="icons">
                      <li>
                        <i className="fa fa-heart"></i>
                      </li>
                      <li>
                        <i className="fa fa-search"></i>
                      </li>
                      <li
                        onClick={() => {
                          this.props.buyProduct(item);
                        }}
                      >
                        <i className="fa fa-cart-arrow-down"></i>
                      </li>
                    </ul>
                  </Link>
                </div>
              );
            })}
        </div>
        <Pagination
          className="pagination"
          data={AllInfoSearch}
          handleGetDataFromParent={this.handleGetDataFromParent}
        />
        <Sidebar />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AllInfoSearch: state.admin.AllInfoSearch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProductSearch: (inputId) =>
      dispatch(actions.fetchAllProductSearch(inputId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchPage)
);
