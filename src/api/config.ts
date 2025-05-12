import type { AxiosRequestConfig } from "axios";


const AxiosConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
};

export default AxiosConfig;
