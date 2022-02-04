export default {
  async contactDriver(context, payload) {
    let requestSenderId = null;
    if (payload.isRegisteredItem) {
      requestSenderId = context.rootGetters.userId;
    }
    const newRequests = {
      userEmail: payload.email,
      message: payload.message,
      requestSenderId,
    };
    const response = await fetch(
      `https://delivery-system-bfede-default-rtdb.firebaseio.com/driver-requests/${payload.driverId}.json`,
      { method: "POST", body: JSON.stringify(newRequests) }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || "Failed to send request.");
      throw error;
    }

    newRequests.id = responseData.name;
    newRequests.driverId = payload.driverId;
    context.commit("addRequest", newRequests);
  },

  async fetchRequests(context) {
    const driverId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://delivery-system-bfede-default-rtdb.firebaseio.com/driver-requests/${driverId}.json?auth=${token}`
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
        driverId: driverId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
        requestSenderId: responseData[key].requestSenderId,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
