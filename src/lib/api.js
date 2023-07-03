import axios from "axios";
import { getSavedToken } from "./secureStorage";
const baseURL = "http://192.168.1.108:5000/pom/";
export const apiToken = (getState) =>
  axios.create({
    baseURL: baseURL,
    // timeout: 5000,
    headers: {
      Authorization: getSavedToken() ? "Bearer " + getSavedToken() : null,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
export default api = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
});
