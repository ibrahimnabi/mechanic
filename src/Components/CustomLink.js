import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

export default class CustomLink extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}
