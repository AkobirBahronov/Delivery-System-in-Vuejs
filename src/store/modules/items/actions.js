export default {
  async registerItem(context, data) {
    const userId = context.rootGetters.userId;
    const itemData = {
      firstName: data.firstName,
      lastName: data.lastName,
      height: data.height,
      surface: data.surface,
      weight: data.weight,
      initial: data.initial,
      destination: data.destination,
      date: data.date,
      time: data.time,
      description: data.description,
      options: data.options,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://delivery-system-bfede-default-rtdb.firebaseio.com/items/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(itemData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit("registerItem", {
      ...itemData,
      id: userId,
    });
  },

  async loadItems(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      `https://delivery-system-bfede-default-rtdb.firebaseio.com/items.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.messages || "Failed to fetch");
      throw error;
    }

    const items = [];

    for (const key in responseData) {
      const item = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        height: responseData[key].height,
        surface: responseData[key].surface,
        weight: responseData[key].weight,
        initial: responseData[key].initial,
        destination: responseData[key].destination,
        date: responseData[key].date,
        time: responseData[key].time,
        description: responseData[key].description,
        options: responseData[key].options,
      };
      items.push(item);
    }
    context.commit("setItems", items);
    context.commit("setFetchTimestamp");
  },
  setContactIsShown(context, payload) {
    context.commit("setContactIsShown", payload);
  },
};
