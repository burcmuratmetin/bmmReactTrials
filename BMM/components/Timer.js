import React from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

const Timer = props => {
  const minutes = props.minutes < 10 ? "0" + props.minutes : props.minutes;
  const seconds = props.seconds < 10 ? "0" + props.seconds : props.seconds;
  return (
    <Text style={styles.counter}>
      {minutes}:{seconds}
    </Text>
  );
};

Timer.propTypes = {
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  counter: {
    fontSize: 40,
    fontWeight: 500
  }
});

export default Timer;
