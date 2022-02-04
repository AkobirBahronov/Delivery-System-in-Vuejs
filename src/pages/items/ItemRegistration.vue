<template>
  <section>
    <base-card>
      <h2>Register the items that should be delivered!</h2>
      <item-form @save-data="saveData"></item-form>
    </base-card>
  </section>
</template>

<script>
import ItemForm from "../../components/items/ItemForm";

export default {
  components: {
    ItemForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("items/registerItem", data);
      this.$router.replace("/items");
    },
  },
};
</script>

<style scoped></style>
