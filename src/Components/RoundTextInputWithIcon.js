import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default class RoundTextInputWithIcon extends Component {
  render() {
    return (
      <View
        style={{
          width: "90%",
          borderColor: "#000",
          borderWidth: 1,
          borderRadius: 100,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          style={{ flex: 1, paddingHorizontal: 10, fontFamily: "OpenSans" }}
        ></TextInput>
        <View
          style={{
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.props.icon ? (
            <MaterialIcons name={this.props.icon} size={24} color="black" />
          ) : null}
        </View>
      </View>
    );
  }
}
