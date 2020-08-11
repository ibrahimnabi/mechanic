import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { deleteUser } from "../Util/Storage";
import { Actions } from "react-native-router-flux";
import { MaterialIcons } from "@expo/vector-icons";
import OpenSansBoldText from "./OpenSansBoldText";
import OpenSansText from "./OpenSansText";

const DrawerItem = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        alignSelf: "center",
        marginTop: 14,
      }}
    >
      <View
        style={{
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 15,
        }}
      >
        <MaterialIcons name={props.icon} size={24} color="#fff" />
      </View>
      <OpenSansBoldText style={{ color: "#fff", fontSize: 18 }}>
        {props.children}
      </OpenSansBoldText>
    </TouchableOpacity>
  );
};

class DrawerComponent extends Component {
  logout = async () => {
    await deleteUser();
    Actions.login();
  };
  render() {
    const reviews = this.props.reviews.filter((r) => r.from === "mechanic");
    let rating = 0;
    reviews.forEach((e) => (rating += e.stars));
    rating = rating / reviews.length;
    return (
      <ScrollView
        style={{ backgroundColor: "#FF4A4A" }}
        contentContainerStyle={{
          minHeight: Dimensions.get("window").height,
        }}
      >
        <View
          style={{
            height: 200,
            backgroundColor: "#fff",
            borderBottomEndRadius: 100,
            borderBottomStartRadius: 0,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
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
          <TouchableOpacity
            onPress={Actions.drawerClose}
            style={{ position: "absolute", top: 20, right: 5 }}
          >
            <MaterialIcons
              name="highlight-off"
              size={24}
              color="rgba(0,0,0,0.3)"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.editProfile}>
            {this.props.mechanic ? (
              this.props.mechanic.photo_url ? (
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    resizeMode: "cover",
                  }}
                  source={{ uri: this.props.mechanic.photo_url }}
                ></Image>
              ) : (
                <MaterialIcons name="account-circle" size={80} color="black" />
              )
            ) : (
              <MaterialIcons name="account-circle" size={80} color="black" />
            )}
          </TouchableOpacity>
          <OpenSansBoldText style={{ marginTop: 10, fontSize: 16 }}>
            {this.props.mechanic && this.props.mechanic.name}
          </OpenSansBoldText>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="stars" size={18} color="#E0AC24" />
            <OpenSansText style={{ fontSize: 13, marginLeft: 5 }}>
              {rating ? rating : "Unrated"}
            </OpenSansText>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <OpenSansBoldText>Account Balance</OpenSansBoldText>
            <OpenSansText style={{ fontSize: 13, marginLeft: 5 }}>
              {this.props.balance}
            </OpenSansText>
          </View>
        </View>
        <DrawerItem onPress={Actions.editProfile} icon="settings">
          Account Settings
        </DrawerItem>
        <DrawerItem onPress={Actions.report} icon="report-problem">
          Report a Problem
        </DrawerItem>
        <DrawerItem onPress={Actions.sessions} icon="history">
          Sessions
        </DrawerItem>
        <DrawerItem onPress={Actions.addService} icon="build">
          Services
        </DrawerItem>
        <DrawerItem onPress={Actions.support} icon="headset-mic">
          Support
        </DrawerItem>
        <DrawerItem onPress={Actions.feedback} icon="thumb-up">
          Feedback
        </DrawerItem>
        <DrawerItem onPress={this.logout} icon="subdirectory-arrow-right">
          Logout
        </DrawerItem>
      </ScrollView>
    );
  }
}
export default connect((state) => state)(DrawerComponent);
