import axios from "axios";
import { getSavedToken } from "./secureStorage";
import { LOCAL_BASE_URL, DEPLOY_BASE_URL } from "../lib/env";
const baseURL = LOCAL_BASE_URL;
export const apiToken = () =>
  axios.create({
    baseURL: baseURL,
    // timeout: 5000,
    headers: {
      Authorization: "Bearer " + getSavedToken(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

export default api = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
});
