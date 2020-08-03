import React, { Component } from "react";
import { Text, View, Image, Dimensions, ScrollView } from "react-native";
import Logo from "../Components/Logo";
import LargeWavyBottom from "../Components/LargeWavyBottom";
import WhiteButton from "../Components/WhiteButton";
import TransparentButton from "../Components/TransparentButton";
import { Actions } from "react-native-router-flux";
import OpenSansBoldText from "../Components/OpenSansBoldText";
import SmallWavyBottom from "../Components/SmallWavyBottom";
import { deleteUser } from "../Util/Storage";

export default class Unverified extends Component {
  logout = async () => {
    await deleteUser();
    Actions.login();
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{ minHeight: Dimensions.get("window").height }}
      >
        <View
          style={{
            height: "70%",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Logo></Logo>
          <OpenSansBoldText
            style={{ color: "#000", fontSize: 17, marginTop: 20 }}
          >
            Wait for verification of your Account
          </OpenSansBoldText>
        </View>
        <SmallWavyBottom>
          <TransparentButton onPress={this.logout}>Logout</TransparentButton>
        </SmallWavyBottom>
      </ScrollView>
    );
  }
}
