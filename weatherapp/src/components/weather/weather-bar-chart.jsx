import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

export default class WeatherBarChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.props = props;
    const { data } = this.props;

    this.state = {
      data
    };
  }

  componentDidUpdate = () => {
    const { data } = this.props;
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis max={8} />

          <BarSeries valueField="temperature" argumentField="time" />

          <Animation />
        </Chart>
      </Paper>
    );
  }
}
