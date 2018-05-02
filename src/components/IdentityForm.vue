<template>
  <form v-on:submit.prevent="updateStorage()">
    <section class="id-section">
      <h2>Names</h2>
      
      <id-input label="first name" name="firstName" v-bind:value="firstName" disabled-state="pop" />
      <id-input label="last name" name="lastName" v-bind:value="lastName" disabled-state="pop" />
    </section>

    <section class="id-section">
      <h2>Location</h2>

      <id-input label="city" name="city" :value="city" v-on:changed="(data) => {handleUpdate('city', data)}" />
      <id-input label="state/provence" name="state" :value="state" v-on:changed="(data) => {handleUpdate('state', data)}" />
      <id-input label="country" name="country" :value="country" v-on:changed="(data) => {handleUpdate('country', data)}" />
    </section>

    <section class="id-section">
      <h2>Interests</h2>

      <id-textarea label="hobbies" name="hobbies" :value="hobbies" v-on:changed="(data) => {handleUpdate('hobbies', data)}" />
      <id-textarea label="causes" name="causes" :value="causes" v-on:changed="(data) => {handleUpdate('causes', data)}" />
    </section>

    <section>
      <button type="submit" v-bind:disabled="!allowUpdate">save personal data locally</button>
    </section>
  </form>
</template>

<script>
import IdInput from '@/components/TextInput.vue';
import IdTextarea from '@/components/TextAreaInput.vue';
import localStorage from '@/services/local-storage.js';

let data;
let keys = [ 'city', 'state', 'country', 'hobbies', 'causes' ];

export default {
  name: 'IdentityForm',
  components: { IdInput, IdTextarea },
  data: function() {
    return {
      firstName: null,
      lastName: null,
      city: null,
      state: null,
      country: null,
      hobbies: null,
      causes: null,

      trackedData: {
        city: {changed: false, value: null},
        state: {changed: false, value: null},
        country: {changed: false, value: null},
        hobbies: {changed: false, value: null},
        causes: {changed: false, value: null}
      },
      allowUpdate: false
    };
  },
  created() {
    localStorage.init();
    data = localStorage.get();

    // TODO these should come from the uPort profile
    this.firstName = data.firstName;
    this.lastName = data.lastName;

    this.city = data.city;
    this.state = data.state;
    this.country = data.country;
    this.hobbies = data.hobbies;
    this.causes = data.causes;
  },
  methods: {
    getUpdatedData() {
      let updates = Object.assign({}, data);

      keys.forEach((key) => {
        if (this.trackedData[key].changed) {
          updates[key] = this.trackedData[key].value;
        }
      });

      return updates;
    },
    handleUpdate(which, data) {
      this.trackedData[which] = {
        changed: data.changed,
        value: data.value
      };
      this.shouldAllowUpdate();
    },
    shouldAllowUpdate() {
      let shouldAllow = false;

      keys.forEach((key) => {
        if (this.trackedData[key].changed) {
          shouldAllow = true;
        }
      });

      this.allowUpdate = shouldAllow;
    },
    updateStorage() {
      let updates = this.getUpdatedData();
      localStorage.update(updates);
      localStorage.init();
      data = localStorage.get();
      
      this.trackedData = {
        city: {changed: false, value: null},
        state: {changed: false, value: null},
        country: {changed: false, value: null},
        hobbies: {changed: false, value: null},
        causes: {changed: false, value: null}
      };
      this.shouldAllowUpdate();
    },
  }
}
</script>

<style>
  .id-section {
    margin: 0 auto 2em;
    padding: 0 15px;
  }
</style>
