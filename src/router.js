import { createRouter, createWebHistory } from "vue-router";

import ItemsList from "./pages/items/ItemsList.vue";
import ItemDetail from "./pages/items/ItemDetail.vue";
import ItemRegistration from "./pages/items/ItemRegistration.vue";
import ContactItem from "./pages/items/ContactItem.vue";
import ItemRequests from "./pages/items/ItemRequests.vue";
import DriversList from "./pages/drivers/DriversList.vue";
import DriverDetail from "./pages/drivers/DriverDetail.vue";
import RegisterAsActive from "./pages/drivers/RegisterAsActive.vue";
import ContactDriver from "./pages/drivers/ContactDriver.vue";
import DriverRequests from "./pages/drivers/DriverRequests.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/items" },
    {
      path: "/items",
      component: ItemsList,
    },
    {
      path: "/items/:id",
      component: ItemDetail,
      props: true,
      children: [{ path: "contact", component: ContactItem }],
    },
    {
      path: "/item-registration",
      component: ItemRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/item-requests",
      component: ItemRequests,
      meta: { requiresAuth: true },
    },
    {
      path: "/drivers",
      component: DriversList,
    },
    {
      path: "/driver-registration",
      component: RegisterAsActive,
      meta: { requiresAuth: true },
    },
    {
      path: "/driver-requests",
      component: DriverRequests,
      meta: { requiresAuth: true },
    },
    {
      path: "/drivers/:id",
      component: DriverDetail,
      props: true,
      children: [{ path: "contact", component: ContactDriver }],
    },
    {
      path: "/auth",
      component: UserAuth,
      meta: { requiresUnAuth: true },
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("auth");
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next("/items");
  } else {
    next();
  }
});

export default router;
