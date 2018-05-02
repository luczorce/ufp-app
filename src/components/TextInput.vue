<template>
  <label>
    <p>{{label}}</p>
    <input type="text" 
           v-bind:name="name" 
           v-model="value" 
           v-bind:disabled="disabled" 
           v-bind:class="{'disabled-but-bright': disabledButBright}">
  </label>
</template>

<script>
  export default {
    name: 'IdInput',
    props: ['label', 'name', 'value', 'disabledState'],
    data: function() {
      return {
        disabled: false,
        disabledButBright: false
      }
    },
    created() {
      let disabled = this.disabledState;

      if (disabled === 'pop') {
        this.disabled = true;
        this.disabledButBright = true;
      } else {
        this.disabled = (disabled.toLowerCase() === 'true');
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