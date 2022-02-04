export default {
  async registerDriver(context, data) {
    const userId = context.rootGetters.userId;
    const driverData = {
      firstName: data.firstName,
      lastName: data.lastName,
      initial: data.initial,
      destination: data.destination,
      date: data.date,
      time: data.time,
      locationCode: data.locationCode,
      carNumber: data.carNumber,
      description: data.description,
      features: data.features,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://delivery-system-bfede-default-rtdb.firebaseio.com/drivers/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(driverData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit("registerDriver", {
      ...driverData,
      id: userId,
    });
  },

  async loadDrivers(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://delivery-system-bfede-default-rtdb.firebaseio.com/drivers.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.messages || "Failed to fetch");
      throw error;
    }

    const drivers = [];

    for (const key in responseData) {
      const driver = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        initial: responseData[key].initial,
        destination: responseData[key].destination,
        date: responseData[key].date,
        time: responseData[key].time,
        locationCode: responseData[key].locationCode,
        carNumber: responseData[key].carNumber,
        description: responseData[key].description,
        features: responseData[key].features,
      };
      drivers.push(driver);
    }
    context.commit("setDrivers", drivers);
    context.commit("setFetchTimestamp");
  },
  setContactIsShown(context, payload) {
    context.commit("setContactIsShown", payload);
  },
};
