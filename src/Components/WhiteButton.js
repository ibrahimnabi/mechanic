import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import OpenSansBoldText from "./OpenSansBoldText";

export default class WhiteButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          {
            width: "90%",
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: 100,
          },
          this.props.style,
        ]}
      >
        <OpenSansBoldText style={{ color: "#FF4A4A", fontSize: 16 }}>
          {this.props.children}
        </OpenSansBoldText>
      </TouchableOpacity>
    );
  }
}
