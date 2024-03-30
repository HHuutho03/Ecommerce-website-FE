import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import TabHeader from "../Section/TabHeader";
import Footer from "../Footer";
import product from "../images/product-1.jpg";
import Sidebar from "../Section/Sidebar";
import { saveAllOrder } from "../../../services/userService";
import { toast } from "react-toastify";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { orderList: [] };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cart !== this.props.cart) {
      this.props.totalProduct();
      let { cart } = this.props;
      if (cart && cart.length > 0) {
        this.props.totalProduct();
        this.setState({ orderList: cart });
      }
    }
  }

  componentDidMount() {
    let { cart } = this.props;
    if (cart && cart.length > 0) {
      this.props.totalProduct();
      this.setState({ orderList: cart });
    }
  }
  buildDataInputSelection = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.product_id = item.productIdSale.product_id;
        object.qty = item.quantity;
        object.discount = item.productIdSale.pricesale;
        object.price = item.price;
        result.push(object);
      });
    }
    return result;
  };
  handleOnclickSaveOder = () => {
    let { orderList } = this.state;
    let { userInfoClint } = this.props;
    let total = this.buildDataInputSelection(orderList);
    let res = saveAllOrder({ arrOrder: total, userInfo: userInfoClint });
    if (res) {
      toast.success("Your order has been placed");
    } else {
      toast.error("Order placed failed");
    }
  };

  render() {
    let { cart, total } = this.props;

    console.log("cart", this.state.orderList);
    return (
      <div className="component-container">
        <TabHeader />
        {cart && cart.length > 0 ? (
          <div class="container cart">
            <table>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng</th>
              </tr>

              {cart &&
                cart.length > 0 &&
                cart.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <div class="cart-info">
                          <img src={item.image} alt={"product"} />
                          <div>
                            <p>{item.name}</p>
                            <span>Price: ${item.price}</span> <br />
                            <span
                              className="px-1 text-danger"
                              onClick={() => {
                                this.props.deleteProduct(item);
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </div>
                        </div>
                      </td>
                      <td style={{ display: "flex" }}>
                        <button
                          bsSize="small"
                          onClick={() => {
                            this.props.buyProduct(item);
                          }}
                        >
                          +
                        </button>
                        <input type="text" value={item.quantity}></input>
                        <button
                          onClick={() => {
                            this.props.deleteQuantity(index);
                          }}
                          bsSize="small"
                        >
                          -
                        </button>
                      </td>
                      {item.quantity === undefined ? (
                        <td> ${item.price}</td>
                      ) : (
                        <td>{`${+item.price * +item.quantity}`}</td>
                      )}
                    </tr>
                  );
                })}
            </table>
            <div class="total-price">
              <table>
                <tr>
                  <td>Giá sản phẩm</td>
                  <td>$ {total}</td>
                </tr>
                <tr>
                  <td>Phí vận chuyển</td>
                  <td>$50</td>
                </tr>
                <tr>
                  <td>Tổng Tiền</td>
                  <td>$ {total + 50}</td>
                </tr>
              </table>
              <span
                class="checkout btn"
                onClick={() => {
                  this.handleOnclickSaveOder();
                }}
              >
                Đặt hàng
              </span>
            </div>
          </div>
        ) : (
          <div class="container cart">không có sản phẩm nào trong giỏ hàng</div>
        )}

        <Sidebar />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfoClint: state.user.userInfoClint,
    cart: state.admin.cartAr,
    total: state.admin.total,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (product_current) =>
      dispatch(actions.deleteProduct(product_current)),
    totalProduct: () => dispatch(actions.totalProduct()),
    buyProduct: (product_current) =>
      dispatch(actions.buyProduct(product_current)),
    deleteQuantity: (itemIndex) => dispatch(actions.deleteQuantity(itemIndex)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
