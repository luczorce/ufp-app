<template>
  <div class="identity-container"
       v-bind:class="{'private-mode': currentView === 2, 'public-mode': currentView === 1}">
    <div class="form-container">
      <form class="identity-form" ref="identityForm">
        <section class="form-section">
          <h2>Names</h2>
          
          <id-input label="first name" name="firstName" v-bind:value="person.firstName" disabled bright-disabled v-bind:state="currentView" v-bind:private="true" />
          <id-input label="last name" name="lastName" v-bind:value="person.lastName" disabled bright-disabled v-bind:state="currentView" v-bind:private="true" />
        </section>

        <section class="form-section">
          <h2>Location</h2>

          <id-input label="city" name="city" :value="person.city.value" 
                    v-on:changed="(data) => {handleUpdateValue('city', data)}" 
                    v-on:privacy-change="(data) => {handleUpdatePrivacy('city', data)}" 
                    v-bind:state="currentView"
                    v-bind:private="person.city.private" />
          <id-input label="state/provence" name="state" :value="person.state.value" 
                    v-on:changed="(data) => {handleUpdateValue('state', data)}" 
                    v-on:privacy-change="(data) => {handleUpdatePrivacy('state', data)}" 
                    v-bind:state="currentView"
                    v-bind:private="person.state.private" />
          <id-input label="country" name="country" :value="person.country.value" 
                    v-on:changed="(data) => {handleUpdateValue('country', data)}" 
                    v-on:privacy-change="(data) => {handleUpdatePrivacy('country', data)}" 
                    v-bind:state="currentView"
                    v-bind:private="person.country.private" />
        </section>

        <section class="form-section">
          <h2>Interests</h2>

          <id-textarea label="hobbies" name="hobbies" :value="person.hobbies.value.join(', ')" v-on:changed="(data) => {handleUpdateValue('hobbies', data)}" v-on:privacy-change="(data) => {handleUpdatePrivacy('hobbies', data)}" v-bind:disabled="viewingDataPrivacy" v-bind:state="currentView" v-bind:private="person.hobbies.private" />
          <id-textarea label="causes" name="causes" :value="person.causes.value.join(', ')" v-on:changed="(data) => {handleUpdateValue('causes', data)}" v-on:privacy-change="(data) => {handleUpdatePrivacy('causes', data)}" v-bind:disabled="viewingDataPrivacy" v-bind:state="currentView" v-bind:private="person.causes.private" />
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
  import Person from '@/models/person.js';

  let keys = [ 'city', 'state', 'country', 'hobbies', 'causes' ];

  export default {
    name: 'IdentityForm',
    components: { IdInput, IdTextarea },
    data: function() {
      return {
        person: null,

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
        let updates = Object.assign({}, this.person);

        keys.forEach((key) => {
          if (this.trackedData[key].changed) {
            updates[key].value = this.trackedData[key].value;
          }
        });

        return updates;
      },
      handleUpdatePrivacy(which, isPrivate) {
        this.person[which].private = isPrivate;
        this.updateStorage();
      },
      handleUpdateValue(which, data) {
        this.trackedData[which] = {
          changed: data.changed,
          value: data.value
        };
        this.shouldAllowUpdateValue();
      },
      initDataFromStorage() {
        const data = localStorage.get();
        let person = new Person(data.firstName, data.lastName);
        delete data.firstName;
        delete data.lastName;
        person.populateAttributes(data);
        this.person = person;
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
        localStorage.store(updates);
        
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

  .identity-container.public-mode .public-content {
    background: var(--white-enuff);
    color: var(--black);
  }

  .identity-container.public-mode .private-content {
    background: var(--white2);
    color: var(--white3);
  }

  .identity-container.private-mode {
    background: var(--black2);
    color: var(--white2);
  }

  .identity-container.private-mode .public-content {
    background: var(--black2);
    color: var(--black3);
    border-color: var(--black3);
  }

  .identity-container.private-mode .private-content {
    background: var(--black4);
    color: var(--white-enuff);
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
</style>
