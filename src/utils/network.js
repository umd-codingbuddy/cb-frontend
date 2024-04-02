import axios from "axios";

// Use the below URL for local testing
// const BACKEND_URL = process.env.REACT_APP_SPRING_BOOT_API_LOCAL;
const BACKEND_URL = process.env.REACT_APP_SPRING_BOOT_API;

const backendCall = axios.create({
  baseURL: BACKEND_URL,
});

backendCall.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      // window.localStorage.removeItem('token');
      // window.localStorage.removeItem('role');
      // window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default backendCall;