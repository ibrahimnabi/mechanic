import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Firebase from "../Firebase/Firebase";
import { Actions } from "react-native-router-flux";
import Logo from "../Components/Logo";
import SmallWavyBottom from "../Components/SmallWavyBottom";
import RoundTextInputWithIcon from "../Components/RoundTextInputWithIcon";
import RedButton from "../Components/RedButton";
import TransparentButton from "../Components/TransparentButton";
export default class ForgetPassword extends Component {
  state = { email: "" };
  submit = async () => {
    Firebase.forgetPassword(this.state.email);
    Actions.login();
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{ height: Dimensions.get("window").height }}
      >
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Logo></Logo>
          <View style={{ marginVertical: 20 }}></View>
          <RoundTextInputWithIcon
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            keyboardType="email-address"
            placeholder="Enter your Email Address"
            icon="mail"
          ></RoundTextInputWithIcon>
          <RedButton style={{ marginTop: 40 }} onPress={this.submit}>
            Send Password Reset E-mail
          </RedButton>
          <View style={{ marginVertical: 75 }}></View>
        </View>
        <SmallWavyBottom>
          <TransparentButton onPress={Actions.login}>
            Go Back to Login
          </TransparentButton>
        </SmallWavyBottom>
      </ScrollView>
    );
  }
}
