<template>
  <label>
    <p>{{label}}</p>
    
    <input type="text" 
           v-bind:name="name" 
           v-model="inputValue" 
           v-bind:disabled="disabled" 
           v-bind:class="{'disabled-but-bright': brightDisabled}"
           v-on:input="handleChange"
           v-show="state === 0">

    <p class="input-text--mimic" v-show="state > 0">{{inputValue}}</p>
  </label>
</template>

<script>
  export default {
    name: 'IdInput',
    props: {
      label: String,
      name: String,
      value: String,
      state: Number,
      disabled: Boolean,
      brightDisabled: Boolean
    },
    data: function() {
      return {
        originalValue: null,
        inputValue: null
      }
    },
    created() {
      this.setOriginalValue();
      this.$parent.$on('resetOriginalValue', this.setOriginalValue);
    },
    methods: {
      handleChange() {
        let updates = {
          changed: (this.inputValue !== this.originalValue),
          value: this.inputValue
        };

        this.$emit('changed', updates);
      },
      setOriginalValue() {
        this.inputValue = this.value;
        this.originalValue = this.value;
      }
    }
  }
</script>

<style>
  input:disabled.disabled-but-bright {
    color: var(--black);
    background: var(--white1);
  }
</style>