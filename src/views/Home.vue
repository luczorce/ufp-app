<template>
  <div class="page home-page">
    <identity-form v-on:personData="updatePersonData" />
    
    <div class="notification" v-show="hasNotification" v-on:click="notifyUserOnMatch">
      {{matchCount}}!
    </div>
  </div>
</template>

<script>
import IdentityForm from '@/components/IdentityForm.vue';
import requestsProvider from '@/services/requests-provider.js';
import matchMaker from '@/services/match-maker.js';

export default {
  name: 'home',
  components: {
    IdentityForm
  },
  data() {
    return {
      hasNotification: false,
      matchCount: null,
      responses: null,
      person: null
    } 
  },
  created() {
    this.getRequests();
  },
  methods: {
    async getRequests() {
      try {
        const requestResult = await requestsProvider.getRequests();
        const requests = requestResult.data.requests;
        
        if (requests.length) {
          this.responses = matchMaker(requests);
          this.readRequestResults();
          this.respondToRequests();
        }
      } catch (error) {
        console.log(error);
      }
    },
    notifyUserOnMatch() {
      window.alert(`You have been matched with ${this.matchCount} company requests for your data.`);
      this.hasNotification = false;
      this.matchCount = 0;
    },
    readRequestResults() {
      const matched = this.responses.filter(r => r.matched);

      if (matched.length) {
        this.hasNotification = true;
        this.matchCount = matched.length;
      }
    },
    respondToRequests() {
      const matched = this.responses.filter(r => r.matched);
      if (!matched.length) return false;
      
      if (!this.person) {
        console.log('waiting!');
        window.setTimeout(this.respondToRequests, 200);
      } else {
        let allResponses = [];
        matched.forEach((match) => {
          allResponses.push(requestsProvider.sendResponse(match.requestKey, this.person.deviceKey));
        });

        Promise.all(allResponses)
          .then(result => {
            console.log('successful responses');
            console.log(result);
          }, error => {
            console.log('not successful responses');
            console.log(error);
          });
      }
    },
    updatePersonData(person) {
      this.person = person;
    }
  }
}
</script>

<style>
  .home-page {
    position: relative;
  }

  .notification {
    border: 2px solid var(--pop3);
    background: var(--pop1);
    padding: 5px;
    font-family: var(--mono-font);
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 3px;
    animation: pulse 0.5s ease-out 0.5s infinite alternate;
  }

  @keyframes pulse {
    from { transform: scale(1); }
    to   { transform: scale(1.1); }
  }
</style>
