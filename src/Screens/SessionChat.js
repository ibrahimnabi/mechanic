import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Firebase from "../Firebase/Firebase";
import BasicNavbar from "../Components/BasicNavbar";
class SessionChat extends Component {
  state = {
    messages: [],
    message: "",
  };
  componentDidMount = async () => {
    const messages = await Firebase.getSessionMessages(
      this.props.currentSession.key
    );
    this.setState(
      {
        messages,
      },
      () => {
        Firebase.listenToSessionMessages(
          this.props.currentSession.key,
          (response) => {
            const message = response.val();
            let messageAlreadyExists = false;
            this.state.messages.forEach((element) => {
              if (element.key == message.key) {
                messageAlreadyExists = true;
              }
            });
            if (!messageAlreadyExists) {
              this.setState({
                messages: [...this.state.messages, message],
              });
            }
          },
          (err) => console.log(err)
        );
      }
    );
  };
  sendMessage = async () => {
    this.setState({
      message: "",
    });
    await Firebase.sendMessageToCustomer(
      this.props.mechanic.uid,
      this.state.message,
      this.props.currentSession.key
    );
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      >
        <BasicNavbar>{this.props.currentCustomer.name}</BasicNavbar>

        <FlatList
          style={{
            height: Dimensions.get("window").height * 0.75,
          }}
          key={(e, i) => i + ""}
          data={this.state.messages}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  marginVertical: 5,
                  padding: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor:
                    item.from == this.props.mechanic.uid ? "#fff" : "#FF4A4A0D",
                  maxWidth: "50%",
                  alignSelf:
                    item.from == this.props.mechanic.uid
                      ? "flex-end"
                      : "flex-start",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                  }}
                >
                  {item.message}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "rgba(0,0,0,0.4)",
                    width: "100%",
                    marginTop: 5,
                  }}
                >
                  {item.time}
                </Text>
              </View>
            );
          }}
        ></FlatList>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            height: Dimensions.get("window").height * 0.1,
            paddingHorizontal: 20,
          }}
        >
          <TextInput
            onChangeText={(text) => {
              this.setState({
                message: text,
              });
            }}
            value={this.state.message}
            placeholderTextColor="black"
            placeholder="Enter Message"
            multiline
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 50,
              padding: 10,
              textAlignVertical: "top",
              borderColor: "#FF4A4A",
              borderWidth: 1,
              marginRight: 20,
              paddingLeft: 15,
              paddingTop: 15,
            }}
          ></TextInput>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF4A4A",
              width: 45,
              height: 45,
              borderRadius: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={this.sendMessage}
          >
            <FontAwesome name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    padding: 10,
    paddingTop: 40,
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  navbarTitle: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 30,
  },
});
export default connect((state) => state)(SessionChat);
