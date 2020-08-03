import React, { Component } from "react";
import { Text } from "react-native";

export default class OpenSansBoldText extends Component {
  render() {
    return (
      <Text style={[{ fontFamily: "OpenSans-Bold" }, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
