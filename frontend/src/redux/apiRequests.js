import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "./authSlice";
import axios from "axios";
import {
  clearUserList,
  deleteUsersFailed,
  deleteUsersStart,
  deleteUsersSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch {
    dispatch(loginFailed());
  }
};

export const register = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    console.log(err);
    dispatch(registerFailed("Something is wrong"));
  }
};

export const getAllUsers = async (token, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/v1/user/", {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (id, dispatch, token) => {
  console.log("delete");
  dispatch(deleteUsersStart());
  try {
    console.log(id);
    const res = await axios.delete("/v1/user/" + id, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUsersFailed(err.response.data));
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    const res = await axios.post("/v1/auth/logout");
    dispatch(logoutSuccess());
    dispatch(clearUserList());
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailed());
  }
};
