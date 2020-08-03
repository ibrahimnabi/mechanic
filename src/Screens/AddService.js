import React, { Component } from "react";
import { Text, View, Picker, TouchableOpacity, ScrollView } from "react-native";
import Firebase from "../Firebase/Firebase";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { updateServices } from "../Redux/Actions/ActionCreator";
import { TextInput } from "react-native-gesture-handler";
import BasicNavbar from "../Components/BasicNavbar";

class AddService extends Component {
  state = { search: "", services: [] };
  componentDidMount = async () => {
    let services = await Firebase.getAvailableServices();
    services = services
      .filter((e) => e.type === this.props.mechanic.type)
      .map((e) => e.name);
    this.setState({
      services,
    });
  };
  addService = async (service) => {
    await Firebase.addService(this.props.mechanic.uid, service);
    const services = await Firebase.getServices(this.props.mechanic.uid);
    this.props.updateServices(services);
  };
  deleteService = async (service) => {
    await Firebase.deleteService(this.props.mechanic.uid, service);
    const services = await Firebase.getServices(this.props.mechanic.uid);
    this.props.updateServices(services);
  };
  onSelectService = async (service) => {
    console.log("service", service);
    const serviceFound = this.props.services.find((s) => {
      console.log("s", s);
      return s.service == service;
    });
    console.log("serviceFound", serviceFound);
    if (!serviceFound) {
      await this.addService(service);
    } else {
      await this.deleteService(serviceFound);
    }
  };
  submit = async () => {
    await Firebase.addService(this.props.mechanic.uid, [
      this.state.selectedProblem,
    ]);
  };
  render() {
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <BasicNavbar>Services</BasicNavbar>
        <View
          style={{
            width: "90%",
            marginBottom: 20,
          }}
        >
          <TextInput
            onChangeText={(text) => this.setState({ search: text })}
            style={{
              width: "90%",
              padding: 10,
              alignSelf: "center",
              borderBottomColor: "rgba(0,0,0,0.2)",
              borderBottomWidth: 1,
            }}
            placeholder="Search"
          ></TextInput>
          <View style={{ paddingTop: 10 }}>
            <View>
              {this.state.services.map((problem) => {
                const condition = problem.startsWith(this.state.search);
                return condition ? (
                  <TouchableOpacity
                    onPress={() => this.onSelectService(problem)}
                    key={problem}
                    style={{ flexDirection: "row", padding: 10 }}
                  >
                    <Text>{problem}</Text>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 20,
                          borderColor: "#FF4A4A",
                          borderWidth: 1,
                          backgroundColor: this.props.services.find(
                            (p) => p.service === problem
                          )
                            ? "#FF4A4A"
                            : "transparent",
                        }}
                      ></View>
                    </View>
                  </TouchableOpacity>
                ) : null;
              })}
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            this.props.mechanic.verified
              ? Actions.home()
              : Actions.unverified();
          }}
          style={{
            backgroundColor: "#FF4A4A",
            width: "90%",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginBottom: 40,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Continue
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
      updateServices: (payload) => dispatch(updateServices(payload)),
    };
  }
)(AddService);
