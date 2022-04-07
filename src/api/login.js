import axios from "axios";
import { domain } from "./api-config.js";

// export const attemptRegister = (credentials) => {
//   return axios
//     .post(domain + "/user/register", {
//       credentials,
//     })
//     .then((response) => {
//       console.log("RegisterData: " + response);
//       return response;
//     })
//     .catch((err) => {
//       console.log(err, ": An Error has occured while registering");
//     });
// };

// export const attemptLogin = (credentials) => {
//   return axios
//     .post(domain + "/user/login", {
//       credentials,
//     })
//     .then((response) => {
//       console.log("loginData: " + response);
//       return response;
//     })
//     .catch((err) => {
//       console.log("An Error has occured while authenticating");
//     });
// };

export const attemptGoogleLogin = () => {
  return axios
    .get(domain + "/user/get", {
      withCredentials: true,
    })
    .then((response) => {
      // console.log("loginData: " + response);
      return response;
    })
    .catch((err) => {
      console.log("An Error has occured while authenticating with Google");
    });
};

export const attemptLogout = () => {
  axios.get(domain + "/user/logout");
};
