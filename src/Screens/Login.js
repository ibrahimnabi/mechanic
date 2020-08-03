import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { Actions } from "react-native-router-flux";
import Firebase from "../Firebase/Firebase";
import { connect } from "react-redux";
import {
  login,
  updateServices,
  updateSessions,
  updateReviews,
  updateCustomers,
} from "../Redux/Actions/ActionCreator";
import { storeUser } from "../Util/Storage";
import Logo from "../Components/Logo";
import SmallWavyBottom from "../Components/SmallWavyBottom";
import RoundTextInputWithIcon from "../Components/RoundTextInputWithIcon";
import RedButton from "../Components/RedButton";
import OpenSansText from "../Components/OpenSansText";
import TransparentButton from "../Components/TransparentButton";
import Or from "../Components/Or";

class Login extends Component {
  state = { email: "", password: "", focus: false };
  submit = async () => {
    try {
      const user = await Firebase.login(this.state.email, this.state.password);
      if (user) {
        storeUser(user);
        this.props.login(user);
        if (!user.verified) {
          Actions.unverified();
        } else {
          if (user.blocked) {
            Actions.blocked();
          } else {
            const services = await Firebase.getServices(user.uid);
            if (services.length > 0) {
              const reviews = await Firebase.getReviews(user.uid);
              const sessArr = await Firebase.getSessions(user.uid);
              const customers = await Firebase.getCustomers();
              this.props.updateReviews(reviews);
              this.props.updateSessions(sessArr);
              this.props.updateCustomers(customers);
              this.props.updateServices(services);
              Actions.home();
            } else {
              Actions.addService();
            }
          }
        }
      } else {
        Alert.alert(
          "Login Unsuccessful!",
          "Please check if the email and password."
        );
      }
    } catch (error) {
      Alert.alert(
        "Login Unsuccessful!",
        "Please check if the email and password."
      );
    }
  };
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: Dimensions.get("screen").height }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <Logo></Logo>
          <View style={{ marginVertical: 20 }}></View>
          <RoundTextInputWithIcon
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            keyboardType="email-address"
            placeholder="Enter your Email Address"
            icon="mail"
          ></RoundTextInputWithIcon>
          <RoundTextInputWithIcon
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            keyboardType="default"
            placeholder="Enter your Password"
            secureTextEntry
            icon="lock"
          ></RoundTextInputWithIcon>
          <TouchableOpacity
            onPress={Actions.forgot}
            style={{ marginTop: 15, width: "85%" }}
          >
            <OpenSansText style={{ textAlign: "right", color: "blue" }}>
              Forgot Password?
            </OpenSansText>
          </TouchableOpacity>
          <RedButton style={{ marginTop: 30 }} onPress={this.submit}>
            Login to your account
          </RedButton>
          <Or></Or>
        </View>
        <SmallWavyBottom>
          <TransparentButton onPress={Actions.register}>
            Register a new account
          </TransparentButton>
        </SmallWavyBottom>
      </ScrollView>
    );
  }
}

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      login: (user) => dispatch(login(user)),
      updateServices: (services) => dispatch(updateServices(services)),
      updateSessions: (payload) => dispatch(updateSessions(payload)),
      updateReviews: (payload) => dispatch(updateReviews(payload)),
      updateCustomers: (payload) => dispatch(updateCustomers(payload)),
    };
  }
)(Login);
