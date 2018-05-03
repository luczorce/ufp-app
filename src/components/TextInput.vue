<template>
  <label>
    <p>{{label}}</p>
    <input type="text" 
           v-bind:name="name" 
           v-model="inputValue" 
           v-bind:disabled="disabled" 
           v-bind:class="{'disabled-but-bright': brightDisabled}"
           v-on:input="handleChange">
  </label>
</template>

<script>
  export default {
    name: 'IdInput',
    props: {
      label: String,
      name: String,
      value: String,
      disabled: Boolean,
      brightDisabled: Boolean
    },
    data: function() {
      return {
        inputValue: null
      }
    },
    created() {
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
  input:disabled.disabled-but-bright {
    color: black;
    background: var(--white1);
  }
</style>