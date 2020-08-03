import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import Firebase from "../Firebase/Firebase";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
class Review extends Component {
  state = {
    review: "",
    stars: 1,
  };
  submit = async () => {
    await Firebase.postReview(
      this.props.currentSession.val().key,
      this.props.currentCustomer.uid,
      this.props.mechanic.uid,
      this.state.review,
      this.state.stars
    );
    Actions.home();
  };
  renderStars = () => {
    let stars = [
      "md-star",
      "md-star-outline",
      "md-star-outline",
      "md-star-outline",
      "md-star-outline",
    ];
    stars = stars.fill("md-star", 0, this.state.stars);
    const starsToReturn = stars.map((e, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              stars: index + 1,
            });
          }}
          style={{ margin: 5 }}
        >
          <Ionicons name={e} size={50} color="#ebc334" />
        </TouchableOpacity>
      );
    });
    return starsToReturn;
  };
  render() {
    const stars = this.renderStars();
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            padding: 10,
            paddingTop: 40,
            borderBottomColor: "rgba(0,0,0,0.2)",
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Give Review</Text>
        </View>
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
            borderColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            height: 100,
            marginTop: 40,
            textAlignVertical: "top",
          }}
          placeholder="Describe your experience with the customer"
          onChangeText={(text) => this.setState({ review: text })}
        ></TextInput>
        <TouchableOpacity
          onPress={this.submit}
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 20,
            borderRadius: 40,
            backgroundColor: "#FF4A4A",
            marginTop: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Give review and Confirm payment
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect((state) => state)(Review);
