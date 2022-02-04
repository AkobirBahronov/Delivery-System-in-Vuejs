<template>
  <li>
    <div class="details">
      <h3>{{ fullName }}</h3>
      <h4>{{ date }}</h4>
    </div>
    <h3>{{ itemDirection }}</h3>
    <div>
      <base-badge
        v-for="option in options"
        :key="option"
        :type="option"
        :title="option === 'security' ? 'High level security' : option"
      >
      </base-badge>
      <div class="actions">
        <base-button link mode="outline" :to="itemContactLink"
          >Contact</base-button
        >
        <base-button link :to="itemDetailsLink">View details</base-button>
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
    "options",
  ],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    itemContactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    itemDetailsLink() {
      return this.$route.path + "/" + this.id;
    },
    itemDirection() {
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
