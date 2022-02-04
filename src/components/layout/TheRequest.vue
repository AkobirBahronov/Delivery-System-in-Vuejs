<template>
  <li>
    <div>
      <a :href="emailLink"> {{ email }} </a>
    </div>
    <p>{{ message }}</p>
    <router-link
      v-if="requestSenderId"
      class="view-detail"
      :to="requestSenderLink"
    >
      View {{ senderType }} details
    </router-link>
  </li>
</template>

<script>
export default {
  props: ["email", "message", "requestSenderId", "senderType"],
  methods: {},
  computed: {
    requestSenderLink() {
      if (this.senderType === "driver") {
        return "/drivers/" + this.requestSenderId;
      } else {
        return "/items/" + this.requestSenderId;
      }
    },
    emailLink() {
      return "mailto:" + this.email;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #8d007a;
}
p {
  margin: 0.5rem 0 0 0;
}
.view-detail {
  position: relative;
  left: 300px;
  color: #0d917b;
}

.view-detail:hover,
.view-detail:active {
  color: #07b0b6;
}
</style>
