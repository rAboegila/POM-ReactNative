import axios from "axios";
import { useSelector } from "react-redux";
import { getToken } from "../redux/features/auth/authSlice";

const baseURL = "http://192.168.1.168:5000/pom/";
export const apiToken = (getState) =>{
  const token = useSelector(getToken)
axios.create({
    baseURL: baseURL,
    // timeout: 5000,
    headers: {
      Authorization: token
        ? "Bearer " + token
        : null,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
export default api = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
});
