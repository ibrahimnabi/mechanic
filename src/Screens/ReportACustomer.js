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
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import Firebase from "../Firebase/Firebase";
import { connect } from "react-redux";
import { areStringsEmpty } from "../Util/util";
import BasicNavbar from "../Components/BasicNavbar";
class ReportCustomer extends Component {
  state = {
    problem: null,
    description: "",
  };
  submit = async () => {
    if (!this.state.problem || areStringsEmpty([this.state.description])) {
      Alert.alert(
        "Invalid Information",
        "Please check if you have filled all the fields"
      );
    } else {
      await Firebase.reportProblem(
        this.props.mechanic.uid,
        this.state.problem,
        this.state.description,
        this.props.currentCustomer.uid
      );
      Actions.pop();
    }
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-30}>
        <BasicNavbar>Report Customer</BasicNavbar>
        <View
          style={{
            borderBottomColor: "rgba(0,0,0,0.2)",
            borderBottomWidth: 1,
            width: "90%",
            alignSelf: "center",
            marginTop: 50,
          }}
        >
          <Picker
            selectedValue={this.state.problem}
            style={{
              padding: 20,
              width: "100%",
            }}
            onValueChange={(value) => this.setState({ problem: value })}
          >
            <Picker.Item label="Select a Problem" value={null} />
            <Picker.Item label="Didnt Pay Money" value={"Didnt Pay Money"} />
            <Picker.Item label="Misbehaved" value={"Misbehaved"} />
          </Picker>
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
          placeholder="Describe the Problem"
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
            Report Problem
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
export default connect((state) => state)(ReportCustomer);
