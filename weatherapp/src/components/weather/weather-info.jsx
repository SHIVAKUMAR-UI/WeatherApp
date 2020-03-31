import React from "react";
import { connect } from "react-redux";
import { fetchWeather } from "../../redux";
import WeatherCard from "./weather-card";
import { FormControlLabel, Radio, Grid } from "@material-ui/core";
import { ArrowBackTwoTone, ArrowForwardTwoTone } from "@material-ui/icons";
import WeatherBarChart from "./weather-bar-chart";
import { paginate } from "../../util/paginate";
import WeatherHelper from "./weather-helper";

class WeatherInfo extends WeatherHelper {
  state = {
    temperature: "fahrenheit",
    pageSize: 3,
    currentPage: 0,
    sortColumn: {},
    maximumPagesCount: 0,
    barChartWeather: {},
    selectedDate: ""
  };

  componentDidMount() {
    const { weatherData } = this.props;
    if (
      !weatherData.weather ||
      weatherData.weather ||
      weatherData.weather.list.length === 0
    )
      this.props.fetchWeather();
  }

  render() {
    let {
      temperature,
      currentPage,
      pageSize,
      maximumPagesCount,
      barChartWeather,
      selectedDate
    } = this.state;
    const { weatherData } = this.props;

    if (weatherData.loading)
      return (
        <div className="loading">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );

      if(!weatherData.weather.list)
      return (
        <div className="loading">
          No Data to display. Please verify your internet connection
        </div>
      )


    const averageWeatherOftheDay =
      this.averageOfTheDay(weatherData.weather.list);

    maximumPagesCount =
      averageWeatherOftheDay &&
      Math.ceil(averageWeatherOftheDay.length / pageSize);

    let weatherAfterPagination = paginate(
      averageWeatherOftheDay,
      currentPage,
      pageSize
    );

    if (temperature === "fahrenheit")
      weatherAfterPagination = weatherAfterPagination.map(weather => {
        weather.averageTemp =
          this.convertTemperatureToFahrenhet(weather.averageTemp) + " \u00b0 F";
        return weather;
      });
    else
      weatherAfterPagination = weatherAfterPagination.map(weather => {
        weather.averageTemp =
          this.convertTemperatureToCelcius(weather.averageTemp) + " \u00b0 C";
        return weather;
      });

    return (
      <React.Fragment>
        <div className="weather-info">
          <Grid container>
            <Grid item>
              <FormControlLabel
                style={{ display: "inline-block", float: "right" }}
                value="celcius"
                control={<Radio />}
                label="Celcius"
                checked={temperature === "celcius"}
                onChange={this.handleTemperatureChange.bind(this)}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value="fahrenheit"
                control={<Radio />}
                label="Fahrenheit"
                checked={temperature === "fahrenheit"}
                onChange={this.handleTemperatureChange.bind(this)}
              />
            </Grid>
          </Grid>
        </div>
        <div className="row">
          <div className="col-2 pointer">
            {currentPage !== 0 && (
              <ArrowBackTwoTone
                fontSize="large"
                onClick={() => {
                  this.pageWithIndex(currentPage - 1);
                }}
              />
            )}
          </div>
          <div className="col-8"></div>
          <div className="col-2 pointer">
            {maximumPagesCount !== currentPage + 1 && (
              <ArrowForwardTwoTone
                fontSize="large"
                onClick={() => {
                  this.pageWithIndex(currentPage + 1);
                }}
              />
            )}
          </div>
        </div>
        <div className="row">
          {weatherAfterPagination &&
            weatherAfterPagination.map((weather, index) => (
              <div className="col-4 w-100" key={index}>
                <button
                  style={{ width: "inherit" }}
                  className={`${weather.date === selectedDate ? "active" : ""}`}
                  onClick={() => {
                    this.selectedCard(weather.date, temperature);
                  }}
                >
                  <WeatherCard weather={weather} />
                </button>
              </div>
            ))}
        </div>
        <div className="bar-chart">
          {barChartWeather.length > 0 && (
            <WeatherBarChart data={barChartWeather} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

// Sets store object to props
const mapStateToProps = state => {
  return {
    weatherData: state.weather
  };
};

// To trigger redux service
const mapDispatchToProps = dispatch => {
  return {
    fetchWeather: () => dispatch(fetchWeather())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherInfo);
