<template>
  <section>
    <base-card>
      <h2>Register as an active driver to take deliveries!</h2>
      <driver-form @save-data="saveData"></driver-form>
    </base-card>
  </section>
</template>

<script>
import DriverForm from "../../components/drivers/DriverForm";

export default {
  components: {
    DriverForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("drivers/registerDriver", data);
      this.$router.replace("/drivers");
    },
  },
};
</script>

<style scoped></style>
