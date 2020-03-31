import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE
} from "./weatherActionTypes";

const initialState = {
  loading: false,
  weather: [],
  error: ""
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        weather: action.payload,
        loading: false,
        error: ""
      };
    case FETCH_WEATHER_FAILURE:
      return {
        weather: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default weatherReducer;
