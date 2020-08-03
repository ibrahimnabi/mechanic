import React, { Component } from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

export default class Blocked extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{
            resizeMode: "contain",
            width: Dimensions.get("window").width * 0.9,
            marginBottom: 40,
          }}
          source={require("../Images/logo.png")}
        ></Image>
        <Text>Your Account has been blocked.</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#FF4A4A",
            width: "90%",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginTop: 30,
          }}
          onPress={Actions.support}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Get Admin Support
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
