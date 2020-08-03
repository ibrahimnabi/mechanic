import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Picker,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import Firebase from "../Firebase/Firebase";
import { connect } from "react-redux";
import { areStringsEmpty } from "../Util/util";
import { login } from "../Redux/Actions/ActionCreator";
import * as ImagePicker from "expo-image-picker";
import BasicNavbar from "../Components/BasicNavbar";

class EditProfile extends Component {
  state = { address: "", phone: "", name: "" };
  componentDidMount = () => {
    this.setState({
      address: this.props.mechanic.address,
      phone: this.props.mechanic.phone,
      name: this.props.mechanic.name,
    });
  };
  submit = async () => {
    if (
      areStringsEmpty([this.state.address, this.state.phone, this.state.name])
    ) {
      Alert.alert(
        "Fields can not be Empty!",
        "Please verify if any field has been left empty"
      );
    } else {
      await Firebase.updateMechanic(
        this.props.mechanic.uid,
        this.state.phone,
        this.state.name,
        this.state.address
      );
      this.props.updateUser({
        ...this.props.mechanic,
        address: this.state.address,
        phone: this.state.phone,
        name: this.state.name,
      });
      Actions.home();
    }
  };
  updateImage = async () => {
    const response = await ImagePicker.requestCameraRollPermissionsAsync();
    if (response.granted) {
      const file = await ImagePicker.launchImageLibraryAsync();
      if (!file.cancelled) {
        await Firebase.updateProfileImage(file.uri, this.props.mechanic.uid);
        const user = await Firebase.getUser(this.props.mechanic.uid);
        this.props.updateUser(user);
      }
    }
  };
  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <BasicNavbar>Update Profile</BasicNavbar>
        <TouchableOpacity
          onPress={this.updateImage}
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              resizeMode: "cover",
              borderRadius: 100,
              marginBottom: 30,
            }}
            source={{
              uri: this.props.mechanic
                ? this.props.mechanic.photo_url
                  ? this.props.mechanic.photo_url
                  : "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
                : "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png",
            }}
          ></Image>
        </TouchableOpacity>

        <TextInput
          value={this.state.phone}
          multiline
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            marginTop: 20,
            borderColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholder="Phone Number"
          placeholderTextColor="black"
          onChangeText={(phone) => this.setState({ phone })}
        ></TextInput>
        <TextInput
          value={this.state.name}
          multiline
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            marginTop: 20,
            borderColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholder="Name"
          placeholderTextColor="black"
          onChangeText={(name) => this.setState({ name })}
        ></TextInput>
        <TextInput
          editable={false}
          value={this.props.mechanic.email}
          multiline
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            marginTop: 20,
            borderColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholder="Email"
          placeholderTextColor="black"
        ></TextInput>
        <TextInput
          value={this.state.address}
          multiline
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            marginTop: 20,
            borderColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            borderRadius: 5,
          }}
          placeholder="Address"
          placeholderTextColor="black"
          onChangeText={(address) => this.setState({ address })}
        ></TextInput>
        <TouchableOpacity
          onPress={this.submit}
          style={{
            alignSelf: "center",
            backgroundColor: "#FF4A4A",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
            borderRadius: 50,
            marginTop: 30,
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateUser: (payload) => dispatch(login(payload)),
    };
  }
)(EditProfile);
