import * as actionTypes from "./constants";
import bcrypt from "bcryptjs";
export const login = (formData, navigate) => {
  return (dispatch) => {
    const authState = JSON.parse(localStorage.getItem("authState"));
    const passwordCheck = bcrypt.compareSync(
      formData.password,
      authState.user.password
    );
    if (authState.user.email === formData.email && passwordCheck === true) {
      console.log("Login Succesfull");
      dispatch(loginSuccess(authState.user.name));
      navigate("/home");
    } else {
      console.log("Error While Login");
      dispatch(loginFailure());
    }
  };
};

export const loginSuccess = (userData) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = () => ({
  type: actionTypes.LOGIN_FAILURE,
});

export const signup = (formData, navigate) => {
  return (dispatch) => {
    if (formData != null) {
      const hashedPassword = bcrypt.hashSync(formData.password, 5);
      formData.password = hashedPassword;
      dispatch(signupSuccess(formData));
      localStorage.setItem(
        "authState",
        JSON.stringify({ isAuthenticated: true, user: formData })
      );
      navigate("/");
    } else {
      dispatch(signupFailure());
    }
  };
};

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
