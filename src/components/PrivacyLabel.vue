<template>
  <span class="privacy-label">
    <span v-if="private" class="private-icon">&#8856;</span>
    <span v-if="private">private</span>
  
    <span v-if="!private" class="private-icon">&#9900;</span>
    <span v-if="!private">public</span>

    <span v-if="permanent"> | permanemt</span>
  </span>
</template>

<script>
  export default {
    name: 'PrivacyLabel',
    props: {
      private: Boolean,
      permanent: Boolean
    }
  }
</script>

<style>
  .privacy-label {
    font-family: var(--mono-font);
    font-size: 0.8em;
    transform: translateY(1px);
    margin-left: 5px;
  }

  .private-icon {
    margin: 0 5px;
  }
</style>