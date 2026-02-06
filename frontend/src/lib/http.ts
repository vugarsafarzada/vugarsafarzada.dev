import axios from "axios";

const normalizeBaseUrl = (value?: string) => {
  if (!value) return "";
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

const baseURL = normalizeBaseUrl(process.env.API_BASE_URL);

export const http = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
