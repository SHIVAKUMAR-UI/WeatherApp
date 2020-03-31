import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 5
  },
  title: {
    fontSize: 14
  }
});

const WeatherCard = props => {
  const classes = useStyles();
  const { weather } = props;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Temp: {weather.averageTemp}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Date: {weather.date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
