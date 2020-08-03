import React, { Component } from "react";
import { Text, View, Linking, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import Firebase from "../Firebase/Firebase";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import NavbarWithLogo from "../Components/NavbarWithLogo";
import OpenSansBoldText from "../Components/OpenSansBoldText";
import OpenSansText from "../Components/OpenSansText";
import { mapObjectToArr } from "../Util/util";
const LOCATION_TASK_NAME = "background-location-task";
let key = "";

class CustomerMatched extends Component {
  state = { problems: [] };
  componentDidMount = async () => {
    key = this.props.currentSession.key;
    const { status } = await Location.requestPermissionsAsync();
    if (status === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
    const problems = mapObjectToArr(this.props.currentSession.val().problems);
    this.setState({
      problems,
    });
  };
  openLocation = async () => {
    const location = this.props.currentSession.val().location;
    Linking.openURL(
      `http://www.google.com/maps/place/${location.lat},${location.lng}`
    );
  };
  openPhone = async () => {
    Linking.openURL(`tel:${this.props.currentCustomer.phone}`);
  };
  endSession = async () => {
    await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME);
    Actions.endSession();
  };
  render() {
    console.log(this.props.currentSession);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <NavbarWithLogo></NavbarWithLogo>
        <View style={{ alignSelf: "center", width: "90%", marginBottom: 20 }}>
          <Image
            style={{
              width: 150,
              height: 150,
              resizeMode: "cover",
              borderRadius: 100,
              alignSelf: "center",
              marginBottom: 25,
            }}
            source={{
              uri: this.props.currentCustomer
                ? this.props.currentCustomer.photo_url
                  ? this.props.currentCustomer.photo_url
                  : "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
                : "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png",
            }}
          ></Image>
          <OpenSansBoldText
            style={{ fontSize: 20, alignSelf: "center", textAlign: "center" }}
          >
            {this.props.currentCustomer.name}
          </OpenSansBoldText>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <MaterialIcons name="stars" size={18} color="#E0AC24" />
            <OpenSansText style={{ fontSize: 13, marginLeft: 5 }}>
              {false ? "5.0" : "Unrated"}
            </OpenSansText>
          </View>
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              marginVertical: 30,
              borderWidth: 1,
              borderColor: "transparent",
              borderRadius: 20,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
            }}
          >
            <View
              style={{
                width: "100%",
                padding: 10,
                borderBottomColor: "rgba(0,0,0,0.1)",
                borderBottomWidth: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <View>
                <OpenSansBoldText style={{ fontSize: 16 }}>
                  {this.props.currentSession.val().vehicle.company +
                    " " +
                    this.props.currentSession.val().vehicle.name +
                    " " +
                    this.props.currentSession.val().vehicle.model}
                </OpenSansBoldText>
                <OpenSansText
                  style={{ color: "rgba(0,0,0,0.4)", fontSize: 12 }}
                >
                  {this.props.currentSession.val().vehicle.color}
                </OpenSansText>
              </View>
              <OpenSansText style={{ fontSize: 14 }}>
                {this.props.currentSession.val().vehicle.regNum.toUpperCase()}
              </OpenSansText>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                padding: 10,
              }}
            >
              {this.state.problems.map((problem) => (
                <View
                  style={{
                    backgroundColor: "#FF4A4A0D",
                    borderRadius: 14,
                    padding: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 20,
                    marginBottom: 10,
                  }}
                >
                  <OpenSansText style={{ fontSize: 11 }}>
                    {problem}
                  </OpenSansText>
                </View>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            borderRadius: 40,
            backgroundColor: "#FF4A4A",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={this.openLocation}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Open Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            borderRadius: 40,
            backgroundColor: "#FF4A4A",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={this.openPhone}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Call Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            borderRadius: 40,
            backgroundColor: "#FF4A4A",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={Actions.sessionChat}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Message the Customer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            borderRadius: 40,
            backgroundColor: "#FF4A4A",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={this.endSession}
        >
          <Text style={{ color: "white", fontSize: 16 }}>End Session</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
export default connect((state) => state)(CustomerMatched);

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const { locations } = data;
    Firebase.updateLocation(key, locations);
  }
});
