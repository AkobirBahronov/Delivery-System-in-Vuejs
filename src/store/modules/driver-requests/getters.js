export default {
  requests(state, _, _2, rootGetters) {
    const driverId = rootGetters.userId;
    return state.requests.filter((req) => req.driverId == driverId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
