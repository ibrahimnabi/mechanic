import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { Ionicons, Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import MainNavbar from "../Components/MainNavbar";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
export default class Home extends Component {
  state = {
    latitude: 0,
    longitude: 0,
  };
  componentDidMount = async () => {
    await this.recenter();
  };
  recenter = async () => {
    const response = await Location.getPermissionsAsync();
    if (response.granted) {
      const data = await Location.getCurrentPositionAsync();
      this.map.animateToCoordinate({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034,
      });
      this.setState({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
    }
  };
  render() {
    return (
      <View>
        <MainNavbar></MainNavbar>
        <MapView
          initialRegion={{
            latitudeDelta: 0.0043,
            longitudeDelta: 0.0034,
            latitude: 31,
            longitude: 74,
          }}
          ref={(ref) => (this.map = ref)}
          style={{
            width: "100%",
            height: Dimensions.get("window").height,
            alignSelf: "center",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          showsUserLocation
        >
          <Marker
            style={{ width: 80, height: 80, backgroundColor: "red" }}
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034,
            }}
          ></Marker>
        </MapView>
      </View>
    );
  }
}
