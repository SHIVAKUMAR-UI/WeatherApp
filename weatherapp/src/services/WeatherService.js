import http from "./HttpService";

// let { REACT_APP_BASE_URL: url } = process.env;
let url =
  "http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40";

export const getWeatherInformation = () => {
  return http.get(`${url}`);
};
