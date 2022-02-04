<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received For Sender</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <the-request
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
            senderType="driver"
            :requestSenderId="req.requestSenderId"
          ></the-request>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
        <div class="switch-btn">
          <base-button v-if="isLoggedIn" link to="/driver-requests" mode="flat"
            >Switch to requests for driver</base-button
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
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("itemRequests/fetchRequests");
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      this.isLoading = false;
    },
    async loadDrivers(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("drivers/loadDrivers", {
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
  computed: {
    receivedRequests() {
      return this.$store.getters["itemRequests/requests"];
    },
    hasRequests() {
      return this.$store.getters["itemRequests/hasRequests"];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.loadRequests();
    this.loadDrivers();
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
