import axios from "axios";
import { getSavedToken } from "./secureStorage";
import { LOCAL_BASE_URL, DEPLOY_BASE_URL } from "../lib/env";
const baseURL = DEPLOY_BASE_URL;

export const apiToken = async () => {
  const token = await getSavedToken();
  return axios.create({
    baseURL: baseURL,
    // timeout: 5000,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export default api = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
});
