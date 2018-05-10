<template>
  <div class="page welcome-page">
    <h1>Welcome to the Universal Federated Profile</h1>

    <p>Here we can talk about things.</p>
    <!-- TODO add a FAQ page, add link here -->
    
    <p>Get started by <router-link :to="{name: 'home'}">checking out and update your data</router-link> all in one place.</p>
  </div>
</template>

<script>


export default {
  name: 'welcome'
}
</script>
