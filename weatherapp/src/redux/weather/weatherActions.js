import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE
} from "./weatherActionTypes";
import http from "../../services/HttpService";

export const fetchWeatherRequest = () => {
  return {
    type: FETCH_WEATHER_REQUEST
  };
};

export const fetchWeatherSuccess = weather => {
  return {
    type: FETCH_WEATHER_SUCCESS,
    payload: weather
  };
};

export const fetchWeatherFailure = error => {
  return {
    type: FETCH_WEATHER_FAILURE,
    payload: error
  };
};

export const fetchWeather = () => {
  return dispatch => {
    dispatch(fetchWeatherRequest());
    http
      .get(
        "http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40"
      )
      .then(response => {
        const weather = response.data;
        dispatch(fetchWeatherSuccess(weather));
      })
      .catch(errorResponse => {
        const errorMessage = errorResponse.message;
        dispatch(fetchWeatherFailure(errorMessage));
      });
  };
};
