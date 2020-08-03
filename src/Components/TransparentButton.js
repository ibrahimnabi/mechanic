import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import OpenSansBoldText from "./OpenSansBoldText";

export default class TransparentButton extends Component {
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
            backgroundColor: "transparent",
            borderRadius: 100,
            borderColor: "white",
            borderWidth: 1,
          },
          this.props.style,
        ]}
      >
        <OpenSansBoldText style={{ color: "#fff", fontSize: 16 }}>
          {this.props.children}
        </OpenSansBoldText>
      </TouchableOpacity>
    );
  }
}
