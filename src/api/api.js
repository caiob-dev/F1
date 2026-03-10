import axios from "axios";

export const http = axios.create({
  baseURL: "https://api.jolpi.ca/ergast/f1/",
});
