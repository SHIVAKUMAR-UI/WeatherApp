import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import WeatherInfo from "./components/weather/weather-info";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App container">
        <WeatherInfo />
      </div>
    </Provider>
  );
}

export default App;
