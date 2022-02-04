<template>
  <div>
    <section>
      <base-card>
        <div class="detail">
          <div>
            <h2>{{ fullName }}</h2>
            <h3>{{ initialLoc }} -> {{ destination }}</h3>
          </div>
          <div class="datetime">
            <div class="date">{{ date }}</div>
            <div class="time">{{ time }}</div>
          </div>
        </div>
        <span class="car-text">Car number: </span>
        <div class="car">
          <span class="loc-code">{{ locationCode }}</span>
          <span class="car-number"
            >{{ carNumber }}
            <span class="img">
              <img
                src="../../images/uzb_flag.png"
                alt=""
                width="12"
                height="8"
              />
              <span>UZ</span>
            </span>
          </span>
          <div></div>
        </div>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Are you interested the work of this driver? Reach out now!</h2>
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
          v-for="feature in features"
          :key="feature"
          :type="feature"
          :title="feature"
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
    return { selectedDriver: null };
  },
  computed: {
    fullName() {
      return this.selectedDriver.firstName + " " + this.selectedDriver.lastName;
    },
    initialLoc() {
      return this.selectedDriver.initial;
    },
    destination() {
      return this.selectedDriver.destination;
    },
    date() {
      return this.selectedDriver.date;
    },
    time() {
      return this.selectedDriver.time;
    },
    locationCode() {
      return this.selectedDriver.locationCode;
    },
    carNumber() {
      let carNumber = this.selectedDriver.carNumber;
      carNumber =
        carNumber[0].toUpperCase() +
        carNumber[1] +
        carNumber[2] +
        carNumber[3] +
        carNumber[4].toUpperCase() +
        carNumber[5].toUpperCase();
      return carNumber;
    },
    description() {
      return this.selectedDriver.description;
    },
    features() {
      return this.selectedDriver.features;
    },
    contactLink() {
      return this.$route.path + "/contact";
    },
    contactIsShown() {
      return this.$store.getters["drivers/contactIsShown"];
    },
  },
  created() {
    this.selectedDriver = this.$store.getters["drivers/drivers"].find(
      (driver) => driver.id === this.id
    );
    this.$store.dispatch("drivers/setContactIsShown", false);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Archivo&display=swap");
h2 {
  margin: 0.6rem 0;
}
h3 {
  margin: 0.6rem 0 1rem 0;
}

.detail {
  display: flex;
  justify-content: space-between;
}

.datetime {
  text-align: center;
}

.date {
  margin: 0.5rem 0;
}

.car-text {
  font-size: 1.3rem;
}

.car {
  font-family: "Archivo", sans-serif;
  font-size: 1.5rem;
  display: inline;
}

.loc-code {
  padding: 4px;
  border: 3px solid #000;
  border-right: 1px;
  border-radius: 0.5rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.car-number {
  padding: 4px;
  border: 3px solid #000;
  border-radius: 0.5rem;
  padding-right: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.img img {
  position: relative;
  top: -10px;
}

.img span {
  position: relative;
  left: -14px;
  top: 3px;
  font-size: 11px;
  color: #0a87ee;
}
</style>
