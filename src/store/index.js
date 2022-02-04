import { createStore } from "vuex";

import itemsModule from "./modules/items/index";
import driversModule from "./modules/drivers/index";
import itemRequestsModule from "./modules/item-requests/index";
import driverRequestsModule from "./modules/driver-requests/index";
import authModule from "./modules/auth/index";

const store = createStore({
  modules: {
    items: itemsModule,
    drivers: driversModule,
    itemRequests: itemRequestsModule,
    driverRequests: driverRequestsModule,
    auth: authModule,
  },
});

export default store;
