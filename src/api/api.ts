import axios from "axios";

export const API_HOST = "http://98.82.106.250:80/";

export interface ErrorResponse {
  message: string
  status: number
  error: string
}

export const currentUserId = "1";

axios.defaults.baseURL = API_HOST;
axios.defaults.timeout = 600000;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
  userId: currentUserId
};

export default axios;
