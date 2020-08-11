import * as firebase from "firebase";
import { mapObjectToArr, mapArrToObject } from "../Util/util";
const firebaseConfig = {
  apiKey: "AIzaSyDUjQseKWsjiV9vw1JaJr1Xuah00IV4qi4",
  authDomain: "onlinemechanic-f7831.firebaseapp.com",
  databaseURL: "https://onlinemechanic-f7831.firebaseio.com",
  projectId: "onlinemechanic-f7831",
  storageBucket: "onlinemechanic-f7831.appspot.com",
  messagingSenderId: "1093244925772",
  appId: "1:1093244925772:web:9ed22de660464c2c5c41e9",
  measurementId: "G-X2JT75EK62",
};

const app = firebase.initializeApp(firebaseConfig);

const login = async (email, password) => {
  const response = await app.auth().signInWithEmailAndPassword(email, password);
  if (response.user) {
    const user = await getUser(response.user.uid);
    return user;
  }
  return false;
};

const getUser = async (uid) => {
  const response = await app
    .database()
    .ref("mechanics/" + uid)
    .once("value");

  return response.val();
};

const forgetPassword = async (email) => {
  await app.auth().sendPasswordResetEmail(email);
};
const register = async (
  email,
  password,
  phone,
  name,
  address,
  cnic,
  type,
  cnicUri,
  imageUri
) => {
  const response = await app
    .auth()
    .createUserWithEmailAndPassword(email, password);
  if (response.user) {
    const cnic_url = await uploadCNICImage(cnicUri, response.user.uid);
    const photo_url = await uploadProfileImage(imageUri, response.user.uid);
    await app
      .database()
      .ref("mechanics/" + response.user.uid)
      .set({
        email,
        phone,
        name,
        address,
        cnic,
        uid: response.user.uid,
        type,
        cnic_url,
        photo_url,
        verified: false,
        blocked: false,
      });
    const user = await login(email, password);
    return user;
  }
  return false;
};
const updateMechanic = async (uid, phone, name, address) => {
  await app
    .database()
    .ref("mechanics/" + uid)
    .update({
      phone,
      name,
      address,
    });
};
const getServices = async (uid) => {
  const response = await app
    .database()
    .ref("mechanics/" + uid + "/services")
    .once("value");
  return mapObjectToArr(response.val());
};
const addService = async (uid, service) => {
  const key = (
    await app
      .database()
      .ref("mechanics/" + uid + "/services")
      .push()
  ).key;
  await app
    .database()
    .ref("mechanics/" + uid + "/services/" + key)
    .set({
      service,
      key,
    });
};
const deleteService = async (uid, service) => {
  await app
    .database()
    .ref("mechanics/" + uid + "/services/" + service.key)
    .remove();
};
const listenToRequest = async (cb, errCb) => {
  app.database().ref("requests/").on("child_added", cb, errCb);
  app.database().ref("requests/").on("child_changed", cb, errCb);
};
const getCustomer = async (uid) => {
  const response = await app
    .database()
    .ref("users/" + uid)
    .once("value");
  return response.val();
};
const updateRequest = async (uid, key) => {
  await app
    .database()
    .ref("requests/" + key)
    .update({
      mechanic: { status: "Found", uid },
    });
  const response = await app
    .database()
    .ref("requests/" + key)
    .once("value");
  return response;
};
const updateRequestPayment = async (key, amount) => {
  console.log("key", key);
  console.log("amount", amount);
  await app
    .database()
    .ref("requests/" + key)
    .update({
      isPayed: true,
      amount,
    });
  const response = await app
    .database()
    .ref("requests/" + key)
    .once("value");
  return response;
};
const endSession = async (key, bill) => {
  const billObj = mapArrToObject(bill);
  await app
    .database()
    .ref("requests/" + key)
    .update({
      status: "Session Ended",
      bill: billObj,
    });
  const response = await app
    .database()
    .ref("requests/" + key)
    .once("value");
  return response;
};
const updateLocation = async (key, location) => {
  console.log(location[location.length - 1]);
  await app
    .database()
    .ref("requestLocations/" + key)
    .update({
      mechanicLocation: {
        location: {
          lat: location[location.length - 1].coords.latitude,
          long: location[location.length - 1].coords.longitude,
        },
      },
    });
};
const postReview = async (sessionId, customerId, mechanicId, review, stars) => {
  const key = (await app.database().ref("reviews/").push()).key;
  await app
    .database()
    .ref("reviews/" + key)
    .set({
      sessionId,
      customerId,
      mechanicId,
      review,
      stars,
      key,
      from: "mechanic",
    });
};
const addProblemReport = async (uid, problem, desc) => {
  const key = (await app.database().ref("problems/").push()).key;
  await app
    .database()
    .ref("problems/" + key)
    .set({
      problem,
      uid,
      desc,
      key,
      from: "Mechanic",
    });
};
const reportProblem = async (uid, problem, desc, customerId) => {
  const key = (await app.database().ref("problems/").push()).key;
  await app
    .database()
    .ref("reports/" + key)
    .set({
      problem,
      uid,
      desc,
      key,
      customerId,
      from: "Mechanic",
    });
};
const addFeedback = async (uid, desc, rating) => {
  const key = (await app.database().ref("feedbacks/").push()).key;
  await app
    .database()
    .ref("feedbacks/" + key)
    .set({
      rating,
      uid,
      desc,
      key,
      from: "Mechanic",
    });
};
const addSupportMessage = async (uid, message) => {
  const key = (
    await app
      .database()
      .ref("support/" + uid)
      .push()
  ).key;
  await app
    .database()
    .ref("support/" + uid + "/" + key)
    .set({
      from: uid,
      message,
      key,
      time:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    });
};
const sendMessageToCustomer = async (uid, message, requestKey) => {
  const key = (
    await app
      .database()
      .ref("sessionMessages/" + requestKey + "/chat/")
      .push()
  ).key;
  await app
    .database()
    .ref("sessionMessages/" + requestKey + "/chat/" + key)
    .set({
      from: uid,
      message,
      key,
      time:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    });
};
const getSessionMessages = async (requestKey) => {
  const response = await app
    .database()
    .ref("sessionMessages/" + requestKey + "/chat/")
    .once("value");
  const arr = mapObjectToArr(response.val());
  return arr;
};
const getSupportMessages = async (uid) => {
  const response = await app
    .database()
    .ref("support/" + uid)
    .once("value");
  const arr = mapObjectToArr(response.val());
  return arr;
};
const listenToSupportMessages = (uid, cb, errorCb) => {
  const ref = app.database().ref("support/" + uid);
  ref.on("child_added", cb, errorCb);
  return ref;
};
const listenToSessionMessages = (requestKey, cb, errorCb) => {
  const ref = app.database().ref("sessionMessages/" + requestKey + "/chat/");
  ref.on("child_added", cb, errorCb);
  return ref;
};
const getSessions = async (uid) => {
  const response = await app.database().ref("requests/").once("value");
  const sessions = mapObjectToArr(response.val());
  const userSessions = sessions.filter((e) =>
    e.mechanic ? e.mechanic.uid === uid : false
  );
  return userSessions;
};
const getReviews = async (uid) => {
  const response = await app.database().ref("reviews/").once("value");
  const reviews = mapObjectToArr(response.val());
  const userReviews = reviews.filter((e) => e.mechanicId === uid);
  return userReviews;
};
const getCustomers = async () => {
  const response = await app.database().ref("users/").once("value");
  return mapObjectToArr(response.val());
};
const updateAccountBalance = async (uid, amount) => {
  const balance = amount;
  console.log("amount", amount);
  console.log("uid", uid);
  await app
    .database()
    .ref("mechanics/" + uid)
    .update({
      balance,
    });
};
const updateAccountBalanceCustomer = async (uid, amount) => {
  const balance = amount;
  console.log("amount", amount);
  console.log("uid", uid);
  await app
    .database()
    .ref("users/" + uid)
    .update({
      balance,
    });
};
const updateProfileImage = async (uri, uid) => {
  const photo_url = await uploadProfileImage(uri, uid);
  await app
    .database()
    .ref("mechanics/" + uid)
    .update({
      photo_url,
    });
};
const uploadProfileImage = async (uri, uid) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = app.storage().ref("mechanic_images/").child(uid);
  const file = await ref.put(blob);

  return await file.ref.getDownloadURL();
};
const uploadCNICImage = async (uri, uid) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = app.storage().ref("mechanic_cnic_images/").child(uid);
  const file = await ref.put(blob);

  return await file.ref.getDownloadURL();
};
const getAvailableServices = async () => {
  const response = await app.database().ref("services/").once("value");
  const arr = mapObjectToArr(response.val());
  return arr;
};

const Firebase = {
  login,
  getUser,
  register,
  getServices,
  addService,
  listenToRequest,
  getCustomer,
  updateRequest,
  endSession,
  postReview,
  forgetPassword,
  deleteService,
  addProblemReport,
  reportProblem,
  addFeedback,
  addSupportMessage,
  sendMessageToCustomer,
  getSessionMessages,
  getSupportMessages,
  listenToSupportMessages,
  listenToSessionMessages,
  getSessions,
  getReviews,
  getCustomers,
  updateMechanic,
  updateProfileImage,
  getAvailableServices,
  updateLocation,
  updateAccountBalance,
  updateRequestPayment,
  updateAccountBalanceCustomer,
};

export default Firebase;
