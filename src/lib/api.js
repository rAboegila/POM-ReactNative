import axios from "axios";
import { getSavedToken } from "./secureStorage";
const baseURL = "http://192.168.1.168:5000/pom/";
export const apiToken = async () => {
  const token = await getSavedToken();
  return axios.create({
    baseURL: baseURL,
    // timeout: 5000,
    headers: {
      Authorization: "Bearer " + token
    },
  });
};

export default api = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
});
