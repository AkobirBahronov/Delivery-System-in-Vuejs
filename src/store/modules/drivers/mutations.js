export default {
  registerDriver(state, payload) {
    state.drivers.push(payload);
  },
  setDrivers(state, payload) {
    state.drivers = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
  setContactIsShown(state, payload) {
    state.contactIsShown = payload;
  },
};
