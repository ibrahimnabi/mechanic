import React, { Component } from "react";
import { Text, View, Image } from "react-native";

export default class Logo extends Component {
  render() {
    return (
      <Image
        style={{ resizeMode: "contain", width: "80%" }}
        source={require("../Images/logo.png")}
      ></Image>
    );
  }
}
