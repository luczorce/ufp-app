<template>
  <div class="page home-page">
    <identity-form />
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
  created() {
    this.getRequests();
  },
  methods: {
    async getRequests() {
      try {
        const requestResult = await requestsProvider.getRequests();
        const requests = requestResult.data.requests;
        
        if (requests.length) {
          const responses = matchMaker(requests);
        }

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
