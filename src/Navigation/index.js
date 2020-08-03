import React, { Component } from "react";
import {
  Router,
  Drawer,
  Stack,
  Scene,
  Actions,
  Modal,
} from "react-native-router-flux";
import {
  ConfirmPayment,
  CustomerMatched,
  EditServices,
  EditSession,
  EndSession,
  Home,
  Login,
  Register,
  Review,
  SessionStarted,
} from "../Screens";
import AddService from "../Screens/AddService";
import { connect } from "react-redux";
import {
  login,
  updateServices,
  updateSessions,
  updateReviews,
  updateCustomers,
  updateCurrentCustomer,
  updateCurrentSession,
} from "../Redux/Actions/ActionCreator";
import { getUser, deleteUser } from "../Util/Storage";
import Firebase from "../Firebase/Firebase";
import CustomerFinding from "../Screens/CustomerFinding";
import SplashScreen from "../Screens/SplashScreen";
import DrawerComponent from "../Components/DrawerComponent";
import ForgetPassword from "../Screens/ForgetPassword";
import Support from "../Screens/Support";
import SessionChat from "../Screens/SessionChat";
import ReportProblem from "../Screens/ReportProblem";
import Feedback from "../Screens/Feedback";
import Sessions from "../Screens/Sessions";
import EditProfile from "../Screens/EditProfile";
import Unverified from "../Screens/Unverified";
import Blocked from "../Screens/Blocked";
import LandingPage from "../Screens/LandingPage";
import * as Location from "expo-location";
import { mapObjectToArr } from "../Util/util";

class Navigation extends Component {
  componentDidMount = async () => {
    let user = await getUser();

    if (user) {
      this.props.login(user);
      user = await Firebase.getUser(user.uid);
      if (user) {
        const services = await Firebase.getServices(user.uid);
        if (!user.verified) {
          Actions.unverified();
        } else {
          if (user.blocked) {
            Actions.blocked();
          } else {
            if (services.length > 0) {
              const reviews = await Firebase.getReviews(user.uid);
              const sessArr = await Firebase.getSessions(user.uid);
              const customers = await Firebase.getCustomers();
              this.props.updateReviews(reviews);
              this.props.updateSessions(sessArr);
              this.props.updateCustomers(customers);
              this.props.updateServices(services);
              await this.customerListener();
              Actions.home();
            } else {
              Actions.addService();
            }
          }
        }
      } else {
        Actions.landing();
        await deleteUser();
      }
    } else {
      Actions.landing();
    }
  };
  findDistance = (lat1, lat2, lng1, lng2, maxDistance) => {
    const R = 6371e3;
    const a1 = (lat1 * Math.PI) / 180;
    const a2 = (lat2 * Math.PI) / 180;
    const a = ((lat2 - lat1) * Math.PI) / 180;
    const b = ((lng2 - lng1) * Math.PI) / 180;
    const afinal =
      Math.sin(a / 2) * Math.sin(a / 2) +
      Math.cos(a1) * Math.cos(a2) * Math.sin(b / 2) * Math.sin(b / 2);
    const c = 2 * Math.atan2(Math.sqrt(afinal), Math.sqrt(1 - afinal));
    const d = R * c;
    console.log(d);
    return d < maxDistance;
  };
  customerListener = async () => {
    let { status, granted } = await Location.requestPermissionsAsync();
    if (granted) {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        currentLocation: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
      Firebase.listenToRequest(
        async (response) => {
          const value = response.val();
          if (
            value.mechanic.status === "Not Found" &&
            value.vehicle.type === this.props.mechanic.type
          ) {
            const problems = mapObjectToArr(value.problems);
            let problemsMatch = true;
            problems.forEach((e) => {
              const serviceFound = this.props.services.find(
                (s) => s.service === e
              );
              if (!serviceFound) {
                problemsMatch = false;
              }
            });
            if (problemsMatch) {
              if (
                this.findDistance(
                  value.location.lat,
                  this.state.currentLocation.lat,
                  value.location.lng,
                  this.state.currentLocation.lng,
                  10000000
                )
              ) {
                const customer = await Firebase.getCustomer(value.user);
                const request = await Firebase.updateRequest(
                  this.props.mechanic.uid,
                  value.key
                );
                this.props.updateCurrentCustomer(customer);
                this.props.updateCurrentSession(request);
                Actions.customerMatched();
              }
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  shouldComponentUpdate(props) {
    console.log("logprops", props);
    return false;
  }

  render() {
    return (
      <Router>
        <Drawer key="drawer" contentComponent={DrawerComponent}>
          <Stack hideNavBar key="root">
            <Scene key="splash" component={SplashScreen}></Scene>
            <Scene key="landing" component={LandingPage}></Scene>
            <Scene key="login" component={Login}></Scene>
            <Scene key="forgot" component={ForgetPassword}></Scene>
            <Scene key="addService" component={AddService}></Scene>
            <Scene key="confirm" component={ConfirmPayment}></Scene>
            <Modal key="customerFinding" component={CustomerFinding}></Modal>
            <Scene key="customerMatched" component={CustomerMatched}></Scene>
            <Scene key="confirmPayment" component={ConfirmPayment}></Scene>
            <Scene key="editServices" component={EditServices}></Scene>
            <Scene key="editSession" component={EditSession}></Scene>
            <Scene key="endSession" component={EndSession}></Scene>
            <Scene key="home" component={Home}></Scene>
            <Scene key="register" component={Register}></Scene>
            <Scene key="splash" component={SplashScreen}></Scene>
            <Scene key="review" component={Review}></Scene>
            <Scene key="sessionStarted" component={SessionStarted}></Scene>
            <Scene key="support" component={Support}></Scene>
            <Scene key="sessionChat" component={SessionChat}></Scene>
            <Scene key="report" component={ReportProblem}></Scene>
            <Scene key="feedback" component={Feedback}></Scene>
            <Scene key="sessions" component={Sessions}></Scene>
            <Scene key="editProfile" component={EditProfile}></Scene>
            <Scene key="unverified" component={Unverified}></Scene>
            <Scene
              drawerLockMode="locked-closed"
              key="blocked"
              component={Blocked}
            ></Scene>
          </Stack>
        </Drawer>
      </Router>
    );
  }
}
export default connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    return {
      login: (user) => dispatch(login(user)),
      updateServices: (services) => dispatch(updateServices(services)),
      updateSessions: (payload) => dispatch(updateSessions(payload)),
      updateReviews: (payload) => dispatch(updateReviews(payload)),
      updateCustomers: (payload) => dispatch(updateCustomers(payload)),
      updateCurrentCustomer: (payload) =>
        dispatch(updateCurrentCustomer(payload)),
      updateCurrentSession: (payload) =>
        dispatch(updateCurrentSession(payload)),
    };
  }
)(Navigation);
