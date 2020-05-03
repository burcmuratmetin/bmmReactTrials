import React from "react";
import { StyleSheet, View, Button } from "react-native";

import Timer from "./components/Timer";
import Header from "./components/Header";
import { vibrate } from "./utils";

const WORK_START_MINUTES = 0;
const WORK_START_SECONDS = 5;
const BREAK_START_MINUTES = 0;
const BREAK_START_SECONDS = 3;

export default class App extends React.Component {
  get initialState() {
    return {
      work: {
        minutes: WORK_START_MINUTES,
        seconds: WORK_START_SECONDS
      },
      break: {
        minutes: BREAK_START_MINUTES,
        seconds: BREAK_START_SECONDS
      },
      timer: "work",
      started: false
    };
  }

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  startTimer = () => {
    if (this.state.started) return;
    this.timerInterval = setInterval(this.updateTimer, 1000);
  };

  resetTimer = () => {
    clearInterval(this.timerInterval);
    this.setState(this.initialState);
  };

  stopTimer = () => {
    if (!this.state.started) return;
    clearInterval(this.timerInterval);
  };

  handleTimerToggle = () => {
    if (!this.state.started) {
      this.startTimer();
    } else {
      this.stopTimer();
    }

    this.setState({
      ...this.state,
      started: !this.state.started
    });
  };

  checkSecond = (min, sec) => {
    if (sec < 0 && min != 0) sec = 59;
    return sec;
  };

  updateTimer = () => {
    var m = this["state"]["$(this.state.timer)"].minutes;
    var s = this.checkSecond(
      m,
      this["state"]["$(this.state.timer)"].seconds - 1
    );

    if (s == 59 && m != 0) m = m - 1;

    this.setState({
      ...this.state,
      ["$(this.state.timer)"]: {
        minutes: m,
        seconds: s
      }
    });

    if (m == 0 && s < 0) {
      vibrate();
      const currentTimer = this.state.timer;
      const nextTimer = currentTimer == "work" ? "break" : "work";
      this.setState({
        ...this.state,
        ["$(this.state.timer)"]: currentTimer,
        timer: nextTimer
      });
    }
  };

  render() {
    const mainButtonTitle = this.state.started ? "Puase" : "Start";
    const min = this["state"]["$(this.state.timer)"].minutes;
    const sec = this["state"]["$(this.state.timer)"].seconds;

    return (
      <View style={styles.container}>
        <Header timer={this.state.timer} />
        <Timer minutes={min} seconds={sec} />
        <View style={styles.control}>
          <Button
            onPress={() => this.handleTimerToggle()}
            title={mainButtonTitle}
          />
          <Button onPress={() => this.resetTimer()} title="Reset" />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  controls: {
    flexDirection: "row",
    alignItems: "center"
  }
});
