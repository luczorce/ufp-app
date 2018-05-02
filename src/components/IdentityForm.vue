<template>
  <form>
    <section class="id-section">
      <h2>Names</h2>
      
      <id-input label="first name" name="firstName" :value="firstName" disabled-state="pop" />

      <id-input label="last name" name="lastName" :value="lastName" disabled-state="pop" />
    </section>

    <section class="id-section">
      <h2>Location</h2>

      <id-input label="city" name="city" :value="city" />
      <id-input label="state/provence" name="state" :value="state" />
      <id-input label="country" name="country" :value="country" />
    </section>

    <section class="id-section">
      <h2>Interests</h2>

      <id-textarea label="hobbies" name="hobbies" :value="hobbies" />
      <id-textarea label="causes" name="causes" :value="causes" />
    </section>
  </form>
</template>

<script>
import IdInput from '@/components/TextInput.vue';
import IdTextarea from '@/components/TextAreaInput.vue';
import localStorage from '@/services/local-storage.js';

let data;

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
      causes: null
    };
  },
  mounted() {
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
  }
}
</script>

<style>
  .id-section {
    margin: 0 auto 2em;
    padding: 0 15px;
  }
</style>
