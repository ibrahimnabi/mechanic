import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";

export default class CustomRoundInput extends Component {
  render() {
    return (
      <TextInput
        placeholder={this.props.placeholder}
        onChangeText={this.props.onChangeText}
        keyboardType={this.props.keyboardType}
        value={this.props.value}
        placeholderTextColor={"black"}
        style={{
          borderColor: "rgb(0,0,0)",
          borderWidth: 1,
          width: "90%",
          padding: 10,
          marginVertical: 10,
          borderRadius: 10,
        }}
      />
    );
  }
}
