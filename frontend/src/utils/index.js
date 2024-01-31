import axios from "axios";

// const BASE_URL = "http://localhost:5500";
let BASE_URL;

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://";
} else {
  BASE_URL = "http://localhost:6000";
}

export const Axios = axios.create({
  baseURL: `${BASE_URL}`,
});
