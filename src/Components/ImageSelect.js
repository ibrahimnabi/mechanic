import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import OpenSansText from "./OpenSansText";

export default class ImageSelect extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={this.props.onPress}
      >
        {this.props.image ? (
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 200,
              resizeMode: "cover",
            }}
            source={{ uri: this.props.image }}
          ></Image>
        ) : (
          <MaterialIcons name={this.props.icon} size={200} color="black" />
        )}
        <OpenSansText
          style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", marginTop: 10 }}
        >
          {this.props.label}
        </OpenSansText>
      </TouchableOpacity>
    );
  }
}
