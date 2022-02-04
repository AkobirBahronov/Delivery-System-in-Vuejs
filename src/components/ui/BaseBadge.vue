<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.4rem 1.2rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.urgent,
.experienced {
  background-color: #3d008d;
  color: white;
}

.affordable {
  background-color: #71008d;
  color: white;
}

.security,
.high-priced {
  background-color: #8d006e;
  color: white;
}

.newcomer {
  background-color: #8d0018;
  color: white;
}
</style>
