import ActionTypes from "./ActionTypes";

export const login = (mechanic) => {
  return {
    type: ActionTypes.UPDATE_MECHANIC,
    payload: mechanic,
  };
};
export const logout = () => {
  return {
    type: ActionTypes.UPDATE_MECHANIC,
    payload: null,
  };
};

export const updateCurrentCustomer = (customer) => {
  return {
    type: ActionTypes.UPDATE_CURRENT_CUSTOMER,
    payload: customer,
  };
};
export const updateCurrentSession = (session) => {
  return {
    type: ActionTypes.UPDATE_CURRENT_SESSION,
    payload: session,
  };
};
export const updateIsOnline = (isOnline) => {
  return {
    type: ActionTypes.UPDATE_IS_ONLINE,
    payload: isOnline,
  };
};
export const updateServices = (services) => {
  return {
    type: ActionTypes.UPDATE_SERVICES,
    payload: services,
  };
};

export const updateCustomers = (customers) => {
  return {
    type: ActionTypes.UPDATE_CUSTOMERS,
    payload: customers,
  };
};

export const updateSessions = (sessions) => {
  return {
    type: ActionTypes.UPDATE_SESSIONS,
    payload: sessions,
  };
};
export const updateReviews = (reviews) => {
  return {
    type: ActionTypes.UPDATE_REVIEWS,
    payload: reviews,
  };
};
