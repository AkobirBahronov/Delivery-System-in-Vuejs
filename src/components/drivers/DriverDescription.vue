<template>
  <li>
    <div class="details">
      <h3>{{ fullName }}</h3>
      <h4>{{ date }}</h4>
    </div>
    <h3>{{ driverDirection }}</h3>
    <div>
      <base-badge
        v-for="feature in features"
        :key="feature === 'highPriced' ? 'high-priced' : feature"
        :type="feature === 'highPriced' ? 'high-priced' : feature"
        :title="feature === 'highPriced' ? 'high-priced' : feature"
      >
      </base-badge>
      <div class="actions">
        <base-button link mode="outline" :to="driverContactLink"
          >Contact</base-button
        >
        <base-button link :to="driverDetailsLink">View details</base-button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "id",
    "firstName",
    "lastName",
    "initial",
    "destination",
    "date",
    "features",
  ],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    driverContactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    driverDetailsLink() {
      return this.$route.path + "/" + this.id;
    },
    driverDirection() {
      return this.initial + "->" + this.destination;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

.details h3 {
  font-size: 1.5rem;
}

.details {
  display: flex;
  justify-content: space-between;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
