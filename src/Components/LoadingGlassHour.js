import React, { Component } from "react";
import { Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default class LoadingGlassHour extends Component {
  state = { rotation: new Animated.Value(0) };
  componentDidMount = () => {
    this.loop();
  };
  loop = () => {
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.setState(
        {
          rotation: new Animated.Value(0),
        },
        () => {
          this.loop();
        }
      );
    });
  };
  render() {
    const spin = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <MaterialIcons name="hourglass-full" size={50} color="white" />
      </Animated.View>
    );
  }
}
