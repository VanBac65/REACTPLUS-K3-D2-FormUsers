import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  });