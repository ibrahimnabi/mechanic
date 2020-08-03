import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Firebase from "../Firebase/Firebase";
import { connect } from "react-redux";
import { updateCurrentSession } from "../Redux/Actions/ActionCreator";
import { Actions } from "react-native-router-flux";
import { Ionicons } from "@expo/vector-icons";
import NavbarWithLogo from "../Components/NavbarWithLogo";
class EndSession extends Component {
  state = { bill: [] };
  addItem = () => {
    const bill = [...this.state.bill];
    bill.push({
      name: "",
      price: 0,
    });
    this.setState({
      bill,
    });
  };
  changeItemName = (index, name) => {
    const bill = [...this.state.bill];
    bill[index].name = name;
    this.setState({
      bill,
    });
  };
  changeItemPrice = (index, price) => {
    const bill = [...this.state.bill];
    bill[index].price = price;
    this.setState({
      bill,
    });
  };
  endSession = async () => {
    const session = await Firebase.endSession(
      this.props.currentSession.val().key,
      this.state.bill
    );
    this.props.updateCurrentSession(session);
    Actions.confirmPayment();
  };
  deleteItem = (index) => {
    const bill = [...this.state.bill];
    const updatedBill = bill.filter((e, i) => i !== index);
    this.setState({
      bill: updatedBill,
    });
  };
  render() {
    let total = 0;
    this.state.bill.forEach((e) => (total += Number(e.price)));
    const customerBalance = this.props.currentCustomer.balance
      ? this.props.currentCustomer.balance
      : 0;

    return (
      <ScrollView>
        <NavbarWithLogo></NavbarWithLogo>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            borderRadius: 40,
            backgroundColor: "#FF4A4A",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={this.addItem}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Add Item</Text>
        </TouchableOpacity>
        {this.state.bill.map((e, index) => {
          return (
            <View
              key={index + ""}
              style={{
                flexDirection: "row",
                width: "100%",
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <TextInput
                placeholder="Enter item name"
                style={{
                  width: "40%",
                  padding: 10,
                  borderBottomColor: "rgba(0,0,0,0.2)",
                  borderBottomWidth: 1,
                }}
                onChangeText={(text) => this.changeItemName(index, text)}
              ></TextInput>
              <TextInput
                placeholder="Enter item price"
                keyboardType="number-pad"
                style={{
                  width: "40%",
                  padding: 10,
                  borderBottomColor: "rgba(0,0,0,0.2)",
                  borderBottomWidth: 1,
                }}
                onChangeText={(text) => this.changeItemPrice(index, text)}
              ></TextInput>
              <TouchableOpacity
                style={{
                  width: "5%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => this.deleteItem(index)}
              >
                <Ionicons name="ios-close" size={24} color="#FF4A4A" />
              </TouchableOpacity>
            </View>
          );
        })}
        <Text
          style={{
            width: "90%",
            textAlign: "right",
            marginTop: 30,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Total: Rs. {total}
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            padding: 10,
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color:
                customerBalance == 0
                  ? "black"
                  : customerBalance > 0
                  ? "green"
                  : "red",
            }}
          >
            Customer Previous Balance
          </Text>
          <Text
            style={{
              color:
                customerBalance == 0
                  ? "black"
                  : customerBalance > 0
                  ? "green"
                  : "red",
            }}
          >
            {customerBalance}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            width: "90%",
            padding: 10,
            borderRadius: 40,
            backgroundColor: "#FF4A4A",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={this.endSession}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Send Bill to Customer
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
      updateCurrentSession: (payload) =>
        dispatch(updateCurrentSession(payload)),
    };
  }
)(EndSession);
