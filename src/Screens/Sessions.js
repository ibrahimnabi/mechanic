import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import Firebase from "../Firebase/Firebase";
import { mapObjectToArr } from "../Util/util";
import MapView, { Marker } from "react-native-maps";
import {
  updateCustomers,
  updateSessions,
  updateReviews,
} from "../Redux/Actions/ActionCreator";
import BasicNavbar from "../Components/BasicNavbar";
class Sessions extends Component {
  state = { sessions: [] };
  componentDidMount = async () => {
    const reviews = await Firebase.getReviews(this.props.mechanic.uid);
    const sessArr = await Firebase.getSessions(this.props.mechanic.uid);
    const customers = await Firebase.getCustomers();
    this.props.updateReviews(reviews);
    this.props.updateSessions(sessArr);
    this.props.updateCustomers(customers);
    const sessions = await this.props.sessions.map((e) => {
      const reviews = this.props.reviews.filter((r) => r.sessionId === e.key);
      const customer = this.props.customers.find((c) => c.uid === e.user);
      return { ...e, reviews, customer };
    });
    this.setState({ sessions });
  };
  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <BasicNavbar>Sessions</BasicNavbar>
        {this.state.sessions.map((session) => {
          if (!session || !session.reviews) {
            return null;
          }
          const customerReview =
            session.reviews.length > 0
              ? session.reviews.find((review) => review.from === "customer")
              : null;
          const mechanicReview =
            session.reviews.length > 0
              ? session.reviews.find((review) => review.from === "mechanic")
              : null;
          const bill = mapObjectToArr(session.bill);
          let total = 0;
          bill.forEach((b) => (total += Number(b.price)));
          return (
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginVertical: 20,
                borderRadius: 10,
                borderColor: "rgba(0,0,0,0.2)",
                borderWidth: 1,
                padding: 20,
              }}
            >
              <Text
                style={{ fontWeight: "bold", marginBottom: 5, fontSize: 15 }}
              >
                Customer Name:
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 15 }}>
                {session.customer.name}
              </Text>
              <Text
                style={{ fontWeight: "bold", marginBottom: 5, fontSize: 15 }}
              >
                Date and Time:
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 15 }}>
                {session.date}
              </Text>
              <Text
                style={{ fontWeight: "bold", marginBottom: 5, fontSize: 15 }}
              >
                Car:
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 15 }}>
                {session.vehicle.color +
                  " " +
                  session.vehicle.company +
                  " " +
                  session.vehicle.name +
                  " " +
                  session.vehicle.model}
              </Text>
              <Text
                style={{ fontWeight: "bold", marginBottom: 5, fontSize: 15 }}
              >
                Car Registration:
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 15 }}>
                {session.vehicle.regNum}
              </Text>
              <Text
                style={{ fontWeight: "bold", marginBottom: 5, fontSize: 15 }}
              >
                Bill:
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  marginVertical: 20,
                  alignSelf: "center",
                  width: "100%",
                }}
              ></View>
              {bill.map((b) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ marginVertical: 5, fontSize: 15 }}>
                      {b.name}
                    </Text>
                    <Text style={{ marginVertical: 5, fontSize: 15 }}>
                      Rs. {b.price}
                    </Text>
                  </View>
                );
              })}
              <View
                style={{
                  height: 1,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  marginVertical: 20,
                  alignSelf: "center",
                  width: "100%",
                }}
              ></View>
              <Text
                style={{
                  width: "100%",
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Total: Rs.{total}
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  marginVertical: 20,
                  alignSelf: "center",
                  width: "100%",
                }}
              ></View>
              <Text
                style={{ fontWeight: "bold", marginBottom: 10, fontSize: 15 }}
              >
                Problems:
              </Text>
              {session
                ? session.problems
                  ? session.problems.map((b) => {
                      return (
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ marginBottom: 10, fontSize: 15 }}>
                            {b}
                          </Text>
                        </View>
                      );
                    })
                  : null
                : null}
              <>
                <Text
                  style={{ fontWeight: "bold", marginBottom: 10, fontSize: 15 }}
                >
                  Review by You:
                </Text>
                <Text
                  style={{ fontWeight: "bold", marginBottom: 10, fontSize: 15 }}
                >
                  Rating:
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 15 }}>
                  {mechanicReview ? mechanicReview.stars : "No Stars Given"}/5
                </Text>
                <Text
                  style={{ fontWeight: "bold", marginBottom: 10, fontSize: 15 }}
                >
                  Review:
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 15 }}>
                  {mechanicReview ? mechanicReview.review : "No review"}
                </Text>
              </>
              <>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 10,
                    fontSize: 15,
                  }}
                >
                  Customer Review:
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 10,
                    fontSize: 15,
                  }}
                >
                  Rating:
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 15 }}>
                  {customerReview ? customerReview.stars : "No Stars Given"}/5
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 10,
                    fontSize: 15,
                  }}
                >
                  Review:
                </Text>
                <Text style={{ marginBottom: 10, fontSize: 15 }}>
                  {customerReview ? customerReview.review : "No Review"}
                </Text>
              </>
              <Text
                style={{ fontWeight: "bold", marginBottom: 10, fontSize: 15 }}
              >
                Session Location
              </Text>
              <MapView
                style={{
                  width: "100%",
                  height: 200,
                  marginVertical: 20,
                  alignSelf: "center",
                }}
                initialRegion={{
                  latitude: session.location.lat,
                  longitude: session.location.lng,
                  latitudeDelta: 0.0043,
                  longitudeDelta: 0.0034,
                }}
              >
                <Marker
                  style={{ width: 50, height: 50 }}
                  icon={{
                    uri:
                      "https://i.ya-webdesign.com/images/gps-clipart-location-tag-6.png",
                  }}
                  coordinate={{
                    latitude: session.location.lat,
                    longitude: session.location.lng,
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0034,
                  }}
                ></Marker>
              </MapView>
            </View>
          );
        })}
      </ScrollView>
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
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      updateSessions: (payload) => dispatch(updateSessions(payload)),
      updateReviews: (payload) => dispatch(updateReviews(payload)),
      updateCustomers: (payload) => dispatch(updateCustomers(payload)),
    };
  }
)(Sessions);
