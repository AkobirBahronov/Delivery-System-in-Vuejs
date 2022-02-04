export default {
  registerItem(state, payload) {
    state.items.push(payload);
  },
  setItems(state, payload) {
    state.items = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
  setContactIsShown(state, payload) {
    state.contactIsShown = payload;
  },
};
