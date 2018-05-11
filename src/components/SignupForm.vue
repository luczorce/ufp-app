<template>
  <form class="signup-form" ref="signupform" v-on:submit.prevent="submitNewUser">
    <section class="form-section">
      <h2>Sign up for UFP</h2>
      <p><em>Here is a faux-uport signup process</em></p>
      
      <label>
        <p class="form-label">first name</p>
        <input type="text" v-model="firstName" required />
      </label>

      <label>
        <p class="form-label">last name</p>
        <input type="text" v-model="lastName" required />
      </label>
            
      <button type="submit" class="id-button">create profile</button>
    </section>
  </form>
      
</template>

<script>
  import Person from '@/models/person';
  import localStorage from '@/services/local-storage.js';
  import requestsProvider from '@/services/requests-provider.js';

  export default {
    name: 'Signupform',
    data: function() {
      return {
        firstName: null,
        lastName: null
      };
    },
    // TODO add a created(), that checks for whether or not a user is registered on this device. warn them if so
    methods: {
      async submitNewUser() {
        let user = new Person(this.firstName, this.lastName);

        try {
          const response = await requestsProvider.signup();
          user.initDevice(response.deviceKey);
          localStorage.store(user);
          this.$router.push({name: 'welcome'});
        } catch(error) {
          console.log(error);
          // TODO if can't get the deviceKey, then ask them to try again?
        }
      }
    }
  }
</script>

<style>
  
</style>
