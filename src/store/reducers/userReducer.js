import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  userInfoClint: null,
  isLoggedClint: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedClint: true,
        userInfoClint: action.userInfoClint,
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedClint: false,
        userInfoClint: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfoClint: null,
        userInfo: null,
      };
    default:
      return state;
  }
};

export default appReducer;
