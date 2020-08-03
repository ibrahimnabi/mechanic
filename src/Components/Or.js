import React, { Component } from "react";
import { View } from "react-native";
import OpenSansText from "./OpenSansText";

export default class Or extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 50,
          marginBottom: 30,
        }}
      >
        <View
          style={{ flex: 1, height: 1, backgroundColor: "rgba(0,0,0,0.1)" }}
        ></View>
        <OpenSansText
          style={{
            color: "rgba(0,0,0,0.1)",
            fontSize: 15,
            marginHorizontal: 20,
          }}
        >
          OR
        </OpenSansText>
        <View
          style={{ flex: 1, height: 1, backgroundColor: "rgba(0,0,0,0.1)" }}
        ></View>
      </View>
    );
  }
}
