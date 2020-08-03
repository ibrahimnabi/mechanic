import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Picker,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import Firebase from "../Firebase/Firebase";
import { connect } from "react-redux";
import { areStringsEmpty } from "../Util/util";
import BasicNavbar from "../Components/BasicNavbar";
class Feedback extends Component {
  state = {
    rating: 1,
    description: "",
  };
  submit = async () => {
    if (areStringsEmpty([this.state.description])) {
      Alert.alert(
        "Invalid Information",
        "Please check if you have filled all the fields"
      );
    } else {
      await Firebase.addFeedback(
        this.props.mechanic.uid,
        this.state.description,
        this.state.rating
      );
      Actions.pop();
    }
  };
  renderStars = () => {
    let stars = [
      "star",
      "star-border",
      "star-border",
      "star-border",
      "star-border",
    ];
    stars = stars.fill("star", 0, this.state.rating);
    const starsToReturn = stars.map((e, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              rating: index + 1,
            });
          }}
          style={{ margin: 5 }}
        >
          <MaterialIcons name={e} size={50} color="#ebc334" />
        </TouchableOpacity>
      );
    });
    return starsToReturn;
  };
  render() {
    const stars = this.renderStars();
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-30}>
        <BasicNavbar>Feedback</BasicNavbar>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          {stars}
        </View>
        <TextInput
          multiline
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            marginTop: 20,
            borderColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            textAlignVertical: "top",
            height: 100,
            borderRadius: 5,
          }}
          placeholder="Describe the Feedback"
          placeholderTextColor="black"
          onChangeText={(description) => this.setState({ description })}
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
            Give Feedback
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
export default connect((state) => state)(Feedback);
