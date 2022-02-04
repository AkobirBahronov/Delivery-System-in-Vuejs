export default {
  drivers(state) {
    return state.drivers;
  },
  hasDrivers(state) {
    return state.drivers && state.drivers.length > 0;
  },
  isDriver(_, getters, _2, rootGetters) {
    const drivers = getters.drivers;
    const userId = rootGetters.userId;
    return drivers.some((driver) => driver.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    } else {
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
  },
  contactIsShown(state) {
    return state.contactIsShown;
  },
};
