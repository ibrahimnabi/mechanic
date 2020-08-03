import React, { Component } from "react";
import { Text, View, Platform, Picker } from "react-native";

export default class RoundPicker extends Component {
  render() {
    return (
      <View>
        <View
          style={{
            width: "90%",
            borderColor: "#000",
            borderWidth: Platform.OS === "ios" ? 0 : 1,
            borderRadius: 100,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
            paddingHorizontal: 10,
          }}
        >
          <Picker
            style={{ flex: 1, paddingHorizontal: 10, fontFamily: "OpenSans" }}
            selectedValue={this.props.selectedValue}
            onValueChange={this.props.onValueChange}
          >
            <Picker.Item label={this.props.label} value={null}></Picker.Item>
            {this.props.options.map((item) => (
              <Picker.Item label={item} value={item}></Picker.Item>
            ))}
          </Picker>
        </View>
      </View>
    );
  }
}
