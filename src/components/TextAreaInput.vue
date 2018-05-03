<template>
  <label>
    <p>{{label}}</p>
    <textarea v-bind:name="name" 
              v-model="inputValue"
              v-bind:disabled="disabled"
              v-on:input="handleChange"></textarea>
  </label>
</template>

<script>
  export default {
    name: 'IdTextarea',
    props: ['label', 'name', 'value', 'disabledState'],
    data: function() {
      return {
        disabled: false,
        inpuValue: null
      }
    },
    created() {
      let disabled = this.disabledState || '';
      this.disabled = (disabled.toLowerCase() === 'true');

      this.inputValue = this.value;
    },
    methods: {
      handleChange() {
        let updates = {
          changed: (this.value !== this.inputValue),
          value: this.inputValue
        };

        this.$emit('changed', updates);
      }
    }
  }
</script>

<style>
</style>