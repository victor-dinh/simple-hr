import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getUser = (userID) => {
  return axios.get(API_URL + "profile/" + userID, { headers: authHeader() });
};

const updateUser = (userId, userData) => {
  return axios.put(API_URL + "profile/" + userId, userData, { headers: authHeader() });
};

const userService = {
  getUser,
  updateUser
};

export default userService