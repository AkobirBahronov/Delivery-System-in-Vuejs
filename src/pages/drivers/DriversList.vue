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
      <driver-filter @change-filter="setFilters"></driver-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadDrivers(true)"
            >Refresh</base-button
          >
          <base-button
            link
            to="/auth?redirect=driver-registration"
            v-if="!isLoggedIn"
            >Login to Register as A Driver</base-button
          >
          <base-button
            v-if="isLoggedIn && !isDriver && !isLoading"
            link
            to="/driver-registration"
            >Register as A Driver</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasDrivers">
          <li v-for="driver in filteredDrivers" :key="driver.id">
            <driver-description
              :id="driver.id"
              :first-name="driver.firstName"
              :last-name="driver.lastName"
              :initial="driver.initial"
              :destination="driver.destination"
              :date="driver.date"
              :features="driver.features"
            >
            </driver-description>
          </li>
        </ul>
        <h3 v-else>No drivers found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import DriverDescription from "../../components/drivers/DriverDescription.vue";
import DriverFilter from "../../components/drivers/DriverFilter.vue";
export default {
  components: {
    DriverDescription,
    DriverFilter,
  },
  data() {
    return {
      activeFilters: {
        experienced: true,
        highPriced: true,
        affordable: true,
        newcomer: true,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isDriver() {
      return this.$store.getters["drivers/isDriver"];
    },
    filteredDrivers() {
      const drivers = this.$store.getters["drivers/drivers"];
      return drivers.filter((driver) => {
        if (
          this.activeFilters.experienced &&
          driver.features.includes("experienced")
        ) {
          return true;
        }
        if (
          this.activeFilters.highPriced &&
          driver.features.includes("high-priced")
        ) {
          return true;
        }
        if (
          this.activeFilters.affordable &&
          driver.features.includes("affordable")
        ) {
          return true;
        }
        if (
          this.activeFilters.newcomer &&
          driver.features.includes("newcomer")
        ) {
          return true;
        }
      });
    },
    hasDrivers() {
      return !this.isLoading && this.$store.getters["drivers/hasDrivers"];
    },
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
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
  created() {
    this.loadDrivers();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.control {
  display: flex;
  justify-content: space-between;
}
</style>
