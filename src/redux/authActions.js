import * as actionTypes from "./constants";

export const loginSuccess = (userData) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = () => ({
  type: actionTypes.LOGIN_FAILURE,
});

export const signupSuccess = (userData) => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: userData,
});

export const signupFailure = () => ({
  type: actionTypes.SIGNUP_FAILURE,
});

export const logout = () => {
  localStorage.removeItem("authState");
  return {
    type: actionTypes.LOGOUT,
  };
};
