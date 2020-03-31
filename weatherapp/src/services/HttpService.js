import axios from "axios";

axios.interceptors.response.use(
  success => {
    // console.log("Success Interceptor", success);
    return success;
  },
  error => {
    // console.log("Error Interceptor", error);
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
