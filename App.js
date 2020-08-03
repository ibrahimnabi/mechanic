import React, { Component } from "react";
import { Provider } from "react-redux";
import Navigation from "./src/Navigation";
import store from "./src/Redux/Store/store";
import * as TaskManager from "expo-task-manager";
import * as Font from "expo-font";

export default class App extends Component {
  state = { fontsLoaded: false };
  componentWillMount = async () => {
    await Font.loadAsync({
      OpenSans: require("./assets/Open_Sans/OpenSans-Regular.ttf"),
      "OpenSans-Bold": require("./assets/Open_Sans/OpenSans-Bold.ttf"),
    });
    this.setState({
      fontsLoaded: true,
    });
  };
  componentDidMount = async () => {
    await TaskManager.unregisterAllTasksAsync();
  };
  render() {
    return this.state.fontsLoaded ? (
      <Provider store={store}>
        <Navigation></Navigation>
      </Provider>
    ) : null;
  }
}
