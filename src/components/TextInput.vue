<template>
  <label>
    <p>{{label}}</p>
    <input type="text" 
           v-bind:name="name" 
           v-model="inputValue" 
           v-bind:disabled="disabled" 
           v-bind:class="{'disabled-but-bright': disabledButBright}"
           v-on:input="handleChange">
  </label>
</template>

<script>
  export default {
    name: 'IdInput',
    props: ['label', 'name', 'value', 'disabledState', 'changed'],
    data: function() {
      return {
        disabled: false,
        disabledButBright: false,
        inputValue: null
      }
    },
    created() {
      let disabled = this.disabledState || '';

      if (disabled === 'pop') {
        this.disabled = true;
        this.disabledButBright = true;
      } else {
        this.disabled = (disabled.toLowerCase() === 'true');
      }

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