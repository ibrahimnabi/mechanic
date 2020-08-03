import React, { Component } from "react";
import { Text } from "react-native";

export default class OpenSansText extends Component {
  render() {
    return (
      <Text style={[{ fontFamily: "OpenSans" }, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
