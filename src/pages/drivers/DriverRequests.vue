<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received For Driver!</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <the-request
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
            senderType="item"
            :requestSenderId="req.requestSenderId"
          ></the-request>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
        <div class="switch-btn">
          <base-button v-if="isLoggedIn" link to="/item-requests" mode="flat"
            >Switch to requests for sender</base-button
          >
        </div>
      </base-card>
    </section>
  </div>
</template>

<script>
import TheRequest from "../../components/layout/TheRequest.vue";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  components: {
    TheRequest,
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["driverRequests/requests"];
    },
    hasRequests() {
      return this.$store.getters["driverRequests/hasRequests"];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.loadRequests();
    this.loadItems();
  },

  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("driverRequests/fetchRequests");
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      this.isLoading = false;
    },
    async loadItems(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("items/loadItems", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}
ul {
  list-style-type: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}
h3,
.switch-btn {
  text-align: center;
}
</style>
