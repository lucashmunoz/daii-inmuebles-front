import axios from "axios";

export const API_HOST = "http://3.217.122.117:8080";

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
