<template>
  <header>
    <nav>
      <h1><router-link to="/">Delivey System</router-link></h1>
      <ul>
        <li>
          <router-link to="/items">All Items</router-link>
        </li>
        <li>
          <router-link to="/drivers">Active Drivers</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/item-requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/items");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3d008d;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  position: relative;
  overflow: hidden;
}

li a:active,
li a:hover,
li a.router-link-active {
  /* box-shadow: 1px 1px 25px 10px rgba(146, 148, 248, 0.4); */
  border: 1px solid rgb(146, 148, 248);
}

header li a:before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(146, 148, 248, 0.4),
    transparent
  );
  transition: all 650ms;
}

header li a:hover:before {
  left: 100%;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
}

h1 a:active,
h1 a:hover,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
