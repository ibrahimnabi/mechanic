import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Logo from "../Components/Logo";
import LargeWavyBottom from "../Components/LargeWavyBottom";
import OpenSansBoldText from "../Components/OpenSansBoldText";
import WhiteButton from "../Components/WhiteButton";
import TransparentButton from "../Components/TransparentButton";
import { Actions } from "react-native-router-flux";

export default class LandingPage extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: "30%",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Logo></Logo>
        </View>
        <LargeWavyBottom>
          <WhiteButton onPress={Actions.login}>
            I already have an account
          </WhiteButton>
          <TransparentButton
            onPress={Actions.register}
            style={{ marginTop: 50 }}
          >
            Register a new account
          </TransparentButton>
        </LargeWavyBottom>
      </View>
    );
  }
}
