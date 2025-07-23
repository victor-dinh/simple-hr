import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;
const parseError = (error) =>
  (error.response && error.response.data) || error.message || error.toString();

const getUser = async (userID) => {
  try {
    return await axios.get(`${API_URL}profile/${userID}`,  { headers: authHeader() })
  } catch (err) {
    throw parseError(err);
  }
};

const updateUser = async (userId, userData) => {
  try {
    return await axios.put(`${API_URL}profile/${userId}`, userData, { headers: authHeader() })
  } catch (err) {
    throw parseError(err);
  }
};

const userService = {
  getUser,
  updateUser
};

export default userService