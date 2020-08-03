import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { updateIsOnline } from "../Redux/Actions/ActionCreator";
class NavbarWithLogo extends Component {
  render() {
    return (
      <View
        style={{
          width: "100%",
          padding: 10,
          paddingTop: 30,
          flexDirection: "row",
          borderBottomColor: "rgba(0,0,0,0.2)",
          borderBottomWidth: 1,
          alignItems: "center",
          zIndex: 100,
          backgroundColor: "#fff",
          shadowOffset: {
            width: 3,
            height: 10,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
          elevation: 10,
          marginBottom: 30,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{ resizeMode: "stretch", width: 200, height: 35 }}
            source={require("../Images/logo.png")}
          ></Image>
        </View>
      </View>
    );
  }
}
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateOnline: (value) => dispatch(updateIsOnline(value)),
    };
  }
)(NavbarWithLogo);
