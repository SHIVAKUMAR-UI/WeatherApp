import { Component } from "react";

// Helper class weather info
class WeatherHelper extends Component {

  // Gets Triggered when click on temperature radio buttons  
  handleTemperatureChange = event => {
    this.selectedCard(this.state.selectedDate, event.target.value);
  };

  // Gets triggered when click on weather card
  selectedCard = (weatherDate, temperature) => {
    const { weatherData } = this.props;
    let weatherBarchartData = new Array(8).fill({});

    weatherBarchartData = weatherBarchartData.map((_bardata, index) => {
      let bardata = { time: index * 3, temperature: "" };
      const weather = weatherData.weather.list.find(weather => {
        const date_text = new Date(weather.dt_txt);
        const _selectedDate = new Date(weather.dt_txt).toLocaleDateString();
        return (
          _selectedDate === weatherDate &&
          bardata.time === date_text.getHours()
        );
      });
      if (weather) {
        bardata.temperature =
          temperature === "fahrenheit"
            ? this.convertTemperatureToFahrenhet(weather.main.temp)
            : this.convertTemperatureToCelcius(weather.main.temp);
        bardata.time = this.tConvert(+bardata.time);

        return bardata;
      } else {
        return { time: this.tConvert(+bardata.time), temperature: "0" };
      }
    });

    this.setState({
      barChartWeather: weatherBarchartData,
      selectedDate: weatherDate,
      temperature: temperature
    });
  };

  // Converts 24 hrs to 12hrs format
  tConvert = time => {
    return (time > 12 ? time - 12 : time) + " " + (time >= 12 ? "PM" : "AM");
  };

  // Sets page current index to display/hide arrows
  pageWithIndex = index => {
    this.setState({ currentPage: index });
  };

  // Convers temperature into Celcius
  convertTemperatureToCelcius = temperature => {
    return Math.round(+(temperature - 273).toFixed(2));
  };

  // Convers temperature into Fahrenhet
  convertTemperatureToFahrenhet = temperature => {
    return Math.round(+((9 / 5) * (temperature - 273) + 32).toFixed(2));
  };

  // Calculates one day's temperature average
  averageOfTheDay = weather => {
    let _weather = {};

    weather.forEach(function(item) {
      const selectedDate = new Date(item.dt_txt).toLocaleDateString();
      let selectedWeather = (_weather[selectedDate] = _weather[
        selectedDate
      ] || { count: 0, total: 0 });

      selectedWeather.count++;
      selectedWeather.total += item.main.temp;
    });

    let res = Object.entries(_weather).map(function(entry) {
      return {
        date: entry[0],
        averageTemp: +(entry[1].total / entry[1].count).toFixed(2)
      };
    });

    return res;
  };
}

export default WeatherHelper;
