<template>
  <base-card>
    <h2>Filter deliveries</h2>
    <span class="filter-option">
      <input type="checkbox" id="urgent" checked @change="setFilter" />
      <label for="urgent">Urgent</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="affordable" checked @change="setFilter" />
      <label for="affordable">Affordable</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="security" checked @change="setFilter" />
      <label for="security">High level security</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        urgent: true,
        affordable: true,
        security: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit("change-filter", updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
