import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import NavbarWithLogo from "../Components/NavbarWithLogo";
import { connect } from "react-redux";
import Firebase from "../Firebase/Firebase";
import { Actions } from "react-native-router-flux";
import { updateBalance } from "../Redux/Actions/ActionCreator";
class ConfirmPayment extends Component {
  state = {
    amountPayed: 0,
  };
  submit = async () => {
    let customerBalance = this.props.currentCustomer.balance
      ? this.props.currentCustomer.balance
      : 0;
    let mechanicBalance = this.props.mechanic.balance
      ? this.props.mechanic.balance
      : 0;
    const bill = this.props.currentSession.val().bill.reduce(function (a, b) {
      if (a > 0) {
        return Number(a.price) + Number(b.price);
      }
      return Number(b.price);
    }, 0);
    const balance = bill - this.state.amountPayed - customerBalance;
    const newCustomerBalance = -balance;
    const newMechanicBalance = mechanicBalance + balance;
    console.log(this.props);
    await Firebase.updateRequestPayment(
      this.props.currentSession.val().key,
      this.state.amountPayed
    );
    await Firebase.updateAccountBalance(
      this.props.mechanic.uid,
      newMechanicBalance
    );
    await Firebase.updateAccountBalanceCustomer(
      this.props.currentCustomer.uid,
      newCustomerBalance
    );
    this.props.updateBalance(newMechanicBalance);
    Actions.review();
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavbarWithLogo></NavbarWithLogo>
        <TextInput
          style={{
            alignSelf: "center",
            width: "90%",
            borderColor: "rgba(0,0,0,0.2)",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginTop: 40,
          }}
          keyboardType="decimal-pad"
          placeholder="Amount Payed in Rs."
          onChangeText={(text) => this.setState({ amountPayed: text })}
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
          <Text style={{ color: "white", fontSize: 16 }}>Confirm Payment</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect((state) => state, { updateBalance })(ConfirmPayment);
