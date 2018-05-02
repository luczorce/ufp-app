<template>
  <label>
    <p>{{label}}</p>
    <textarea v-bind:name="name" 
              v-model="value"
              v-bind:disabled="disabled"></textarea>
  </label>
</template>

<script>
  export default {
    name: 'IdTextarea',
    props: ['label', 'name', 'value', 'disabledState'],
    data: function() {
      return {
        disabled: false,
      }
    },
    created() {
      let disabled = this.disabledState || '';
      this.disabled = (disabled.toLowerCase() === 'true');
    }
  }
</script>

<style>
</style>