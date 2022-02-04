export default {
  requests(state, _, _2, rootGetters) {
    const itemId = rootGetters.userId;
    return state.requests.filter((req) => req.itemId == itemId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
