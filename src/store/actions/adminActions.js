import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllBrand,
  getAllTrademark,
  getAllProductSearch,
} from "../../services/userService";

import {
  getAllCodeServices,
  createNewUserAdmin,
  getAllUsers,
  DeleteUserAdmin,
  EditUserAdmin,
  getAllTopic,
} from "../../services/userService";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeServices("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed(error));
    }
  };
};

//* ACTION REDUX GENDER
export const fetchGenderSuccess = (dataGender) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: dataGender,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//* ACTION REDUX POSITION
export const fetchPositionSuccess = (dataPosition) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: dataPosition,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//* ACTION REDUX ROLE
export const fetchRoleSuccess = (dataRole) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: dataRole,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeServices("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed(error));
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeServices("ROLE");

      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed(error));
    }
  };
};
// FIRE ACTION SAVE USER
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserAdmin(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user successfully");
        dispatch(saveUserSuccess());
        dispatch(fellGetAllUser());
      } else {
        toast.error("This customer already exists in the system");

        dispatch(saveUserFailed());
      }
    } catch (error) {
      toast.error("This customer already exists in the system");
      dispatch(saveUserFailed(error));
      console.log("SaveUserFailed error", error);
    }
  };
};
export const saveUserSuccess = () => ({
  type: "CREATE_SAVE_SUCCESS",
});
export const saveUserFailed = () => ({
  type: "CREATE_SAVE_FAILED",
});

// FIRE ACTION GET USER
export const fellGetAllUser = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fellGetAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fellGetAllUserFailed());
      }
    } catch (error) {
      dispatch(fellGetAllUserFailed(error));
      console.log("SaveUserFailed error", error);
    }
  };
};
export const fellGetAllUserSuccess = (data) => ({
  type: "FETCH_ALL_USER_SUCCESS",
  users: data,
});
export const fellGetAllUserFailed = () => ({
  type: "FETCH_ALL_USER_FAILED",
});

// FIRE ACTION DELETE USER
export const fetchDeleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await DeleteUserAdmin(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete user successfully");
        dispatch(deleteUserSuccess());
        dispatch(fellGetAllUser());
      } else {
        toast.error("Delete user Failed");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error("Delete user Failed");
      dispatch(deleteUserFailed(error));
      console.log("SaveUserFailed error", error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const fetchEditUser = (inputData) => {
  return async (dispatch, getState) => {
    try {
      let res = await EditUserAdmin(inputData);
      if (res && res.errCode === 0) {
        toast.success("edit user successfully");
        dispatch(editUserSuccess());
        dispatch(fellGetAllUser());
      } else {
        toast.error("edit user Failed");
        console.log(res);
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("edit user Failed");
      dispatch(editUserFailed(error));
      console.log("editUserFailed error", error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
export const fetchAllInfo = () => {
  return async (dispatch, getState) => {
    try {
      let resBrand = await getAllBrand("NONE");

      let resTrademark = await getAllTrademark("NONE");
      let resTopic = await getAllTopic();

      if (
        resBrand &&
        resBrand.errCode === 0 &&
        resTrademark &&
        resTrademark.errCode === 0 &&
        resTopic &&
        resTopic.errCode === 0
      ) {
        let data = {
          resBrand: resBrand.data,
          resTrademark: resTrademark.data,
          resTopic: resTopic.data,
        };
        dispatch({
          type: actionTypes.FETCH_ALL_REQUIRED_INFO_SUCCESS,
          AllInfo: data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_ALL_REQUIRED_INFO_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ALL_REQUIRED_INFO_FAILED });
      console.log("get all info doctor error", error);
    }
  };
};

//? add to cart redux
export const buyProduct = (product) => {
  console.log("product", product);
  return {
    type: actionTypes.BUY_PRODUCT,
    payload: product,
  };
};

export const deleteProduct = (product) => {
  return {
    type: actionTypes.DELETE_PRODUCT,
    payload: product,
  };
};
export const totalProduct = (product) => {
  return {
    type: actionTypes.TOTAL_PRODUCT,
    payload: product,
  };
};

export const sideBarOn = () => {
  return {
    type: actionTypes.SET_SIDE_BAR_ON,
  };
};
export const sideBarOff = () => {
  return {
    type: actionTypes.SET_SIDE_BAR_OFF,
  };
};

export const deleteQuantity = (index) => {
  return {
    type: actionTypes.DELETE_QUANTITY,
    payload: { index },
  };
};
//get top PRODUCT service
export const fetchAllProductSearch = (searchIId) => {
  return async (dispatch, getState) => {
    try {
      let resSearch = await getAllProductSearch(searchIId);

      if (resSearch && resSearch.errCode === 0) {
        let data = {
          resSearch: resSearch.data,
        };
        dispatch({
          type: actionTypes.GET_ALL_PRODUCT_SEARCH_SUCCESS,
          AllSearch: data,
        });
      } else {
        dispatch({ type: actionTypes.GET_ALL_PRODUCT_SEARCH_FAILED });
      }
    } catch (error) {
      dispatch({ type: actionTypes.GET_ALL_PRODUCT_SEARCH_FAILED });
      console.log("get all info doctor error", error);
    }
  };
};
