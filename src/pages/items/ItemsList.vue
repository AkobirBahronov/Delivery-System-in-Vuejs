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
      <item-filter @change-filter="setFilters"></item-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadItems(true)"
            >Refresh</base-button
          >
          <base-button
            link
            to="/auth?redirect=item-registration"
            v-if="!isLoggedIn"
            >Login to Register items</base-button
          >
          <base-button
            v-if="isLoggedIn && !isItem && !isLoading"
            link
            to="/item-registration"
            >Register your deliveries</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasItems">
          <li v-for="item in filteredItems" :key="item.id">
            <item-description
              :id="item.id"
              :first-name="item.firstName"
              :last-name="item.lastName"
              :initial="item.initial"
              :destination="item.destination"
              :date="item.date"
              :options="item.options"
            >
            </item-description>
          </li>
        </ul>
        <h3 v-else>No items found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import ItemDescription from "../../components/items/ItemDescription.vue";
import ItemFilter from "../../components/items/ItemFilter.vue";
export default {
  components: {
    ItemDescription,
    ItemFilter,
  },
  data() {
    return {
      activeFilters: {
        urgent: true,
        affordable: true,
        security: true,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isItem() {
      return this.$store.getters["items/isItem"];
    },
    filteredItems() {
      const items = this.$store.getters["items/items"];
      return items.filter((item) => {
        if (this.activeFilters.urgent && item.options.includes("urgent")) {
          return true;
        }
        if (
          this.activeFilters.affordable &&
          item.options.includes("affordable")
        ) {
          return true;
        }
        if (this.activeFilters.security && item.options.includes("security")) {
          return true;
        }
      });
    },
    hasItems() {
      return !this.isLoading && this.$store.getters["items/hasItems"];
    },
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
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
  created() {
    this.loadItems();
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
