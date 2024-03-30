import actionTypes from "../actions/actionTypes";
// import { logger } from "redux-logger";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  position: [],
  users: [],
  AllInfoState: [],
  AllInfoSearch: [],
  cartAr: [],
  total: 0,
  isSidebarOn: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = [];
      state.isLoadingGender = false;

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.position = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_REQUIRED_INFO_SUCCESS:
      state.AllInfoState = action.AllInfo;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_REQUIRED_INFO_FAILED:
      state.AllInfoState = [];
      return {
        ...state,
      };

    case actionTypes.GET_ALL_PRODUCT_SEARCH_SUCCESS:
      state.AllInfoSearch = action.AllSearch;
      return {
        ...state,
      };
    case actionTypes.GET_ALL_PRODUCT_SEARCH_FAILED:
      state.AllInfoState = [];
      return {
        ...state,
      };

    //? add to cart redux
    case actionTypes.BUY_PRODUCT:
      const productIndex = state.cartAr.findIndex(
        (p) => p.id === action.payload.id
      );
      console.log("cartAr", state.cartAr);
      if (productIndex === -1) {
        // Product not in cart, add it with quantity 1
        return {
          cartAr: [...state.cartAr, { ...action.payload, quantity: 1 }],
        };
      } else {
        // Product already in cart, update quantity
        return {
          cartAr: state.cartAr.map((product, index) =>
            index === productIndex
              ? { ...product, quantity: (product.quantity || 1) + 1 }
              : product
          ),
        };
      }
    case actionTypes.DELETE_QUANTITY:
      const { index } = action.payload;
      const updatedCart = [...state.cartAr];

      if (index >= 0 && index < updatedCart.length) {
        const updatedItem = { ...updatedCart[index] };

        if (updatedItem.quantity > 1) {
          updatedItem.quantity -= 1;
          updatedCart[index] = updatedItem;
        } else {
          // Optionally, remove the item from the cart if the quantity becomes zero
          updatedCart.splice(index, 1);
        }
      }

      return {
        ...state,
        cartAr: updatedCart,
      };
    case actionTypes.DELETE_PRODUCT:
      let newcart = state.cartAr;
      const objIndex = newcart.findIndex((obj) => obj.id === action.payload.id);
      newcart.splice(objIndex, 1);
      console.log(">>newcart", newcart);
      return { cartAr: [...newcart], totalprice: 0 };

    case actionTypes.TOTAL_PRODUCT:
      const total = state.cartAr.reduce((cartTotal, cartItem) => {
        return cartTotal + cartItem.price * cartItem.quantity;
      }, 0);
      return {
        ...state,
        total,
      };
    case actionTypes.SET_SIDE_BAR_ON:
      state.isSidebarOn = true;
      return {
        ...state,
      };
    case actionTypes.SET_SIDE_BAR_OFF:
      state.isSidebarOn = false;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
