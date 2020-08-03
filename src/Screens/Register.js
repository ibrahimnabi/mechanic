import React, { Component } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  Picker,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import Firebase from "../Firebase/Firebase";
import { connect } from "react-redux";
import { login } from "../Redux/Actions/ActionCreator";
import { storeUser } from "../Util/Storage";
import * as ImagePicker from "expo-image-picker";
import { areStringsEmpty } from "../Util/util";
import Logo from "../Components/Logo";
import SmallWavyBottom from "../Components/SmallWavyBottom";
import TransparentButton from "../Components/TransparentButton";
import Or from "../Components/Or";
import { MaterialIcons } from "@expo/vector-icons";
import OpenSansText from "../Components/OpenSansText";
import ImageSelect from "../Components/ImageSelect";
import RoundTextInputWithIcon from "../Components/RoundTextInputWithIcon";
import RoundPicker from "../Components/RoundPicker";
import ImageSelectRectangle from "../Components/ImageSelectRectangle";
import RedButton from "../Components/RedButton";
class Register extends Component {
  state = {
    email: "",
    phone: "",
    name: "",
    address: "",
    cnic: "",
    password: "",
    confirmPassword: "",
    type: "",
    image: null,
    cnicImage: null,
  };
  submit = async () => {
    if (
      this.state.email.trim() === "" &&
      this.state.password.trim() === "" &&
      this.state.phone.trim() === "" &&
      this.state.name.trim() === "" &&
      this.state.address.trim() === "" &&
      this.state.cnic.trim() === "" &&
      this.state.type.trim() === "" &&
      this.state.cnicImage &&
      this.state.image
    ) {
      Alert.alert(
        "The mechanic could not be registered.",
        "Please verify that all fields have been filled."
      );
    } else if (this.state.password !== this.state.confirmPassword) {
      Alert.alert(
        "The mechanic could not be registered.",
        "Both passwords don't match."
      );
    } else {
      const user = await Firebase.register(
        this.state.email,
        this.state.password,
        this.state.phone,
        this.state.name,
        this.state.address,
        this.state.cnic,
        this.state.type,
        this.state.cnicImage,
        this.state.image
      );
      if (user) {
        storeUser(user);
        this.props.login(user);
        Actions.addService();
      } else {
        Alert.alert(
          "The mechanic could not be registered.",
          "Please verify that all fields have been filled or an account with the same email doesn't already exist"
        );
      }
    }
  };
  updateImage = async () => {
    const response = await ImagePicker.requestCameraRollPermissionsAsync();
    if (response.granted) {
      const file = await ImagePicker.launchImageLibraryAsync();
      if (!file.cancelled) {
        this.setState({
          image: file.uri,
        });
      }
    }
  };
  updateImageCnic = async () => {
    const response = await ImagePicker.requestCameraRollPermissionsAsync();
    if (response.granted) {
      const file = await ImagePicker.launchImageLibraryAsync();
      if (!file.cancelled) {
        this.setState({
          cnicImage: file.uri,
        });
      }
    }
  };
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <Logo></Logo>
          <View style={{ marginVertical: 20 }}></View>
          <ImageSelect
            onPress={this.updateImage}
            image={this.state.image}
            icon="account-circle"
            label="*Upload an image of yourself"
          ></ImageSelect>
          <RoundTextInputWithIcon
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            keyboardType="default"
            placeholder="Enter your Name"
            icon="person"
          ></RoundTextInputWithIcon>
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
            placeholder="Enter Password"
            secureTextEntry
            icon="lock"
          ></RoundTextInputWithIcon>
          <RoundTextInputWithIcon
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
            keyboardType="default"
            placeholder="Reenter Password"
            secureTextEntry
            icon="lock"
          ></RoundTextInputWithIcon>
          <RoundTextInputWithIcon
            value={this.state.address}
            onChangeText={(address) => this.setState({ address })}
            keyboardType="default"
            placeholder="Enter your address"
          ></RoundTextInputWithIcon>
          <RoundPicker
            selectedValue={this.state.type}
            onValueChange={(type) => this.setState({ type })}
            label="Select your Service Type"
            options={["Car", "Motorcycle"]}
          ></RoundPicker>
          <RoundTextInputWithIcon
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}
            keyboardType="phone-pad"
            placeholder="Enter your Phone Number"
            icon="phone"
          ></RoundTextInputWithIcon>
          <RoundTextInputWithIcon
            value={this.state.cnic}
            onChangeText={(cnic) => this.setState({ cnic })}
            keyboardType="phone-pad"
            placeholder="Enter your CNIC"
            icon="credit-card"
          ></RoundTextInputWithIcon>
          <ImageSelectRectangle
            onPress={this.updateImageCnic}
            image={this.state.cnicImage}
            icon="credit-card"
            label="*Upload an image of CNIC"
          ></ImageSelectRectangle>
          <RedButton style={{ marginTop: 30 }} onPress={this.submit}>
            Register your account
          </RedButton>
          <Or></Or>
        </View>
        <SmallWavyBottom>
          <TransparentButton onPress={Actions.login}>
            I already have an account
          </TransparentButton>
        </SmallWavyBottom>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    marginBottom: 50,
  },
  header: {
    fontSize: 25,
  },
  input: {
    borderColor: "rgb(0,0,0)",
    borderWidth: 1,
    width: "90%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  loginBtn: {
    backgroundColor: "#FF4A4A",
    width: "90%",
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  loginBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  registerTextHolder: { marginTop: 20 },
  registerText: {
    color: "blue",
    fontSize: 14,
  },
});
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      login: (user) => dispatch(login(user)),
    };
  }
)(Register);
