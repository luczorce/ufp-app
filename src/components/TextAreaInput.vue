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
    props: {
      label: String,
      name: String,
      value: String,
      disabled: Boolean
    },
    data: function() {
      return {
        inpuValue: null
      }
    },
    created() {
      this.inputValue = this.value;
    },
    methods: {
      handleChange() {
        let value;

        if (this.inputValue.length) {
          value = this.inputValue.split(',');
          value.forEach(trimArrayValues);
        } else {
          value = [];
        }
          
        let updates = {
          changed: (this.value !== this.inputValue),
          value: value
        };

        this.$emit('changed', updates);
      }
    }
  }

  //////

  function trimArrayValues(val, index, array) {
    array[index] = val.trim();
  }
</script>

<style>
</style>