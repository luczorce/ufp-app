<template>
  <label>
    <p class="form-label">
      <span>{{label}}</span>
      <privacy-label v-bind:private="privateSetting" v-show="state > 0" />
    </p>
    
    <input type="text" 
           v-bind:name="name" 
           v-model="inputValue" 
           v-bind:disabled="disabled" 
           v-bind:class="{'disabled-but-bright': brightDisabled}"
           v-on:input="handleChange"
           v-show="state === 0">

    <p class="input-text--mimic"
       v-show="state > 0"
       v-bind:class="{'public-content': (!privateSetting), 'private-content': (privateSetting)}"
       v-on:click="handlePrivacyUpdate">{{inputValue}}</p>
  </label>
</template>

<script>
  import PrivacyLabel from '@/components/PrivacyLabel.vue';

  export default {
    name: 'IdInput',
    props: {
      label: String,
      name: String,
      value: String,
      state: Number,
      disabled: Boolean,
      brightDisabled: Boolean,
      private: Boolean
    },
    data: function() {
      return {
        originalValue: null,
        inputValue: null,
        privateSetting: null
      }
    },
    components: { PrivacyLabel },
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
      handlePrivacyUpdate() {
        this.$emit('privacy-change', !this.privateSetting);
      },
      setOriginalValue() {
        this.inputValue = this.value;
        this.originalValue = this.value;
        this.privateSetting = this.private;
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