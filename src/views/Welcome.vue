<template>
  <div class="page welcome-page">
    <h1>Welcome to the Universal Federated Profile</h1>

    <p>Here we can talk about things, and introduce more concepts.</p>
    <!-- TODO add a FAQ page, add link here -->
    
    <p>Get started by <router-link :to="{name: 'home'}">checking out and updating your data</router-link> all in one place.</p>
  </div>
</template>

<script>


export default {
  name: 'welcome'
}
</script>

<style>
  .welcome-page {
    padding: 0 15px;
  }
</style>
