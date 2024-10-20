// import {
//   LOGIN_REQUEST,
//   LOGIN_FAIL,
//   LOGIN_SUCCESS,
//   REGISTER_USER_REQUEST,
//   REGISTER_USER_SUCCESS,
//   REGISTER_USER_FAIL,
//   LOAD_USER_REQUEST,
//   LOAD_USER_SUCCESS,
//   LOAD_USER_FAIL,
//   LOGOUT_SUCCESS,
//   LOGOUT_FAIL,
//   UPDATE_PROFILE_REQUEST,
//   UPDATE_PROFILE_SUCCESS,
//   UPDATE_PROFILE_FAIL,
//   UPDATE_PASSWORD_REQUEST,
//   UPDATE_PASSWORD_SUCCESS,
//   UPDATE_PASSWORD_FAIL,
//   ALL_USERS_REQUEST,
//   ALL_USERS_SUCCESS,
//   ALL_USERS_FAIL,
//   DELETE_USER_REQUEST,
//   DELETE_USER_SUCCESS,
//   DELETE_USER_FAIL,
//   FORGOT_PASSWORD_REQUEST,
//   FORGOT_PASSWORD_SUCCESS,
//   FORGOT_PASSWORD_FAIL,
//   CLEAR_ERRORS,
// } from "../constants/userConstants";
// import axios from "axios";

// // Login
// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: LOGIN_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post(
//       `https://mernecom-pgkp.onrender.com/api/v1/login`,
//       { email, password },
//       config
//     );

//     // dispatch({ type: LOGIN_SUCCESS, payload: data.user });
//     if (data && data.user && data.token) {
//       dispatch({ type: LOGIN_SUCCESS, payload: data.user });

//       // Optionally store the token directly here in localStorage
//       localStorage.setItem("token", data.token); // Save the token
//       return data; // Return the full data object for further use
//     } else {
//       throw new Error("Invalid response from server.");
//     }
//   } catch (error) {
//     dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
//   }
// };

// // Register
// export const register = (userData) => async (dispatch) => {
//   console.log("user datais " + userData);
//   try {
//     dispatch({ type: REGISTER_USER_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post(`/api/v1/register`, userData, config);

//     dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
//   } catch (error) {
//     console.error("Error details:", error);
//     dispatch({
//       type: REGISTER_USER_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// // Load error
// export const loadUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: LOAD_USER_REQUEST });

//     const { data } = await axios.get(`/api/v1/me`);
//     console.log("Login API Response:", data);
//     dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
//   } catch (error) {
//     dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
//   }
// };

// // User Logout
// export const logout = () => async (dispatch) => {
//   try {
//     await axios.get(`/api/v1/logout`);

//     dispatch({ type: LOGOUT_SUCCESS });
//   } catch (error) {
//     dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
//   }
// };

// export const updateProfile = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PROFILE_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(`/api/v1/me/update`, userData, config);

//     dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PROFILE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Update Password

// export const updatePassword = (passwords) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PASSWORD_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.put(
//       `/api/v1/password/update`,
//       passwords,
//       config
//     );

//     dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PASSWORD_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// export const forgotPassword = (email) => async (dispatch) => {
//   try {
//     dispatch({ type: FORGOT_PASSWORD_REQUEST });

//     const config = { headers: { "Content-Type": "application/json" } };

//     const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

//     dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: FORGOT_PASSWORD_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// export const getAllUsers = () => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_USERS_REQUEST });
//     const { data } = await axios.get(`/api/v1/admin/users`);

//     dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
//   } catch (error) {
//     dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
//   }
// };
// export const deleteUser = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_USER_REQUEST });

//     const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

//     dispatch({ type: DELETE_USER_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: DELETE_USER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import axios from "../axiosConfig"; // Import custom Axios instance

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/login`, { email, password }, config);

    if (data && data.user && data.token) {
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      localStorage.setItem("token", data.token);
      return data;
    } else {
      throw new Error("Invalid response from server.");
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/register`, userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const token = localStorage.getItem("token"); // Get the token from localStorage

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };
    const { data } = await axios.get(`/me`, config);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response?.data.message });
  }
};

// User Logout
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response?.data.message });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const token = localStorage.getItem("token"); // Get the token from localStorage
    console.log("User Action Token" + token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const { data } = await axios.put(`/me/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response?.data.message,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const token = localStorage.getItem("token"); // Get the token from localStorage

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    };

    const { data } = await axios.put(`/password/update`, passwords, config);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response?.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response?.data.message,
    });
  }
};

// Get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const token = localStorage.getItem("token"); // Get token from local storage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token
      },
    };

    const { data } = await axios.get(`/admin/users`, config); // Pass config with headers
   
    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response?.data.message });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
const token = localStorage.getItem("token"); // Get the token from local storage
const config = {
  headers: {
    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  },
};

const { data } = await axios.delete(`/admin/user/${id}`, config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response?.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// export const clearErrors = () => async (dispatch) => {
//   dispatch({ type: CLEAR_ERRORS });
// };
