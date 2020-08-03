import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import LargeWavyBottom from "../Components/LargeWavyBottom";
import Logo from "../Components/Logo";
import LoadingGlassHour from "../Components/LoadingGlassHour";
import OpenSansBoldText from "../Components/OpenSansBoldText";
export default class SplashScreen extends Component {
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
          <LoadingGlassHour></LoadingGlassHour>
          <OpenSansBoldText
            style={{ color: "white", fontSize: 16, marginTop: 20 }}
          >
            The Application is loading
          </OpenSansBoldText>
        </LargeWavyBottom>
      </View>
    );
  }
}
