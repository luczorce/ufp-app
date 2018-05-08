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

  export default {
    name: 'Signupform',
    data: function() {
      return {
        firstName: null,
        lastName: null
      };
    },
    methods: {
      submitNewUser() {
        let user = new Person(this.firstName, this.lastName);
        // TODO get response from UFRequests
        // const response = await axios({poi poi poi POST /signup})
        // TODO update the user with the response
        // user.initDevice(response)
        // TODO save that user!
        // localStorage.update(user);
      }
    }
  }
</script>

<style>
  
</style>
