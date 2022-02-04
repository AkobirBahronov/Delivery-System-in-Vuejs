<template>
  <base-card>
    <h2>Filter drivers</h2>
    <span class="filter-feature">
      <input type="checkbox" id="experienced" checked @change="setFilter" />
      <label for="experienced">Experienced</label>
    </span>
    <span class="filter-feature">
      <input type="checkbox" id="high-priced" checked @change="setFilter" />
      <label for="high-priced">High-priced</label>
    </span>
    <span class="filter-feature">
      <input type="checkbox" id="affordable" checked @change="setFilter" />
      <label for="affordable">Affordable</label>
    </span>
    <span class="filter-feature">
      <input type="checkbox" id="newcomer" checked @change="setFilter" />
      <label for="newcomer">Newcomer</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        experienced: true,
        highPriced: true,
        affordable: true,
        newcomer: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      let inputId = event.target.id;
      if (inputId === "high-priced") {
        inputId = "highPriced";
      }
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

.filter-feature {
  margin-right: 1rem;
}

.filter-feature label,
.filter-feature input {
  vertical-align: middle;
}

.filter-feature label {
  margin-left: 0.25rem;
}

.filter-feature.active label {
  font-weight: bold;
}
</style>
