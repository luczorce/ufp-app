<template>
  <form>
    <section>
      <h2>Names</h2>
      
      <id-input label="first name" name="firstName" value="Bana" disabled-state="pop"></id-input>

      <id-input label="last name" name="lastName" value="Bofana" disabled-state="pop"></id-input>
    </section>

    <section>
      <h2>Location</h2>

      <id-input label="city" name="city"></id-input>
      <id-input label="state/provence" name="state"></id-input>
      <id-input label="country" name="country"></id-input>
    </section>

    <section>
      <h2>Interests</h2>

      <label>
        <p>Hobbies</p>
        <textarea name="hobbies"></textarea>
      </label>

      <label>
        <p>Causes</p>
        <textarea name="causes"></textarea>
      </label>
    </section>
  </form>
</template>

<script>
import IdInput from '@/components/TextInput.vue';

export default {
  name: 'IdentityForm',
  components: { IdInput }
}
</script>

<style>
</style>
