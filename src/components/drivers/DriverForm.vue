<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="first-name">First Name <span>*</span></label>
      <input
        type="text"
        id="first-name"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">First Name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="last-name">Last Name <span>*</span></label>
      <input
        type="text"
        id="last-name"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last Name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !initial.isValid }">
      <label for="initial">Initial Location <span>*</span></label>
      <select
        id="initial"
        v-model="initial.val"
        @blur="clearValidity('initial')"
      >
        <option value="Tashkent">Tashkent</option>
        <option value="Bukhara">Bukhara</option>
        <option value="Samarkand">Samarkand</option>
        <option value="Andijan">Andijan</option>
        <option value="Navoi">Navoi</option>
        <option value="Khorezm">Khorezm</option>
        <option value="Kashkadarya">Kashkadarya</option>
        <option value="Surkhandarya">Surkhandarya</option>
        <option value="Jizzakh">Jizzakh</option>
        <option value="Namangan">Namangan</option>
        <option value="Fergana">Fergana</option>
        <option value="Sirdaryo">Sirdaryo</option>
        <option value="Karakalpakstan">Karakalpakstan Republic</option>
      </select>
      <p v-if="!initial.isValid">Initial location must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !destination.isValid }">
      <label for="destination">Destination <span>*</span></label>
      <select
        id="destination"
        v-model="destination.val"
        @blur="clearValidity('destination')"
      >
        <option value="Bukhara">Bukhara</option>
        <option value="Tashkent">Tashkent</option>
        <option value="Samarkand">Samarkand</option>
        <option value="Andijan">Andijan</option>
        <option value="Navoiy">Navoi</option>
        <option value="Khorezm">Khorezm</option>
        <option value="Kashkadarya">Kashkadarya</option>
        <option value="Surkhandarya">Surkhandarya</option>
        <option value="Jizzakh">Jizzakh</option>
        <option value="Namangan">Namangan</option>
        <option value="Fergana">Fergana</option>
        <option value="Sirdaryo">Sirdaryo</option>
        <option value="Karakalpakstan">Karakalpakstan Republic</option>
      </select>
      <p v-if="!destination.isValid">
        Destination must not be empty or equal to initial location.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !date.isValid }">
      <label for="date">Departure Date <span>*</span></label>
      <input
        type="date"
        id="date"
        :min="date.current"
        max="2023-01-01"
        v-model="date.val"
        @blur="clearValidity('date')"
      />
      <p v-if="!date.isValid">Date must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !time.isValid }">
      <label for="time">Departure Time <span>*</span></label>
      <input
        type="time"
        id="time"
        v-model="time.val"
        @blur="clearValidity('time')"
      />
      <p v-if="!time.isValid">Time must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !locationCode.isValid }">
      <label for="locationCode"
        >Location Code(only 2 numbers) <span>*</span></label
      >
      <input
        type="number"
        id="locationCode"
        max="99"
        v-model.number="locationCode.val"
        @blur="clearValidity('locationCode')"
      />
      <p v-if="!locationCode.isValid">
        Location Code must be consist of two numbers
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !carNumber.isValid }">
      <label for="carNumber">Car Number(6 characters) <span>*</span></label>
      <input
        type="text"
        id="carNumber"
        v-model.number="carNumber.val"
        @blur="clearValidity('carNumber')"
      />
      <p v-if="!carNumber.isValid">Please enter correct car numbers!</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="desc">Description about your service <span>*</span></label>
      <textarea
        id="desc"
        rows="4"
        @blur="clearValidity('description')"
        v-model.trim="description.val"
      ></textarea>
    </div>
    <p v-if="!description.isValid">Description must not be empty.</p>
    <div class="form-control" :class="{ invalid: !features.isValid }">
      <h3>Choose appropriate features</h3>
      <div>
        <input
          type="checkbox"
          id="experienced"
          value="experienced"
          v-model="features.val"
          @blur="clearValidity('features')"
        />
        <label for="experienced">Experienced</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="newcomer"
          value="newcomer"
          v-model="features.val"
          @blur="clearValidity('features')"
        />
        <label for="newcomer">Newcomer</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="affordable"
          value="affordable"
          v-model="features.val"
          @blur="clearValidity('features')"
        />
        <label for="affordable">Affordable</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="high-priced"
          value="high-priced"
          v-model="features.val"
          @blur="clearValidity('features')"
        />
        <label for="high-priced">High-priced</label>
      </div>
      <p v-if="!features.isValid">At least one option must be selected.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again!</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: { val: "", isValid: true },
      lastName: { val: "", isValid: true },
      locationCode: { val: null, isValid: true },
      carNumber: { val: "", isValid: true },
      initial: { val: "", isValid: true },
      destination: { val: "", isValid: true },
      date: {
        val: "",
        current:
          new Date().getUTCFullYear().toString() +
          "-" +
          ((new Date().getUTCMonth() + 1).toString().length < 2 ? "0" : "") +
          (new Date().getUTCMonth() + 1).toString() +
          "-" +
          (new Date().getUTCDate().toString().length < 2 ? "0" : "") +
          new Date().getUTCDate().toString(),
        isValid: true,
      },
      time: { val: "", isValid: true },
      description: { val: "", isValid: true },
      features: { val: [], isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (
        !/^\d+$/.test(this.locationCode.val) ||
        this.locationCode.val <= 0 ||
        this.locationCode >= 100
      ) {
        this.locationCode.isValid = false;
        this.formIsValid = false;
      }
      if (
        this.carNumber.val.length !== 6 ||
        !/[a-zA-Z]/.test(this.carNumber.val[0]) ||
        !/^\d+$/.test(this.carNumber.val[1]) ||
        !/^\d+$/.test(this.carNumber.val[2]) ||
        !/^\d+$/.test(this.carNumber.val[3]) ||
        !/[a-zA-Z]/.test(this.carNumber.val[4]) ||
        !/[a-zA-Z]/.test(this.carNumber.val[5])
      ) {
        this.carNumber.isValid = false;
        this.formIsValid = false;
      }
      if (this.initial.val === "") {
        this.initial.isValid = false;
        this.formIsValid = false;
      }
      if (
        this.initial.val === this.destination.val ||
        this.destination.val === ""
      ) {
        this.destination.isValid = false;
        this.formIsValid = false;
      }
      if (this.date.val === "") {
        this.date.isValid = false;
        this.formIsValid = false;
      }
      if (this.time.val === "") {
        this.time.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.features.val.length === 0) {
        this.features.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (this.locationCode.val < 10) {
        this.locationCode.val = "0" + this.locationCode.val;
      }
      const formData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        locationCode: this.locationCode.val,
        carNumber: this.carNumber.val,
        initial: this.initial.val,
        destination: this.destination.val,
        date: this.date.val,
        time: this.time.val,
        description: this.description.val,
        features: this.features.val,
      };
      if (!this.formIsValid) {
        return;
      }
      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea,
select {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

select:focus {
  outline: none;
  border-color: #3d008d;
}

.invalid label,
.form-control span {
  color: red;
}

.invalid input,
.invalid section,
.invalid textarea {
  border: 1px solid red;
}
</style>
