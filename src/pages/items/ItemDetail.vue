<template>
  <div>
    <section>
      <base-card>
        <div class="detail">
          <div class="info-detail">
            <h2>Orderer: {{ fullName }}</h2>
            <h3>Direction: {{ initialLoc }} -> {{ destination }}</h3>
            <div class="date">Date: {{ date }} {{ time }}</div>
          </div>
          <div class="image-details">
            <div class="surface">{{ surface }} sm²</div>
            <div class="height">{{ height }} sm</div>
            <div class="weight">{{ weight }} kg</div>
            <img src="../../images/delivery_box.jpg" alt="" width="250" />
          </div>
        </div>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Does this a compatible for you? Reach out now!</h2>
          <base-button v-if="!contactIsShown" link :to="contactLink"
            >Contact</base-button
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="option in options"
          :key="option"
          :type="option"
          :title="option === 'security' ? 'High level security' : option"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return { selectedItem: null };
  },
  computed: {
    fullName() {
      return this.selectedItem.firstName + " " + this.selectedItem.lastName;
    },
    height() {
      return this.selectedItem.height;
    },
    surface() {
      return this.selectedItem.surface;
    },
    weight() {
      return this.selectedItem.weight;
    },
    initialLoc() {
      return this.selectedItem.initial;
    },
    destination() {
      return this.selectedItem.destination;
    },
    date() {
      return this.selectedItem.date;
    },
    time() {
      return this.selectedItem.time;
    },
    description() {
      return this.selectedItem.description;
    },
    options() {
      return this.selectedItem.options;
    },
    contactLink() {
      return this.$route.path + "/contact";
    },
    contactIsShown() {
      return this.$store.getters["items/contactIsShown"];
    },
  },
  created() {
    this.selectedItem = this.$store.getters["items/items"].find(
      (item) => item.id === this.id
    );
    this.$store.dispatch("items/setContactIsShown", false);
  },
};
</script>

<style scoped>
h2 {
  margin: 0.6rem 0;
}
h3 {
  margin: 0.4rem 0;
}

.detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-detail {
  position: relative;
  top: -2rem;
  text-align: center;
}

.image-details {
  perspective: 700px;
}

.surface {
  position: absolute;
  left: 4.8rem;
  font-size: 1.8rem;
  font-weight: 500;
  transform-style: preserve-3d;
  transform: rotateX(55deg);
  color: #000;
  z-index: 100;
}

.height {
  position: absolute;
  top: 6.5rem;
  left: 7.5rem;
  font-size: 1.5rem;
  color: #000;
}

.weight {
  position: absolute;
  top: 14rem;
  left: 5.5rem;
  font-size: 1.8rem;
}
</style>
