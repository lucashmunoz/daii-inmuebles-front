import axios from "axios";
import { getTokenFromCookie } from "../helpers";

export const API_HOST = "http://3.217.122.117:8080";

export interface ErrorResponse {
  message: string
  status: number
  error: string
}

export const accessTokenUserId1Admn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6IkFETUlOIn0.aAJvWi9vEjqzH7q2yxDL6MaqMHH8b6pw-R_faMJJIvg";
export const accessTokenUserId2NotAdmn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIn0.yL2k9bh2YuSZGC1hScCCfCuDoLfrCimCPbZ4okeY_Zw";

axios.defaults.baseURL = API_HOST;
axios.defaults.timeout = 600000;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + getTokenFromCookie()
};

export default axios;
