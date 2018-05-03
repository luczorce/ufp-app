<template>
  <div class="identity-container">
    <div class="form-container">
      <form v-on:submit.prevent="updateStorage()" class="identity-form">
        <section class="id-section">
          <h2>Names</h2>
          
          <id-input label="first name" name="firstName" v-bind:value="firstName" disabled-state="pop" />
          <id-input label="last name" name="lastName" v-bind:value="lastName" disabled-state="pop" />
        </section>

        <section class="id-section">
          <h2>Location</h2>

          <id-input label="city" name="city" :value="city" v-on:changed="(data) => {handleUpdateValue('city', data)}" />
          <id-input label="state/provence" name="state" :value="state" v-on:changed="(data) => {handleUpdateValue('state', data)}" />
          <id-input label="country" name="country" :value="country" v-on:changed="(data) => {handleUpdateValue('country', data)}" />
        </section>

        <section class="id-section">
          <h2>Interests</h2>

          <id-textarea label="hobbies" name="hobbies" :value="hobbies" v-on:changed="(data) => {handleUpdateValue('hobbies', data)}" />
          <id-textarea label="causes" name="causes" :value="causes" v-on:changed="(data) => {handleUpdateValue('causes', data)}" />
        </section>

      </form>
    </div>

    <div class="identity-footer">
      <div>
        <button type="submit" v-bind:disabled="!allowUpdate">save personal data locally</button>
      </div>

      <div>
        <button type="button" v-bind:disabled="allowUpdate">public data</button>
        <button type="button" v-bind:disabled="allowUpdate">private data</button>
      </div>

    </div>
  </div>
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

    this.city = data.city.value;
    this.state = data.state.value;
    this.country = data.country.value;
    this.hobbies = data.hobbies.value.join(', ');
    this.causes = data.causes.value.join(', ');
  },
  methods: {
    getUpdatedValueData() {
      let updates = Object.assign({}, data);

      keys.forEach((key) => {
        if (this.trackedData[key].changed) {
          updates[key].value = this.trackedData[key].value;
        }
      });

      if (!updates.hobbies.value.length) {
        updates.hobbies.value = [];
      } else {
        updates.hobbies.value = updates.hobbies.value.split(',');
        updates.hobbies.value.forEach(trimArrayValues);
      }

      if (!updates.causes.value.length) {
        updates.causes.value = [];
      } else {
        updates.causes.value = updates.causes.value.split(',');
        updates.causes.forEach(trimArrayValues);
      }

      return updates;
    },
    handleUpdateValue(which, data) {
      this.trackedData[which] = {
        changed: data.changed,
        value: data.value
      };
      this.shouldAllowUpdateValue();
    },
    shouldAllowUpdateValue() {
      let shouldAllow = false;

      keys.forEach((key) => {
        if (this.trackedData[key].changed) {
          shouldAllow = true;
        }
      });

      this.allowUpdate = shouldAllow;
    },
    updateStorage() {
      let updates = this.getUpdatedValueData();
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
      this.shouldAllowUpdateValue();
    },
  }
}

//////

function trimArrayValues(val, index, array) {
  array[index] = val.trim();
}
</script>

<style>
  .identity-container {
    display: flex;
    flex-direction: column;
  }

  .form-container {
    flex: 0 1 auto;
    overflow-y: auto;
    height: calc(100vh - 100px);
  }

  .identity-footer {
    border-top: 1px var(--black4) solid;
    padding: 20px 10px 10px;
    height: 100px;
  }

  .id-section {
    margin: 0 auto 2em;
    padding: 0 15px;
  }
</style>
