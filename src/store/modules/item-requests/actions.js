export default {
  async contactItem(context, payload) {
    let requestSenderId = null;
    if (payload.isDriver) {
      requestSenderId = context.rootGetters.userId;
    }
    const newRequests = {
      userEmail: payload.email,
      message: payload.message,
      requestSenderId,
    };
    const response = await fetch(
      `https://delivery-system-bfede-default-rtdb.firebaseio.com/item-requests/${payload.itemId}.json`,
      { method: "POST", body: JSON.stringify(newRequests) }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || "Failed to send request.");
      throw error;
    }

    newRequests.id = responseData.name;
    newRequests.itemId = payload.itemId;
    context.commit("addRequest", newRequests);
  },

  async fetchRequests(context) {
    const itemId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://delivery-system-bfede-default-rtdb.firebaseio.com/item-requests/${itemId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || "Failed to fetch requests.");
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        itemId: itemId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
        requestSenderId: responseData[key].requestSenderId,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
