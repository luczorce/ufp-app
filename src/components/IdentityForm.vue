<template>
  <div class="identity-container"
       v-bind:class="{'private-mode': currentView === 2, 'public-mode': currentView === 1}">
    <div class="form-container">
      <form class="identity-form" ref="identityForm">
        <section class="id-section">
          <h2>Names</h2>
          
          <id-input label="first name" name="firstName" v-bind:value="firstName" disabled bright-disabled v-bind:state="currentView" />
          <id-input label="last name" name="lastName" v-bind:value="lastName" disabled bright-disabled v-bind:state="currentView"/>
        </section>

        <section class="id-section">
          <h2>Location</h2>

          <id-input label="city" name="city" :value="city" 
                    v-on:changed="(data) => {handleUpdateValue('city', data)}" 
                    v-bind:disabled="viewingDataPrivacy"
                    bright-disabled 
                    v-bind:state="currentView"/>
          <id-input label="state/provence" name="state" :value="state" 
                    v-on:changed="(data) => {handleUpdateValue('state', data)}" 
                    v-bind:disabled="viewingDataPrivacy"
                    bright-disabled 
                    v-bind:state="currentView"/>
          <id-input label="country" name="country" :value="country" 
                    v-on:changed="(data) => {handleUpdateValue('country', data)}" 
                    v-bind:disabled="viewingDataPrivacy"
                    bright-disabled 
                    v-bind:state="currentView"/>
        </section>

        <section class="id-section">
          <h2>Interests</h2>

          <id-textarea label="hobbies" name="hobbies" :value="hobbies" v-on:changed="(data) => {handleUpdateValue('hobbies', data)}" v-bind:disabled="viewingDataPrivacy" v-bind:state="currentView" />
          <id-textarea label="causes" name="causes" :value="causes" v-on:changed="(data) => {handleUpdateValue('causes', data)}" v-bind:disabled="viewingDataPrivacy" v-bind:state="currentView" />
        </section>
      </form>
    </div>

    <div class="identity-footer">
      <button type="button" class="id-button" 
              v-on:click="changeView(0)"
              v-bind:class="{'active': (currentView === 0)}">view data</button>
      <button type="button" class="id-button destructive" 
              v-bind:disabled="!allowUpdate"
              v-show="allowUpdate"
              v-on:click="revertData">
                revert changes</button>
      <button type="button" class="id-button" 
              v-bind:disabled="!allowUpdate"
              v-show="allowUpdate"
              v-on:click="updateStorage">
                save personal data locally</button>

      <button type="button" v-bind:disabled="allowUpdate" 
              v-show="!allowUpdate"
              class="id-button"
              v-on:click="changeView(1)"
              v-bind:class="{'active': (currentView === 1)}">
                public data
              </button>
      <button type="button" v-bind:disabled="allowUpdate" 
              v-show="!allowUpdate"
              class="id-button"
              v-on:click="changeView(2)"
              v-bind:class="{'active': (currentView === 2)}">
                private data
              </button>
    </div>
  </div>
</template>

<script>
  import IdInput from '@/components/TextInput.vue';
  import IdTextarea from '@/components/TextAreaInput.vue';
  import localStorage from '@/services/local-storage.js';

  let data;
  let keys = [ 'city', 'state', 'country', 'hobbies', 'causes' ];

  export default {
    name: 'IdentityForm',
    components: { IdInput, IdTextarea },
    data: function() {
      return {
        firstName: null,
        lastName: null,
        city: null,
        state: null,
        country: null,
        hobbies: null,
        causes: null,

        viewingDataPrivacy: false,
        currentView: 0,

        trackedData: {
          city: {changed: false, value: null},
          state: {changed: false, value: null},
          country: {changed: false, value: null},
          hobbies: {changed: false, value: null},
          causes: {changed: false, value: null}
        },
        allowUpdate: false
      };
    },
    created() {
      this.initDataFromStorage();
    },
    methods: {
      changeView(viewIndex) {
        this.currentView = viewIndex;
        this.viewingDataPrivacy = (viewIndex > 0);
      },
      getUpdatedValueData() {
        let updates = Object.assign({}, data);

        keys.forEach((key) => {
          if (this.trackedData[key].changed) {
            updates[key].value = this.trackedData[key].value;
          }
        });

        return updates;
      },
      handleUpdateValue(which, data) {
        this.trackedData[which] = {
          changed: data.changed,
          value: data.value
        };
        this.shouldAllowUpdateValue();
      },
      initDataFromStorage() {
        localStorage.init();
        data = localStorage.get();
        // TODO these should come from the uPort profile
        this.firstName = data.firstName;
        this.lastName = data.lastName;

        this.city = data.city.value;
        this.state = data.state.value;
        this.country = data.country.value;
        this.hobbies = data.hobbies.value.join(', ');
        this.causes = data.causes.value.join(', ');
      },
      resetComponentData() {
        this.$emit('resetOriginalValue');
        this.trackedData = {
          city: {changed: false, value: null},
          state: {changed: false, value: null},
          country: {changed: false, value: null},
          hobbies: {changed: false, value: null},
          causes: {changed: false, value: null}
        };
        this.shouldAllowUpdateValue();
      },
      revertData() {
        this.initDataFromStorage();
        this.resetComponentData();
      },
      shouldAllowUpdateValue() {
        let shouldAllow = false;

        keys.forEach((key) => {
          if (this.trackedData[key].changed) {
            shouldAllow = true;
          }
        });

        this.allowUpdate = shouldAllow;
      },
      updateStorage() {
        let updates = this.getUpdatedValueData();
        localStorage.update(updates);
        
        // NOTE when in dount, setTimeout D:
        // this seemed to be almost a race condition... 
        // localstorage doesn't use callbacks/promises...
        this.initDataFromStorage();
        let that = this;
        window.setTimeout(() => {
          that.resetComponentData();
        }, 0);
      },
    }
  }
</script>

<style>
  .identity-container {
    display: flex;
    flex-direction: column;
    transition: background-color 0.2s ease-in-out, color 0.2s 0.25s ease-in-out;
  }

  .identity-container.public-mode {}

  .identity-container.private-mode {
    background: var(--black2);
    color: var(--white2);
  }

  .form-container {
    flex: 0 1 auto;
    overflow-y: auto;
    height: calc(100vh - 70px);
  }

  .identity-footer {
    border-top: 1px var(--black4) solid;
    padding: 10px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .id-section {
    margin: 0 auto 2em;
    padding: 0 15px;
  }

  .id-button {
    font-size: 1em;
    font-family: var(--mono-font);
    background: var(--white);
    padding: 5px;
    border: 1px var(--black2) solid;
    transition: var(--generic-transition);
  }

  .id-button:focus {
    background: var(--white1);
    border-color: var(--pop3);
    outline: none;
  }

  .id-button.active {
    background: var(--pop1);
  }
</style>
