import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import {
  updateCurrentCustomer,
  updateCurrentSession,
} from "../Redux/Actions/ActionCreator";
import Firebase from "../Firebase/Firebase";
import { mapObjectToArr } from "../Util/util";
import { Actions } from "react-native-router-flux";
import * as Location from "expo-location";
class CustomerFinding extends Component {
  state = {
    currentLocation: {
      lat: 0,
      lng: 0,
    },
  };
  findDistance = (lat1, lat2, lng1, lng2, maxDistance) => {
    const R = 6371e3;
    const a1 = (lat1 * Math.PI) / 180;
    const a2 = (lat2 * Math.PI) / 180;
    const a = ((lat2 - lat1) * Math.PI) / 180;
    const b = ((lng2 - lng1) * Math.PI) / 180;
    const afinal =
      Math.sin(a / 2) * Math.sin(a / 2) +
      Math.cos(a1) * Math.cos(a2) * Math.sin(b / 2) * Math.sin(b / 2);
    const c = 2 * Math.atan2(Math.sqrt(afinal), Math.sqrt(1 - afinal));
    const d = R * c;
    console.log(d);
    return d < maxDistance;
  };
  componentDidMount = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status == "granted") {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        currentLocation: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    }
    Firebase.listenToRequest(
      async (response) => {
        const value = response.val();
        if (
          value.mechanic.status === "Not Found" &&
          value.vehicle.type === this.props.mechanic.type
        ) {
          const problems = mapObjectToArr(value.problems);
          let problemsMatch = true;
          problems.forEach((e) => {
            const serviceFound = this.props.services.find(
              (s) => s.service === e
            );
            if (!serviceFound) {
              problemsMatch = false;
            }
          });
          if (problemsMatch) {
            if (
              this.findDistance(
                value.location.lat,
                this.state.currentLocation.lat,
                value.location.lng,
                this.state.currentLocation.lng,
                35000
              )
            ) {
              const customer = await Firebase.getCustomer(value.user);
              const request = await Firebase.updateRequest(
                this.props.mechanic.uid,
                value.key
              );
              this.props.updateCurrentCustomer(customer);
              this.props.updateCurrentSession(request);
              Actions.customerMatched();
            }
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          color="black"
          size="large"
          style={{ marginBottom: 40 }}
        ></ActivityIndicator>
        <Text>Searching for Customers</Text>
      </View>
    );
  }
}

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateCurrentCustomer: (payload) =>
        dispatch(updateCurrentCustomer(payload)),
      updateCurrentSession: (payload) =>
        dispatch(updateCurrentSession(payload)),
    };
  }
)(CustomerFinding);
