import ActionTypes from "../Actions/ActionTypes";

const initialState = {
  mechanic: null,
  services: [],
  currentSession: null,
  currentCustomer: null,
  isOnline: false,
  customers: [],
  reviews: [],
  sessions: [],
  balance: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.UPDATE_CURRENT_CUSTOMER:
      return { ...state, currentCustomer: payload };
    case ActionTypes.UPDATE_CURRENT_SESSION:
      return { ...state, currentSession: payload };
    case ActionTypes.UPDATE_IS_ONLINE:
      return { ...state, isOnline: payload };
    case ActionTypes.UPDATE_MECHANIC:
      return { ...state, mechanic: payload };
    case ActionTypes.UPDATE_SERVICES:
      return { ...state, services: payload };
    case ActionTypes.UPDATE_CUSTOMERS:
      return { ...state, customers: payload };
    case ActionTypes.UPDATE_SESSIONS:
      return { ...state, sessions: payload };
    case ActionTypes.UPDATE_REVIEWS:
      return { ...state, reviews: payload };
    case ActionTypes.UPDATE_BALANCE:
      return { ...state, balance: payload };
    default:
      return state;
  }
};
