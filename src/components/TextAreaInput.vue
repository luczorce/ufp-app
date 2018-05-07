<template>
  <label>
    <p class="form-label">
      <span>{{label}}</span>
      <privacy-label v-bind:private="privateSetting" v-show="state > 0" />
    </p>

    <textarea v-bind:name="name" 
              v-model="inputValue"
              v-bind:disabled="disabled"
              v-on:input="handleChange"
              v-show="state === 0"></textarea>

    <ul class="textarea--mimic" v-show="state > 0" v-bind:class="{'public-content': (!privateSetting), 'private-content': (privateSetting)}">
      <li v-for="item of getValuesAsArray()">{{item}}</li>
    </ul>
  </label>
</template>

<script>
  import PrivacyLabel from '@/components/PrivacyLabel.vue';

  export default {
    name: 'IdTextarea',
    props: {
      label: String,
      name: String,
      value: String,
      state: Number,
      disabled: Boolean,
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
      getValuesAsArray() {
        let value;

        if (this.inputValue.length) {
          value = this.inputValue.split(',');
          value.forEach(trimArrayValues);
        } else {
          value = [];
        }

        return value;
      },
      handleChange() {
        let value = this.getValuesAsArray();
          
        let updates = {
          changed: (this.inputValue !== this.originalValue),
          value: value
        };

        this.$emit('changed', updates);
      },
      setOriginalValue() {
        this.inputValue = this.value;
        this.originalValue = this.value;
        this.privateSetting = this.private;
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